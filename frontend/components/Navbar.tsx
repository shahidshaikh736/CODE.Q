import React, { useState, useEffect, useRef } from 'react';
import { Player } from '../game/player';
import { Sounds } from '../game/sounds';
import { AuthService } from '../game/auth';
import { BACKEND_URL } from '../game/config';
import Avatar from './Avatar';
import { Zap, Trophy, Bot, Bell, ClipboardList, FlaskConical, User, Flame } from 'lucide-react';

export default function Navbar({ isOpen, activeTab, currentChallenge, onNavigate, onToggleSidebar }) {
  if (!Player.exists()) return null;

  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [xp, setXp] = useState(Player.getXP ? Player.getXP() : 0);
  const [streak, setStreak] = useState(Player.getStreak ? Player.getStreak() : 0);
  const [customDp, setCustomDp] = useState<string | null>(null);
  const [usernameInitial, setUsernameInitial] = useState('D');
  const searchRef = useRef(null);
  const notifRef = useRef(null);

  // Sync user DP & initial with ProfileScreen
  useEffect(() => {
    const updateUserData = () => {
      const authUser = AuthService.getUser();
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

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [notifications, setNotifications] = useState<any[]>([]);

  // XP refresh
  useEffect(() => {
    const refresh = () => {
      if (Player.getXP) setXp(Player.getXP());
      if (Player.getStreak) setStreak(Player.getStreak());
    };
    window.addEventListener('xp-updated', refresh);
    window.addEventListener('player-updated', refresh);
    return () => {
      window.removeEventListener('xp-updated', refresh);
      window.removeEventListener('player-updated', refresh);
    };
  }, []);

  // Welcome Notification
  useEffect(() => {
    if (!sessionStorage.getItem('welcome_shown')) {
      sessionStorage.setItem('welcome_shown', 'true');
      setTimeout(() => {
        const authUser = AuthService.getUser();
        const name = authUser?.username || Player.get()?.name || 'Developer';
        if ((window as any).addNotification) {
          (window as any).addNotification(`Welcome to CODE.Q, ${name}! Thank you for joining us today, have a wonderful time! ✨`, '👋', 'welcome-msg');
        }
      }, 1500);
    }
  }, []);

  // Notifications listener
  useEffect(() => {
    const handleNewNotification = (e: any) => {
      const { text, icon, id } = e.detail;
      setNotifications(prev => {
        // Prevent duplicate notifications if a unique ID is provided
        if (id && prev.some(n => n.id === id)) return prev;
        return [
          {
            id: id || Date.now().toString() + Math.random().toString(),
            icon: icon || <Bell size={14} />,
            text,
            time: 'Just now',
            unread: true
          },
          ...prev
        ];
      });
    };
    
    (window as any).addNotification = (text: string, icon: any, id?: string) => {
      window.dispatchEvent(new CustomEvent('game-notification', { detail: { text, icon, id } }));
    };

    window.addEventListener('game-notification', handleNewNotification);
    return () => {
      window.removeEventListener('game-notification', handleNewNotification);
    };
  }, []);

  // Real-time Broadcast Polling (Clock-sync safe)
  useEffect(() => {
    let lastCheck = 0;
    let isInitialFetch = true;

    const pollBroadcasts = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/broadcasts?since=${lastCheck}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.broadcasts) {
            if (isInitialFetch) {
              // Establish server time baseline to avoid client-server clock skew bugs
              if (data.broadcasts && data.broadcasts.length > 0) {
                lastCheck = Math.max(...data.broadcasts.map((b: any) => b.timestamp));
                
                // Show any broadcasts that happened very recently (e.g., admin just sent it and switched tabs)
                data.broadcasts.forEach((b: any) => {
                  if (data.serverTime && data.serverTime - b.timestamp < 30000) {
                    let prefix = '📢 Notice: ';
                    let icon = '📢';
                    if (b.priority === 'warning') { prefix = '⚠️ Warning: '; icon = '⚠️'; }
                    if (b.priority === 'critical') { prefix = '🚨 CRITICAL ALERT: '; icon = '🚨'; }
                    if ((window as any).addNotification) {
                      (window as any).addNotification(`${prefix}${b.message}`, icon, b.id);
                    }
                  }
                });
              } else if (data.serverTime) {
                lastCheck = data.serverTime - 1000; // Offset by 1s for safety
              } else {
                lastCheck = Date.now() - 60000; 
              }
              isInitialFetch = false;
              return;
            }

            if (data.broadcasts.length > 0) {
              data.broadcasts.forEach((b: any) => {
                if (b.timestamp > lastCheck) lastCheck = b.timestamp;
                let prefix = '📢 Notice: ';
                let icon = '📢';
                if (b.priority === 'warning') { prefix = '⚠️ Warning: '; icon = '⚠️'; }
                if (b.priority === 'critical') { prefix = '🚨 CRITICAL ALERT: '; icon = '🚨'; }
                
                if ((window as any).addNotification) {
                  (window as any).addNotification(`${prefix}${b.message}`, icon, b.id);
                }
              });
            }
          }
        }
      } catch (e) {
        // Silent fail if backend offline
      }
    };
    
    pollBroadcasts(); // Run immediately on mount to establish baseline
    const interval = setInterval(() => {
      pollBroadcasts();
      if (Player && typeof Player._syncFromCloud === 'function') {
        Player._syncFromCloud();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getBreadcrumb = () => {
    const paths = {
      'map': ['Dashboard'],
      'quests': ['Assessments'],
      'leaderboard': ['Rankings'],
      'playground': ['Code Sandbox'],
      'profile': ['Profile'],
      'copilot': ['AI Copilot'],
      'billing': ['Billing'],
      'levels': ['Tracks'],
      'challenge': ['Challenge', currentChallenge?.title || ''],
      'boss': ['Capstone', currentChallenge?.title || '']
    };
    return paths[activeTab] || ['Dashboard'];
  };

  const breadcrumbs = getBreadcrumb();

  const xpToNextLevel = 1000;
  const xpProgress = Math.min((xp % xpToNextLevel) / xpToNextLevel * 100, 100);

  const navPages = [
    { key: 'map', label: 'Dashboard', icon: <Zap size={14} /> },
    { key: 'quests', label: 'Assessments', icon: <ClipboardList size={14} /> },
    { key: 'playground', label: 'Sandbox', icon: <FlaskConical size={14} /> },
    { key: 'copilot', label: 'AI Copilot', icon: <Bot size={14} /> },
    { key: 'leaderboard', label: 'Rankings', icon: <Trophy size={14} /> },
    { key: 'profile', label: 'Profile', icon: <User size={14} /> },
  ];

  const filteredPages = navPages.filter(p =>
    searchQuery.length > 0
      ? p.label.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  const handleMarkAllRead = () => {
    Sounds.playClick();
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const parseBold = (text: string) => {
    if (!text) return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ fontWeight: 'bold', color: 'var(--color-cyan)' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ===== MENU HAMBURGER ===== */
        .menu-trigger-btn {
          width: 36px; height: 36px;
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          gap: 4px; cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .menu-trigger-btn:hover { border-color: var(--color-cyan); transform: scale(1.05); background: var(--color-cyan-dim); }
        .menu-bar { width: 16px; height: 2px; background-color: var(--color-text-primary); border-radius: 2px; transition: all 0.3s; }
        .menu-trigger-btn.menu-open .bar-1 { transform: translateY(6px) rotate(45deg); background-color: var(--color-magenta); }
        .menu-trigger-btn.menu-open .bar-2 { opacity: 0; }
        .menu-trigger-btn.menu-open .bar-3 { transform: translateY(-6px) rotate(-45deg); background-color: var(--color-magenta); }

        /* ===== NAVBAR LOGO ===== */
        .navbar-logo {
          display: flex; align-items: center; gap: 8px; cursor: pointer;
          padding: 4px 8px; border-radius: var(--radius-md);
          transition: background 0.2s;
        }
        .navbar-logo:hover { background: var(--color-bg-light); }
        .logo-icon {
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: transparent;
          filter: drop-shadow(0 0 10px rgba(129, 140, 248, 0.5));
          transition: transform 0.2s ease;
        }
        .navbar-logo:hover .logo-icon {
          transform: scale(1.08);
        }
        .logo-text {
          font-family: var(--font-display); font-weight: 800;
          letter-spacing: 0.08em; font-size: var(--text-base);
          background: linear-gradient(90deg, #fff, #818cf8);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ===== BREADCRUMBS ===== */
        .navbar-breadcrumbs {
          display: flex; align-items: center; gap: 4px;
          padding: 4px 10px;
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          font-size: 11px; color: var(--color-text-muted);
        }
        .breadcrumb-home { color: var(--color-cyan); font-weight: 700; font-size: 10px; letter-spacing: 0.05em; }
        .breadcrumb-sep { opacity: 0.4; }
        .breadcrumb-current { color: var(--color-text-primary); font-weight: 600; }

        /* ===== SEARCH ===== */
        .nav-search-wrapper { position: relative; }
        .nav-search-btn {
          display: flex; align-items: center; gap: 6px;
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 5px 12px;
          cursor: pointer; font-size: 11px;
          color: var(--color-text-muted);
          transition: all 0.2s;
          width: 160px;
        }
        .nav-search-btn:hover { border-color: var(--color-cyan); color: var(--color-text-primary); }
        .nav-search-input {
          display: flex; align-items: center; gap: 6px;
          background: var(--color-bg-light);
          border: 1px solid var(--color-cyan);
          border-radius: var(--radius-full);
          padding: 5px 12px;
          font-size: 11px;
          color: var(--color-text-primary);
          width: 200px;
        }
        .nav-search-input input {
          background: transparent; border: none; outline: none;
          color: var(--color-text-primary); font-size: 11px;
          width: 100%; font-family: var(--font-body);
        }
        .nav-search-input input::placeholder { color: var(--color-text-muted); }
        .search-dropdown {
          position: absolute; top: calc(100% + 8px); left: 0;
          background: var(--color-bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
          z-index: 9999; min-width: 220px;
        }
        .search-result-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; cursor: pointer;
          font-size: 12px; color: var(--color-text-primary);
          transition: background 0.15s;
        }
        .search-result-item:hover { background: var(--color-bg-light); color: var(--color-cyan); }
        .search-no-result { padding: 14px; text-align: center; font-size: 11px; color: var(--color-text-muted); }

        /* ===== XP BAR ===== */
        .xp-bar-container {
          display: flex; flex-direction: column; gap: 2px;
          align-items: center; cursor: default;
        }
        .xp-bar-label {
          font-size: 9px; color: var(--color-text-muted);
          letter-spacing: 0.05em; text-align: center; line-height: 1;
        }
        .xp-bar-track {
          width: 80px; height: 5px;
          background: var(--color-bg-light);
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 1px solid var(--glass-border);
        }
        .xp-bar-fill {
          height: 100%;
          border-radius: var(--radius-full);
          background: linear-gradient(90deg, var(--color-cyan), var(--color-magenta));
          transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 6px var(--color-cyan);
        }
        .xp-bar-xp { font-size: 9px; color: var(--color-cyan); font-weight: 700; letter-spacing: 0.03em; }

        /* ===== STREAK ===== */
        .streak-badge {
          display: flex; align-items: center; gap: 4px;
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 4px 10px;
          font-size: 10px; font-weight: 700;
          color: var(--color-text-secondary);
          transition: all 0.2s; cursor: default;
        }
        .streak-badge:hover { border-color: #f97316; color: #f97316; }
        .streak-fire { font-size: 12px; }

        /* ===== LIVE CLOCK ===== */
        .nav-clock {
          display: flex; flex-direction: column; align-items: center;
          gap: 1px; cursor: default;
          padding: 2px 8px;
          border-radius: var(--radius-md);
        }
        .nav-clock-time { font-size: 11px; font-weight: 700; color: var(--color-text-primary); letter-spacing: 0.04em; line-height: 1.2; font-variant-numeric: tabular-nums; }
        .nav-clock-date { font-size: 9px; color: var(--color-text-muted); letter-spacing: 0.04em; line-height: 1; }

        /* ===== LEVEL PILL ===== */
        .level-pill {
          display: flex; align-items: center; gap: 4px;
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 4px 10px;
          font-size: 10px; font-weight: bold; color: var(--color-text-secondary);
          transition: all 0.2s; cursor: default;
        }
        .level-pill:hover { border-color: var(--color-cyan); }
        .level-num { color: var(--color-cyan); font-size: 13px; }

        /* ===== STATUS INDICATOR ===== */
        .status-indicator {
          display: flex; align-items: center; gap: 5px;
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-full);
          padding: 4px 10px;
          font-size: 10px; color: var(--color-text-muted);
          cursor: default;
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%; background: #22c55e;
          box-shadow: 0 0 6px #22c55e;
          animation: statusPulse 2s infinite;
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ===== NOTIFICATIONS ===== */
        .notif-wrapper { position: relative; }
        .notif-btn {
          position: relative;
          width: 34px; height: 34px;
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 15px;
          transition: all 0.2s;
          color: var(--color-text-secondary);
        }
        .notif-btn:hover { border-color: var(--color-cyan); transform: scale(1.05); }
        .notif-badge {
          position: absolute; top: -4px; right: -4px;
          width: 16px; height: 16px;
          background: var(--color-magenta);
          border-radius: 50%; border: 2px solid var(--color-bg-primary);
          font-size: 8px; font-weight: bold; color: #fff;
          display: flex; align-items: center; justify-content: center;
        }
        .notif-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: #09090b !important;
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 40px rgba(0,0,0,0.8);
          z-index: 99999; width: 280px; overflow: hidden;
        }
        .notif-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--glass-border);
          font-size: 11px; font-weight: 700; color: var(--color-text-primary);
          letter-spacing: 0.05em; display: flex; align-items: center; justify-content: space-between;
        }
        .notif-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 10px 14px; border-bottom: 1px solid var(--glass-border);
          transition: background 0.15s; cursor: pointer;
        }
        .notif-item:last-child { border-bottom: none; }
        .notif-item:hover { background: var(--color-bg-light); }
        .notif-item.unread { background: rgba(6,182,212,0.04); }
        .notif-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .notif-text { font-size: 11px; color: var(--color-text-primary); line-height: 1.4; }
        .notif-time { font-size: 10px; color: var(--color-text-muted); margin-top: 2px; }

        /* ===== TIER BADGE ===== */
        .tier-badge-pro {
          font-size: 9px;
          background: linear-gradient(135deg, var(--color-cyan), var(--color-magenta));
          color: #fff; font-weight: bold;
          padding: 3px 10px; border-radius: var(--radius-full);
          letter-spacing: 0.05em;
          box-shadow: 0 0 10px var(--color-cyan-dim);
        }
        .upgrade-btn {
          font-size: 9px; background: var(--color-bg-light);
          border: 1px solid var(--color-cyan); color: var(--color-cyan);
          font-weight: bold; padding: 3px 10px;
          border-radius: var(--radius-full); cursor: pointer;
          letter-spacing: 0.05em; outline: none;
          transition: all 0.2s;
        }
        .upgrade-btn:hover { background: var(--color-cyan); color: #000; box-shadow: 0 0 12px var(--color-cyan-dim); }

        /* ===== AVATAR ===== */
        .navbar-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: var(--color-bg-light);
          border: 2px solid var(--glass-border);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; cursor: pointer;
          transition: all 0.2s;
        }
        .navbar-avatar:hover { border-color: var(--color-cyan); box-shadow: 0 0 12px var(--color-cyan-dim); transform: scale(1.06); }

        /* ===== DIVIDERS ===== */
        .nav-divider {
          width: 1px; height: 20px;
          background: var(--glass-border);
          flex-shrink: 0;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 900px) {
          .nav-hide-md { display: none !important; }
        }
        @media (max-width: 640px) {
          .nav-hide-sm { display: none !important; }
        }
      `}} />

      <nav className="navbar" id="navbar" style={{
        padding: '0 var(--space-4)',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--glass-border)',
        gap: '8px'
      }}>

        {/* ===== LEFT: Hamburger + Logo + Breadcrumb ===== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>

          <button
            className={`menu-trigger-btn ${isOpen ? 'menu-open' : ''}`}
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <span className="menu-bar bar-1"></span>
            <span className="menu-bar bar-2"></span>
            <span className="menu-bar bar-3"></span>
          </button>

          <div className="navbar-logo" onClick={() => onNavigate('map')}>
            <div className="logo-icon">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,6 90,27 90,73 50,94 10,73 10,27" fill="#0b0f19" stroke="#818cf8" strokeWidth="7" strokeLinejoin="round" />
                <polygon points="50,12 85,30 85,70 50,88 15,70 15,30" fill="none" stroke="#6366f1" strokeWidth="2.5" opacity="0.6" strokeLinejoin="round" />
                <path d="M 37 38 L 25 50 L 37 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="56" y1="36" x2="44" y2="64" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
                <path d="M 63 38 L 75 50 L 63 62" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="logo-text">CODE.Q</span>
          </div>

          <div className="nav-divider nav-hide-md"></div>

          {/* Breadcrumbs */}
          <div className="navbar-breadcrumbs nav-hide-md">
            <span className="breadcrumb-home">WORKSPACE</span>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <span className="breadcrumb-sep">/</span>
                {i === breadcrumbs.length - 1
                  ? <span className="breadcrumb-current">{crumb}</span>
                  : <span>{crumb}</span>
                }
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ===== CENTER: Search ===== */}
        <div className="nav-search-wrapper nav-hide-md" ref={searchRef}>
          {searchOpen ? (
            <div className="nav-search-input">
              <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>🔍</span>
              <input
                autoFocus
                type="text"
                placeholder="Search pages..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } }}
              />
              <span
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                style={{ cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: '10px' }}
              >✕</span>
            </div>
          ) : (
            <div className="nav-search-btn" onClick={() => { setSearchOpen(true); Sounds.playClick(); }}>
              <span>🔍</span>
              <span>Search pages...</span>
              <span style={{ marginLeft: 'auto', background: 'var(--color-bg-secondary)', padding: '1px 5px', borderRadius: '3px', fontSize: '9px', border: '1px solid var(--glass-border)', letterSpacing: '0.02em' }}>⌘K</span>
            </div>
          )}

          {/* Search Results Dropdown */}
          {searchOpen && searchQuery.length > 0 && (
            <div className="search-dropdown">
              {filteredPages.length > 0 ? (
                filteredPages.map(page => (
                  <div
                    key={page.key}
                    className="search-result-item"
                    onClick={() => {
                      onNavigate(page.key);
                      setSearchOpen(false);
                      setSearchQuery('');
                      Sounds.playClick();
                    }}
                  >
                    <span>{page.icon}</span>
                    <span>{page.label}</span>
                  </div>
                ))
              ) : (
                <div className="search-no-result">No pages found for "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>

        {/* ===== RIGHT: Stats + Controls ===== */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>

          {/* Live Clock */}
          <div className="nav-clock nav-hide-md">
            <span className="nav-clock-time">{timeStr}</span>
            <span className="nav-clock-date">{dateStr}</span>
          </div>

          <div className="nav-divider nav-hide-md"></div>

          {/* Online Status */}
          <div className="status-indicator nav-hide-md" title="All systems operational">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>

          <div className="nav-divider nav-hide-md"></div>

          <div className="streak-badge nav-hide-md" title={`${streak}-day coding streak`}>
            <Flame size={16} className="streak-fire" style={{ color: 'var(--color-gold)' }} />
            <span>{streak}d</span>
          </div>



          <div className="nav-divider nav-hide-sm"></div>

          {/* Level */}
          <div className="level-pill nav-hide-sm" title="Your current level">
            <span>LVL</span>
            <span className="level-num">{Player.getLevel()}</span>
          </div>



          <div className="nav-divider"></div>

          {/* Notifications */}
          <div className="notif-wrapper" ref={notifRef}>
            <button
              className="notif-btn"
              onClick={() => { setNotifOpen(!notifOpen); Sounds.playClick(); }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </button>

            {notifOpen && (
              <div className="notif-dropdown">
                <div className="notif-header">
                  <span>NOTIFICATIONS</span>
                  <span 
                    onClick={handleMarkAllRead} 
                    style={{ color: 'var(--color-cyan)', cursor: 'pointer', fontWeight: 'normal', fontSize: '10px' }}
                  >
                    Mark all read
                  </span>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                    <span className="notif-icon">{n.icon}</span>
                    <div>
                      <div className="notif-text">{parseBold(n.text)}</div>
                      <div className="notif-time">{n.time}</div>
                    </div>
                    {n.unread && (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-cyan)', flexShrink: 0, marginTop: '4px', marginLeft: 'auto' }}></div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Avatar (Matches Profile Screen DP) */}
          <div
            className="navbar-avatar"
            onClick={() => { Sounds.playClick(); onNavigate('profile'); }}
            title="Developer Profile"
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: customDp ? '#0f172a' : 'linear-gradient(135deg, #0284c7, #4f46e5)',
              border: '2px solid rgba(56, 189, 248, 0.5)',
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', overflow: 'hidden'
            }}
          >
            {customDp ? (
              <img src={customDp} alt="Profile DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: 16, fontWeight: 900, color: '#ffffff', userSelect: 'none' }}>
                {usernameInitial}
              </span>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}
