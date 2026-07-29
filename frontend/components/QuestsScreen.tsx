import React, { useState, useEffect } from 'react';
import { Player } from '../game/player';
import { Quests } from '../game/quests';
import { Sounds } from '../game/sounds';
import { ArrowLeft, Check, FlaskConical } from 'lucide-react';

export default function QuestsScreen({ onBack, onTryInSandbox }) {
  const [questsList, setQuestsList] = useState([]);

  useEffect(() => {
    setQuestsList(Quests.getDailyQuests());
  }, []);

  const handleClaim = (questId) => {
    Sounds.playSuccess();
    const reward = Quests.claimReward(questId);
    if (reward > 0) {
      alert(`Claimed +${reward} XP!`);
      setQuestsList(Quests.getDailyQuests()); // Refresh progress
    }
  };

  const previewQuests = [
    {
      title: 'JS Array Filter Logic',
      lang: 'javascript',
      description: 'Filter data structures dynamically based on active filter schemas.',
      study: 'const names = ["Arthur", "Merlin", "Albus"];\nconst filtered = names.filter(n => n.startsWith("A"));\n// filtered is ["Arthur", "Albus"]',
      template: '// Practice: Filter out numbers greater than 10\nconst scores = [5, 12, 8, 15, 3];\nconst filtered = scores.filter(s => s > 10);\nconsole.log(filtered); // Should print [12, 15]\n'
    },
    {
      title: 'HTML Forms Elements',
      lang: 'html',
      description: 'Build robust data capture screens with semantic text input selectors.',
      study: '<form>\n  <label>Username:</label>\n  <input type="text" placeholder="E.g., johndoe">\n</form>',
      template: '<!-- Practice: Create a submit button inside a form -->\n<form>\n  <input type="text" placeholder="Developer Name">\n  <button type="submit">Submit</button>\n</form>\n'
    },
    {
      title: 'CSS Flexbox Containers',
      lang: 'css',
      description: 'Align multiple layout components dynamically within flex containers.',
      study: '.container {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}',
      template: '/* Practice: Center a button inside a flex container */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n'
    }
  ];

  return (
    <div className="screen quests-screen active" id="screen-quests" style={{ padding: 'var(--space-8)', overflowY: 'auto' }}>
      <div className="levels-header" style={{ position: 'relative' }}>
        <button className="btn btn-secondary back-btn" id="btn-quests-back" onClick={() => { Sounds.playClick(); onBack(); }}>
          <ArrowLeft size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} /> Back to Dashboard
        </button>
        <h2>Workspace Assessment Deliverables</h2>
        <p>Solve daily objectives to build experience metrics</p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        
        {/* Daily Tasks Section */}
        <div className="panel-section" style={{ background: 'var(--color-bg-medium)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
          <h4 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-cyan)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', fontWeight: 'bold' }}>
            Daily Tasks Checklist
          </h4>
          <div id="daily-quests-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {questsList.map((quest) => (
              <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`} style={{ background: 'var(--color-bg-dark)', padding: 'var(--space-3)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)' }}>
                <div className="quest-check" style={{ border: '1px solid var(--color-cyan)', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)' }}>
                  {quest.completed ? <Check size={14} /> : ''}
                </div>
                <div className="quest-info" style={{ flex: 1 }}>
                  <div className="quest-name" style={{ fontWeight: 'bold', fontSize: 'var(--text-xs)' }}>
                    {quest.description} ({quest.progress}/{quest.target})
                  </div>
                  <div className="quest-reward" style={{ fontSize: '10px', color: 'var(--color-gold)' }}>
                    Resource Reward: +{quest.rewardXP} XP
                  </div>
                </div>
                {quest.completed && !quest.claimed && (
                  <button className="btn btn-primary" onClick={() => handleClaim(quest.id)} style={{ padding: '4px 10px', fontSize: '10px' }}>
                    Claim XP
                  </button>
                )}
                {quest.claimed && (
                  <span style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Claimed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tomorrow's Topic Guides */}
        <div className="panel-section" style={{ background: 'var(--color-bg-medium)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
          <h4 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-magenta)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', fontWeight: 'bold' }}>
            Upcoming Module Objectives
          </h4>
          <div id="tomorrow-quests-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {previewQuests.map((quest, idx) => (
              <div key={idx} className="quest-item" style={{ background: 'var(--color-bg-dark)', padding: 'var(--space-4)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', flexDirection: 'column', alignItems: 'stretch', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="quest-name" style={{ fontWeight: 'bold', color: 'var(--color-cyan)', fontSize: 'var(--text-xs)' }}>{quest.title}</div>
                  <span className="editor-lang-badge" style={{ fontSize: '9px', padding: '2px 6px', background: 'var(--color-bg-medium)' }}>{quest.lang.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                  {quest.description}
                </div>
                <div style={{ fontFamily: 'var(--font-code)', fontSize: '10px', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', color: 'var(--color-text-muted)', whiteSpace: 'pre-wrap' }}>
                  {quest.study}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-1)' }}>
                  <button
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: '9px' }}
                    onClick={() => { Sounds.playClick(); onTryInSandbox(quest.lang, quest.template); }}
                  >
                    <FlaskConical size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Try in Sandbox
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
