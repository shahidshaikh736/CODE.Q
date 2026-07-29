import React from 'react';
import { Sounds } from '../game/sounds';
import { Globe, Monitor, Database, Settings } from 'lucide-react';

export default function LandingScreen({ onStart }) {
  const handleStart = () => {
    Sounds.playClick();
    onStart();
  };

  return (
    <div className="screen landing-screen active" id="screen-landing">
      <div className="landing-title">
        <span className="title-main" style={{ letterSpacing: '2px', textShadow: '0 0 15px rgba(99, 102, 241, 0.25)' }}>CODE.Q</span>
        <span className="title-sub" style={{ textTransform: 'uppercase', fontSize: '11px', letterSpacing: '3px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>Interactive Full-Stack Workspace</span>
      </div>
      <p className="landing-tagline" style={{ maxWidth: '600px', margin: '0 auto var(--space-8) auto', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
        An advanced engineering workspace designed for software engineers. Master Frontend Track layouts, Backend Server logic, and Database queries through real-time sandboxed coding assessments.
      </p>
      
      <div className="landing-features" style={{ gap: 'var(--space-6)', justifyContent: 'center', marginBottom: 'var(--space-8)' }}>
        <div className="landing-feature" style={{ border: '1px solid var(--glass-border)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)' }}>
          <span className="feature-icon"><Globe size={24} /></span>
          <span className="feature-text" style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>Frontend Engineering</span>
        </div>
        <div className="landing-feature" style={{ border: '1px solid var(--glass-border)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)' }}>
          <span className="feature-icon"><Monitor size={24} /></span>
          <span className="feature-text" style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>Backend Systems</span>
        </div>
        <div className="landing-feature" style={{ border: '1px solid var(--glass-border)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--glass-bg)' }}>
          <span className="feature-icon"><Database size={24} /></span>
          <span className="feature-text" style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)' }}>Database Architecture</span>
        </div>
      </div>

      <div className="landing-actions">
        <button 
          className="btn btn-primary" 
          id="btn-start-game" 
          onClick={handleStart}
          style={{ padding: '12px 32px', letterSpacing: '0.08em', boxShadow: '0 0 20px var(--color-cyan-glow)' }}
        >
          Configure Workspace <Settings size={18} style={{ display: 'inline', verticalAlign: '-3px', marginLeft: 6 }} />
        </button>
      </div>
    </div>
  );
}
