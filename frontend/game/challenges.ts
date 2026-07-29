/* ============================================
   CodeQuest — All Coding Challenges Data
   ============================================ */

export const ChallengesData = {
  // ═══════════════════════════════════════════
  // 🌲 FRONTEND FOREST — HTML, CSS, JavaScript
  // ═══════════════════════════════════════════
  forest: [
    {
      id: 'forest_1',
      realm: 'forest',
      level: 1,
      title: 'The Broken Bridge',
      icon: '🌉',
      language: 'html',
      xpReward: 30,
      story: `You stand before a broken wooden bridge over a dark ravine. The bridge's HTML structure is damaged! Fix the HTML code to rebuild the bridge and cross to the other side.`,
      instructions: [
        'Create a valid HTML structure with a <code>&lt;div&gt;</code> that has the class <code>bridge</code>',
        'Inside it, add 3 <code>&lt;span&gt;</code> elements with the class <code>plank</code>',
        'Each plank should contain the text "Plank 1", "Plank 2", "Plank 3"'
      ],
      starterCode: `<!-- Fix the broken bridge HTML -->\n<div class="bridge">\n  <!-- Add 3 planks here -->\n  \n</div>`,
      mcq: {
        question: "Which HTML structure correctly implements a bridge container with 3 planks as requested?",
        options: [
          `<div class="bridge">\n  <span class="plank">Plank 1</span>\n  <span class="plank">Plank 2</span>\n  <span class="plank">Plank 3</span>\n</div>`,
          `<div id="bridge">\n  <span class="plank">Plank 1</span>\n  <span class="plank">Plank 2</span>\n  <span class="plank">Plank 3</span>\n</div>`,
          `<span class="bridge">\n  <div class="plank">Plank 1</div>\n  <div class="plank">Plank 2</div>\n  <div class="plank">Plank 3</div>\n</span>`
        ],
        correctIndex: 0
      },
      solution: `<div class="bridge">\n  <span class="plank">Plank 1</span>\n  <span class="plank">Plank 2</span>\n  <span class="plank">Plank 3</span>\n</div>`,
      validator: 'html_structure',
      validationRules: {
        requiredElements: [
          { selector: 'div.bridge', count: 1 },
          { selector: 'div.bridge span.plank', count: 3 }
        ],
        requiredText: ['Plank 1', 'Plank 2', 'Plank 3']
      },
      hints: [
        'A <span> element looks like: <span class="plank">text here</span>',
        'Make sure each plank has the class "plank" and is inside the bridge div',
        'The answer: <span class="plank">Plank 1</span> — add 3 of these with different numbers'
      ]
    },
    {
      id: 'forest_2',
      realm: 'forest',
      level: 2,
      title: 'The Invisible Path',
      icon: '👻',
      language: 'css',
      xpReward: 40,
      story: `A hidden path lies before you, invisible to the eye! Use CSS magic to reveal the path by setting the correct display and visibility properties.`,
      instructions: [
        'Make the element with class <code>.hidden-path</code> visible by setting <code>display</code> to <code>block</code>',
        'Set <code>opacity</code> to <code>1</code>',
        'Set <code>background-color</code> to <code>#00ff88</code> (magic green!)'
      ],
      starterCode: `.hidden-path {\n  display: none;\n  opacity: 0;\n  background-color: transparent;\n  /* Fix the above properties */\n  \n}`,
      mcq: {
        question: "Which CSS ruleset correctly reveals the hidden path and sets the magic green color (#00ff88)?",
        options: [
          `.hidden-path {\n  display: inline;\n  opacity: 0.5;\n  background-color: #00ff88;\n}`,
          `.hidden-path {\n  display: block;\n  opacity: 1;\n  background-color: #00ff88;\n}`,
          `#hidden-path {\n  display: block;\n  opacity: 1;\n  background-color: #00ff88;\n}`
        ],
        correctIndex: 1
      },
      solution: `.hidden-path {\n  display: block;\n  opacity: 1;\n  background-color: #00ff88;\n}`,
      validator: 'css_properties',
      validationRules: {
        selector: '.hidden-path',
        requiredProperties: {
          'display': 'block',
          'opacity': '1',
          'background-color': '#00ff88'
        }
      },
      hints: [
        'Change "none" to "block" for the display property',
        'Change opacity from 0 to 1 to make it fully visible',
        'Set the background-color to #00ff88 — the magic green color!'
      ]
    },
    {
      id: 'forest_3',
      realm: 'forest',
      level: 3,
      title: 'The Color Spell',
      icon: '🎨',
      language: 'css',
      xpReward: 45,
      story: `The ancient portal is dull and grey! Cast a color spell using CSS gradients to activate it. The portal needs a beautiful gradient to channel magical energy!`,
      instructions: [
        'Set a <code>background</code> with a <code>linear-gradient</code> going from <code>#ff00ff</code> to <code>#00f5ff</code>',
        'Set <code>border-radius</code> to <code>50%</code> to make it circular',
        'Add a <code>box-shadow</code> of <code>0 0 30px rgba(0, 245, 255, 0.5)</code> for the glow effect'
      ],
      starterCode: `.portal {\n  width: 200px;\n  height: 200px;\n  /* Add your gradient, border-radius, and box-shadow */\n  \n}`,
      mcq: {
        question: "Which CSS properties correctly style the portal to be circular, have a linear gradient from #ff00ff to #00f5ff, and a box-shadow glow?",
        options: [
          `.portal {\n  width: 200px;\n  height: 200px;\n  background: linear-gradient(#ff00ff, #00f5ff);\n  border-radius: 50%;\n  box-shadow: 0 0 30px rgba(0, 245, 255, 0.5);\n}`,
          `.portal {\n  width: 200px;\n  height: 200px;\n  background-color: #ff00ff;\n  border-radius: 10px;\n  box-shadow: none;\n}`,
          `.portal {\n  width: 200px;\n  height: 200px;\n  background: linear-gradient(#ff00ff, #00f5ff);\n  border-radius: 100px;\n  box-shadow: 0 0 10px rgba(0,0,0,0.5);\n}`
        ],
        correctIndex: 0
      },
      solution: `.portal {\n  width: 200px;\n  height: 200px;\n  background: linear-gradient(#ff00ff, #00f5ff);\n  border-radius: 50%;\n  box-shadow: 0 0 30px rgba(0, 245, 255, 0.5);\n}`,
      validator: 'css_properties',
      validationRules: {
        selector: '.portal',
        requiredProperties: {
          'border-radius': '50%'
        },
        containsText: ['linear-gradient', '#ff00ff', '#00f5ff', 'box-shadow']
      },
      hints: [
        'Use: background: linear-gradient(#ff00ff, #00f5ff);',
        'Add: border-radius: 50%; to make the portal circular',
        'Add: box-shadow: 0 0 30px rgba(0, 245, 255, 0.5); for the glow'
      ]
    },
    {
      id: 'forest_4',
      realm: 'forest',
      level: 4,
      title: 'The Flexbox Fortress',
      icon: '🏰',
      language: 'css',
      xpReward: 55,
      story: `The fortress walls have crumbled! Use Flexbox to align the defense walls properly. The 3 wall segments need to be evenly spaced in a row to protect the kingdom!`,
      instructions: [
        'Set <code>display</code> to <code>flex</code> on the <code>.fortress</code> container',
        'Use <code>justify-content: space-between</code> to evenly space the walls',
        'Use <code>align-items: center</code> to vertically center them',
        'Set <code>gap</code> to <code>20px</code>'
      ],
      starterCode: `.fortress {\n  /* Add flexbox properties to align the walls */\n  \n}`,
      mcq: {
        question: "Which Flexbox layout configuration correctly spaces out the fortress walls in a row and vertically centers them?",
        options: [
          `.fortress {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  gap: 20px;\n}`,
          `.fortress {\n  display: block;\n  justify-content: space-between;\n  align-items: center;\n}`,
          `.fortress {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}`
        ],
        correctIndex: 2
      },
      solution: `.fortress {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 20px;\n}`,
      validator: 'css_properties',
      validationRules: {
        selector: '.fortress',
        requiredProperties: {
          'display': 'flex',
          'justify-content': 'space-between',
          'align-items': 'center'
        }
      },
      hints: [
        'Start with: display: flex;',
        'Use justify-content: space-between; to distribute the walls evenly',
        'Use align-items: center; and gap: 20px; to complete it'
      ]
    },
    {
      id: 'forest_boss',
      realm: 'forest',
      level: 5,
      title: '🐉 The Layout Dragon',
      icon: '🐉',
      language: 'html',
      xpReward: 120,
      isBoss: true,
      bossName: 'The Layout Dragon',
      bossEmoji: '🐲',
      bossHP: 3,
      story: `The mighty Layout Dragon guards the exit of Frontend Forest! Defeat it by building a complete card component. Each correct step deals damage!`,
      instructions: [
        'This is a 3-part boss fight! Complete each step to deal damage.'
      ],
      phases: [
        {
          title: 'Phase 1: Build the Card Structure',
          instruction: 'Create a <code>&lt;div class="card"&gt;</code> containing a <code>&lt;h2&gt;</code> with text "Dragon Slayer" and a <code>&lt;p&gt;</code> with text "Level 5 Warrior"',
          starterCode: `<!-- Build the card structure -->\n`,
          mcq: {
            question: "Choose the correct HTML markup to build the card structure containing a heading 'Dragon Slayer' and a paragraph 'Level 5 Warrior':",
            options: [
              `<div class="card">\n  <h2>Dragon Slayer</h2>\n  <p>Level 5 Warrior</p>\n</div>`,
              `<section class="card">\n  <h1>Dragon Slayer</h1>\n  <p>Level 5 Warrior</p>\n</section>`,
              `<div id="card">\n  <h2>Dragon Slayer</h2>\n  <span>Level 5 Warrior</span>\n</div>`
            ],
            correctIndex: 0
          },
          solution: `<div class="card">\n  <h2>Dragon Slayer</h2>\n  <p>Level 5 Warrior</p>\n</div>`,
          validator: 'html_structure',
          validationRules: {
            requiredElements: [
              { selector: 'div.card', count: 1 },
              { selector: 'div.card h2', count: 1 },
              { selector: 'div.card p', count: 1 }
            ],
            requiredText: ['Dragon Slayer', 'Level 5 Warrior']
          }
        },
        {
          title: 'Phase 2: Style the Card',
          instruction: 'Style the <code>.card</code> with: <code>padding: 20px</code>, <code>border-radius: 12px</code>, <code>background: #1a1a3e</code>, and <code>border: 1px solid #00f5ff</code>',
          starterCode: `.card {\n  /* Style the card */\n  \n}`,
          mcq: {
            question: "Which CSS properties correctly style the card class with 20px padding, 12px border-radius, and a dark blue background (#1a1a3e)?",
            options: [
              `.card {\n  padding: 10px;\n  border-radius: 12px;\n  background: #1a1a3e;\n}`,
              `.card {\n  padding: 20px;\n  border-radius: 12px;\n  background: #1a1a3e;\n  border: 1px solid #00f5ff;\n}`,
              `.card {\n  margin: 20px;\n  border-radius: 50%;\n  background-color: #1a1a3e;\n}`
            ],
            correctIndex: 1
          },
          solution: `.card {\n  padding: 20px;\n  border-radius: 12px;\n  background: #1a1a3e;\n  border: 1px solid #00f5ff;\n}`,
          validator: 'css_properties',
          validationRules: {
            selector: '.card',
            requiredProperties: {
              'padding': '20px',
              'border-radius': '12px',
              'background': '#1a1a3e'
            }
          }
        },
        {
          title: 'Phase 3: Add Hover Effect',
          instruction: 'Write a JavaScript function <code>addGlow()</code> that adds the class <code>"glowing"</code> to the element with id <code>"card"</code>',
          starterCode: `function addGlow() {\n  // Add the class "glowing" to #card\n  \n}`,
          mcq: {
            question: "Which JavaScript code correctly adds the class 'glowing' to the element with id 'card'?",
            options: [
              `function addGlow() {\n  document.getElementById("card").className = "glowing";\n}`,
              `function addGlow() {\n  document.querySelector(".card").classList.add("glowing");\n}`,
              `function addGlow() {\n  document.getElementById("card").classList.add("glowing");\n}`
            ],
            correctIndex: 2
          },
          solution: `function addGlow() {\n  document.getElementById("card").classList.add("glowing");\n}`,
          validator: 'js_function',
          validationRules: {
            functionName: 'addGlow',
            expectedActions: ['classList.add', 'glowing']
          }
        }
      ],
      hints: [
        'Phase 1: <div class="card"><h2>Dragon Slayer</h2><p>Level 5 Warrior</p></div>',
        'Phase 2: padding: 20px; border-radius: 12px; background: #1a1a3e;',
        'Phase 3: document.getElementById("card").classList.add("glowing");'
      ]
    }
  ],

  // ═══════════════════════════════════════════
  // 🏔️ BACKEND DUNGEON — Node.js, APIs, Logic
  // ═══════════════════════════════════════════
  dungeon: [
    {
      id: 'dungeon_1',
      realm: 'dungeon',
      level: 1,
      title: 'The First Request',
      icon: '📡',
      language: 'javascript',
      xpReward: 35,
      story: `You enter the dark dungeon. A magical terminal glows in the corner. Send your first HTTP request by writing a function that returns the correct response object!`,
      instructions: [
        'Write a function called <code>handleGet</code> that takes no arguments',
        'It should return an object with <code>status: 200</code> and <code>message: "Hello, Adventurer!"</code>'
      ],
      starterCode: `function handleGet() {\n  // Return a response object\n  // with status and message\n  \n}`,
      mcq: {
        question: "Which JavaScript function correctly returns the specified response object?",
        options: [
          `function handleGet() {\n  return {\n    status: 200,\n    message: "Hello, Adventurer!"\n  };\n}`,
          `function handleGet() {\n  return "status: 200, message: Hello, Adventurer!";\n}`,
          `function handleGet() {\n  status = 200;\n  message = "Hello, Adventurer!";\n}`
        ],
        correctIndex: 0
      },
      solution: `function handleGet() {\n  return {\n    status: 200,\n    message: "Hello, Adventurer!"\n  };\n}`,
      validator: 'js_function',
      validationRules: {
        functionName: 'handleGet',
        expectedReturn: { status: 200, message: 'Hello, Adventurer!' }
      },
      hints: [
        'Use the return keyword to return an object',
        'The object should look like: { status: 200, message: "Hello, Adventurer!" }',
        'Complete answer: return { status: 200, message: "Hello, Adventurer!" };'
      ]
    },
    {
      id: 'dungeon_2',
      realm: 'dungeon',
      level: 2,
      title: 'The Data Scroll',
      icon: '📜',
      language: 'javascript',
      xpReward: 45,
      story: `A magical scroll arrives with encrypted data (JSON). You must write a function that can parse this data and extract the hero's name from it!`,
      instructions: [
        'Write a function <code>parseScroll</code> that takes a JSON string as parameter',
        'Parse it and return the value of the <code>hero</code> property',
        'Example input: <code>\'{"hero": "Aragon", "level": 5}\'</code> → should return <code>"Aragon"</code>'
      ],
      starterCode: `function parseScroll(jsonString) {\n  // Parse the JSON and return the hero name\n  \n}`,
      mcq: {
        question: "Which JavaScript function correctly parses a JSON string parameter and returns the value of the 'hero' property?",
        options: [
          `function parseScroll(jsonString) {\n  const data = JSON.parse(jsonString);\n  return data.hero;\n}`,
          `function parseScroll(jsonString) {\n  const data = JSON.stringify(jsonString);\n  return data.hero;\n}`,
          `function parseScroll(jsonString) {\n  return jsonString.hero;\n}`
        ],
        correctIndex: 0
      },
      solution: `function parseScroll(jsonString) {\n  const data = JSON.parse(jsonString);\n  return data.hero;\n}`,
      validator: 'js_function',
      validationRules: {
        functionName: 'parseScroll',
        testCases: [
          { input: ['{"hero": "Aragon", "level": 5}'], expected: 'Aragon' },
          { input: ['{"hero": "Gandalf", "power": 99}'], expected: 'Gandalf' }
        ]
      },
      hints: [
        'Use JSON.parse() to convert the string to an object',
        'Access the hero property: data.hero',
        'Full answer: const data = JSON.parse(jsonString); return data.hero;'
      ]
    },
    {
      id: 'dungeon_3',
      realm: 'dungeon',
      level: 3,
      title: 'The Status Gate',
      icon: '🚪',
      language: 'javascript',
      xpReward: 50,
      story: `A massive gate blocks your path. It responds to HTTP status codes! Write a function that returns the correct status code for each situation to open the gate!`,
      instructions: [
        'Write a function <code>getStatusCode</code> that takes a <code>situation</code> string',
        'Return <code>200</code> for "success"',
        'Return <code>404</code> for "not_found"',
        'Return <code>500</code> for "server_error"',
        'Return <code>401</code> for "unauthorized"',
        'Return <code>400</code> for anything else'
      ],
      starterCode: `function getStatusCode(situation) {\n  // Return the correct HTTP status code\n  \n}`,
      mcq: {
        question: "Which implementation of getStatusCode correctly handles all specified situations and returns HTTP status codes?",
        options: [
          `function getStatusCode(situation) {\n  if (situation === "success") return 200;\n  else if (situation === "not_found") return 404;\n  return 400;\n}`,
          `function getStatusCode(situation) {\n  switch(situation) {\n    case "success": return 200;\n    case "not_found": return 404;\n    case "server_error": return 500;\n    case "unauthorized": return 401;\n    default: return 400;\n  }\n}`,
          `function getStatusCode(situation) {\n  return 200;\n}`
        ],
        correctIndex: 1
      },
      solution: `function getStatusCode(situation) {\n  switch(situation) {\n    case "success": return 200;\n    case "not_found": return 404;\n    case "server_error": return 500;\n    case "unauthorized": return 401;\n    default: return 400;\n  }\n}`,
      validator: 'js_function',
      validationRules: {
        functionName: 'getStatusCode',
        testCases: [
          { input: ['success'], expected: 200 },
          { input: ['not_found'], expected: 404 },
          { input: ['server_error'], expected: 500 },
          { input: ['unauthorized'], expected: 401 },
          { input: ['unknown'], expected: 400 }
        ]
      },
      hints: [
        'Use if/else or switch statement to check the situation',
        'HTTP 200 = success, 404 = not found, 500 = server error, 401 = unauthorized',
        'Use a default case to return 400 for unknown situations'
      ]
    },
    {
      id: 'dungeon_4',
      realm: 'dungeon',
      level: 4,
      title: 'The Auth Shield',
      icon: '🛡️',
      language: 'javascript',
      xpReward: 60,
      story: `The inner dungeon is protected by an authentication shield! Write a function that validates a token to unlock the door.`,
      instructions: [
        'Write a function <code>validateToken</code> that takes a <code>token</code> string',
        'A valid token must: start with "CQ-", be at least 10 characters long, and contain at least one number',
        'Return <code>{ valid: true, access: "granted" }</code> if valid',
        'Return <code>{ valid: false, access: "denied" }</code> if invalid'
      ],
      starterCode: `function validateToken(token) {\n  // Check if the token is valid\n  // Must start with "CQ-", be 10+ chars, contain a number\n  \n}`,
      mcq: {
        question: "Which function correctly validates that a token starts with 'CQ-', is at least 10 characters long, and contains a digit?",
        options: [
          `function validateToken(token) {\n  const startsCorrect = token.startsWith("CQ-");\n  const longEnough = token.length >= 10;\n  const hasNumber = /\\d/.test(token);\n  \n  if (startsCorrect && longEnough && hasNumber) {\n    return { valid: true, access: "granted" };\n  }\n  return { valid: false, access: "denied" };\n}`,
          `function validateToken(token) {\n  if (token.startsWith("CQ-") && token.length > 10) {\n    return true;\n  }\n  return false;\n}`,
          `function validateToken(token) {\n  return token.includes("CQ-");\n}`
        ],
        correctIndex: 0
      },
      solution: `function validateToken(token) {\n  const startsCorrect = token.startsWith("CQ-");\n  const longEnough = token.length >= 10;\n  const hasNumber = /\\d/.test(token);\n  \n  if (startsCorrect && longEnough && hasNumber) {\n    return { valid: true, access: "granted" };\n  }\n  return { valid: false, access: "denied" };\n}`,
      validator: 'js_function',
      validationRules: {
        functionName: 'validateToken',
        testCases: [
          { input: ['CQ-hero12345'], expected: { valid: true, access: 'granted' } },
          { input: ['CQ-short'], expected: { valid: false, access: 'denied' } },
          { input: ['INVALID-token1'], expected: { valid: false, access: 'denied' } },
          { input: ['CQ-abcdefghij'], expected: { valid: false, access: 'denied' } }
        ]
      },
      hints: [
        'Use token.startsWith("CQ-") to check the prefix',
        'Use token.length >= 10 for length check',
        'Use /\\d/.test(token) to check if it contains a number'
      ]
    },
    {
      id: 'dungeon_boss',
      realm: 'dungeon',
      level: 5,
      title: '🐙 The API Hydra',
      icon: '🐙',
      language: 'javascript',
      xpReward: 130,
      isBoss: true,
      bossName: 'The API Hydra',
      bossEmoji: '🐙',
      bossHP: 3,
      story: `The API Hydra emerges from the depths! It has 3 heads — each one represents an API endpoint. Build all 3 to defeat it!`,
      instructions: [
        'This is a 3-part boss fight! Build each API handler to cut off a head!'
      ],
      phases: [
        {
          title: 'Head 1: GET Handler',
          instruction: 'Write a function <code>getUsers</code> that returns an array of 2 user objects, each with <code>id</code> and <code>name</code> properties',
          starterCode: `function getUsers() {\n  // Return array of 2 users\n  \n}`,
          mcq: {
            question: "Choose the JavaScript implementation of getUsers that correctly returns an array of 2 user objects with 'id' and 'name' properties:",
            options: [
              `function getUsers() {\n  return [{id: 1, name: "Hero"}, {id: 2, name: "Mage"}];\n}`,
              `function getUsers() {\n  return {id: 1, name: "Hero"};\n}`,
              `function getUsers() {\n  return ["Hero", "Mage"];\n}`
            ],
            correctIndex: 0
          },
          solution: `function getUsers() {\n  return [{id: 1, name: "Hero"}, {id: 2, name: "Mage"}];\n}`,
          validator: 'js_function',
          validationRules: {
            functionName: 'getUsers',
            customValidator: (result) => {
              return Array.isArray(result) && result.length === 2 &&
                result.every(u => u.id !== undefined && u.name !== undefined);
            }
          }
        },
        {
          title: 'Head 2: Filter Function',
          instruction: 'Write a function <code>filterByLevel</code> that takes an array of objects and a <code>minLevel</code>, and returns only items where <code>level >= minLevel</code>',
          starterCode: `function filterByLevel(items, minLevel) {\n  // Filter items by level\n  \n}`,
          mcq: {
            question: "Which JS function correctly filters an items array by level where level >= minLevel?",
            options: [
              `function filterByLevel(items, minLevel) {\n  return items.filter(item => item.level > minLevel);\n}`,
              `function filterByLevel(items, minLevel) {\n  return items.filter(item => item.level >= minLevel);\n}`,
              `function filterByLevel(items, minLevel) {\n  return items.find(item => item.level >= minLevel);\n}`
            ],
            correctIndex: 1
          },
          solution: `function filterByLevel(items, minLevel) {\n  return items.filter(item => item.level >= minLevel);\n}`,
          validator: 'js_function',
          validationRules: {
            functionName: 'filterByLevel',
            testCases: [
              {
                input: [[{name:'A',level:3},{name:'B',level:7},{name:'C',level:5}], 5],
                expected: [{name:'B',level:7},{name:'C',level:5}]
              }
            ]
          }
        },
        {
          title: 'Head 3: Error Handler',
          instruction: 'Write a function <code>handleError</code> that takes an error <code>code</code> (number) and returns an object with <code>error: true</code>, the <code>code</code>, and a <code>message</code> ("Not Found" for 404, "Server Error" for 500, "Unknown Error" for others)',
          starterCode: `function handleError(code) {\n  // Return error response object\n  \n}`,
          mcq: {
            question: "Which JS function correctly implements the handleError return object based on the error code?",
            options: [
              `function handleError(code) {\n  let msg = "Unknown Error";\n  if (code === 404) msg = "Not Found";\n  else if (code === 500) msg = "Server Error";\n  return { error: true, code, message: msg };\n}`,
              `function handleError(code) {\n  return { error: true, code, message: "Error" };\n}`
            ],
            correctIndex: 0
          },
          solution: `function handleError(code) {\n  let msg = "Unknown Error";\n  if (code === 404) msg = "Not Found";\n  else if (code === 500) msg = "Server Error";\n  return { error: true, code, message: msg };\n}`,
          validator: 'js_function',
          validationRules: {
            functionName: 'handleError',
            testCases: [
              { input: [404], expected: { error: true, code: 404, message: 'Not Found' } },
              { input: [500], expected: { error: true, code: 500, message: 'Server Error' } },
              { input: [418], expected: { error: true, code: 418, message: 'Unknown Error' } }
            ]
          }
        }
      ],
      hints: [
        'Head 1: return [{id: 1, name: "Hero"}, {id: 2, name: "Mage"}];',
        'Head 2: return items.filter(item => item.level >= minLevel);',
        'Head 3: Use if/switch for 404→"Not Found", 500→"Server Error", default→"Unknown Error"'
      ]
    }
  ],

  // ═══════════════════════════════════════════
  // 🏦 DATABASE VAULT — SQL Queries
  // ═══════════════════════════════════════════
  vault: [
    {
      id: 'vault_1',
      realm: 'vault',
      level: 1,
      title: 'The Treasure Query',
      icon: '💎',
      language: 'sql',
      xpReward: 35,
      story: `You enter the vast treasure vault. Thousands of items are stored in the database. Write a SQL query to find the magical sword!`,
      instructions: [
        'Write a <code>SELECT</code> query to get all columns from the <code>inventory</code> table',
        'Filter where <code>type</code> equals <code>\'sword\'</code>',
        'Table: inventory (id, name, type, power, rarity)'
      ],
      starterCode: `-- Find all swords in the inventory\nSELECT `,
      mcq: {
        question: "Which SQL query correctly selects all columns from the inventory table where type is 'sword'?",
        options: [
          `SELECT * FROM inventory WHERE type = 'sword';`,
          `SELECT sword FROM inventory;`,
          `SELECT name FROM inventory WHERE type = sword;`
        ],
        correctIndex: 0
      },
      solution: `SELECT * FROM inventory WHERE type = 'sword';`,
      validator: 'sql_query',
      validationRules: {
        requiredKeywords: ['SELECT', 'FROM', 'inventory', 'WHERE', 'type'],
        containsText: ["'sword'", 'sword'],
        patternMatch: /SELECT\s+\*\s+FROM\s+inventory\s+WHERE\s+type\s*=\s*'sword'/i
      },
      hints: [
        'Start with: SELECT * FROM inventory',
        'Add a WHERE clause to filter by type',
        'Full query: SELECT * FROM inventory WHERE type = \'sword\';'
      ]
    },
    {
      id: 'vault_2',
      realm: 'vault',
      level: 2,
      title: 'The Inventory Update',
      icon: '📦',
      language: 'sql',
      xpReward: 45,
      story: `Your hero just found a legendary shield! Add it to the inventory database. Then update your sword's power level!`,
      instructions: [
        'Write an <code>INSERT INTO</code> statement to add a new item to the <code>inventory</code> table',
        'Values: name = \'Dragon Shield\', type = \'shield\', power = 75, rarity = \'legendary\'',
        'Columns: (name, type, power, rarity)'
      ],
      starterCode: `-- Insert the Dragon Shield into inventory\nINSERT `,
      mcq: {
        question: "Which SQL query correctly inserts the legendary shield item into the inventory table?",
        options: [
          `INSERT INTO inventory VALUES ('Dragon Shield', 'shield', 75, 'legendary');`,
          `INSERT INTO inventory (name, type, power, rarity) VALUES ('Dragon Shield', 'shield', 75, 'legendary');`,
          `UPDATE inventory SET name = 'Dragon Shield', type = 'shield', power = 75, rarity = 'legendary';`
        ],
        correctIndex: 1
      },
      solution: `INSERT INTO inventory (name, type, power, rarity) VALUES ('Dragon Shield', 'shield', 75, 'legendary');`,
      validator: 'sql_query',
      validationRules: {
        requiredKeywords: ['INSERT', 'INTO', 'inventory', 'VALUES'],
        containsText: ['Dragon Shield', 'shield', '75', 'legendary']
      },
      hints: [
        'Start with: INSERT INTO inventory',
        'Specify columns: (name, type, power, rarity)',
        'Add VALUES: (\'Dragon Shield\', \'shield\', 75, \'legendary\')'
      ]
    },
    {
      id: 'vault_3',
      realm: 'vault',
      level: 3,
      title: 'The Relational Lock',
      icon: '🔗',
      language: 'sql',
      xpReward: 55,
      story: `The deepest vault has a relational lock! It needs data from two tables joined together. Write a JOIN query to unlock it!`,
      instructions: [
        'Write a query that JOINs <code>heroes</code> table with <code>inventory</code> table',
        'Join ON <code>heroes.id = inventory.hero_id</code>',
        'SELECT hero <code>name</code> from heroes and item <code>name</code> from inventory',
        'Use table aliases: <code>h</code> for heroes, <code>i</code> for inventory'
      ],
      starterCode: `-- Join heroes with their inventory items\nSELECT `,
      mcq: {
        question: "Which SQL query joins heroes with inventory correctly on h.id = i.hero_id using aliases 'h' and 'i'?",
        options: [
          `SELECT h.name, i.name FROM heroes h JOIN inventory i ON h.id = i.hero_id;`,
          `SELECT name FROM heroes JOIN inventory ON id = hero_id;`,
          `SELECT h.name, i.name FROM heroes h, inventory i WHERE h.id = i.id;`
        ],
        correctIndex: 0
      },
      solution: `SELECT h.name, i.name FROM heroes h JOIN inventory i ON h.id = i.hero_id;`,
      validator: 'sql_query',
      validationRules: {
        requiredKeywords: ['SELECT', 'FROM', 'heroes', 'JOIN', 'inventory', 'ON'],
        containsText: ['hero_id']
      },
      hints: [
        'Use aliases: FROM heroes h JOIN inventory i',
        'Join condition: ON h.id = i.hero_id',
        'SELECT h.name, i.name to get both hero and item names'
      ]
    },
    {
      id: 'vault_4',
      realm: 'vault',
      level: 4,
      title: 'The Aggregation Spell',
      icon: '📊',
      language: 'sql',
      xpReward: 60,
      story: `The vault's magical ledger needs a summary report. Use aggregation functions to reveal hidden patterns in the data!`,
      instructions: [
        'Write a query on the <code>inventory</code> table',
        '<code>SELECT type</code>, <code>COUNT(*)</code> as total, and <code>AVG(power)</code> as avg_power',
        'Use <code>GROUP BY type</code>',
        'Only show groups <code>HAVING COUNT(*) > 1</code>'
      ],
      starterCode: `-- Get inventory stats grouped by type\nSELECT `,
      mcq: {
        question: "Which SQL query aggregates inventory stats grouped by type having COUNT(*) > 1?",
        options: [
          `SELECT type, COUNT(*) as total, AVG(power) as avg_power FROM inventory GROUP BY type HAVING COUNT(*) > 1;`,
          `SELECT type, COUNT(*) as total FROM inventory GROUP BY type WHERE COUNT(*) > 1;`,
          `SELECT type, AVG(power) FROM inventory HAVING COUNT(*) > 1;`
        ],
        correctIndex: 0
      },
      solution: `SELECT type, COUNT(*) as total, AVG(power) as avg_power FROM inventory GROUP BY type HAVING COUNT(*) > 1;`,
      validator: 'sql_query',
      validationRules: {
        requiredKeywords: ['SELECT', 'COUNT', 'AVG', 'FROM', 'inventory', 'GROUP BY', 'HAVING'],
        containsText: ['type', 'power']
      },
      hints: [
        'Use: SELECT type, COUNT(*) as total, AVG(power) as avg_power',
        'Add: FROM inventory GROUP BY type',
        'Filter groups: HAVING COUNT(*) > 1'
      ]
    },
    {
      id: 'vault_boss',
      realm: 'vault',
      level: 5,
      title: '🐍 The Schema Serpent',
      icon: '🐍',
      language: 'sql',
      xpReward: 140,
      isBoss: true,
      bossName: 'The Schema Serpent',
      bossEmoji: '🐍',
      bossHP: 3,
      story: `The Schema Serpent coils around the ultimate treasure! It speaks only in SQL. Defeat its 3 coils by writing perfect queries!`,
      instructions: [
        'This is a 3-part boss fight! Write SQL queries to defeat each coil!'
      ],
      phases: [
        {
          title: 'Coil 1: Create a Table',
          instruction: 'Write a <code>CREATE TABLE</code> statement for <code>heroes</code> with columns: <code>id INTEGER PRIMARY KEY</code>, <code>name TEXT</code>, <code>level INTEGER</code>, <code>class TEXT</code>',
          starterCode: `-- Create the heroes table\nCREATE `,
          mcq: {
            question: "Which SQL statement correctly creates a table named heroes with id, name, level, and class columns?",
            options: [
              `CREATE TABLE heroes (id INTEGER PRIMARY KEY, name TEXT, level INTEGER, class TEXT);`,
              `CREATE heroes (id INT, name VARCHAR, level INT, class VARCHAR);`,
              `CREATE TABLE heroes (id PRIMARY KEY, name, level, class);`
            ],
            correctIndex: 0
          },
          solution: `CREATE TABLE heroes (id INTEGER PRIMARY KEY, name TEXT, level INTEGER, class TEXT);`,
          validator: 'sql_query',
          validationRules: {
            requiredKeywords: ['CREATE', 'TABLE', 'heroes'],
            containsText: ['id', 'name', 'level', 'class', 'PRIMARY KEY']
          }
        },
        {
          title: 'Coil 2: Complex Query',
          instruction: 'Write a SELECT query to find all heroes with <code>level > 10</code>, ordered by <code>level DESC</code>, <code>LIMIT 5</code>',
          starterCode: `-- Find top 5 high-level heroes\nSELECT `,
          mcq: {
            question: "Which SQL query selects all columns from heroes where level > 10, ordered from highest level to lowest, and limit of 5?",
            options: [
              `SELECT * FROM heroes WHERE level > 10 ORDER BY level DESC LIMIT 5;`,
              `SELECT * FROM heroes WHERE level > 10 ORDER BY level ASC LIMIT 5;`,
              `SELECT * FROM heroes LIMIT 5 WHERE level > 10 ORDER BY level DESC;`
            ],
            correctIndex: 0
          },
          solution: `SELECT * FROM heroes WHERE level > 10 ORDER BY level DESC LIMIT 5;`,
          validator: 'sql_query',
          validationRules: {
            requiredKeywords: ['SELECT', 'FROM', 'heroes', 'WHERE', 'ORDER BY', 'DESC', 'LIMIT'],
            containsText: ['level', '10', '5']
          }
        },
        {
          title: 'Coil 3: Subquery',
          instruction: 'Write a DELETE statement to remove all heroes WHERE <code>level</code> is less than the <code>AVG(level)</code> from the heroes table (use a subquery)',
          starterCode: `-- Delete heroes below average level\nDELETE `,
          mcq: {
            question: "Which SQL query deletes all heroes below the average level using a subquery?",
            options: [
              `DELETE FROM heroes WHERE level < (SELECT AVG(level) FROM heroes);`,
              `DELETE FROM heroes WHERE level < AVG(level);`,
              `DELETE heroes WHERE level < (SELECT average FROM heroes);`
            ],
            correctIndex: 0
          },
          solution: `DELETE FROM heroes WHERE level < (SELECT AVG(level) FROM heroes);`,
          validator: 'sql_query',
          validationRules: {
            requiredKeywords: ['DELETE', 'FROM', 'heroes', 'WHERE', 'AVG', 'SELECT'],
            containsText: ['level']
          }
        }
      ],
      hints: [
        'Coil 1: CREATE TABLE heroes (id INTEGER PRIMARY KEY, name TEXT, level INTEGER, class TEXT);',
        'Coil 2: SELECT * FROM heroes WHERE level > 10 ORDER BY level DESC LIMIT 5;',
        'Coil 3: DELETE FROM heroes WHERE level < (SELECT AVG(level) FROM heroes);'
      ]
    }
  ]
};

// Exported as module
