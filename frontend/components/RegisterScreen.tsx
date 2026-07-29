'use client';
import React, { useState, useEffect } from 'react';
import { AuthService } from '../game/auth';
import { Sounds } from '../game/sounds';
import { Zap, Trophy, Rocket, Briefcase, Flame, Target, Globe, Bot, ShieldCheck, Star } from 'lucide-react';

interface Props {
  onRegistered: (email?: string, password?: string) => void;
  onGoLogin: () => void;
}

export default function RegisterScreen({ onRegistered, onGoLogin }: Props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  useEffect(() => {
    if (!username.trim() || username.length < 3) { setUsernameStatus('idle'); return; }
    setUsernameStatus('checking');
    const timer = setTimeout(async () => {
      const available = await AuthService.checkUsername(username.trim());
      setUsernameStatus(available ? 'available' : 'taken');
    }, 600);
    return () => clearTimeout(timer);
  }, [username]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (usernameStatus === 'taken') { setError('Username is already taken.'); return; }
    setLoading(true);
    Sounds.playClick();
    const result = await AuthService.register(email.trim(), username.trim(), password);
    setLoading(false);
    if (!result.success) { setError(result.error || 'Registration failed.'); return; }
    setSuccess('Account created successfully! Redirecting...');
    setTimeout(() => { Sounds.playClick(); onRegistered(email.trim(), password); }, 1200);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── World-Class Enterprise Dual-Panel Auth ── */
        #screen-register-root {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center;
          z-index: 10; overflow-y: auto;
          background: #030712;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #f8fafc;
          padding: 20px;
        }

        .auth-bg-glow {
          position: absolute; inset: 0;
          background:
            radial-gradient(circle 800px at 80% 20%, rgba(99, 102, 241, 0.14), transparent 70%),
            radial-gradient(circle 700px at 20% 80%, rgba(6, 182, 212, 0.12), transparent 70%),
            #030712;
          pointer-events: none;
        }

        .auth-grid-lines {
          position: absolute; inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle 700px at 50% 50%, #000 30%, transparent 100%);
          pointer-events: none;
        }

        .auth-split-card {
          position: relative; z-index: 2;
          width: 100%; max-width: 900px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          animation: cardSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .auth-mobile-brand-header {
          display: none;
        }

        @media (max-width: 768px) {
          #screen-register-root {
            padding: 16px 12px;
            align-items: center;
          }
          .auth-split-card {
            grid-template-columns: 1fr !important;
            max-width: 440px !important;
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          }
          .auth-left-brand {
            display: none !important;
          }
          .auth-right-form {
            padding: 24px 20px;
          }
          .auth-mobile-brand-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          .auth-input {
            font-size: 16px !important;
            padding: 12px 14px;
          }
          .auth-btn-primary {
            padding: 14px 18px;
            font-size: 15px;
            min-height: 48px;
          }
        }
        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .auth-left-brand {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(6, 182, 212, 0.08));
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
          overflow: hidden;
        }

        .auth-right-form {
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        /* ── CRITICAL: Chrome / Edge WebKit Autofill Fix ── */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #0f172a inset !important;
          -webkit-text-fill-color: #f8fafc !important;
          caret-color: #f8fafc !important;
          border-color: rgba(99, 102, 241, 0.5) !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        .auth-input-group { margin-bottom: 14px; }
        .auth-label {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;
        }
        .auth-input {
          width: 100%; padding: 11px 14px;
          font-size: 13px; font-family: inherit;
          background: #0f172a !important;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px; color: #f8fafc !important; outline: none;
          transition: all 0.2s ease; box-sizing: border-box;
        }
        .auth-input:focus {
          border-color: #6366f1 !important;
          background: #0f172a !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .auth-btn-primary {
          width: 100%; padding: 12px 18px;
          font-size: 14px; font-weight: 700;
          font-family: inherit; border-radius: 10px; border: none;
          background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
          color: #ffffff; cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 6px;
        }
        .auth-btn-primary:hover:not(:disabled) { opacity: 0.94; transform: translateY(-1px); }
        .auth-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .auth-alert-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 10px; padding: 10px 14px; font-size: 12px; color: #fca5a5; margin-bottom: 14px; }
        .auth-alert-success { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 10px; padding: 10px 14px; font-size: 12px; color: #86efac; margin-bottom: 14px; }
        .pwd-toggle { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; color: #64748b; cursor: pointer; padding: 0; font-size: 14px; }
        /* ── Marquee Benefit Badges ── */
        .auth-marquee-wrapper {
          margin-top: auto;
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow: hidden;
          position: relative;
          mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
        }
        .auth-marquee-row {
          display: flex;
          overflow: hidden;
          user-select: none;
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }
        .auth-marquee-track-left {
          display: flex;
          gap: 10px;
          width: max-content;
          animation: marqueeScrollLeft 24s linear infinite;
        }
        .auth-marquee-track-right {
          display: flex;
          gap: 10px;
          width: max-content;
          animation: marqueeScrollRight 24s linear infinite;
        }
        .auth-marquee-row:hover .auth-marquee-track-left,
        .auth-marquee-row:hover .auth-marquee-track-right {
          animation-play-state: paused;
        }
        @keyframes marqueeScrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .pill-cyan {
          background: rgba(6, 182, 212, 0.14);
          color: #67e8f9;
          border-color: rgba(6, 182, 212, 0.3);
          box-shadow: 0 0 14px rgba(6, 182, 212, 0.15);
        }
        .pill-indigo {
          background: rgba(99, 102, 241, 0.14);
          color: #a5b4fc;
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.15);
        }
        .pill-emerald {
          background: rgba(16, 185, 129, 0.14);
          color: #6ee7b7;
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 14px rgba(16, 185, 129, 0.15);
        }
        .pill-amber {
          background: rgba(245, 158, 11, 0.14);
          color: #fcd34d;
          border-color: rgba(245, 158, 11, 0.3);
          box-shadow: 0 0 14px rgba(245, 158, 11, 0.15);
        }
        .pill-rose {
          background: rgba(244, 63, 94, 0.14);
          color: #fda4af;
          border-color: rgba(244, 63, 94, 0.3);
          box-shadow: 0 0 14px rgba(244, 63, 94, 0.15);
        }
        .pill-purple {
          background: rgba(168, 85, 247, 0.14);
          color: #d8b4fe;
          border-color: rgba(168, 85, 247, 0.3);
          box-shadow: 0 0 14px rgba(168, 85, 247, 0.15);
        }
      `}} />

      <div id="screen-register-root">
        <div className="auth-bg-glow" />
        <div className="auth-grid-lines" />

        <div className="auth-split-card">
          {/* LEFT PANEL */}
          <div className="auth-left-brand">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <div style={{
                  width: 44, height: 44,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  filter: 'drop-shadow(0 0 12px rgba(129, 140, 248, 0.6))'
                }}>
                  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="50,6 90,27 90,73 50,94 10,73 10,27" fill="#0b0f19" stroke="#818cf8" strokeWidth="7" strokeLinejoin="round" />
                    <polygon points="50,12 85,30 85,70 50,88 15,70 15,30" fill="none" stroke="#6366f1" strokeWidth="2.5" opacity="0.6" strokeLinejoin="round" />
                    <path d="M 37 38 L 25 50 L 37 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="56" y1="36" x2="44" y2="64" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
                    <path d="M 63 38 L 75 50 L 63 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '2px', color: '#f8fafc' }}>CODE.Q</div>
                  <div style={{ fontSize: 10, color: '#818cf8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Join Platform</div>
                </div>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 12px', color: '#f8fafc', lineHeight: 1.3 }}>
                Start Your Developer Assessment Journey
              </h2>

              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 28px' }}>
                Create your developer account to access full-stack coding challenges, deployment capstones, and official certification.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#e2e8f0' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</div>
                  <span>Instant Developer Identity Activation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#e2e8f0' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</div>
                  <span>Personalized Assessment Analytics Dashboard</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#e2e8f0' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</div>
                  <span>Verifiable Credentials & Certificate ID</span>
                </div>
              </div>
            </div>

            {/* Bottom Marquee Benefits (2 Animated Rows) */}
            <div className="auth-marquee-wrapper">
              {/* Row 1: Right to Left */}
              <div className="auth-marquee-row">
                <div className="auth-marquee-track-left">
                  <span className="marquee-pill pill-cyan"><Zap size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Real-Time AI Review</span>
                  <span className="marquee-pill pill-amber"><Trophy size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Verified Certificate ID</span>
                  <span className="marquee-pill pill-emerald"><Rocket size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> 1-Click Cloud Sandbox</span>
                  <span className="marquee-pill pill-indigo"><Briefcase size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Job-Ready Portfolio</span>
                  <span className="marquee-pill pill-rose"><Flame size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> 100+ Full-Stack Projects</span>
                  <span className="marquee-pill pill-purple"><Target size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Skill Gap Analytics</span>
                  {/* Duplicated for smooth infinite scroll */}
                  <span className="marquee-pill pill-cyan"><Zap size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Real-Time AI Review</span>
                  <span className="marquee-pill pill-amber"><Trophy size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Verified Certificate ID</span>
                  <span className="marquee-pill pill-emerald"><Rocket size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> 1-Click Cloud Sandbox</span>
                  <span className="marquee-pill pill-indigo"><Briefcase size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Job-Ready Portfolio</span>
                  <span className="marquee-pill pill-rose"><Flame size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> 100+ Full-Stack Projects</span>
                  <span className="marquee-pill pill-purple"><Target size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Skill Gap Analytics</span>
                </div>
              </div>

              {/* Row 2: Left to Right */}
              <div className="auth-marquee-row">
                <div className="auth-marquee-track-right">
                  <span className="marquee-pill pill-indigo"><Globe size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Global Leaderboard</span>
                  <span className="marquee-pill pill-cyan"><Bot size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> AI Copilot Assistance</span>
                  <span className="marquee-pill pill-emerald"><Zap size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Live Execution Engine</span>
                  <span className="marquee-pill pill-amber"><ShieldCheck size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Blockchain Credentials</span>
                  <span className="marquee-pill pill-purple"><Rocket size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Automated Unit Tests</span>
                  <span className="marquee-pill pill-rose"><Star size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Free Lifetime Access</span>
                  {/* Duplicated for smooth infinite scroll */}
                  <span className="marquee-pill pill-indigo"><Globe size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Global Leaderboard</span>
                  <span className="marquee-pill pill-cyan"><Bot size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> AI Copilot Assistance</span>
                  <span className="marquee-pill pill-emerald"><Zap size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Live Execution Engine</span>
                  <span className="marquee-pill pill-amber"><ShieldCheck size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Blockchain Credentials</span>
                  <span className="marquee-pill pill-purple"><Rocket size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Automated Unit Tests</span>
                  <span className="marquee-pill pill-rose"><Star size={14} style={{ display: 'inline', verticalAlign: '-2px' }}/> Free Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="auth-right-form">
            {/* Mobile Header Logo */}
            <div className="auth-mobile-brand-header">
              <div style={{
                width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: 'drop-shadow(0 0 10px rgba(129, 140, 248, 0.5))'
              }}>
                <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,6 90,27 90,73 50,94 10,73 10,27" fill="#0b0f19" stroke="#818cf8" strokeWidth="7" strokeLinejoin="round" />
                  <polygon points="50,12 85,30 85,70 50,88 15,70 15,30" fill="none" stroke="#6366f1" strokeWidth="2.5" opacity="0.6" strokeLinejoin="round" />
                  <path d="M 37 38 L 25 50 L 37 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="56" y1="36" x2="44" y2="64" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 63 38 L 75 50 L 63 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '1.5px', color: '#f8fafc' }}>CODE.Q</div>
                <div style={{ fontSize: 9, color: '#06b6d4', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Engineering Platform</div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px', color: '#f8fafc', letterSpacing: '-0.02em' }}>
                Create an Account
              </h1>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>
                Enter your details to create your developer profile
              </p>
            </div>

            {error && <div className="auth-alert-error"><span>{error}</span></div>}
            {success && <div className="auth-alert-success"><span>{success}</span></div>}

            <form onSubmit={handleRegister}>
              <div className="auth-input-group">
                <label className="auth-label">Email Address</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  required
                />
              </div>

              <div className="auth-input-group">
                <label className="auth-label">
                  <span>Username</span>
                  {usernameStatus === 'checking' && <span style={{ color: '#06b6d4' }}>Checking...</span>}
                  {usernameStatus === 'available' && <span style={{ color: '#22c55e' }}>Available</span>}
                  {usernameStatus === 'taken' && <span style={{ color: '#ef4444' }}>Taken</span>}
                </label>
                <input
                  className="auth-input"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={e => { setUsername(e.target.value); setError(''); }}
                  required
                />
              </div>

              <div className="auth-input-group">
                <label className="auth-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="auth-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    required
                  />
                  <button type="button" className="pwd-toggle" onClick={() => setShowPassword(p => !p)}>
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="auth-input-group">
                <label className="auth-label">Confirm Password</label>
                <input
                  className="auth-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => { setConfirmPassword(e.target.value); setError(''); }}
                  required
                />
              </div>

              <button className="auth-btn-primary" type="submit" disabled={loading || !!success}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 18 }}>
              <button
                onClick={() => { Sounds.playClick(); onGoLogin(); }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
              >
                Already have an account? <span style={{ color: '#06b6d4', fontWeight: 600 }}>Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
