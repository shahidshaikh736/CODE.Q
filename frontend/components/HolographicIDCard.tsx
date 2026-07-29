import React, { useRef } from 'react';
import Avatar from './Avatar';

interface Props {
  playerName: string;
  playerAvatar: string;
  customDp?: string | null;
  usernameInitial?: string;
  playerRank: string;
  playerLevel: number;
  playerXP: number;
}

export default function HolographicIDCard({ 
  playerName, 
  playerAvatar, 
  customDp,
  usernameInitial,
  playerRank, 
  playerLevel, 
  playerXP 
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt the card based on mouse position (subtle, pro effect)
    card.style.transform = `scale(1.02) rotateY(${x / 20}deg) rotateX(${-y / 20}deg)`;
    
    // Calculate a glowing reflection
    const glow = card.querySelector('.holo-glow') as HTMLDivElement;
    if (glow) {
      glow.style.opacity = '1';
      glow.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `scale(1) rotateY(0deg) rotateX(0deg)`;
    const glow = cardRef.current.querySelector('.holo-glow') as HTMLDivElement;
    if (glow) {
      glow.style.opacity = '0';
    }
  };

  return (
    <div style={{ perspective: '1200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1rem',
        letterSpacing: '0.6em',
        color: 'rgba(0, 245, 255, 0.5)',
        marginBottom: '2.5rem',
        textTransform: 'uppercase',
        pointerEvents: 'none'
      }}>
        CODE.Q
      </div>
      
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="holo-card"
        style={{
          position: 'relative',
          width: '360px',
          height: '240px',
          background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(20, 20, 30, 0.85) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '30px 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(0, 245, 255, 0.1), inset 0 0 20px rgba(0, 245, 255, 0.05)',
          transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
          transformStyle: 'preserve-3d',
          overflow: 'hidden',
          cursor: 'crosshair',
          pointerEvents: 'auto'
        }}
      >
        {/* Subtle grid background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div 
          className="holo-glow" 
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 0.3s ease',
            zIndex: 1
          }} 
        />
        
        {/* Sleek hologram scan line */}
        <div className="holo-scanline" />

        <div style={{ zIndex: 2, transform: 'translateZ(30px)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
          
          {/* High-tech Avatar Container */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div className="avatar-ring" style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              border: '1px dashed rgba(0, 245, 255, 0.4)',
              animation: 'spin 10s linear infinite'
            }} />
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: customDp ? '#0f172a' : 'linear-gradient(135deg, #0284c7, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(0, 245, 255, 0.8)',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.3), inset 0 0 10px rgba(0, 245, 255, 0.2)',
              fontSize: '2.2rem',
              backdropFilter: 'blur(5px)',
              overflow: 'hidden',
              color: '#fff',
              fontFamily: 'var(--font-display)',
              fontWeight: 'bold'
            }}>
              {customDp ? (
                <img src={customDp} alt="Profile DP" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                usernameInitial || <Avatar avatar={playerAvatar} />
              )}
            </div>
          </div>
          
          <h2 style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 400,
            color: '#fff',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {playerName}
          </h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '12px',
            color: 'var(--color-cyan)',
            fontFamily: 'var(--font-code)',
            fontSize: '0.85rem',
            opacity: 0.9
          }}>
            <span style={{ fontWeight: 'bold' }}>LVL {playerLevel}</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span>{playerRank}</span>
          </div>
          
        </div>

        {/* Bottom Barcode & ID */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 2,
          transform: 'translateZ(20px)',
          fontFamily: 'var(--font-code)',
          pointerEvents: 'none'
        }}>
          <div style={{
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: '0.65rem',
            letterSpacing: '0.2em'
          }}>
            ID: 0x{Math.abs(hashCode(playerName)).toString(16).toUpperCase()}
          </div>
          
          {/* CSS Barcode illusion */}
          <div style={{
            height: '20px',
            width: '80px',
            background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0, rgba(255,255,255,0.4) 2px, transparent 2px, transparent 4px, rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 5px, transparent 5px, transparent 8px)',
            opacity: 0.5
          }} />
        </div>
      </div>
      
      <style>{`
        .holo-card {
          animation: holo-float 6s infinite ease-in-out;
        }
        .holo-scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: rgba(0, 245, 255, 0.8);
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.5), 0 5px 20px rgba(0, 245, 255, 0.2);
          opacity: 0.4;
          animation: scanline 4s ease-in-out infinite alternate;
          z-index: 2;
          pointer-events: none;
        }
        @keyframes scanline {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(250px); }
        }
        @keyframes holo-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Simple hash function for fake ID
function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash === 0 ? 123456789 : hash;
}
