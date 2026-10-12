import React, { useState, useEffect, useRef } from 'react';
import { Player } from '../game/player';
import { Sounds } from '../game/sounds';
import { AuthService } from '../game/auth';
import { GameEngine } from '../game/engine';
import { BACKEND_URL } from '../game/config';
import { LANGUAGE_CATEGORIES, LANGUAGE_META } from '../game/languages';
import { ArrowUp, ArrowLeft, BarChart2, User, Target, Megaphone, Cpu, Brain, Trash2, Edit2, Check, Settings, Shield, Code, Users, TrendingUp, Plus, RefreshCw, MoreVertical, Globe, Server, Database, ToggleLeft, ToggleRight, Layout, AlertTriangle, AlertCircle, Info, Eye, EyeOff, Zap, Clock, Star } from 'lucide-react';

// Admin token — must match backend ADMIN_SECRET_TOKEN env var
const ADMIN_TOKEN = 'codequest_admin_secret_2024';
const ADMIN_HEADERS = { 'Content-Type': 'application/json', 'X-Admin-Token': ADMIN_TOKEN };

interface AdminScreenProps {
  onBack: () => void;
}

interface PlayerRecord {
  name: string;
  xp: number;
  level: number;
  deviceType: string;
  avatar: string;
  updatedAt: string;
  isDeleted?: boolean;
  isBanned?: boolean;
  challengesCompleted?: number;
  achievements?: string[];
  currentRealm?: string;
}

