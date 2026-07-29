import React, { useState, useEffect } from 'react';
import { Player } from '../game/player';
import { Sounds } from '../game/sounds';
import { AuthService } from '../game/auth';
import { User, GraduationCap, Trophy, BarChart2, Terminal, Zap, Bot, Wrench } from 'lucide-react';
import Avatar from './Avatar';
import HolographicIDCard from './HolographicIDCard';

export default function Sidebar({ isOpen, onClose, activeTab, onNavigate }) {
  if (!Player.exists()) return null;

  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [customDp, setCustomDp] = useState<string | null>(null);
  const [usernameInitial, setUsernameInitial] = useState('D');

  useEffect(() => {
    const updateUserData = () => {
      const authUser = AuthService.getUser();
      if (authUser?.role === 'admin') {
        setIsAdminVisible(true);
      } else {
        setIsAdminVisible(false);
      }
      
      const playerName = Player.get()?.name;
      const uname = authUser?.username || playerName || 'Developer';
      setUsernameInitial((uname.trim().charAt(0) || 'D').toUpperCase());
      const storedDp =
        localStorage.getItem(`codequest_dp_${uname}`) ||
        (playerName ? localStorage.getItem(`codequest_dp_${playerName}`) : null) ||
        localStorage.getItem('codequest_user_dp');
      setCustomDp(storedDp);
    };

    updateUserData();
    window.addEventListener('storage', updateUserData);
    window.addEventListener('player-updated', updateUserData);
    window.addEventListener('dp-updated', updateUserData);
    return () => {
      window.removeEventListener('storage', updateUserData);
      window.removeEventListener('player-updated', updateUserData);
      window.removeEventListener('dp-updated', updateUserData);
    };
  }, []);

  const handleItemClick = (tabName: string) => {
    Sounds.playClick();
    onNavigate(tabName);
    onClose();
  };

  const xpProgress = Player.getXPProgress();
  const xp = Player.getXP();
  const nextRank = Player.getNextRank();
  
  let xpText = '';
  if (nextRank) {
    xpText = `${xp} / ${nextRank.minXP} XP`;
  } else {
    xpText = `${xp} XP (Max Rank)`;
  }

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        id="sidebar-overlay"
        onClick={() => { Sounds.playClick(); onClose(); }}
      >
        <div className="overlay-brand" onClick={(e) => e.stopPropagation()}>
          {isOpen && (
            <HolographicIDCard 
              playerName={Player.getName()}
              playerAvatar={Player.getAvatar()}
              customDp={customDp}
              usernameInitial={usernameInitial}
              playerRank={Player.getRank().title}
              playerLevel={Player.getLevel()}
              playerXP={Player.getXP()}
            />
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${isOpen ? 'active' : ''}`} id="sidebar">
        
        {/* Sidebar Header with Brand Logo & Close Button */}
        <div className="sidebar-header">
          <div 
            className="sidebar-brand" 
            style={{ cursor: 'default', userSelect: 'none' }}
          >
            <div className="brand-logo-container" style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,6 90,27 90,73 50,94 10,73 10,27" fill="#0b0f19" stroke="#818cf8" strokeWidth="7" strokeLinejoin="round" />
                <polygon points="50,12 85,30 85,70 50,88 15,70 15,30" fill="none" stroke="#6366f1" strokeWidth="2.5" opacity="0.6" strokeLinejoin="round" />
                <path d="M 37 38 L 25 50 L 37 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="56" y1="36" x2="44" y2="64" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
                <path d="M 63 38 L 75 50 L 63 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="brand-text" style={{ fontFamily: 'var(--font-display)' }}>CODE.Q</span>
          </div>
          <button className="sidebar-close" onClick={() => { Sounds.playClick(); onClose(); }} aria-label="Close sidebar">
            ✕
          </button>
        </div>

        {/* Mobile-only Stats */}
        <div className="sidebar-mobile-stats">
          <div className="sidebar-mobile-stat-row">
            <span className="stat-icon" style={{ display: 'inline-flex', alignItems: 'center' }}><User size={14} /></span>
            <span className="stat-label">User:</span>
            <span className="stat-val" style={{ color: 'var(--color-cyan)' }}>{Player.getName()}</span>
          </div>
          <div className="sidebar-mobile-stat-row">
            <span className="stat-icon" style={{ display: 'inline-flex', alignItems: 'center' }}><GraduationCap size={14} /></span>
            <span className="stat-label">Level:</span>
            <span className="stat-val">{Player.getLevel()}</span>
          </div>
          <div className="sidebar-mobile-stat-row">
            <span className="stat-icon" style={{ display: 'inline-flex', alignItems: 'center' }}><Trophy size={14} /></span>
            <span className="stat-label">Rank:</span>
            <span className="stat-val" style={{ color: 'var(--color-magenta)', fontSize: '10px' }}>
              {Player.getRank().title}
            </span>
          </div>
          <div className="sidebar-mobile-stat-row xp-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '10px' }}>
              <span className="stat-label">XP Progress</span>
              <span className="stat-val" style={{ fontSize: '10px' }}>{xpText}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>




        </div>

        {/* Navigation Menu Links */}
        <nav className="sidebar-menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1 }}>
          <button
            className={`sidebar-item ${activeTab === 'map' ? 'active' : ''}`}
            id="tab-map"
            onClick={() => handleItemClick('map')}
          >
            <BarChart2 size={18} style={{ marginRight: 8 }} /> Dashboard Tracks
          </button>
          <button
            className={`sidebar-item ${activeTab === 'playground' ? 'active' : ''}`}
            id="tab-playground"
            onClick={() => handleItemClick('playground')}
          >
            <Terminal size={18} style={{ marginRight: 8 }} /> Code Sandbox
          </button>
          <button
            className={`sidebar-item ${activeTab === 'quests' ? 'active' : ''}`}
            id="tab-quests"
            onClick={() => handleItemClick('quests')}
          >
            <Zap size={18} style={{ marginRight: 8 }} /> Skill Assessments
          </button>
          <button
            className={`sidebar-item ${activeTab === 'copilot' ? 'active' : ''}`}
            id="tab-copilot"
            onClick={() => handleItemClick('copilot')}
          >
            <Bot size={18} style={{ marginRight: 8 }} /> AI Copilot chat
          </button>

          <button
            className={`sidebar-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
            id="tab-leaderboard"
            onClick={() => handleItemClick('leaderboard')}
          >
            <Trophy size={18} style={{ marginRight: 8 }} /> Leaderboards
          </button>
          <button
            className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
            id="tab-profile"
            onClick={() => handleItemClick('profile')}
          >
            <User size={18} style={{ marginRight: 8 }} /> Developer Profile
          </button>



        </nav>

      </aside>
    </>
  );
}
