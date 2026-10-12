import React, { useState, useRef, useEffect } from 'react';
import { Sounds } from '../game/sounds';
import { Player } from '../game/player';
import { BACKEND_URL } from '../game/config';

export default function AiCopilotScreen({ onBack }) {
  const [messages, setMessages] = useState([
    {
      sender: 'copilot',
      text: `Hello! I am your AI Copilot. Ask me about Frontend layouts, Express servers, SQL queries, or request standard boilerplate templates!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isMobile, setIsMobile] = useState((Player.exists() && Player.getDeviceType() === 'android') || window.innerWidth <= 768);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      const isAndroid = Player.exists() && Player.getDeviceType() === 'android';
      setIsMobile(isAndroid || window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const quickPrompts = [
    'Explain CSS Grid Layouts',
    'Write an Express Mock Router',
    'Write a SQL JOIN Query',
    'Explain ES6 Promises'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    Sounds.playClick();
    
    const userMsg = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Fetch response from Fastify backend
    fetch(`${BACKEND_URL}/api/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    .then(res => res.json())
    .then(data => {
      Sounds.playSuccess();
      const copilotMsg = {
        sender: 'copilot',
        text: data.response || 'No reply received from server.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, copilotMsg]);
    })
    .catch(err => {
      // Offline fallback to local generation
      Sounds.playSuccess();
      const reply = generateCopilotReply(text);
      const copilotMsg = {
        sender: 'copilot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, copilotMsg]);
    });
  };

  const generateCopilotReply = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('grid')) {
      return `### CSS Grid Layout Boilerplate:
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.grid-item-wide {
  grid-column: span 2;
}
\`\`\`
**Explanation:** \`grid-template-columns: repeat(3, 1fr);\` creates a 3-column responsive layout where columns take equal fractional spaces.`;
    }
    
    if (q.includes('express') || q.includes('router') || q.includes('backend')) {
      return `### Express Router Boilerplate:
\`\`\`javascript
const express = require('express');
const router = express.Router();

// GET all active logs
router.get('/deployments', (req, res) => {
  res.status(200).json({ success: true, count: 2 });
});

module.exports = router;
\`\`\`
**Explanation:** Express Routers isolate path handlers, exporting middlewares that attach cleanly to root application ports.`;
    }

    if (q.includes('join') || q.includes('sql') || q.includes('database')) {
      return `### SQL Relational JOIN Query:
\`\`\`sql
SELECT u.id, u.username, p.title
FROM users u
INNER JOIN profiles p ON u.id = p.user_id
WHERE p.is_premium = 1;
\`\`\`
**Explanation:** \`INNER JOIN\` queries select records with matching values in both tables, using aliases (\`u\` and \`p\`) to write clean filters.`;
    }

    if (q.includes('promise') || q.includes('async') || q.includes('es6')) {
      return `### Async/Await ES6 Pattern:
\`\`\`javascript
async function fetchSystemMetrics(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.metrics;
  } catch (error) {
    console.error("Pipeline failure:", error);
  }
}
\`\`\`
**Explanation:** \`async/await\` simplifies promise resolution, keeping sequential syntax clean and wrapping checks inside structured \`try/catch\` blocks.`;
    }

    return `I can help you build templates for that! Here is a boilerplate coding checklist:
1. Initialize structure & variables.
2. Setup modular interfaces & error handling.
3. Validate return criteria.
Try asking specifically about **CSS Grid**, **Express Router**, **SQL JOIN**, or **ES6 Promises**!`;
  };

  return (
    <div className="screen copilot-screen active" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: isMobile ? 'var(--space-3)' : 'var(--space-6)', overflowY: isMobile ? 'auto' : 'hidden' }}>
      <div className="levels-header" style={{ marginBottom: 'var(--space-4)', position: 'relative' }}>
        <button className="btn btn-secondary back-btn" onClick={() => { Sounds.playClick(); onBack(); }} style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}>
          ⬅ Back to Dashboard
        </button>
        <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)' }}>🤖 AI Copilot Workspace</h2>
        <p style={{ fontSize: 'var(--text-xs)' }}>Your interactive engineering assistant. Get immediate templates, code refactoring patterns, and logic explanations.</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 'var(--space-4)', minHeight: 0, overflow: isMobile ? 'visible' : 'hidden' }}>
        
        {/* Chat window */}
        <div style={{
          flex: isMobile ? 'none' : 2,
          height: isMobile ? '380px' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-bg-medium)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: isMobile ? '16px' : '0'
        }}>
          
          {/* Messages list */}
          <div style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((m, i) => {
              const isCopilot = m.sender === 'copilot';
              return (
                <div key={i} style={{ display: 'flex', justifyContent: isCopilot ? 'flex-start' : 'flex-end' }}>
                  <div style={{
                    maxWidth: '85%',
                    background: isCopilot ? 'var(--color-bg-dark)' : 'var(--color-cyan-dim)',
                    color: '#fff',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-lg)',
                    border: isCopilot ? '1px solid var(--glass-border)' : 'none',
                    borderTopLeftRadius: isCopilot ? '0' : 'var(--radius-lg)',
                    borderTopRightRadius: isCopilot ? 'var(--radius-lg)' : '0',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    textAlign: 'left'
                  }}>
                    {isCopilot && (
                      <div style={{ fontSize: '9px', color: 'var(--color-cyan)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>🤖</span> Copilot Engine
                      </div>
                    )}
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {m.text}
                    </div>
                    <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginTop: '6px', textAlign: 'right' }}>
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input footer */}
          <div style={{ padding: 'var(--space-3)', background: 'var(--color-bg-dark)', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask Copilot something (e.g. Write a SQL query)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                padding: '10px 14px',
                background: 'var(--color-bg-medium)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-primary)',
                fontSize: '13px'
              }}
            />
            <button 
              className="btn btn-primary" 
              onClick={() => handleSend()}
              style={{ padding: '0 20px', fontSize: 'var(--text-xs)' }}
            >
              Send
            </button>
          </div>
        </div>

        {/* Sidebar suggestions */}
        <div style={{ flex: isMobile ? 'none' : 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', textAlign: 'left' }}>
            <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--color-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: 'bold' }}>Quick Templates</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  style={{
                    background: 'var(--color-bg-dark)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px',
                    fontSize: '11px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'var(--color-text-primary)',
                    transition: 'all 0.2s'
                  }}
                  className="quick-prompt-btn"
                >
                  💡 {p}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--color-bg-medium)', border: '1px solid var(--glass-border)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', textAlign: 'left' }}>
            <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontWeight: 'bold' }}>Copilot Features</h4>
            <ul style={{ fontSize: '11px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '14px', listStyleType: 'disc' }}>
              <li>Generate layout code snippets dynamically.</li>
              <li>Provide backend structure and mock routing code files.</li>
              <li>Explain complex SQL queries and tables constraints.</li>
              <li>Assist in modular JavaScript troubleshooting.</li>
            </ul>
          </div>
          
        </div>

      </div>
    </div>
  );
}
