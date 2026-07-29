/* ============================================
   CodeQuest — Code Validator (TypeScript)
   ============================================ */

export interface ValidationResult {
  passed: boolean;
  results: {
    text: string;
    type: 'success' | 'error' | 'warning';
  }[];
}

export const Validator = {

  validate(code: string, challenge: any, phaseRules: any = null): ValidationResult {
    if (code === 'incorrect_mcq') {
      return { passed: false, results: [{ text: '❌ Incorrect answer. Please review the choices and try again!', type: 'error' }] };
    }
    if (code === 'no_mcq_selected') {
      return { passed: false, results: [{ text: '⚠️ Please select one of the options before submitting!', type: 'error' }] };
    }

    const rules = phaseRules || challenge.validationRules;
    const type = phaseRules ? (phaseRules.patternMatch ? 'sql_query' : challenge.validator) : challenge.validator;

    switch (type || challenge.validator) {
      case 'html_structure':
        return this._validateHTML(code, rules);
      case 'css_properties':
        return this._validateCSS(code, rules);
      case 'js_function':
        return this._validateJS(code, rules);
      case 'sql_query':
        return this._validateSQL(code, rules);
      default:
        return this._validateGeneric(code, rules);
    }
  },

  // ── HTML Validation ──
  _validateHTML(code: string, rules: any): ValidationResult {
    const results: { text: string; type: 'success' | 'error' | 'warning' }[] = [];
    const cleanCode = code.trim();

    if (!cleanCode) {
      return { passed: false, results: [{ text: '❌ No code written yet!', type: 'error' }] };
    }

    // Parse HTML using a temporary div
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanCode, 'text/html');
    const container = doc.body;

    let allPassed = true;

    // Check required elements
    if (rules.requiredElements) {
      for (const req of rules.requiredElements) {
        const found = container.querySelectorAll(req.selector);
        if (found.length >= req.count) {
          results.push({ text: `✅ Found ${req.selector} (${found.length}/${req.count})`, type: 'success' });
        } else {
          results.push({ text: `❌ Expected ${req.count} "${req.selector}" but found ${found.length}`, type: 'error' });
          allPassed = false;
        }
      }
    }

    // Check required text content
    if (rules.requiredText) {
      for (const text of rules.requiredText) {
        if (container.textContent && container.textContent.includes(text)) {
          results.push({ text: `✅ Found text: "${text}"`, type: 'success' });
        } else {
          results.push({ text: `❌ Missing text: "${text}"`, type: 'error' });
          allPassed = false;
        }
      }
    }

    return { passed: allPassed, results };
  },

  // ── CSS Validation ──
  _validateCSS(code: string, rules: any): ValidationResult {
    const results: { text: string; type: 'success' | 'error' | 'warning' }[] = [];
    const cleanCode = code.trim().toLowerCase();

    if (!cleanCode) {
      return { passed: false, results: [{ text: '❌ No code written yet!', type: 'error' }] };
    }

    let allPassed = true;

    // Check required properties
    if (rules.requiredProperties) {
      for (const [prop, value] of Object.entries(rules.requiredProperties)) {
        // Build regex to match property: value
        const propRegex = new RegExp(
          prop.replace('-', '[-]?') + '\\s*:\\s*' + (value as string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
          'i'
        );
        if (propRegex.test(cleanCode) || cleanCode.includes(`${prop}: ${value}`) || cleanCode.includes(`${prop}:${value}`)) {
          results.push({ text: `✅ ${prop}: ${value}`, type: 'success' });
        } else {
          results.push({ text: `❌ Expected ${prop}: ${value}`, type: 'error' });
          allPassed = false;
        }
      }
    }

    // Check if code contains certain text
    if (rules.containsText) {
      for (const text of rules.containsText) {
        if (cleanCode.includes(text.toLowerCase())) {
          results.push({ text: `✅ Contains: ${text}`, type: 'success' });
        } else {
          results.push({ text: `❌ Missing: ${text}`, type: 'error' });
          allPassed = false;
        }
      }
    }

    return { passed: allPassed, results };
  },

  // ── JavaScript Validation ──
  _validateJS(code: string, rules: any): ValidationResult {
    const results: { text: string; type: 'success' | 'error' | 'warning' }[] = [];
    const cleanCode = code.trim();

    if (!cleanCode) {
      return { passed: false, results: [{ text: '❌ No code written yet!', type: 'error' }] };
    }

    let allPassed = true;

    // Check if function name exists
    if (rules.functionName) {
      if (!cleanCode.includes(`function ${rules.functionName}`)) {
        return {
          passed: false,
          results: [{ text: `❌ Function "${rules.functionName}" not found`, type: 'error' }]
        };
      }
      results.push({ text: `✅ Function "${rules.functionName}" defined`, type: 'success' });
    }

    // Run test cases
    if (rules.testCases) {
      try {
        // Create function in sandboxed scope
        const fn = new Function(cleanCode + `;\nreturn ${rules.functionName};`)();

        for (let i = 0; i < rules.testCases.length; i++) {
          const tc = rules.testCases[i];
          try {
            const result = fn(...tc.input);
            const expected = tc.expected;

            if (this._deepEqual(result, expected)) {
              results.push({
                text: `✅ Test ${i + 1}: ${rules.functionName}(${JSON.stringify(tc.input).slice(1, -1)}) ✓`,
                type: 'success'
              });
            } else {
              results.push({
                text: `❌ Test ${i + 1}: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(result)}`,
                type: 'error'
              });
              allPassed = false;
            }
          } catch (err: any) {
            results.push({ text: `❌ Test ${i + 1}: Runtime Error — ${err.message}`, type: 'error' });
            allPassed = false;
          }
        }
      } catch (err: any) {
        results.push({ text: `❌ Syntax Error — ${err.message}`, type: 'error' });
        allPassed = false;
      }
    }

    // Check expected return value (no test cases, just one call)
    if (rules.expectedReturn && !rules.testCases) {
      try {
        const fn = new Function(cleanCode + `;\nreturn ${rules.functionName};`)();
        const result = fn();
        if (this._deepEqual(result, rules.expectedReturn)) {
          results.push({ text: `✅ Returned correct value!`, type: 'success' });
        } else {
          results.push({
            text: `❌ Expected ${JSON.stringify(rules.expectedReturn)}, got ${JSON.stringify(result)}`,
            type: 'error'
          });
          allPassed = false;
        }
      } catch (err: any) {
        results.push({ text: `❌ Error — ${err.message}`, type: 'error' });
        allPassed = false;
      }
    }

    // Check expected actions (like classList.add)
    if (rules.expectedActions) {
      for (const action of rules.expectedActions) {
        if (cleanCode.includes(action)) {
          results.push({ text: `✅ Uses: ${action}`, type: 'success' });
        } else {
          results.push({ text: `❌ Expected use of: ${action}`, type: 'error' });
          allPassed = false;
        }
      }
    }

    // Custom validator function
    if (rules.customValidator) {
      try {
        const fn = new Function(cleanCode + `;\nreturn ${rules.functionName};`)();
        const result = fn();
        if (rules.customValidator(result)) {
          results.push({ text: `✅ Custom validation passed!`, type: 'success' });
        } else {
          results.push({ text: `❌ Output doesn't match expected format`, type: 'error' });
          allPassed = false;
        }
      } catch (err: any) {
        results.push({ text: `❌ Error — ${err.message}`, type: 'error' });
        allPassed = false;
      }
    }

    return { passed: allPassed, results };
  },

  // ── SQL Validation ──
  _validateSQL(code: string, rules: any): ValidationResult {
    const results: { text: string; type: 'success' | 'error' | 'warning' }[] = [];
    const cleanCode = code.trim().toUpperCase();
    const originalCode = code.trim();

    if (!cleanCode) {
      return { passed: false, results: [{ text: '❌ No query written yet!', type: 'error' }] };
    }

    let allPassed = true;

    // Check required keywords
    if (rules.requiredKeywords) {
      for (const keyword of rules.requiredKeywords) {
        if (cleanCode.includes(keyword.toUpperCase())) {
          results.push({ text: `✅ Uses: ${keyword}`, type: 'success' });
        } else {
          results.push({ text: `❌ Missing keyword: ${keyword}`, type: 'error' });
          allPassed = false;
        }
      }
    }

    // Check text content (case insensitive)
    if (rules.containsText) {
      for (const text of rules.containsText) {
        if (originalCode.toLowerCase().includes(text.toLowerCase())) {
          results.push({ text: `✅ Contains: ${text}`, type: 'success' });
        } else {
          results.push({ text: `❌ Missing: ${text}`, type: 'error' });
          allPassed = false;
        }
      }
    }

    // Pattern match
    if (rules.patternMatch) {
      if (rules.patternMatch.test(originalCode)) {
        results.push({ text: `✅ Query structure is correct!`, type: 'success' });
      } else {
        results.push({ text: `❌ Query structure doesn't match expected pattern`, type: 'error' });
        allPassed = false;
      }
    }

    // SQL syntax check — must end with semicolon
    if (!originalCode.endsWith(';')) {
      results.push({ text: `⚠️ Tip: End your query with a semicolon (;)`, type: 'warning' });
    }

    return { passed: allPassed, results };
  },

  // ── Generic Validation ──
  _validateGeneric(code: string, rules: any): ValidationResult {
    const results: { text: string; type: 'success' | 'error' | 'warning' }[] = [];
    let allPassed = true;

    if (rules.containsText) {
      for (const text of rules.containsText) {
        if (code.includes(text)) {
          results.push({ text: `✅ Contains: ${text}`, type: 'success' });
        } else {
          results.push({ text: `❌ Missing: ${text}`, type: 'error' });
          allPassed = false;
        }
      }
    }

    return { passed: allPassed, results };
  },

  // ── Deep Equality Check ──
  _deepEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a === null || b === null) return false;
    if (typeof a !== 'object') return false;

    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      if (a.length !== b.length) return false;
      return a.every((item, i) => this._deepEqual(item, b[i]));
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(key => this._deepEqual(a[key], b[key]));
  }
};
