import React from 'react';
import { Player } from '../game/player';
import { Sounds } from '../game/sounds';
import Avatar from './Avatar';
import { Medal, ArrowLeft } from 'lucide-react';

export default function LeaderboardScreen({ onBack }) {
  const getLeaderboardData = () => {
    const players: any[] = [];

    if (Player.exists()) {
      players.push({
        name: Player.getName(),
        avatar: Player.getAvatar(),
        rank: Player.getRank().title,
        isCurrentPlayer: true
      });
    }

    return players;
  };

  const leaderboardList = getLeaderboardData();

  return (
    <div className="screen leaderboard-screen active" id="screen-leaderboard">
      <div className="levels-header" style={{ position: 'relative' }}>
        <button className="btn btn-secondary back-btn" id="btn-leaderboard-back" onClick={() => { Sounds.playClick(); onBack(); }}>
          <ArrowLeft size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} /> Back to Dashboard
        </button>
        <h2>Workspace Contributor Standings</h2>
        <p>Review peer progression metrics and completed modules globally</p>
      </div>

      <div className="leaderboard-container" id="leaderboard-container" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {leaderboardList.map((p, idx) => {
          const rank = idx + 1;
          let topClass = '';
          if (rank === 1) topClass = 'top-1';
          else if (rank === 2) topClass = 'top-2';
          else if (rank === 3) topClass = 'top-3';

          const playerClass = p.isCurrentPlayer ? 'current-player' : '';
          let medal: any = rank;
          if (rank === 1) medal = <Medal size={24} color="#fbbf24" />;
          else if (rank === 2) medal = <Medal size={24} color="#94a3b8" />;
          else if (rank === 3) medal = <Medal size={24} color="#b45309" />;

          return (
            <div key={idx} className={`leaderboard-row ${topClass} ${playerClass}`} style={{ border: '1px solid var(--glass-border)', padding: 'var(--space-3)', background: 'var(--color-bg-medium)' }}>
              <div className="leaderboard-rank">{medal}</div>
              <div className="leaderboard-player">
                <span className="leaderboard-player-avatar" style={{ fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Avatar avatar={p.avatar} /></span>
                <div className="leaderboard-player-info">
                  <span className="leaderboard-player-name" style={{ fontWeight: 'bold' }}>
                    {p.name} {p.isCurrentPlayer && ' (You)'}
                  </span>
                  <span className="leaderboard-player-rank">{p.rank}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
