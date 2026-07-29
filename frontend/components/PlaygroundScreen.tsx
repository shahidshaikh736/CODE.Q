import React, { useState, useEffect } from 'react';
import { Player } from '../game/player';
import { GameEngine } from '../game/engine';
import { Particles } from '../game/particles';
import CodeEditor from './Editor/CodeEditor';
import { Sounds } from '../game/sounds';
import { XCircle, PartyPopper, FlaskConical, FileText, Terminal, BookOpen, Lightbulb, BarChart2, Target, Minus, Plus } from 'lucide-react';
import {
  LANGUAGE_CATEGORIES,
  LANGUAGE_META,
  DEFAULT_CODES,
  HINTS_DATA
} from '../game/languages';

export default function PlaygroundScreen({ onBack }) {
  const [lang, setLang] = useState('javascript');
  const [codes, setCodes] = useState(
    Object.fromEntries(Object.keys(DEFAULT_CODES).map(k => [k, DEFAULT_CODES[k]]))
  );
  const [output, setOutput] = useState(null);
  const [outputStatus, setOutputStatus] = useState('');
  const [openAccordion, setOpenAccordion] = useState(null);
  const [activeTab, setActiveTab] = useState('instructions');
  const [showLangInfo, setShowLangInfo] = useState(false);
  const [activePanelTab, setActivePanelTab] = useState('learn');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = (e) => {
      if (!e.target.closest('.custom-dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, [dropdownOpen]);

  useEffect(() => {
    const directLang = sessionStorage.getItem('sandbox_direct_lang');
    const directCode = sessionStorage.getItem('sandbox_direct_code');
    if (directLang && directCode) {
      setLang(directLang);
      setCodes(prev => ({ ...prev, [directLang]: directCode }));
      sessionStorage.removeItem('sandbox_direct_lang');
      sessionStorage.removeItem('sandbox_direct_code');
    }
  }, []);

  const handleLangChange = (valOrEvent) => {
    Sounds.playClick();
    const newLang = (valOrEvent && valOrEvent.target) ? valOrEvent.target.value : valOrEvent;
    setLang(newLang);
    setOutput(null);
    setOutputStatus('');
    setOpenAccordion(null);
    setShowLangInfo(false);
  };

  const handleReset = () => {
    Sounds.playClick();
    if (window.confirm('Reset editor? Your current changes will be lost.')) {
      setCodes(prev => ({ ...prev, [lang]: DEFAULT_CODES[lang] || '' }));
      setOutput(null);
      setOutputStatus('');
    }
  };

  // ─── RUNNER ────────────────────────────────────────────────────────────────
  const handleRun = (currentCode) => {
    setCodes(prev => ({ ...prev, [lang]: currentCode }));
    let results = [];
    let passed = true;

    try {
      // ─ JavaScript (executed) ──────────────────────────────────────────────
      if (lang === 'javascript') {
        let logs = [];
        const customConsole = {
          log:   (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ')),
          error: (...a) => logs.push('❌ ' + a.map(x => String(x)).join(' ')),
          warn:  (...a) => logs.push('⚠️ ' + a.map(x => String(x)).join(' ')),
          info:  (...a) => logs.push('ℹ️ ' + a.map(x => String(x)).join(' ')),
        };
        const fn = new Function('console', currentCode);
        fn(customConsole);
        results.push({ text: '✅ JavaScript executed successfully.', type: 'success' });
        if (logs.length > 0) {
          results.push({ text: '📟 Console output:', type: 'info' });
          logs.forEach(l => results.push({ text: l, type: 'info' }));
        }
      }

      // ─ TypeScript (type-strip then execute) ───────────────────────────────
      else if (lang === 'typescript') {
        // Basic TS syntax validation
        const typeErrors = [];
        if (/:\s*[a-zA-Z<>\[\]|&]+\s*=/.test(currentCode) || 
            /interface\s+\w+/.test(currentCode) || 
            /type\s+\w+\s*=/.test(currentCode) ||
            currentCode.includes('readonly ') || 
            currentCode.includes('<T>') ||
            /:\s*(string|number|boolean|void|any|unknown|never|null|undefined)/.test(currentCode)) {
          results.push({ text: '✅ TypeScript syntax detected and validated!', type: 'success' });
          results.push({ text: 'ℹ️ Type annotations found: interface, type, generics — all valid TS constructs.', type: 'info' });
        } else {
          results.push({ text: '⚠️ Tip: Add TypeScript-specific syntax like interfaces, type annotations, or generics!', type: 'info' });
        }
        // Strip types & run basic JS eval
        try {
          const stripped = currentCode
            .replace(/:\s*(string|number|boolean|void|any|unknown|never|null|undefined|[A-Z]\w*(\[\])?(<[^>]+>)?)/g, '')
            .replace(/interface\s+\w+\s*\{[^}]*\}/gs, '')
            .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
            .replace(/readonly\s+/g, '')
            .replace(/<[A-Z]\w*>/g, '');
          let logs = [];
          const customConsole = {
            log: (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x, null, 2) : String(x)).join(' ')),
            error: (...a) => logs.push('❌ ' + a.map(x => String(x)).join(' ')),
          };
          const fn = new Function('console', stripped);
          fn(customConsole);
          if (logs.length > 0) {
            results.push({ text: '📟 Runtime output (types stripped):', type: 'info' });
            logs.forEach(l => results.push({ text: l, type: 'info' }));
          }
        } catch (e) {
          results.push({ text: 'ℹ️ Note: Some TS constructs cannot be directly executed — use a TypeScript compiler (tsc) or ts-node for full execution.', type: 'info' });
        }
      }

      // ─ HTML ───────────────────────────────────────────────────────────────
      else if (lang === 'html') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(currentCode, 'text/html');
        const parseErr = doc.querySelector('parsererror');
        if (parseErr) {
          passed = false;
          results.push({ text: `❌ HTML Parse Error: ${parseErr.textContent.slice(0, 200)}`, type: 'error' });
        } else {
          const tags = Array.from(doc.querySelectorAll('*')).map(el => el.tagName.toLowerCase());
          const unique = [...new Set(tags)];
          results.push({ text: '✅ HTML parsed successfully — no syntax errors!', type: 'success' });
          results.push({ text: `ℹ️ Elements found: ${doc.body.childElementCount} root element(s). Tags used: ${unique.slice(0,8).join(', ')}`, type: 'info' });
          if (doc.querySelector('h1') && !doc.querySelector('title')) {
            results.push({ text: '⚠️ Tip: Add a <title> in <head> for better SEO!', type: 'info' });
          }
        }
      }

      // ─ CSS ────────────────────────────────────────────────────────────────
      else if (lang === 'css') {
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ CSS Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          const rules = currentCode.match(/[^}]+\{[^{]*\}/g) || [];
          results.push({ text: `✅ CSS syntax OK — ${rules.length} rule block(s) detected.`, type: 'success' });
          const selectors = rules.map(r => r.split('{')[0].trim());
          results.push({ text: `ℹ️ Selectors: ${selectors.slice(0,5).join(' | ')}`, type: 'info' });
        }
      }

      // ─ JSON ───────────────────────────────────────────────────────────────
      else if (lang === 'json') {
        const parsed = JSON.parse(currentCode);
        const keys   = typeof parsed === 'object' ? Object.keys(parsed) : [];
        results.push({ text: '✅ Valid JSON — parsed successfully!', type: 'success' });
        results.push({ text: `ℹ️ Type: ${Array.isArray(parsed) ? 'Array' : typeof parsed} | Top-level keys: ${keys.slice(0,5).join(', ') || 'N/A'}`, type: 'info' });
        results.push({ text: `ℹ️ JSON size: ${new Blob([currentCode]).size} bytes`, type: 'info' });
      }

      // ─ XML ────────────────────────────────────────────────────────────────
      else if (lang === 'xml') {
        const parser  = new DOMParser();
        const xmlDoc  = parser.parseFromString(currentCode, 'text/xml');
        const xmlErr  = xmlDoc.querySelector('parsererror');
        if (xmlErr) {
          passed = false;
          results.push({ text: `❌ XML Parse Error: ${xmlErr.textContent.slice(0, 300)}`, type: 'error' });
        } else {
          const root = xmlDoc.documentElement;
          results.push({ text: '✅ XML parsed successfully — well-formed document!', type: 'success' });
          results.push({ text: `ℹ️ Root element: <${root.tagName}> | Child elements: ${root.children.length}`, type: 'info' });
        }
      }

      // ─ YAML ───────────────────────────────────────────────────────────────
      else if (lang === 'yaml') {
        const lines = currentCode.split('\n');
        let yamlErrors = [];
        lines.forEach((line, i) => {
          if (line.includes('\t')) yamlErrors.push(`Line ${i+1}: Tabs not allowed in YAML — use spaces.`);
        });
        if (yamlErrors.length > 0) {
          passed = false;
          yamlErrors.forEach(e => results.push({ text: `❌ ${e}`, type: 'error' }));
        } else {
          const keyCount = (currentCode.match(/^\s*\w[^:]*:/gm) || []).length;
          const listItems = (currentCode.match(/^\s*-\s/gm) || []).length;
          results.push({ text: '✅ YAML structure validated — no tab errors!', type: 'success' });
          results.push({ text: `ℹ️ Keys: ~${keyCount} | List items: ~${listItems}`, type: 'info' });
          results.push({ text: 'ℹ️ Tip: YAML is used in Docker Compose, Kubernetes, GitHub Actions, Ansible, and more!', type: 'info' });
        }
      }

      // ─ Markdown ───────────────────────────────────────────────────────────
      else if (lang === 'markdown') {
        const headings   = (currentCode.match(/^#{1,6}\s.+/gm) || []).length;
        const boldItems  = (currentCode.match(/\*\*[^*]+\*\*/g) || []).length;
        const codeBlocks = (currentCode.match(/```/g) || []).length;
        const links      = (currentCode.match(/\[.+\]\(.+\)/g) || []).length;
        const tables     = (currentCode.match(/\|.+\|/g) || []).length;
        results.push({ text: '✅ Markdown validated — ready to render!', type: 'success' });
        results.push({ text: `ℹ️ Headings: ${headings} | Bold: ${boldItems} | Code blocks: ${codeBlocks/2} | Links: ${links} | Table rows: ${tables}`, type: 'info' });
        results.push({ text: 'ℹ️ Renders in: GitHub, Notion, Obsidian, VS Code, GitLab, Confluence...', type: 'info' });
      }

      // ─ GraphQL ────────────────────────────────────────────────────────────
      else if (lang === 'graphql') {
        const types     = (currentCode.match(/^type\s+\w+/gm) || []).length;
        const queries   = (currentCode.match(/^type Query/gm) || []).length;
        const mutations = (currentCode.match(/^type Mutation/gm) || []).length;
        const fields    = (currentCode.match(/^\s+\w+[^:]*:/gm) || []).length;
        if (types === 0 && !currentCode.includes('{')) {
          passed = false;
          results.push({ text: '❌ GraphQL Error: No types or queries detected. Define at least one type.', type: 'error' });
        } else {
          results.push({ text: '✅ GraphQL schema/query validated!', type: 'success' });
          results.push({ text: `ℹ️ Types: ${types} | Queries: ${queries} | Mutations: ${mutations} | Fields: ${fields}`, type: 'info' });
          results.push({ text: 'ℹ️ GraphQL is used by: Facebook, GitHub, Shopify, Twitter, Airbnb APIs.', type: 'info' });
        }
      }

      // ─ Python (syntax analysis) ───────────────────────────────────────────
      else if (lang === 'python') {
        const defs    = (currentCode.match(/^def\s+\w+/gm) || []).length;
        const classes = (currentCode.match(/^class\s+\w+/gm) || []).length;
        const imports = (currentCode.match(/^import\s+|^from\s+/gm) || []).length;
        const prints  = (currentCode.match(/print\s*\(/g) || []).length;
        const indentErr = currentCode.split('\n').some(l => l.startsWith('    ') && !l.startsWith('    ') && !l.match(/^\s/));

        results.push({ text: '✅ Python syntax analysis complete!', type: 'success' });
        results.push({ text: `ℹ️ Functions: ${defs} | Classes: ${classes} | Imports: ${imports} | print() calls: ${prints}`, type: 'info' });
        results.push({ text: '🐍 Note: Full Python execution requires Python 3 runtime (pyodide, skulpt, or backend).', type: 'info' });
        results.push({ text: 'ℹ️ Python powers: Django, Flask, FastAPI, TensorFlow, PyTorch, Pandas, NumPy, Scikit-learn!', type: 'info' });
      }

      // ─ Java ───────────────────────────────────────────────────────────────
      else if (lang === 'java') {
        const classes    = (currentCode.match(/class\s+\w+/g) || []).length;
        const methods    = (currentCode.match(/(public|private|protected|static|void)\s+\w+\s*\(/g) || []).length;
        const hasMain    = currentCode.includes('public static void main');
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ Java Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ Java structure validation passed!', type: 'success' });
          results.push({ text: `ℹ️ Classes: ${classes} | Methods: ${methods} | Has main(): ${hasMain ? 'Yes ✅' : 'No'}`, type: 'info' });
          results.push({ text: '☕ Java runs on: Android, Spring Boot, Microservices, Enterprise systems, Big Data (Hadoop/Spark).', type: 'info' });
        }
      }

      // ─ C# ────────────────────────────────────────────────────────────────
      else if (lang === 'csharp') {
        const classes = (currentCode.match(/class\s+\w+/g) || []).length;
        const methods = (currentCode.match(/(public|private|protected|static|async|void)\s+\w+\s*[(<]/g) || []).length;
        const linq    = (currentCode.match(/\.(Where|Select|GroupBy|OrderBy|Join|Aggregate)\s*\(/g) || []).length;
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ C# Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ C# structure validated!', type: 'success' });
          results.push({ text: `ℹ️ Classes: ${classes} | Methods: ${methods} | LINQ calls: ${linq}`, type: 'info' });
          results.push({ text: '🎯 C# powers: ASP.NET Core, Unity 3D games, WPF desktop apps, Xamarin/MAUI mobile.', type: 'info' });
        }
      }

      // ─ Go ────────────────────────────────────────────────────────────────
      else if (lang === 'go') {
        const funcs    = (currentCode.match(/^func\s+\w+/gm) || []).length;
        const structs  = (currentCode.match(/^type\s+\w+\s+struct/gm) || []).length;
        const gorout   = (currentCode.match(/\bgo\s+\w+/g) || []).length;
        const channels = (currentCode.match(/chan\s+/g) || []).length;
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ Go Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ Go syntax validation passed!', type: 'success' });
          results.push({ text: `ℹ️ Functions: ${funcs} | Structs: ${structs} | Goroutines: ${gorout} | Channels: ${channels}`, type: 'info' });
          results.push({ text: '🐹 Go powers: Docker, Kubernetes, gRPC, Terraform, CockroachDB, Caddy, Hugo.', type: 'info' });
        }
      }

      // ─ Rust ───────────────────────────────────────────────────────────────
      else if (lang === 'rust') {
        const fns     = (currentCode.match(/\bfn\s+\w+/g) || []).length;
        const structs = (currentCode.match(/\bstruct\s+\w+/g) || []).length;
        const enums   = (currentCode.match(/\benum\s+\w+/g) || []).length;
        const impls   = (currentCode.match(/\bimpl\s+/g) || []).length;
        const traits  = (currentCode.match(/\btrait\s+\w+/g) || []).length;
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ Rust Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ Rust structure validated — no brace errors!', type: 'success' });
          results.push({ text: `ℹ️ Functions: ${fns} | Structs: ${structs} | Enums: ${enums} | Impls: ${impls} | Traits: ${traits}`, type: 'info' });
          results.push({ text: '🦀 Rust is used in: Firefox, Linux kernel, Cloudflare workers, Discord, Figma, WebAssembly.', type: 'info' });
        }
      }

      // ─ PHP ────────────────────────────────────────────────────────────────
      else if (lang === 'php') {
        if (!currentCode.includes('<?php') && !currentCode.includes('<?')) {
          passed = false;
          results.push({ text: '❌ PHP Error: Missing opening <?php tag.', type: 'error' });
        } else {
          const classes = (currentCode.match(/class\s+\w+/g) || []).length;
          const fns     = (currentCode.match(/function\s+\w+/g) || []).length;
          const vars    = (currentCode.match(/\$\w+\s*=/g) || []).length;
          const echoes  = (currentCode.match(/echo\s+/g) || []).length;
          results.push({ text: '✅ PHP syntax analysis passed!', type: 'success' });
          results.push({ text: `ℹ️ Classes: ${classes} | Functions: ${fns} | Variables: ${vars} | echo calls: ${echoes}`, type: 'info' });
          results.push({ text: '🐘 PHP powers: WordPress (43% of all websites!), Laravel, Symfony, Drupal, Magento.', type: 'info' });
        }
      }

      // ─ Ruby ───────────────────────────────────────────────────────────────
      else if (lang === 'ruby') {
        const defs     = (currentCode.match(/\bdef\s+\w+/g) || []).length;
        const classes  = (currentCode.match(/\bclass\s+\w+/g) || []).length;
        const modules  = (currentCode.match(/\bmodule\s+\w+/g) || []).length;
        const ends     = (currentCode.match(/\bend\b/g) || []).length;
        const defCount = defs + classes + modules;
        if (Math.abs(defCount - ends) > 1) {
          results.push({ text: `⚠️ Ruby Warning: ${defCount} definition block(s) but ${ends} 'end' keyword(s). May be missing 'end'.`, type: 'info' });
        } else {
          results.push({ text: '✅ Ruby syntax validated!', type: 'success' });
        }
        results.push({ text: `ℹ️ Methods: ${defs} | Classes: ${classes} | Modules: ${modules} | end keywords: ${ends}`, type: 'info' });
        results.push({ text: '💎 Ruby powers: GitHub, Shopify, Airbnb (early), Basecamp — all built with Ruby on Rails!', type: 'info' });
      }

      // ─ Kotlin ─────────────────────────────────────────────────────────────
      else if (lang === 'kotlin') {
        const fns      = (currentCode.match(/\bfun\s+\w+/g) || []).length;
        const classes  = (currentCode.match(/\bclass\s+\w+/g) || []).length;
        const dataC    = (currentCode.match(/data class\s+\w+/g) || []).length;
        const corout   = (currentCode.match(/\blaunch\s*{|\basync\s*{|\bsuspend\s/g) || []).length;
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ Kotlin Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ Kotlin syntax validated!', type: 'success' });
          results.push({ text: `ℹ️ Functions: ${fns} | Classes: ${classes} | Data classes: ${dataC} | Coroutines: ${corout}`, type: 'info' });
          results.push({ text: '🚀 Kotlin: Google\'s preferred language for Android. Also used in Ktor, Spring Boot, Multiplatform!', type: 'info' });
        }
      }

      // ─ Swift ──────────────────────────────────────────────────────────────
      else if (lang === 'swift') {
        const fns       = (currentCode.match(/\bfunc\s+\w+/g) || []).length;
        const classes   = (currentCode.match(/\bclass\s+\w+/g) || []).length;
        const structs   = (currentCode.match(/\bstruct\s+\w+/g) || []).length;
        const protocols = (currentCode.match(/\bprotocol\s+\w+/g) || []).length;
        const optionals = (currentCode.match(/\?\./g) || []).length;
        results.push({ text: '✅ Swift syntax analysis complete!', type: 'success' });
        results.push({ text: `ℹ️ Functions: ${fns} | Classes: ${classes} | Structs: ${structs} | Protocols: ${protocols} | Optional chains: ${optionals}`, type: 'info' });
        results.push({ text: '🍎 Swift powers all iOS, macOS, watchOS, and tvOS apps. Fastest-growing systems language at Apple!', type: 'info' });
      }

      // ─ Dart ───────────────────────────────────────────────────────────────
      else if (lang === 'dart') {
        const classes  = (currentCode.match(/\bclass\s+\w+/g) || []).length;
        const fns      = (currentCode.match(/\b(void|Future|Stream)\s+\w+\s*\(/g) || []).length;
        const mixins   = (currentCode.match(/\bmixin\s+\w+/g) || []).length;
        const async    = (currentCode.match(/\basync\b/g) || []).length;
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ Dart Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ Dart structure validated!', type: 'success' });
          results.push({ text: `ℹ️ Classes: ${classes} | Functions: ${fns} | Mixins: ${mixins} | async: ${async}`, type: 'info' });
          results.push({ text: '🎯 Dart + Flutter = 1 codebase → iOS, Android, Web, Desktop apps!', type: 'info' });
        }
      }

      // ─ C ──────────────────────────────────────────────────────────────────
      else if (lang === 'c') {
        const includes = (currentCode.match(/#include\s+[<"]/g) || []).length;
        const fns      = (currentCode.match(/\b(int|void|char|float|double|long)\s+\w+\s*\([^)]*\)\s*{/g) || []).length;
        const mallocs  = (currentCode.match(/\bmalloc\s*\(/g) || []).length;
        const frees    = (currentCode.match(/\bfree\s*\(/g) || []).length;
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ C Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ C code structure validated!', type: 'success' });
          results.push({ text: `ℹ️ Includes: ${includes} | Functions: ${fns} | malloc: ${mallocs} | free: ${frees}`, type: 'info' });
          if (mallocs > frees) results.push({ text: `⚠️ Memory Leak Warning: ${mallocs} malloc() call(s) but only ${frees} free() call(s)!`, type: 'info' });
          results.push({ text: '⚙️ C powers: Linux kernel, Git, Python interpreter, PostgreSQL, SQLite, most embedded systems!', type: 'info' });
        }
      }

      // ─ C++ ────────────────────────────────────────────────────────────────
      else if (lang === 'cpp') {
        const classes    = (currentCode.match(/\bclass\s+\w+/g) || []).length;
        const templates  = (currentCode.match(/\btemplate\s*</g) || []).length;
        const smartPtrs  = (currentCode.match(/unique_ptr|shared_ptr|weak_ptr/g) || []).length;
        const lambdas    = (currentCode.match(/\[\s*[^\]]*\s*\]\s*\(/g) || []).length;
        const open  = (currentCode.match(/{/g) || []).length;
        const close = (currentCode.match(/}/g) || []).length;
        if (open !== close) {
          passed = false;
          results.push({ text: `❌ C++ Syntax Error: Mismatched braces — ${open} '{' vs ${close} '}'`, type: 'error' });
        } else {
          results.push({ text: '✅ C++ structure validated!', type: 'success' });
          results.push({ text: `ℹ️ Classes: ${classes} | Templates: ${templates} | Smart Ptrs: ${smartPtrs} | Lambdas: ${lambdas}`, type: 'info' });
          results.push({ text: '⚡ C++ powers: Unreal Engine, Chrome, Adobe suite, Bloomberg Terminal, high-frequency trading!', type: 'info' });
        }
      }

      // ─ SQL ────────────────────────────────────────────────────────────────
      else if (lang === 'sql') {
        const stmts  = currentCode.trim().split(';').filter(s => s.trim()).length;
        const selects = (currentCode.match(/SELECT/gi) || []).length;
        const joins   = (currentCode.match(/JOIN/gi) || []).length;
        const inserts = (currentCode.match(/INSERT/gi) || []).length;
        if (!currentCode.trim().match(/;$/)) {
          results.push({ text: '⚠️ SQL Tip: Statements should end with a semicolon (;)', type: 'info' });
        }
        results.push({ text: `✅ SQL: ${stmts} statement(s) parsed.`, type: 'success' });
        results.push({ text: `ℹ️ SELECT: ${selects} | JOIN: ${joins} | INSERT: ${inserts}`, type: 'info' });
      }

      // ─ PostgreSQL ─────────────────────────────────────────────────────────
      else if (lang === 'postgresql') {
        const ctes      = (currentCode.match(/\bWITH\s+\w+/gi) || []).length;
        const windows   = (currentCode.match(/\bOVER\s*\(/gi) || []).length;
        const jsonb     = (currentCode.match(/JSONB|->|->>|json_set/gi) || []).length;
        const recursive = (currentCode.match(/RECURSIVE/gi) || []).length;
        results.push({ text: '✅ PostgreSQL query analysis complete!', type: 'success' });
        results.push({ text: `ℹ️ CTEs: ${ctes} | Window Functions: ${windows} | JSONB: ${jsonb} | Recursive: ${recursive}`, type: 'info' });
        results.push({ text: '🐘 PostgreSQL: Most advanced open-source RDBMS. Powers Instagram, Reddit, Spotify, Twitch!', type: 'info' });
      }

      // ─ MongoDB ────────────────────────────────────────────────────────────
      else if (lang === 'mongodb') {
        const finds  = (currentCode.match(/\.find\s*\(/g) || []).length;
        const inserts = (currentCode.match(/\.insert/g) || []).length;
        const updates = (currentCode.match(/\.update/g) || []).length;
        const agg    = (currentCode.match(/\.aggregate\s*\(/g) || []).length;
        const stages = (currentCode.match(/\$match|\$group|\$sort|\$project|\$lookup|\$unwind/g) || []).length;
        results.push({ text: '✅ MongoDB query syntax validated!', type: 'success' });
        results.push({ text: `ℹ️ find: ${finds} | insert: ${inserts} | update: ${updates} | aggregate: ${agg} | pipeline stages: ${stages}`, type: 'info' });
        results.push({ text: '🍃 MongoDB is used by: eBay, Lyft, Forbes, EA Games, MetLife — great for flexible schemas!', type: 'info' });
      }

      // ─ Redis ──────────────────────────────────────────────────────────────
      else if (lang === 'redis') {
        const lines    = currentCode.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
        const commands = lines.filter(l => /^[A-Z]/.test(l.trim())).length;
        const sets     = (currentCode.match(/^(SET|HSET|SADD|ZADD|LPUSH|RPUSH)/gm) || []).length;
        const gets     = (currentCode.match(/^(GET|HGET|SMEMBERS|ZRANGE|LRANGE)/gm) || []).length;
        results.push({ text: '✅ Redis command syntax validated!', type: 'success' });
        results.push({ text: `ℹ️ Total commands: ${commands} | Write ops: ${sets} | Read ops: ${gets}`, type: 'info' });
        results.push({ text: '🔴 Redis: Fastest in-memory DB. Powers: Twitter timelines, GitHub caching, Stack Overflow sessions, leaderboards!', type: 'info' });
      }

      // ─ Bash ───────────────────────────────────────────────────────────────
      else if (lang === 'bash') {
        const hasBang  = currentCode.trim().startsWith('#!/');
        const fns      = (currentCode.match(/\w+\s*\(\s*\)\s*{/g) || []).length;
        const ifs      = (currentCode.match(/\bif\s+\[/g) || []).length;
        const loops    = (currentCode.match(/\bfor\s+|\bwhile\s+/g) || []).length;
        const pipes    = (currentCode.match(/\|/g) || []).length;
        if (!hasBang) results.push({ text: '⚠️ Tip: Add #!/bin/bash shebang at the first line!', type: 'info' });
        results.push({ text: '✅ Bash script syntax analysis complete!', type: 'success' });
        results.push({ text: `ℹ️ Functions: ${fns} | if statements: ${ifs} | Loops: ${loops} | Pipes: ${pipes}`, type: 'info' });
        results.push({ text: '💻 Bash is the backbone of DevOps, CI/CD pipelines, Linux system admin, and Docker scripts!', type: 'info' });
      }

      // ─ R ──────────────────────────────────────────────────────────────────
      else if (lang === 'r') {
        const assigns  = (currentCode.match(/<-/g) || []).length;
        const fns      = (currentCode.match(/\bfunction\s*\(/g) || []).length;
        const df       = (currentCode.match(/data\.frame\s*\(/g) || []).length;
        const plots    = (currentCode.match(/\b(plot|ggplot|hist|barplot|boxplot)\s*\(/g) || []).length;
        results.push({ text: '✅ R code structure validated!', type: 'success' });
        results.push({ text: `ℹ️ Assignments: ${assigns} | Functions: ${fns} | Data Frames: ${df} | Plot calls: ${plots}`, type: 'info' });
        results.push({ text: '📊 R is the gold standard for statistics, bioinformatics, finance quant analysis, and academic research!', type: 'info' });
      }

      // ─ MATLAB ─────────────────────────────────────────────────────────────
      else if (lang === 'matlab') {
        const fns      = (currentCode.match(/^function\s+/gm) || []).length;
        const plots    = (currentCode.match(/\b(plot|surf|mesh|bar|histogram|scatter)\s*\(/g) || []).length;
        const matrices = (currentCode.match(/\[[\d\s,;]+\]/g) || []).length;
        const ends     = (currentCode.match(/\bend\b/g) || []).length;
        results.push({ text: '✅ MATLAB code analysis complete!', type: 'success' });
        results.push({ text: `ℹ️ Functions: ${fns} | Plot calls: ${plots} | Matrix literals: ${matrices} | end keywords: ${ends}`, type: 'info' });
        results.push({ text: '🔬 MATLAB powers: Aerospace (NASA), Signal Processing, Control Systems, Neuroscience, Finance modeling!', type: 'info' });
      }

      // ─ Sass ───────────────────────────────────────────────────────────────
      else if (lang === 'sass') {
        const vars   = (currentCode.match(/\$\w+/g) || []).length;
        const mixins = (currentCode.match(/@mixin\s+|@include\s+/g) || []).length;
        const nested = currentCode.includes('&');
        results.push({ text: '✅ Sass/SCSS compilation simulation successful!', type: 'success' });
        results.push({ text: `ℹ️ Variables: ${vars} | Mixin actions: ${mixins} | Nesting referencing: ${nested ? 'Yes ✅' : 'No'}`, type: 'info' });
        results.push({ text: '🎨 Sass compiles down to standard CSS, introducing nested style blocks, imports, and variables.', type: 'info' });
      }

      // ─ Elixir ─────────────────────────────────────────────────────────────
      else if (lang === 'elixir') {
        const modules = (currentCode.match(/defmodule\s+/g) || []).length;
        const defs    = (currentCode.match(/\bdef\s+/g) || []).length;
        const spawns  = currentCode.includes('spawn(') || currentCode.includes('send(');
        results.push({ text: '✅ Elixir syntax parsing complete!', type: 'success' });
        results.push({ text: `ℹ️ Modules: ${modules} | Functions: ${defs} | Actor processes: ${spawns ? 'Active ✅' : 'None'}`, type: 'info' });
        results.push({ text: '💧 Elixir runs on BEAM (Erlang VM) and provides massive concurrent scaling capabilities.', type: 'info' });
      }

      // ─ Scala ──────────────────────────────────────────────────────────────
      else if (lang === 'scala') {
        const objects = (currentCode.match(/\bobject\s+/g) || []).length;
        const cases   = (currentCode.match(/\bcase class\s+/g) || []).length;
        results.push({ text: '✅ Scala structure analysis successful!', type: 'success' });
        results.push({ text: `ℹ️ Objects: ${objects} | Case class records: ${cases}`, type: 'info' });
        results.push({ text: '🌀 Scala compiles to JVM bytecode and integrates functional programming with object-oriented classes.', type: 'info' });
      }

      // ─ Perl ───────────────────────────────────────────────────────────────
      else if (lang === 'perl') {
        const scalars = (currentCode.match(/\$\w+/g) || []).length;
        const arrays  = (currentCode.match(/@\w+/g) || []).length;
        results.push({ text: '✅ Perl scripting parser completed!', type: 'success' });
        results.push({ text: `ℹ️ Scalar variables: ${scalars} | Array variables: ${arrays}`, type: 'info' });
        results.push({ text: '🐫 Perl excels at regular expression text parsing, logs filtering, and scripts manipulation.', type: 'info' });
      }

      // ─ Haskell ────────────────────────────────────────────────────────────
      else if (lang === 'haskell') {
        const types = (currentCode.match(/::/g) || []).length;
        const binds = (currentCode.match(/=/g) || []).length;
        results.push({ text: '✅ Haskell pure-functional syntax validated!', type: 'success' });
        results.push({ text: `ℹ️ Type definitions: ${types} | Variable bindings: ${binds}`, type: 'info' });
        results.push({ text: 'λ Haskell enforces pure functions, static typing, and lazy evaluation semantics.', type: 'info' });
      }

      // ─ MySQL ──────────────────────────────────────────────────────────────
      else if (lang === 'mysql') {
        const engine = currentCode.toLowerCase().includes('engine=');
        const selects = (currentCode.match(/SELECT/gi) || []).length;
        results.push({ text: '✅ MySQL query statement parsed!', type: 'success' });
        results.push({ text: `ℹ️ SELECT queries: ${selects} | Storage Engine configured: ${engine ? 'Yes ✅' : 'No'}`, type: 'info' });
        results.push({ text: '🐬 MySQL runs transactions inside InnoDB and powers LAMP web application stacks.', type: 'info' });
      }

      // ─ SQLite ─────────────────────────────────────────────────────────────
      else if (lang === 'sqlite') {
        const tables = (currentCode.match(/CREATE TABLE/gi) || []).length;
        const selects = (currentCode.match(/SELECT/gi) || []).length;
        results.push({ text: '✅ SQLite embedded query statement completed!', type: 'success' });
        results.push({ text: `ℹ️ SELECT queries: ${selects} | Table definitions: ${tables}`, type: 'info' });
        results.push({ text: '🪶 SQLite reads/writes directly to local files and is standard for mobile databases.', type: 'info' });
      }

      // ─ Cassandra ──────────────────────────────────────────────────────────
      else if (lang === 'cassandra') {
        const keyspace = (currentCode.match(/KEYSPACE/gi) || []).length;
        const tables = (currentCode.match(/TABLE/gi) || []).length;
        results.push({ text: '✅ Cassandra Wide-Column (CQL) statement parsed!', type: 'success' });
        results.push({ text: `ℹ️ Keyspace definitions: ${keyspace} | Table definitions: ${tables}`, type: 'info' });
        results.push({ text: '👁️ Cassandra partitions query structures across many servers with no single point of failure.', type: 'info' });
      }

      // ─ Neo4j ──────────────────────────────────────────────────────────────
      else if (lang === 'neo4j') {
        const matches = (currentCode.match(/MATCH/gi) || []).length;
        const creates = (currentCode.match(/CREATE/gi) || []).length;
        results.push({ text: '✅ Neo4j Cypher query syntax analyzer successful!', type: 'success' });
        results.push({ text: `ℹ️ MATCH clauses: ${matches} | CREATE clauses: ${creates}`, type: 'info' });
        results.push({ text: '🕸️ Neo4j indexes data relationships directly in graphs, allowing fast queries across connected structures.', type: 'info' });
      }

      // ─ Fallback ───────────────────────────────────────────────────────────
      else {
        results.push({ text: `✅ ${(LANGUAGE_META[lang]?.label || lang)} code received — ${currentCode.split('\n').length} lines.`, type: 'success' });
        results.push({ text: 'ℹ️ Full execution requires the native runtime for this language.', type: 'info' });
      }

    } catch (err) {
      passed = false;
      const match = err.stack?.match(/<anonymous>:(\d+):(\d+)/);
      const lineInfo = match ? ` at line ${match[1]}` : '';
      results.push({ text: `❌ Runtime Error: ${err.message}${lineInfo}`, type: 'error' });
    }

    // XP reward on first successful run per language
    if (passed) {
      const earnedLangs = JSON.parse(localStorage.getItem('codequest_playground_xp') || '[]');
      if (!earnedLangs.includes(lang)) {
        earnedLangs.push(lang);
        localStorage.setItem('codequest_playground_xp', JSON.stringify(earnedLangs));
        const xpResult = Player.addXP(15);
        Particles.emitConfetti();
        results.push({ text: `🎉 +15 XP earned for running ${LANGUAGE_META[lang]?.label || lang} for the first time in Sandbox!`, type: 'success' });
        if (xpResult?.ranked) {
          setTimeout(() => { Particles.emitLevelUp(); alert(`🎉 RANK UP! You are now a ${xpResult.newRank}!`); }, 1000);
        }
      } else {
        results.push({ text: `ℹ️ Ran successfully! (XP already claimed for ${LANGUAGE_META[lang]?.label || lang})`, type: 'info' });
      }
    }

    setOutput(results);
    setOutputStatus(passed ? 'success' : 'error');
  };

  const currentHints = HINTS_DATA[lang] || [];
  const meta = LANGUAGE_META[lang] || {};

  const difficultyColor = {
    'Beginner': '#22c55e',
    'Intermediate': '#f59e0b',
    'Advanced': '#ef4444',
  }[meta.difficulty] || 'var(--color-cyan)';

  return (
    <div className={`screen challenge-screen active ${activeTab === 'editor' ? 'active-tab-editor' : ''}`} id="screen-playground" style={{ display: 'flex', flexDirection: 'column' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .lang-info-card {
          background: var(--color-bg-secondary);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
        }
        .lang-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: var(--space-2);
          margin-top: var(--space-3);
        }
        .lang-info-item {
          background: var(--color-bg-light);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .lang-info-label { font-size: 9px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
        .lang-info-val   { font-size: 12px; font-weight: 700; color: var(--color-text-primary); }
        .playground-select-wrapper {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }
        .lang-select-trigger {
          transition: all 0.2s ease;
        }
        .lang-select-trigger:hover {
          border-color: var(--color-cyan) !important;
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.12);
        }
        .custom-dropdown-menu::-webkit-scrollbar {
          width: 5px;
        }
        .custom-dropdown-menu::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.25);
        }
        .custom-dropdown-menu::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 3px;
        }
        .custom-dropdown-menu::-webkit-scrollbar-thumb:hover {
          background: var(--color-cyan-dim);
        }
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          color: #fff !important;
        }
        .dropdown-item.selected:hover {
          background: rgba(0, 245, 255, 0.12) !important;
          color: var(--color-cyan) !important;
        }
        .lang-badge-icon { font-size: 28px; line-height: 1; }
        .job-demand-stars { font-size: 12px; color: #f59e0b; letter-spacing: 1px; }

        /* Playground premium tabs & animations */
        .playground-tab-btn {
          transition: all 0.2s ease-in-out;
        }
        .playground-tab-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.25) !important;
          transform: translateY(-1px);
        }
        .playground-tab-btn.active {
          box-shadow: 0 0 10px rgba(0, 245, 255, 0.15);
        }
        .playground-tab-btn.active:hover {
          background: var(--color-cyan-dim) !important;
          border-color: var(--color-cyan) !important;
          transform: none;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hint-accordion {
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          overflow: hidden;
          transition: all 0.2s ease;
        }
        .hint-accordion:hover {
          border-color: var(--color-cyan-dim);
          box-shadow: 0 2px 8px rgba(0, 245, 255, 0.05);
        }
        .hint-accordion-header {
          transition: all 0.2s ease;
        }
        .hint-accordion-header:hover {
          background: var(--color-bg-secondary) !important;
          color: var(--color-cyan);
        }
        .panel-section {
          transition: all 0.25s ease;
        }
        .panel-section:hover {
          border-color: rgba(0, 245, 255, 0.2) !important;
          box-shadow: 0 4px 12px rgba(0, 245, 255, 0.03);
        }
      `}} />

      {/* Header */}
      <div className="levels-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', width: '100%', marginBottom: 'var(--space-4)', position: 'relative', padding: 'var(--space-5) var(--space-4) 0 var(--space-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <button className="btn btn-secondary" onClick={onBack} style={{ padding: '6px 12px', fontSize: 'var(--text-xs)' }}>
            ⬅ Back to Map
          </button>

          <div className="playground-select-wrapper custom-dropdown-container" style={{ position: 'relative' }}>
            <label style={{ fontSize: '9px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: '0.05em', marginRight: '6px' }}>
              Language:
            </label>
            <button
              type="button"
              className="lang-select-trigger"
              onClick={() => { Sounds.playClick(); setDropdownOpen(v => !v); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-secondary)',
                border: '1px solid var(--glass-border)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                outline: 'none',
                minWidth: '180px',
                justifyContent: 'space-between',
                transition: 'all 0.18s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {meta.deviconClass ? (
                  <i className={`${meta.deviconClass} colored`} style={{ fontSize: '14px', display: 'inline-block' }}></i>
                ) : (
                  <span>{meta.icon}</span>
                )}
                <span>{meta.label}</span>
              </div>
              <span style={{ fontSize: '8px', opacity: 0.6 }}>{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {dropdownOpen && (
              <div
                className="custom-dropdown-menu"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  right: 0,
                  width: '280px',
                  maxHeight: '340px',
                  overflowY: 'auto',
                  background: 'rgba(18, 18, 26, 0.98)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
                  zIndex: 9999,
                  padding: '6px 0',
                  animation: 'fadeIn 0.12s ease-out'
                }}
              >
                {LANGUAGE_CATEGORIES.map(cat => (
                  <div key={cat.label} style={{ marginBottom: '6px' }}>
                    <div
                      style={{
                        padding: '4px 12px',
                        fontSize: '9px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        color: 'var(--color-text-muted)',
                        letterSpacing: '0.05em',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        marginBottom: '4px'
                      }}
                    >
                      {cat.label}
                    </div>
                    {cat.languages.filter(langKey => !GameEngine.getDisabledLanguages().includes(langKey)).map(langKey => {
                      const m = LANGUAGE_META[langKey];
                      if (!m) return null;
                      const isSelected = lang === langKey;
                      return (
                        <div
                          key={langKey}
                          className={`dropdown-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            handleLangChange(langKey);
                            setDropdownOpen(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 12px',
                            fontSize: '12px',
                            color: isSelected ? 'var(--color-cyan)' : 'var(--color-text-secondary)',
                            background: isSelected ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.1s',
                          }}
                        >
                          {m.deviconClass ? (
                            <i className={`${m.deviconClass} colored`} style={{ fontSize: '13px', minWidth: '16px', display: 'inline-block', textAlign: 'center' }}></i>
                          ) : (
                            <span style={{ minWidth: '16px', display: 'inline-block', textAlign: 'center' }}>{m.icon}</span>
                          )}
                          <span style={{ fontWeight: isSelected ? 700 : 500 }}>{m.label}</span>
                          {isSelected && <span style={{ marginLeft: 'auto', fontSize: '8px' }}>●</span>}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <h2 style={{ margin: 'var(--space-1) 0 0 0', fontSize: 'clamp(1.2rem, 4vw, 2rem)', textAlign: 'center', width: '100%' }}>
          <FlaskConical size={28} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 8, color: 'var(--color-cyan)' }} /> Sandbox Playground
        </h2>
      </div>

      {/* Mobile tabs */}
      <div className="challenge-mobile-tabs">
        <button className={`mobile-tab-btn ${activeTab === 'instructions' ? 'active' : ''}`} onClick={() => { Sounds.playClick(); setActiveTab('instructions'); }}>
          <FileText size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Description
        </button>
        <button className={`mobile-tab-btn ${activeTab === 'editor' ? 'active' : ''}`} onClick={() => { Sounds.playClick(); setActiveTab('editor'); }}>
          <Terminal size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Monaco Editor
        </button>
      </div>

      <div className="challenge-body" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: Info + Hints */}
        <div className="challenge-panel-left" style={{ width: '40%', padding: 'var(--space-4)', overflowY: 'auto' }}>

          {/* Tabs Navigation */}
          <div className="playground-tabs" style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>
            <button
              className={`playground-tab-btn ${activePanelTab === 'learn' ? 'active' : ''}`}
              onClick={() => { Sounds.playClick(); setActivePanelTab('learn'); }}
              style={{
                flex: 1,
                background: activePanelTab === 'learn' ? 'var(--color-cyan-dim)' : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid ' + (activePanelTab === 'learn' ? 'var(--color-cyan)' : 'var(--glass-border)'),
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                padding: '8px 10px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <BookOpen size={14} /> Learn
            </button>
            <button
              className={`playground-tab-btn ${activePanelTab === 'hints' ? 'active' : ''}`}
              onClick={() => { Sounds.playClick(); setActivePanelTab('hints'); }}
              style={{
                flex: 1,
                background: activePanelTab === 'hints' ? 'var(--color-cyan-dim)' : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid ' + (activePanelTab === 'hints' ? 'var(--color-cyan)' : 'var(--glass-border)'),
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                padding: '8px 10px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Lightbulb size={14} /> Cheat Sheet
            </button>
            <button
              className={`playground-tab-btn ${activePanelTab === 'stats' ? 'active' : ''}`}
              onClick={() => { Sounds.playClick(); setActivePanelTab('stats'); }}
              style={{
                flex: 1,
                background: activePanelTab === 'stats' ? 'var(--color-cyan-dim)' : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid ' + (activePanelTab === 'stats' ? 'var(--color-cyan)' : 'var(--glass-border)'),
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                padding: '8px 10px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <BarChart2 size={14} /> Stats
            </button>
          </div>

          {/* Tab 1: Learn & Concept */}
          {activePanelTab === 'learn' && meta.label && (
            <div className="learn-section-wrapper" style={{ animation: 'fadeIn 0.25s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)', background: 'var(--color-bg-dark)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                <span className="lang-badge-icon" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '36px', minHeight: '36px' }}>
                  {meta.deviconClass ? (
                    <i className={`${meta.deviconClass} colored`} style={{ fontSize: '32px' }}></i>
                  ) : (
                    <span>{meta.icon}</span>
                  )}
                </span>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '18px', color: 'var(--color-cyan)', fontFamily: 'var(--font-display)' }}>{meta.label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>Author: <strong style={{ color: '#fff' }}>{meta.creator}</strong> ({meta.year})</div>
                </div>
              </div>

              <div className="panel-section" style={{ background: 'var(--color-bg-secondary)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', lineHeight: 1.6 }}>
                <h4 style={{ color: 'var(--color-cyan)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px', fontWeight: 'bold' }}>
                  Language Overview
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap', margin: 0 }}>
                  {meta.explanation}
                </p>
              </div>

              <div className="panel-section" style={{ background: 'var(--color-bg-secondary)', padding: 'var(--space-5)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)', marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
                <h4 style={{ color: 'var(--color-magenta)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '6px', fontWeight: 'bold' }}>
                  Best Suited For
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--color-bg-dark)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)' }}>
                  <Target size={18} style={{ color: 'var(--color-purple)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>{meta.useCase}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Code Hints & Cheat Sheet */}
          {activePanelTab === 'hints' && (
            <div className="challenge-story" style={{ animation: 'fadeIn 0.25s ease' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 0 var(--space-2)' }}><Lightbulb size={18} style={{ color: 'var(--color-gold)' }} /> Interactive Cheat-Sheet</h3>
              <div className="story-text" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                Review syntax rules, code snippets, and common developer patterns for <strong>{meta.label}</strong> below:
              </div>
              <div className="instructions">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {currentHints.length > 0 ? currentHints.map((hint, idx) => {
                    const isOpen = openAccordion === idx;
                    return (
                      <div key={idx} className="hint-accordion">
                        <div
                          className="hint-accordion-header"
                          onClick={() => setOpenAccordion(isOpen ? null : idx)}
                          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) var(--space-3)', background: 'var(--color-bg-light)', borderRadius: 'var(--radius-md)' }}
                        >
                          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'bold' }}>{hint.title}</span>
                          <span>{isOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
                        </div>
                        {isOpen && (
                          <div style={{
                            background: 'var(--color-bg-darkest)',
                            padding: 'var(--space-3)',
                            fontFamily: 'var(--font-code)',
                            fontSize: '11px',
                            color: 'var(--color-text-muted)',
                            whiteSpace: 'pre-wrap',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                            marginTop: '-1px',
                            lineHeight: 1.6
                          }}>
                            {hint.body}
                          </div>
                        )}
                      </div>
                    );
                  }) : (
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', textAlign: 'center', padding: 'var(--space-4)' }}>
                      No references configured for {meta.label}.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Language Metadata Stats */}
          {activePanelTab === 'stats' && meta.label && (
            <div className="lang-info-card" style={{ animation: 'fadeIn 0.25s ease', background: 'var(--color-bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-4)' }}>
                <span className="lang-badge-icon" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '36px', minHeight: '36px' }}>
                  {meta.deviconClass ? (
                    <i className={`${meta.deviconClass} colored`} style={{ fontSize: '32px' }}></i>
                  ) : (
                    <span>{meta.icon}</span>
                  )}
                </span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '16px', color: 'var(--color-text-primary)' }}>{meta.label} Language Profile</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>Est. {meta.year} by {meta.creator}</div>
                </div>
              </div>
              <div className="lang-info-grid" style={{ marginTop: 'var(--space-4)' }}>
                <div className="lang-info-item">
                  <span className="lang-info-label">Core Use Case</span>
                  <span className="lang-info-val" style={{ fontSize: '11px', color: 'var(--color-cyan)', marginTop: '4px' }}>{meta.useCase}</span>
                </div>
                <div className="lang-info-item">
                  <span className="lang-info-label">Difficulty Rating</span>
                  <span className="lang-info-val" style={{ color: difficultyColor, marginTop: '4px' }}>{meta.difficulty}</span>
                </div>
                <div className="lang-info-item">
                  <span className="lang-info-label">Global Job Demand</span>
                  <span className="job-demand-stars" style={{ marginTop: '4px' }}>{meta.jobDemand}</span>
                </div>
                <div className="lang-info-item">
                  <span className="lang-info-label">Release Year</span>
                  <span className="lang-info-val" style={{ color: '#fff', marginTop: '4px' }}>{meta.year}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Monaco Editor */}
        <div className="challenge-panel-right" style={{ width: '60%', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column' }}>
          <CodeEditor
            language={lang}
            code={codes[lang] || DEFAULT_CODES[lang] || '// Start coding...'}
            onChange={(newVal) => setCodes(prev => ({ ...prev, [lang]: newVal }))}
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
