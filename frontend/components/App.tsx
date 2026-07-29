import React, { useState, useEffect } from 'react';
import { GameEngine, GameState } from '../game/engine';
import { Player } from '../game/player';
import { Particles } from '../game/particles';
import { BossFight } from '../game/boss-fights';
import { AuthService } from '../game/auth';

// Screens
import LandingScreen from './LandingScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import CharacterScreen from './CharacterScreen';
import MapScreen from './MapScreen';
import LevelsScreen from './LevelsScreen';
import ChallengeScreen from './ChallengeScreen';
import BossScreen from './BossScreen';
import VictoryScreen from './VictoryScreen';
import LeaderboardScreen from './LeaderboardScreen';
import PlaygroundScreen from './PlaygroundScreen';
import QuestsScreen from './QuestsScreen';
import ProfileScreen from './ProfileScreen';
import AiCopilotScreen from './AiCopilotScreen';
import AdminScreen from './AdminScreen';

// Shell
import Navbar from './Navbar';
import Sidebar from './Sidebar';

// Styles are imported globally in app/layout.tsx


export default function App() {
  const [gameState, setGameState] = useState('landing');
  const [currentRealm, setCurrentRealm] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [victoryResults, setVictoryResults] = useState(null);

  // Auth state
  const [authScreen, setAuthScreen] = useState<'login' | 'register' | null>(null);
  const [authUser, setAuthUser] = useState<{ email: string; username: string; role?: string } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [registeredCreds, setRegisteredCreds] = useState<{ identifier?: string; password?: string } | null>(null);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFade, setSplashFade] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Sync profile details trigger to refresh navbar
  const [profileTick, setProfileTick] = useState(0);
  const forceUpdate = () => setProfileTick(prev => prev + 1);

  const syncPlayerWithAuth = (user: { email: string; username: string; role?: string }) => {
    if (!Player.exists()) {
      Player.create(user.username, 'fullstack', 'windows');
    } else if (Player.getName() !== user.username) {
      Player.setName(user.username);
    }
  };

  const [isAdminPreview, setIsAdminPreview] = useState(false);

  // Check auth session on boot
  useEffect(() => {
    // Fetch global disabled languages
    fetch('http://localhost:5000/api/config/languages')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.disabledLanguages) {
          GameEngine.setDisabledLanguages(data.disabledLanguages);
        }
      })
      .catch(err => console.error('Failed to load global config', err));

    AuthService.validateSession().then(user => {
      const params = new URLSearchParams(window.location.search);
      const isPreview = params.get('adminPreview') === 'true';
      
      if (isPreview) {
        setIsAdminPreview(true);
        const previewUser = { email: 'preview@admin', username: 'Admin Preview', role: 'admin' };
        setAuthUser(previewUser);
        setAuthScreen(null);
        
        // Dynamically set device type for preview based on actual screen size
        const currentDevice = window.innerWidth <= 768 ? 'android' : 'windows';
        if (!Player.exists()) {
          Player.create(previewUser.username, 'fullstack', currentDevice);
        } else {
          Player.setName(previewUser.username);
          // Force update device type for preview so it looks correct on current screen
          const data = JSON.parse(localStorage.getItem('codeq_player') || '{}');
          data.deviceType = currentDevice;
          localStorage.setItem('codeq_player', JSON.stringify(data));
        }
      } else if (user) {
        setAuthUser(user);
        setAuthScreen(null);
        syncPlayerWithAuth(user);
        if (params.get('returnToAdmin') === 'true' && user.role === 'admin') {
          GameEngine._state = 'admin';
          setGameState('admin');
        }
      } else {
        setAuthScreen('login');
      }
      setAuthChecked(true);
    });
  }, []);

  useEffect(() => {
    // Initialize Particles on canvas
    Particles.init();

    // Splash Screen timer (3.2 seconds display, then fade out)
    const splashTimer = setTimeout(() => {
      setSplashFade(true);
      const removeTimer = setTimeout(() => {
        setSplashVisible(false);
      }, 800);
      return () => clearTimeout(removeTimer);
    }, 3200);

    // Boot Game Engine
    GameEngine.init();
    setGameState(GameEngine.getState());
    setCurrentRealm(GameEngine.getCurrentRealm());
    setCurrentChallenge(GameEngine.getCurrentChallenge());

    // Listen for Game Engine state changes
    GameEngine.onChange((newState, data) => {
      setGameState(newState);
      setCurrentRealm(data.realm);
      setCurrentChallenge(data.challenge);
      if (newState === 'victory') {
        setVictoryResults(GameEngine.getVictoryResults());
      }
    });

    const handleOpenPremiumModal = () => {
      setIsUpgradeModalOpen(true);
    };

    window.addEventListener('open-premium-modal', handleOpenPremiumModal);

    return () => {
      clearTimeout(splashTimer);
      Particles.stop();
      window.removeEventListener('open-premium-modal', handleOpenPremiumModal);
    };
  }, []);

  // Update theme class on body dynamically
  useEffect(() => {
    document.body.className = '';
    if (currentRealm) {
      document.body.classList.add(`theme-${currentRealm}`);
    } else {
      document.body.classList.add('theme-forest'); // default
    }
  }, [currentRealm]);

  const handleStartGame = () => {
    if (!authUser) {
      setAuthScreen('login');
      return;
    }
    syncPlayerWithAuth(authUser);
    GameEngine.goToMap();
  };

  const handleLoginSuccess = (user: { email: string; username: string; role?: string }) => {
    setAuthUser(user);
    setAuthScreen(null);
    syncPlayerWithAuth(user);
    if (user.role === 'admin') {
      GameEngine._state = 'admin';
      setGameState('admin');
      return;
    }
    GameEngine.goToMap();
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setAuthUser(null);
    setAuthScreen('login');
    Player.reset();
    window.location.reload();
  };

  const handleCreateCharacter = (name, avatar, deviceType) => {
    GameEngine.createCharacter(name, avatar, deviceType);
    forceUpdate();
    setTimeout(() => {
      if ((window as any).addNotification) {
        (window as any).addNotification(`Welcome, ${name}! Layout mode: ${deviceType.toUpperCase()}`, '👤');
      }
    }, 500);
  };

  const handleSelectRealm = (realmId) => {
    GameEngine.goToLevels(realmId);
  };

  const handleSelectLevel = (challenge) => {
    GameEngine.goToChallenge(challenge);
  };

  const handleChallengeComplete = (challenge, stats) => {
    GameEngine.completeChallenge(challenge, stats);
    forceUpdate();
    setTimeout(() => {
      if ((window as any).addNotification) {
        (window as any).addNotification(`Quest Completed: "${challenge.title}"! (+${challenge.xpReward} XP)`, '⚡');
      }
    }, 500);
  };

  const handleBossPhaseComplete = () => {
    GameEngine.completeBossPhase();
    forceUpdate();
    setTimeout(() => {
      if ((window as any).addNotification) {
        (window as any).addNotification(`Capstone Phase Validation Successful! Pipeline deploying.`, '🚀');
      }
    }, 500);
  };

  const handleVictoryContinue = () => {
    GameEngine.goToLevels(currentRealm);
  };

  const handleProfileUpdate = () => {
    forceUpdate();
  };

  const handleProfileReset = async () => {
    await AuthService.deleteAccount();
    await AuthService.logout();
    Player.reset();
    window.location.reload();
  };

  const handleTryInSandbox = (lang, template) => {
    sessionStorage.setItem('sandbox_direct_lang', lang);
    sessionStorage.setItem('sandbox_direct_code', template);
    // Directly go to playground tab
    GameEngine._state = 'playground';
    setGameState('playground');
  };

  // Show auth screens (before splash / game)
  if (authChecked && authScreen === 'login') {
    return (
      <>
        {/* SPLASH SCREEN — also shown before login */}
        {splashVisible && (
          <div id="splash-screen" className={splashFade ? 'fade-out' : ''}>
            <div className="splash-content">
              <div className="splash-logo-wrapper">
                <svg className="splash-logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="var(--color-cyan)" strokeWidth="6" />
                  <text x="50" y="60" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
                </svg>
              </div>
              <h1 className="splash-title">
                <span className="splash-letter">C</span>
                <span className="splash-letter">O</span>
                <span className="splash-letter">D</span>
                <span className="splash-letter">E</span>
                <span className="splash-letter">.</span>
                <span className="splash-letter">Q</span>
              </h1>
              <p className="splash-subtitle" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 'var(--space-2)' }}>Interactive Developer Assessment Workspace</p>
              <div className="splash-loader-bar" style={{ marginTop: 'var(--space-6)' }}>
                <div className="splash-loader-fill"></div>
              </div>
            </div>
          </div>
        )}
        <canvas id="particle-canvas"></canvas>
        <LoginScreen
          initialIdentifier={registeredCreds?.identifier}
          initialPassword={registeredCreds?.password}
          onLoginSuccess={handleLoginSuccess}
          onGoRegister={() => setAuthScreen('register')}
        />
      </>
    );
  }

  if (authChecked && authScreen === 'register') {
    return (
      <>
        {splashVisible && (
          <div id="splash-screen" className={splashFade ? 'fade-out' : ''}>
            <div className="splash-content">
              <div className="splash-logo-wrapper">
                <svg className="splash-logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="var(--color-cyan)" strokeWidth="6" />
                  <text x="50" y="60" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
                </svg>
              </div>
              <h1 className="splash-title">
                <span className="splash-letter">C</span>
                <span className="splash-letter">O</span>
                <span className="splash-letter">D</span>
                <span className="splash-letter">E</span>
                <span className="splash-letter">.</span>
                <span className="splash-letter">Q</span>
              </h1>
              <p className="splash-subtitle" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 'var(--space-2)' }}>Interactive Developer Assessment Workspace</p>
              <div className="splash-loader-bar" style={{ marginTop: 'var(--space-6)' }}>
                <div className="splash-loader-fill"></div>
              </div>
            </div>
          </div>
        )}
        <canvas id="particle-canvas"></canvas>
        <RegisterScreen
          onRegistered={(email, password) => {
            setRegisteredCreds({ identifier: email, password });
            setAuthScreen('login');
          }}
          onGoLogin={() => setAuthScreen('login')}
        />
      </>
    );
  }

  // Not yet checked auth — show nothing (avoid flash)
  if (!authChecked) return null;

  return (
    <>
      {/* SPLASH SCREEN */}
      {splashVisible && (
        <div id="splash-screen" className={splashFade ? 'fade-out' : ''}>
          <div className="splash-content">
            <div className="splash-logo-wrapper">
              <svg className="splash-logo-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="var(--color-cyan)" strokeWidth="6" />
                <text x="50" y="60" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
              </svg>
            </div>
            <h1 className="splash-title">
              <span className="splash-letter">C</span>
              <span className="splash-letter">O</span>
              <span className="splash-letter">D</span>
              <span className="splash-letter">E</span>
              <span className="splash-letter">.</span>
              <span className="splash-letter">Q</span>
            </h1>
            <p className="splash-subtitle" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 'var(--space-2)' }}>Interactive Developer Assessment Workspace</p>
            <div className="splash-loader-bar" style={{ marginTop: 'var(--space-6)' }}>
              <div className="splash-loader-fill"></div>
            </div>
          </div>
        </div>
      )}

      {/* Particle canvas background */}
      <canvas id="particle-canvas"></canvas>

      <div id="app">
        {/* Navigation Bar */}
        {gameState !== 'landing' && gameState !== 'character' && gameState !== 'admin' && (
          <Navbar
            isOpen={sidebarOpen}
            activeTab={gameState}
            currentChallenge={currentChallenge}
            onNavigate={(screen) => {
              if (screen === 'map') GameEngine.goToMap();
              else if (screen === 'quests') setGameState('quests');
              else if (screen === 'leaderboard') GameEngine.goToLeaderboard();
              else if (screen === 'playground') setGameState('playground');
              else if (screen === 'profile') setGameState('profile');
              else setGameState(screen);
            }}
            onToggleSidebar={() => setSidebarOpen(prev => !prev)}
            key={`navbar-${profileTick}`}
          />
        )}

        {/* Sidebar Menu */}
        {gameState !== 'landing' && gameState !== 'character' && gameState !== 'admin' && (
          <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={gameState}
          onNavigate={(screen) => {
            if (screen === 'map') GameEngine.goToMap();
            else if (screen === 'quests') setGameState('quests');
            else if (screen === 'leaderboard') GameEngine.goToLeaderboard();
            else if (screen === 'playground') setGameState('playground');
            else if (screen === 'profile') setGameState('profile');
            else setGameState(screen);
          }}
          key={`sidebar-${profileTick}`}
        />
        )}

        {/* Screen Host Container */}
        <div id="screen-host" style={{ flex: 1, position: 'relative' }}>
          {isAdminPreview && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              background: 'rgba(99, 102, 241, 0.9)', color: 'white',
              textAlign: 'center', padding: '6px', zIndex: 9999,
              fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px',
              borderBottom: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(4px)',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px'
            }}>
              <span>👁 ADMIN PREVIEW MODE (Read-Only)</span>
              <button onClick={() => {
                const params = new URLSearchParams(window.location.search);
                const adminTab = params.get('adminTab') || 'metrics';
                window.location.href = '/?returnToAdmin=true&adminTab=' + adminTab;
              }} style={{
                background: 'white', color: 'rgba(99, 102, 241, 1)', border: 'none', 
                padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
              }}>Exit Preview</button>
            </div>
          )}
          {gameState === 'landing' && (
            <LandingScreen onStart={handleStartGame} />
          )}

          {gameState === 'character' && (
            <CharacterScreen onCreate={handleCreateCharacter} />
          )}

          {gameState === 'map' && (
            <MapScreen onSelectRealm={handleSelectRealm} onNavigate={(screen) => setGameState(screen)} />
          )}

          {gameState === 'levels' && (
            <LevelsScreen
              realmId={currentRealm}
              onBack={() => GameEngine.goToMap()}
              onSelectLevel={handleSelectLevel}
            />
          )}

          {gameState === 'challenge' && currentChallenge && (
            <ChallengeScreen
              challenge={currentChallenge}
              onBack={() => GameEngine.goToLevels(currentRealm)}
              onComplete={handleChallengeComplete}
            />
          )}

          {gameState === 'boss' && currentChallenge && (
            <BossScreen
              boss={currentChallenge}
              onBack={() => {
                BossFight.reset();
                GameEngine.goToLevels(currentRealm);
              }}
              onCompletePhase={handleBossPhaseComplete}
            />
          )}

          {gameState === 'victory' && (
            <VictoryScreen
              results={victoryResults}
              onContinue={handleVictoryContinue}
            />
          )}

          {gameState === 'leaderboard' && (
            <LeaderboardScreen onBack={() => GameEngine.goToMap()} />
          )}

          {gameState === 'playground' && (
            <PlaygroundScreen onBack={() => GameEngine.goToMap()} />
          )}

          {gameState === 'quests' && (
            <QuestsScreen
              onBack={() => GameEngine.goToMap()}
              onTryInSandbox={handleTryInSandbox}
            />
          )}

          {gameState === 'profile' && (
            <ProfileScreen
              onBack={() => GameEngine.goToMap()}
              onUpdateProfile={handleProfileUpdate}
              onResetProfile={handleProfileReset}
            />
          )}

          {gameState === 'copilot' && (
            <AiCopilotScreen onBack={() => GameEngine.goToMap()} />
          )}



          {gameState === 'admin' && (
            <AdminScreen onBack={() => GameEngine.goToMap()} />
          )}


        </div>
      </div>
    </>
  );
}
