export const LANGUAGE_DICTIONARY = {
  html: [
    {
      name: '<div>',
      desc: 'Division element. A generic block-level container used to group and organize layout sections.',
      code: '<div class="profile-card">\n  <h2>John Doe</h2>\n  <p>Developer</p>\n</div>',
      tip: 'Avoid nested "div-soup". Use semantic tags like <section>, <header>, <main>, or <footer> for better SEO and accessibility.'
    },
    {
      name: '<a>',
      desc: 'Anchor element. Used to create hyperlinks to other web pages, files, or locations.',
      code: '<a href="https://example.com" target="_blank" rel="noopener">\n  Visit Website\n</a>',
      tip: 'Always include rel="noopener" when using target="_blank" to prevent security vulnerabilities and performance bottlenecks.'
    },
    {
      name: '<input>',
      desc: 'Form input field. Collects user data based on type (text, password, email, checkbox, etc.).',
      code: '<input type="email" placeholder="Enter email" required />',
      tip: 'Always associate an input with a <label> element using the "for" (or "htmlFor" in React) attribute to support screen readers.'
    },
    {
      name: '<img>',
      desc: 'Image embedder. Used to render graphic assets on the website.',
      code: '<img src="/logo.png" alt="Company Logo" width="120" height="40" />',
      tip: 'Always supply a descriptive "alt" tag for SEO and visually impaired users. Specify width/height to avoid layout shifts.'
    }
  ],
  css: [
    {
      name: 'display: flex',
      desc: 'Enables Flexbox, a one-dimensional layout model for aligning items in columns or rows.',
      code: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
      tip: 'Use flex-direction: column to stack items vertically on mobile viewports.'
    },
    {
      name: 'position',
      desc: 'Determines the positioning method used for an element (static, relative, absolute, fixed, sticky).',
      code: '.parent { position: relative; }\n.child {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}',
      tip: 'An absolute child positions itself relative to its nearest ancestor that has a position other than static (usually relative).'
    },
    {
      name: 'grid-template-columns',
      desc: 'Defines the column layout structure inside a CSS Grid container.',
      code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 16px;\n}',
      tip: 'Use repeat() with minmax() to create fully responsive grids that adapt dynamically without requiring media queries.'
    },
    {
      name: '@media',
      desc: 'Media queries. Applies CSS rules conditionally based on device size, resolution, or orientation.',
      code: '@media (max-width: 768px) {\n  .sidebar { display: none; }\n  .main { width: 100%; }\n}',
      tip: 'Adopt a mobile-first design strategy by writing standard CSS for mobile, then using media queries for larger viewports.'
    }
  ],
  sass: [
    {
      name: 'Variables ($)',
      desc: 'Declares reusable style values like colors, fonts, or padding spacing.',
      code: '$color-primary: #00f5ff;\n$spacing-md: 16px;\n\n.card {\n  color: $color-primary;\n  padding: $spacing-md;\n}',
      tip: 'Use standard CSS variables (--var) for values that change dynamically at runtime, and Sass variables for compilation-time constants.'
    },
    {
      name: 'Nesting',
      desc: 'Allows nesting CSS selectors inside one another, matching the HTML hierarchy.',
      code: '.nav {\n  background: #333;\n  li {\n    display: inline-block;\n    a { color: white; }\n  }\n}',
      tip: 'Avoid nesting selectors deeper than 3 levels to keep the compiled CSS file maintainable and performant.'
    },
    {
      name: '@mixin / @include',
      desc: 'Defines reusable blocks of CSS styling that accept parameters.',
      code: '@mixin flex-center($dir) {\n  display: flex;\n  flex-direction: $dir;\n  justify-content: center;\n  align-items: center;\n}\n\n.box { @include flex-center(row); }',
      tip: 'Use mixins for dynamic groups of properties that require arguments, and @extend for static, shared utility declarations.'
    },
    {
      name: '@use',
      desc: 'Imports functions, variables, and mixins from other Sass partial stylesheets.',
      code: '// _variables.scss\n$font-stack: sans-serif;\n\n// main.scss\n@use "variables";\nbody { font-family: variables.$font-stack; }',
      tip: 'Use @use instead of @import, as @import is deprecated and compiles selectors globally, which leads to naming conflicts.'
    }
  ],
  javascript: [
    {
      name: 'const / let',
      desc: 'Block-scoped variable declaration keywords. const defines read-only constants; let defines mutable variables.',
      code: 'const count = 10;\nlet index = 0;\nindex += 1; // Allowed\ncount = 5;  // Error!',
      tip: 'Default to const for variables that do not need to be reassigned. This signals clean intent and prevents mutations.'
    },
    {
      name: 'Arrow Functions (=>)',
      desc: 'A shorthand syntax for writing functions that lexically binds the "this" value.',
      code: 'const greet = (name) => `Hello, ${name}!`;\nconsole.log(greet("Alice"));',
      tip: 'Arrow functions do not have their own "this" context. Avoid using them as object methods if you need to reference "this".'
    },
    {
      name: 'Array.map()',
      desc: 'Creates a new array by transforming every element of the calling array with a callback function.',
      code: 'const nums = [1, 2, 3];\nconst doubled = nums.map(x => x * 2);\n// doubled is [2, 4, 6]',
      tip: 'Never modify the original array inside map(). Map is designed for pure transformations; use forEach() for side effects.'
    },
    {
      name: 'async / await',
      desc: 'Allows writing asynchronous, promise-based code using synchronous-looking flow controls.',
      code: 'async function fetchData() {\n  try {\n    const res = await fetch("https://api.com/users");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error(err);\n  }\n}',
      tip: 'Always wrap await statements in try/catch blocks to handle potential network errors or rejected promises.'
    }
  ],
  typescript: [
    {
      name: 'Interface',
      desc: 'Defines the structural blueprint of an object containing properties and typing constraints.',
      code: 'interface User {\n  id: number;\n  name: string;\n  email?: string; // Optional field\n}',
      tip: 'Use interfaces for public APIs and object layouts, as they support declaration merging and extends hierarchies.'
    },
    {
      name: 'Generics (<T>)',
      desc: 'Enables writing reusable components, structures, or functions that work with varying data types.',
      code: 'function getFirstElement<T>(arr: T[]): T {\n  return arr[0];\n}\nconst first = getFirstElement([1, 2, 3]); // returns number',
      tip: 'Generics let you enforce type safety without losing variable details (unlike using "any").'
    },
    {
      name: 'Type vs Interface',
      desc: 'Type aliases define shapes, unions, primitives, and intersection types; Interfaces map structural objects.',
      code: 'type Status = "idle" | "loading" | "success";\ntype ID = string | number;\ninterface Admin extends User { role: string; }',
      tip: 'Use type for unions, intersections, or primitive aliases. Use interface when extending object structures.'
    },
    {
      name: 'Enums',
      desc: 'Declares a set of named constants (numeric or string keys).',
      code: 'enum Role {\n  Guest = "GUEST",\n  User = "USER",\n  Admin = "ADMIN"\n}',
      tip: 'Consider string enums over numeric ones, as they render readable values inside logs and debuggers.'
    }
  ],
  json: [
    {
      name: 'Key-Value Pairs',
      desc: 'The fundamental building block of JSON. Keys must be enclosed in double quotes.',
      code: '{\n  "username": "coder_rpg",\n  "level": 5,\n  "isActive": true\n}',
      tip: 'Unlike JavaScript, trailing commas are invalid in JSON. Ensure key names are enclosed in double quotes.'
    },
    {
      name: 'Nested Objects',
      desc: 'JSON values can be another JSON object, enabling hierarchical schemas.',
      code: '{\n  "player": {\n    "name": "Alex",\n    "stats": { "hp": 100, "xp": 150 }\n  }\n}',
      tip: 'Keep structural nesting clean to optimize serialization speed and parsing footprint.'
    },
    {
      name: 'JSON Arrays',
      desc: 'Lists of ordered values enclosed inside square brackets.',
      code: '{\n  "languages": ["JavaScript", "TypeScript", "Python"],\n  "scores": [85, 90, 95]\n}',
      tip: 'Arrays can hold varying primitives or complex nested objects.'
    },
    {
      name: 'Data Types',
      desc: 'Values can be strings, numbers, objects, arrays, booleans, or null.',
      code: '{\n  "name": "Admin",\n  "age": 28,\n  "verified": true,\n  "notes": null\n}',
      tip: 'Functions, undefined, and dates are not valid JSON values. Dates must be serialized to ISO strings.'
    }
  ],
  xml: [
    {
      name: 'Custom Tags',
      desc: 'Markup elements defined by developers rather than preconfigured by specification.',
      code: '<user id="101">\n  <name>John</name>\n  <email>john@mail.com</email>\n</user>',
      tip: 'Always close tags, ensure correct nesting hierarchies, and keep tag naming conventions camelCase or lowercase.'
    },
    {
      name: 'Attributes',
      desc: 'Supplements tags with key-value parameters inside the opening brackets.',
      code: '<database host="localhost" port="3306" />',
      tip: 'Attribute values must always be quoted in XML.'
    },
    {
      name: 'XML Declaration',
      desc: 'Meta header declaring the document as XML, indicating version and encoding properties.',
      code: '<?xml version="1.0" encoding="UTF-8"?>',
      tip: 'The declaration must appear at the absolute start of the file, with no leading whitespace or empty lines.'
    },
    {
      name: 'CDATA Section',
      desc: 'Instructs parser to treat special characters (like <, >, &) as text content rather than markup markers.',
      code: '<script><![CDATA[\n  if (a < b && b < c) { doWork(); }\n]]></script>',
      tip: 'Useful when escaping code blocks or XML snippets inside XML tags.'
    }
  ],
  yaml: [
    {
      name: 'Indentation',
      desc: 'Structure is defined solely via space indentation rather than braces, brackets, or XML tags.',
      code: 'database:\n  host: localhost\n  port: 5432\n  credentials:\n    username: root',
      tip: 'Tabs are strictly forbidden in YAML. Always use spaces (usually 2 spaces per indentation level).'
    },
    {
      name: 'YAML Sequences (Lists)',
      desc: 'Arrays of list elements denoted by a leading dash (-).',
      code: 'environments:\n  - production\n  - staging\n  - development',
      tip: 'You can also write inline lists as [production, staging, development].'
    },
    {
      name: 'Key-Value Mapping',
      desc: 'Associates a key with a value using a colon followed by a space.',
      code: 'api_version: v1\nenable_logging: true',
      tip: 'The space after the colon is mandatory: "key:value" will fail compilation; "key: value" is correct.'
    },
    {
      name: 'Anchors (&) and Aliases (*)',
      desc: 'Enables reusing configuration properties across the file without duplication.',
      code: 'default_db: &db_config\n  host: localhost\n  port: 5432\n\nservice_db:\n  <<: *db_config\n  database: services',
      tip: 'Use anchors to define standard templates (like API credentials or server specs) and aliases to load them.'
    }
  ],
  markdown: [
    {
      name: 'Headers (#)',
      desc: 'Creates titles. Number of hash symbols (#) controls header levels (H1 to H6).',
      code: '# Main Header (H1)\n## Sub Section (H2)\n### Topic (H3)',
      tip: 'Always leave a space between the # symbols and the header text (e.g. "# Heading").'
    },
    {
      name: 'Links & Images',
      desc: 'Markup for anchors and image elements.',
      code: '[Click Link](https://google.com)\n![Alt Text](/logo.png)',
      tip: 'The exclamation mark prefix distinguishes an image embed from a standard hyperlink.'
    },
    {
      name: 'Lists',
      desc: 'Renders bulleted or ordered lists.',
      code: '- Bullet item 1\n- Bullet item 2\n\n1. Numbered item 1\n2. Numbered item 2',
      tip: 'Use standard indentation (2 or 4 spaces) to nest list elements.'
    },
    {
      name: 'Fenced Code Blocks',
      desc: 'Renders code snippets with syntax highlights.',
      code: '```js\nconst text = "Hello";\nconsole.log(text);\n```',
      tip: 'Supply the language identifier (like js, py, css, sql) next to the starting backticks to trigger highlighting.'
    }
  ],
  graphql: [
    {
      name: 'Query',
      desc: 'Declares client requests, defining the exact structure of data properties expected from the API.',
      code: 'query GetPlayer {\n  player(id: "1") {\n    name\n    level\n    inventory { itemTitle }\n  }\n}',
      tip: 'Queries prevent over-fetching. The server returns JSON matching the query layout exactly.'
    },
    {
      name: 'Mutation',
      desc: 'Invokes API calls designed to write, edit, or delete database details.',
      code: 'mutation SaveScore {\n  updateXp(userId: "10", xp: 15) {\n    success\n    newLevel\n  }\n}',
      tip: 'Mutations map to POST, PUT, and DELETE methods in REST paradigms.'
    },
    {
      name: 'Resolver',
      desc: 'The backend implementation logic responsible for fetching data for specific GraphQL fields.',
      code: 'const resolvers = {\n  Query: {\n    player: async (_, { id }) => {\n      return db.players.find(id);\n    }\n  }\n};',
      tip: 'Resolvers can retrieve details from SQL databases, NoSQL stores, local files, or external microservices.'
    },
    {
      name: 'Schema definition',
      desc: 'Declares the structural capabilities of the API by defining types, fields, queries, and mutations.',
      code: 'type Player {\n  id: ID!\n  name: String!\n  level: Int!\n}\n\ntype Query {\n  player(id: ID!): Player\n}',
      tip: 'The exclamation point (!) defines a field as Non-Null (mandatory).'
    }
  ],
  python: [
    {
      name: 'def (Function)',
      desc: 'Defines reusable blocks of code that accept arguments and return outputs.',
      code: 'def calculate_damage(attack, defense):\n    damage = attack - (defense * 0.5)\n    return max(damage, 0)\n\nresult = calculate_damage(20, 10)',
      tip: 'Python uses indentation to group code blocks. Always use 4 spaces consistently; mixing tabs and spaces causes IndentationError.'
    },
    {
      name: 'Lists & Dictionaries',
      desc: 'Fundamental collection types. Lists are ordered sequences; Dictionaries are key-value mappings.',
      code: 'languages = ["Python", "JavaScript"]\nplayer = {\n    "name": "Hero",\n    "hp": 100\n}',
      tip: 'Access dictionaries using .get(key, default) to prevent program crashes if the key does not exist.'
    },
    {
      name: 'List Comprehensions',
      desc: 'A concise syntax to generate or filter list collections.',
      code: 'numbers = [1, 2, 3, 4]\ndoubled_odds = [x * 2 for x in numbers if x % 2 != 0]\n# returns [2, 6]',
      tip: 'Do not write overly complex list comprehensions; prioritize readability over short lines.'
    },
    {
      name: 'with open()',
      desc: 'Safely manages resource allocation. Automatically closes files after operations complete.',
      code: 'with open("logs.txt", "w") as file:\n    file.write("Sandbox action logged")\n# file is auto-closed here',
      tip: 'Always use with statements for database connections, network streams, and filesystem read/writes.'
    }
  ],
  java: [
    {
      name: 'class',
      desc: 'The foundational blueprint of Java\'s object-oriented structure. Every line of execution must exist inside a class.',
      code: 'public class GameCharacter {\n  private String name;\n  \n  public GameCharacter(String name) {\n    this.name = name;\n  }\n}',
      tip: 'The primary public class name must exactly match the source code file name (e.g., class GameCharacter in GameCharacter.java).'
    },
    {
      name: 'public static void main',
      desc: 'The standard entry point method from which the JVM begins executing Java programs.',
      code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello Java!");\n  }\n}',
      tip: 'Learn the definitions: public (visible everywhere), static (executable without instantiating class), void (returns nothing).'
    },
    {
      name: 'Interface',
      desc: 'An abstract contract specifying method blueprints that implementing classes must fulfill.',
      code: 'interface Renderable {\n  void draw();\n}\n\nclass Sprite implements Renderable {\n  public void draw() { /* logic */ }\n}',
      tip: 'Classes can implement multiple interfaces, facilitating multiple inheritance designs.'
    },
    {
      name: 'Generics (<T>)',
      desc: 'Enables classes, interfaces, and methods to operate with different types while maintaining strong compile-time checks.',
      code: 'import java.util.ArrayList;\nArrayList<String> bag = new ArrayList<>();\nbag.add("Sword");\n// bag.add(10); // Compilation Error!',
      tip: 'Generics resolve the need for manual type casting and prevent runtime ClassCastException failures.'
    }
  ],
  csharp: [
    {
      name: 'Namespace',
      desc: 'Organizes classes and logical structures inside namespaces, avoiding scoping collisions.',
      code: 'namespace CodeQuest.Game {\n  public class Warrior {\n    // ...\n  }\n}',
      tip: 'Load elements from namespaces using the "using" declaration (e.g. using System;).'
    },
    {
      name: 'Properties (get/set)',
      desc: 'Syntactic sugar to expose class properties while maintaining secure encapsulation rules.',
      code: 'public class Player {\n  public string Name { get; set; }\n  public int Health { get; private set; } = 100;\n}',
      tip: 'Set access modifiers on getter/setter blocks (e.g. private set) to restrict external mutability.'
    },
    {
      name: 'LINQ',
      desc: 'Language Integrated Query. Declarative query methods for checking, filtering, or mapping collections.',
      code: 'using System.Linq;\nint[] scores = { 90, 45, 99, 80 };\nvar highScores = scores.Where(s => s >= 80).OrderByDescending(s => s);\n// [99, 90, 80]',
      tip: 'LINQ makes database and array iterations extremely concise, but can cause performance overhead inside tight loops.'
    },
    {
      name: 'async / await',
      desc: 'Leverages thread pooling and Tasks to handle non-blocking asynchronous operations.',
      code: 'using System.Threading.Tasks;\n\npublic async Task<string> DownloadDataAsync() {\n  var client = new HttpClient();\n  return await client.GetStringAsync("https://api.com");\n}',
      tip: 'Avoid using "async void" (except inside Event Handlers), as exceptions cannot be caught by callers.'
    }
  ],
  go: [
    {
      name: 'package main',
      desc: 'Declares the executable compiler entry package. Executable programs must live inside package main.',
      code: 'package main\n\nimport "fmt"\n\nfunc main() {\n  fmt.Println("Gopher power")\n}',
      tip: 'The main package must declare a func main() which takes no parameters and returns nothing.'
    },
    {
      name: 'Goroutines',
      desc: 'Concurrent, lightweight execution threads managed by Go\'s runtime scheduler.',
      code: 'func calculate() {\n  // computation\n}\n\nfunc main() {\n  go calculate() // Launches concurrently\n}',
      tip: 'Goroutines are extremely light, costing only ~2KB of stack space. You can easily spawn thousands of them.'
    },
    {
      name: 'Channels (chan)',
      desc: 'Type-safe pipelines used to communicate and synchronize data transfer between concurrent Goroutines.',
      code: 'ch := make(chan string)\ngo func() {\n  ch <- "Data sent"\n}()\nmsg := <-ch // blocks until data arrives',
      tip: 'Do not communicate by sharing memory; share memory by communicating (use channels instead of mutexes).'
    },
    {
      name: 'Structs & Interfaces',
      desc: 'Go is not class-based. It uses Structs for data schemas and Interfaces for behavior contracts.',
      code: 'type Fighter struct {\n  Name string\n}\n\ntype Attacker interface {\n  Attack() int\n}',
      tip: 'Interfaces are implemented implicitly. You do not write "implements" in Go; implementing the methods is sufficient.'
    }
  ],
  rust: [
    {
      name: 'let mut (Mutability)',
      desc: 'Variables are immutable by default in Rust. Declaring mutability requires the "mut" keyword.',
      code: 'let x = 5;      // Immutable\nlet mut y = 10; // Mutable\ny += 5;         // Allowed',
      tip: 'Defaulting to immutability guarantees thread-safety and prevents accidental data mutations.'
    },
    {
      name: 'Borrow Checker (&)',
      desc: 'Rust\'s core memory manager. Enforces strict rules: you can have either multiple read-only references (&T) OR a single mutable reference (&mut T) at any time.',
      code: 'let mut msg = String::from("Hi");\nlet ref1 = &msg;\nlet ref2 = &msg; // Ok\n// let ref_mut = &mut msg; // Compiler Error!',
      tip: 'The borrow checker guarantees compile-time memory safety and eliminates data races without using a garbage collector.'
    },
    {
      name: 'pattern matching (match)',
      desc: 'A powerful, compiler-validated control flow operator that matches expressions against patterns.',
      code: 'enum State { Active, Idle }\n\nmatch current_state {\n  State::Active => println!("Action!"),\n  State::Idle => println!("Sleep"),\n}',
      tip: 'Match expressions are exhaustive: the compiler forces you to cover every single possible pattern branch.'
    },
    {
      name: 'Option<T> & Result<T, E>',
      desc: 'Core types wrapping potential null values (Option) or operation successes/failures (Result).',
      code: 'fn divide(a: f64, b: f64) -> Result<f64, String> {\n  if b == 0.0 { Err("Divide by zero".into()) }\n  else { Ok(a / b) }\n}',
      tip: 'Rust has no "null" values. This completely eliminates NullPointerException bugs at runtime.'
    }
  ],
  php: [
    {
      name: '<?php ... ?>',
      desc: 'The tags that delimit PHP code blocks from standard static HTML markup.',
      code: '<p>Standard HTML</p>\n<?php\n  echo "Dynamic PHP Output";\n?>',
      tip: 'If a file contains only PHP code, omit the closing ?> tag to prevent accidental whitespaces in responses.'
    },
    {
      name: 'Variables ($)',
      desc: 'PHP variables are weakly typed and must start with a dollar sign ($).',
      code: '$username = "coder_99";\n$gold = 150;\n$gold += 50;',
      tip: 'Variable names are case-sensitive ($User and $user are different variables).'
    },
    {
      name: 'Associative Arrays',
      desc: 'Arrays containing key-value mappings (similar to maps or hashes in other languages).',
      code: '$inventory = [\n  "sword" => "Iron Blade",\n  "damage" => 45\n];\necho $inventory["sword"];',
      tip: 'PHP associative arrays are highly flexible and serve as objects, lists, and lookup tables.'
    },
    {
      name: 'Composer',
      desc: 'The standard dependency manager for PHP libraries and frameworks (like Laravel or Symfony).',
      code: '// Run in terminal:\n// composer require monolog/monolog',
      tip: 'Always define a composer.json file to manage external dependencies.'
    }
  ],
  ruby: [
    {
      name: 'Implicit Return',
      desc: 'Methods automatically return the value of the last evaluated expression without requiring a "return" keyword.',
      code: 'def add(a, b)\n  a + b # Auto returns result\nend',
      tip: 'Only write the "return" keyword explicitly if you need to exit a method early.'
    },
    {
      name: 'Blocks & yield',
      desc: 'Anonymous chunks of code passed into methods, invoked using the yield keyword.',
      code: 'def perform_twice\n  yield\n  yield\nend\n\nperform_twice { puts "Attack!" }',
      tip: 'Blocks are central to Ruby; they power iterators like .each, .map, and .select.'
    },
    {
      name: 'Everything is an Object',
      desc: 'Even basic numbers, classes, and strings are instances of objects and support methods.',
      code: '5.times { puts "Hello" }\n"ruby".capitalize # "Ruby"\n-10.abs # 10',
      tip: 'This makes Ruby elegant, expressive, and highly human-readable.'
    },
    {
      name: 'Gems & Bundler',
      desc: 'Gems are Ruby libraries. Bundler manages these dependencies using a Gemfile.',
      code: '# Gemfile\nsource "https://rubygems.org"\ngem "rails", "~> 7.0"',
      tip: 'Use `bundle install` to compile and locking package dependencies.'
    }
  ],
  kotlin: [
    {
      name: 'val vs var',
      desc: 'val defines read-only variables (like final in Java); var defines mutable, reassignable variables.',
      code: 'val maxHp = 100\nvar currentHp = 50\ncurrentHp += 10\n// maxHp = 200 // Compiler Error!',
      tip: 'Default to val. This reduces state corruption risks and aligns with functional coding practices.'
    },
    {
      name: 'Null Safety (?)',
      desc: 'Enforces compile-time checks on variables that can hold null values, avoiding null pointers.',
      code: 'var name: String = "Alex" // Cannot be null\nvar nick: String? = null  // Optional\n\nprintln(nick?.length) // Safe call (?.) returns null or length',
      tip: 'Use the Elvis operator (?:) to supply fallback values if a nullable variable evaluates to null (e.g. val len = nick?.length ?: 0).'
    },
    {
      name: 'Coroutines',
      desc: 'Lightweight threads designed to process non-blocking background tasks asynchronously.',
      code: 'import kotlinx.coroutines.*\n\nfun main() = runBlocking {\n  launch {\n    delay(1000L)\n    println("World!")\n  }\n  println("Hello")\n}',
      tip: 'Coroutines use suspend functions to pause execution threads without freezing UI loops.'
    },
    {
      name: 'Data Class',
      desc: 'A class designed solely to hold data. Automatically generates equals(), hashCode(), and toString() utilities.',
      code: 'data class Hero(val name: String, val level: Int)',
      tip: 'Data classes automatically include copy() methods to easily clone objects with modifications.'
    }
  ],
  swift: [
    {
      name: 'let vs var',
      desc: 'let defines constants (read-only); var defines mutable, reassignable variables.',
      code: 'let speed = 9.8\nvar userScore = 0\nuserScore += 5',
      tip: 'Always default to let for variables that do not need to be mutated.'
    },
    {
      name: 'Optionals (?)',
      desc: 'Swift types that can either hold a value OR be nil (no value).',
      code: 'var rank: String? = nil\nrank = "Legend"\n\nif let actualRank = rank {\n  print("Player rank: \\(actualRank)") // Safe unwrapping\n}',
      tip: 'Use optional binding (if let / guard let) to safely access optionals without causing runtime crashes.'
    },
    {
      name: 'Structures vs Classes',
      desc: 'Structs are value types (copied when passed); Classes are reference types (shared pointer references).',
      code: 'struct Vector {\n  var x, y: Double\n}\nclass Warrior {\n  var name: String\n  init(name: String) { self.name = name }\n}',
      tip: 'Default to Structs for simple data models. Use classes if you require inheritance or shared instances.'
    },
    {
      name: 'SwiftUI',
      desc: 'Apple\'s modern declarative framework for building user interfaces across iOS and macOS.',
      code: 'import SwiftUI\n\nstruct ContentView: View {\n  var body: some View {\n    Text("Hello, World!")\n  }\n}',
      tip: 'SwiftUI relies heavily on struct compositions and state property wrappers like @State.'
    }
  ],
  dart: [
    {
      name: 'void main()',
      desc: 'The mandatory starting entry point method for Dart execution programs.',
      code: 'void main() {\n  print("Dart initialized");\n}',
      tip: 'The main function executes at the absolute start of app mounting loops.'
    },
    {
      name: 'Null Safety',
      desc: 'Variables cannot contain null values unless explicitly declared nullable using a question mark (?).',
      code: 'String name = "Hero";\nString? guild = null;\nprint(guild?.length); // Safe access',
      tip: 'Use the null-assertion operator (!) to force unwrap a value, but ensure it is not null to avoid runtime exceptions.'
    },
    {
      name: 'async / await',
      desc: 'Powers asynchronous tasks returning Future or Stream outputs.',
      code: 'Future<String> fetchUser() async {\n  return await Future.delayed(Duration(seconds: 2), () => "Alex");\n}',
      tip: 'Always declare the async modifier on the function signature when using await inside code bodies.'
    },
    {
      name: 'final vs const',
      desc: 'final sets runtime immutable fields (evaluated once at runtime); const sets compile-time constants.',
      code: 'final DateTime now = DateTime.now();\nconst double pi = 3.14159;',
      tip: 'Use const for widgets or layout properties that never change, optimizing execution memory.'
    }
  ],
  elixir: [
    {
      name: 'Pipes (|>)',
      desc: 'Passes the output of the left expression as the first argument to the right function call.',
      code: '"hello world"\n|> String.upcase()\n|> String.split()\n# returns ["HELLO", "WORLD"]',
      tip: 'Use pipes to write clear, sequential data transformations instead of nested function calls.'
    },
    {
      name: 'Pattern Matching (=)',
      desc: 'The equal sign (=) is not an assignment, it is a pattern match. It evaluates matching values.',
      code: '{status, msg} = {:ok, "Loaded"}\n# status is :ok, msg is "Loaded"\n# {status, _} = {:error, "Fail"} # matches error',
      tip: 'Use the underscore (_) to discard values you do not need in a match.'
    },
    {
      name: 'Immutable State',
      desc: 'Elixir variables are completely immutable. Modifying state returns a brand new data variable.',
      code: 'list = [1, 2]\nnew_list = [0 | list]\n# list remains [1, 2]; new_list is [0, 1, 2]',
      tip: 'Immutability eliminates side-effects, making concurrent multi-threaded applications safe to write.'
    },
    {
      name: 'Processes (spawn)',
      desc: 'All code in Elixir runs inside lightweight, isolated processes. They communicate via messaging.',
      code: 'spawn(fn ->\n  send(self(), {:ok, "Done"})\nend)',
      tip: 'Elixir processes are managed by the BEAM virtual machine, independent of the underlying operating system threads.'
    }
  ],
  scala: [
    {
      name: 'Case Classes',
      desc: 'Immutable, lightweight data classes designed with native pattern matching capabilities.',
      code: 'case class Hero(name: String, level: Int)\nval player = Hero("Alex", 10)',
      tip: 'Case classes compare values by structure, not by memory references, simplifying comparisons.'
    },
    {
      name: 'Pattern Matching',
      desc: 'A robust selection mechanism matching structural configurations or types.',
      code: 'val result = matchVal match {\n  case 1 => "One"\n  case "test" => "String test"\n  case _ => "Default"\n}',
      tip: 'Scala pattern matching compiles to high-performance branch tables.'
    },
    {
      name: 'Traits',
      desc: 'Similar to Java interfaces, traits enable abstract structures that can also contain concrete method definitions.',
      code: 'trait Attacker {\n  def attackDamage: Int\n  def printAttack() = println("Attacking!")\n}',
      tip: 'Classes can mix in multiple traits using the "with" keyword (e.g., class Mage extends Character with SpellCaster).'
    },
    {
      name: 'object (Singleton)',
      desc: 'Defines a class that has exactly one structural instance.',
      code: 'object GameEngine {\n  val version = "1.0"\n  def run() = { /* ... */ }\n}',
      tip: 'Use companion objects next to classes to group static variables or factory methods.'
    }
  ],
  perl: [
    {
      name: 'Sigils ($, @, %)',
      desc: 'Perl variables are prefixed with characters indicating their data types ($ for scalar, @ for array, % for hash).',
      code: 'my $hp = 100;\nmy @weapons = ("Sword", "Bow");\nmy %stats = ("xp" => 500, "level" => 5);',
      tip: 'Scalars store strings/numbers, arrays hold indexed sequences, and hashes store key-value relationships.'
    },
    {
      name: 'Regular Expressions (Regex)',
      desc: 'Highly optimized regex matching engines built directly into Perl\'s syntax core.',
      code: 'my $text = "Level: 25";\nif ($text =~ /Level: (\\d+)/) {\n  print "Level is $1\\n";\n}',
      tip: 'Use binding operators (=~ for match, !~ for no match) to evaluate search expressions.'
    },
    {
      name: 'CPAN',
      desc: 'Comprehensive Perl Archive Network. A massive repository containing over 250,000 community modules.',
      code: '# Install in terminal:\n# cpanm install JSON',
      tip: 'Use standard tool managers like cpanminus (cpanm) to install dependencies safely.'
    },
    {
      name: 'my (Scoping)',
      desc: 'Declares lexical variables scoped strictly to the enclosing block, file, or evaluation loop.',
      code: 'sub run {\n  my $temp = 10; # local scope\n}',
      tip: 'Always include "use strict;" and "use warnings;" at the top of your scripts to enforce lexical variables.'
    }
  ],
  haskell: [
    {
      name: 'Pure Functions',
      desc: 'Functions have no side-effects and always return the same output for the same input.',
      code: 'add :: Int -> Int -> Int\nadd x y = x + y',
      tip: 'Haskell functions are pure, facilitating mathematical verification and safe parallelism.'
    },
    {
      name: 'Lazy Evaluation',
      desc: 'Expressions are not computed until their outputs are explicitly required by other execution branches.',
      code: 'ones = 1 : ones # Infinite list of 1s\ntake 5 ones # returns [1, 1, 1, 1, 1]',
      tip: 'Lazy evaluation lets you define infinite data structures without causing stack overflows.'
    },
    {
      name: 'Type Signatures (::)',
      desc: 'Explicit declarations specifying parameter typing constraints for methods and constants.',
      code: 'isEven :: Int -> Bool\nisEven x = x `mod` 2 == 0',
      tip: 'Haskell has robust type inference, but specifying signatures serves as self-documenting guides.'
    },
    {
      name: 'Monads (IO)',
      desc: 'Structures that encapsulate side effects (like console logs or file operations) inside a pure pipeline framework.',
      code: 'main :: IO ()\nmain = do\n  putStrLn "Enter name:"\n  name <- getLine\n  putStrLn ("Hi " ++ name)',
      tip: 'Use the "do" notation block to write IO sequences in a readable, sequential layout.'
    }
  ],
  c: [
    {
      name: '#include',
      desc: 'Preprocessor directive importing standard header declarations (like input-output streams or utilities).',
      code: '#include <stdio.h>\n\nint main() {\n  printf("Standard input output");\n  return 0;\n}',
      tip: 'Use angle brackets <> for system library headers, and quotes "" for local developer headers.'
    },
    {
      name: 'Pointers (*)',
      desc: 'Variables that store the direct memory address of another variable.',
      code: 'int health = 100;\nint *ptr = &health; // ptr stores address of health\n*ptr = 80;         // updates health value to 80',
      tip: 'Pointers are extremely fast but dangerous. Dereferencing an uninitialized or NULL pointer causes Segmentation Faults.'
    },
    {
      name: 'malloc / free',
      desc: 'Standard library methods responsible for manual dynamic memory allocation and release.',
      code: 'int *arr = (int*)malloc(10 * sizeof(int));\n// use array\nfree(arr); // Free memory allocated',
      tip: 'Always free allocated buffers. Forgetting to free memory leads to system Memory Leaks.'
    },
    {
      name: 'struct',
      desc: 'User-defined structures wrapping differing primitive datatypes into a single custom type.',
      code: 'struct Character {\n  char name[50];\n  int level;\n};',
      tip: 'In C, structures do not support member functions; they only hold data properties.'
    }
  ],
  cpp: [
    {
      name: 'std::cout',
      desc: 'The standard character output stream handler belonging to the iostream library.',
      code: '#include <iostream>\n\nint main() {\n  std::cout << "Hello C++!" << std::endl;\n  return 0;\n}',
      tip: 'Use std::endl instead of "\\n" if you explicitly need to flush the output buffer stream immediately.'
    },
    {
      name: 'Vectors (std::vector)',
      desc: 'Dynamic arrays that grow or shrink automatically when items are appended.',
      code: '#include <vector>\nstd::vector<int> levels = {1, 2, 3};\nlevels.push_back(4); // appends 4',
      tip: 'Vectors store elements contiguously in memory, ensuring fast index lookups.'
    },
    {
      name: 'Classes & OOP',
      desc: 'Extends C structures with object-oriented mechanics including private modifiers and inheritance.',
      code: 'class Mage {\nprivate:\n  int mana;\npublic:\n  void castSpell() { /* ... */ }\n};',
      tip: 'Use destructors (~ClassName) to clean up memory structures when an object is destroyed.'
    },
    {
      name: 'Smart Pointers',
      desc: 'Wraps raw pointers to manage memory lifetimes, automatically freeing allocations when pointers go out of scope.',
      code: '#include <memory>\nstd::unique_ptr<int> ptr = std::make_unique<int>(10);',
      tip: 'Use smart pointers (unique_ptr, shared_ptr) to eliminate manual delete requirements and memory leaks.'
    }
  ],
  sql: [
    {
      name: 'SELECT',
      desc: 'Retrieves selected data attributes from one or more database tables.',
      code: 'SELECT name, level\nFROM players\nWHERE level >= 10\nORDER BY level DESC;',
      tip: 'Avoid "SELECT *". Select only the specific columns you need to optimize database bandwidth.'
    },
    {
      name: 'JOIN',
      desc: 'Merges records from two or more tables based on a related key column.',
      code: 'SELECT users.name, items.item_title\nFROM users\nJOIN items ON users.id = items.owner_id;',
      tip: 'Understand matching behaviors: INNER JOIN (matches only), LEFT JOIN (returns all left-table records).'
    },
    {
      name: 'GROUP BY',
      desc: 'Aggregates table data based on column mappings, enabling calculations like SUM, AVG, or COUNT.',
      code: 'SELECT role, COUNT(*)\nFROM team_members\nGROUP BY role;',
      tip: 'Filter aggregated statistics using the HAVING clause instead of the standard WHERE clause.'
    },
    {
      name: 'FOREIGN KEY',
      desc: 'Creates a relationship link constraint between columns in two tables, securing referential integrity.',
      code: 'CREATE TABLE orders (\n  order_id INT PRIMARY KEY,\n  user_id INT,\n  FOREIGN KEY (user_id) REFERENCES users(id)\n);',
      tip: 'Foreign keys block orphaned records (e.g. creating an order for a user ID that does not exist).'
    }
  ],
  mysql: [
    {
      name: 'LIMIT',
      desc: 'Restricts the maximum number of rows returned in the query response.',
      code: 'SELECT name, score\nFROM rankings\nORDER BY score DESC\nLIMIT 10;',
      tip: 'Use LIMIT combined with OFFSET to implement pagination in web applications.'
    },
    {
      name: 'AUTO_INCREMENT',
      desc: 'Automatically generates a unique sequential integer primary key when appending new rows.',
      code: 'CREATE TABLE logs (\n  id INT AUTO_INCREMENT PRIMARY KEY,\n  msg VARCHAR(255)\n);',
      tip: 'Only one AUTO_INCREMENT column is allowed per table, and it must be indexed as a key.'
    },
    {
      name: 'EXPLAIN',
      desc: 'Analyzes query execution plans, explaining index lookups and join paths.',
      code: 'EXPLAIN SELECT * FROM users WHERE email = "test@mail.com";',
      tip: 'Use EXPLAIN to find bottlenecks, verifying if queries perform fast index scans or slow full-table scans.'
    },
    {
      name: 'INDEX',
      desc: 'Creates lookup structures on columns to speed up query execution speeds.',
      code: 'CREATE INDEX idx_user_email ON users(email);',
      tip: 'Indexes speed up reading data, but slow down writes (INSERT, UPDATE) because the index tree must update.'
    }
  ],
  sqlite: [
    {
      name: 'Serverless File-based',
      desc: 'Unlike server-based RDBMS, SQLite compiles databases into a single local disk file.',
      code: '-- No connection string credentials needed.\n-- Read/writes executed directly to database.sqlite file.',
      tip: 'SQLite is great for mobile storage, configurations, and testing, but lacks concurrent write scaling.'
    },
    {
      name: 'Dynamic Typing',
      desc: 'SQLite permits storing any datatype value into any column, regardless of the column\'s declared datatype schema.',
      code: 'CREATE TABLE config (name TEXT, val INT);\nINSERT INTO config VALUES ("key", "not_an_int"); // Allowed!',
      tip: 'The exception is INTEGER PRIMARY KEY columns, which strictly force integer validations.'
    },
    {
      name: 'PRAGMA',
      desc: 'SQLite-specific command utility used to configure engine attributes or run health analysis.',
      code: 'PRAGMA foreign_keys = ON; -- Enforce foreign keys\nPRAGMA integrity_check; -- Check database health',
      tip: 'Always run PRAGMA foreign_keys = ON on connection pools, as SQLite disables foreign keys by default.'
    },
    {
      name: 'Memory Database',
      desc: 'Creates transient, ultra-fast databases entirely inside memory.',
      code: '-- Connect to memory string path:\n-- "jdbc:sqlite::memory:" or filename ":memory:"',
      tip: 'Perfect for unit testing as it resets automatically when the connection closes.'
    }
  ],
  postgresql: [
    {
      name: 'JSONB Columns',
      desc: 'Stores structured, schema-free JSON data inside a binary format, allowing indexing and queries.',
      code: 'SELECT name FROM profiles\nWHERE metadata->>\'status\' = \'active\';',
      tip: 'Use JSONB (binary version) instead of standard JSON type, as JSONB parses faster and supports GIN indexes.'
    },
    {
      name: 'RETURNING',
      desc: 'Returns data fields from modified rows immediately upon completing INSERT, UPDATE, or DELETE tasks.',
      code: 'INSERT INTO players (name, level)\nVALUES ("Alex", 1)\nRETURNING id, created_at;',
      tip: 'Eliminates the need to run extra SELECT queries to retrieve auto-generated primary key IDs.'
    },
    {
      name: 'Window Functions',
      desc: 'Performs calculations across rows related to the current row without merging them (retaining raw rows).',
      code: 'SELECT name, score,\nRANK() OVER (ORDER BY score DESC) as ranking\nFROM users;',
      tip: 'Window functions use the OVER clause. They compute aggregations without grouping results.'
    },
    {
      name: 'UPSERT (ON CONFLICT)',
      desc: 'Updates row parameters if a record constraint exists, otherwise inserts a new row.',
      code: 'INSERT INTO stats (player_id, gold)\nVALUES (1, 100)\nON CONFLICT (player_id)\nDO UPDATE SET gold = stats.gold + EXCLUDED.gold;',
      tip: 'ON CONFLICT requires a unique index constraint to match collisions.'
    }
  ],
  mongodb: [
    {
      name: 'Documents & BSON',
      desc: 'MongoDB stores data as JSON-like documents called BSON (Binary JSON), organizing them inside Collections.',
      code: 'db.players.insertOne({\n  name: "Hero",\n  inventory: ["Sword", "Shield"],\n  level: 1\n});',
      tip: 'Documents are schema-free: different records inside the same collection can have differing fields.'
    },
    {
      name: 'db.collection.find()',
      desc: 'Queries documents in a collection using filter parameters.',
      code: 'db.players.find({\n  level: { $gte: 10 },\n  inventory: "Sword"\n});',
      tip: 'Use query operators like $gte (greater than or equal), $lte, $in, and $or to construct query logic.'
    },
    {
      name: 'db.collection.updateOne()',
      desc: 'Modifies fields inside matched documents using update operator commands.',
      code: 'db.players.updateOne(\n  { name: "Hero" },\n  { $inc: { level: 1 }, $push: { inventory: "Axe" } }\n);',
      tip: 'Always use operations like $set, $inc, $push, or $pull rather than passing full replacement objects.'
    },
    {
      name: 'Aggregation Pipeline',
      desc: 'Passes documents through sequential stages (filtering, grouping, transforming) to compute complex reports.',
      code: 'db.players.aggregate([\n  { $match: { level: { $gt: 5 } } },\n  { $group: { _id: "$level", count: { $sum: 1 } } }\n]);',
      tip: 'Aggregations are the NoSQL alternative to SQL GROUP BY and JOIN queries.'
    }
  ],
  redis: [
    {
      name: 'In-Memory Cache (SET/GET)',
      desc: 'Stores key-value configurations inside system memory for ultra-fast (sub-millisecond) reading speeds.',
      code: 'SET player:101:name "Alex"\nGET player:101:name -- returns "Alex"',
      tip: 'Redis is heavily used to cache database results, user sessions, and rate-limiting counters.'
    },
    {
      name: 'Key Expiration (EX)',
      desc: 'Sets a time-to-live (TTL) limit on keys. Keys auto-delete after the limit expires.',
      code: 'SET session:token "9218a" EX 3600 -- expires in 1 hour\nTTL session:token -- returns remaining seconds',
      tip: 'Expiration limits prevent memory leaks inside dynamic cache datasets.'
    },
    {
      name: 'Hashes (HSET/HGET)',
      desc: 'Stores structured field-value maps under a single parent key, representing objects.',
      code: 'HSET hero:1 name "Lancelot" class "Warrior" gold 500\nHGET hero:1 name -- returns "Lancelot"',
      tip: 'Hashes utilize memory extremely efficiently compared to storing string-serialized JSON blobs.'
    },
    {
      name: 'Sorted Sets (ZADD/ZRANGE)',
      desc: 'Sets containing distinct values associated with score floats, auto-sorted by score.',
      code: 'ZADD leaderboard 1500 "PlayerA"\nZADD leaderboard 2200 "PlayerB"\nZRANGE leaderboard 0 -1 WITHSCORES -- returns sorted list',
      tip: 'Sorted sets are perfect for real-time leaderboard ranks and priority scheduling queues.'
    }
  ],
  cassandra: [
    {
      name: 'Wide-Column Schema',
      desc: 'A distributed database storing data across wide rows partitioned across cluster rings.',
      code: 'CREATE TABLE player_sessions (\n  player_id uuid,\n  session_id timeuuid,\n  action text,\n  PRIMARY KEY (player_id, session_id)\n);',
      tip: 'Designed for high-velocity writes (like logging actions, sensors, or messages) across distributed nodes.'
    },
    {
      name: 'Partition Key',
      desc: 'The primary component of the PRIMARY KEY structure that determines which cluster node stores the row.',
      code: '-- In PRIMARY KEY (player_id, session_id):\n-- player_id is the Partition Key.\n-- session_id is the Clustering Column.',
      tip: 'Queries must supply the partition key to avoid slow scans across the entire cluster network.'
    },
    {
      name: 'Clustering Column',
      desc: 'Determines the sorting order of data stored inside a single node partition block.',
      code: 'CREATE TABLE leaderboard (\n  game_id text,\n  score int,\n  player_id text,\n  PRIMARY KEY (game_id, score)\n) WITH CLUSTERING ORDER BY (score DESC);',
      tip: 'Allows reading pre-sorted ranges within seconds (e.g., pulling the top 10 scores for a game ID).'
    },
    {
      name: 'CQL (Cassandra Query Language)',
      desc: 'The SQL-like command syntax used to manipulate and search Cassandra data.',
      code: 'SELECT * FROM player_sessions WHERE player_id = 92a7...;',
      tip: 'CQL looks like SQL but forbids JOINS, subqueries, and grouping parameters to ensure fast retrieval speeds.'
    }
  ],
  neo4j: [
    {
      name: 'Nodes ()',
      desc: 'Entities inside a graph representing objects or records, encapsulated inside parentheses.',
      code: 'CREATE (p:Player {name: "Alex", level: 10})',
      tip: 'Nodes can hold multiple labels (e.g., Player, Admin) and parameter properties.'
    },
    {
      name: 'Relationships []',
      desc: 'Directed links connecting nodes, encapsulated inside brackets with arrows denoting direction.',
      code: 'MATCH (p:Player), (g:Guild)\nWHERE p.name = "Alex" AND g.title = "Knights"\nCREATE (p)-[r:MEMBER_OF {rank: "Captain"}]->(g)',
      tip: 'Relationships must have a type and a direction, and can also hold property parameters.'
    },
    {
      name: 'MATCH Query',
      desc: 'Searches the database for specific graph topological patterns.',
      code: 'MATCH (p:Player)-[:MEMBER_OF]->(g:Guild {title: "Knights"})\nRETURN p.name;',
      tip: 'Neo4j uses index-free adjacency: finding connections takes milliseconds regardless of database scale.'
    },
    {
      name: 'Cypher Language',
      desc: 'The graph query language used by Neo4j, using visual ASCII art to match paths.',
      code: 'MATCH path = (a:Player)-[:FRIEND*1..3]-(b:Player)\nRETURN path LIMIT 5;',
      tip: 'Cypher matches paths visually: (node)-[relationship]->(node).'
    }
  ],
  bash: [
    {
      name: 'Variables',
      desc: 'Declares scripting variables. Variables are untyped and must not have spaces around the equals sign.',
      code: 'NAME="Antigravity"\necho $NAME\n# Note: NO spaces in NAME="value"',
      tip: 'Access variable values using the dollar sign ($). Quote variables (e.g., "$NAME") to prevent word-splitting.'
    },
    {
      name: 'Command Substitution',
      desc: 'Saves output commands directly into variables.',
      code: 'CURRENT_DIR=$(pwd)\nDATE_STR=$(date +%Y-%m-%d)\necho "Running in $CURRENT_DIR"',
      tip: 'Always use $(command) over the deprecated backtick syntax `command`.'
    },
    {
      name: 'Pipes (|)',
      desc: 'Passes the stdout text stream of a command as the stdin of the next command.',
      code: 'cat logs.txt | grep "ERROR" | wc -l',
      tip: 'Allows chaining simple commands to solve complex text filtering tasks.'
    },
    {
      name: 'Redirects (>, >>)',
      desc: 'Redirects command streams into files. > overwrites target files; >> appends parameters.',
      code: 'echo "Log message" >> audit.log\ncat file.txt > copy.txt',
      tip: 'Redirect error streams using 2> (e.g. command 2> error.log).'
    }
  ],
  r: [
    {
      name: 'Vectors',
      desc: 'The fundamental one-dimensional data structure in R, holding elements of the same type.',
      code: 'scores <- c(90, 85, 95, 100)\nnames <- c("Alex", "Bob")\nmean_score <- mean(scores)',
      tip: 'The arrow operator (<-) is the standard assignment operator in R.'
    },
    {
      name: 'Data Frames',
      desc: 'Two-dimensional table structures storing varying data types in columns (like SQL tables).',
      code: 'df <- data.frame(\n  player = c("Alex", "Bob"),\n  score = c(95, 80)\n)\nprint(df$score)',
      tip: 'Access columns using the dollar ($) indicator (e.g. df$column).'
    },
    {
      name: 'Plotting (ggplot2)',
      desc: 'Declares graphic models based on the Grammar of Graphics.',
      code: 'library(ggplot2)\nggplot(df, aes(x=player, y=score)) + geom_bar(stat="identity")',
      tip: 'Use standard library ggplot2 for clean data visualizations.'
    },
    {
      name: 'List structure',
      desc: 'A flexible array structure that can hold elements of differing types.',
      code: 'player_profile <- list(name = "Hero", level = 5, scores = c(10, 15))',
      tip: 'Lists can hold vectors, matrices, data frames, or other nested lists.'
    }
  ],
  matlab: [
    {
      name: 'Matrices',
      desc: 'The fundamental variable structure in MATLAB; everything is treated as a matrix.',
      code: 'A = [1 2; 3 4]; % 2x2 matrix\nB = [5 6; 7 8];\nC = A * B;      % Matrix multiplication',
      tip: 'Use semicolons (;) at the end of statements to suppress command output logging.'
    },
    {
      name: 'Element-wise Operators (.*)',
      desc: 'Executes mathematical actions element-by-element rather than linear matrix operations.',
      code: 'A = [1 2; 3 4];\nB = [5 6; 7 8];\nD = A .* B; % element-wise multiplication\n% D is [5 12; 21 32]',
      tip: 'Precede math operators with a dot (.) to execute element-by-element calculations (e.g., .*, ./, .^).'
    },
    {
      name: 'Plotting',
      desc: 'Generates graphic charts and mathematical visualization plots.',
      code: 'x = 0:0.1:10; % vector from 0 to 10\ny = sin(x);\nplot(x, y);\ntitle(\'Sine Wave\');',
      tip: 'Use grid on, xlabel, and ylabel to format graphs.'
    },
    {
      name: 'Functions',
      desc: 'Declares mathematical routines inside separate script files.',
      code: 'function dmg = getDamage(atk, def)\n  dmg = atk - def;\nend',
      tip: 'The function file name must match the function signature declaration name (e.g. getDamage.m).'
    }
  ],
  react: [
    {
      name: 'Functional Components',
      desc: 'Reusable JavaScript functions that return React elements describing what should appear on the screen.',
      code: 'function WelcomeCard({ username }) {\n  return <div class="card">Hello, {username}!</div>;\n}',
      tip: 'Keep components small, modular, and focused on a single responsibility to make them easy to test and reuse.'
    },
    {
      name: 'Hooks (useState / useEffect)',
      desc: 'Special functions that let functional components hook into React state and lifecycle features.',
      code: 'const [count, setCount] = useState(0);\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);',
      tip: 'Only call Hooks at the top level. Do not call hooks inside loops, conditions, or nested functions.'
    }
  ],
  angular: [
    {
      name: 'Component Decorator',
      desc: 'Adds metadata configuration to TypeScript classes to declare selectors, HTML templates, and CSS stylesheets.',
      code: '@Component({\n  selector: \'app-profile\',\n  templateUrl: \'./profile.component.html\'\n})\nexport class ProfileComponent {}',
      tip: 'Choose short, semantic selectors prefixed with a unique identifier (e.g. app- or cq-) to prevent markup conflicts.'
    },
    {
      name: 'Structural Directives (*ngIf / *ngFor)',
      desc: 'Directives that modify the layout of the HTML document structure by adding, removing, or duplicating elements.',
      code: '<div *ngIf="isOnline">\n  <p *ngFor="let item of inventory">{{ item }}</p>\n</div>',
      tip: 'Do not place both *ngIf and *ngFor on the same HTML tag. Wrap one in an <ng-container> tag instead.'
    }
  ],
  vue: [
    {
      name: 'Single File Components (SFC)',
      desc: 'A file structure (.vue) that encapsulates template, script, and scoped styling together.',
      code: '<template><h1>{{ title }}</h1></template>\n<script>\nexport default { data() { return { title: "Vue" } } }\n</script>',
      tip: 'Use the scoped attribute on <style> tags to isolate styling rules to the current component.'
    },
    {
      name: 'Vue Directives (v-bind / v-on)',
      desc: 'Special tokens in markup that apply reactive behaviors to the rendering DOM elements.',
      code: '<img :src="avatarUrl" /> <!-- v-bind shorthand -->\n<button @click="save">Save</button> <!-- v-on shorthand -->',
      tip: 'Use the colon (:) shorthand for property bindings and at (@) for event bindings to keep your code clean.'
    }
  ],
  svelte: [
    {
      name: 'Static Compiler Model',
      desc: 'Svelte compiles components into clean, bare-metal JavaScript at build time, eliminating the Virtual DOM overhead.',
      code: '<!-- Svelte runs with zero framework runtime scripts in the browser -->\n<script>\n  let name = "Svelte";\n</script>\n<h1>Hello {name}</h1>',
      tip: 'Since Svelte has no virtual DOM, updates directly modify the matching elements, making it extremely fast.'
    },
    {
      name: 'Reactive Declarations ($:)',
      desc: 'A compiler feature that automatically re-runs code blocks whenever any referenced variables change.',
      code: 'let price = 10;\nlet qty = 2;\n$: total = price * qty; // Auto recalculates',
      tip: 'You can use $: not just for variable assignments, but also for reactive logging loops (e.g. $: console.log(total)).'
    }
  ],
  nextjs: [
    {
      name: 'Pages Directory Routing',
      desc: 'A file-system based routing mechanism where pages are automatically created based on file names.',
      code: '// pages/dashboard/settings.js\nexport default function Settings() {\n  return <h2>Settings Page</h2>; // maps to /dashboard/settings\n}',
      tip: 'Use brackets in filenames to create dynamic routes, for example pages/post/[id].js maps to /post/:id.'
    },
    {
      name: 'getServerSideProps',
      desc: 'A server data fetching method that runs on every request, rendering dynamic HTML pages.',
      code: 'export async function getServerSideProps() {\n  const res = await fetch("https://api/status");\n  return { props: { status: await res.json() } };\n}',
      tip: 'Use getServerSideProps only when rendering data that changes frequently and cannot be pre-rendered at build time.'
    }
  ],
  bootstrap: [
    {
      name: '12-Column Responsive Grid',
      desc: 'A layout grid system consisting of rows and columns used to build responsive layouts of all shapes.',
      code: '<div class="row">\n  <div class="col-sm-8">Primary</div>\n  <div class="col-sm-4">Sidebar</div>\n</div>',
      tip: 'Always nest columns (.col-) directly inside rows (.row), which must go inside a container (.container).'
    },
    {
      name: 'Spacing Utilities',
      desc: 'Quick margin and padding shorthand classes applied to HTML elements directly.',
      code: '<!-- pt-3 = padding-top: 1rem, mb-4 = margin-bottom: 1.5rem -->\n<div class="pt-3 mb-4 bg-light">\n  Box content\n</div>',
      tip: 'Adopt mobile-first spacing by writing standard properties first, then applying screen overrides (e.g. mb-2 md:mb-5).'
    }
  ],
  tailwind: [
    {
      name: 'Utility-First Classes',
      desc: 'CSS classes that apply atomic design properties directly to elements, avoiding custom CSS files.',
      code: '<div class="flex items-center justify-between p-4 bg-gray-800 rounded-xl shadow-lg">\n  Text\n</div>',
      tip: 'Group classes logically (layout, spacing, typography, colors, interactions) to keep markup readable.'
    },
    {
      name: 'Responsive Breakpoints',
      desc: 'CSS media queries applied inline using viewport size prefixes.',
      code: '<div class="w-full md:w-1/2 lg:w-1/3 bg-slate-900">\n  Responsive card\n</div>',
      tip: 'Tailwind is mobile-first: w-full is applied from screen width 0, and md:w-1/2 overrides it at 768px.'
    }
  ],
  nodejs: [
    {
      name: 'CommonJS Modules (require)',
      desc: 'The module loading system used in Node.js to import and export code across files.',
      code: 'const path = require("path");\nconst utils = require("./utils.js");\nmodule.exports = { utils };',
      tip: 'In modern Node.js, you can configure "type": "module" in package.json to use ES6 import/export syntax instead.'
    },
    {
      name: 'Async Event Loop',
      desc: 'The execution model that allows Node.js to perform non-blocking I/O operations despite being single-threaded.',
      code: 'fs.readFile("file.txt", "utf8", (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});',
      tip: 'Avoid executing long CPU-intensive math loops on the main thread, as it freezes incoming network request handlers.'
    }
  ],
  express: [
    {
      name: 'Routing Methods',
      desc: 'Defines endpoints mapped to HTTP actions and URLs, handling requests and sending back responses.',
      code: 'app.get("/api/heroes", (req, res) => {\n  res.json({ heroes: [] });\n});',
      tip: 'Always send a response (e.g. res.send, res.json, res.end) to prevent client requests from hanging indefinitely.'
    },
    {
      name: 'Middleware Pipelines',
      desc: 'Functions that execute sequentially in the request-response lifecycle before the final route handler is reached.',
      code: 'app.use(express.json());\napp.use((req, res, next) => {\n  console.log("Log request");\n  next(); // Pass to next handler\n});',
      tip: 'Always call next() at the end of custom middleware, otherwise the request will hang at that stage.'
    }
  ],
  fastify: [
    {
      name: 'Route Validation Schema',
      desc: 'Fastify compiles JSON schemas to validate incoming requests and serialize output payloads at high speeds.',
      code: 'fastify.get("/user/:id", {\n  schema: {\n    params: { type: "object", properties: { id: { type: "integer" } } }\n  }\n}, handler);',
      tip: 'Providing response schemas speeds up Fastify serialization by up to 2-3x compared to generic JSON stringify.'
    },
    {
      name: 'Plugins (register)',
      desc: 'The encapsulation model used to build modular APIs, register routes, and share database connections.',
      code: 'fastify.register(require("./db.js"));\nfastify.register(require("./routes/api.js"), { prefix: "/api" });',
      tip: 'Fastify plugins are loaded asynchronously in order. Ensure database plugins load before routes files.'
    }
  ],
  django: [
    {
      name: 'MTV Architecture',
      desc: 'Django splits web servers into Models (database tables), Templates (HTML display), and Views (business logic).',
      code: '# views.py\ndef profile(request, id):\n  hero = Hero.objects.get(id=id)\n  return render(request, "profile.html", { "hero": hero })',
      tip: 'Keep views thin by moving database calculations and validations inside custom Model methods.'
    },
    {
      name: 'Django ORM Queries',
      desc: 'The Python API used to interact with database records securely without writing raw SQL.',
      code: '# Select * from heroes where level > 5 and class = "Warrior"\nwarriors = Hero.objects.filter(level__gt=5, class="Warrior")',
      tip: 'Use select_related or prefetch_related in filters to prevent database N+1 query bottlenecks.'
    }
  ],
  flask: [
    {
      name: '@app.route Decorator',
      desc: 'Flask binds endpoints to functions using Python function decorators.',
      code: 'from flask import Flask\napp = Flask(__name__)\n\n@app.route("/api/ping")\ndef ping():\n    return { "message": "pong" }',
      tip: 'By default, routes only accept GET requests. Use methods=["POST"] parameter on the decorator to accept writes.'
    },
    {
      name: 'Request Context Parsing',
      desc: 'Provides secure access to query parameters, form data, and JSON bodies during a request lifecycle.',
      code: 'from flask import request\n\n@app.route("/save", methods=["POST"])\ndef save():\n    payload = request.json\n    return { "saved": payload["id"] }',
      tip: 'Always verify content headers: request.json returns None if the client did not send Content-Type: application/json.'
    }
  ],
  fastapi: [
    {
      name: 'Async Router Endpoints',
      desc: 'FastAPI uses async keywords to handle asynchronous tasks and coordinate operations using Starlette engines.',
      code: 'from fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/items")\nasync def read_items():\n    return await db.fetch_items()',
      tip: 'Use standard def (sync) for blockers that do not support async, as FastAPI will run them inside thread pools.'
    },
    {
      name: 'Pydantic Schemas',
      desc: 'FastAPI validates incoming data structure parameters at runtime using Python type annotations.',
      code: 'from pydantic import BaseModel\n\nclass Item(BaseModel):\n    name: str\n    price: float\n    in_stock: bool = True',
      tip: 'Pydantic models raise automatic validation errors, returning structured error messages to API clients.'
    }
  ],
  springboot: [
    {
      name: 'REST Controller Annotations',
      desc: 'Spring Boot declares APIs using RestController annotations, mapping return values directly to HTTP JSON bodies.',
      code: '@RestController\n@RequestMapping("/api")\npublic class HeroController {\n    @GetMapping("/status")\n    public Map<String, String> status() { return Map.of("ok", "true"); }\n}',
      tip: 'Spring Boot controllers serialize Java POJOs to JSON output automatically using Jackson serializers.'
    },
    {
      name: 'Dependency Injection (@Autowired)',
      desc: 'Spring Boot manages component lifetimes (Beans) and injects required class references automatically.',
      code: '@Autowired\nprivate HeroService heroService;\n\npublic List<Hero> getList() { return heroService.all(); }',
      tip: 'Prefer Constructor Injection over Field Injection (@Autowired on properties) for easier unit testing.'
    }
  ],
  aspnetcore: [
    {
      name: 'ApiController Controller Mapping',
      desc: 'ASP.NET Core maps routes dynamically using attributes and binds endpoints to Action responses.',
      code: '[ApiController]\n[Route("api/[controller]")]\npublic class StatusController : ControllerBase {\n    [HttpGet]\n    public IActionResult Get() { return Ok(new { status = "active" }); }\n}',
      tip: 'Subclassing ControllerBase provides helper actions (Ok, BadRequest, NotFound) to control status codes.'
    },
    {
      name: 'Entity Framework Core Queries',
      desc: 'EF Core maps database schemas directly to C# classes, querying data using LINQ syntax.',
      code: 'var activeHeroes = await _db.Heroes\n    .Where(h => h.IsActive == true)\n    .ToListAsync();',
      tip: 'Use .AsNoTracking() on LINQ queries when loading read-only data to improve query execution speeds.'
    }
  ],
  laravel: [
    {
      name: 'Eloquent ORM Active Records',
      desc: 'Laravel\'s database mapping library. Each database table has a corresponding Model class to query data.',
      code: '$warriors = Hero::where(\'class\', \'Warrior\')->orderBy(\'level\', \'desc\')->get();',
      tip: 'Eloquent models automatically protect queries from SQL injection bugs using PDO parameter bindings.'
    },
    {
      name: 'Artisan CLI Commands',
      desc: 'Laravel command-line utility used to generate files, clear caches, and manage database migrations.',
      code: '# Run in terminal:\n# php artisan make:model Weapon -m --controller',
      tip: 'The -m flag creates a database migration file, and --controller creates a REST controller class for the model.'
    }
  ],
  codeigniter: [
    {
      name: 'Query Builder Database Actions',
      desc: 'Provides secure database query utilities that compile SQL statements in a cross-database format.',
      code: '$builder = $db->table(\'players\');\n$query   = $builder->select(\'name, score\')->where(\'score >\', 100)->get();',
      tip: 'Using Query Builder instead of raw query strings ensures application compatibility across MySQL, Postgres, and SQL Server.'
    },
    {
      name: 'Subroute Controller mappings',
      desc: 'Binds routes manually inside Config/Routes.php rather than relying on dynamic URI segment reflections.',
      code: '$routes->get(\'api/stats/(:num)\', \'StatsController::show/$1\');',
      tip: 'Define manual routing paths to secure your endpoints and prevent unmapped directories access.'
    }
  ],
  rails: [
    {
      name: 'Active Record Queries',
      desc: 'The database abstraction layer mapping rows to Ruby models, querying data using simple method chains.',
      code: 'elite_heroes = Hero.where(level: 10..).order(xp: :desc)\ntop_hero = Hero.find_by(name: "Arthur")',
      tip: 'Use pluck (e.g. Hero.pluck(:name)) instead of map when extracting single column lists to optimize memory.'
    },
    {
      name: 'Rails Scaffold Generators',
      desc: 'Generates database migrations, models, controller files, views templates, and test scripts in a single command.',
      code: '# Run in terminal:\n# rails generate scaffold Hero name:string level:integer',
      tip: 'Use scaffold generators for quick prototyping, but customize files to ensure security rules are maintained.'
    }
  ],
  gin: [
    {
      name: 'Context Bind JSON',
      desc: 'Gin parses incoming JSON request bodies directly into Go structs, verifying structural constraints.',
      code: 'type User struct { Name string `json:"name" binding:"required"` }\n// Inside handler:\nvar u User\nif err := c.ShouldBindJSON(&u); err != nil { return }',
      tip: 'Ensure to add `binding:"required"` to struct parameters to enforce validation errors on missing fields.'
    },
    {
      name: 'Router Paths Grouping',
      desc: 'Organizes routes under path prefixes, applying shared middleware actions like logging or CORS.',
      code: 'api := r.Group("/api")\napi.Use(AuthMiddleware())\n{\n  api.GET("/users", GetUsers)\n}',
      tip: 'Use route grouping to secure subsets of API endpoints in clean, maintainable blocks.'
    }
  ],
  echo: [
    {
      name: 'Context JSON Serialization',
      desc: 'Echo serializes Go structures to response payloads, setting correct HTTP header properties.',
      code: 'func getStatus(c echo.Context) error {\n  return c.JSON(http.StatusOK, map[string]string{ "status": "active" })\n}',
      tip: 'Echo handler functions must return error variables to trigger central error logging hooks.'
    },
    {
      name: 'Echo Custom Middlewares',
      desc: 'Functions executing during request lifecycles to inspect headers or authorize users.',
      code: 'e.Use(middleware.Logger())\ne.Use(middleware.Recover())',
      tip: 'Place critical middlewares like Recovery first to catch panics and prevent server crashes.'
    }
  ],
  actix: [
    {
      name: 'HttpResponse Responder Handlers',
      desc: 'Actix controller endpoints return types implementing the Responder trait, building async responses.',
      code: '#[get("/status")]\nasync fn check() -> impl Responder {\n    HttpResponse::Ok().json(serde_json::json!({ "status": "ok" }))\n}',
      tip: 'Leverage Serde macros to serialize custom structures into response payloads directly.'
    },
    {
      name: 'Shared Application State',
      desc: 'Registers database connections, configurations, or memory states, sharing them safely across CPU threads.',
      code: '// Register:\n// App::new().app_data(web::Data::new(DbPool::new()))\n// Fetch in handler:\nasync fn query(db: web::Data<DbPool>) {}',
      tip: 'Wrap state structures inside web::Data to coordinate thread-safe memory sharing across actors.'
    }
  ],
  rocket: [
    {
      name: 'Launch Macro',
      desc: 'Rocket compiles web apps and launches server nodes using macro annotations.',
      code: '#[macro_use] extern crate rocket;\n#[launch]\nfn rocket() -> _ {\n    rocket::build().mount("/api", routes![get_status])\n}',
      tip: 'Use routes! macro inside mount() to compile and register endpoints.'
    },
    {
      name: 'Type Guard Requests',
      desc: 'Enforces type validations on incoming parameters or custom authorization headers.',
      code: '#[get("/user/<id>")]\nfn get_user(id: usize) -> String { format!("ID: {}", id) }',
      tip: 'If id parameter is not a valid integer, Rocket will automatically block the route execution.'
    }
  ],
  ktor: [
    {
      name: 'Ktor Routing DSL',
      desc: 'Sets up application endpoints inside Kotlin Domain-Specific Language blocks.',
      code: 'routing {\n    get("/api/ping") {\n        call.respondText("pong")\n    }\n}',
      tip: 'Group routes logically by registering sub-route files inside application modules.'
    },
    {
      name: 'Coroutine routing lifecycle',
      desc: 'Ktor route handlers process events asynchronously inside Kotlin coroutine scopes.',
      code: 'get("/api/async") {\n    val result = fetchRemoteData() // non-blocking suspend function\n    call.respond(result)\n}',
      tip: 'Ensure all blocking database actions are executed on Dispatchers.IO to prevent event loops blocking.'
    }
  ],
  playframework: [
    {
      name: 'Scala Action controllers',
      desc: 'Play controller methods return Action blocks that evaluate requests and return responses.',
      code: 'def ping = Action { implicit request: Request[AnyContent] =>\n  Ok("pong")\n}',
      tip: 'Actions can be composed with auth checks to filter requests prior to execution.'
    },
    {
      name: 'Routing file maps',
      desc: 'Binds routes manually inside a single configuration routes file (conf/routes).',
      code: 'GET     /api/status                 controllers.ApiController.getStatus',
      tip: 'The routes file is compiled to Scala code: any spelling mistake in controller path breaks build compile.'
    }
  ],
  oracle: [
    {
      name: 'PL/SQL Block structure',
      desc: 'Oracle\'s procedural extension to SQL. Code is structured inside DECLARE, BEGIN, EXCEPTION, and END blocks.',
      code: 'DECLARE\n  v_name VARCHAR2(50);\nBEGIN\n  SELECT name INTO v_name FROM heroes WHERE id = 1;\nEND;',
      tip: 'Always declare correct sizing for variables: assigning a 60-char text to VARCHAR2(50) raises String Buffer Overflow error.'
    },
    {
      name: 'Oracle exception blocks',
      desc: 'Catches and manages database execution errors securely inside SQL scripts.',
      code: 'BEGIN\n  -- SQL queries\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    dbms_output.put_line(\'No record matching query\');\nEND;',
      tip: 'Use standard Oracle codes like DUP_VAL_ON_INDEX to trap constraint collisions.'
    }
  ],
  mssql: [
    {
      name: 'T-SQL Transactions',
      desc: 'Ensures database write consistency by wrapping multiple queries inside atomic transaction controls.',
      code: 'BEGIN TRANSACTION;\nBEGIN TRY\n    -- SQL database inserts\n    COMMIT TRANSACTION;\nEND TRY\nBEGIN CATCH\n    ROLLBACK TRANSACTION;\nEND CATCH;',
      tip: 'Always roll back transactions in the CATCH block, otherwise locks are held on database tables.'
    },
    {
      name: 'MS SQL Server Temp Tables',
      desc: 'Creates transient, local database tables stored in tempdb, prefixing table names with a hash (#).',
      code: 'SELECT Name, Level INTO #TempLevel FROM Heroes;\nSELECT * FROM #TempLevel;\nDROP TABLE #TempLevel;',
      tip: 'Always drop temp tables explicitly when queries complete to optimize database server resources.'
    }
  ],
  firebase: [
    {
      name: 'Realtime JSON DB references',
      desc: 'Firebase Realtime database maps resources as a single JSON tree. Nodes are accessed using references.',
      code: 'import { getDatabase, ref, set } from "firebase/database";\nconst dbRef = ref(getDatabase(), \'players/101\');',
      tip: 'Keep JSON trees flat to avoid slow synchronization speeds.'
    },
    {
      name: 'Realtime onValue Listener',
      desc: 'Attaches callback listeners to path references, syncing database values to clients dynamically.',
      code: 'onValue(ref(db, \'players/101\'), (snapshot) => {\n  console.log("Realtime changes:", snapshot.val());\n});',
      tip: 'Remember to detach listeners using unsubscribe functions when components unmount to prevent memory leaks.'
    }
  ],
  firestore: [
    {
      name: 'Cloud Firestore Documents',
      desc: 'A document-oriented NoSQL database that stores data as collections of JSON documents.',
      code: 'import { doc, setDoc } from "firebase/firestore";\nawait setDoc(doc(db, "cities", "LA"), { name: "Los Angeles" });',
      tip: 'Firestore queries are shallow: fetching a collection returns document data but ignores subcollections.'
    },
    {
      name: 'Where query filters',
      desc: 'Queries documents conditionally using where parameters.',
      code: 'import { query, where, getDocs } from "firebase/firestore";\nconst q = query(citiesRef, where("state", "==", "CA"));',
      tip: 'Firestore requires manual indexes for queries filtering on multiple properties combined with ordering.'
    }
  ],
  objectivec: [
    {
      name: 'Objective-C property params',
      desc: 'Attributes configured next to class properties to specify compilation memory rules.',
      code: '@property (nonatomic, strong) NSString *name;\n@property (nonatomic, assign) NSInteger level;',
      tip: 'Use strong for objective-C objects, and assign for primitive datatypes like float or NSInteger.'
    },
    {
      name: 'Bracket Selectors syntax',
      desc: 'Sends messages to class instances using bracket pairs.',
      code: 'Hero *warrior = [[Hero alloc] init];\n[warrior levelUp]; // Call levelUp method',
      tip: 'Prepend text literals with @ symbol (e.g. @"Text") to create NSString objects.'
    }
  ],
  julia: [
    {
      name: '1-Based indexing lookups',
      desc: 'Julia vectors and matrices start at index 1, differing from C-family 0-based arrays.',
      code: 'items = ["Axe", "Sword"]\nfirstItem = items[1] # -> "Axe"',
      tip: 'Accessing index 0 in Julia raises bounds error.'
    },
    {
      name: 'Broadcasting calculation (. operator)',
      desc: 'Applies functions or operators element-by-element across vector collections.',
      code: 'A = [1, 2, 3]\nB = A .* 2 # multiplies each element by 2 -> [2, 4, 6]',
      tip: 'Prepend any mathematical operator with a dot (.) to run element-wise matrix computations.'
    }
  ],
  powershell: [
    {
      name: 'Verb-Noun Cmdlets',
      desc: 'PowerShell scripts execute cmdlets combining action verbs with target nouns.',
      code: 'Get-Process -Name "chrome"\nSet-Item -Path "Env:PORT" -Value "3000"',
      tip: 'Use standard aliases (e.g. dir for Get-ChildItem, ls for Get-ChildItem) to speed up terminal work.'
    },
    {
      name: 'Object Pipeline operations',
      desc: 'PowerShell pipes pass complete structured objects between processes rather than string text streams.',
      code: 'Get-Service | Where-Object { $_.Status -eq "Running" }',
      tip: 'Use $_ variable parameter to inspect properties on the current pipeline object.'
    }
  ],
  solidity: [
    {
      name: 'Smart contract storage',
      desc: 'Defines self-executing software programs deployed to decentralized ledger systems.',
      code: 'contract GoldCounter {\n    uint256 public count;\n    function increment() public { count++; }\n}',
      tip: 'Storage variables update ledger states permanently: each write triggers Ethereum gas transaction fees.'
    },
    {
      name: 'Solidity Mapping tables',
      desc: 'Internal hash lookup tables mapping key addresses to value structures.',
      code: 'mapping(address => uint256) public scores;\nscores[msg.sender] = 100;',
      tip: 'Mappings do not store keys: it is impossible to iterate over mappings without tracking keys separately.'
    }
  ],
  erlang: [
    {
      name: 'Pid Messaging (!)',
      desc: 'Erlang actors communicate by sending messages asynchronously to Process Identifiers (Pids).',
      code: 'Pid ! {action, "Attack"}. % Send tuple',
      tip: 'Messages are stored in actor mailboxes until processed by receiver loops.'
    },
    {
      name: 'Receive blocks loops',
      desc: 'Halts process execution threads until messages matching specific patterns arrive.',
      code: 'receive\n  {action, Task} -> execute(Task);\n  terminate -> exit(normal)\nend.',
      tip: 'Always declare termination patterns in receive blocks to clean up processes.'
    }
  ],
  cobol: [
    {
      name: 'COBOL Divisions',
      desc: 'COBOL scripts require organizing code into 4 distinct structural Divisions.',
      code: 'IDENTIFICATION DIVISION.\nPROGRAM-ID. HELLO-WORLD.\nPROCEDURE DIVISION.\n    DISPLAY "COBOL".',
      tip: 'Divisions must appear in strict order: Identification, Environment, Data, Procedure.'
    },
    {
      name: 'Picture Variables format',
      desc: 'Specifies character lengths and numerical storage sizing constraints.',
      code: '01 PLAYER-SCORE  PIC 9(4) VALUE 5000. * 4-digit number\n01 PLAYER-NAME   PIC X(10) VALUE "Paladin".',
      tip: 'Using numeric properties (9) instead of characters (X) enables mathematical validations on variables.'
    }
  ],
  fortran: [
    {
      name: 'Implicit Typing overrides',
      desc: 'Fortran historically infers variables types based on starting letters (I-N are integers).',
      code: 'program main\n  implicit none -- disables auto-typing\n  integer :: index\nend program main',
      tip: 'Always write "implicit none" at the start of programs to force explicit variable types declarations.'
    },
    {
      name: 'Fortran math DO loops',
      desc: 'Highly optimized imperative loops designed for scientific computations.',
      code: 'integer :: index, total\ntotal = 0\ndo index = 1, 100\n  total = total + index\nend do',
      tip: 'Fortran loop variables must be integers; loops execute fast since compilers map them directly to register instructions.'
    }
  ],
  nuxtjs: [
    {
      name: 'useFetch Composable',
      desc: 'Nuxt\'s built-in data fetching composable that works universally on both server (SSR) and client side.',
      code: 'const { data, pending, error } = await useFetch("/api/heroes", {\n  query: { class: "Warrior" },\n  transform: (r) => r.heroes\n})',
      tip: 'useFetch auto-deduplicates identical requests during SSR hydration so data is never fetched twice.'
    },
    {
      name: 'definePageMeta',
      desc: 'Sets route-level metadata like layout, middleware guards, and SEO head properties for a Nuxt page.',
      code: 'definePageMeta({\n  layout: "dashboard",\n  middleware: ["auth"],\n  title: "Hero Dashboard"\n})',
      tip: 'Middleware defined in definePageMeta runs before the page renders, making it ideal for auth guard checks.'
    }
  ],
  nestjs: [
    {
      name: '@Controller & @Get Decorators',
      desc: 'Decorators that bind TypeScript classes and methods to HTTP routes, building a modular API layer.',
      code: '@Controller("heroes")\nexport class HeroController {\n  @Get(":id")\n  findOne(@Param("id") id: string) {\n    return this.heroService.findOne(+id);\n  }\n}',
      tip: 'Prefix @Controller with a path segment (e.g. "heroes") to namespace all routes inside that controller.'
    },
    {
      name: 'Dependency Injection (DI)',
      desc: 'NestJS manages class instances (Providers) and automatically injects them into constructors via its IoC container.',
      code: '@Injectable()\nexport class HeroService {\n  constructor(private readonly db: DatabaseService) {}\n\n  findAll() { return this.db.heroes.findMany(); }\n}',
      tip: 'Always declare injected services as private readonly in the constructor to prevent external mutation.'
    }
  ],
  lua: [
    {
      name: 'Tables (Arrays & Objects)',
      desc: 'Lua\'s single composite data structure. Tables serve as arrays, hash maps, and objects all in one.',
      code: '-- Array (1-indexed)\nlocal items = { "Sword", "Shield", "Potion" }\nprint(items[1]) -- Sword\n\n-- Hash map\nlocal hero = { name = "Kai", level = 5 }\nprint(hero.name) -- Kai',
      tip: 'Lua arrays are 1-indexed by default. Accessing index 0 returns nil, not an error.'
    },
    {
      name: 'Metatables (__index)',
      desc: 'A mechanism to define OOP-style behavior, operator overloading, and prototype chains using special tables.',
      code: 'local Hero = {}\nHero.__index = Hero\n\nfunction Hero.new(name)\n  return setmetatable({ name = name, hp = 100 }, Hero)\nend\n\nfunction Hero:attack() print(self.name .. " attacks!") end',
      tip: 'Set __index = ClassName so instances automatically look up methods on the class table when not found locally.'
    }
  ],
  gdscript: [
    {
      name: 'Signals System',
      desc: 'Godot\'s built-in event system for decoupled node communication. Components emit signals others can listen to.',
      code: '# Declare signal\nsignal health_changed(new_health)\n\n# Emit signal\nfunc take_damage(amount):\n    health -= amount\n    emit_signal("health_changed", health)',
      tip: 'Prefer signals over direct node references to keep scenes loosely coupled and reusable.'
    },
    {
      name: '@export Variable',
      desc: 'Makes a script variable visible and editable inside the Godot Inspector without recompiling.',
      code: '@export var speed: float = 200.0\n@export var max_health: int = 100\n@export var weapon_texture: Texture2D',
      tip: 'Use @export_range for numeric sliders and @export_enum for dropdown selectors in the Inspector.'
    }
  ],
  wasm: [
    {
      name: 'Linear Memory Model',
      desc: 'WebAssembly programs use a flat, contiguous block of bytes (ArrayBuffer) as their memory space.',
      code: 'const memory = new WebAssembly.Memory({ initial: 1 }); // 1 page = 64KB\nconst view = new Uint8Array(memory.buffer);\nview[0] = 255; // Write byte at offset 0',
      tip: 'Use SharedArrayBuffer with WebAssembly.Memory to share memory safely between the main thread and web workers.'
    },
    {
      name: 'instantiateStreaming',
      desc: 'The modern API for loading and compiling .wasm binary modules directly from network fetch responses.',
      code: 'const { instance } = await WebAssembly.instantiateStreaming(\n  fetch("hero.wasm"),\n  { env: { log: (n) => console.log(n) } } // Import object\n);\nconst result = instance.exports.compute(100);',
      tip: 'instantiateStreaming is faster than instantiate because it compiles the Wasm binary while still streaming the bytes.'
    }
  ],
  clojure: [
    {
      name: 'def & defn',
      desc: 'Core forms for defining global variables (def) and named functions (defn) in a namespace.',
      code: '(def max-level 10)\n\n(defn level-up\n  "Increases hero level by 1, capped at max-level"\n  [hero]\n  (update hero :level #(min % max-level)))',
      tip: 'In Clojure, functions are values. You can store defn-created functions in maps or pass them as arguments.'
    },
    {
      name: 'Threading Macros (-> / ->>)',
      desc: 'Operators that pipe a value through a chain of functions, left to right, for readable data transformations.',
      code: '; -> inserts value as FIRST arg\n(-> hero\n    (assoc :status "active")\n    (update :level inc))\n\n; ->> inserts value as LAST arg\n(->> [1 2 3 4 5]\n     (filter even?)\n     (map #(* % 10)))',
      tip: 'Use -> for object transformations (where value is first arg), and ->> for sequence pipelines (where value is last arg).'
    }
  ],
  fsharp: [
    {
      name: 'Discriminated Unions',
      desc: 'A type that can be one of several named cases, each optionally carrying different data. F#\'s alternative to class hierarchies.',
      code: 'type Result<\'T, \'E> =\n    | Ok  of value: \'T\n    | Err of error: \'E\n\nmatch validateHero input with\n| Ok hero -> printfn "Valid: %s" hero.Name\n| Err msg -> printfn "Error: %s" msg',
      tip: 'The F# compiler forces exhaustive matching — if you miss a case in match, you get a compile-time warning.'
    },
    {
      name: 'Pipeline Operator (|>)',
      desc: 'Passes the result of the left expression as the last argument to the function on the right.',
      code: 'let processHero =\n    createHero "Elara"\n    |> validateLevel\n    |> assignQuest\n    |> saveToDatabase\n\nlet result = processHero',
      tip: 'The pipeline operator makes data flows read top-to-bottom and left-to-right, matching how humans read prose.'
    }
  ],
  groovy: [
    {
      name: 'Closures',
      desc: 'First-class anonymous code blocks that capture surrounding variables and can be passed as method arguments.',
      code: '// Simple closure\ndef square = { it * it }\nprintln square(7) // 49\n\n// Multi-param closure\ndef add = { a, b -> a + b }\nprintln add(3, 4) // 7\n\n// Closure as last argument (trailing syntax)\n[1,2,3].each { println it }',
      tip: 'In Groovy closures, "it" is the implicit single parameter. Use named params for multi-argument closures.'
    },
    {
      name: 'GString Interpolation',
      desc: 'Groovy strings prefixed with double quotes that embed expressions using ${} syntax.',
      code: 'def name = "GroovyHero"\ndef level = 8\n\n// Simple variable interpolation\nprintln "Player: $name"\n\n// Expression interpolation\nprintln "Next level: ${level + 1}"\n\n// Multi-line GString\ndef bio = """\n  Name: $name\n  Level: $level\n"""',
      tip: 'Single-quoted strings in Groovy are plain Java Strings with NO interpolation. Always use double-quotes for templates.'
    }
  ],
  elasticsearch: [
    {
      name: 'Query DSL (bool query)',
      desc: 'Elasticsearch\'s JSON query language for combining must (AND), should (OR), and must_not (NOT) clauses.',
      code: 'GET /heroes/_search\n{\n  "query": {\n    "bool": {\n      "must":     [{ "match": { "class": "Warrior" } }],\n      "filter":   [{ "range": { "level": { "gte": 5 } } }],\n      "must_not": [{ "term": { "status": "banned" } }]\n    }\n  }\n}',
      tip: 'Use filter instead of must for exact-match conditions — filter results are cached and scored faster.'
    },
    {
      name: 'Aggregations',
      desc: 'Analytics framework for computing statistics (counts, averages, histograms) over matching documents.',
      code: 'GET /heroes/_search\n{\n  "size": 0,\n  "aggs": {\n    "heroes_by_class": {\n      "terms": { "field": "class.keyword", "size": 10 }\n    },\n    "average_level": {\n      "avg": { "field": "level" }\n    }\n  }\n}',
      tip: 'Set "size": 0 to skip returning actual documents and only return aggregation results, saving bandwidth.'
    }
  ],
  dynamodb: [
    {
      name: 'Partition Key & Sort Key',
      desc: 'DynamoDB\'s primary key model. Partition key distributes data; sort key enables range queries on items in the same partition.',
      code: '// Table: HeroScores\n// PK: heroId (String)\n// SK: gameDate (String - ISO 8601)\n\n// Query all scores for hero-001\nKeyConditionExpression: "heroId = :hid AND gameDate BETWEEN :start AND :end"\n\n// Efficiently fetches sorted by date',
      tip: 'Design your partition key for even data distribution. Hotspot partitions (one key gets all traffic) cause throttling.'
    },
    {
      name: 'Condition Expressions',
      desc: 'Guards write operations with boolean checks against the current item state before executing the mutation.',
      code: 'await client.send(new UpdateItemCommand({\n  TableName: "Heroes",\n  Key: { heroId: { S: "hero-001" } },\n  UpdateExpression: "SET gold = gold + :amount",\n  ConditionExpression: "attribute_exists(heroId) AND gold >= :cost",\n  ExpressionAttributeValues: {\n    ":amount": { N: "-50" },\n    ":cost":   { N: "50" }\n  }\n}))',
      tip: 'If the condition fails, DynamoDB throws ConditionalCheckFailedException — use this for optimistic locking patterns.'
    }
  ],
  prisma: [
    {
      name: 'Schema Model Definition',
      desc: 'Prisma Schema Language (PSL) defines database models, their fields, types, constraints, and relations declaratively.',
      code: 'model Hero {\n  id        Int      @id @default(autoincrement())\n  name      String   @unique\n  level     Int      @default(1)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  weapons   Weapon[]\n}',
      tip: 'Run npx prisma format to auto-format your schema file according to Prisma style guidelines.'
    },
    {
      name: 'Relation Queries (include)',
      desc: 'Fetches related records in a single query using include, avoiding the N+1 query problem.',
      code: 'const heroWithWeapons = await prisma.hero.findUnique({\n  where: { id: 1 },\n  include: {\n    weapons: {\n      where: { enchanted: true },\n      orderBy: { damage: "desc" }\n    }\n  }\n})',
      tip: 'Use select instead of include to only fetch specific fields, reducing payload size on high-traffic endpoints.'
    }
  ],
  typeorm: [
    {
      name: '@Entity & Column Decorators',
      desc: 'TypeORM decorators that map TypeScript classes and properties to database tables and columns.',
      code: '@Entity("heroes")\nexport class Hero {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column({ length: 100, unique: true })\n  name: string;\n\n  @Column({ type: "enum", enum: HeroClass })\n  heroClass: HeroClass;\n\n  @CreateDateColumn()\n  createdAt: Date;\n}',
      tip: 'Use @Index() decorator on columns you frequently query by to significantly speed up SELECT operations.'
    },
    {
      name: 'QueryBuilder',
      desc: 'A fluent API for building complex SQL queries programmatically with full TypeScript type safety.',
      code: 'const warriors = await heroRepo\n  .createQueryBuilder("hero")\n  .innerJoinAndSelect("hero.guild", "guild")\n  .where("hero.heroClass = :class", { class: "Warrior" })\n  .andWhere("hero.level BETWEEN :min AND :max", { min: 5, max: 20 })\n  .orderBy("hero.level", "DESC")\n  .getMany();',
      tip: 'Always use parameterized values (":paramName") in QueryBuilder — never concatenate user input directly into queries.'
    }
  ],
  docker: [
    {
      name: 'Dockerfile Instructions',
      desc: 'Sequential build commands that create a Docker image layer by layer from a base OS image.',
      code: 'FROM node:20-alpine        # Base image\nWORKDIR /app               # Set working directory\nCOPY package*.json ./      # Copy manifests\nRUN npm ci                 # Install deps (as a layer)\nCOPY . .                   # Copy source code\nEXPOSE 3000                # Document port\nCMD ["node", "server.js"]  # Default command',
      tip: 'Put least-changing layers (FROM, RUN npm ci) early and most-changing layers (COPY source) late to maximize cache hits.'
    },
    {
      name: 'Docker Compose Services',
      desc: 'Defines multi-container applications as a collection of named services with networks and volumes.',
      code: 'services:\n  api:\n    build: .\n    ports: ["3000:3000"]\n    environment:\n      DB_URL: postgres://db:5432/app\n    depends_on:\n      db:\n        condition: service_healthy\n  db:\n    image: postgres:16-alpine\n    healthcheck:\n      test: ["CMD", "pg_isready"]',
      tip: 'Use depends_on with condition: service_healthy to prevent your app from starting before the DB is truly ready.'
    }
  ],
  kubernetes: [
    {
      name: 'Deployment Manifest',
      desc: 'Declarative YAML specification that describes the desired state of a set of pods, managing rolling updates and replicas.',
      code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: hero-api\nspec:\n  replicas: 3\n  selector:\n    matchLabels: { app: hero-api }\n  template:\n    spec:\n      containers:\n        - name: hero-api\n          image: hero-api:v1.2\n          ports: [{ containerPort: 3000 }]',
      tip: 'Set proper resource requests and limits on all containers to prevent a single pod from starving other workloads.'
    },
    {
      name: 'Service & Ingress',
      desc: 'Service provides a stable network endpoint for pods; Ingress routes external HTTP/HTTPS traffic to services.',
      code: '# Service\nkind: Service\nspec:\n  selector: { app: hero-api }\n  ports: [{ port: 80, targetPort: 3000 }]\n\n# Ingress\nkind: Ingress\nspec:\n  rules:\n  - host: api.heroquest.com\n    http:\n      paths:\n      - path: /\n        backend:\n          service: { name: hero-api, port: { number: 80 } }',
      tip: 'Use IngressClass to specify which ingress controller (nginx, traefik) handles routing for multi-controller clusters.'
    }
  ],
  terraform: [
    {
      name: 'Resource Block',
      desc: 'Declares a real cloud infrastructure resource (server, bucket, database) to be created and managed by Terraform.',
      code: 'resource "aws_instance" "app_server" {\n  ami           = "ami-0c55b159cbfafe1f0"\n  instance_type = "t3.micro"\n\n  tags = {\n    Name        = "HeroAPI"\n    Environment = var.environment\n  }\n}',
      tip: 'Run terraform plan before apply to preview all changes Terraform will make without touching any real infrastructure.'
    },
    {
      name: 'Variables & Outputs',
      desc: 'Variables parameterize Terraform configs; Outputs expose resource attribute values after apply completes.',
      code: '# variables.tf\nvariable "region" {\n  type    = string\n  default = "us-east-1"\n}\n\n# outputs.tf\noutput "server_ip" {\n  description = "Public IP of the app server"\n  value       = aws_instance.app_server.public_ip\n  sensitive   = false\n}',
      tip: 'Mark outputs containing passwords or secrets as sensitive = true to prevent them appearing in terminal logs.'
    }
  ],
  nginx: [
    {
      name: 'server & location Blocks',
      desc: 'Core Nginx configuration units. server defines virtual hosts; location defines URL pattern matching and behavior.',
      code: 'server {\n  listen 80;\n  server_name heroquest.com www.heroquest.com;\n\n  location / {\n    root /var/www/html;\n    try_files $uri $uri/ /index.html;\n  }\n\n  location /api {\n    proxy_pass http://localhost:3000;\n  }\n}',
      tip: 'Nginx matches location blocks by longest prefix first, then regular expressions. Use = for exact matches (fastest).'
    },
    {
      name: 'Upstream & Load Balancing',
      desc: 'Defines a named group of backend servers for reverse proxying and load distribution across multiple instances.',
      code: 'upstream app_servers {\n  least_conn;\n  server 10.0.0.1:3000;\n  server 10.0.0.2:3000;\n  server 10.0.0.3:3000 backup;\n}\n\nserver {\n  location / {\n    proxy_pass http://app_servers;\n    proxy_set_header Host $host;\n  }\n}',
      tip: 'The least_conn strategy routes new connections to the server with fewest active connections — ideal for long requests.'
    }
  ]
};
