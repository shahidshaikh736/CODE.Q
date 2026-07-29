/* ============================================
   CodeQuest — AI Coding Assistant Engine ("Q") (TypeScript)
   ============================================ */

export const AIAssistant = {
  generateResponse(challenge: any, code: string, lastResults: any, userMessage = ''): string {
    const cleanMsg = userMessage.trim().toLowerCase();
    
    // 1. Check if user typed a specific question
    if (cleanMsg) {
      if (cleanMsg.includes('hello') || cleanMsg.includes('hi') || cleanMsg.includes('hey')) {
        return `Hello there! I am **Q**, your AI Coding Companion. I'm here to help you debug your code and understand programming concepts. Ask me anything about this challenge, or type "explain" to get a code walkthrough!`;
      }
      if (cleanMsg.includes('explain') || cleanMsg.includes('how to solve') || cleanMsg.includes('help')) {
        return this._explainChallenge(challenge);
      }
      if (cleanMsg.includes('flex') || cleanMsg.includes('align') || cleanMsg.includes('justify')) {
        return `**CSS Flexbox Guide:**
- Use \`display: flex;\` on the parent container.
- Use \`justify-content: center | space-between | space-around;\` to align items horizontally.
- Use \`align-items: center | flex-start | flex-end;\` to align items vertically.
- Use \`flex-direction: column;\` if you want items stacked vertically.`;
      }
      if (cleanMsg.includes('div') || cleanMsg.includes('html') || cleanMsg.includes('tag')) {
        return `**HTML Tags Guide:**
- \`<div>\` is a generic container block.
- \`<span>\` is used for inline text styling.
- \`<h1>\` through \`<h6>\` represent section headings.
- \`<p>\` is for text paragraphs.
Make sure you open and close your tags properly, e.g., \`<div class="card"> Content </div>\`.`;
      }
      if (cleanMsg.includes('const') || cleanMsg.includes('let') || cleanMsg.includes('variable')) {
        return `**JavaScript Variables:**
- Use \`const\` for values that should never change (constant reference).
- Use \`let\` for variables whose values will change as the game or program runs.
- Avoid using older \`var\` keywords. E.g., \`const score = 10; let health = 100;\``;
      }
      if (cleanMsg.includes('select') || cleanMsg.includes('sql') || cleanMsg.includes('database')) {
        return `**SQL Queries Guide:**
- To fetch all columns: \`SELECT * FROM table_name;\`
- To filter records: \`SELECT column FROM table_name WHERE condition;\`
- Make sure table names match the instruction description exactly. Always end your queries with a semicolon (\`;\`).`;
      }
    }

    // 2. Check if code is empty
    if (!code || !code.trim()) {
      return `It looks like your editor is empty! 📝 Read the **Objectives** and **Quest Story** on the left panel, and start writing your code in the Monaco Editor. You can use the helper buttons bar above the editor if you are on a smaller screen!`;
    }

    // 3. Check for basic syntax balance
    const syntaxError = this._checkBasicSyntax(code, challenge.language);
    if (syntaxError) {
      return syntaxError;
    }

    // 4. Analyze validation results if code failed
    if (lastResults && lastResults.passed === false) {
      const errorMsg = lastResults.results.find((r: any) => r.type === 'error')?.text || '';
      return this._generateDebuggingHint(challenge, code, errorMsg);
    }

    // 5. Default/Success message
    if (lastResults && lastResults.passed === true) {
      return `Fantastic job! Your solution passes all current validation checks. Click the **Run Code** button to complete the quest and claim your rewards! 🏆`;
    }

    return `I've analyzed your code. It looks like a good start! Try clicking the **Run Code** button to see if it passes validation. If it fails, I'll tell you exactly what went wrong and how to fix it!`;
  },

  _checkBasicSyntax(code: string, language: string): string | null {
    if (language === 'javascript') {
      // Check parenthesis & brace matching
      const counts: Record<string, number> = { '{': 0, '}': 0, '(': 0, ')': 0, '[': 0, ']': 0 };
      for (const char of code) {
        if (counts.hasOwnProperty(char)) {
          counts[char]++;
        }
      }
      if (counts['{'] !== counts['}']) {
        return `⚠️ **Syntax Alert:** You have mismatched curly braces \`{}\`. You opened ${counts['{']} but closed ${counts['}']}. Make sure all functions and blocks are properly closed!`;
      }
      if (counts['('] !== counts[')']) {
        return `⚠️ **Syntax Alert:** You have mismatched parentheses \`()\`. You opened ${counts['(']} but closed ${counts[')']}. Double check your function calls or conditional statements!`;
      }
    } else if (language === 'html') {
      const openDivs = (code.match(/<div/g) || []).length;
      const closeDivs = (code.match(/<\/div>/g) || []).length;
      if (openDivs !== closeDivs) {
        return `⚠️ **HTML Alert:** You have mismatched \`<div>\` tags. You opened ${openDivs} \`<div>\` tags but closed ${closeDivs}. Make sure all parent containers are closed!`;
      }
    }
    return null;
  },

  _explainChallenge(challenge: any): string {
    let explanation = `**Quest concept: ${challenge.title}**\n\n`;
    explanation += `Here is what you need to do:\n`;
    challenge.instructions.forEach((inst: string, idx: number) => {
      // strip html tag helper matches for cleaner formatting
      const cleanInst = inst.replace(/<\/?[^>]+(>|$)/g, "");
      explanation += `${idx + 1}. ${cleanInst}\n`;
    });
    
    explanation += `\n*Hint:* Check the starting template. Make sure you don't modify existing function names or class selector definitions, as the validation suite relies on them!`;
    return explanation;
  },

  _generateDebuggingHint(challenge: any, code: string, errorMessage: string): string {
    // Custom hints depending on validation errors
    const lowerErr = errorMessage.toLowerCase();

    if (lowerErr.includes('no code written') || lowerErr.includes('empty')) {
      return `It looks like your editor is empty or only contains comments. Please write your code below the comment header.`;
    }

    // Match HTML errors
    if (challenge.language === 'html') {
      if (lowerErr.includes('expected') && lowerErr.includes('found')) {
        return `🔍 **Debugging Hint:** The validation suite failed because it couldn't find all required HTML tags.
- Message: \`${errorMessage}\`
- Make sure tags are written in lowercase (e.g., \`<section class="card">\` instead of \`<Section>\`) and closing tags are present (\`</section>\`).`;
      }
      if (lowerErr.includes('class') || lowerErr.includes('id')) {
        return `🔍 **Debugging Hint:** Make sure you added the exact classes or IDs specified in the objectives. Remember, class selector starts with \`class="..."\` and ID starts with \`id="..."\`.`;
      }
    }

    // Match CSS errors
    if (challenge.language === 'css') {
      if (lowerErr.includes('selector') || lowerErr.includes('missing')) {
        return `🔍 **Debugging Hint:** Make sure your CSS targets the correct class or element.
- To select a class, use a dot: \`.classname { ... }\`
- To select an ID, use a hash: \`#idname { ... }\`
- Make sure properties end with semicolons \`;\`.`;
      }
    }

    // Match JS errors
    if (challenge.language === 'javascript') {
      if (lowerErr.includes('return') || lowerErr.includes('undefined') || lowerErr.includes('function')) {
        return `🔍 **Debugging Hint:** The function is not returning the expected result.
- Check if your code returns a value using the \`return\` statement.
- Make sure your variable names are spelled exactly right. JavaScript is case-sensitive!`;
      }
    }

    // Match SQL errors
    if (challenge.language === 'sql') {
      if (lowerErr.includes('table') || lowerErr.includes('syntax')) {
        return `🔍 **Debugging Hint:** Check your SQL syntax:
- Verify table names (case matches instructions).
- Ensure keyword order: \`SELECT -> FROM -> WHERE\`.
- Semicolon \`;\` must be present at the end of the query.`;
      }
    }

    return `🔍 **Q's Diagnostics:** The validation suite failed with the message:
> *${errorMessage}*

Double check the objectives, review spelling, check for missing closing brackets, and try again!`;
  }
};
