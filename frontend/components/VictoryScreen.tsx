import React, { useEffect } from 'react';
import { Particles } from '../game/particles';
import { Sounds } from '../game/sounds';
import { Terminal, Gem, CheckCircle, Trophy } from 'lucide-react';

export default function VictoryScreen({ results, onContinue }) {
  useEffect(() => {
    if (results) {
      // Confetti celebration
      Particles.emitConfetti();

      // Check for rank up
      if (results.rankResult?.ranked) {
        setTimeout(() => {
          Particles.emitLevelUp();
        }, 1000);
      }
    }
  }, [results]);

  if (!results) return null;

  const challenge = results.challenge;
  const isBoss = results.isBoss || challenge.isBoss;
  const isPerfect = results.isPerfect;

  return (
    <div className="screen victory-screen active" id="screen-victory" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="character-form" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
        <div id="victory-icon-emoji" style={{ fontSize: '4.5rem', marginBottom: 'var(--space-3)', color: 'var(--color-green)' }}>
          {isBoss ? <Terminal size={72} /> : isPerfect ? <Gem size={72} /> : <CheckCircle size={72} />}
        </div>
        
        <h2 id="victory-title" style={{ fontFamily: 'var(--font-display)', fontWeight: 'bold' }}>
          {isBoss ? 'Build Integration Succeeded!' : 'Assessment Complete!'}
        </h2>
        <p id="victory-subtitle" className="form-subtitle" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-cyan)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-6)', fontWeight: 'bold' }}>
          {challenge.title}
        </p>

        {/* Stats Row */}
        <div style={{ display: 'flex', gap: 'var(--space-4)', width: '100%', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="stat-box" style={{ flex: 1, background: 'var(--color-bg-dark)', padding: 'var(--space-3)' }}>
            <div className="stat-num" id="victory-xp-earned" style={{ color: 'var(--color-gold)' }}>
              +{results.xpResult?.totalXP || challenge.xpReward}
            </div>
            <div className="stat-label">XP Acquired</div>
          </div>
          <div className="stat-box" style={{ flex: 1, background: 'var(--color-bg-dark)', padding: 'var(--space-3)' }}>
            <div className="stat-num" id="victory-time-spent" style={{ color: 'var(--color-cyan)' }}>
              {Math.round(results.timeMs / 1000)}s
            </div>
            <div className="stat-label">Execution Duration</div>
          </div>
        </div>

        {/* XP Bonuses List */}
        <div style={{ width: '100%', marginBottom: 'var(--space-6)' }}>
          <h4 style={{ fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)', fontWeight: 'bold' }}>Resource Compilation Breakdown</h4>
          <div id="victory-bonuses-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
            {results.xpResult?.bonuses?.map((bonus, i) => (
              <div
                key={i}
                className="editor-lang-badge"
                style={{
                  background: bonus.amount < 0 ? 'var(--color-red)' : 'var(--color-bg-dark)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--color-text-primary)',
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: '11px',
                  width: '90%',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <span>{bonus.icon} {bonus.label}</span>
                <span style={{ color: 'var(--color-cyan)', fontWeight: 'bold' }}>{bonus.amount > 0 ? '+' : ''}{bonus.amount} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quests Completed Alert */}
        {results.completedQuests?.length > 0 && (
          <div style={{ width: '90%', background: 'var(--color-cyan-soft)', border: '1px solid var(--color-cyan)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3) var(--space-4)', marginBottom: 'var(--space-6)', textAlign: 'left' }}>
            <strong style={{ color: 'var(--color-cyan)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 'var(--space-2)' }}><Trophy size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Workspace Deliverables Completed</strong>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px', color: 'var(--color-text-primary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {results.completedQuests.map((quest) => (
                <li key={quest.id}>{quest.description} (+{quest.rewardXP} XP)</li>
              ))}
            </ul>
          </div>
        )}

        <div className="landing-actions" style={{ width: '100%' }}>
          <button className="btn btn-primary" id="btn-victory-continue" onClick={() => { Sounds.playClick(); onContinue(); }} style={{ width: '100%', padding: '10px', fontSize: 'var(--text-xs)' }}>
            Proceed to Dashboard ➔
          </button>
        </div>
      </div>
    </div>
  );
}
