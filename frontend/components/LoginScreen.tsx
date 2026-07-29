'use client';
import React, { useState } from 'react';
import { AuthService } from '../game/auth';
import { Sounds } from '../game/sounds';
import { Zap, Trophy, Rocket, Briefcase, Flame, Target, Globe, Bot, ShieldCheck, Star } from 'lucide-react';

interface Props {
  initialIdentifier?: string;
  initialPassword?: string;
  onLoginSuccess: (user: { email: string; username: string; role?: string }) => void;
  onGoRegister: () => void;
}

export default function LoginScreen({ initialIdentifier, initialPassword, onLoginSuccess, onGoRegister }: Props) {
  const [identifier, setIdentifier] = useState(initialIdentifier || '');
  const [password, setPassword] = useState(initialPassword || '');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAdminPinPopup, setShowAdminPinPopup] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [pinError, setPinError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) return;
    setError('');
    setSuccess('');
    
    const adminCreds = AuthService.getAdminCredentials();
    if (identifier.trim().toLowerCase() === adminCreds.email.toLowerCase() && password === adminCreds.password) {
      setShowAdminPinPopup(true);
      return;
    }

    setLoading(true);
    Sounds.playClick();

    const result = await AuthService.login(identifier.trim(), password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || 'Invalid credentials. Please check your username/email and password.');
      return;
    }

    setSuccess('✓ Authentication successful! Loading workspace...');
    setTimeout(() => {
      onLoginSuccess(result.user!);
    }, 500);
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === AuthService.getAdminPin()) { // Dynamic admin PIN
      setShowAdminPinPopup(false);
      setSuccess('✓ Admin Access Granted! Loading workspace...');
      setLoading(true);
      const result = await AuthService.login(identifier.trim(), password);
      setTimeout(() => {
        onLoginSuccess(result.user!);
      }, 500);
    } else {
      setPinError('Invalid Admin PIN. Access Denied.');
      Sounds.playError && Sounds.playError();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── World-Class Enterprise Dual-Panel Auth ── */
        #screen-login-root {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center;
          z-index: 10; overflow-y: auto;
          background: #030712;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #f8fafc;
          padding: 20px;
        }

        /* ── Background Mesh & Grid ── */
        .auth-bg-glow {
          position: absolute; inset: 0;
          background:
            radial-gradient(circle 800px at 20% 20%, rgba(6, 182, 212, 0.12), transparent 70%),
            radial-gradient(circle 700px at 80% 80%, rgba(99, 102, 241, 0.14), transparent 70%),
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

        /* ── Dual Panel Container Card ── */
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
          #screen-login-root {
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
          .auth-btn-secondary {
            padding: 12px 18px;
            font-size: 13.5px;
            min-height: 44px;
          }
        }
        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ── Left Branding Panel ── */
        .auth-left-brand {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(99, 102, 241, 0.08));
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          min-width: 0;
          overflow: hidden;
        }

        /* ── Right Form Panel ── */
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
          border-color: rgba(6, 182, 212, 0.5) !important;
          transition: background-color 5000s ease-in-out 0s;
        }

        /* ── Input Controls ── */
        .auth-input-group { margin-bottom: 20px; }
        .auth-label {
          display: block; font-size: 12px; font-weight: 700;
          color: #94a3b8; margin-bottom: 8px;
          letter-spacing: 0.03em;
        }
        .auth-input {
          width: 100%;
          padding: 12px 16px;
          font-size: 14px; font-family: inherit;
          background: #0f172a !important;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          color: #f8fafc !important;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .auth-input:focus {
          border-color: #06b6d4 !important;
          background: #0f172a !important;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.2);
        }
        .auth-input::placeholder { color: #475569; }

        /* ── Buttons ── */
        .auth-btn-primary {
          width: 100%;
          padding: 13px 18px;
          font-size: 14px; font-weight: 700;
          font-family: inherit; letter-spacing: 0.02em;
          border-radius: 10px; border: none;
          background: linear-gradient(135deg, #06b6d4 0%, #6366f1 100%);
          color: #ffffff; cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 6px;
        }
        .auth-btn-primary:hover:not(:disabled) {
          opacity: 0.94; transform: translateY(-1px);
          box-shadow: 0 6px 26px rgba(6, 182, 212, 0.45);
        }
        .auth-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .auth-btn-secondary {
          width: 100%;
          padding: 11px 18px;
          font-size: 13px; font-weight: 700;
          font-family: inherit;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e2e8f0; cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }
        .auth-btn-secondary:hover {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.4);
          color: #67e8f9;
        }

        /* ── Divider ── */
        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin: 22px 0; color: #475569; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .auth-divider::before, .auth-divider::after {
          content: ''; flex: 1; height: 1px; background: rgba(255, 255, 255, 0.08);
        }

        /* ── Alerts ── */
        .auth-alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px; padding: 11px 14px;
          font-size: 13px; color: #fca5a5;
          margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
        }
        .auth-alert-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 10px; padding: 11px 14px;
          font-size: 13px; color: #86efac;
          margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
        }

        /* ── Eye Toggle ── */
        .pwd-toggle {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: #64748b;
          cursor: pointer; padding: 0; font-size: 14px;
          display: flex; align-items: center; justify-content: center;
          transition: color 0.2s;
        }
        .pwd-toggle:hover { color: #06b6d4; }
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

      <div id="screen-login-root">
        <div className="auth-bg-glow" />
        <div className="auth-grid-lines" />

        <div className="auth-split-card">
          {/* LEFT PANEL: Enterprise Platform Showcase */}
          <div className="auth-left-brand">
            <div>
              {/* Brand Header Logo */}
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
                  <div style={{ fontSize: 10, color: '#06b6d4', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Engineering Platform</div>
                </div>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 12px', color: '#f8fafc', lineHeight: 1.3 }}>
                Accelerate Full-Stack System Evaluation
              </h2>

              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 28px' }}>
                Interactive developer workspace featuring live code execution, real-time testing, and verified certification.
              </p>

              {/* Feature Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#e2e8f0' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.4)', color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</div>
                  <span>Real-Time Code Execution Environment</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#e2e8f0' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.4)', color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</div>
                  <span>Full-Stack Capstone Project Evaluation</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#e2e8f0' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.4)', color: '#67e8f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>✓</div>
                  <span>Verified Credentials & Official Certification</span>
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

          {/* RIGHT PANEL: Sign-In Form */}
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

            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px', color: '#f8fafc', letterSpacing: '-0.02em' }}>
                Account Sign In
              </h1>
              <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>
                Enter your username/email and password
              </p>
            </div>

            {error && (
              <div className="auth-alert-error">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="auth-alert-success">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="auth-input-group">
                <label className="auth-label" htmlFor="login-identifier">
                  Email or Username
                </label>
                <input
                  id="login-identifier"
                  className="auth-input"
                  type="text"
                  placeholder="Username or email"
                  value={identifier}
                  onChange={e => { setIdentifier(e.target.value); setError(''); }}
                  disabled={loading || !!success}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="auth-input-group" style={{ marginBottom: 24 }}>
                <label className="auth-label" htmlFor="login-password">
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="login-password"
                    className="auth-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    disabled={loading || !!success}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="pwd-toggle"
                    onClick={() => setShowPassword(p => !p)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                id="btn-login-submit"
                className="auth-btn-primary"
                type="submit"
                disabled={loading || !!success}
              >
                {loading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In to Workspace</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">New to CODE.Q?</div>

            <button
              id="btn-go-register"
              className="auth-btn-secondary"
              onClick={() => { Sounds.playClick(); onGoRegister(); }}
            >
              Create New Developer Account
            </button>
          </div>
        </div>
      </div>

      {showAdminPinPopup && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px'
        }}>
          <div className="auth-split-card" style={{ 
            display: 'block', 
            width: '100%',
            maxWidth: '380px', 
            padding: '32px 24px',
            animation: 'cardSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                boxShadow: '0 8px 32px rgba(6, 182, 212, 0.2)'
              }}>
                <ShieldCheck size={32} color="#06b6d4" />
              </div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '22px', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.02em' }}>
                Admin Security
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Verification PIN Required
              </p>
            </div>
            
            {pinError && <div className="auth-alert-error" style={{ marginBottom: '24px' }}>{pinError}</div>}
            
            <form onSubmit={handlePinSubmit}>
              <div style={{ position: 'relative', height: '64px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', height: '100%' }}>
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} style={{
                      flex: 1,
                      maxWidth: '64px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid ' + (adminPin.length === i ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)'),
                      boxShadow: adminPin.length === i ? '0 0 0 3px rgba(6, 182, 212, 0.2)' : 'inset 0 2px 10px rgba(0,0,0,0.3)',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '32px', color: '#06b6d4', fontWeight: 700,
                      transition: 'all 0.2s ease',
                      transform: adminPin.length === i ? 'scale(1.05)' : 'scale(1)'
                    }}>
                      {adminPin[i] ? '•' : ''}
                    </div>
                  ))}
                </div>
                <input 
                  type="tel"
                  value={adminPin}
                  onChange={e => setAdminPin(e.target.value.replace(/[^0-9]/g, ''))} // Numeric only
                  maxLength={4}
                  autoFocus
                  style={{
                    position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'text'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" 
                  className="auth-btn-secondary"
                  onClick={() => { setShowAdminPinPopup(false); setAdminPin(''); setPinError(''); }}
                >
                  Cancel
                </button>
                <button type="submit" className="auth-btn-primary" disabled={adminPin.length !== 4}>
                  Verify Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
