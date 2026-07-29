import React from 'react';
import { Player } from '../game/player';
import { ChallengesData } from '../game/challenges';

export default function LevelsScreen({ realmId, onBack, onSelectLevel }) {
  const challenges = ChallengesData[realmId] || [];

  const getRealmName = () => {
    switch (realmId) {
      case 'forest': return '🌲 Frontend Forest';
      case 'dungeon': return '🏰 Backend Dungeon';
      case 'vault': return '🏦 Database Vault';
      default: return 'Explore Levels';
    }
  };

  const handleLevelClick = (challenge, idx) => {
    if (Player.isLevelUnlocked(realmId, idx)) {
      onSelectLevel(challenge);
    }
  };

  return (
    <div className="screen levels-screen active" id="screen-levels" style={{ position: 'relative' }}>
      <div className="levels-header">
        <button className="btn btn-secondary back-btn" id="btn-levels-back" onClick={onBack}>
          ⬅ Back to Map
        </button>
        <h2>{getRealmName()}</h2>
        <p>Complete challenges in sequence to progress through the realm</p>
      </div>

      <div className="levels-list">
        {challenges.map((challenge, idx) => {
          const isUnlocked = Player.isLevelUnlocked(realmId, idx);
          const isCompleted = Player.hasCompletedChallenge(challenge.id);
          const isBoss = challenge.isBoss;

          let cardClass = '';
          if (!isUnlocked) cardClass = 'locked';
          else if (isCompleted) cardClass = 'completed';
          else if (isBoss) cardClass = 'boss';

          return (
            <React.Fragment key={challenge.id}>
              {idx > 0 && <div className="levels-path-line"></div>}
              <div
                className={`card card-level ${cardClass}`}
                onClick={() => handleLevelClick(challenge, idx)}
              >
                <div className="level-number">
                  {isCompleted ? '✓' : isBoss ? '💀' : idx + 1}
                </div>
                <div className="level-info">
                  <div className="level-title">
                    {challenge.title} {isBoss && <span style={{ color: 'var(--color-red)', fontWeight: 'bold' }}>(Boss Fight)</span>}
                  </div>
                  <div className="level-subtitle">
                    Language: <span className="editor-lang-badge" style={{ fontSize: '10px', padding: '1px 5px' }}>{challenge.language.toUpperCase()}</span>
                  </div>
                </div>
                <div className="level-xp">
                  🪙 +{challenge.xpReward} XP
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
