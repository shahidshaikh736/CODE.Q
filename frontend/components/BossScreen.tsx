import React, { useState, useEffect } from 'react';
import { Player } from '../game/player';
import { BossFight } from '../game/boss-fights';
import { Validator } from '../game/validator';
import { Particles } from '../game/particles';
import CodeEditor from './Editor/CodeEditor';
import { Sounds } from '../game/sounds';
import { FileText, Terminal, Settings, Target } from 'lucide-react';

export default function BossScreen({ boss, onBack, onCompletePhase }) {
  const [phase, setPhase] = useState(null);
  const [code, setCode] = useState('');
  const [damaged, setDamaged] = useState(false);
  const [output, setOutput] = useState(null);
  const [outputStatus, setOutputStatus] = useState('');
  const [activeTab, setActiveTab] = useState('instructions');

  useEffect(() => {
    // Start or load active phase
    const p = BossFight.getCurrentPhase();
    setPhase(p);
    if (p) {
      setCode(p.starterCode || '');
      setOutput(null);
      setOutputStatus('');
      setActiveTab('instructions');
    }
  }, [boss]);

  const handleReset = () => {
    Sounds.playClick();
    if (window.confirm('Are you sure you want to reset the editor? Your current changes will be lost.')) {
      setCode(phase?.starterCode || '');
      setOutput(null);
      setOutputStatus('');
    }
  };

  const handleRun = (currentCode) => {
    if (!phase) return;
    
    let codeToValidate = currentCode;

    // Validate using validator with current phase rules
    const validation = Validator.validate(codeToValidate, boss, phase.validationRules);
    setOutput(validation.results);
    setOutputStatus(validation.passed ? 'success' : 'error');

    if (validation.passed) {
      Sounds.playSuccess();
      setDamaged(true);
      setTimeout(() => setDamaged(false), 600);

      const runBtn = document.getElementById('editor-run-btn');
      let rx = window.innerWidth / 2;
      let ry = window.innerHeight / 2;
      if (runBtn && runBtn.getBoundingClientRect) {
        const rect = runBtn.getBoundingClientRect();
        rx = rect.left + rect.width / 2;
        ry = rect.top + rect.height / 2;
      }
      Particles.emitSuccess(rx, ry);

      setTimeout(() => {
        onCompletePhase();
        // Reload next phase
        const next = BossFight.getCurrentPhase();
        if (next) {
          setPhase(next);
          setCode(next.starterCode || '');
          setOutput(null);
          setOutputStatus('');
          setActiveTab('instructions');
        }
      }, 1500);
    } else {
      Sounds.playError();
    }
  };

  if (!phase) return null;

  return (
    <div className={`screen boss-screen active ${activeTab === 'editor' ? 'active-tab-editor' : ''}`} id="screen-boss" style={{ display: 'flex' }}>
      
      <div className="levels-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', width: '100%', marginBottom: 'var(--space-4)', position: 'relative', padding: 'var(--space-5) var(--space-4) 0 var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => { Sounds.playClick(); onBack(); }} style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}>
            ⬅ Cancel Assessment
          </button>
          <div style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xs)', fontWeight: 'bold' }}>
            +{boss.xpReward} XP Reward
          </div>
        </div>
        <h2 style={{ margin: 'var(--space-1) 0 0 0', fontSize: 'clamp(1.2rem, 4vw, 2rem)', textAlign: 'center', width: '100%', fontFamily: 'var(--font-display)' }}>
          Capstone Project: {boss.title}
        </h2>
      </div>

      {/* Mobile Sub-Tabs Toggle */}
      <div className="challenge-mobile-tabs">
        <button 
          className={`mobile-tab-btn ${activeTab === 'instructions' ? 'active' : ''}`} 
          onClick={() => { Sounds.playClick(); setActiveTab('instructions'); }}
        >
          <FileText size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Details
        </button>
        <button 
          className={`mobile-tab-btn ${activeTab === 'editor' ? 'active' : ''}`} 
          onClick={() => { Sounds.playClick(); setActiveTab('editor'); }}
        >
          <Terminal size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Sandbox Editor
        </button>
      </div>

      <div className="challenge-body">
        <div className="challenge-panel-left">
          
          {/* Build Pipeline Diagnostics HUD */}
          <div className={`boss-arena ${damaged ? 'damaged' : ''}`} id="boss-arena" style={{ background: 'var(--color-bg-medium)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ margin: 0, fontSize: '10px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Build Pipeline Diagnostics</h4>
              <span style={{ fontSize: '9px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>● SYSTEM ONLINE</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-code)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-green)' }}>
                <span>✓</span> <span>Code Parser check initialized</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-green)' }}>
                <span>✓</span> <span>Structure validation passed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                <span><Settings size={12} /></span> <span>Verifying build objective {phase.phaseNumber}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)' }}>
                <span>○</span> <span>Awaiting deployment sandbox run</span>
              </div>
            </div>

            <div className="splash-loader-bar" style={{ height: '8px', background: 'var(--color-bg-dark)', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                className="splash-loader-fill"
                style={{
                  width: `${((phase.phaseNumber - 1) / phase.totalPhases) * 100}%`,
                  background: 'linear-gradient(90deg, var(--color-cyan), var(--color-magenta))',
                  transition: 'width 0.4s ease'
                }}
              ></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
              <span>Build coverage: {Math.round(((phase.phaseNumber - 1) / phase.totalPhases) * 100)}%</span>
              <span>Step {phase.phaseNumber} of {phase.totalPhases}</span>
            </div>
          </div>

          {/* Phase Instructions */}
          <div className="challenge-story" style={{ marginTop: 'var(--space-4)', background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-cyan)' }}>Objective {phase.phaseNumber}: {phase.bossName}</h3>
            <p className="story-text" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-primary)', marginTop: '8px', lineHeight: '1.5' }}>
              {phase.story}
            </p>
            <div className="instructions" style={{ borderTop: '1px solid var(--glass-border)', marginTop: '12px', paddingTop: '12px' }}>
              <h5 style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-text-secondary)', marginBottom: '8px' }}><Target size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> SPECIFICATION CHECKS</h5>
              <ul style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {phase.instructions.map((inst, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: inst }}></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="challenge-panel-right">
          <CodeEditor
            language={boss.language}
            code={code}
            onChange={setCode}
            mcq={null}
            onRun={handleRun}
            onReset={handleReset}
            output={output}
            outputStatus={outputStatus}
            onDismissOutput={() => { setOutput(null); setOutputStatus(''); }}
          />
        </div>
      </div>
    </div>
  );
}
