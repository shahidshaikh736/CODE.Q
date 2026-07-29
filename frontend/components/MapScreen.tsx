import React, { useState, useEffect } from 'react';
import { Player } from '../game/player';
import { Sounds } from '../game/sounds';
import { GameEngine } from '../game/engine';
import {
  LANGUAGE_CATEGORIES,
  LANGUAGE_META,
  DEFAULT_CODES,
  HINTS_DATA
} from '../game/languages';
import { LANGUAGE_DICTIONARY } from '../game/dictionary';

export default function MapScreen({ onSelectRealm, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLangInfo, setSelectedLangInfo] = useState(null);
  const [modalTab, setModalTab] = useState('syllabus');
  const [trackStatuses, setTrackStatuses] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const loadStatuses = () => {
      try {
        const stored = localStorage.getItem('admin_track_statuses');
        if (stored) {
          setTrackStatuses(JSON.parse(stored));
        } else {
          setTrackStatuses({
            'Frontend Engineering': true,
            'Backend Systems': true,
            'Database Architecture': true
          });
        }
      } catch (e) {}
    };
    
    loadStatuses();
    window.addEventListener('storage', loadStatuses);
    return () => window.removeEventListener('storage', loadStatuses);
  }, []);
  const realms = [
    {
      id: 'forest',
      title: 'Frontend Engineering Track',
      desc: 'Master the foundational mechanics of semantic HTML5, advanced CSS layout architecture, and modern JavaScript component engineering.',
      badge: 'TRACK 01',
      tags: ['HTML5', 'CSS Grid', 'JavaScript', 'React'],
      color: '#38bdf8',
      bgGlow: 'rgba(56, 189, 248, 0.12)',
      borderGlow: 'rgba(56, 189, 248, 0.3)',
      svgIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
          <path d="m10 8-3 3 3 3"></path>
          <path d="m14 8 3 3-3 3"></path>
        </svg>
      ),
      themeClass: 'realm-forest'
    },
    {
      id: 'dungeon',
      title: 'Backend Systems Track',
      desc: 'Delve into HTTP request routing, REST API endpoints, middleware authorization filtering, and Fastify/Express server architectures.',
      badge: 'TRACK 02',
      tags: ['Node.js', 'Express', 'REST APIs', 'Fastify'],
      color: '#818cf8',
      bgGlow: 'rgba(129, 140, 248, 0.12)',
      borderGlow: 'rgba(129, 140, 248, 0.3)',
      svgIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
          <path d="M12 10v4"></path>
          <path d="m10 12 2 2 2-2"></path>
        </svg>
      ),
      themeClass: 'realm-dungeon'
    },
    {
      id: 'vault',
      title: 'Database Architecture Track',
      desc: 'Master structured relational database schemas, SQL keys, query optimizations, and transactional data integrity.',
      badge: 'TRACK 03',
      tags: ['SQL', 'PostgreSQL', 'Relational DB', 'Queries'],
      color: '#34d399',
      bgGlow: 'rgba(52, 211, 153, 0.12)',
      borderGlow: 'rgba(52, 211, 153, 0.3)',
      svgIcon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      ),
      themeClass: 'realm-vault'
    }
  ];

  const handleRealmClick = (realmId) => {
    Sounds.playClick();
    
    // Check premium locks
    if (realmId !== 'forest' && !Player.isPremium()) {
      Sounds.playError();
      window.dispatchEvent(new CustomEvent('open-premium-modal'));
      return;
    }

    if (Player.isRealmUnlocked(realmId)) {
      onSelectRealm(realmId);
    } else {
      Sounds.playError();
    }
  };

  const handlePracticeClick = (langKey) => {
    Sounds.playClick();
    sessionStorage.setItem('sandbox_direct_lang', langKey);
    sessionStorage.setItem('sandbox_direct_code', DEFAULT_CODES[langKey] || '');
    setSelectedLangInfo(null);
    if (onNavigate) {
      onNavigate('playground');
    }
  };

  // Filter languages logic
  const allLanguagesList = Object.keys(LANGUAGE_META)
    .filter(key => !GameEngine.getDisabledLanguages().includes(key))
    .map(key => ({
      key,
      ...LANGUAGE_META[key]
    })).sort((a, b) => a.label.localeCompare(b.label));

  const filteredLanguages = allLanguagesList.filter(lang => {
    // 1. Search Query filter
    const matchesSearch = 
      lang.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.creator.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    // 2. Category Tab Filter
    if (activeFilter === 'all') return true;
    if (activeFilter === 'frontend') {
      return LANGUAGE_CATEGORIES[0].languages.includes(lang.key);
    }
    if (activeFilter === 'backend') {
      return LANGUAGE_CATEGORIES[1].languages.includes(lang.key);
    }
    if (activeFilter === 'database') {
      return LANGUAGE_CATEGORIES[2].languages.includes(lang.key);
    }
    if (activeFilter === 'systems') {
      return LANGUAGE_CATEGORIES[3].languages.includes(lang.key);
    }
    return true;
  });

  return (
    <div className="screen map-screen active" id="screen-map" style={{ paddingBottom: 'var(--space-12)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Premium custom scrollbars inside modal */
        .syllabus-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .syllabus-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .syllabus-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 4px;
        }
        .syllabus-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--color-cyan-dim);
        }

        /* Library Cards Hover animations */
        .lang-library-card {
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .lang-library-card:hover {
          transform: translateY(-3px);
          border-color: rgba(0, 245, 255, 0.3) !important;
          box-shadow: 0 4px 20px rgba(0, 245, 255, 0.08);
          background: rgba(255, 255, 255, 0.04) !important;
        }

        /* Nav Pills */
        .library-tab-pill {
          transition: all 0.15s ease-in-out;
        }
        .library-tab-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }
        .library-tab-pill.active {
          background: var(--color-cyan-dim);
          border-color: var(--color-cyan);
          color: var(--color-cyan);
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.15);
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Responsive Modal adjustments for laptops & mobiles */
        @media (max-width: 768px) {
          .modal-body-wrapper {
            flex-direction: column !important;
            overflow-y: auto !important;
          }
          .modal-left-panel {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid var(--glass-border) !important;
            overflow-y: visible !important;
            max-height: none !important;
          }
          .modal-right-panel {
            width: 100% !important;
            height: auto !important;
            overflow-y: visible !important;
          }
          .guidebook-modal-card {
            height: 95vh !important;
            margin: 8px !important;
          }
        }
      `}} />

      {/* Header */}
      <div className="map-header" style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>Developer Workspace</h2>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>Choose an engineering track to solve challenges and build verified skills.</p>
      </div>

      {/* Realms Grid */}
      <div className="realm-grid" style={{ maxWidth: '960px', margin: '0 auto var(--space-10) auto', gap: '20px' }}>
        {realms.map((realm) => {
          const isPremiumRealm = realm.id !== 'forest';
          const isPremiumActive = Player.isPremium();
          const unlocked = Player.isRealmUnlocked(realm.id);
          const progress = Player.getRealmProgress(realm.id);
          
          const baseTitle = realm.title.replace(' Track', '');
          const isMaintenance = trackStatuses[baseTitle] === false;
          
          const isLocked = !unlocked || (isPremiumRealm && !isPremiumActive);

          return (
            <div
              key={realm.id}
              className={`card card-realm ${realm.themeClass} ${isLocked || isMaintenance ? 'locked' : ''}`}
              onClick={() => {
                if (isMaintenance) return;
                handleRealmClick(realm.id);
              }}
              style={{ 
                position: 'relative', 
                overflow: 'hidden', 
                textAlign: 'left', 
                padding: '24px', 
                border: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 23, 42, 0.78)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '18px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45)',
                cursor: isMaintenance ? 'not-allowed' : 'pointer',
                transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                opacity: isMaintenance ? 0.6 : 1
              }}
            >
              {isMaintenance && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 10
                }}>
                  <div style={{
                    background: 'rgba(0,0,0,0.8)', padding: '12px 24px', borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
                    fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                  }}>
                    Under Maintenance
                  </div>
                </div>
              )}
              {/* Top Accent Color Bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                background: `linear-gradient(90deg, ${realm.color}, transparent)`
              }} />

              {/* Header Row: Icon + Title + Badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Professional Vector SVG Icon Box */}
                  <div style={{
                    width: '46px', height: '46px', borderRadius: '12px',
                    background: realm.bgGlow, border: `1px solid ${realm.borderGlow}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 0 16px ${realm.bgGlow}`, flexShrink: 0
                  }}>
                    {realm.svgIcon}
                  </div>

                  <div>
                    <span style={{
                      fontSize: '10px', fontWeight: 800, color: realm.color,
                      letterSpacing: '0.08em', textTransform: 'uppercase'
                    }}>
                      {realm.badge}
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, margin: '2px 0 0', color: '#f8fafc', letterSpacing: '-0.01em' }}>
                      {realm.title}
                    </h3>
                  </div>
                </div>

                {isPremiumRealm && !isPremiumActive && (
                  <span style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.25))',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    color: '#fbbf24', fontSize: '10px', fontWeight: 700,
                    padding: '3px 10px', borderRadius: '12px', letterSpacing: '0.04em',
                    display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0
                  }}>
                    💎 PREMIUM TRACK
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 14px', flexGrow: 1 }}>
                {realm.desc}
              </p>

              {/* Tech Tags Row */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {realm.tags.map((tag, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#cbd5e1', fontSize: '10px', fontWeight: 600,
                    padding: '2px 8px', borderRadius: '6px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Progress & Lock Status Footer */}
              {isPremiumRealm && !isPremiumActive ? (
                <div style={{
                  background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '10px', padding: '8px 12px', color: '#fbbf24',
                  fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}>
                  <span>🔒 Premium Track Access Required</span>
                  <span>Unlock →</span>
                </div>
              ) : unlocked ? (
                <div className="realm-progress" style={{ marginTop: 'auto' }}>
                  <div className="realm-progress-label" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>
                    <span>Module Progress</span>
                    <span style={{ color: realm.color, fontFamily: 'monospace', fontWeight: 700 }}>
                      {progress.completed}/{progress.total} Completed ({progress.percent}%)
                    </span>
                  </div>
                  <div style={{ height: '6px', width: '100%', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <div
                      style={{
                        width: `${progress.percent}%`, height: '100%',
                        borderRadius: '10px', transition: 'width 0.6s ease',
                        background: `linear-gradient(90deg, ${realm.color}, #38bdf8)`
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px', padding: '8px 12px', color: '#64748b',
                  fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                  🔒 Prerequisites Locked (Complete previous track modules)
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Language reference Library block */}
      <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--space-8)' }}>
        <div className="library-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: 'var(--space-6)' }}>
          <div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', fontFamily: 'var(--font-display)', margin: 0 }}>
              📚 Language Reference Library
            </h3>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Master all {allLanguagesList.length} languages from zero to hero. Learn concepts, code structures, and practice sandbox challenges.
            </p>
          </div>

          {/* Search bar */}
          <div className="map-search-bar" style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search languages or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 32px',
                fontSize: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
            />
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '12px' }}>🔍</span>
          </div>
        </div>

        {/* Categories Tabs list */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: 'var(--space-5)', width: '100%' }}>
          {[
            { key: 'all', label: 'All Languages' },
            { key: 'frontend', label: 'Frontend' },
            { key: 'backend', label: 'Backend' },
            { key: 'database', label: 'Databases' },
            { key: 'systems', label: 'Systems & Scripts' }
          ].map(tab => (
            <button
              key={tab.key}
              className={`library-tab-pill ${activeFilter === tab.key ? 'active' : ''}`}
              onClick={() => { Sounds.playClick(); setActiveFilter(tab.key); }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-text-secondary)',
                fontSize: '11px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Languages Grid */}
        <div className="languages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: 'var(--space-4)' }}>
          {filteredLanguages.length > 0 ? filteredLanguages.map(item => {
            let badgeColor = 'var(--color-green)';
            if (item.difficulty === 'Intermediate') badgeColor = '#f59e0b';
            if (item.difficulty === 'Advanced') badgeColor = 'var(--color-red)';

            return (
              <div
                key={item.key}
                className="lang-library-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                    {item.deviconClass ? (
                      <i className={`${item.deviconClass} colored`} style={{ fontSize: '20px' }}></i>
                    ) : (
                      <span style={{ fontSize: '18px' }}>{item.icon}</span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{item.label}</div>
                    <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Est. {item.year} | {item.creator}</div>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {item.useCase}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{
                    fontSize: '9px',
                    color: badgeColor,
                    background: `${badgeColor}12`,
                    border: `1px solid ${badgeColor}40`,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 'bold'
                  }}>
                    {item.difficulty}
                  </span>

                  <button
                    onClick={() => { Sounds.playClick(); setSelectedLangInfo(item); }}
                    style={{
                      background: 'rgba(0, 245, 255, 0.06)',
                      border: '1px solid rgba(0, 245, 255, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--color-cyan)',
                      fontSize: '10px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-cyan)'; e.currentTarget.style.color = '#000'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0, 245, 255, 0.06)'; e.currentTarget.style.color = 'var(--color-cyan)'; }}
                  >
                    📖 Zero to Hero Guide
                  </button>
                </div>
              </div>
            );
          }) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 'var(--space-10)', color: 'var(--color-text-muted)' }}>
              No languages found matching "{searchQuery}" under this category.
            </div>
          )}
        </div>
      </div>

      {/* Guidebook Overlay Modal */}
      {selectedLangInfo && (() => {
        const syllabus = HINTS_DATA[selectedLangInfo.key] || [];
        let badgeColor = 'var(--color-green)';
        if (selectedLangInfo.difficulty === 'Intermediate') badgeColor = '#f59e0b';
        if (selectedLangInfo.difficulty === 'Advanced') badgeColor = 'var(--color-red)';

        return (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8, 8, 12, 0.98)',
              backdropFilter: 'blur(16px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
            }}
          >
            <div
              className="guidebook-modal-card"
              style={{
                width: '100%',
                maxWidth: '960px',
                height: '85vh',
                background: 'var(--color-bg-medium)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                animation: 'scaleIn 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '16px 24px',
                  borderBottom: '1px solid var(--glass-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.01)',
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '38px', height: '38px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)' }}>
                    {selectedLangInfo.deviconClass ? (
                      <i className={`${selectedLangInfo.deviconClass} colored`} style={{ fontSize: '24px' }}></i>
                    ) : (
                      <span style={{ fontSize: '22px' }}>{selectedLangInfo.icon}</span>
                    )}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--color-cyan)', margin: 0 }}>
                      {selectedLangInfo.label} — Zero to Hero Roadmap
                    </h2>
                    <p style={{ fontSize: '10px', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                      Created in {selectedLangInfo.year} by {selectedLangInfo.creator}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => { Sounds.playClick(); setSelectedLangInfo(null); setModalTab('syllabus'); }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div
                className="modal-body-wrapper"
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'row',
                  overflow: 'hidden',
                  minHeight: 0
                }}
              >
                {/* Left Profile Panel (35% width) */}
                <div
                  className="modal-left-panel"
                  style={{
                    width: '35%',
                    borderRight: '1px solid var(--glass-border)',
                    padding: '24px',
                    background: 'rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    overflowY: 'auto',
                    maxHeight: '100%'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                        Language Overview
                      </span>
                      <p style={{ fontSize: '12px', color: 'var(--color-text-primary)', lineHeight: 1.5, marginTop: '6px' }}>
                        {selectedLangInfo.explanation}
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                        Core Target Use Cases
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--color-bg-dark)', padding: '10px', borderRadius: '6px', border: '1px solid var(--glass-border)', marginTop: '6px' }}>
                        <span style={{ fontSize: '16px' }}>🎯</span>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-cyan)' }}>{selectedLangInfo.useCase}</span>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ background: 'var(--color-bg-dark)', padding: '10px', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Difficulty</div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: badgeColor, marginTop: '4px' }}>{selectedLangInfo.difficulty}</div>
                      </div>
                      <div style={{ background: 'var(--color-bg-dark)', padding: '10px', borderRadius: '6px', border: '1px solid var(--glass-border)' }}>
                        <div style={{ fontSize: '8px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>Job Demand</div>
                        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#f59e0b', marginTop: '4px', letterSpacing: '1px' }}>{selectedLangInfo.jobDemand}</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePracticeClick(selectedLangInfo.key)}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, var(--color-cyan-dim), var(--color-cyan))',
                      color: '#000',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '12px',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 0 15px rgba(0, 245, 255, 0.25)',
                      transition: 'all 0.2s',
                      marginTop: '16px',
                      flexShrink: 0
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 245, 255, 0.45)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.25)'}
                  >
                    🧪 Practice in Sandbox
                  </button>
                </div>

                {/* Right Syllabus/Dictionary Panel (65% width) */}
                <div
                  className="syllabus-scroll modal-right-panel"
                  style={{
                    width: '65%',
                    padding: '24px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    height: '100%'
                  }}
                >
                  {/* Sub-tabs header for Zero-to-Hero categories */}
                  <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px', marginBottom: '4px', flexShrink: 0 }}>
                    <button
                      onClick={() => { Sounds.playClick(); setModalTab('syllabus'); }}
                      style={{
                        background: modalTab === 'syllabus' ? 'var(--color-cyan-dim)' : 'transparent',
                        border: '1px solid ' + (modalTab === 'syllabus' ? 'var(--color-cyan)' : 'var(--glass-border)'),
                        color: modalTab === 'syllabus' ? '#fff' : 'var(--color-text-secondary)',
                        fontSize: '11px',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.15s'
                      }}
                    >
                      📚 Zero to Hero Syllabus
                    </button>
                    <button
                      onClick={() => { Sounds.playClick(); setModalTab('dictionary'); }}
                      style={{
                        background: modalTab === 'dictionary' ? 'var(--color-cyan-dim)' : 'transparent',
                        border: '1px solid ' + (modalTab === 'dictionary' ? 'var(--color-cyan)' : 'var(--glass-border)'),
                        color: modalTab === 'dictionary' ? '#fff' : 'var(--color-text-secondary)',
                        fontSize: '11px',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.15s'
                      }}
                    >
                      🔍 Key Tag & Syntax Dictionary
                    </button>
                  </div>

                  {modalTab === 'syllabus' ? (
                    <>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                        Syllabus Chapters (Beginner to Capstone)
                      </span>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {syllabus.length > 0 ? syllabus.map((level, idx) => (
                          <div
                            key={idx}
                            style={{
                              background: 'rgba(255, 255, 255, 0.01)',
                              border: '1px solid var(--glass-border)',
                              padding: '16px',
                              borderRadius: 'var(--radius-lg)'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                              <span style={{
                                background: 'rgba(0, 245, 255, 0.08)',
                                color: 'var(--color-cyan)',
                                border: '1px solid rgba(0, 245, 255, 0.25)',
                                fontSize: '9px',
                                fontWeight: 'bold',
                                padding: '2px 8px',
                                borderRadius: '4px'
                              }}>
                                LEVEL {idx + 1}
                              </span>
                              <strong style={{ fontSize: '13px', color: '#fff' }}>{level.title}</strong>
                            </div>
                            <pre style={{
                              background: '#0a0a0f',
                              padding: '12px',
                              borderRadius: 'var(--radius-md)',
                              fontSize: '11px',
                              fontFamily: 'var(--font-code)',
                              color: '#b5cea8',
                              overflowX: 'auto',
                              whiteSpace: 'pre-wrap',
                              border: '1px solid rgba(255,255,255,0.03)',
                              margin: 0,
                              lineHeight: 1.5
                            }}>
                              {level.body}
                            </pre>
                          </div>
                        )) : (
                          <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', textAlign: 'center', padding: '24px' }}>
                            Guidebooks are being configured for {selectedLangInfo.label}. Check back soon!
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 'bold', letterSpacing: '0.05em' }}>
                        Syntax Explorer (Tag & Command Explanations)
                      </span>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {(() => {
                          const dict = LANGUAGE_DICTIONARY[selectedLangInfo.key] || [];
                          if (dict.length === 0) {
                            return (
                              <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', textAlign: 'center', padding: '24px' }}>
                                A detailed dictionary is being written for {selectedLangInfo.label}. In the meantime, use the Complete Syllabus to view syntax examples!
                              </div>
                            );
                          }
                          return dict.map((item, idx) => (
                            <div
                              key={idx}
                              style={{
                                background: 'rgba(255, 255, 255, 0.01)',
                                border: '1px solid var(--glass-border)',
                                padding: '16px',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                                <span style={{ fontFamily: 'var(--font-code)', color: 'var(--color-cyan)', fontWeight: 'bold', fontSize: '14px', background: 'rgba(0, 245, 255, 0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                                  {item.name}
                                </span>
                                <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
                                  Glossary Item {idx + 1}
                                </span>
                              </div>

                              <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0', lineHeight: 1.5 }}>
                                {item.desc}
                              </p>

                              <pre style={{
                                background: '#0a0a0f',
                                padding: '12px',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '11px',
                                fontFamily: 'var(--font-code)',
                                color: '#9cdcfe',
                                overflowX: 'auto',
                                whiteSpace: 'pre-wrap',
                                border: '1px solid rgba(255,255,255,0.03)',
                                margin: '6px 0 0 0',
                                lineHeight: 1.5
                              }}>
                                {item.code}
                              </pre>

                              <div style={{ marginTop: '4px', padding: '8px 12px', background: 'rgba(245, 158, 11, 0.04)', borderLeft: '3px solid #f59e0b', borderRadius: '0 4px 4px 0', fontSize: '11px', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                                <strong style={{ color: '#f59e0b', marginRight: '4px' }}>💡 Pro-Tip:</strong> {item.tip}
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

