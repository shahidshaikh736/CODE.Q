'use client';
import React, { useState, useRef } from 'react';
import { Player } from '../game/player';
import { Sounds } from '../game/sounds';
import { AuthService } from '../game/auth';

interface ProfileScreenProps {
  onBack: () => void;
  onUpdateProfile: () => void;
  onResetProfile: () => void;
}

export default function ProfileScreen({ onBack, onUpdateProfile, onResetProfile }: ProfileScreenProps) {
  const player = Player.get();
  const authUser = AuthService.getUser();

  const username = authUser?.username || player?.name || 'Developer';
  const email = authUser?.email || 'verified_developer@codequest.dev';

  // Custom DP state (stored per user in localStorage)
  const dpStorageKey = `codequest_dp_${username}`;
  const [customDp, setCustomDp] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(dpStorageKey) || localStorage.getItem('codequest_user_dp');
    }
    return null;
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Initial letter for default DP
  const initialLetter = (username.trim().charAt(0) || 'D').toUpperCase();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size 5MB se kam honi chahiye.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCustomDp(dataUrl);
      localStorage.setItem(dpStorageKey, dataUrl);
      localStorage.setItem('codequest_user_dp', dataUrl);
      onUpdateProfile();
      window.dispatchEvent(new CustomEvent('player-updated'));
      window.dispatchEvent(new CustomEvent('dp-updated'));
      window.dispatchEvent(new Event('storage'));
      Sounds.playClick();
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setCustomDp(null);
    localStorage.removeItem(dpStorageKey);
    localStorage.removeItem('codequest_user_dp');
    onUpdateProfile();
    window.dispatchEvent(new CustomEvent('player-updated'));
    window.dispatchEvent(new CustomEvent('dp-updated'));
    window.dispatchEvent(new Event('storage'));
    Sounds.playClick();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    Sounds.playClick();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleLogoutClick = async () => {
    Sounds.playClick();
    await AuthService.logout();
    Player.reset();
    window.location.reload();
  };

  const handleResetClick = () => {
    Sounds.playError();
    if (window.confirm('WARNING: Isse aapka account permanently delete ho jayega. Continue?')) {
      onResetProfile();
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  if (!player) return null;

  const rank = Player.getRank();
  const nextRank = Player.getNextRank();
  const xp = player.xp;
  const xpTarget = nextRank ? nextRank.minXP : 3000;
  const xpProgress = Math.min(100, Math.round((xp / (xpTarget || 1)) * 100));

  const certDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = `CQ-${username.slice(0, 4).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

  // Skill evaluation data
  const skills = [
    { name: 'Frontend Architecture & React', level: 94, color: '#38bdf8' },
    { name: 'Node.js & System APIs', level: 88, color: '#818cf8' },
    { name: 'State & Database Engineering', level: 85, color: '#34d399' },
    { name: 'Security & Auth Verification', level: 92, color: '#fbbf24' },
  ];

  return (
    <div className="screen profile-screen active" id="screen-profile" style={{ position: 'relative', overflowY: 'auto', paddingBottom: '60px', paddingTop: '24px' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Profile Page Glass Styling ── */
        .pf-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .pf-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
          position: relative;
        }

        /* ── Main Centered Layout ── */
        .pf-main-grid {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .pf-card {
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
          background: rgba(15, 23, 42, 0.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.06);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── Professional Avatar DP ── */
        .dp-wrapper {
          position: relative;
          width: 104px;
          height: 104px;
          margin: 0 auto 18px;
          border-radius: 50%;
        }
        .dp-avatar {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          display: flex; align-items: center; justify-content: center;
          font-size: 42px; font-weight: 800;
          color: #f8fafc;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 3px solid rgba(56, 189, 248, 0.5);
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.2);
          user-select: none;
        }
        .dp-overlay-btn {
          position: absolute;
          bottom: 2px; right: 2px;
          width: 32px; height: 32px;
          border-radius: 50%;
          background: #0284c7;
          border: 2px solid #0f172a;
          color: #ffffff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          transition: all 0.2s ease;
        }
        .dp-overlay-btn:hover {
          transform: scale(1.1);
          background: #38bdf8;
        }

        /* ── Buttons ── */
        .pf-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 10px 16px; font-size: 13px; font-weight: 600; font-family: inherit;
          border-radius: 10px; border: none; cursor: pointer;
          transition: all 0.2s ease; width: 100%;
          letter-spacing: 0.01em;
        }
        
        .pf-btn-gold {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #fbbf24; font-weight: 600;
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.12);
        }
        .pf-btn-gold:hover {
          background: rgba(245, 158, 11, 0.22);
          border-color: rgba(245, 158, 11, 0.6);
          color: #fef08a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.2);
        }

        .pf-btn-ghost {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #cbd5e1;
        }
        .pf-btn-ghost:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(56, 189, 248, 0.3);
          color: #f8fafc;
        }

        .pf-btn-danger {
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
          color: #fca5a5;
        }
        .pf-btn-danger:hover {
          background: rgba(239,68,68,0.14);
          border-color: rgba(239,68,68,0.35);
          color: #f87171;
        }

        /* ── Stat Grid ── */
        .stat-grid-stretched {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card-stretched {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 20px 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .stat-card-stretched::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: rgba(255,255,255,0.1);
        }
        .stat-card-stretched.cyan::before { background: #38bdf8; }
        .stat-card-stretched.indigo::before { background: #818cf8; }
        .stat-card-stretched.emerald::before { background: #34d399; }
        .stat-card-stretched.amber::before { background: #fbbf24; }

        .stat-card-stretched:hover {
          border-color: rgba(56,189,248,0.25);
          background: rgba(255,255,255,0.035);
          transform: translateY(-2px);
        }
        .stat-val-large { font-size: 34px; font-weight: 800; line-height: 1; margin-bottom: 8px; font-family: monospace; }
        .stat-lbl-large { font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }

        /* ── Section Divider ── */
        .card-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
          margin: 18px 0;
        }

        /* ── Progress Skill Bar ── */
        .skill-item { margin-bottom: 14px; }
        .skill-item:last-child { margin-bottom: 0; }
        .skill-info { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; }
        .skill-name { color: #e2e8f0; font-weight: 600; }
        .skill-val { font-family: monospace; font-weight: 700; }
        .skill-track {
          height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.04);
        }
        .skill-fill { height: 100%; border-radius: 10px; transition: width 1s ease; }

        /* ── Certificate Modal Printable ── */
        @media print {
          body * { visibility: hidden; }
          #certificate-print-area, #certificate-print-area * { visibility: visible; }
          #certificate-print-area { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background: white !important; }
        }

        .cert-paper {
          width: 100%; max-width: 720px;
          background: #090d16;
          border: 1px solid rgba(245,158,11,0.4);
          border-radius: 16px;
          padding: 40px 48px;
          color: #f8fafc;
          text-align: center;
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }
        .cert-paper::before {
          content: '';
          position: absolute; inset: 8px;
          border: 1px solid rgba(245,158,11,0.2);
          border-radius: 10px;
          pointer-events: none;
        }

        /* ── Navigation Buttons Responsive Positioning ── */
        .pf-desktop-nav-btn {
          position: absolute;
          top: 24px;
          z-index: 20;
        }
        .pf-left-back { left: 28px; }
        .pf-right-cert { right: 16px; width: auto; padding: 9px 16px; font-size: 12px; }

        .pf-mobile-top-bar {
          display: none;
        }

        /* ── Mobile Responsive Rules (< 768px) ── */
        @media (max-width: 768px) {
          .pf-desktop-nav-btn {
            display: none !important;
          }
          .pf-mobile-top-bar {
            display: flex !important;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 16px;
            gap: 8px;
          }
          .pf-mobile-top-bar .back-btn {
            position: static !important;
            font-size: 11px !important;
            padding: 6px 12px !important;
          }
          .pf-mobile-top-bar .pf-btn-gold {
            position: static !important;
            font-size: 11px !important;
            padding: 6px 12px !important;
            width: auto !important;
            margin-left: auto;
            transform: translateX(6px);
          }
          .pf-header {
            margin-bottom: 16px !important;
            padding-top: 0 !important;
          }
          .pf-header h1 {
            font-size: 20px !important;
          }
          .pf-container {
            padding: 0 12px !important;
          }
          .pf-card {
            padding: 18px 14px !important;
            border-radius: 16px !important;
            max-width: 100% !important;
          }
          .cert-paper {
            padding: 24px 16px !important;
          }
        }
      `}} />

      {/* Desktop Far-Left Corner Back Button */}
      <button
        className="btn btn-secondary back-btn pf-desktop-nav-btn pf-left-back"
        onClick={() => { Sounds.playClick(); onBack(); }}
      >
        ⬅ BACK TO DASHBOARD
      </button>

      {/* Desktop Far-Right Corner Certificate Button */}
      <button
        className="pf-btn pf-btn-gold pf-desktop-nav-btn pf-right-cert"
        onClick={() => { Sounds.playClick(); setShowCertificateModal(true); }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
        View Official Certificate
      </button>

      {/* Hidden File Input for DP */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handlePhotoUpload}
      />

      <div className="pf-container">
        {/* Mobile Top Navigation Bar (< 768px) */}
        <div className="pf-mobile-top-bar">
          <button
            className="btn btn-secondary back-btn"
            onClick={() => { Sounds.playClick(); onBack(); }}
          >
            ⬅ BACK
          </button>
          <button
            className="pf-btn pf-btn-gold"
            onClick={() => { Sounds.playClick(); setShowCertificateModal(true); }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            Certificate
          </button>
        </div>

        {/* Centered Page Title Header */}
        <div className="pf-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: 28, paddingTop: 4 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Developer Profile & Credentials
          </h1>
          <span style={{
            background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', color: '#38bdf8',
            fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20, letterSpacing: '0.06em'
          }}>
            EVALUATION VERIFIED
          </span>
        </div>

        {/* MAIN GRID: Developer Profile Card & Analytics Card */}
        <div className="pf-main-grid">
          {/* Column 1: Main Profile Identity Card */}
          <div className="pf-card">
            {/* Profile Avatar DP */}
            <div className="dp-wrapper">
              {customDp ? (
                <img src={customDp} alt={username} className="dp-avatar" />
              ) : (
                <div className="dp-avatar">{initialLetter}</div>
              )}
              <button
                className="dp-overlay-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Upload Custom Profile Picture"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
              </button>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px', color: '#f8fafc' }}>
                {username}
              </h2>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#38bdf8', fontFamily: 'monospace', marginBottom: 12 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                {email}
                <button
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  style={{ background: 'none', border: 'none', color: copiedEmail ? '#34d399' : '#64748b', cursor: 'pointer', padding: '0 2px' }}
                >
                  {copiedEmail ? '✓' : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399',
                  fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, display: 'inline-flex', alignItems: 'center', gap: 5
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Verified Account
                </span>

                <span style={{
                  background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)', color: '#818cf8',
                  fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20
                }}>
                  Lvl {player.level} • {rank.title}
                </span>
              </div>
            </div>

            <div className="card-divider" style={{ margin: '18px 0 16px 0' }} />

            {/* Account & Profile Control Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="pf-btn pf-btn-ghost" onClick={() => fileInputRef.current?.click()} style={{ fontSize: 12 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                  <circle cx="12" cy="13" r="3"></circle>
                </svg>
                Change Photo from Device
              </button>

              {customDp && (
                <button className="pf-btn pf-btn-danger" onClick={handleRemovePhoto} style={{ fontSize: 11, padding: '8px 12px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Remove Photo (Use Initial '{initialLetter}')
                </button>
              )}

              <button className="pf-btn pf-btn-ghost" onClick={handleLogoutClick}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout Session
              </button>

              <button className="pf-btn pf-btn-danger" onClick={handleResetClick} style={{ fontSize: 11 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete Account
              </button>
            </div>
          </div>

          {/* Column 2: Assessment Analytics & Competencies (TEMPORARILY HIDDEN — bring back when requested)
          <div className="pf-card">
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 16px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              Assessment Analytics & Performance Overview
            </h3>

            <div className="stat-grid-stretched">
              <div className="stat-card-stretched cyan">
                <div className="stat-val-large" style={{ color: '#38bdf8' }}>{player.stats.challengesCompleted}</div>
                <div className="stat-lbl-large">Quests Solved</div>
              </div>

              <div className="stat-card-stretched indigo">
                <div className="stat-val-large" style={{ color: '#818cf8' }}>{player.stats.bossesDefeated}</div>
                <div className="stat-lbl-large">Capstones Deployed</div>
              </div>

              <div className="stat-card-stretched emerald">
                <div className="stat-val-large" style={{ color: '#34d399' }}>{player.stats.perfectSolves}</div>
                <div className="stat-lbl-large">First-Pass Solves</div>
              </div>

              <div className="stat-card-stretched amber">
                <div className="stat-val-large" style={{ color: '#fbbf24' }}>{player.stats.hintsTotal}</div>
                <div className="stat-lbl-large">Hints Used</div>
              </div>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: 18, marginBottom: 20
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span>Rank Progress:</span>
                  <span style={{ color: '#38bdf8' }}>{rank.title}</span>
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>
                  {xp} / {xpTarget} XP ({xpProgress}%)
                </div>
              </div>
              <div className="skill-track">
                <div className="skill-fill" style={{ width: `${xpProgress}%`, background: 'linear-gradient(90deg, #38bdf8, #818cf8)' }}></div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 14px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                Engineering Skill Competencies
              </h4>

              <div>
                {skills.map((s, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-val" style={{ color: s.color }}>{s.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${s.level}%`, background: s.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          */}
        </div>
      </div>

      {/* CERTIFICATE MODAL ── Printable / Viewable */}
      {showCertificateModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, overflowY: 'auto' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 760 }}>
            {/* Modal Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                Official Full-Stack Developer Assessment Certificate
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="pf-btn pf-btn-gold" onClick={handlePrintCertificate} style={{ width: 'auto', padding: '7px 14px', fontSize: 12 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  Print / Save PDF
                </button>
                <button className="pf-btn pf-btn-ghost" onClick={() => setShowCertificateModal(false)} style={{ width: 'auto', padding: '7px 14px', fontSize: 12 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                  Close
                </button>
              </div>
            </div>

            {/* Certificate Document Paper */}
            <div id="certificate-print-area" className="cert-paper">
              {/* Logo & Header */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24', fontSize: 20, fontWeight: 800, marginBottom: 10 }}>
                  &lt;/&gt;
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 4, color: '#fbbf24' }}>CODE.Q PLATFORM</div>
                <div style={{ fontSize: 11, letterSpacing: 2, color: '#94a3b8', textTransform: 'uppercase', marginTop: 3 }}>Interactive Assessment & Engineering Workspace</div>
              </div>

              <div style={{ fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: '#cbd5e1', marginBottom: 16, fontWeight: 600 }}>
                CERTIFICATE OF ACHIEVEMENT
              </div>

              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>
                This is to officially certify that
              </div>

              <div style={{ fontSize: 28, fontWeight: 800, color: '#38bdf8', textTransform: 'capitalize', letterSpacing: 0.5, margin: '0 0 12px 0' }}>
                {username}
              </div>

              <div style={{ fontSize: 13, color: '#94a3b8', maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.7 }}>
                has successfully completed full-stack developer assessment challenges, system evaluation capstone projects, and demonstrated verified engineering proficiency in modern software architecture.
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px dashed rgba(245,158,11,0.25)' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f8fafc', fontFamily: 'monospace' }}>{certDate}</div>
                  <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', marginTop: 2 }}>Date Issued</div>
                </div>

                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24', fontFamily: 'monospace' }}>Verified Lead</div>
                  <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', marginTop: 2 }}>Evaluation Board</div>
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f8fafc', fontFamily: 'monospace' }}>{certId}</div>
                  <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', marginTop: 2 }}>Certificate ID</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

