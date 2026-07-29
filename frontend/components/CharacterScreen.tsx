import React, { useState } from 'react';
import { Sounds } from '../game/sounds';

export default function CharacterScreen({ onCreate }) {
  const avatars = [
    { id: 'frontend',  icon: 'devicon-react-original',        label: 'Frontend Engineer',    color: '#61dafb', bg: 'rgba(97,218,251,0.08)' },
    { id: 'backend',   icon: 'devicon-nodejs-plain',          label: 'Backend Systems',     color: '#68a063', bg: 'rgba(104,160,99,0.08)' },
    { id: 'database',  icon: 'devicon-postgresql-plain',      label: 'Database Specialist',     color: '#336791', bg: 'rgba(51,103,145,0.12)' },
    { id: 'devops',    icon: 'devicon-docker-plain',          label: 'DevOps Lead',     color: '#2496ed', bg: 'rgba(36,150,237,0.08)' },
    { id: 'security',  icon: 'devicon-linux-plain',           label: 'Security Lead',   color: '#f5a623', bg: 'rgba(245,166,35,0.08)' },
    { id: 'ai',        icon: 'devicon-python-plain',          label: 'AI Engineer',     color: '#3572a5', bg: 'rgba(53,114,165,0.08)' },
    { id: 'fullstack', icon: 'devicon-javascript-plain',      label: 'Full-Stack Developer',  color: '#f7df1e', bg: 'rgba(247,223,30,0.08)' },
    { id: 'uxui',      icon: 'devicon-figma-plain',           label: 'UI/UX Designer',  color: '#f24e1e', bg: 'rgba(242,78,30,0.08)' },
  ];

  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('fullstack');
  const [deviceType, setDeviceType] = useState<'windows' | 'android'>('windows');
  const [step, setStep] = useState<'device' | 'profile'>('device');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Sounds.playClick();
    if (name.trim()) {
      onCreate(name.trim(), selectedAvatar, deviceType);
    }
  };

  const handleSelectAvatar = (av: string) => {
    Sounds.playClick();
    setSelectedAvatar(av);
  };

  return (
    <div className="screen character-screen active" id="screen-character" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .device-select-btn {
          transition: all 0.2s ease-in-out !important;
        }
        .device-select-btn:hover {
          border-color: var(--color-cyan) !important;
          background: rgba(6, 182, 212, 0.05) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.15);
        }
      `}} />

      {step === 'device' ? (
        /* ===== STEP 1: DEVICE SELECTION ===== */
        <div className="character-form" style={{ width: '90%', maxWidth: '500px', background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: '8px' }}>Select Layout Mode</h2>
          <p className="form-subtitle" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            To optimize your learning terminal, please specify your primary platform.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: 'var(--space-2)' }}>
            <button
              type="button"
              onClick={() => { Sounds.playClick(); setDeviceType('windows'); setStep('profile'); }}
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-dark)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%'
              }}
              className="device-select-btn"
            >
              <span style={{ fontSize: '2.5rem' }}>💻</span>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', margin: 0, fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Windows / PC</h4>
                <p style={{ color: 'var(--color-text-secondary)', margin: '4px 0 0 0', fontSize: '10px', lineHeight: 1.4 }}>
                  Widescreen view, split-pane IDE editor, and keyboard shortcut overlays.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => { Sounds.playClick(); setDeviceType('android'); setStep('profile'); }}
              style={{
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-bg-dark)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '100%'
              }}
              className="device-select-btn"
            >
              <span style={{ fontSize: '2.5rem' }}>📱</span>
              <div>
                <h4 style={{ color: 'var(--color-text-primary)', margin: 0, fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>Android / Mobile</h4>
                <p style={{ color: 'var(--color-text-secondary)', margin: '4px 0 0 0', fontSize: '10px', lineHeight: 1.4 }}>
                  Compact single-pane view, touch-optimized keys, and mobile editor quick-helper bar.
                </p>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* ===== STEP 2: PROFILE DETAILS ===== */
        <form className="character-form" onSubmit={handleSubmit} style={{ width: '90%', maxWidth: '460px', background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
          <button 
            type="button" 
            onClick={() => { Sounds.playClick(); setStep('device'); }} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--color-cyan)', 
              fontSize: '10px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px', 
              padding: 0, 
              marginBottom: 'var(--space-3)',
              fontWeight: 'bold'
            }}
          >
            ⬅ Back to Device Selection
          </button>

          <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold' }}>Workspace Configuration</h2>
          <p className="form-subtitle" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            Enter your developer name and select your specialized designation below ({deviceType === 'windows' ? 'Windows PC Mode' : 'Android Mobile Mode'}).
          </p>
          
          <div className="avatar-selector" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: 'var(--space-3)' }}>
            {avatars.map((av) => (
              <button
                key={av.id}
                type="button"
                className={`avatar-option ${selectedAvatar === av.id ? 'selected' : ''}`}
                onClick={() => handleSelectAvatar(av.id)}
                style={{
                  width: '100%',
                  height: '52px',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  background: selectedAvatar === av.id ? av.bg : 'transparent',
                  border: selectedAvatar === av.id ? `2px solid ${av.color}` : '1px solid var(--glass-border)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={av.label}
              >
                <i className={`${av.icon} colored`} style={{ fontSize: '1.6rem' }} />
              </button>
            ))}
          </div>

          <div style={{ fontSize: '10px', color: 'var(--color-cyan)', fontWeight: 'bold', textAlign: 'center', marginBottom: 'var(--space-4)', minHeight: '15px' }}>
            Role: {avatars.find(a => a.id === selectedAvatar)?.label}
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <input
              type="text"
              className="name-input"
              placeholder="Enter Developer Name..."
              maxLength={15}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: 'var(--text-sm)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)',
                background: 'var(--color-bg-dark)',
                color: 'var(--color-text-primary)'
              }}
            />
          </div>

          <div className="landing-actions">
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!name.trim()}
              style={{ width: '100%', padding: '10px', fontSize: 'var(--text-xs)' }}
            >
              Initialize Workspace ➔
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
