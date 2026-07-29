import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
import { LANGUAGE_META } from '../../game/languages';
import { Player } from '../../game/player';

export default function CodeEditor({ 
  language, 
  code, 
  onChange, 
  mcq, 
  solution,
  onRun, 
  onReset,
  output,
  outputStatus,
  onDismissOutput
}: any) {
  const [selectedMcq, setSelectedMcq] = useState(null);
  const [isMobile, setIsMobile] = useState((Player.exists() && Player.getDeviceType() === 'android') || window.innerWidth <= 900);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  // Load editor configurations dynamically
  const [tabSize, setTabSize] = useState(parseInt(localStorage.getItem('codequest_tab_size') || '2', 10));

  useEffect(() => {
    const handleResize = () => {
      const isAndroid = Player.exists() && Player.getDeviceType() === 'android';
      setIsMobile(isAndroid || window.innerWidth <= 900);
    };
    
    const handleSettingsUpdate = () => {
      setTabSize(parseInt(localStorage.getItem('codequest_tab_size') || '2', 10));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('editor-settings-updated', handleSettingsUpdate);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('editor-settings-updated', handleSettingsUpdate);
    };
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  const handleSubmitMcq = () => {
    if (selectedMcq === null) {
      onRun('no_mcq_selected');
    } else if (selectedMcq === mcq.correctIndex) {
      onRun(solution || '');
    } else {
      onRun('incorrect_mcq');
    }
  };

  // Helper buttons mapping for all 27 languages
  const helperButtons = {
    'html': ['<', '>', '="', '/', 'div', 'span', 'class', 'id', 'section', 'p', 'h1'],
    'css': ['{', '}', ':', ';', '.', '#', 'margin', 'padding', 'color', 'background', 'display'],
    'javascript': ['{', '}', '(', ')', '[', ']', ';', '=', '"', "'", 'const', 'let', 'function', 'console.log'],
    'typescript': ['{', '}', '(', ')', '[', ']', ';', ':', '=', 'interface', 'type', 'readonly', 'any', 'unknown'],
    'json': ['{', '}', '[', ']', ':', ',', '"', 'true', 'false', 'null'],
    'xml': ['<', '>', '="', '/', '?', '!--', 'xmlns'],
    'yaml': [':', '-', ' ', '"', "'", 'true', 'false', 'null'],
    'markdown': ['#', '##', '*', '**', '_', '`', '```', '[', ']', '(', ')', '- ', '|'],
    'graphql': ['{', '}', '(', ')', ':', 'query', 'mutation', 'fragment', 'type', 'input', '@'],
    'python': [':', '(', ')', '[', ']', '=', 'def ', 'class ', 'import ', 'print', 'self', 'in', 'if ', 'elif ', 'else:'],
    'java': ['{', '}', '(', ')', '[', ']', ';', '=', 'public', 'class', 'void', 'static', 'String', 'System.out.println'],
    'csharp': ['{', '}', '(', ')', '[', ']', ';', '=', 'public', 'class', 'void', 'static', 'string', 'Console.WriteLine'],
    'go': ['{', '}', '(', ')', '[', ']', ';', ':=', 'func ', 'struct', 'package ', 'import ', 'fmt.Println'],
    'rust': ['{', '}', '(', ')', '[', ']', ';', 'let ', 'mut ', 'fn ', 'struct ', 'enum ', 'impl ', 'println!'],
    'php': ['<?php', '?>', '{', '}', '(', ')', ';', '=', '$', 'function', 'echo', 'public', 'class'],
    'ruby': ['def ', 'end', 'class ', 'module ', 'do ', 'yield', '@', '$', 'puts', 'require'],
    'kotlin': ['{', '}', '(', ')', '[', ']', ';', 'val ', 'var ', 'fun ', 'class ', 'println'],
    'swift': ['{', '}', '(', ')', '[', ']', 'let ', 'var ', 'func ', 'class ', 'struct ', 'print'],
    'dart': ['{', '}', '(', ')', '[', ']', ';', 'void ', 'class ', 'var ', 'final ', 'print'],
    'c': ['{', '}', '(', ')', '[', ']', ';', '#include ', 'int ', 'char ', 'void ', 'printf', 'malloc'],
    'cpp': ['{', '}', '(', ')', '[', ']', ';', '#include ', 'std::', 'cout', 'cin', 'class ', 'public:'],
    'sql': ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', '*', '=', ';', 'JOIN'],
    'mysql': ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'CREATE TABLE', 'ENGINE=InnoDB', ';'],
    'sqlite': ['SELECT', 'FROM', 'WHERE', 'INSERT', 'CREATE TABLE', 'AUTOINCREMENT', 'TEXT', 'INTEGER', ';'],
    'postgresql': ['SELECT', 'FROM', 'WHERE', 'WITH', 'WINDOW', 'OVER', 'JSONB', 'RETURNING', ';'],
    'mongodb': ['db.', 'find', 'aggregate', 'match', 'group', 'project', 'sort', 'limit', '{', '}'],
    'redis': ['SET', 'GET', 'DEL', 'EXISTS', 'EXPIRE', 'KEYS', 'HSET', 'HGET', 'LPUSH', 'LPOP'],
    'cassandra': ['CREATE KEYSPACE', 'replication', 'USE', 'CREATE TABLE', 'PRIMARY KEY', 'uuid', ';'],
    'neo4j': ['CREATE', 'MATCH', 'RETURN', 'WHERE', 'MERGE', 'RELATIONSHIP', '->', ':', '()'],
    'bash': ['#!/bin/bash', 'if ', 'then', 'fi', 'for ', 'do', 'done', 'echo ', 'exit ', '$', '|'],
    'r': ['<-', 'c(', 'data.frame(', 'plot(', 'summary(', 'library(', 'function(', 'if'],
    'matlab': ['=', ';', 'function', 'end', 'plot(', 'zeros(', 'ones(', 'size(', 'disp('],
    'sass': ['{', '}', ':', ';', '$', '@mixin', '@include', 'margin', 'padding', 'background', '&:hover'],
    'elixir': ['defmodule', 'def', 'do', 'end', '%', '->', 'IO.puts', 'spawn', 'send', 'receive'],
    'scala': ['object', 'case class', 'def', 'val', 'var', 'List', '=>', 'println', 'Unit', 'match'],
    'perl': ['my', '$', '@', 'print', 'shift', 'uc', 'lc', 'split', 'join', '=~', '$_'],
    'haskell': ['let', 'in', 'where', 'data', 'deriving', '::', '->', '=>', 'putStrLn', 'take']
  };

  const getLanguageLabel = () => {
    const meta = LANGUAGE_META[language];
    if (meta) {
      return `${meta.icon} ${meta.label}`;
    }
    return String(language).toUpperCase();
  };

  const btns = helperButtons[language] || helperButtons['javascript'];

  const insertAtCursor = (text) => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;

    const selection = editor.getSelection();
    const range = new monaco.Range(
      selection.startLineNumber,
      selection.startColumn,
      selection.endLineNumber,
      selection.endColumn
    );

    const pairs = { '{': '}', '(': ')', '[': ']', '<': '>', '"': '"', "'": "'" };
    let insertion = text;
    if (pairs[text]) {
      insertion = text + pairs[text];
    }

    const id = { major: 1, minor: 1 };
    const textEdit = { identifier: id, range: range, text: insertion, forceMoveMarkers: true };
    editor.executeEdits("helper-bar-insert", [textEdit]);

    // Move cursor inside brackets if it was a pair
    if (pairs[text]) {
      editor.setPosition({
        lineNumber: selection.startLineNumber,
        column: selection.startColumn + text.length
      });
    }
    
    editor.focus();
  };

  if (isMobile && mcq) {
    return (
      <div className="editor-wrapper mcq-wrapper">
        <div className="editor-toolbar">
          <div className="editor-toolbar-left">
            <span className="editor-lang-badge">📋 MCQ Challenge</span>
          </div>
          <div className="editor-toolbar-right">
            <button className="btn-run" onClick={handleSubmitMcq}>Submit Answer</button>
          </div>
        </div>
        <div className="mcq-body">
          <h4 className="mcq-question">{mcq.question}</h4>
          <div className="mcq-options-list">
            {mcq.options.map((opt, idx) => {
              return (
                <label key={idx} className={`mcq-option ${selectedMcq === idx ? 'active' : ''}`} htmlFor={`mcq-opt-${idx}`}>
                  <input 
                    type="radio" 
                    name="mcq-choice" 
                    id={`mcq-opt-${idx}`} 
                    value={idx}
                    checked={selectedMcq === idx}
                    onChange={() => setSelectedMcq(idx)}
                  />
                  <span className="mcq-marker"></span>
                  <span className="mcq-text" dangerouslySetInnerHTML={{ __html: opt.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>') }}></span>
                </label>
              );
            })}
          </div>
        </div>
        {output && (
          <div className="output-panel" style={{ display: 'block' }}>
            <div className="output-header">
              <span className="output-title">📟 Output</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`output-status ${outputStatus}`}>{outputStatus === 'success' ? 'SUCCESS' : 'ERROR'}</span>
                <button
                  onClick={() => onDismissOutput && onDismissOutput()}
                  title="Close Output Panel"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '6px',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    fontSize: '13px',
                    lineHeight: '1',
                    padding: '2px 8px',
                    transition: 'all 0.18s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-body)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                >
                  <span>✕</span>
                  <span style={{ fontSize: '10px', letterSpacing: '0.04em' }}>CLOSE</span>
                </button>
              </div>
            </div>
            <div className="output-body">
              {output.map((res, i) => (
                <div key={i} className={`output-line ${res.type}`}>{res.text}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const monacoLangMap = {
    'html': 'html',
    'css': 'css',
    'javascript': 'javascript',
    'typescript': 'typescript',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'markdown': 'markdown',
    'graphql': 'graphql',
    'python': 'python',
    'java': 'java',
    'csharp': 'csharp',
    'go': 'go',
    'rust': 'rust',
    'php': 'php',
    'ruby': 'ruby',
    'kotlin': 'kotlin',
    'swift': 'swift',
    'dart': 'dart',
    'c': 'c',
    'cpp': 'cpp',
    'sql': 'sql',
    'mysql': 'sql',
    'sqlite': 'sql',
    'postgresql': 'pgsql',
    'mongodb': 'javascript',
    'redis': 'redis',
    'cassandra': 'sql',
    'neo4j': 'cypher',
    'bash': 'shell',
    'r': 'r',
    'matlab': 'matlab',
    'sass': 'scss',
    'elixir': 'elixir',
    'scala': 'scala',
    'perl': 'perl',
    'haskell': 'haskell'
  };

  return (
    <div className="editor-wrapper" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <div className="editor-toolbar">
        <div className="editor-toolbar-left">
          <span className="editor-lang-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {LANGUAGE_META[language]?.deviconClass ? (
              <i className={`${LANGUAGE_META[language].deviconClass} colored`} style={{ fontSize: '15px' }}></i>
            ) : (
              <span>{LANGUAGE_META[language]?.icon}</span>
            )}
            <span>{LANGUAGE_META[language]?.label || String(language).toUpperCase()}</span>
          </span>
        </div>
        <div className="editor-toolbar-right">
          <button className="btn-reset" onClick={onReset} title="Reset Code">↺ Reset</button>
          <button className="btn-run" onClick={() => onRun(code)}>▶ Run Code</button>
        </div>
      </div>
      <div className="editor-mobile-helper-bar">
        {btns.map((btnText, i) => {
          let label = btnText;
          if (btnText === '{') label = '{}';
          else if (btnText === '(') label = '()';
          else if (btnText === '[') label = '[]';
          else if (btnText === '<') label = '<>';
          return (
            <button key={i} className="helper-btn" onClick={() => insertAtCursor(btnText)}>{label}</button>
          );
        })}
      </div>
      <div className="editor-body" style={{ flex: 1, display: 'flex', minHeight: '300px' }}>
        <div className="code-input-wrapper" style={{ flex: 1, height: '100%', width: '100%', minHeight: '300px', background: 'var(--color-bg-darkest)' }}>
          <Editor
            height="100%"
            width="100%"
            language={monacoLangMap[language] || 'javascript'}
            theme="vs-dark"
            value={code}
            onChange={(val) => onChange(val || '')}
            onMount={handleEditorDidMount}
            loading={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-cyan)', fontFamily: 'var(--font-display)', gap: '10px' }}>
                <span className="spinner-mini" style={{ border: '2px solid var(--color-cyan)', borderTopColor: 'transparent', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-block', animation: 'spin 1s linear infinite' }}></span>
                Loading Monaco Engine...
              </div>
            }
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "var(--font-code), 'Consolas', 'Courier New', monospace",
              cursorBlinking: 'blink',
              cursorSmoothCaretAnimation: 'off',
              lineNumbers: 'on',
              wordWrap: 'on',
              automaticLayout: true,
              scrollBeyondLastLine: false,
              contextmenu: false,
              padding: { top: 12, bottom: 12 },
              tabSize: tabSize,
              detectIndentation: false,
              scrollbar: {
                vertical: 'auto',
                horizontal: 'auto'
              }
            }}
          />
        </div>
      </div>
      {output && (
        <div className="output-panel" style={{ display: 'block' }}>
          <div className="output-header">
            <span className="output-title">📟 Output</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`output-status ${outputStatus}`}>{outputStatus === 'success' ? 'SUCCESS' : 'ERROR'}</span>
              <button
                onClick={() => onDismissOutput && onDismissOutput()}
                title="Close Output Panel"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  lineHeight: '1',
                  padding: '2px 8px',
                  transition: 'all 0.18s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.18)'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
              >
                <span>✕</span>
                <span style={{ fontSize: '10px', letterSpacing: '0.04em' }}>CLOSE</span>
              </button>
            </div>
          </div>
          <div className="output-body">
            {output.map((res, i) => (
              <div key={i} className={`output-line ${res.type}`}>{res.text}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