export default function AdminScreen({ onBack }: AdminScreenProps) {
  const [activeTab, setActiveTab] = useState<'metrics' | 'users' | 'challenges' | 'broadcast' | 'languages' | 'settings'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('adminTab') as any;
      if (['metrics', 'users', 'challenges', 'broadcast', 'languages', 'settings'].includes(tab)) {
        return tab;
      }
    }
    return 'metrics';
  });
  const [players, setPlayers] = useState<PlayerRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState({ postgres: 'offline', redis: 'offline' });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [directAlertMsg, setDirectAlertMsg] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [editingPlayer, setEditingPlayer] = useState<PlayerRecord | null>(null);
  const [trackStatuses, setTrackStatuses] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('admin_track_statuses');
      if (stored) return JSON.parse(stored);
    } catch(e) {}
    return {
      'Frontend Engineering': true,
      'Backend Systems': true,
      'Database Architecture': false
    };
  });

  useEffect(() => {
    localStorage.setItem('admin_track_statuses', JSON.stringify(trackStatuses));
    window.dispatchEvent(new Event('storage'));
  }, [trackStatuses]);
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [broadcastPriority, setBroadcastPriority] = useState<'info' | 'warning' | 'critical'>('info');
  const [broadcastAudience, setBroadcastAudience] = useState<'all' | 'active' | 'premium'>('all');
  const [showBroadcastPreview, setShowBroadcastPreview] = useState(false);
  const broadcastTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [showBroadcastEmojiPicker, setShowBroadcastEmojiPicker] = useState(false);

  const [disabledLangs, setDisabledLangs] = useState<string[]>([]);
  const [languageSearch, setLanguageSearch] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const [apiThroughput, setApiThroughput] = useState<number[]>([12, 18, 15, 24, 30, 28, 42, 38, 45, 50, 48, 55]);
  const [memUsage, setMemUsage] = useState<number[]>([250, 252, 260, 270, 280, 275, 290, 310, 305, 320, 318, 325]);

  const isMobile = (Player.exists() && Player.getDeviceType() === 'android') || window.innerWidth <= 768;

  const [settingsEmail, setSettingsEmail] = useState('');
  const [settingsPassword, setSettingsPassword] = useState('');
  const [settingsPin, setSettingsPin] = useState('');
  const [settingsSaveMsg, setSettingsSaveMsg] = useState('');
  const [showSettingsPassword, setShowSettingsPassword] = useState(false);

  useEffect(() => {
    if (activeTab === 'settings') {
      const creds = AuthService.getAdminCredentials();
      setSettingsEmail(creds.email);
      setSettingsPassword(creds.password);
      setSettingsPin(AuthService.getAdminPin());
    }
  }, [activeTab]);

  const handleSaveSettings = () => {
    if (!settingsEmail || !settingsPassword || !settingsPin) {
      setSettingsSaveMsg('All fields are required.');
      setTimeout(() => setSettingsSaveMsg(''), 3000);
      return;
    }
    if (settingsPin.length !== 4 || !/^\d{4}$/.test(settingsPin)) {
      setSettingsSaveMsg('PIN must be exactly 4 digits.');
      setTimeout(() => setSettingsSaveMsg(''), 3000);
      return;
    }

    AuthService.setAdminCredentials(settingsEmail, settingsPassword);
    AuthService.setAdminPin(settingsPin);
    
    setSettingsSaveMsg('Settings saved successfully! You may need to log in again next time.');
    Sounds.playClick && Sounds.playClick();
    setTimeout(() => setSettingsSaveMsg(''), 4000);
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const healthRes = await fetch(`${BACKEND_URL}/health`);
      if (healthRes.ok) {
        const health = await healthRes.json();
        setDbStatus({
          postgres: health.services?.postgres || 'offline',
          redis: health.services?.redis || 'offline'
        });
      }
    } catch (err) {
      console.warn('Backend server offline during admin load');
    }

    try {
      const playersRes = await fetch(`${BACKEND_URL}/api/admin/players`, {
        headers: { 'X-Admin-Token': ADMIN_TOKEN }
      });
      if (playersRes.ok) {
        const data = await playersRes.json();
        setPlayers(data.players || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAdminData();
    // Fetch global config
    fetch(`${BACKEND_URL}/api/config/languages`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.disabledLanguages) {
          setDisabledLangs(data.disabledLanguages);
        }
      })
      .catch(err => console.error(err));
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/admin/metrics`, {
          headers: ADMIN_HEADERS
        });
        if (res.ok) {
          const data = await res.json();
          if (data.apiThroughput) setApiThroughput(data.apiThroughput);
          if (data.memUsage) setMemUsage(data.memUsage);
        }
      } catch (err) {
        // Ignore fetch errors during intervals to avoid console spam
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenEdit = (player: PlayerRecord) => {
    Sounds.playClick();
    setEditingPlayer(player);
  };



  const handleDeletePlayer = async (name: string) => {
    if (!window.confirm(`Are you sure you want to completely purge the account "${name}" from the database?`)) return;
    Sounds.playClick();
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/player/delete/${name}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Token': ADMIN_TOKEN }
      });
      if (res.ok) {
        loadAdminData();
        if (name === Player.getName()) {
          AuthService.clearSession();
          Player.reset();
          window.location.reload();
        }
      }
    } catch (err) {
      alert('Failed to delete: Backend offline');
    }
  };

  const handleRestorePlayer = async (name: string) => {
    Sounds.playClick();
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/player/restore/${encodeURIComponent(name)}`, {
        method: 'POST',
        headers: { 'X-Admin-Token': ADMIN_TOKEN }
      });
      if (res.ok) loadAdminData();
    } catch (err) {
      alert('Failed to restore: Backend offline');
    }
  };

  const handleToggleBan = async (player: PlayerRecord) => {
    if (!window.confirm(`Are you sure you want to ${player.isBanned ? 'unban' : 'ban'} ${player.name}?`)) return;
    Sounds.playClick();
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/player/ban/${encodeURIComponent(player.name)}`, {
        method: 'POST',
        headers: ADMIN_HEADERS,
        body: JSON.stringify({ banned: !player.isBanned })
      });
      if (res.ok) loadAdminData();
    } catch (err) { alert('Failed to update ban status: Backend offline'); }
  };

  const handleSendDirectAlert = async (name: string) => {
    if (!directAlertMsg.trim()) return;
    Sounds.playClick();
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/player/alert/${encodeURIComponent(name)}`, {
        method: 'POST',
        headers: ADMIN_HEADERS,
        body: JSON.stringify({ message: directAlertMsg })
      });
      if (res.ok) {
        setDirectAlertMsg('');
        alert('Alert sent successfully to ' + name);
      }
    } catch (err) { alert('Failed to send alert: Backend offline'); }
  };

  const handleSendBroadcast = async () => {
    if (!broadcastMsg.trim()) return;
    Sounds.playClick();
    try {
      const payload = {
        message: broadcastMsg,
        priority: broadcastPriority,
        audience: broadcastAudience
      };
      await fetch(`${BACKEND_URL}/api/admin/broadcast`, {
        method: 'POST', headers: ADMIN_HEADERS,
        body: JSON.stringify(payload)
      });
      setBroadcastSent(true);
      setBroadcastMsg('');
      setTimeout(() => setBroadcastSent(false), 3000);
    } catch (err) {
      alert('Failed to send broadcast: Backend offline');
    }
  };

  const handleBroadcastBoldClick = () => {
    const textarea = broadcastTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = broadcastMsg.substring(start, end);
    const newText = broadcastMsg.substring(0, start) + `**${selectedText || 'text'}**` + broadcastMsg.substring(end);
    setBroadcastMsg(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + 2, start + 2 + (selectedText ? selectedText.length : 4));
    }, 10);
  };

  const handleBroadcastEmojiSelect = (emoji: string) => {
    const textarea = broadcastTextareaRef.current;
    if (!textarea) {
      setBroadcastMsg(prev => prev + emoji);
      setShowBroadcastEmojiPicker(false);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = broadcastMsg.substring(0, start) + emoji + broadcastMsg.substring(end);
    setBroadcastMsg(newText);
    setShowBroadcastEmojiPicker(false);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 10);
  };

  const handleToggleLang = async (langKey: string) => {
    Sounds.playClick();
    const isCurrentlyDisabled = disabledLangs.includes(langKey);
    const newLangs = isCurrentlyDisabled
      ? disabledLangs.filter(l => l !== langKey)
      : [...disabledLangs, langKey];
    
    setDisabledLangs(newLangs);
    GameEngine.setDisabledLanguages(newLangs);

    try {
      await fetch(`${BACKEND_URL}/api/admin/config/languages`, {
        method: 'POST',
        headers: ADMIN_HEADERS,
        body: JSON.stringify({ disabledLanguages: newLangs })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAndSortedPlayers = React.useMemo(() => {
    let result = players;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.deviceType.toLowerCase().includes(q));
    }
    if (sortConfig) {
      result = [...result].sort((a, b) => {
        let aVal: any = a[sortConfig.key as keyof PlayerRecord];
        let bVal: any = b[sortConfig.key as keyof PlayerRecord];
        if (sortConfig.key === 'status') {
          aVal = a.isBanned ? 2 : a.isDeleted ? 1 : 0;
          bVal = b.isBanned ? 2 : b.isDeleted ? 1 : 0;
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [players, searchQuery, sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const isOnline = (updatedAt: string) => {
    const diff = Date.now() - new Date(updatedAt).getTime();
    return diff < 5 * 60 * 1000; // 5 minutes
  };
  
  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  };

  /* ─── RENDER ─── */
  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="screen admin-screen active"
      id="screen-admin"
      style={{
        padding: isMobile ? '0 10px 80px 10px' : '0 var(--space-6) var(--space-8) var(--space-6)',
        height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', boxSizing: 'border-box'
      }}
    >

      {/* ── Header ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '8px',
        width: '100%',
        padding: isMobile ? 'max(env(safe-area-inset-top, 24px), 24px) 0 0 0' : 'var(--space-5) 0 0 0',
        marginBottom: isMobile ? 'calc(12px + max(env(safe-area-inset-top, 32px), 32px))' : 'calc(var(--space-5) + 16px)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button className="btn btn-secondary" onClick={onBack}
              style={{ padding: '6px 10px', fontSize: '11px' }}>
              <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> {isMobile ? 'Back' : 'Back to Dashboard'}
            </button>
          </div>
          <button className="btn btn-secondary" onClick={() => window.location.href = window.location.origin + '?adminPreview=true&adminTab=' + activeTab}
            style={{ padding: '6px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Globe size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> {isMobile ? 'View Site' : 'View Full Website'}
          </button>
        </div>
        <h2 style={{
          fontSize: isMobile ? '1rem' : 'clamp(1.2rem, 4vw, 2rem)',
          textAlign: 'center', margin: '4px 0 0 0'
        }}>
          {isMobile ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Shield size={20} style={{ color: 'var(--color-cyan)' }} /> Admin Panel
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <Shield size={28} style={{ color: 'var(--color-cyan)', filter: 'drop-shadow(0 0 10px rgba(0, 245, 255, 0.4))' }} /> Administrative Control Panel
            </span>
          )}
        </h2>
        {!isMobile && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', margin: 0, textAlign: 'center' }}>
            Manage developer accounts, inspect Postgres/Redis cache cluster, and distribute announcements.
          </p>
        )}
      </div>

      {/* ── Premium Sticky Tab Bar ── */}
      <div style={{
        display: 'flex', gap: '6px',
        overflowX: 'auto', paddingBottom: '16px',
        marginBottom: '14px',
        position: 'sticky', top: -1,
        zIndex: 20,
        background: 'var(--color-bg-primary)',
        paddingTop: isMobile ? 'max(env(safe-area-inset-top, 32px), 32px)' : '16px',
        marginTop: isMobile ? 'calc(-1 * max(env(safe-area-inset-top, 32px), 32px))' : '-16px',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        flexShrink: 0,
      } as React.CSSProperties}>
        <div style={{
          display: 'inline-flex', gap: '4px',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          padding: '6px',
          borderRadius: '100px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          margin: isMobile ? '0' : '0 auto',
          width: 'max-content',
          minWidth: 'max-content',
          flexShrink: 0
        }}>
        {([
          { key: 'metrics',    icon: <BarChart2 size={16} />, label: isMobile ? 'Overview'  : 'System Overview' },
          { key: 'users',      icon: <User size={16} />, label: isMobile ? `Users(${players.length})`    : `User Profiles (${players.length})` },
          { key: 'challenges', icon: <Target size={16} />, label: isMobile ? 'Tracks'    : 'Challenge Tracks' },
          { key: 'broadcast',  icon: <Megaphone size={16} />, label: isMobile ? 'Broadcast' : 'Global Broadcast' },
          { key: 'languages',  icon: <Code size={16} />, label: isMobile ? 'Langs' : 'Languages' },
          { key: 'settings',   icon: <Settings size={16} />, label: 'Settings' },
        ] as const).map(tab => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => { Sounds.playClick(); setActiveTab(tab.key); }}
              style={{
                flex: '0 0 auto',
                width: isMobile && !isActive ? '40px' : 'auto',
                height: isMobile && !isActive ? '32px' : 'auto',
                padding: isMobile && !isActive ? '0' : (isMobile ? '8px 14px' : '10px 20px'),
                borderRadius: '100px',
                border: 'none',
                background: isActive ? 'linear-gradient(135deg, var(--color-cyan-dim), var(--color-cyan))' : 'transparent',
                color: isActive ? 'var(--color-text-inverse)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 'bold' : '600',
                fontSize: isMobile ? '11px' : 'var(--text-xs)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                whiteSpace: 'nowrap',
                outline: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile && !isActive ? '0' : '8px',
                boxShadow: isActive ? 'var(--shadow-neon-cyan)' : 'none',
                textShadow: isActive ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                transform: isActive ? 'scale(1)' : 'scale(0.98)',
                opacity: isActive ? 1 : 0.8,
                WebkitTapHighlightColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!isActive && !isMobile) {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive && !isMobile) {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.opacity = '0.8';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {tab.icon}{(!isMobile || isActive) && <span>{tab.label}</span>}
            </button>
          );
        })}
        </div>
        {/* Robust spacer for mobile right padding */}
        {isMobile && <div style={{ width: '24px', minWidth: '24px', flexShrink: 0, color: 'transparent' }}>.</div>}
      </div>

      {/* ── Tab Contents ── */}
      <div style={{ flex: 1, width: '100%', maxWidth: '900px', margin: '0 auto', minWidth: 0 }}>

        {/* ── Tab 1: System Metrics ── */}
        {activeTab === 'metrics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* Status cards */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
              {[
                {
                  label: 'POSTGRESQL DATABASE', value: 'pgPool Cluster',
                  desc: 'Persistent player data schema synchronized.',
                  ok: dbStatus.postgres === 'connected',
                  okText: '● ONLINE', failText: '● MEMORY FALLBACK',
                  okColor: 'var(--color-green)', failColor: 'var(--color-gold)',
                  okBg: 'rgba(16,185,129,0.15)', failBg: 'rgba(245,158,11,0.15)',
                },
                {
                  label: 'REDIS LEADERBOARD CACHE', value: 'ioredis Sorted Set',
                  desc: 'Dynamic scoring metrics cache status.',
                  ok: dbStatus.redis === 'connected',
                  okText: '● ONLINE', failText: '● DISABLED',
                  okColor: 'var(--color-green)', failColor: 'var(--color-red)',
                  okBg: 'rgba(16,185,129,0.15)', failBg: 'rgba(239,68,68,0.15)',
                },
              ].map(card => (
                <div key={card.label} style={{
                  background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)',
                  padding: isMobile ? '12px' : '20px', borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>{card.label}</span>
                    <span style={{
                      fontSize: '9px', fontWeight: 'bold', padding: '3px 8px',
                      borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap',
                      background: card.ok ? card.okBg : card.failBg,
                      color: card.ok ? card.okColor : card.failColor,
                    }}>{card.ok ? card.okText : card.failText}</span>
                  </div>
                  <div style={{ fontSize: isMobile ? '16px' : '22px', fontWeight: 'bold', color: '#fff' }}>{card.value}</div>
                  <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', margin: '6px 0 0 0' }}>{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Live Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
              {[
                { data: apiThroughput, label: 'Live API Requests / Sec', color: 'var(--color-cyan)', dimColor: 'var(--color-cyan-dim)', glow: 'var(--color-cyan-glow)', normalize: (v: number) => v },
                { data: memUsage, label: 'Memory Heap (MB)', color: 'var(--color-magenta)', dimColor: 'var(--color-magenta-dim)', glow: 'var(--color-magenta-glow)', normalize: (v: number) => (v / 800) * 100 },
              ].map(chart => (
                <div key={chart.label} style={{
                  background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)',
                  padding: isMobile ? '12px' : '20px', borderRadius: 'var(--radius-lg)'
                }}>
                  <h4 style={{ fontSize: '11px', color: chart.color, margin: `0 0 ${isMobile ? '8px' : '14px'} 0` }}>{chart.label}</h4>
                  <div style={{
                    display: 'flex', alignItems: 'flex-end',
                    height: isMobile ? '80px' : '130px',
                    gap: '3px',
                    borderLeft: '1px solid rgba(255,255,255,0.06)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    paddingLeft: '4px', overflow: 'hidden'
                  }}>
                    {chart.data.map((val, i) => (
                      <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <div style={{
                          width: '100%',
                          height: `${chart.normalize(val)}%`,
                          minHeight: '3px',
                          background: `linear-gradient(to top, ${chart.dimColor}, ${chart.color})`,
                          borderRadius: '2px 2px 0 0',
                          boxShadow: `0 0 5px ${chart.glow}`,
                          transition: 'height 0.3s ease'
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab 2: User Profiles ── */}
        {activeTab === 'users' && (
          <div style={{ background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'stretch' : 'center', padding: '12px 14px', borderBottom: '1px solid var(--glass-border)', gap: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '12px' }}>Active Database Profiles</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Search user or device..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    padding: '6px 10px', fontSize: '11px', background: 'var(--color-bg-dark)',
                    border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', outline: 'none',
                    flex: 1
                  }}
                />
                <button onClick={loadAdminData}
                  style={{ padding: '6px 10px', fontSize: '11px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--color-text-secondary)', cursor: 'pointer', borderRadius: '6px' }}>
                  Refresh
                </button>
              </div>
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>Loading...</div>
            ) : filteredAndSortedPlayers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No player records found.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '10px' : '12px', minWidth: isMobile ? '100%' : '560px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'var(--color-bg-dark)', color: 'var(--color-text-secondary)' }}>
                      <th onClick={() => handleSort('name')} style={{ padding: isMobile ? '8px' : '12px', textAlign: 'left', cursor: 'pointer' }}>Codename {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                      <th onClick={() => handleSort('level')} style={{ padding: isMobile ? '8px' : '12px', textAlign: 'center', cursor: 'pointer' }}>Level {sortConfig?.key === 'level' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                      <th onClick={() => handleSort('updatedAt')} style={{ padding: '12px', textAlign: 'center', cursor: 'pointer' }}>Status {sortConfig?.key === 'updatedAt' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                      <th onClick={() => handleSort('deviceType')} style={{ padding: '12px', textAlign: 'center', cursor: 'pointer' }}>Device {sortConfig?.key === 'deviceType' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedPlayers.map(p => (
                      <React.Fragment key={p.name}>
                        <tr onClick={() => {
                          setExpandedRow(expandedRow === p.name ? null : p.name);
                          setEditingPlayer(expandedRow === p.name ? null : p);
                        }} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', opacity: p.isDeleted || p.isBanned ? 0.6 : 1, cursor: 'pointer', background: expandedRow === p.name ? 'rgba(0, 245, 255, 0.05)' : 'transparent', transition: 'background 0.2s' }}>
                          <td style={{ padding: isMobile ? '8px' : '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: p.isDeleted || p.isBanned ? 'var(--color-text-muted)' : '#fff' }}>
                            <span>{p.avatar}</span>
                            <span style={{ textDecoration: p.isDeleted || p.isBanned ? 'line-through' : 'none' }}>{p.name}</span>
                            {p.isDeleted && <span style={{ fontSize: '9px', padding: '2px 5px', background: 'rgba(239,68,68,0.15)', color: 'var(--color-red)', borderRadius: '3px' }}>PURGED</span>}
                            {p.isBanned && <span style={{ fontSize: '9px', padding: '2px 5px', background: 'rgba(239,68,68,0.15)', color: 'var(--color-red)', borderRadius: '3px' }}>BANNED</span>}
                          </td>
                          <td style={{ padding: isMobile ? '8px' : '12px', textAlign: 'center', color: 'var(--color-cyan)', fontWeight: 'bold' }}>LVL {p.level}</td>
                          <td style={{ padding: isMobile ? '8px' : '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isOnline(p.updatedAt) ? 'var(--color-green)' : 'var(--color-text-muted)', boxShadow: isOnline(p.updatedAt) ? '0 0 5px var(--color-green)' : 'none' }}></div>
                              <span style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>{formatTimeAgo(p.updatedAt)}</span>
                            </div>
                          </td>
                          <td style={{ padding: isMobile ? '8px' : '12px', textAlign: 'center', fontSize: '10px', textTransform: 'uppercase' }}>{p.deviceType}</td>
                        </tr>
                        {expandedRow === p.name && (
                          <tr style={{ borderBottom: '1px solid var(--glass-border)', background: 'var(--color-bg-darkest)' }}>
                            <td colSpan={4} style={{ padding: isMobile ? '10px' : '20px' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: isMobile ? '12px' : '24px', background: 'var(--color-bg-darkest)', padding: isMobile ? '12px' : '24px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
                                


                                {/* Block 2: Administration */}
                                <div style={{ background: 'var(--color-bg-dark)', borderRadius: '10px', padding: '16px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                  <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 'bold', letterSpacing: '1px' }}><Settings size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }}/> ACCOUNT SETTINGS</div>
                                  


                                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                      <label style={{ fontSize: '9px', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>DIRECT SYSTEM MESSAGE</label>
                                      <span style={{ fontSize: '9px', color: directAlertMsg.length > 300 ? 'var(--color-red)' : 'var(--color-text-muted)' }}>{directAlertMsg.length}/300</span>
                                    </div>
                                    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                      <textarea 
                                        ref={textareaRef}
                                        placeholder="Type a direct alert to this player..." 
                                        value={directAlertMsg} 
                                        onChange={e => setDirectAlertMsg(e.target.value)}
                                        maxLength={300}
                                        style={{ 
                                          width: '100%', 
                                          height: '110px', 
                                          minHeight: '90px',
                                          padding: '12px 12px 42px 12px', 
                                          background: 'var(--color-bg-darkest)', 
                                          border: '1px solid var(--glass-border)', 
                                          borderRadius: '8px', 
                                          color: '#fff', 
                                          fontSize: '13px', 
                                          outline: 'none',
                                          resize: 'vertical',
                                          lineHeight: '1.5',
                                          fontFamily: 'inherit',
                                          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)',
                                          transition: 'border-color 0.2s'
                                        }} 
                                        onFocus={e => e.target.style.borderColor = 'var(--color-cyan)'}
                                        onBlur={e => e.target.style.borderColor = 'var(--glass-border)'}
                                      />
                                      <div style={{ position: 'absolute', bottom: '8px', right: '8px', left: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none' }}>
                                        <div style={{ display: 'flex', gap: '8px', color: 'var(--color-text-muted)', pointerEvents: 'auto' }}>
                                          <button 
                                            onClick={() => {
                                              const textarea = textareaRef.current;
                                              if (!textarea) return;
                                              const start = textarea.selectionStart;
                                              const end = textarea.selectionEnd;
                                              const text = directAlertMsg;
                                              const selected = text.substring(start, end);
                                              const newText = text.substring(0, start) + `**${selected}**` + text.substring(end);
                                              setDirectAlertMsg(newText);
                                              setTimeout(() => {
                                                textarea.focus();
                                                textarea.setSelectionRange(start + 2, end + 2);
                                              }, 0);
                                            }}
                                            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} title="Bold Text"
                                          >
                                            <span style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'serif' }}>B</span>
                                          </button>
                                          <div style={{ position: 'relative' }}>
                                            <button 
                                              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }} title="Insert Emoji"
                                            >
                                              <span style={{ fontSize: '14px' }}>😀</span>
                                            </button>
                                            
                                            {showEmojiPicker && (
                                              <div style={{ position: 'absolute', bottom: '100%', left: 0, marginBottom: '8px', background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '8px', display: 'flex', gap: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 10 }}>
                                                {['😀', '😂', '🔥', '👍', '🚀', '⚠️', '🚨', '✅'].map(emoji => (
                                                  <button 
                                                    key={emoji}
                                                    onClick={() => {
                                                      const textarea = textareaRef.current;
                                                      if (!textarea) {
                                                        setDirectAlertMsg(prev => prev + emoji);
                                                        setShowEmojiPicker(false);
                                                        return;
                                                      }
                                                      const start = textarea.selectionStart;
                                                      const end = textarea.selectionEnd;
                                                      const text = directAlertMsg;
                                                      const newText = text.substring(0, start) + emoji + text.substring(end);
                                                      setDirectAlertMsg(newText);
                                                      setShowEmojiPicker(false);
                                                      setTimeout(() => {
                                                        textarea.focus();
                                                        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
                                                      }, 0);
                                                    }}
                                                    style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
                                                  >
                                                    {emoji}
                                                  </button>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <button 
                                          onClick={() => {
                                            if (!directAlertMsg.trim()) return;
                                            handleSendDirectAlert(p.name);
                                            setDirectAlertMsg('');
                                          }} 
                                          className="btn btn-primary" 
                                          disabled={!directAlertMsg.trim()}
                                          style={{ 
                                            pointerEvents: 'auto',
                                            padding: '4px 12px', 
                                            fontSize: '11px', 
                                            height: '28px', 
                                            borderRadius: '6px',
                                            opacity: directAlertMsg.trim() ? 1 : 0.5,
                                            cursor: directAlertMsg.trim() ? 'pointer' : 'not-allowed',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            background: 'linear-gradient(90deg, #818cf8, #a78bfa)',
                                            border: 'none',
                                            color: '#fff',
                                            fontWeight: 'bold'
                                          }}
                                        >
                                          Send
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Block 3: Security & Enforcement */}
                                <div style={{ background: 'rgba(239, 68, 68, 0.05)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                  <div style={{ fontSize: '10px', color: 'var(--color-red)', fontWeight: 'bold', letterSpacing: '1px' }}><Shield size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }}/> ENFORCEMENT</div>
                                  
                                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '11px', lineHeight: '1.5' }}>
                                    Use these tools carefully. Banning restricts login, while purging permanently destroys the player's progression data.
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                                    <button onClick={() => handleToggleBan(p)} className={p.isBanned ? "btn" : "btn btn-danger"} style={{ width: '100%', fontSize: '11px', padding: '10px', background: p.isBanned ? 'rgba(16,185,129,0.15)' : '', color: p.isBanned ? 'var(--color-green)' : '', border: p.isBanned ? '1px solid var(--color-green)' : '' }}>
                                      {p.isBanned ? '✅ Unban Account' : '🚫 Ban Account'}
                                    </button>
                                    <button onClick={() => handleDeletePlayer(p.name)} className="btn btn-secondary" style={{ width: '100%', fontSize: '11px', padding: '10px', color: 'var(--color-red)', borderColor: 'rgba(239,68,68,0.3)' }}>
                                      <Trash2 size={14} style={{ marginRight: '6px', verticalAlign: 'text-bottom' }}/> Purge Profile Data
                                    </button>
                                  </div>
                                </div>
                                
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Tab 3: Challenge Tracks ── */}
        {activeTab === 'challenges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: isMobile ? '14px' : '20px', borderRadius: 'var(--radius-lg)' }}>
              <div>
                <h4 style={{ fontSize: '14px', color: '#fff', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layout size={16} color="var(--color-cyan)" /> 
                  Learning Modules CMS
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Manage and monitor your curriculum tracks, active learners, and module statuses.
                </p>
              </div>

            </div>

            {/* Track Cards */}
            {(() => {
              const activePlayers = players.filter(p => !p.isBanned && !p.isDeleted);
              const totalPlayers = activePlayers.length;
              const avgChallenges = totalPlayers > 0 ? activePlayers.reduce((sum, p) => sum + (p.challengesCompleted || 0), 0) / totalPlayers : 0;
              
              const frontendPct = Math.min(100, Math.round((avgChallenges / 5) * 100));
              const backendPct = Math.max(0, Math.min(100, Math.round(((avgChallenges - 2) / 5) * 100)));
              const dbPct = Math.max(0, Math.min(100, Math.round(((avgChallenges - 4) / 5) * 100)));

              return (
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                  {[
                    { icon: <Globe size={18} />, title: 'Frontend Engineering', color: 'var(--realm-forest-primary)', desc: 'Semantic markup, Grid, Flexbox.', learners: totalPlayers, completion: frontendPct, bg: 'rgba(16, 185, 129, 0.05)' },
                    { icon: <Server size={18} />, title: 'Backend Systems', color: 'var(--realm-dungeon-primary)', desc: 'APIs, Express Routers, Middleware.', learners: totalPlayers, completion: backendPct, bg: 'rgba(167, 139, 250, 0.05)' },
                    { icon: <Database size={18} />, title: 'Database Architecture', color: 'var(--realm-vault-primary)', desc: 'INNER JOIN queries, Keys, Indexes.', learners: totalPlayers, completion: dbPct, bg: 'rgba(251, 191, 36, 0.05)' },
                  ].map(track => {
                    const isActive = trackStatuses[track.title] ?? false;
                    return (
                      <div key={track.title} style={{ background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    {/* Card Header */}
                    <div style={{ padding: '20px', background: track.bg, borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: `1px solid ${track.color}`, display: 'flex', justifyContent: 'center', alignItems: 'center', color: track.color }}>
                          {track.icon}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{track.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>5 Core Levels</div>
                        </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Card Body */}
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                      <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                        {track.desc}
                      </div>
                      
                      {/* Analytics */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Users size={12}/> Active Learners</span>
                          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{track.learners}</span>
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={12}/> Avg. Completion</span>
                            <span style={{ fontSize: '11px', color: track.color, fontWeight: 'bold' }}>{track.completion}%</span>
                          </div>
                          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${track.completion}%`, height: '100%', background: track.color, borderRadius: '2px' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer (Toggle) */}
                    <div style={{ padding: '12px 20px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.1)' }}>
                      <span style={{ fontSize: '11px', color: isActive ? 'var(--color-green)' : 'var(--color-text-muted)', fontWeight: 'bold' }}>
                        {isActive ? '● Live' : '○ Maintenance'}
                      </span>
                      <button 
                        onClick={() => setTrackStatuses(prev => ({ ...prev, [track.title]: !prev[track.title] }))}
                        style={{ background: 'none', border: 'none', color: isActive ? 'var(--color-green)' : 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        {isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                    </div>
                  </div>
                );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* ── Tab 4: Global Broadcast ── */}
        {activeTab === 'broadcast' && (
          <div style={{
            background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)',
            padding: isMobile ? '16px' : '28px', borderRadius: 'var(--radius-lg)',
            maxWidth: '700px', margin: '0 auto', width: '100%', boxSizing: 'border-box'
          }}>
            <h4 style={{ fontSize: '13px', color: 'var(--color-cyan)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Megaphone size={16} /> Broadcast Dispatch Center
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Distribute rich notifications to player devices globally.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Target Audience & Priority Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Target Audience</label>
                  <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    {[
                      { id: 'all', label: 'All Players', icon: <Globe size={12}/> },
                      { id: 'active', label: 'Active Now', icon: <Zap size={12}/> }
                    ].map(aud => (
                      <button 
                        key={aud.id}
                        onClick={() => setBroadcastAudience(aud.id as any)}
                        style={{ 
                          padding: '6px 12px', fontSize: '11px', border: 'none', 
                          background: broadcastAudience === aud.id ? 'rgba(255,255,255,0.1)' : 'transparent', 
                          color: broadcastAudience === aud.id ? '#fff' : 'var(--color-text-muted)', 
                          borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                          fontWeight: broadcastAudience === aud.id ? 'bold' : 'normal',
                          transition: 'all 0.2s'
                        }}
                      >
                        {aud.icon} {aud.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Priority Level</label>
                  <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '4px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                    {[
                      { id: 'info', label: 'Info', color: 'var(--color-cyan)', icon: <Info size={12}/> },
                      { id: 'warning', label: 'Warning', color: 'var(--color-gold)', icon: <AlertCircle size={12}/> },
                      { id: 'critical', label: 'Critical', color: 'var(--color-red)', icon: <AlertTriangle size={12}/> }
                    ].map(pri => (
                      <button 
                        key={pri.id}
                        onClick={() => setBroadcastPriority(pri.id as any)}
                        style={{ 
                          padding: '6px 12px', fontSize: '11px', 
                          background: broadcastPriority === pri.id ? `${pri.color}20` : 'transparent', 
                          color: broadcastPriority === pri.id ? pri.color : 'var(--color-text-muted)', 
                          borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                          fontWeight: broadcastPriority === pri.id ? 'bold' : 'normal',
                          border: `1px solid ${broadcastPriority === pri.id ? `${pri.color}50` : 'transparent'}`,
                          transition: 'all 0.2s'
                        }}
                      >
                        {pri.icon} {pri.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Composer Area */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    Alert Content
                  </label>
                  <button 
                    onClick={() => setShowBroadcastPreview(!showBroadcastPreview)}
                    style={{ background: 'none', border: 'none', color: showBroadcastPreview ? 'var(--color-cyan)' : 'var(--color-text-muted)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Eye size={12} /> {showBroadcastPreview ? 'Edit Mode' : 'Preview Output'}
                  </button>
                </div>
                
                <div style={{ 
                  position: 'relative',
                  border: `1px solid ${broadcastPriority === 'info' ? 'var(--glass-border)' : broadcastPriority === 'warning' ? 'var(--color-gold-glow)' : 'var(--color-red-glow)'}`,
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.3)',
                  overflow: 'visible',
                  boxShadow: broadcastPriority === 'warning' ? '0 0 15px rgba(234, 179, 8, 0.1)' : broadcastPriority === 'critical' ? '0 0 20px rgba(239, 68, 68, 0.15)' : 'none',
                  transition: 'all 0.3s ease'
                }}>
                  {showBroadcastPreview ? (
                    <div style={{ padding: '16px', minHeight: '120px', color: '#fff', fontSize: '13px', lineHeight: '1.5' }}>
                      {/* Markdown mock renderer */}
                      <span dangerouslySetInnerHTML={{__html: broadcastMsg.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') || '<span style="color:var(--color-text-muted)">Preview will appear here...</span>'}} />
                    </div>
                  ) : (
                    <textarea
                      ref={broadcastTextareaRef}
                      value={broadcastMsg}
                      onChange={e => setBroadcastMsg(e.target.value)}
                      placeholder="Enter the broadcast payload here... Markdown **bold** supported."
                      style={{
                        width: '100%', minHeight: '120px', boxSizing: 'border-box',
                        background: 'transparent', border: 'none', padding: '16px', color: '#fff',
                        fontSize: '13px', outline: 'none', resize: 'vertical', fontFamily: 'sans-serif',
                        lineHeight: '1.5'
                      }}
                    />
                  )}

                  {/* Formatting Toolbar */}
                  {!showBroadcastPreview && (
                    <div style={{ 
                      padding: '8px 12px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' 
                    }}>
                      <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                        <button 
                          onClick={handleBroadcastBoldClick}
                          title="Bold (Markdown)"
                          style={{ background: 'var(--color-bg-dark)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '4px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' }}
                        >B</button>
                        <button 
                          onClick={() => setShowBroadcastEmojiPicker(!showBroadcastEmojiPicker)}
                          style={{ background: 'var(--color-bg-dark)', border: '1px solid var(--glass-border)', color: '#fff', borderRadius: '4px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >😀</button>
                        {showBroadcastEmojiPicker && (
                          <div style={{
                            position: 'absolute', bottom: '100%', left: '40px', marginBottom: '8px',
                            background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)',
                            borderRadius: 'var(--radius-md)', padding: '8px', display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', zIndex: 100,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                          }}>
                            {['⚠️','🔥','✅','🚀','📢','💡','🎉','🛠️','🛑','💰'].map(emoji => (
                              <button
                                key={emoji}
                                onClick={() => handleBroadcastEmojiSelect(emoji)}
                                style={{ background: 'transparent', border: 'none', fontSize: '16px', cursor: 'pointer', padding: '4px', borderRadius: '4px' }}
                              >{emoji}</button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                        {broadcastMsg.length} / 500
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button onClick={handleSendBroadcast} disabled={!broadcastMsg.trim()} 
                style={{ 
                  padding: '14px', fontWeight: 'bold', fontSize: '13px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
                  background: !broadcastMsg.trim() ? 'var(--color-bg-dark)' : broadcastPriority === 'info' ? 'var(--color-cyan)' : broadcastPriority === 'warning' ? 'var(--color-gold)' : 'var(--color-red)',
                  color: !broadcastMsg.trim() ? 'var(--color-text-muted)' : '#000',
                  border: 'none', borderRadius: '12px', cursor: !broadcastMsg.trim() ? 'not-allowed' : 'pointer',
                  boxShadow: broadcastMsg.trim() ? `0 4px 15px ${broadcastPriority === 'info' ? 'var(--color-cyan)' : broadcastPriority === 'warning' ? 'var(--color-gold)' : 'var(--color-red)'}40` : 'none',
                  transition: 'all 0.2s'
                }}>
                <Megaphone size={16} /> 
                {broadcastPriority === 'critical' ? 'DISPATCH CRITICAL ALERT' : broadcastPriority === 'warning' ? 'DISPATCH WARNING NOTIFICATION' : 'DISTRIBUTE GENERAL BROADCAST'}
              </button>
              
              {broadcastSent && (
                <div style={{ 
                  color: broadcastPriority === 'info' ? 'var(--color-cyan)' : broadcastPriority === 'warning' ? 'var(--color-gold)' : 'var(--color-red)', 
                  fontSize: '11px', fontWeight: 'bold', textAlign: 'center', background: 'rgba(0,0,0,0.3)', padding: '8px', borderRadius: '6px' 
                }}>
                  ✔ Notice dispatched successfully to {broadcastAudience} players!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab 5: Languages ── */}
        {activeTab === 'languages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: isMobile ? '14px' : '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '13px', color: '#fff', margin: '0 0 6px 0' }}>🌐 Programming Languages Config</h4>
                  <p style={{ fontSize: '11px', color: 'var(--color-text-secondary)', margin: 0 }}>
                    Enable or disable specific languages platform-wide. Changes reflect immediately across all connected clients.
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Search language..."
                  value={languageSearch}
                  onChange={e => setLanguageSearch(e.target.value)}
                  style={{
                    padding: '8px 12px', fontSize: '12px', background: 'var(--color-bg-dark)',
                    border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', outline: 'none',
                    minWidth: '200px', flex: isMobile ? '1' : '0 0 auto'
                  }}
                />
              </div>
            </div>
            
            {LANGUAGE_CATEGORIES.map(cat => {
              const filteredLangs = cat.languages.filter(langKey => {
                const meta = LANGUAGE_META[langKey];
                return meta && meta.label.toLowerCase().includes(languageSearch.toLowerCase());
              });

              if (filteredLangs.length === 0) return null;

              return (
                <div key={cat.label} style={{ background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: isMobile ? '14px' : '20px', borderRadius: 'var(--radius-lg)' }}>
                  <h5 style={{ fontSize: '12px', color: 'var(--color-cyan)', margin: '0 0 12px 0', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{cat.label}</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                    {filteredLangs.map(langKey => {
                    const meta = LANGUAGE_META[langKey];
                    if (!meta) return null;
                    const isDisabled = disabledLangs.includes(langKey);
                    return (
                      <div key={langKey} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '10px 14px',
                        background: isDisabled ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)',
                        border: `1px solid ${isDisabled ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                        borderRadius: 'var(--radius-sm)',
                        transition: 'all 0.2s'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {meta.deviconClass ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', background: 'rgba(255,255,255,0.9)', borderRadius: '4px' }}>
                              <i className={`${meta.deviconClass} colored`} style={{ fontSize: '18px' }}></i>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
                              <span style={{ fontSize: '18px' }}>{meta.icon}</span>
                            </div>
                          )}
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: isDisabled ? 'var(--color-text-secondary)' : '#fff', textDecoration: isDisabled ? 'line-through' : 'none' }}>{meta.label}</div>
                            <div style={{ fontSize: '9px', color: isDisabled ? 'var(--color-red)' : 'var(--color-green)' }}>{isDisabled ? 'DISABLED' : 'ACTIVE'}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggleLang(langKey)}
                          style={{
                            background: isDisabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: isDisabled ? 'var(--color-green)' : 'var(--color-red)',
                            border: `1px solid ${isDisabled ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                            padding: '4px 10px',
                            borderRadius: '4px',
                            fontSize: '9px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            outline: 'none',
                            textTransform: 'uppercase'
                          }}
                        >
                          {isDisabled ? 'Enable' : 'Disable'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Tab 6: Settings ── */}
      {activeTab === 'settings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)',
            padding: isMobile ? '16px' : '24px', borderRadius: 'var(--radius-lg)'
          }}>
            <h3 style={{ fontSize: '18px', color: '#fff', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings size={20} style={{ color: 'var(--color-cyan)' }} /> Admin Credentials
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>Admin Email</label>
                <input 
                  type="email" 
                  value={settingsEmail} 
                  onChange={(e) => setSettingsEmail(e.target.value)}
                  className="auth-input"
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: '#fff', padding: '12px', borderRadius: '8px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>Admin Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showSettingsPassword ? "text" : "password"} 
                    value={settingsPassword} 
                    onChange={(e) => setSettingsPassword(e.target.value)}
                    className="auth-input"
                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: '#fff', padding: '12px', paddingRight: '40px', borderRadius: '8px', width: '100%', boxSizing: 'border-box' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowSettingsPassword(!showSettingsPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {showSettingsPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>4-Digit Verification PIN (Used for Admin Access unlock)</label>
                <input 
                  type="text" 
                  maxLength={4}
                  value={settingsPin} 
                  onChange={(e) => setSettingsPin(e.target.value.replace(/\D/g, ''))}
                  className="auth-input"
                  style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: '#fff', padding: '12px', borderRadius: '8px', letterSpacing: '4px', fontWeight: 'bold' }}
                />
              </div>

              {settingsSaveMsg && (
                <div style={{ 
                  padding: '10px 14px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '12px',
                  background: settingsSaveMsg.includes('successfully') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: settingsSaveMsg.includes('successfully') ? 'var(--color-green)' : 'var(--color-red)',
                  border: `1px solid ${settingsSaveMsg.includes('successfully') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                }}>
                  {settingsSaveMsg}
                </div>
              )}

              <button 
                className="btn btn-primary" 
                onClick={handleSaveSettings}
                style={{ marginTop: '8px', padding: '12px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <Check size={18} /> Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* ── Scroll to Top Button ── */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: isMobile ? '80px' : '30px',
            right: isMobile ? '20px' : '30px',
            width: '44px', height: '44px',
            borderRadius: '50%',
            background: 'var(--color-cyan)',
            color: '#000',
            border: 'none',
            outline: 'none',
            WebkitTapHighlightColor: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0, 245, 255, 0.4)',
            cursor: 'pointer', zIndex: 100,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
