import React, { useState, useEffect, useRef } from 'react';
import { Player } from '../game/player';
import { Validator } from '../game/validator';
import { Particles } from '../game/particles';
import CodeEditor from './Editor/CodeEditor';
import { AIAssistant } from '../game/assistant';
import { Sounds } from '../game/sounds';
import { Lightbulb, Bot, ArrowLeft, FileText, ClipboardList, Terminal, BookOpen, Target, MessageSquare } from 'lucide-react';

export default function ChallengeScreen({ challenge, onBack, onComplete }) {
  const [code, setCode] = useState(challenge.starterCode || '');
  const [hintsCount, setHintsCount] = useState(0);
  const [showHintBox, setShowHintBox] = useState(false);
  const [output, setOutput] = useState(null);
  const [outputStatus, setOutputStatus] = useState('');
  const [activeTab, setActiveTab] = useState('instructions');

  // AI Chat Assistant State
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [aiInputText, setAiInputText] = useState('');
  const [aiQueriesCount, setAiQueriesCount] = useState(0);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Reset state for new challenge
    setCode(challenge.starterCode || '');
    setHintsCount(Player.getHintsUsed(challenge.id));
    setShowHintBox(false);
    setOutput(null);
    setOutputStatus('');
    setActiveTab('instructions');
    setShowAIChat(false);
    setChatMessages([
      { 
        sender: 'ai', 
        text: `Hi there! I am **Q**, your AI Companion. How can I help you with **"${challenge.title}"** today? Write a question below, or select a quick-helper prompt.` 
      }
    ]);
    setAiQueriesCount(0);
  }, [challenge]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    const handleUpgradeTrigger = () => {
      window.dispatchEvent(new CustomEvent('open-premium-modal'));
    };
    window.addEventListener('trigger-premium-upgrade', handleUpgradeTrigger);
    return () => {
      window.removeEventListener('trigger-premium-upgrade', handleUpgradeTrigger);
    };
  }, []);

  const handleRevealHint = () => {
    Sounds.playClick();
    if (hintsCount < challenge.hints.length) {
      Player.useHint(challenge.id);
      const updated = Player.getHintsUsed(challenge.id);
      setHintsCount(updated);
      setShowHintBox(true);
      if ((window as any).addNotification) {
        (window as any).addNotification(`Hint unlocked for "${challenge.title}"`, <Lightbulb size={14} />);
      }
    } else {
      setShowHintBox(true);
    }
  };

  const handleReset = () => {
    Sounds.playClick();
    if (window.confirm('Are you sure you want to reset the editor to the starter code? Your current edits will be lost.')) {
      setCode(challenge.starterCode || '');
      setOutput(null);
      setOutputStatus('');
    }
  };

  const handleRun = (currentCode) => {
    const validation = Validator.validate(currentCode, challenge);
    setOutput(validation.results);
    setOutputStatus(validation.passed ? 'success' : 'error');

    if (validation.passed) {
      Sounds.playSuccess();
      const runBtn = document.getElementById('editor-run-btn');
      let rx = window.innerWidth / 2;
      let ry = window.innerHeight / 2;
      if (runBtn && runBtn.getBoundingClientRect) {
        const rect = runBtn.getBoundingClientRect();
        rx = rect.left + rect.width / 2;
        ry = rect.top + rect.height / 2;
      }
      Particles.emitSuccess(rx, ry);
      Particles.emitXP(window.innerWidth / 2, window.innerHeight / 2, challenge.xpReward);

      setTimeout(() => {
        onComplete(challenge, { hintsUsed: hintsCount });
      }, 1500);
    } else {
      Sounds.playError();
    }
  };

  const handleAskAI = (messageText) => {
    if (!messageText.trim()) return;

    Sounds.playClick();
    const userMsg = { sender: 'user', text: messageText };
    setChatMessages(prev => [...prev, userMsg]);
    setAiInputText('');

    const isPremium = Player.isPremium();
    if (!isPremium && aiQueriesCount >= 2) {
      setTimeout(() => {
        Sounds.playError();
        setChatMessages(prev => [...prev, {
          sender: 'ai',
          text: `⚠️ **Free Limit Reached:** You have used your 2 free AI suggestions for this quest. 

Upgrade to **CodeQuest Premium** to unlock unlimited queries, real-time code fixes, and explanations!
<br/>
<button class="btn btn-primary" style="margin-top: var(--space-2); padding: 4px 10px; font-size: 10px;" onclick="window.dispatchEvent(new CustomEvent('trigger-premium-upgrade'))">💎 Upgrade to Premium</button>`
        }]);
      }, 500);
      return;
    }

    if (!isPremium) {
      setAiQueriesCount(prev => prev + 1);
    }

    setTimeout(() => {
      const validationResults = Validator.validate(code, challenge);
      const reply = AIAssistant.generateResponse(challenge, code, validationResults, messageText);
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      Sounds.playXPGain();
      if ((window as any).addNotification) {
        (window as any).addNotification('AI Copilot generated a suggestion', <Bot size={14} />);
      }
    }, 800);
  };

  return (
    <div className={`screen challenge-screen active ${activeTab === 'editor' ? 'active-tab-editor' : ''}`} id="screen-challenge" style={{ display: 'flex' }}>
      
      <div className="levels-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', width: '100%', marginBottom: 'var(--space-4)', position: 'relative', padding: 'var(--space-5) var(--space-4) 0 var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => { Sounds.playClick(); onBack(); }} style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}>
            <ArrowLeft size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 6 }} /> Back
          </button>
          <button className="btn btn-primary" onClick={handleRevealHint} style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}>
            <Lightbulb size={16} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Hint ({hintsCount}/{challenge.hints.length})
          </button>
        </div>
        <h2 style={{ margin: 'var(--space-1) 0 0 0', fontSize: 'clamp(1.2rem, 4vw, 2rem)', textAlign: 'center', width: '100%' }}>
          {challenge.title}
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
          {challenge.mcq ? <><ClipboardList size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> MCQ Option</> : <><Terminal size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Sandbox Editor</>}
        </button>
      </div>

      <div className={`challenge-hint-box ${showHintBox ? 'visible' : ''}`} id="challenge-hint-box" style={{ margin: '0 auto var(--space-4) auto', maxWidth: '800px', display: showHintBox ? 'block' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <strong style={{ color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: 4 }}><Lightbulb size={14} /> Unlocked Hints</strong>
          <button className="helper-btn" onClick={() => { Sounds.playClick(); setShowHintBox(false); }} style={{ padding: '2px 8px', fontSize: '10px' }}>Close</button>
        </div>
        <ul style={{ paddingLeft: 'var(--space-4)', margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          {challenge.hints.slice(0, hintsCount).map((hint, i) => (
            <li key={i} style={{ marginBottom: 'var(--space-2)' }}>{hint}</li>
          ))}
        </ul>
      </div>

      <div className="challenge-body">
        <div className="challenge-panel-left">
          <div className="challenge-story">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 6 }}><BookOpen size={16} /> Quest Story</h3>
            <p className="story-text">
              {challenge.story}
            </p>
            <div className="instructions">
              <h5 style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Target size={14} /> Objectives</h5>
              <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                {challenge.instructions.map((inst, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: inst }}></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="challenge-panel-right">
          <CodeEditor
            language={challenge.language}
            code={code}
            onChange={setCode}
            mcq={challenge.mcq}
            solution={challenge.solution}
            onRun={handleRun}
            onReset={handleReset}
            output={output}
            outputStatus={outputStatus}
            onDismissOutput={() => { setOutput(null); setOutputStatus(''); }}
          />
        </div>
      </div>

      {/* Floating AI Robot Button */}
      <button 
        className="ai-floating-btn" 
        onClick={() => {
          Sounds.playClick();
          setShowAIChat(prev => !prev);
        }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-cyan-dim), var(--color-cyan))',
          boxShadow: '0 4px 20px var(--color-cyan-glow)',
          border: '1px solid rgba(0, 245, 255, 0.4)',
          color: '#fff',
          fontSize: '1.6rem',
          cursor: 'pointer',
          zIndex: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        title="Ask Q (AI Assistant)"
      >
        <MessageSquare size={24} />
      </button>

      {/* AI Chat drawer pane */}
      {showAIChat && (
        <div className="ai-chat-panel" style={{
          position: 'fixed',
          top: '90px',
          right: '24px',
          bottom: '100px',
          width: 'min(380px, 90vw)',
          background: 'rgba(15, 15, 30, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 245, 255, 0.1)',
          zIndex: 510,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            background: 'var(--color-bg-medium)',
            padding: 'var(--space-3) var(--space-4)',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '1.2rem' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>Q Assistant</div>
                <div style={{ fontSize: '9px', color: 'var(--color-cyan)', fontWeight: 'bold' }}>
                  🟢 CO-DEVELOPER ACTIVE
                </div>
              </div>
            </div>
            <button className="helper-btn" onClick={() => { Sounds.playClick(); setShowAIChat(false); }} style={{ padding: '2px 8px', fontSize: 'var(--text-xs)', background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)'
          }}>
            {chatMessages.map((msg, i) => (
              <div 
                key={i} 
                className={`chat-msg ${msg.sender}`}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? 'var(--color-cyan-dim)' : 'var(--color-bg-darkest)',
                  color: 'var(--color-text-primary)',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: msg.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  maxWidth: '85%',
                  fontSize: 'var(--text-xs)',
                  lineHeight: '1.5',
                  border: msg.sender === 'user' ? '1px solid rgba(0, 245, 255, 0.2)' : '1px solid var(--glass-border)'
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }} />
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Helper Preset Buttons */}
          <div style={{
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--color-bg-medium)',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            gap: 'var(--space-2)',
            overflowX: 'auto',
            flexShrink: 0
          }}>
            <button 
              className="helper-btn" 
              onClick={() => handleAskAI('Explain concept')}
              style={{ fontSize: '9px', whiteSpace: 'nowrap', padding: '3px 8px', background: 'var(--color-bg-lighter)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-cyan)', cursor: 'pointer' }}
            >
              📖 Concept
            </button>
            <button 
              className="helper-btn" 
              onClick={() => handleAskAI('Review my code')}
              style={{ fontSize: '9px', whiteSpace: 'nowrap', padding: '3px 8px', background: 'var(--color-bg-lighter)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-cyan)', cursor: 'pointer' }}
            >
              🔍 Review Code
            </button>
            <button 
              className="helper-btn" 
              onClick={() => handleAskAI('Suggest a fix')}
              style={{ fontSize: '9px', whiteSpace: 'nowrap', padding: '3px 8px', background: 'var(--color-bg-lighter)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-cyan)', cursor: 'pointer' }}
            >
              💡 Suggest Fix
            </button>
          </div>

          {/* Form input */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleAskAI(aiInputText);
            }}
            style={{
              padding: 'var(--space-3)',
              background: 'var(--color-bg-darkest)',
              borderTop: '1px solid var(--glass-border)',
              display: 'flex',
              gap: 'var(--space-2)',
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <input
              type="text"
              className="form-input"
              value={aiInputText}
              onChange={(e) => setAiInputText(e.target.value)}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                padding: '6px 12px',
                fontSize: 'var(--text-xs)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)',
                background: 'var(--color-bg-dark)',
                color: 'var(--color-text-primary)'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={!aiInputText.trim()}
              style={{ padding: '6px 12px', fontSize: 'var(--text-xs)', flexShrink: 0 }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
