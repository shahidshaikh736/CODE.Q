/**
 * CODE.Q — Multi-Language Configuration
 * All language metadata, starter codes, hints, and categories
 * Cache-busting comment v1.0.1
 */

// ─── CATEGORIES ─────────────────────────────────────────────────────────────
export const LANGUAGE_CATEGORIES = [
  {
    label: '🎨 Frontend',
    languages: ['html', 'css', 'sass', 'javascript', 'typescript', 'json', 'xml', 'yaml', 'markdown', 'graphql', 'react', 'angular', 'vue', 'svelte', 'nextjs', 'nuxtjs', 'bootstrap', 'tailwind']
  },
  {
    label: '⚙️ Backend / General',
    languages: ['python', 'java', 'csharp', 'go', 'rust', 'php', 'ruby', 'kotlin', 'swift', 'dart', 'elixir', 'scala', 'perl', 'haskell', 'c', 'cpp', 'nodejs', 'express', 'fastify', 'nestjs', 'django', 'flask', 'fastapi', 'springboot', 'aspnetcore', 'laravel', 'codeigniter', 'rails', 'gin', 'echo', 'actix', 'rocket', 'ktor', 'playframework', 'objectivec', 'solidity', 'erlang', 'cobol', 'lua', 'gdscript', 'wasm', 'clojure', 'fsharp', 'groovy']
  },
  {
    label: '🗄️ Database',
    languages: ['sql', 'mysql', 'sqlite', 'postgresql', 'mongodb', 'redis', 'cassandra', 'neo4j', 'oracle', 'mssql', 'firebase', 'firestore', 'elasticsearch', 'dynamodb', 'prisma', 'typeorm']
  },
  {
    label: '🖥️ Systems & Scripts',
    languages: ['bash', 'r', 'matlab', 'julia', 'powershell', 'fortran', 'docker', 'kubernetes', 'terraform', 'nginx']
  }
];

// ─── LANGUAGE META (name, icon, monacoId, difficulty, useCase, jobDemand, explanation) ────
export const LANGUAGE_META = {
  // FRONTEND
  html: {
    label: 'HTML 5',
    icon: '🌐',
    monacoId: 'html',
    difficulty: 'Beginner',
    useCase: 'Web Page Structure',
    jobDemand: '★★★★★',
    year: 1993,
    creator: 'Tim Berners-Lee',
    deviconClass: 'devicon-html5-plain',
    explanation: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the structure and layout of a web document by using various tags and attributes. Learning HTML is the first step for any aspiring web developer, as it forms the skeleton of all websites.'
  },
  css: {
    label: 'CSS 3',
    icon: '🎨',
    monacoId: 'css',
    difficulty: 'Beginner',
    useCase: 'Styling & Layouts',
    jobDemand: '★★★★★',
    year: 1996,
    creator: 'Håkon Wium Lie',
    deviconClass: 'devicon-css3-plain',
    explanation: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation and layout of a document written in HTML. It controls the colors, fonts, margins, positioning, and responsive styling of web elements. With modern CSS, developers can build layouts, transitions, and complex animations.'
  },
  sass: {
    label: 'Sass / SCSS',
    icon: '🎨',
    monacoId: 'scss',
    difficulty: 'Beginner',
    useCase: 'Advanced CSS Styling',
    jobDemand: '★★★★☆',
    year: 2006,
    creator: 'Hampton Catlin',
    deviconClass: 'devicon-sass-original',
    explanation: 'Sass (Syntactically Awesome Stylesheets) is a preprocessor scripting language that compiles into plain CSS. It extends standard CSS with features like variables, nested selectors, mixins, selector inheritance, and mathematical operators. This helps developers write clean, maintainable, and reusable style rules for large websites.'
  },
  javascript: {
    label: 'JavaScript',
    icon: '⚡',
    monacoId: 'javascript',
    difficulty: 'Intermediate',
    useCase: 'Web Interactivity',
    jobDemand: '★★★★★',
    year: 1995,
    creator: 'Brendan Eich',
    deviconClass: 'devicon-javascript-plain',
    explanation: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It is the language of the web, enabling interactive interfaces, asynchronous network operations, and complex frontend behaviors. Today, via Node.js, JS is also used to construct robust backend servers and database integrations.'
  },
  typescript: {
    label: 'TypeScript',
    icon: '🔷',
    monacoId: 'typescript',
    difficulty: 'Intermediate',
    useCase: 'Typed JavaScript / SPA',
    jobDemand: '★★★★★',
    year: 2012,
    creator: 'Microsoft',
    deviconClass: 'devicon-typescript-plain',
    explanation: 'TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It acts as a static compiler that checks for type-safety bugs before code runs. TypeScript compiles down to clean, standard JavaScript, making it highly integrated into modern frameworks like React, Angular, and NestJS.'
  },
  json: {
    label: 'JSON',
    icon: '📦',
    monacoId: 'json',
    difficulty: 'Beginner',
    useCase: 'Data Config & APIs',
    jobDemand: '★★★★☆',
    year: 2001,
    creator: 'Douglas Crockford',
    deviconClass: 'devicon-json-plain',
    explanation: 'JSON (JavaScript Object Notation) is a lightweight, text-based, human-readable data-interchange format. It is completely language-independent but uses conventions familiar to programmers of the C-family of languages. JSON is the primary language used to send and receive structured data between web servers and client applications.'
  },
  xml: {
    label: 'XML',
    icon: '📄',
    monacoId: 'xml',
    difficulty: 'Beginner',
    useCase: 'Config & Data Exchange',
    jobDemand: '★★★☆☆',
    year: 1998,
    creator: 'W3C',
    deviconClass: 'devicon-xml-plain',
    explanation: 'XML (eXtensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable. Unlike HTML, XML tags are not predefined; developers define their own custom tags. It is heavily used in legacy configurations, SOAP APIs, and document styling systems.'
  },
  yaml: {
    label: 'YAML',
    icon: '⚙️',
    monacoId: 'yaml',
    difficulty: 'Beginner',
    useCase: 'DevOps Config Files',
    jobDemand: '★★★★☆',
    year: 2001,
    creator: 'Clark Evans',
    deviconClass: 'devicon-yaml-plain',
    explanation: 'YAML (YAML Ain\'t Markup Language) is a human-friendly data serialization standard that is commonly used for configuration files. It uses indentation to define structure instead of braces or tags, making it highly readable. It is the industry standard for DevOps and CI/CD tools like Docker, Kubernetes, GitHub Actions, and Ansible.'
  },
  markdown: {
    label: 'Markdown',
    icon: '📝',
    monacoId: 'markdown',
    difficulty: 'Beginner',
    useCase: 'Docs & README Files',
    jobDemand: '★★★☆☆',
    year: 2004,
    creator: 'John Gruber',
    deviconClass: 'devicon-markdown-original',
    explanation: 'Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It is widely used for authoring documentation, writing README files, and formatting blog posts or forum comments. It compiles cleanly to semantic HTML, allowing developers to format text using simple inline shortcuts.'
  },
  graphql: {
    label: 'GraphQL',
    icon: '🔗',
    monacoId: 'graphql',
    difficulty: 'Advanced',
    useCase: 'API Query Language',
    jobDemand: '★★★★☆',
    year: 2015,
    creator: 'Facebook/Meta',
    deviconClass: 'devicon-graphql-plain',
    explanation: 'GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. It allows clients to define the exact structure of the data they need, preventing over-fetching or under-fetching. This makes it highly efficient for complex, relational web platforms.'
  },
  // BACKEND
  python: {
    label: 'Python 3',
    icon: '🐍',
    monacoId: 'python',
    difficulty: 'Beginner',
    useCase: 'AI, Data Science, Web',
    jobDemand: '★★★★★',
    year: 1991,
    creator: 'Guido van Rossum',
    deviconClass: 'devicon-python-plain',
    explanation: 'Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability with its use of significant indentation. Python is the dominant language in Artificial Intelligence, Machine Learning, Data Analytics, Scientific Computing, and web scripting backend stacks.'
  },
  java: {
    label: 'Java',
    icon: '☕',
    monacoId: 'java',
    difficulty: 'Intermediate',
    useCase: 'Enterprise & Android',
    jobDemand: '★★★★★',
    year: 1995,
    creator: 'James Gosling',
    deviconClass: 'devicon-java-plain',
    explanation: 'Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It follows the "Write Once, Run Anywhere" (WORA) principle, executing on the JVM (Java Virtual Machine). It is the backbone of major enterprise web servers, Android development, and massive distributed systems.'
  },
  csharp: {
    label: 'C#',
    icon: '🎯',
    monacoId: 'csharp',
    difficulty: 'Intermediate',
    useCase: '.NET / Game Dev (Unity)',
    jobDemand: '★★★★☆',
    year: 2000,
    creator: 'Microsoft',
    deviconClass: 'devicon-csharp-plain',
    explanation: 'C# (pronounced C-sharp) is a modern, general-purpose, object-oriented programming language developed by Microsoft. It runs on the .NET framework and is deeply integrated into Windows architectures, desktop enterprise applications, web API services, and game development engines like Unity.'
  },
  go: {
    label: 'Go (Golang)',
    icon: '🐹',
    monacoId: 'go',
    difficulty: 'Intermediate',
    useCase: 'Cloud / Microservices',
    jobDemand: '★★★★☆',
    year: 2009,
    creator: 'Google',
    deviconClass: 'devicon-go-original-wordmark',
    explanation: 'Go is an open-source programming language designed at Google to build simple, reliable, and efficient software. It compiles directly to machine code and features powerful, lightweight concurrency primitives called goroutines. Go is the core language behind cloud-native tools like Docker, Kubernetes, and Terraform.'
  },
  rust: {
    label: 'Rust',
    icon: '🦀',
    monacoId: 'rust',
    difficulty: 'Advanced',
    useCase: 'Systems / WebAssembly',
    jobDemand: '★★★★☆',
    year: 2010,
    creator: 'Mozilla Research',
    deviconClass: 'devicon-rust-plain',
    explanation: 'Rust is a multi-paradigm system programming language focused on safety, speed, and concurrency. It guarantees memory safety without using a garbage collector by implementing an innovative ownership and borrow checking system. Rust is widely used for systems engineering, compilers, performance services, and WebAssembly.'
  },
  php: {
    label: 'PHP',
    icon: '🐘',
    monacoId: 'php',
    difficulty: 'Beginner',
    useCase: 'Web Backend & CMS',
    jobDemand: '★★★★☆',
    year: 1994,
    creator: 'Rasmus Lerdorf',
    deviconClass: 'devicon-php-plain',
    explanation: 'PHP is a popular general-purpose scripting language that is especially suited to web development and can be embedded directly into HTML. It powers millions of dynamic websites (including 40%+ via WordPress) and provides a vast ecosystem of frameworks (like Laravel) for building backend routers and controllers.'
  },
  ruby: {
    label: 'Ruby',
    icon: '💎',
    monacoId: 'ruby',
    difficulty: 'Intermediate',
    useCase: 'Web Dev (Rails)',
    jobDemand: '★★★☆☆',
    year: 1995,
    creator: 'Yukihiro Matsumoto',
    deviconClass: 'devicon-ruby-plain',
    explanation: 'Ruby is an interpreted, high-level, general-purpose language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write. Ruby gained massive global popularity through the Ruby on Rails framework, which pioneered many modern web development design patterns.'
  },
  kotlin: {
    label: 'Kotlin',
    icon: '🚀',
    monacoId: 'kotlin',
    difficulty: 'Intermediate',
    useCase: 'Android Development',
    jobDemand: '★★★★☆',
    year: 2011,
    creator: 'JetBrains',
    deviconClass: 'devicon-kotlin-plain',
    explanation: 'Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference. It is designed to interoperate fully with Java, but offers modern features like null safety, concise syntax, and coroutines. It is Google\'s officially preferred language for native Android mobile applications.'
  },
  swift: {
    label: 'Swift',
    icon: '🍎',
    monacoId: 'swift',
    difficulty: 'Intermediate',
    useCase: 'iOS & macOS Apps',
    jobDemand: '★★★★☆',
    year: 2014,
    creator: 'Apple',
    deviconClass: 'devicon-swift-plain',
    explanation: 'Swift is a robust and intuitive programming language created by Apple for building apps for iOS, iPadOS, macOS, watchOS, and tvOS. It was designed to replace Objective-C, offering cleaner safety rules, faster execution, modern closures, and generics. It uses safe design patterns that make writing software fun and fast.'
  },
  dart: {
    label: 'Dart',
    icon: '🎯',
    monacoId: 'dart',
    difficulty: 'Intermediate',
    useCase: 'Flutter Mobile Apps',
    jobDemand: '★★★☆☆',
    year: 2011,
    creator: 'Google',
    deviconClass: 'devicon-dart-plain',
    explanation: 'Dart is a client-optimized programming language developed by Google for fast apps on any platform. It is the language that powers Flutter, a highly popular cross-platform UI framework. Dart compiled code is extremely fast, supporting both compilation to ARM/Intel machine code and high-performance JS web code.'
  },
  elixir: {
    label: 'Elixir',
    icon: '💧',
    monacoId: 'elixir',
    difficulty: 'Advanced',
    useCase: 'Concurrent & Scalable Apps',
    jobDemand: '★★★☆☆',
    year: 2011,
    creator: 'José Valim',
    deviconClass: 'devicon-elixir-plain',
    explanation: 'Elixir is a dynamic, functional language designed for building scalable and maintainable applications. It runs on the Erlang VM (BEAM), known for running low-latency, distributed, and fault-tolerant systems. Elixir is widely used in web development (via the Phoenix framework), real-time messaging systems, and IoT.'
  },
  scala: {
    label: 'Scala',
    icon: '🌀',
    monacoId: 'scala',
    difficulty: 'Advanced',
    useCase: 'Data Engineering & JVM',
    jobDemand: '★★★★☆',
    year: 2004,
    creator: 'Martin Odersky',
    deviconClass: 'devicon-scala-plain',
    explanation: 'Scala combines object-oriented and functional programming in one high-level language. It runs on the Java Virtual Machine (JVM) and is fully interoperable with Java. Scala is highly popular in big data processing (being the primary language for Apache Spark), data engineering, and high-throughput backend services.'
  },
  perl: {
    label: 'Perl',
    icon: '🐫',
    monacoId: 'perl',
    difficulty: 'Intermediate',
    useCase: 'Text Processing & Scripts',
    jobDemand: '★★☆☆☆',
    year: 1987,
    creator: 'Larry Wall',
    deviconClass: 'devicon-perl-plain',
    explanation: 'Perl is a highly capable, feature-rich programming language with over 30 years of development. Renowned for its powerful text processing capabilities (regular expressions), it is often called the "Swiss Army chainsaw of scripting languages." It is used for system administration, web development, network programming, and GUI development.'
  },
  haskell: {
    label: 'Haskell',
    icon: 'λ',
    monacoId: 'haskell',
    difficulty: 'Advanced',
    useCase: 'Research & Pure Logic',
    jobDemand: '★★☆☆☆',
    year: 1990,
    creator: 'Haskell Committee',
    deviconClass: 'devicon-haskell-plain',
    explanation: 'Haskell is a standardized, general-purpose, purely functional programming language with non-strict semantics and strong static typing. It features type inference, lazy evaluation, and list comprehensions. Haskell is widely used in academia, financial modeling, compiler design, and industries requiring high mathematical correctness.'
  },
  c: {
    label: 'C',
    icon: '⚙️',
    monacoId: 'c',
    difficulty: 'Advanced',
    useCase: 'OS & Embedded Systems',
    jobDemand: '★★★★☆',
    year: 1972,
    creator: 'Dennis Ritchie',
    deviconClass: 'devicon-c-plain',
    explanation: 'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion. It is a highly low-level language that maps closely to hardware instructions, making it the primary language for operating systems (such as Linux), compilers, and embedded microchips.'
  },
  cpp: {
    label: 'C++',
    icon: '⚡',
    monacoId: 'cpp',
    difficulty: 'Advanced',
    useCase: 'Games / Systems',
    jobDemand: '★★★★☆',
    year: 1983,
    creator: 'Bjarne Stroustrup',
    deviconClass: 'devicon-cplusplus-plain',
    explanation: 'C++ is a high-performance, general-purpose programming language created as an extension of the C language. It introduces object-oriented programming, classes, generics (templates), and manual memory management. C++ is the leading choice for game engines (like Unreal Engine), database engines, and browsers.'
  },
  // DATABASE
  sql: {
    label: 'SQL',
    icon: '🗄️',
    monacoId: 'sql',
    difficulty: 'Beginner',
    useCase: 'Relational Databases',
    jobDemand: '★★★★★',
    year: 1974,
    creator: 'IBM (Chamberlin & Boyce)',
    deviconClass: 'devicon-sqldeveloper-plain',
    explanation: 'SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS). It lets developers create tables, filter records, join relations, and aggregate values using clean, declarative queries.'
  },
  mysql: {
    label: 'MySQL',
    icon: '🐬',
    monacoId: 'sql',
    difficulty: 'Beginner',
    useCase: 'Relational Web Databases',
    jobDemand: '★★★★★',
    year: 1995,
    creator: 'Oracle / Widenius & Axmark',
    deviconClass: 'devicon-mysql-plain',
    explanation: 'MySQL is the world\'s most popular open-source relational database management system (RDBMS). It is a key component of the widely used LAMP web application software stack. MySQL is known for its speed, reliability, and ease of use, powering major platforms like WordPress, Facebook, and Twitter.'
  },
  sqlite: {
    label: 'SQLite',
    icon: '🪶',
    monacoId: 'sql',
    difficulty: 'Beginner',
    useCase: 'Embedded local storage',
    jobDemand: '★★★★☆',
    year: 2000,
    creator: 'D. Richard Hipp',
    deviconClass: 'devicon-sqlite-plain',
    explanation: 'SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine. Unlike most other SQL databases, SQLite does not have a separate server process; it reads and writes directly to ordinary disk files. It is the most widely deployed database engine in the world, embedded in mobile phones, browsers, and desktop software.'
  },
  postgresql: {
    label: 'PostgreSQL',
    icon: '🐘',
    monacoId: 'pgsql',
    difficulty: 'Intermediate',
    useCase: 'Advanced SQL Databases',
    jobDemand: '★★★★☆',
    year: 1996,
    creator: 'PostgreSQL Global Dev Group',
    deviconClass: 'devicon-postgresql-plain',
    explanation: 'PostgreSQL (or Postgres) is a free and open-source relational database management system emphasizing extensibility and SQL compliance. It offers advanced features like recursive CTEs, transactional DDL, full-text indexing, and JSONB columns, making it the database of choice for modern, relational systems.'
  },
  mongodb: {
    label: 'MongoDB',
    icon: '🍃',
    monacoId: 'javascript',
    difficulty: 'Intermediate',
    useCase: 'NoSQL Document Store',
    jobDemand: '★★★★☆',
    year: 2009,
    creator: '10gen / MongoDB Inc.',
    deviconClass: 'devicon-mongodb-plain',
    explanation: 'MongoDB is a source-available cross-platform document-oriented NoSQL database program. It uses JSON-like BSON documents with schema validation, allowing dynamic, highly flexible data models. It is heavily integrated into web stacks like MERN (MongoDB, Express, React, Node).'
  },
  redis: {
    label: 'Redis',
    icon: '🔴',
    monacoId: 'redis',
    difficulty: 'Intermediate',
    useCase: 'In-Memory Cache / DB',
    jobDemand: '★★★☆☆',
    year: 2009,
    creator: 'Salvatore Sanfilippo',
    deviconClass: 'devicon-redis-plain',
    explanation: 'Redis (Remote Dictionary Server) is an in-memory data structure store, used as a distributed, in-memory key-value database, cache, and message broker. It supports data structures such as strings, hashes, lists, sets, and sorted sets, operating at microsecond response latencies.'
  },
  cassandra: {
    label: 'Apache Cassandra',
    icon: '👁️',
    monacoId: 'sql',
    difficulty: 'Advanced',
    useCase: 'Wide-Column Big Data',
    jobDemand: '★★★★☆',
    year: 2008,
    creator: 'Avinash Lakshman & Prashant Malik',
    deviconClass: 'devicon-cassandra-plain',
    explanation: 'Apache Cassandra is a free and open-source, distributed, wide-column NoSQL database management system designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure. It is used by massive tech enterprises like Apple, Netflix, and eBay for high-velocity global operations.'
  },
  neo4j: {
    label: 'Neo4j',
    icon: '🕸️',
    monacoId: 'cypher',
    difficulty: 'Advanced',
    useCase: 'Graph database & Networks',
    jobDemand: '★★★☆☆',
    year: 2007,
    creator: 'Emil Eifrem',
    deviconClass: 'devicon-neo4j-plain',
    explanation: 'Neo4j is the world\'s leading graph database management system. It is designed to store and process data in nodes and relationships rather than tables, making it extremely efficient for querying highly connected data networks. Typical use cases include social networks, recommendation engines, fraud detection, and knowledge graphs.'
  },
  // SYSTEMS
  bash: {
    label: 'Bash / Shell',
    icon: '💻',
    monacoId: 'shell',
    difficulty: 'Intermediate',
    useCase: 'Linux Scripting & DevOps',
    jobDemand: '★★★★☆',
    year: 1989,
    creator: 'Brian Fox (GNU)',
    deviconClass: 'devicon-bash-plain',
    explanation: 'Bash is a Unix shell and command language written by Brian Fox for the GNU Project as a free software replacement for the Bourne shell. It is the default terminal environment for most Linux and macOS systems, making it the core scripting engine for system tasks, Docker orchestration, and automation.'
  },
  r: {
    label: 'R Language',
    icon: '📊',
    monacoId: 'r',
    difficulty: 'Intermediate',
    useCase: 'Statistics & Data Science',
    jobDemand: '★★★☆☆',
    year: 1993,
    creator: 'Ross Ihaka & Robert Gentleman',
    deviconClass: 'devicon-r-plain',
    explanation: 'R is a programming language and free software environment for statistical computing and graphics. It is widely used among statisticians, data miners, and bioinformaticians for data analysis, calculations, modeling, and plotting, supporting libraries like ggplot2 and tidyverse.'
  },
  matlab: {
    label: 'MATLAB',
    icon: '🔬',
    monacoId: 'matlab',
    difficulty: 'Advanced',
    useCase: 'Engineering & Simulation',
    jobDemand: '★★★☆☆',
    year: 1984,
    creator: 'Cleve Moler (MathWorks)',
    deviconClass: 'devicon-matlab-plain',
    explanation: 'MATLAB (matrix laboratory) is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. It allows matrix manipulations, plotting of functions and data, implementation of algorithms, and creation of user interfaces, used heavily in control engineering, signal processing, and physics.'
  },
  react: {
    label: 'React',
    icon: '⚛️',
    monacoId: 'javascript',
    difficulty: 'Intermediate',
    useCase: 'Component-Based UI',
    jobDemand: '★★★★★',
    year: 2013,
    creator: 'Jordan Walke (Meta)',
    deviconClass: 'devicon-react-original',
    explanation: 'React is a popular free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta and a community of individual developers and companies.'
  },
  angular: {
    label: 'Angular',
    icon: '🅰️',
    monacoId: 'typescript',
    difficulty: 'Advanced',
    useCase: 'Enterprise SPA Apps',
    jobDemand: '★★★★☆',
    year: 2016,
    creator: 'Google',
    deviconClass: 'devicon-angularjs-plain',
    explanation: 'Angular is a TypeScript-based, free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.'
  },
  vue: {
    label: 'Vue.js',
    icon: '🟢',
    monacoId: 'html',
    difficulty: 'Intermediate',
    useCase: 'Progressive UI Development',
    jobDemand: '★★★★☆',
    year: 2014,
    creator: 'Evan You',
    deviconClass: 'devicon-vuejs-plain',
    explanation: 'Vue.js is an open-source model–view–viewmodel front-end JavaScript framework for building user interfaces and single-page applications.'
  },
  svelte: {
    label: 'Svelte',
    icon: '🔥',
    monacoId: 'html',
    difficulty: 'Intermediate',
    useCase: 'High Performance UI Compiler',
    jobDemand: '★★★☆☆',
    year: 2016,
    creator: 'Rich Harris',
    deviconClass: 'devicon-svelte-plain',
    explanation: 'Svelte is a free and open-source front-end compiler created by Rich Harris. Unlike traditional frameworks like React and Vue, which do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app.'
  },
  nextjs: {
    label: 'Next.js',
    icon: '▲',
    monacoId: 'javascript',
    difficulty: 'Advanced',
    useCase: 'React Framework for the Web',
    jobDemand: '★★★★★',
    year: 2016,
    creator: 'Vercel',
    deviconClass: 'devicon-nextjs-original',
    explanation: 'Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites.'
  },
  bootstrap: {
    label: 'Bootstrap',
    icon: '🅱️',
    monacoId: 'html',
    difficulty: 'Beginner',
    useCase: 'Responsive UI Design Templates',
    jobDemand: '★★★★☆',
    year: 2011,
    creator: 'Mark Otto & Jacob Thornton (Twitter)',
    deviconClass: 'devicon-bootstrap-plain',
    explanation: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains HTML, CSS and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.'
  },
  tailwind: {
    label: 'Tailwind CSS',
    icon: '🍃',
    monacoId: 'html',
    difficulty: 'Beginner',
    useCase: 'Utility-First Web Styling',
    jobDemand: '★★★★★',
    year: 2017,
    creator: 'Adam Wathan',
    deviconClass: 'devicon-tailwindcss-plain',
    explanation: 'Tailwind CSS is an open-source CSS framework. The main feature of this library is that, unlike other CSS frameworks like Bootstrap, it does not provide a series of predefined classes for elements such as buttons or tables. Instead, it provides utility classes that allow you to style elements directly.'
  },
  nodejs: {
    label: 'Node.js',
    icon: '🟢',
    monacoId: 'javascript',
    difficulty: 'Intermediate',
    useCase: 'Server-Side JavaScript Runtime',
    jobDemand: '★★★★★',
    year: 2009,
    creator: 'Ryan Dahl',
    deviconClass: 'devicon-nodejs-plain',
    explanation: 'Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser, allowing developers to use JS to write command-line tools and server-side scripts.'
  },
  express: {
    label: 'Express.js',
    icon: '🚂',
    monacoId: 'javascript',
    difficulty: 'Intermediate',
    useCase: 'Node.js Web APIs & Routing',
    jobDemand: '★★★★★',
    year: 2010,
    creator: 'TJ Holowaychuk',
    deviconClass: 'devicon-express-original',
    explanation: 'Express.js, or simply Express, is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications, widely used to build APIs and backend servers.'
  },
  fastify: {
    label: 'Fastify',
    icon: '⚡',
    monacoId: 'javascript',
    difficulty: 'Intermediate',
    useCase: 'High Performance Node.js APIs',
    jobDemand: '★★★☆☆',
    year: 2016,
    creator: 'Matteo Collina & Tomas Della Vedova',
    deviconClass: 'devicon-fastify-plain',
    explanation: 'Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture, inspired by Hapi and Express.'
  },
  django: {
    label: 'Django',
    icon: '🎸',
    monacoId: 'python',
    difficulty: 'Intermediate',
    useCase: 'Batteries-Included Python Web',
    jobDemand: '★★★★☆',
    year: 2005,
    creator: 'Adrian Holovaty & Simon Willison',
    deviconClass: 'devicon-django-plain',
    explanation: 'Django is a Python-based free and open-source web framework that follows the model–template–views architectural pattern. It encourages rapid development and clean, pragmatic design.'
  },
  flask: {
    label: 'Flask',
    icon: '🧪',
    monacoId: 'python',
    difficulty: 'Beginner',
    useCase: 'Micro Web Development in Python',
    jobDemand: '★★★★☆',
    year: 2010,
    creator: 'Armin Ronacher',
    deviconClass: 'devicon-flask-original',
    explanation: 'Flask is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions.'
  },
  fastapi: {
    label: 'FastAPI',
    icon: '⚡',
    monacoId: 'python',
    difficulty: 'Intermediate',
    useCase: 'High Performance Python APIs',
    jobDemand: '★★★★☆',
    year: 2018,
    creator: 'Sebastián Ramírez',
    deviconClass: 'devicon-fastapi-plain',
    explanation: 'FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.8+ based on standard Python type hints. It is built on top of Starlette for web parts and Pydantic for data parts.'
  },
  springboot: {
    label: 'Spring Boot',
    icon: '🍃',
    monacoId: 'java',
    difficulty: 'Advanced',
    useCase: 'Enterprise Java Web Microservices',
    jobDemand: '★★★★★',
    year: 2014,
    creator: 'Pivotal Software',
    deviconClass: 'devicon-spring-plain',
    explanation: 'Spring Boot is an open-source Java-based framework used to create microservices. It is developed by Pivotal Team and is used to build stand-alone, production-grade Spring applications that can be "just run".'
  },
  aspnetcore: {
    label: 'ASP.NET Core',
    icon: '🌐',
    monacoId: 'csharp',
    difficulty: 'Advanced',
    useCase: 'Enterprise .NET Web Apps',
    jobDemand: '★★★★☆',
    year: 2016,
    creator: 'Microsoft',
    deviconClass: 'devicon-dotnetcore-plain',
    explanation: 'ASP.NET Core is a free, open-source, and cross-platform framework for building modern, cloud-enabled, internet-connected applications, such as web apps, IoT apps, and mobile backends.'
  },
  laravel: {
    label: 'Laravel',
    icon: '🟥',
    monacoId: 'php',
    difficulty: 'Intermediate',
    useCase: 'Elegant PHP Framework',
    jobDemand: '★★★★★',
    year: 2011,
    creator: 'Taylor Otwell',
    deviconClass: 'devicon-laravel-original',
    explanation: 'Laravel is a free, open-source PHP web framework, created by Taylor Otwell and intended for the development of web applications following the model–view–controller architectural pattern.'
  },
  codeigniter: {
    label: 'CodeIgniter',
    icon: '🔥',
    monacoId: 'php',
    difficulty: 'Beginner',
    useCase: 'Lightweight PHP Apps',
    jobDemand: '★★★☆☆',
    year: 2006,
    creator: 'EllisLab',
    deviconClass: 'devicon-codeigniter-plain',
    explanation: 'CodeIgniter is an open-source software rapid development web framework, for use in building dynamic web sites with PHP. It is known for its small footprint, performance, and clear documentation.'
  },
  rails: {
    label: 'Ruby on Rails',
    icon: '🛤️',
    monacoId: 'ruby',
    difficulty: 'Intermediate',
    useCase: 'Fullstack Ruby Apps',
    jobDemand: '★★★☆☆',
    year: 2004,
    creator: 'David Heinemeier Hansson',
    deviconClass: 'devicon-rails-plain',
    explanation: 'Ruby on Rails, or simply Rails, is a server-side web application framework written in Ruby under the MIT License. Rails is a model–view–controller framework, providing default structures for a database, a web service, and web pages.'
  },
  gin: {
    label: 'Gin',
    icon: '🍸',
    monacoId: 'go',
    difficulty: 'Intermediate',
    useCase: 'High Performance Go APIs',
    jobDemand: '★★★☆☆',
    year: 2014,
    creator: 'Gin Gonic Team',
    deviconClass: 'devicon-go-plain',
    explanation: 'Gin is a HTTP web framework written in Go (Golang). It features a Martini-like API with much better performance, up to 40 times faster. If you need crushing performance, get yourself some Gin.'
  },
  echo: {
    label: 'Echo',
    icon: '🔊',
    monacoId: 'go',
    difficulty: 'Intermediate',
    useCase: 'Go Web Applications',
    jobDemand: '★★★☆☆',
    year: 2015,
    creator: 'LabStack',
    deviconClass: 'devicon-go-plain',
    explanation: 'Echo is a high performance, extensible, minimalist Go web framework. It provides highly optimized HTTP router, grouping, middleware, data binding, and template rendering features.'
  },
  actix: {
    label: 'Actix Web',
    icon: '⚙️',
    monacoId: 'rust',
    difficulty: 'Advanced',
    useCase: 'Ultra-Fast Rust Web Services',
    jobDemand: '★★★☆☆',
    year: 2017,
    creator: 'Actix Project',
    deviconClass: 'devicon-rust-plain',
    explanation: 'Actix Web is a powerful, pragmatic, and extremely fast web framework for Rust. It uses an actor-system model and provides standard routing, middleware, and HTTP protocols with peak bare-metal speeds.'
  },
  rocket: {
    label: 'Rocket',
    icon: '🚀',
    monacoId: 'rust',
    difficulty: 'Intermediate',
    useCase: 'Type-Safe Rust Web Framework',
    jobDemand: '★★★☆☆',
    year: 2016,
    creator: 'Sergio Benitez',
    deviconClass: 'devicon-rust-plain',
    explanation: 'Rocket is an asynchronous web framework for Rust with a focus on usability, security, extensibility, and speed. It has a beautiful syntax and compile-time validation for requests.'
  },
  ktor: {
    label: 'Ktor',
    icon: '☁️',
    monacoId: 'kotlin',
    difficulty: 'Advanced',
    useCase: 'Asynchronous Kotlin Apps',
    jobDemand: '★★★☆☆',
    year: 2018,
    creator: 'JetBrains',
    deviconClass: 'devicon-kotlin-plain',
    explanation: 'Ktor is an asynchronous framework for creating microservices, web applications, and more, built from the ground up using Kotlin and coroutines.'
  },
  playframework: {
    label: 'Play Framework',
    icon: '🎭',
    monacoId: 'scala',
    difficulty: 'Advanced',
    useCase: 'Scalable JVM Web',
    jobDemand: '★★★☆☆',
    year: 2007,
    creator: 'Guillaume Bort',
    deviconClass: 'devicon-scala-plain',
    explanation: 'Play Framework is an open-source web application framework which follows the model–view–controller architectural pattern. It is written in Scala and Java, designed for highly scalable architectures.'
  },
  oracle: {
    label: 'Oracle DB',
    icon: '🔴',
    monacoId: 'sql',
    difficulty: 'Advanced',
    useCase: 'Enterprise Relational DB',
    jobDemand: '★★★★☆',
    year: 1979,
    creator: 'Larry Ellison & Bob Miner',
    deviconClass: 'devicon-oracle-original',
    explanation: 'Oracle Database is a proprietary multi-model database management system produced and marketed by Oracle Corporation. It is commonly used for running online transaction processing and data warehousing.'
  },
  mssql: {
    label: 'MS SQL Server',
    icon: '🗄️',
    monacoId: 'sql',
    difficulty: 'Intermediate',
    useCase: 'Windows Enterprise Relational DB',
    jobDemand: '★★★★☆',
    year: 1989,
    creator: 'Microsoft',
    deviconClass: 'devicon-microsoftsqlserver-plain',
    explanation: 'Microsoft SQL Server is a relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications.'
  },
  firebase: {
    label: 'Firebase DB',
    icon: '🔥',
    monacoId: 'json',
    difficulty: 'Beginner',
    useCase: 'Realtime JSON Cloud DB',
    jobDemand: '★★★★☆',
    year: 2011,
    creator: 'Firebase Inc. (Google)',
    deviconClass: 'devicon-firebase-plain',
    explanation: 'Firebase Realtime Database is a cloud-hosted NoSQL database that lets you store and sync data between your users in real time. It stores data as JSON and synchronizes it across all clients.'
  },
  firestore: {
    label: 'Cloud Firestore',
    icon: '🔥',
    monacoId: 'json',
    difficulty: 'Intermediate',
    useCase: 'Scalable NoSQL Cloud DB',
    jobDemand: '★★★★☆',
    year: 2017,
    creator: 'Google',
    deviconClass: 'devicon-firebase-plain',
    explanation: 'Cloud Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud. It keeps your data in sync across client apps through realtime listeners.'
  },
  objectivec: {
    label: 'Objective-C',
    icon: '🍎',
    monacoId: 'objectivec',
    difficulty: 'Advanced',
    useCase: 'Legacy iOS Development',
    jobDemand: '★★☆☆☆',
    year: 1984,
    creator: 'Brad Cox & Tom Love',
    deviconClass: 'devicon-objectivec-plain',
    explanation: 'Objective-C is a general-purpose, object-oriented programming language that adds Smalltalk-style messaging to the C programming language. It was the main programming language supported by Apple for iOS and OS X.'
  },
  julia: {
    label: 'Julia',
    icon: '🟢',
    monacoId: 'julia',
    difficulty: 'Advanced',
    useCase: 'Numerical & Scientific Computing',
    jobDemand: '★★★☆☆',
    year: 2012,
    creator: 'Jeff Bezanson, Stefan Karpinski, Viral B. Shah',
    deviconClass: 'devicon-julia-plain',
    explanation: 'Julia is a high-level, high-performance, dynamic programming language. While it is a general-purpose language and can be used to write any application, many of its features are well-suited for numerical analysis and computational science.'
  },
  powershell: {
    label: 'PowerShell',
    icon: '🟦',
    monacoId: 'powershell',
    difficulty: 'Intermediate',
    useCase: 'Windows Automation & Scripting',
    jobDemand: '★★★★☆',
    year: 2006,
    creator: 'Microsoft (Jeffrey Snover)',
    deviconClass: 'devicon-powershell-plain',
    explanation: 'PowerShell is a task automation and configuration management program from Microsoft, consisting of a command-line shell and the associated scripting language.'
  },
  solidity: {
    label: 'Solidity',
    icon: '💎',
    monacoId: 'solidity',
    difficulty: 'Advanced',
    useCase: 'Ethereum Smart Contracts',
    jobDemand: '★★★★☆',
    year: 2014,
    creator: 'Gavin Wood, Christian Reitwiessner',
    deviconClass: 'devicon-solidity-plain',
    explanation: 'Solidity is an object-oriented programming language for writing smart contracts. It is used for implementing smart contracts on various blockchain platforms, most notably, Ethereum.'
  },
  erlang: {
    label: 'Erlang',
    icon: '⚙️',
    monacoId: 'erlang',
    difficulty: 'Advanced',
    useCase: 'Telecom & Fault-Tolerant Systems',
    jobDemand: '★★★☆☆',
    year: 1986,
    creator: 'Joe Armstrong, Robert Virding, Mike Williams',
    deviconClass: 'devicon-erlang-plain',
    explanation: 'Erlang is a general-purpose, concurrent, functional programming language, as well as a garbage-collected runtime system. It is designed for building highly concurrent, distributed, fault-tolerant systems.'
  },
  cobol: {
    label: 'COBOL',
    icon: '⚙️',
    monacoId: 'cobol',
    difficulty: 'Advanced',
    useCase: 'Legacy Mainframe Banking',
    jobDemand: '★★☆☆☆',
    year: 1959,
    creator: 'CODASYL, Grace Hopper',
    deviconClass: 'devicon-cobol-plain',
    explanation: 'COBOL (Common Business-Oriented Language) is a compiled English-like computer programming language designed for business use. It is legacy, but still powers major banking mainframe systems worldwide.'
  },
  fortran: {
    label: 'Fortran',
    icon: '⚙️',
    monacoId: 'fortran',
    difficulty: 'Advanced',
    useCase: 'Legacy Scientific Computing',
    jobDemand: '★★☆☆☆',
    year: 1957,
    creator: 'John Backus (IBM)',
    deviconClass: 'devicon-fortran-plain',
    explanation: 'Fortran is a general-purpose, compiled imperative programming language that is especially suited to numeric computation and scientific computing. It is one of the oldest programming languages, still used in supercomputers.'
  },

  // ── NEW PHASE 2 LANGUAGES ──────────────────────────────────────────────────

  nuxtjs: {
    label: 'Nuxt.js',
    icon: '💚',
    monacoId: 'javascript',
    difficulty: 'Intermediate',
    useCase: 'Vue.js SSR & Static Sites',
    jobDemand: '★★★★☆',
    year: 2016,
    creator: 'Sebastien & Alexandre Chopin',
    deviconClass: 'devicon-nuxtjs-plain',
    explanation: 'Nuxt.js is the full-stack framework for Vue.js applications. It adds Server Side Rendering, static site generation, file-based routing, and automatic code splitting on top of Vue.'
  },
  nestjs: {
    label: 'NestJS',
    icon: '🔴',
    monacoId: 'typescript',
    difficulty: 'Intermediate',
    useCase: 'Enterprise Node.js APIs',
    jobDemand: '★★★★★',
    year: 2017,
    creator: 'Kamil Mysliwiec',
    deviconClass: 'devicon-nestjs-plain',
    explanation: 'NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It is TypeScript-first and uses decorators inspired by Angular architecture.'
  },
  lua: {
    label: 'Lua',
    icon: '🌙',
    monacoId: 'lua',
    difficulty: 'Beginner',
    useCase: 'Game Scripting & Embedding',
    jobDemand: '★★★☆☆',
    year: 1993,
    creator: 'PUC-Rio (Roberto Ierusalimschy)',
    deviconClass: 'devicon-lua-plain',
    explanation: 'Lua is a lightweight, high-level, multi-paradigm programming language designed primarily for embedded systems and scripting in games. It powers Roblox, World of Warcraft addons, and Nginx configurations.'
  },
  gdscript: {
    label: 'GDScript',
    icon: '🎮',
    monacoId: 'python',
    difficulty: 'Beginner',
    useCase: 'Godot Game Engine Scripting',
    jobDemand: '★★★☆☆',
    year: 2014,
    creator: 'Juan Linietsky (Godot)',
    deviconClass: 'devicon-godot-plain',
    explanation: 'GDScript is a high-level, dynamically typed programming language used to create content in the Godot game engine. Its Python-like syntax makes it easy for beginners to script 2D and 3D games.'
  },
  wasm: {
    label: 'WebAssembly',
    icon: '🔷',
    monacoId: 'plaintext',
    difficulty: 'Advanced',
    useCase: 'High-Performance Browser Code',
    jobDemand: '★★★★☆',
    year: 2017,
    creator: 'W3C (Mozilla, Google, Apple, MS)',
    deviconClass: '',
    explanation: 'WebAssembly (Wasm) is a binary instruction format for a stack-based virtual machine, running at near-native speeds in the browser. It enables C, C++, and Rust code to execute inside web applications.'
  },
  clojure: {
    label: 'Clojure',
    icon: '🔵',
    monacoId: 'clojure',
    difficulty: 'Advanced',
    useCase: 'Functional JVM Programming',
    jobDemand: '★★★☆☆',
    year: 2007,
    creator: 'Rich Hickey',
    deviconClass: 'devicon-clojure-plain',
    explanation: 'Clojure is a dynamic, functional programming language targeting the JVM. It emphasizes immutability, simple concurrency models, and Lisp-like macros for elegant data transformations and distributed systems.'
  },
  fsharp: {
    label: 'F#',
    icon: '🟣',
    monacoId: 'fsharp',
    difficulty: 'Advanced',
    useCase: 'Functional .NET Development',
    jobDemand: '★★★☆☆',
    year: 2005,
    creator: 'Don Syme (Microsoft Research)',
    deviconClass: 'devicon-fsharp-plain',
    explanation: 'F# is a mature, open source, cross-platform, functional-first programming language on the .NET platform. It excels at data science, financial modeling, and domain-driven design with strong type safety.'
  },
  groovy: {
    label: 'Groovy',
    icon: '🟢',
    monacoId: 'groovy',
    difficulty: 'Intermediate',
    useCase: 'JVM Scripting & Jenkins CI/CD',
    jobDemand: '★★★☆☆',
    year: 2003,
    creator: 'James Strachan',
    deviconClass: 'devicon-groovy-plain',
    explanation: 'Apache Groovy is a powerful JVM scripting language with Java-compatible syntax but dynamic features. It is widely used for Gradle build automation, Jenkins CI/CD pipelines, and rapid JVM scripting.'
  },
  elasticsearch: {
    label: 'Elasticsearch',
    icon: '🔍',
    monacoId: 'json',
    difficulty: 'Intermediate',
    useCase: 'Full-Text Search & Analytics',
    jobDemand: '★★★★☆',
    year: 2010,
    creator: 'Shay Banon (Elastic)',
    deviconClass: 'devicon-elasticsearch-plain',
    explanation: 'Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. It enables lightning-fast full-text searches, log analytics (ELK Stack), and real-time data exploration.'
  },
  dynamodb: {
    label: 'DynamoDB',
    icon: '☁️',
    monacoId: 'json',
    difficulty: 'Intermediate',
    useCase: 'AWS Serverless NoSQL',
    jobDemand: '★★★★☆',
    year: 2012,
    creator: 'Amazon Web Services',
    deviconClass: 'devicon-amazonwebservices-plain',
    explanation: 'Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database by AWS. It delivers single-digit millisecond performance at any scale, making it ideal for mobile, web, and gaming applications.'
  },
  prisma: {
    label: 'Prisma',
    icon: '🔺',
    monacoId: 'prisma',
    difficulty: 'Beginner',
    useCase: 'TypeScript ORM for Node.js',
    jobDemand: '★★★★★',
    year: 2019,
    creator: 'Prisma (Johannes Schickling)',
    deviconClass: '',
    explanation: 'Prisma is a next-generation ORM for Node.js and TypeScript. It replaces raw SQL and traditional ORMs, providing type-safe database queries, automated migrations, and an intuitive schema definition language.'
  },
  typeorm: {
    label: 'TypeORM',
    icon: '🗄️',
    monacoId: 'typescript',
    difficulty: 'Intermediate',
    useCase: 'TypeScript Database ORM',
    jobDemand: '★★★★☆',
    year: 2016,
    creator: 'Umed Khudoiberdiev',
    deviconClass: '',
    explanation: 'TypeORM is an ORM (Object-Relational Mapper) that runs in Node.js and TypeScript. It supports Active Record and Data Mapper patterns, and works with MySQL, PostgreSQL, SQLite, and MongoDB.'
  },
  docker: {
    label: 'Docker',
    icon: '🐳',
    monacoId: 'dockerfile',
    difficulty: 'Intermediate',
    useCase: 'App Containerization & DevOps',
    jobDemand: '★★★★★',
    year: 2013,
    creator: 'Solomon Hykes (dotCloud)',
    deviconClass: 'devicon-docker-plain',
    explanation: 'Docker is a platform for developing, shipping, and running applications inside containers. Containers package your code and all its dependencies so the application runs identically on every machine.'
  },
  kubernetes: {
    label: 'Kubernetes',
    icon: '⚙️',
    monacoId: 'yaml',
    difficulty: 'Advanced',
    useCase: 'Container Orchestration at Scale',
    jobDemand: '★★★★★',
    year: 2014,
    creator: 'Google (Open Source)',
    deviconClass: 'devicon-kubernetes-plain',
    explanation: 'Kubernetes (K8s) is an open-source container orchestration system for automating deployment, scaling, and management of containerized applications. It is the backbone of modern cloud-native infrastructure.'
  },
  terraform: {
    label: 'Terraform',
    icon: '🏗️',
    monacoId: 'hcl',
    difficulty: 'Intermediate',
    useCase: 'Infrastructure as Code (IaC)',
    jobDemand: '★★★★★',
    year: 2014,
    creator: 'HashiCorp',
    deviconClass: 'devicon-terraform-plain',
    explanation: 'Terraform is an infrastructure as code tool by HashiCorp that lets you define cloud resources (servers, databases, networks) in configuration files, then provision them safely and repeatably across all major cloud providers.'
  },
  nginx: {
    label: 'Nginx',
    icon: '🌐',
    monacoId: 'nginx',
    difficulty: 'Intermediate',
    useCase: 'Web Server & Reverse Proxy',
    jobDemand: '★★★★★',
    year: 2004,
    creator: 'Igor Sysoev',
    deviconClass: 'devicon-nginx-plain',
    explanation: 'Nginx is a high-performance open-source web server, reverse proxy, load balancer, and HTTP cache. It is the most widely deployed web server on the internet and handles millions of concurrent connections efficiently.'
  }
};

// ─── DEFAULT STARTER CODES ───────────────────────────────────────────────────
export const DEFAULT_CODES = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Hero Page</title>
</head>
<body>
  <div class="hero-card">
    <h1>⚔️ Welcome, Code Warrior!</h1>
    <p>You have entered the <strong>CODE.Q Arena</strong>.</p>
    <button onclick="alert('Quest Started! 🚀')">Begin Quest</button>
  </div>
</body>
</html>`,

  css: `/* 🎨 Style your hero card */
.hero-card {
  background: linear-gradient(135deg, #0f0f20, #1a1a3e);
  border: 2px solid #00f5ff;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  color: #ffffff;
  box-shadow: 0 0 40px rgba(0, 245, 255, 0.3);
}

h1 {
  font-size: 2rem;
  color: #00f5ff;
}

button {
  background: #00f5ff;
  color: #000;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}`,

  javascript: `// ⚡ JavaScript — the magic wand of the web
const hero = {
  name: "Code Warrior",
  level: 1,
  xp: 0,
};

function gainXP(amount) {
  hero.xp += amount;
  if (hero.xp >= 100) {
    hero.level++;
    hero.xp = 0;
    console.log(\`🎉 Level Up! Now Level \${hero.level}\`);
  }
}

gainXP(50);
gainXP(75);
console.log("Hero:", hero);`,

  typescript: `// 🔷 TypeScript — JavaScript with superpowers (type safety)
interface Hero {
  name: string;
  level: number;
  health: number;
  skills: string[];
}

function levelUp(hero: Hero): Hero {
  return {
    ...hero,
    level: hero.level + 1,
    health: hero.health + 20,
  };
}

const warrior: Hero = {
  name: "TypeScript Knight",
  level: 1,
  health: 100,
  skills: ["Type Guard", "Interface Shield"],
};

const upgraded = levelUp(warrior);
console.log("Upgraded Hero:", upgraded);`,

  json: `{
  "hero": {
    "name": "JSON Guardian",
    "level": 5,
    "stats": {
      "health": 250,
      "mana": 180,
      "attack": 75
    },
    "inventory": [
      { "item": "Iron Sword", "damage": 45, "rarity": "common" },
      { "item": "Mana Potion", "restores": 50, "rarity": "uncommon" },
      { "item": "Dragon Shield", "defense": 80, "rarity": "legendary" }
    ],
    "quests_completed": ["The First Bug", "Loop of Doom", "CSS Dungeon"],
    "is_premium": false
  },
  "server": {
    "version": "2.0.0",
    "status": "online",
    "region": "ap-south-1"
  }
}`,

  xml: `<?xml version="1.0" encoding="UTF-8"?>
<!-- XML — the ancient scroll format of data transfer -->
<game>
  <hero id="hero_001">
    <name>XML Paladin</name>
    <level>7</level>
    <stats>
      <health>300</health>
      <mana>200</mana>
      <attack>90</attack>
    </stats>
    <inventory>
      <item rarity="legendary">
        <name>Staff of Types</name>
        <damage>120</damage>
      </item>
      <item rarity="rare">
        <name>Schema Armor</name>
        <defense>100</defense>
      </item>
    </inventory>
  </hero>
  <world>
    <map>The Code Realm</map>
    <difficulty>Hard</difficulty>
  </world>
</game>`,

  yaml: `# YAML — Human-readable config used in Docker, Kubernetes, CI/CD
# Run this to validate YAML structure

name: codequest-app
version: "2.0.0"
environment: production

server:
  host: 0.0.0.0
  port: 3000
  ssl: true

database:
  engine: postgresql
  host: db.codequest.app
  port: 5432
  name: codequest_db
  pool_size: 10

features:
  ai_copilot: true
  leaderboard: true
  premium_tier: true
  supported_languages:
    - javascript
    - python
    - rust
    - go

hero:
  name: YAML Ranger
  level: 4
  skills:
    - name: Config Mastery
      level: 5
    - name: Docker Wizardry
      level: 3`,

  markdown: `# 🧙 The CODE.Q Spellbook

> A warrior who can write documentation is **twice as powerful** as one who cannot.

## ⚔️ Hero Skills

| Skill | Level | Damage |
|-------|-------|--------|
| Array Slash | ★★★★☆ | 80 |
| Recursive Strike | ★★★☆☆ | 65 |
| Async Thunder | ★★★★★ | 120 |

## 🗺️ Quest Log

1. **The First Function** — Completed ✅
2. **Loop of Infinite Trials** — In Progress 🔄
3. **The API Dragon** — Locked 🔒

## 💡 Pro Tip

\`\`\`javascript
// Always name your variables clearly
const heroName = "Code Warrior"; // ✅ Good
const x = "Code Warrior";       // ❌ Bad
\`\`\`

## 📜 About Markdown
Markdown is rendered in **GitHub READMEs**, **Notion**, **Obsidian**, and **100+ tools**. 
Every developer *must* know it!`,

  graphql: `# 🔗 GraphQL — Query exactly what you need, nothing more

# Define the data shape (Schema)
type Hero {
  id: ID!
  name: String!
  level: Int!
  health: Float!
  skills: [Skill!]!
}

type Skill {
  name: String!
  damage: Int
  mana_cost: Int
}

type Query {
  hero(id: ID!): Hero
  heroes(minLevel: Int): [Hero!]!
  leaderboard(limit: Int = 10): [Hero!]!
}

type Mutation {
  createHero(name: String!, class: String!): Hero!
  levelUp(heroId: ID!): Hero!
  equipSkill(heroId: ID!, skillName: String!): Hero!
}

# Example Query (sent from client):
# {
#   hero(id: "hero_001") {
#     name
#     level
#     skills { name damage }
#   }
# }`,

  python: `# 🐍 Python 3 — Syntax Analyzer Mode
# (Full execution requires a Python runtime)

# Variables & Data Types
hero_name = "Python Sage"
hero_level = 10
hero_health = 250.5
is_premium = True

# List (like JS Array)
inventory = ["Dragon Sword", "Mana Potion", "Scroll of Types"]

# Dictionary (like JS Object)
hero_stats = {
    "attack": 95,
    "defense": 70,
    "speed": 85
}

# Function definition
def gain_xp(current_xp: int, amount: int) -> int:
    """Award XP and return new total."""
    return current_xp + amount

# Class definition
class Hero:
    def __init__(self, name: str, level: int):
        self.name = name
        self.level = level
    
    def level_up(self):
        self.level += 1
        return f"{self.name} is now Level {self.level}! 🎉"

# Conditional logic
xp = gain_xp(0, 150)
if xp >= 100:
    print(f"🎉 Level Up! XP: {xp}")
else:
    print(f"Keep going! XP: {xp}")

# List comprehension (unique Python feature)
high_level_skills = [s for s in inventory if len(s) > 8]
print("Long-name items:", high_level_skills)`,

  java: `// ☕ Java — Syntax Analyzer Mode
// (Full execution requires JVM runtime)

import java.util.ArrayList;
import java.util.List;

// Class is the fundamental building block in Java
public class Hero {
    // Fields (properties)
    private String name;
    private int level;
    private double health;
    private List<String> skills;

    // Constructor
    public Hero(String name, int level) {
        this.name = name;
        this.level = level;
        this.health = 100.0;
        this.skills = new ArrayList<>();
    }

    // Method
    public void levelUp() {
        this.level++;
        this.health += 20.0;
        System.out.println(name + " leveled up to " + level + "! 🎉");
    }

    public void addSkill(String skill) {
        this.skills.add(skill);
    }

    // Main entry point
    public static void main(String[] args) {
        Hero warrior = new Hero("Java Knight", 1);
        warrior.addSkill("Object Slash");
        warrior.addSkill("Inheritance Strike");
        warrior.levelUp();
        warrior.levelUp();
        System.out.println("Final level: " + warrior.level);
    }
}`,

  csharp: `// 🎯 C# — Syntax Analyzer Mode
// (Full execution requires .NET runtime)

using System;
using System.Collections.Generic;
using System.Linq;

namespace CodeQuestGame
{
    // Interface — defines a contract
    public interface IHero
    {
        string Name { get; }
        int Level { get; }
        void LevelUp();
    }

    // Class implementing the interface
    public class Hero : IHero
    {
        public string Name { get; private set; }
        public int Level { get; private set; }
        public List<string> Skills { get; private set; }

        public Hero(string name)
        {
            Name = name;
            Level = 1;
            Skills = new List<string>();
        }

        public void LevelUp()
        {
            Level++;
            Console.WriteLine($"🎉 {Name} reached Level {Level}!");
        }

        // LINQ query — unique C# feature
        public IEnumerable<string> GetPowerfulSkills() =>
            Skills.Where(s => s.Contains("Ultimate"));
    }

    class Program
    {
        static void Main(string[] args)
        {
            var hero = new Hero("C# Paladin");
            hero.Skills.Add("Ultimate Sword");
            hero.Skills.Add("Basic Punch");
            hero.LevelUp();
            Console.WriteLine("Powerful skills: " + 
                string.Join(", ", hero.GetPowerfulSkills()));
        }
    }
}`,

  go: `// 🐹 Go (Golang) — Syntax Analyzer Mode
// (Full execution requires Go runtime)

package main

import (
    "fmt"
    "strings"
)

// Struct — Go's version of a class
type Hero struct {
    Name   string
    Level  int
    Health float64
    Skills []string
}

// Method on struct (Go has no classes)
func (h *Hero) LevelUp() {
    h.Level++
    h.Health += 20
    fmt.Printf("🎉 %s is now Level %d!\\n", h.Name, h.Level)
}

// Interface in Go
type Combatant interface {
    LevelUp()
    Attack() int
}

// Goroutine example — Go's superpower
func sendNotification(msg string, ch chan string) {
    ch <- "📨 " + strings.ToUpper(msg)
}

func main() {
    hero := &Hero{
        Name:   "Go Gopher",
        Level:  1,
        Health: 100,
        Skills: []string{"Concurrency Blast", "Channel Strike", "Goroutine Rush"},
    }

    hero.LevelUp()

    // Channel-based goroutine communication
    ch := make(chan string)
    go sendNotification("quest complete!", ch)
    msg := <-ch
    fmt.Println(msg)
    fmt.Printf("Hero: %+v\\n", *hero)
}`,

  rust: `// 🦀 Rust — Syntax Analyzer Mode
// (Full execution requires Rust/Cargo runtime)

use std::collections::HashMap;

// Struct definition
#[derive(Debug, Clone)]
struct Hero {
    name: String,
    level: u32,
    health: f64,
    inventory: Vec<String>,
}

// Implementation block
impl Hero {
    // Constructor (associated function)
    fn new(name: &str) -> Self {
        Hero {
            name: name.to_string(),
            level: 1,
            health: 100.0,
            inventory: Vec::new(),
        }
    }

    fn level_up(&mut self) {
        self.level += 1;
        self.health += 20.0;
        println!("🦀 {} leveled up to {}!", self.name, self.level);
    }

    fn add_item(&mut self, item: &str) {
        self.inventory.push(item.to_string());
    }
}

// Enum — Rust's powerful pattern matching tool
#[derive(Debug)]
enum QuestResult {
    Success(u32),   // XP earned
    Failed(String), // Reason
    Skipped,
}

fn evaluate_quest(score: u32) -> QuestResult {
    match score {
        90..=100 => QuestResult::Success(200),
        50..=89  => QuestResult::Success(100),
        1..=49   => QuestResult::Failed("Score too low".to_string()),
        _        => QuestResult::Skipped,
    }
}

fn main() {
    let mut hero = Hero::new("Rust Crusader");
    hero.add_item("Ownership Shield");
    hero.add_item("Borrow Checker Sword");
    hero.level_up();

    let result = evaluate_quest(95);
    println!("Quest: {:?}", result);
    println!("Hero: {:?}", hero);
}`,

  php: `<?php
// 🐘 PHP — Syntax Analyzer Mode
// (Full execution requires PHP runtime)

// Variables start with $ in PHP
$heroName = "PHP Dragon Slayer";
$heroLevel = 8;
$heroHealth = 300.0;

// Array (can be indexed or associative)
$inventory = ["Iron Sword", "Health Potion", "Mana Crystal"];
$stats = [
    "attack"  => 90,
    "defense" => 65,
    "speed"   => 75,
];

// Class definition
class Hero {
    public string $name;
    private int $level;
    private array $skills = [];

    public function __construct(string $name, int $level = 1) {
        $this->name = $name;
        $this->level = $level;
    }

    public function levelUp(): void {
        $this->level++;
        echo "🎉 {$this->name} is now Level {$this->level}!\\n";
    }

    public function addSkill(string $skill): void {
        $this->skills[] = $skill;
    }

    // Magic method
    public function __toString(): string {
        return "{$this->name} (Lvl {$this->level})";
    }
}

// Interface
interface Combatant {
    public function attack(): int;
}

$hero = new Hero("PHP Knight", 5);
$hero->addSkill("Array Mastery");
$hero->addSkill("PDO Shield");
$hero->levelUp();
echo $hero . "\\n";

// PHP superglobal simulation
echo "Server: " . ($_SERVER['SERVER_NAME'] ?? 'localhost') . "\\n";
?>`,

  ruby: `# 💎 Ruby — Syntax Analyzer Mode
# (Full execution requires Ruby runtime)

# Everything is an object in Ruby
class Hero
  attr_accessor :name, :level, :health
  attr_reader :skills

  def initialize(name, level = 1)
    @name = name
    @level = level
    @health = 100
    @skills = []
    @xp = 0
  end

  def level_up
    @level += 1
    @health += 20
    puts "💎 #{@name} is now Level #{@level}! Health: #{@health}"
  end

  def add_skill(skill)
    @skills << skill
    self # Return self for method chaining
  end

  def gain_xp(amount)
    @xp += amount
    level_up if @xp >= 100
    self
  end

  # Ruby blocks & yield
  def with_boost
    @health += 50
    result = yield if block_given?
    @health -= 50
    result
  end

  def to_s
    "#{@name} | Level: #{@level} | HP: #{@health} | Skills: #{@skills.join(', ')}"
  end
end

# Modules (Mixins) — Ruby's alternative to multiple inheritance
module Magical
  def cast_spell(spell)
    puts "✨ #{@name} casts #{spell}!"
  end
end

class MageHero < Hero
  include Magical
end

mage = MageHero.new("Ruby Sorcerer")
mage.add_skill("Metaprogramming").add_skill("Block Mastery").gain_xp(120)
mage.cast_spell("Frozen Array")
puts mage`,

  kotlin: `// 🚀 Kotlin — Syntax Analyzer Mode
// (Full execution requires JVM/Kotlin runtime)

// Data class — Kotlin's compact record type
data class Hero(
    val name: String,
    var level: Int = 1,
    var health: Double = 100.0,
    val skills: MutableList<String> = mutableListOf()
)

// Extension function — add methods to existing classes
fun Hero.levelUp() {
    level++
    health += 20.0
    println("🚀 $name is now Level $level! HP: $health")
}

// Sealed class — exhaustive when expressions
sealed class QuestResult {
    data class Success(val xp: Int) : QuestResult()
    data class Failure(val reason: String) : QuestResult()
    object Abandoned : QuestResult()
}

// Higher-order function
fun evaluateQuest(score: Int, onComplete: (QuestResult) -> Unit) {
    val result = when {
        score >= 90 -> QuestResult.Success(200)
        score >= 50 -> QuestResult.Success(100)
        score > 0   -> QuestResult.Failure("Score too low: $score")
        else        -> QuestResult.Abandoned
    }
    onComplete(result)
}

fun main() {
    val hero = Hero("Kotlin Ninja")
    hero.skills.addAll(listOf("Coroutine Slash", "Null Safety Shield", "Smart Cast"))
    hero.levelUp()

    evaluateQuest(95) { result ->
        when (result) {
            is QuestResult.Success  -> println("✅ Quest done! +\${result.xp} XP")
            is QuestResult.Failure  -> println("❌ Failed: \${result.reason}")
            QuestResult.Abandoned   -> println("🚪 Quest abandoned")
        }
    }
    println("Hero: $hero")
}`,

  swift: `// 🍎 Swift — Syntax Analyzer Mode
// (Full execution requires Swift/Xcode runtime)

import Foundation

// Protocol — Swift's powerful interface system
protocol Combatant {
    var name: String { get }
    var health: Double { get set }
    mutating func takeDamage(_ amount: Double)
}

// Struct (value type — copied, not referenced)
struct Skill {
    let name: String
    let damage: Int
    let manaCost: Int
}

// Class (reference type)
class Hero: Combatant {
    var name: String
    var level: Int
    var health: Double
    var skills: [Skill]
    
    init(name: String) {
        self.name = name
        self.level = 1
        self.health = 100.0
        self.skills = []
    }
    
    func levelUp() {
        level += 1
        health += 20
        print("🍎 \\(name) reached Level \\(level)!")
    }
    
    func takeDamage(_ amount: Double) {
        health = max(0, health - amount)
    }
}

// Enum with associated values
enum QuestStatus {
    case active(daysLeft: Int)
    case completed(xpEarned: Int)
    case failed(reason: String)
}

// Optional chaining & guard
func processHero(_ hero: Hero?) {
    guard let h = hero else {
        print("No hero found!")
        return
    }
    print("Processing: \\(h.name)")
}

let hero = Hero(name: "Swift Archer")
hero.skills.append(Skill(name: "Optional Guard", damage: 80, manaCost: 20))
hero.levelUp()
processHero(hero)

let status = QuestStatus.completed(xpEarned: 150)
if case .completed(let xp) = status {
    print("✅ Quest complete! +\\(xp) XP")
}`,

  dart: `// 🎯 Dart — Syntax Analyzer Mode
// (Full execution requires Dart/Flutter SDK)

// Dart is the language behind Flutter (cross-platform apps)

// Abstract class
abstract class Character {
  String get name;
  int get level;
  void attack();
}

// Class with constructor shorthand
class Hero implements Character {
  final String name;
  int level;
  double health;
  final List<String> skills;

  // Constructor shorthand
  Hero({required this.name, this.level = 1, this.health = 100})
      : skills = [];

  @override
  void attack() {
    print('⚔️ \$name attacks with \${skills.first}!');
  }

  void levelUp() {
    level++;
    health += 20;
    print('🎯 \$name is now Level \$level!');
  }

  // Named constructor
  Hero.starter(String name) : this(name: name, level: 1);
}

// Mixin
mixin Magical {
  void castSpell(String spell) {
    print('✨ Casting \$spell!');
  }
}

class MageHero extends Hero with Magical {
  MageHero(String name) : super(name: name);
}

// async/await (Dart has excellent async support for Flutter)
Future<String> fetchQuestData() async {
  await Future.delayed(Duration(milliseconds: 100));
  return 'Quest: The Dart Dragon — Reward: 200 XP';
}

void main() async {
  final hero = MageHero('Dart Enchanter');
  hero.skills.addAll(['Widget Weave', 'Flutter Strike', 'Stream Slash']);
  hero.levelUp();
  hero.attack();
  hero.castSpell('setState Freeze');

  final quest = await fetchQuestData();
  print(quest);
}`,

  c: `/* ⚙️ C Language — Syntax Analyzer Mode */
/* (Full execution requires GCC/Clang compiler) */

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/* Struct — C's way of grouping data */
typedef struct {
    char name[50];
    int  level;
    float health;
    char skills[5][30];
    int skillCount;
} Hero;

/* Function prototype */
void levelUp(Hero *hero);
void printHero(const Hero *hero);

/* Function implementation */
void levelUp(Hero *hero) {
    hero->level++;
    hero->health += 20.0f;
    printf("⚙️ %s reached Level %d! HP: %.1f\\n",
           hero->name, hero->level, hero->health);
}

void addSkill(Hero *hero, const char *skill) {
    if (hero->skillCount < 5) {
        strcpy(hero->skills[hero->skillCount], skill);
        hero->skillCount++;
    }
}

void printHero(const Hero *hero) {
    printf("\\n=== HERO STATS ===\\n");
    printf("Name  : %s\\n", hero->name);
    printf("Level : %d\\n", hero->level);
    printf("HP    : %.1f\\n", hero->health);
    printf("Skills:\\n");
    for (int i = 0; i < hero->skillCount; i++) {
        printf("  [%d] %s\\n", i + 1, hero->skills[i]);
    }
}

int main(void) {
    /* Stack allocation */
    Hero warrior;
    strcpy(warrior.name, "C Crusader");
    warrior.level = 1;
    warrior.health = 100.0f;
    warrior.skillCount = 0;

    addSkill(&warrior, "Pointer Mastery");
    addSkill(&warrior, "Memory Management");
    addSkill(&warrior, "Bit Manipulation");

    levelUp(&warrior);
    levelUp(&warrior);
    printHero(&warrior);

    /* Heap allocation (dynamic memory) */
    Hero *mage = (Hero *)malloc(sizeof(Hero));
    strcpy(mage->name, "Heap Mage");
    mage->level = 5;
    mage->health = 200.0f;
    mage->skillCount = 0;
    addSkill(mage, "malloc Conjure");
    free(mage); /* Always free what you malloc! */

    return 0;
}`,

  cpp: `// ⚡ C++ — Syntax Analyzer Mode
// (Full execution requires G++/Clang++ compiler)

#include <iostream>
#include <vector>
#include <string>
#include <memory>
#include <algorithm>

// Template — C++'s generic programming system
template<typename T>
class GameCollection {
    std::vector<T> items;
public:
    void add(const T& item) { items.push_back(item); }
    size_t size() const { return items.size(); }
    T& operator[](int i) { return items[i]; }
};

// Abstract base class
class Character {
public:
    virtual std::string getName() const = 0;
    virtual void attack() = 0;
    virtual ~Character() = default;
};

// Derived class
class Hero : public Character {
    std::string name;
    int level;
    double health;
    std::vector<std::string> skills;

public:
    Hero(const std::string& n, int lvl = 1)
        : name(n), level(lvl), health(100.0) {}

    std::string getName() const override { return name; }

    void attack() override {
        std::cout << "⚔️ " << name << " attacks!\\n";
    }

    void levelUp() {
        level++;
        health += 20.0;
        std::cout << "⚡ " << name << " reached Level " << level << "!\\n";
    }

    void addSkill(const std::string& skill) {
        skills.push_back(skill);
    }

    friend std::ostream& operator<<(std::ostream& os, const Hero& h) {
        os << h.name << " | Lvl:" << h.level << " | HP:" << h.health;
        return os;
    }
};

int main() {
    // Smart pointer (modern C++)
    auto hero = std::make_unique<Hero>("C++ Champion");
    hero->addSkill("RAII Guard");
    hero->addSkill("Template Strike");
    hero->addSkill("Move Semantics");
    hero->levelUp();
    hero->attack();

    std::cout << *hero << "\\n";

    // Lambda & STL
    GameCollection<std::string> quests;
    quests.add("The Pointer Quest");
    quests.add("Template Trials");
    quests.add("STL Dungeon");

    std::cout << "Total Quests: " << quests.size() << "\\n";
    return 0;
}`,

  sql: `-- 🗄️ SQL (Standard) — Sandbox Simulator
-- Tables: heroes, skills, quests, inventory

-- Create table
CREATE TABLE heroes (
    id       INT PRIMARY KEY,
    name     VARCHAR(100),
    level    INT DEFAULT 1,
    class    VARCHAR(50),
    xp       INT DEFAULT 0
);

-- Insert records
INSERT INTO heroes VALUES (1, 'SQL Sentinel', 8, 'Mage', 1200);
INSERT INTO heroes VALUES (2, 'Query Knight', 5, 'Warrior', 750);
INSERT INTO heroes VALUES (3, 'Join Wizard', 12, 'Archmage', 3400);

-- Basic SELECT with filter
SELECT name, level, class
FROM heroes
WHERE level > 5
ORDER BY level DESC;

-- Aggregate functions
SELECT
    class,
    COUNT(*) AS hero_count,
    AVG(level) AS avg_level,
    MAX(xp) AS top_xp
FROM heroes
GROUP BY class
HAVING COUNT(*) >= 1;

-- UPDATE record
UPDATE heroes SET xp = xp + 500 WHERE name = 'SQL Sentinel';

-- Subquery
SELECT name, level
FROM heroes
WHERE level = (SELECT MAX(level) FROM heroes);`,

  postgresql: `-- 🐘 PostgreSQL — Advanced SQL Sandbox Simulator
-- PostgreSQL-specific features: CTEs, Window Functions, JSONB

-- CTE (Common Table Expression) — PostgreSQL specialty
WITH ranked_heroes AS (
    SELECT
        name,
        level,
        class,
        xp,
        RANK() OVER (PARTITION BY class ORDER BY xp DESC) AS rank_in_class
    FROM heroes
),
elite AS (
    SELECT * FROM ranked_heroes WHERE rank_in_class = 1
)
SELECT * FROM elite ORDER BY xp DESC;

-- Window Functions (PostgreSQL superpower)
SELECT
    name,
    level,
    xp,
    LAG(xp)  OVER (ORDER BY xp) AS prev_xp,
    LEAD(xp) OVER (ORDER BY xp) AS next_xp,
    xp - LAG(xp) OVER (ORDER BY xp) AS xp_gap
FROM heroes;

-- JSONB Column (PostgreSQL-native JSON storage)
CREATE TABLE hero_profiles (
    id      SERIAL PRIMARY KEY,
    name    TEXT,
    meta    JSONB
);

INSERT INTO hero_profiles (name, meta) VALUES
('PG Archmage', '{"skills": ["CTE Mastery", "JSONB Shield"], "premium": true, "stats": {"attack": 99}}');

-- Query inside JSONB
SELECT name, meta->>'premium' AS is_premium,
       meta->'stats'->>'attack' AS attack_power
FROM hero_profiles;

-- Recursive CTE (skill trees, org charts)
WITH RECURSIVE skill_tree AS (
    SELECT 1 AS tier, 'Basic Attack' AS skill, 10 AS damage
    UNION ALL
    SELECT tier + 1, 'Skill Tier ' || (tier + 1), damage * 2
    FROM skill_tree WHERE tier < 5
)
SELECT * FROM skill_tree;`,

  mongodb: `// 🍃 MongoDB — Query Syntax Analyzer (NoSQL Document Database)
// MongoDB queries written in JavaScript-style BSON notation

// ─── COLLECTION: heroes ───────────────────────────────────────────

// INSERT documents (insertOne / insertMany)
db.heroes.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "Mongo Master",
    level: 9,
    class: "Archmage",
    stats: { attack: 95, defense: 70, speed: 80 },
    skills: ["Aggregation Surge", "Index Shield", "Shard Strike"],
    createdAt: new Date()
  },
  {
    name: "NoSQL Ninja",
    level: 6,
    class: "Rogue",
    stats: { attack: 85, defense: 60, speed: 99 },
    skills: ["Document Dash", "Pipeline Pierce"]
  }
]);

// FIND — basic query
db.heroes.find({ level: { $gte: 5 } }).sort({ level: -1 }).limit(10);

// FIND with projection (select specific fields)
db.heroes.find({ class: "Archmage" }, { name: 1, level: 1, _id: 0 });

// UPDATE — $set, $inc operators
db.heroes.updateOne(
  { name: "Mongo Master" },
  {
    $set: { "stats.attack": 100 },
    $push: { skills: "Replica Shield" },
    $inc: { level: 1 }
  }
);

// AGGREGATION PIPELINE — MongoDB's most powerful feature
db.heroes.aggregate([
  { $match: { level: { $gte: 5 } } },
  { $group: {
      _id: "$class",
      avgLevel: { $avg: "$level" },
      totalHeroes: { $sum: 1 },
      topAttack: { $max: "$stats.attack" }
  }},
  { $sort: { avgLevel: -1 } },
  { $project: {
      class: "$_id",
      avgLevel: { $round: ["$avgLevel", 1] },
      totalHeroes: 1,
      topAttack: 1
  }}
]);

// INDEX creation (crucial for performance)
db.heroes.createIndex({ level: -1, class: 1 });
db.heroes.createIndex({ "stats.attack": -1 });`,

  redis: `# 🔴 Redis — Command Syntax Analyzer (In-Memory Database)
# Redis is used for: caching, sessions, pub/sub, leaderboards, rate limiting

# ─── STRINGS (most basic type) ───────────────────────────────────
SET hero:1:name "Redis Ranger"
SET hero:1:level 7
SET hero:1:xp 1500
EXPIRE hero:1:xp 3600          # Auto-expire XP cache in 1 hour
GET hero:1:name                 # → "Redis Ranger"
INCR hero:1:level               # Atomic increment → 8
INCRBY hero:1:xp 200            # Add 200 XP atomically

# ─── HASHES (store objects) ──────────────────────────────────────
HSET hero:2 name "Cache King" level 10 health 300 class "Mage"
HGET hero:2 name                # → "Cache King"
HGETALL hero:2                  # Get all fields
HMSET hero:2 attack 95 defense 70

# ─── LISTS (queues, stacks) ──────────────────────────────────────
RPUSH quest:log "Quest Started"
RPUSH quest:log "Boss Encountered"
RPUSH quest:log "Victory!"
LRANGE quest:log 0 -1           # Get all log entries
LPOP quest:log                  # Dequeue from left (FIFO queue)

# ─── SETS (unique collections) ────────────────────────────────────
SADD hero:1:skills "FireBall" "Ice Shield" "Speed Boost"
SADD hero:2:skills "Ice Shield" "Dark Arrow" "Stealth"
SINTER hero:1:skills hero:2:skills   # Common skills → "Ice Shield"
SUNION hero:1:skills hero:2:skills   # All skills combined

# ─── SORTED SETS (leaderboards!) ─────────────────────────────────
ZADD leaderboard 3400 "Join Wizard"
ZADD leaderboard 1200 "SQL Sentinel"
ZADD leaderboard 5800 "Redis Ranger"
ZADD leaderboard 2100 "Cache King"

ZRANGE leaderboard 0 -1 WITHSCORES REV   # Top players
ZRANK leaderboard "Cache King"            # Rank (0-indexed)
ZSCORE leaderboard "Redis Ranger"         # → 5800

# ─── PUB/SUB (real-time messaging) ───────────────────────────────
# Terminal 1: SUBSCRIBE quest:updates
# Terminal 2: PUBLISH quest:updates "New boss unlocked: Redis Dragon!"

# ─── TTL & EXPIRY (session management) ───────────────────────────
SETEX session:user42 1800 "eyJhbGciOiJIUzI1NiJ9..."   # 30min session
TTL session:user42       # Check remaining time
PERSIST session:user42   # Remove expiry`,

  bash: `#!/bin/bash
# 💻 Bash/Shell Script — Syntax Analyzer Mode
# (Full execution requires Linux/macOS terminal)

# ─── VARIABLES ─────────────────────────────────────────────────
HERO_NAME="Bash Warrior"
HERO_LEVEL=5
readonly MAX_LEVEL=100

echo "Hero: $HERO_NAME | Level: $HERO_LEVEL"

# ─── FUNCTIONS ─────────────────────────────────────────────────
level_up() {
    local hero=$1
    local current_level=$2
    local new_level=$((current_level + 1))
    echo "⚔️  $hero leveled up! $current_level → $new_level"
    echo $new_level
}

NEW_LEVEL=$(level_up "$HERO_NAME" $HERO_LEVEL)

# ─── CONDITIONALS ──────────────────────────────────────────────
if [ "$NEW_LEVEL" -ge 10 ]; then
    echo "🔥 Elite status unlocked!"
elif [ "$NEW_LEVEL" -ge 5 ]; then
    echo "⚡ Intermediate warrior!"
else
    echo "🌱 Keep grinding!"
fi

# ─── ARRAYS ────────────────────────────────────────────────────
skills=("Grep Strike" "Awk Slash" "Sed Sorcery" "Pipe Mastery")
echo "Skills count: \${#skills[@]}"

for skill in "\${skills[@]}"; do
    echo "  → $skill"
done

# ─── LOOPS ─────────────────────────────────────────────────────
for i in {1..5}; do
    echo "Quest $i: $([ $i -le 3 ] && echo 'Complete ✅' || echo 'Pending 🔄')"
done

# ─── USEFUL COMMANDS ───────────────────────────────────────────
echo "Current dir: $(pwd)"
echo "Files: $(ls | wc -l) items"
echo "Disk usage:"
df -h / 2>/dev/null | tail -1

# ─── STRING MANIPULATION ───────────────────────────────────────
sentence="The quick brown fox"
echo "Upper: \${sentence^^}"
echo "Length: \${#sentence}"
echo "Replace: \${sentence/fox/hero}"`,

  r: `# 📊 R Language — Syntax Analyzer Mode
# (Full execution requires R runtime)
# R is the gold standard for Statistics, Data Science & Visualization

# ─── VECTORS (fundamental data structure in R) ─────────────────
hero_levels <- c(3, 7, 12, 5, 9, 14, 2, 8)
hero_names  <- c("Warrior", "Mage", "Archmage", "Rogue",
                 "Paladin", "Sage", "Novice", "Knight")

# Vectorized operations (no loops needed!)
hero_xp <- hero_levels * 150 + rnorm(length(hero_levels), 0, 50)
cat("Total XP pool:", sum(hero_xp), "\\n")
cat("Average level:", mean(hero_levels), "\\n")
cat("SD of levels:", round(sd(hero_levels), 2), "\\n")

# ─── DATA FRAME (like a spreadsheet / SQL table) ───────────────
heroes_df <- data.frame(
  name  = hero_names,
  level = hero_levels,
  xp    = round(hero_xp),
  class = c("Fighter","Caster","Caster","Stealth",
            "Fighter","Caster","Fighter","Fighter"),
  stringsAsFactors = FALSE
)

# Filter & subset
elite <- heroes_df[heroes_df$level >= 8, ]
cat("\\nElite Heroes:\\n")
print(elite[order(-elite$level), ])

# ─── STATISTICAL ANALYSIS ──────────────────────────────────────
cat("\\n=== CLASS SUMMARY ===\\n")
aggregate(level ~ class, data = heroes_df, FUN = function(x) {
  c(mean = round(mean(x), 1), max = max(x), count = length(x))
})

# ─── FUNCTIONS ─────────────────────────────────────────────────
calculate_rank <- function(level, xp, weight = 0.7) {
  score <- (level * weight) + (xp * (1 - weight) / 100)
  ifelse(score > 10, "Elite", ifelse(score > 5, "Advanced", "Novice"))
}

heroes_df$rank <- calculate_rank(heroes_df$level, heroes_df$xp)
cat("\\nRanks assigned:\\n")
table(heroes_df$rank)

# ─── APPLY FAMILY (R's functional programming) ─────────────────
level_stats <- tapply(heroes_df$level, heroes_df$class, summary)
print(level_stats)`,

  matlab: `% 🔬 MATLAB — Syntax Analyzer Mode
% (Full execution requires MATLAB or GNU Octave runtime)
% MATLAB is used in: Signal Processing, Control Systems, Simulation

% ─── MATRICES (MATLAB's core strength) ─────────────────────────
% Create hero stat matrix [attack, defense, speed, mana]
hero_stats = [
    95, 70, 80, 60;   % Warrior
    65, 50, 75, 120;  % Mage
    80, 85, 60, 40;   % Paladin
    70, 45, 99, 80    % Rogue
];

hero_names = {'Warrior', 'Mage', 'Paladin', 'Rogue'};
stat_names = {'Attack', 'Defense', 'Speed', 'Mana'};

% Matrix operations (no loops needed)
avg_stats = mean(hero_stats, 1);   % Column means
max_stats = max(hero_stats, [], 1); % Column maxima

fprintf('=== AVERAGE STATS ===\\n');
for i = 1:length(stat_names)
    fprintf('%-10s: %.1f (max: %d)\\n', stat_names{i}, avg_stats(i), max_stats(i));
end

% ─── FUNCTIONS ─────────────────────────────────────────────────
function score = calc_power(stats_row)
    weights = [0.35, 0.25, 0.20, 0.20];
    score = sum(stats_row .* weights);
end

fprintf('\\n=== POWER SCORES ===\\n');
for i = 1:size(hero_stats, 1)
    score = calc_power(hero_stats(i, :));
    fprintf('%-10s: %.2f\\n', hero_names{i}, score);
end

% ─── LINEAR ALGEBRA ────────────────────────────────────────────
% Covariance matrix of stats (correlation analysis)
cov_matrix = cov(hero_stats);
[eigvec, eigval] = eig(cov_matrix);
fprintf('\\nDominant variance explained: %.1f%%\\n', ...
        max(diag(eigval)) / sum(diag(eigval)) * 100);

% ─── CONTROL FLOW ──────────────────────────────────────────────
xp_values = [0, 150, 500, 1200, 3000];
for xp = xp_values
    if xp >= 1000
        rank = 'Elite';
    elseif xp >= 300
        rank = 'Advanced';
    else
        rank = 'Novice';
    end
    fprintf('XP %4d → %s\\n', xp, rank);
end`,

  sass: `/* 🎨 Sass/SCSS — Nested Style Wizardry */
$portal-color: #a855f7;
$glow-strength: 30px;

.magic-portal {
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, $portal-color, #1a1a3e);
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 $glow-strength rgba($portal-color, 0.6);
  }

  .portal-core {
    width: 60px;
    height: 60px;
    background: #ffffff;
    border-radius: 50%;
    margin: 45px auto;
  }
}`,

  elixir: `# 💧 Elixir — Concurrent processing logic
defmodule CodeQuest.Hero do
  defstruct name: "Elixir Mage", level: 1, health: 100

  def level_up(%__MODULE__{level: lvl, health: hp} = hero) do
    IO.puts("🎉 Leveling up #{hero.name}...")
    %__MODULE__{hero | level: lvl + 1, health: hp + 25}
  end

  def describe(hero) do
    "🧙 #{hero.name} | Level: #{hero.level} | HP: #{hero.health}"
  end
end

# Spawn a light process (actor concurrency)
parent = self()
spawn(fn ->
  hero = %CodeQuest.Hero{}
  upgraded = CodeQuest.Hero.level_up(hero)
  send(parent, {:complete, CodeQuest.Hero.describe(upgraded)})
end)

receive do
  {:complete, msg} -> IO.puts("Received: #{msg}")
after
  1000 -> IO.puts("Timeout waiting for actor response.")
end`,

  scala: `// 🌀 Scala — Statically typed OO and functional logic
object CodeQuestApp {
  case class Hero(name: String, level: Int, health: Double, skills: List[String]) {
    def levelUp(): Hero = {
      println(s"🌀 $name reached Level \${level + 1}!")
      copy(level = level + 1, health = health + 20.0)
    }
  }

  def main(args: Array[String]): Unit = {
    val warrior = Hero("Scala Knight", 1, 100.0, List("Pattern Match", "Implicit Shield"))
    val upgraded = warrior.levelUp()
    
    // Functional filter
    val powerfulSkills = upgraded.skills.filter(_.length > 12)
    println(s"Upgraded stats: \$upgraded")
    println(s"Long skills: \$powerfulSkills")
  }
}`,

  perl: `# 🐫 Perl — Text processing engine
use strict;
use warnings;

my $hero_name = "Perl Scout";
my $level = 3;
my @inventory = ("Map", "Compass", "Dagger", "Old Scroll");

print "Hero: $hero_name (Level: $level)\\n";

# Regular expression pattern matching & extraction
my $log_entry = "TIMESTAMP:2026-07-14 [QUEST_COMPLETE] XP:450 GOLD:200";
if ($log_entry =~ /XP:(\\d+)\\s+GOLD:(\\d+)/) {
    my ($xp, $gold) = ($1, $2);
    print "Parsed Log -> Earned: $xp XP and $gold Gold!\\n";
}

# Modifying array with map
my @upper_inv = map { uc($_) } @inventory;
print "Inventory: " . join(", ", @upper_inv) . "\\n";`,

  haskell: `-- λ Haskell — Pure functional programming logic
module Main where

-- Define a custom data type
data Hero = Hero {
    name  :: String,
    level :: Int,
    hp    :: Double
} deriving (Show)

-- Pure function to level up a hero
levelUp :: Hero -> Hero
levelUp hero = hero { level = level hero + 1, hp = hp hero + 20.0 }

-- Lazy evaluation: infinite list of levels, taking first 10
fibonacci :: [Int]
fibonacci = 0 : 1 : zipWith (+) fibonacci (tail fibonacci)

main :: IO ()
main = do
    let warrior = Hero "Haskell Sage" 1 100.0
    let upgraded = levelUp warrior
    print upgraded
    putStrLn \$ "First 10 Fib numbers for quests: " ++ show (take 10 fibonacci)`,

  mysql: `-- 🐬 MySQL — Relational Database Script
-- Uses storage engine definitions & transaction controls

CREATE TABLE IF NOT EXISTS heroes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT DEFAULT 1,
    class VARCHAR(50),
    xp INT DEFAULT 0
) ENGINE=InnoDB;

-- Insert with auto-increment
INSERT INTO heroes (name, class, xp) VALUES 
('MySQL Sentinel', 'Guardian', 150),
('InnoDB Mage', 'Wizard', 280);

-- Query with variables (MySQL syntax)
SET @min_xp = 200;
SELECT name, class, xp 
FROM heroes 
WHERE xp >= @min_xp
ORDER BY xp DESC;`,

  sqlite: `-- 🪶 SQLite — Lightweight Embedded Database Script
-- Serverless local storage patterns

CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT,
    power INTEGER,
    weight REAL
);

-- SQLite supports simple INSERTs
INSERT INTO inventory (item_name, power, weight) VALUES 
('Iron Sword', 45, 8.5),
('Light Shield', 30, 5.0),
('Dagger of Speed', 25, 2.3);

-- Local lightweight query
SELECT item_name, power 
FROM inventory 
WHERE weight < 6.0 
ORDER BY power DESC;`,

  cassandra: `-- 👁️ Cassandra (CQL) — Wide-Column NoSQL Script
-- Designed for massive scale & clustering keys

CREATE KEYSPACE IF NOT EXISTS codequest 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE codequest;

-- Define table with partition and clustering keys
CREATE TABLE IF NOT EXISTS hero_logs (
    hero_id uuid,
    log_time timestamp,
    action text,
    xp_gained int,
    PRIMARY KEY (hero_id, log_time)
) WITH CLUSTERING ORDER BY (log_time DESC);

-- CQL query to get recent logs for a hero partition
-- SELECT * FROM hero_logs WHERE hero_id = 550e8400-e29b-41d4-a716-446655440000;`,

  neo4j: `// 🕸️ Neo4j (Cypher) — Graph Database Query Script
// Define and traverse relationships in graph structures

// Create nodes
CREATE (h:Hero {name: 'Neo4j Knight', level: 8})
CREATE (s:Skill {name: 'Graph Traversal', damage: 75})
CREATE (q:Quest {name: 'The Six Degrees of Code', difficulty: 'Hard'})

// Create relationships (edges)
CREATE (h)-[:OWNS]->(s)
CREATE (h)-[:ASSIGNED_TO]->(q)

// Traverse network to find connections
MATCH (h:Hero)-[:OWNS]->(s:Skill)
WHERE h.level >= 5
RETURN h.name, s.name;`,
  react: `// ⚛️ React — Component-based user interface library
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-card">
      <h2>React Counter</h2>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
  angular: `// 🅰️ Angular — Component declaration with TypeScript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <div class="counter-card">
      <h2>Angular Counter</h2>
      <p>Current count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  \`
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
}`,
  vue: `<!-- 🟢 Vue.js — Single File Component structure -->
<template>
  <div class="counter-card">
    <h2>Vue Counter</h2>
    <p>Current count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>`,
  svelte: `<!-- 🔥 Svelte — High performance reactive component -->
<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<div class="counter-card">
  <h2>Svelte Counter</h2>
  <p>Current count: {count}</p>
  <button on:click={increment}>
    Increment
  </button>
</div>`,
  nextjs: `// ▲ Next.js — Server-side rendering page component
import Head from 'next/head';

export async function getStaticProps() {
  // Fetch static data from API/database
  return {
    props: {
      serverTime: new Date().toLocaleTimeString()
    }
  };
}

export default function Home({ serverTime }) {
  return (
    <div className="container">
      <Head>
        <title>Next.js Portal</title>
      </Head>
      <main>
        <h1>Welcome to Next.js</h1>
        <p>Static render time: {serverTime}</p>
      </main>
    </div>
  );
}`,
  bootstrap: `<!-- 🅱️ Bootstrap — Responsive utility-styled layout -->
<div class="container my-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-lg border-primary">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">Bootstrap Card</h4>
        </div>
        <div class="card-body">
          <p class="card-text">Quickly styled using responsive CSS classes.</p>
          <button class="btn btn-outline-primary w-100">Action</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  tailwind: `<!-- 🍃 Tailwind CSS — Utility-first styling template -->
<div class="flex items-center justify-center min-h-screen bg-slate-900">
  <div class="max-w-sm p-6 bg-slate-800 border border-cyan-500/30 rounded-2xl shadow-xl">
    <h5 class="mb-2 text-2xl font-bold text-cyan-400">Tailwind Card</h5>
    <p class="mb-4 text-slate-300">Styling layouts instantly inside HTML classes.</p>
    <button class="w-full py-2.5 font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition duration-150">
      Interactive Button
    </button>
  </div>
</div>`,
  nodejs: `// 🟢 Node.js — Core HTTP Server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Hello from Node.js!',
    timestamp: Date.now()
  }));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}/\`);
});`,
  express: `// 🚂 Express.js — Minimal REST API
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/hero', (req, res) => {
  res.json({
    name: 'Express Ranger',
    level: 8,
    status: 'Ready'
  });
});

app.listen(3000, () => {
  console.log('Express API listening on port 3000');
});`,
  fastify: `// ⚡ Fastify — High-performance web framework
const fastify = require('fastify')({ logger: true });

fastify.get('/api/data', async (request, reply) => {
  return { hello: 'Fastify speed' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();`,
  django: `# 🎸 Django — Model and View Configuration
from django.db import models
from django.http import JsonResponse

# 1. Database Model
class Hero(models.Model):
    name = models.CharField(max_length=100)
    level = models.IntegerField(default=1)

# 2. View controller
def get_hero_profile(request, hero_id):
    try:
        hero = Hero.objects.get(id=hero_id)
        return JsonResponse({"id": hero.id, "name": hero.name, "level": hero.level})
    except Hero.DoesNotExist:
        return JsonResponse({"error": "Hero not found"}, status=404)`,
  flask: `# 🧪 Flask — Micro Web Application
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({
        "status": "online",
        "database": "connected",
        "uptime_seconds": 3600
    })

if __name__ == '__main__':
    app.run(port=5000)`,
  fastapi: `# ⚡ FastAPI — High-performance API with Pydantic Schema
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Hero(BaseModel):
    name: str
    level: int = 1
    class_type: str

@app.post("/heroes/")
async def create_hero(hero: Hero):
    return {"message": "Hero created successfully", "data": hero}`,
  springboot: `// 🍃 Spring Boot — Rest Controller configuration
package com.codequest.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@RequestMapping("/api")
public class AppController {

    public static void main(String[] args) {
        SpringApplication.run(AppController.class, args);
    }

    @GetMapping("/hero")
    public HeroResponse getHero() {
        return new HeroResponse("Spring Paladin", 12);
    }
}

class HeroResponse {
    public String name;
    public int level;
    public HeroResponse(String name, int level) {
        this.name = name;
        this.level = level;
    }
}`,
  aspnetcore: `// 🌐 ASP.NET Core — Web API Controller
using Microsoft.AspNetCore.Mvc;

namespace CodeQuest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HeroController : ControllerBase
    {
        [HttpGet("{id}")]
        public ActionResult<HeroProfile> GetHero(int id)
        {
            var hero = new HeroProfile { Id = id, Name = "ASP.NET Guardian", Level = 15 };
            return Ok(hero);
        }
    }

    public class HeroProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
    }
}`,
  laravel: `<?php
// 🟥 Laravel — Web Routing and Controller
namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use App\\Models\\Hero;

class HeroController extends Controller
{
    public function show($id)
    {
        $hero = Hero::findOrFail($id);
        return response()->json([
            'status' => 'success',
            'data' => $hero
        ]);
    }
}`,
  codeigniter: `<?php
// 🔥 CodeIgniter 4 — Controller Routing
namespace App\\Controllers;

use CodeIgniter\\API\\ResponseTrait;

class Hero extends BaseController
{
    use ResponseTrait;

    public function show($id = null)
    {
        $data = [
            'id' => $id,
            'name' => 'CI4 Ranger',
            'status' => 'active'
        ];
        return $this->respond($data, 200);
    }
}`,
  rails: `# 🛤️ Ruby on Rails — MVC Route and Controller
# config/routes.rb
# get '/heroes/:id', to: 'heroes#show'

class HeroesController < ApplicationController
  def show
    @hero = Hero.find(params[:id])
    render json: {
      status: 'success',
      hero: { name: @hero.name, level: @hero.level }
    }
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Hero not found' }, status: :not_found
  end
end`,
  gin: `// 🍸 Gin — High-performance Go REST Router
package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/api/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
			"status":  "gin-speed",
		})
	})
	r.Run(":8080")
}`,
  echo: `// 🔊 Echo — Minimal Go Web Framework
package main

import (
	"net/http"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/api/welcome", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{
			"message": "Welcome to Echo Server",
		})
	})
	e.Start(":1323")
}`,
  actix: `// ⚙️ Actix Web — High-Performance Async Rust Server
use actix_web::{get, App, HttpResponse, HttpServer, Responder};

#[get("/api/health")]
async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "healthy",
        "engine": "actix-web"
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(health_check))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}`,
  rocket: `// 🚀 Rocket — Type-safe Rust Web Application
#[macro_use] extern crate rocket;

use rocket::serde::json::Json;
use rocket::serde::Serialize;

#[derive(Serialize)]
struct Status {
    status: String,
    players: u32,
}

#[get("/status")]
fn get_status() -> Json<Status> {
    Json(Status {
        status: String::from("online"),
        players: 154,
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/api", routes![get_status])
}`,
  ktor: `// ☁️ Ktor — Asynchronous Kotlin Routing
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            get("/api/greet") {
                call.respondText("Greetings from Ktor!")
            }
        }
    }.start(wait = true)
}`,
  playframework: `// 🎭 Play Framework — Controller in Scala
package controllers

import javax.inject._
import play.api.mvc._
import play.api.libs.json._

@Singleton
class ApiController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  def getStatus = Action { implicit request: Request[AnyContent] =>
    val data = Json.obj("status" -> "active", "framework" -> "Play Scala")
    Ok(data)
  }
}`,
  oracle: `-- 🔴 Oracle DB — PL/SQL Block
DECLARE
    v_hero_name VARCHAR2(100);
    v_hero_level NUMBER;
BEGIN
    SELECT name, level INTO v_hero_name, v_hero_level
    FROM heroes
    WHERE id = 101;
    
    DBMS_OUTPUT.PUT_LINE('Hero: ' || v_hero_name || ' (Lvl: ' || v_hero_level || ')');
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Hero index not found.');
END;`,
  mssql: `-- 🗄️ MS SQL Server — T-SQL Query with Transaction
BEGIN TRANSACTION;
BEGIN TRY
    -- Insert new log with outputting key values
    INSERT INTO PlayerActivityLogs (PlayerId, Activity, LogDate)
    OUTPUT inserted.LogId, inserted.LogDate
    VALUES (452, 'Dungeon Cleared', GETDATE());
    
    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    ROLLBACK TRANSACTION;
    THROW;
END CATCH;`,
  firebase: `// 🔥 Firebase Realtime DB — Basic read/write script
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

const app = initializeApp({ databaseURL: "https://codequest.firebaseio.com" });
const db = getDatabase(app);

// Write to Realtime DB
set(ref(db, 'players/101'), {
  name: "Firebase Mage",
  level: 14,
  xp: 4500
});`,
  firestore: `// 🔥 Cloud Firestore — Document operations
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const app = initializeApp({ projectId: "codequest-cloud" });
const db = getFirestore(app);

// Save document to Firestore collection
async function saveProgress() {
  await setDoc(doc(db, "users", "user_101"), {
    username: "CloudWarrior",
    skills: ["Firestore Query", "NoSQL Aggregates"],
    updatedAt: new Date()
  });
}`,
  objectivec: `// 🍎 Objective-C — Interface & Implementation
#import <Foundation/Foundation.h>

@interface Hero : NSObject
@property (nonatomic, strong) NSString *name;
@property (nonatomic, assign) NSInteger level;
- (void)levelUp;
@end

@implementation Hero
- (void)levelUp {
    self.level += 1;
    NSLog(@"%@ Leveled Up! Now: %ld", self.name, (long)self.level);
}
@end`,
  julia: `# 🟢 Julia — Matrix logic and calculations
function compute_quest_matrix(n)
    # Generate random matrix
    A = rand(n, n)
    # Calculate eigenvalues
    eigenvals = eigen(A).values
    println("Quest eigenvalues computed: ", eigenvals)
    return A * A'
end

result = compute_quest_matrix(3)`,
  powershell: `# 🟦 PowerShell — System administration automation
$ProcessList = Get-Process | Where-Object { $_.CPU -gt 10 }

foreach ($Proc in $ProcessList) {
    Write-Host "High CPU alert: $($Proc.ProcessName) (PID: $($Proc.Id))" -ForegroundColor Red
}

$SystemUptime = (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
Write-Host "System boot time: $SystemUptime" -ForegroundColor Green`,
  solidity: `// 💎 Solidity — Ethereum Smart Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HeroStorage {
    struct Hero {
        string name;
        uint256 level;
    }
    
    mapping(address => Hero) public heroes;

    function registerHero(string memory _name) public {
        heroes[msg.sender] = Hero(_name, 1);
    }
}`,
  erlang: `% ⚙️ Erlang — Actor Loop Process
-module(hero_process).
-export([start/0, loop/1]).

start() ->
    spawn(fun() -> loop(1) end).

loop(Level) ->
    receive
        level_up ->
            NewLevel = Level + 1,
            io:format("Erlang Actor Level: ~p~n", [NewLevel]),
            loop(NewLevel);
        {get_level, Sender} ->
            Sender ! {level, Level},
            loop(Level)
    end.`,
  cobol: `*      ⚙️ COBOL — Legacy Mainframe Program
       IDENTIFICATION DIVISION.
       PROGRAM-ID. HELLO-QUEST.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 HERO-NAME   PIC X(15) VALUE 'COBOL PALADIN'.
       01 HERO-LEVEL  PIC 99 VALUE 99.
       PROCEDURE DIVISION.
           DISPLAY "QUEST INITIALIZED: " HERO-NAME.
           DISPLAY "LEGACY LEVEL: " HERO-LEVEL.
           STOP RUN.`,
  fortran: `!      ⚙️ Fortran — Scientific computation
program quest_math
    implicit none
    integer :: i, total
    total = 0
    do i = 1, 100
        if (mod(i, 3) == 0) then
            total = total + i
        end if
    end do
    print *, "Sum of numbers divisible by 3: ", total
end program quest_math`,

  nuxtjs: `// 💚 Nuxt.js — Vue SSR Framework
// pages/index.vue (file-based routing)
<template>
  <main>
    <h1>{{ title }}</h1>
    <NuxtLink to="/about">About Page</NuxtLink>
  </main>
</template>

<script setup>
const title = ref('Welcome to Nuxt!')

// SSR data fetch using useAsyncData
const { data: heroes } = await useAsyncData('heroes', () =>
  $fetch('/api/heroes')
)
</script>`,

  nestjs: `// 🔴 NestJS — Enterprise Node.js Framework
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('heroes')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  findAll() {
    return this.heroService.findAll();
  }

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroService.create(createHeroDto);
  }
}`,

  lua: `-- 🌙 Lua — Lightweight Scripting Language
-- Variables and functions
local playerName = "CodeWarrior"
local level = 5
local health = 100

local function levelUp(player, amount)
  player.level = player.level + amount
  print(player.name .. " reached level " .. player.level .. "!")
end

local hero = { name = playerName, level = level }
levelUp(hero, 1)

-- Tables (Lua's all-purpose data structure)
local inventory = { "Sword", "Shield", "Potion" }
for i, item in ipairs(inventory) do
  print(i .. ": " .. item)
end`,

  gdscript: `# 🎮 GDScript — Godot Game Engine Scripting
extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

var health = 100
var score = 0

func _ready():
    print("Hero spawned! Health: ", health)

func _physics_process(delta):
    # Gravity
    if not is_on_floor():
        velocity += get_gravity() * delta

    # Jump
    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    # Movement
    var direction = Input.get_axis("ui_left", "ui_right")
    velocity.x = direction * SPEED
    move_and_slide()

func take_damage(amount: int):
    health -= amount
    if health <= 0:
        die()

func die():
    print("Hero defeated! Score: ", score)`,

  wasm: `;; 🔷 WebAssembly — Binary Instruction Format (WAT text format)
(module
  ;; Export a function that adds two integers
  (func $add (export "add") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )

  ;; Export a function that multiplies two floats
  (func $multiply (export "multiply") (param $x f64) (param $y f64) (result f64)
    local.get $x
    local.get $y
    f64.mul
  )
)

;; To use in JavaScript:
;; const { instance } = await WebAssembly.instantiateStreaming(fetch('module.wasm'));
;; console.log(instance.exports.add(10, 20)); // 30`,

  clojure: `; 🔵 Clojure — Functional JVM Language
(ns hero-quest.core)

; Immutable data structures
(def hero {:name "ClojureKnight" :level 5 :hp 100 :skills ["Slash" "Block"]})

; Pure functions — no side effects
(defn level-up [hero]
  (update hero :level inc))

(defn take-damage [hero amount]
  (update hero :hp - amount))

; Threading macro — chain transformations
(def battle-result
  (-> hero
      (level-up)
      (take-damage 20)
      (assoc :status "victorious")))

(println "Battle result:" battle-result)

; Sequence operations
(def inventory ["Sword" "Shield" "Potion" "Map"])
(println "Weapons:" (filter #(not= % "Potion") inventory))`,

  fsharp: `// 🟣 F# — Functional-First .NET Language
module HeroQuest

// Discriminated Union (Algebraic type)
type HeroClass = Warrior | Mage | Rogue

type Hero = {
    Name: string
    Class: HeroClass
    Level: int
    Health: float
}

// Pattern matching
let describeHero hero =
    match hero.Class with
    | Warrior -> sprintf "%s wields heavy armor (Level %d)" hero.Name hero.Level
    | Mage    -> sprintf "%s casts powerful spells (Level %d)" hero.Name hero.Level
    | Rogue   -> sprintf "%s strikes from shadows (Level %d)" hero.Name hero.Level

let knight = { Name = "Aldric"; Class = Warrior; Level = 7; Health = 95.5 }
printfn "%s" (describeHero knight)

// Pipeline operator
let levelUp hero = { hero with Level = hero.Level + 1 }
let upgraded = knight |> levelUp |> levelUp
printfn "Upgraded to Level: %d" upgraded.Level`,

  groovy: `// 🟢 Groovy — JVM Scripting & Jenkins DSL
// Dynamic typing and closures
def hero = [name: "GroovySlayer", level: 5, skills: ["Slash", "Block"]]

// Groovy string interpolation
println "Hero: \${hero.name} — Level \${hero.level}"

// Closures
def levelUp = { player ->
    player.level += 1
    println "\${player.name} leveled up to \${player.level}!"
}
levelUp(hero)

// Collection operations
def inventory = ["Sword", "Shield", "Potion", "Scroll"]
def weapons = inventory.findAll { it != "Potion" }
println "Weapons: \$weapons"

// Groovy builder for Jenkins Declarative Pipeline
pipeline {
    agent any
    stages {
        stage('Build') {
            steps { sh 'npm install' }
        }
        stage('Test') {
            steps { sh 'npm test' }
        }
    }
}`,

  elasticsearch: `// 🔍 Elasticsearch — Full-Text Search Engine (REST API)
// Index a document
PUT /heroes/_doc/1
{
  "name": "ElasticKnight",
  "class": "Warrior",
  "level": 8,
  "skills": ["Slash", "Shield Bash"],
  "created_at": "2024-01-15"
}

// Full-text search with filters
GET /heroes/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "class": "Warrior" } }
      ],
      "filter": [
        { "range": { "level": { "gte": 5 } } }
      ]
    }
  },
  "sort": [{ "level": { "order": "desc" } }],
  "size": 10
}`,

  dynamodb: `// ☁️ DynamoDB — AWS Serverless NoSQL Database
import { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });

// Write a hero record
const putHero = async () => {
  await client.send(new PutItemCommand({
    TableName: "Heroes",
    Item: {
      heroId: { S: "hero-001" },
      name:   { S: "DynamoSlayer" },
      level:  { N: "7" },
      class:  { S: "Warrior" }
    }
  }));
};

// Read by primary key
const getHero = async (heroId) => {
  const result = await client.send(new GetItemCommand({
    TableName: "Heroes",
    Key: { heroId: { S: heroId } }
  }));
  return result.Item;
};

putHero();`,

  prisma: `// 🔺 Prisma — Next-Generation TypeScript ORM
// schema.prisma
model Hero {
  id        Int      @id @default(autoincrement())
  name      String
  class     String
  level     Int      @default(1)
  createdAt DateTime @default(now())
  weapons   Weapon[]
}

model Weapon {
  id     Int    @id @default(autoincrement())
  name   String
  damage Int
  heroId Int
  hero   Hero   @relation(fields: [heroId], references: [id])
}

// Usage in Node.js / TypeScript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Type-safe query with relations
const heroes = await prisma.hero.findMany({
  where: { level: { gte: 5 } },
  include: { weapons: true },
  orderBy: { level: 'desc' }
})
console.log(heroes)`,

  typeorm: `// 🗄️ TypeORM — TypeScript ORM for Node.js
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DataSource } from "typeorm";

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 1 })
  level: number;

  @Column()
  heroClass: string;
}

// Initialize connection
const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  database: "quest_db",
  entities: [Hero],
  synchronize: true
});

await AppDataSource.initialize();

// Repository API — type-safe CRUD
const heroRepo = AppDataSource.getRepository(Hero);
const warriors = await heroRepo.find({
  where: { heroClass: "Warrior" },
  order: { level: "DESC" }
});`,

  docker: `# 🐳 Docker — App Containerization
# Dockerfile for a Node.js application

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (layer caching optimization)
COPY package*.json ./
RUN npm ci --only=production

# Copy application source
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

# --- docker-compose.yml ---
# version: '3.9'
# services:
#   app:
#     build: .
#     ports: ["3000:3000"]
#     environment:
#       - NODE_ENV=production
#   db:
#     image: postgres:16-alpine
#     environment:
#       POSTGRES_DB: quest_db
#       POSTGRES_PASSWORD: secret`,

  kubernetes: `# ⚙️ Kubernetes — Container Orchestration
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hero-api
  labels:
    app: hero-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hero-api
  template:
    metadata:
      labels:
        app: hero-api
    spec:
      containers:
        - name: hero-api
          image: myregistry/hero-api:v2.1
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "128Mi"
              cpu: "250m"
            limits:
              memory: "256Mi"
              cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: hero-api-svc
spec:
  selector:
    app: hero-api
  ports:
    - port: 80
      targetPort: 3000`,

  terraform: `# 🏗️ Terraform — Infrastructure as Code
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# Create an EC2 instance
resource "aws_instance" "quest_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name        = "QuestServer"
    Environment = "production"
  }
}

# Create an S3 bucket
resource "aws_s3_bucket" "assets" {
  bucket = "quest-static-assets-2024"
}

output "server_ip" {
  value = aws_instance.quest_server.public_ip
}`,

  nginx: `# 🌐 Nginx — High-Performance Web Server Config
# /etc/nginx/sites-available/hero-api

server {
    listen 80;
    server_name api.heroquest.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.heroquest.com;

    ssl_certificate     /etc/ssl/certs/heroquest.crt;
    ssl_certificate_key /etc/ssl/private/heroquest.key;

    # Gzip compression
    gzip on;
    gzip_types application/json text/plain;

    # Reverse proxy to Node.js app
    location /api/ {
        proxy_pass         http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static files
    location / {
        root   /var/www/hero-app/dist;
        index  index.html;
        try_files $uri $uri/ /index.html;
    }
}`
};


// ─── HELPER BUTTONS FOR MOBILE EDITOR ────────────────────────────────────────
export const HELPER_BUTTONS = {
  html:       ['<', '>', '="', '/', 'div', 'span', 'class', 'id', 'href', 'p', 'h1', 'button'],
  css:        ['{', '}', ':', ';', '.', '#', 'px', '%', 'flex', 'grid', 'margin', 'padding', 'color'],
  javascript: ['{', '}', '(', ')', '[', ']', ';', '=', '=>', '"', 'const', 'let', 'function', 'return', 'console.log'],
  typescript: ['{', '}', '(', ')', ':', ';', '=>', 'interface', 'type', 'const', 'string', 'number', 'boolean'],
  json:       ['{', '}', '[', ']', ':', ',', '"', 'true', 'false', 'null'],
  xml:        ['<', '>', '</', '="', '<?xml', 'version=', 'encoding=', 'UTF-8'],
  yaml:       [':', '-', '|', '>', '#', 'true', 'false', 'null'],
  markdown:   ['#', '##', '**', '__', '`', '```', '- ', '1.', '[', ']()', '![]()'],
  graphql:    ['{', '}', '(', ')', ':', '!', 'type', 'query', 'mutation', 'String', 'Int', 'Boolean', 'ID'],
  python:     [':', '#', 'def ', 'class ', 'if ', 'else:', 'elif ', 'for ', 'in ', 'print(', 'return ', 'import '],
  java:       ['{', '}', '(', ')', ';', 'public', 'private', 'class', 'void', 'int', 'String', 'new', 'return'],
  csharp:     ['{', '}', '(', ')', ';', 'public', 'private', 'class', 'void', 'int', 'string', 'var', 'new', '=>'],
  go:         ['{', '}', '(', ')', ':', ':=', 'func ', 'var ', 'fmt.Println(', 'if ', 'for ', 'return'],
  rust:       ['{', '}', '(', ')', '::', ';', 'fn ', 'let ', 'mut ', 'impl', 'struct', 'enum', 'match', 'println!'],
  php:        ['<?php', '$', '->', '=>', ';', '{', '}', 'echo ', 'function ', 'class ', 'public', 'new', 'array('],
  ruby:       ['def ', 'end', 'class ', 'puts ', 'do', '|', '@', ':', '<<', '.each', 'if ', 'elsif', 'nil'],
  kotlin:     ['{', '}', '(', ')', '->', 'fun ', 'val ', 'var ', 'data class', 'when', 'println(', 'null'],
  swift:      ['{', '}', '(', ')', '->', 'func ', 'var ', 'let ', 'class', 'struct', 'guard', 'if let', 'print('],
  dart:       ['{', '}', '(', ')', '->', 'void ', 'class ', 'var ', 'final ', 'print(', 'async', 'await', '=>'],
  c:          ['{', '}', '(', ')', ';', '->', '*', '&', '#include', 'printf(', 'int ', 'char ', 'void ', 'return'],
  cpp:        ['{', '}', '(', ')', '::', ';', 'std::', '->', '*', '&', 'auto', 'cout <<', 'class ', 'template'],
  sql:        ['SELECT', 'FROM', 'WHERE', 'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', '*', ';'],
  mysql:      ['SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'CREATE TABLE', 'ENGINE=InnoDB', 'AUTO_INCREMENT', '*', ';'],
  sqlite:     ['SELECT', 'FROM', 'WHERE', 'INSERT', 'CREATE TABLE', 'AUTOINCREMENT', 'TEXT', 'INTEGER', 'REAL', ';'],
  postgresql: ['SELECT', 'FROM', 'WITH', 'AS', 'OVER()', 'PARTITION BY', 'JSONB', 'ARRAY', 'RETURNING', '->', '->>', '::'],
  mongodb:    ['db.', '.find(', '.insertOne(', '.updateOne(', '.deleteOne(', '.aggregate(', '$match', '$group', '$sort', '$project', '$set', '$gte'],
  redis:      ['SET', 'GET', 'HSET', 'HGET', 'HGETALL', 'LPUSH', 'RPUSH', 'SADD', 'SMEMBERS', 'ZADD', 'ZRANGE', 'EXPIRE', 'TTL', 'DEL'],
  cassandra:  ['CREATE KEYSPACE', 'replication', 'USE', 'CREATE TABLE', 'PRIMARY KEY', 'CLUSTERING ORDER BY', 'uuid', ';'],
  neo4j:      ['CREATE', 'MATCH', 'RETURN', 'WHERE', 'MERGE', 'RELATIONSHIP', '->', ':', '[]', '()'],
  bash:       ['#!/bin/bash', 'echo ', 'if [', 'fi', 'for ', 'done', 'function ', '$1', '$()', '|', '>', '>>', '&&'],
  r:          ['c(', '<-', 'function(', 'data.frame(', 'print(', 'cat(', 'if (', 'for (', 'library(', 'mean(', 'sum(', 'plot('],
  matlab:     ['%', 'function', 'end', 'fprintf(', 'for ', 'if ', 'while ', 'zeros(', 'ones(', 'plot(', 'disp(', ';'],
  sass:       ['{', '}', ':', ';', '$', '@mixin', '@include', 'margin', 'padding', 'background', '&:hover'],
  elixir:     ['defmodule', 'def', 'do', 'end', '%', '->', 'IO.puts', 'spawn', 'send', 'receive', 'IO.inspect'],
  scala:      ['object', 'case class', 'def', 'val', 'var', 'List', '=>', 'println', 'Unit', 'match', 'copy'],
  perl:       ['my', '$', '@', 'print', 'shift', 'uc', 'lc', 'split', 'join', '=~', '$_'],
  haskell:    ['let', 'in', 'where', 'data', 'deriving', '::', '->', '=>', 'putStrLn', 'take', 'zipWith'],
  react:      ['useState', 'useEffect', '<', '>', 'return', 'export default', 'function', '{', '}', 'className=', 'onClick='],
  angular:    ['@Component', 'selector', 'template', 'export class', 'constructor', 'ngOnInit', 'import', '{', '}', 'this.', '(', ')'],
  vue:        ['<template>', '<script>', '<style>', 'data()', 'methods', 'computed', 'props', 'export default', 'v-if', 'v-for', '@click'],
  svelte:     ['<script>', 'let ', 'function', 'on:click', '{', '}', 'bind:value', '$:', 'import', '<', '>', '#if'],
  nextjs:     ['getStaticProps', 'getServerSideProps', 'Link', 'Head', 'Image', 'export default', 'router', 'async', 'await', 'import'],
  bootstrap:  ['container', 'row', 'col-', 'card', 'btn', 'shadow', 'text-center', 'bg-', 'd-flex', 'justify-content-'],
  tailwind:   ['flex', 'grid', 'items-center', 'justify-between', 'bg-', 'text-', 'p-', 'm-', 'rounded-', 'shadow-', 'hover:'],
  nodejs:     ['require(', 'module.exports', 'exports.', 'http.createServer', 'listen', 'process.env', 'fs.', 'path.', 'Buffer'],
  express:    ['express()', 'app.get(', 'app.post(', 'app.use(', 'req, res', 'res.json(', 'res.send(', 'listen', 'router'],
  fastify:    ['fastify()', 'fastify.get', 'fastify.post', 'request, reply', 'reply.send', 'listen', 'register', 'plugin'],
  django:     ['models.', 'views', 'JsonResponse', 'request', 'filter(', 'get(', 'all()', 'HttpResponse', 'class ', 'def '],
  flask:      ['Flask(__name__)', '@app.route', 'request', 'jsonify(', 'render_template', 'redirect', 'g.', 'session', 'methods='],
  fastapi:    ['FastAPI()', 'APIRouter()', 'BaseModel', 'Depends', 'HTTPException', 'async def', 'await', 'status_code'],
  springboot: ['@RestController', '@RequestMapping', '@GetMapping', '@PostMapping', '@Autowired', 'ResponseEntity', 'Service', 'SpringApplication'],
  aspnetcore: ['[ApiController]', '[Route]', '[HttpGet]', '[HttpPost]', 'ControllerBase', 'ActionResult', 'Ok(', 'var '],
  laravel:    ['Route::', 'Controller', 'Request', 'response()->json', 'DB::', 'view(', 'public function', '->where(', '->get()'],
  codeigniter:['Controller', 'respond(', 'ResponseTrait', 'BaseController', 'use ', 'namespace', 'public function'],
  rails:      ['def ', 'render json:', 'params', 'before_action', 'redirect_to', 'respond_to', 'ActiveRecord', 'find('],
  gin:        ['gin.Default()', 'c.JSON(', 'c.String(', 'Context', 'gin.H{', 'Run(', 'GET', 'POST', 'Group(', 'http.StatusOK'],
  echo:       ['echo.New()', 'c.JSON(', 'c.String(', 'Context', 'Start(', 'GET', 'POST', 'Use(', 'error', 'http.StatusOK'],
  actix:      ['HttpResponse::', 'HttpServer::new', 'App::new', 'web::Path', 'Responder', 'serde_json::', '#[get(', 'await'],
  rocket:     ['#[launch]', '#[get(', 'routes!', 'mount(', 'Json(', 'rocket::build()', 'Serialize', 'use rocket'],
  ktor:       ['embeddedServer', 'Netty', 'routing', 'get(', 'call.respond', 'call.receive', 'install', 'Application'],
  playframework: ['Action', 'Ok(', 'Json.obj', 'implicit', 'Request', 'ControllerComponents', 'Singleton', '@Inject'],
  oracle:     ['DECLARE', 'BEGIN', 'END;', 'DBMS_OUTPUT.PUT_LINE', 'EXCEPTION', 'WHEN', 'SELECT INTO', 'VARCHAR2', 'NUMBER'],
  mssql:      ['BEGIN TRANSACTION', 'COMMIT TRANSACTION', 'ROLLBACK TRANSACTION', 'BEGIN TRY', 'END TRY', 'BEGIN CATCH', 'THROW', 'GETDATE()'],
  firebase:   ['initializeApp', 'getDatabase', 'ref(', 'set(', 'onValue(', 'push(', 'update(', 'remove(', 'child('],
  firestore:  ['initializeApp', 'getFirestore', 'doc(', 'collection(', 'setDoc(', 'getDoc(', 'addDoc(', 'query(', 'where('],
  objectivec: ['@interface', '@implementation', '@property', 'NSLog(', 'self.', 'nonatomic', 'strong', 'assign', 'NSInteger', 'NSString'],
  julia:      ['function', 'end', 'println(', 'rand(', 'eigen(', 'matrix', 'vector', 'zeros', 'ones', 'plot', 'import'],
  powershell: ['Get-Process', 'Where-Object', 'Write-Host', 'foreach', 'CimInstance', '$', '-ForegroundColor', '-gt'],
  solidity:   ['pragma solidity', 'contract', 'struct', 'mapping', 'address', 'msg.sender', 'public', 'memory', 'view', 'returns'],
  erlang:     ['-module', '-export', 'spawn', 'receive', 'end.', 'fun()', '!', 'io:format', 'loop', '->'],
  cobol:      ['IDENTIFICATION DIVISION', 'PROGRAM-ID.', 'DATA DIVISION', 'WORKING-STORAGE SECTION', 'PROCEDURE DIVISION', 'DISPLAY', 'STOP RUN', 'PIC '],
  fortran:    ['program', 'end program', 'implicit none', 'integer', 'do', 'end do', 'if', 'then', 'end if', 'print *'],
  nuxtjs:     ['<template>', '<script setup>', 'ref(', 'useAsyncData', '$fetch(', 'NuxtLink', 'useRoute()', 'definePageMeta', 'useFetch('],
  nestjs:     ['@Controller(', '@Get()', '@Post()', '@Body()', '@Param(', '@Injectable()', '@Module(', '@Inject(', 'constructor('],
  lua:        ['local ', 'function', 'end', 'if ', 'then', 'else', 'for ', 'do', 'print(', '..', '#', 'table.insert', 'ipairs('],
  gdscript:   ['func ', 'var ', 'const ', 'if ', 'else:', 'for ', 'in range(', 'print(', 'emit_signal(', '$', '@export', 'extends'],
  wasm:       ['(module', '(func', '(export', 'param', 'result', 'i32', 'i64', 'f32', 'f64', 'local.get', 'i32.add', 'return'],
  clojure:    ['(defn ', '(def ', '(let [', '(if ', '(when ', '->', '->>', '(map ', '(filter ', '(reduce ', '(println ', 'ns '],
  fsharp:     ['let ', 'match ', 'with', '->', '|>', 'type ', 'module ', 'open ', 'printfn', 'sprintf', 'async {', 'member'],
  groovy:     ['def ', 'println ', '${', '}', '->', '.each {', '.findAll {', '.collect {', 'pipeline {', 'stage(', 'steps {'],
  elasticsearch: ['GET /', 'PUT /', 'POST /', 'DELETE /', '"query":', '"bool":', '"must":', '"match":', '"range":', '"filter":'],
  dynamodb:   ['PutItemCommand', 'GetItemCommand', 'QueryCommand', 'UpdateItemCommand', 'DeleteItemCommand', '{ S:', '{ N:', '{ L:'],
  prisma:     ['model ', '@id', '@default(', 'String', 'Int', 'Boolean', 'DateTime', 'findMany(', 'findUnique(', 'create(', 'update('],
  typeorm:    ['@Entity()', '@Column()', '@PrimaryGeneratedColumn()', '@ManyToOne(', '@OneToMany(', 'getRepository(', '.find(', '.save('],
  docker:     ['FROM ', 'WORKDIR ', 'COPY ', 'RUN ', 'EXPOSE ', 'CMD [', 'ENV ', 'ARG ', 'VOLUME [', 'ENTRYPOINT ['],
  kubernetes: ['apiVersion:', 'kind:', 'metadata:', 'spec:', 'replicas:', 'selector:', 'template:', 'containers:', 'image:', 'ports:'],
  terraform:  ['resource "', 'provider "', 'variable "', 'output "', 'module "', 'data "', 'locals {', 'var.', 'count =', 'depends_on'],
  nginx:      ['server {', 'location /', 'listen ', 'server_name ', 'proxy_pass ', 'root ', 'index ', 'try_files ', 'ssl_certificate'],
};

// ─── HINTS (5 per language) ──────────────────────────────────────────────────
export const HINTS_DATA = {
  html: [
    { title: 'Hint 1: Page Structure', body: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Page Title</title>\n</head>\n<body>\n  <!-- Content goes here -->\n</body>\n</html>' },
    { title: 'Hint 2: Text & Headings', body: '<h1>Main Title (one per page)</h1>\n<h2>Section heading</h2>\n<p>A paragraph of text.</p>\n<strong>Bold text</strong>\n<em>Italic text</em>' },
    { title: 'Hint 3: Links & Buttons', body: '<a href="https://example.com" target="_blank">Visit Link</a>\n<button onclick="alert(\'Clicked!\')">Click Me</button>' },
    { title: 'Hint 4: Lists', body: '<!-- Unordered -->\n<ul>\n  <li>Item A</li>\n  <li>Item B</li>\n</ul>\n<!-- Ordered -->\n<ol>\n  <li>Step 1</li>\n  <li>Step 2</li>\n</ol>' },
    { title: 'Hint 5: Forms', body: '<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" placeholder="Your name">\n  <input type="submit" value="Submit">\n</form>' },
  ],
  css: [
    { title: 'Hint 1: Selectors', body: '/* Tag */ p { color: red; }\n/* Class */ .hero-card { padding: 16px; }\n/* ID */ #main-title { font-size: 2rem; }\n/* Descendant */ .card h2 { color: cyan; }' },
    { title: 'Hint 2: Flexbox', body: '.container {\n  display: flex;\n  flex-direction: row;    /* or column */\n  justify-content: center; /* horizontal align */\n  align-items: center;     /* vertical align */\n  gap: 16px;\n}' },
    { title: 'Hint 3: Grid', body: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-template-rows: auto;\n  gap: 24px;\n}\n.grid-item {\n  grid-column: span 2; /* span 2 columns */\n}' },
    { title: 'Hint 4: Animations', body: '@keyframes fadeIn {\n  from { opacity: 0; transform: translateY(-10px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n.card {\n  animation: fadeIn 0.4s ease forwards;\n}' },
    { title: 'Hint 5: CSS Variables', body: ':root {\n  --color-primary: #00f5ff;\n  --spacing-md: 16px;\n  --radius: 8px;\n}\n.button {\n  background: var(--color-primary);\n  padding: var(--spacing-md);\n  border-radius: var(--radius);\n}' },
  ],
  javascript: [
    { title: 'Hint 1: Variables & Types', body: 'const name = "Alice";    // string (cannot reassign)\nlet score = 0;           // number (can reassign)\nlet isActive = true;     // boolean\nlet items = [];          // array\nlet user = {};           // object' },
    { title: 'Hint 2: Functions & Arrow Functions', body: '// Traditional\nfunction add(a, b) { return a + b; }\n\n// Arrow function\nconst multiply = (a, b) => a * b;\n\n// With default params\nconst greet = (name = "World") => `Hello, ${name}!`;' },
    { title: 'Hint 3: Arrays & Map/Filter', body: 'const nums = [1, 2, 3, 4, 5];\n\n// Transform each element\nconst doubled = nums.map(n => n * 2);\n\n// Keep only matching elements\nconst evens = nums.filter(n => n % 2 === 0);\n\n// Reduce to a single value\nconst total = nums.reduce((sum, n) => sum + n, 0);' },
    { title: 'Hint 4: Async / Await', body: 'async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Error:", error);\n  }\n}' },
    { title: 'Hint 5: Destructuring & Spread', body: '// Object destructuring\nconst { name, level, health = 100 } = hero;\n\n// Array destructuring\nconst [first, second, ...rest] = items;\n\n// Spread (merge objects/arrays)\nconst newHero = { ...hero, level: hero.level + 1 };\nconst allItems = [...inventory, ...loot];' },
  ],
  typescript: [
    { title: 'Hint 1: Type Annotations', body: 'let name: string = "Alice";\nlet level: number = 5;\nlet active: boolean = true;\nlet tags: string[] = ["js", "ts"];\nlet pair: [string, number] = ["hero", 10]; // Tuple' },
    { title: 'Hint 2: Interfaces', body: 'interface Hero {\n  id: number;\n  name: string;\n  level: number;\n  health?: number; // Optional field\n  readonly class: string; // Cannot change after creation\n}\n\nconst h: Hero = { id: 1, name: "TS Knight", level: 3, class: "Warrior" };' },
    { title: 'Hint 3: Generics', body: '// Generic function — works with any type\nfunction first<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\n// Generic interface\ninterface ApiResponse<T> {\n  data: T;\n  status: number;\n  message: string;\n}' },
    { title: 'Hint 4: Union & Intersection Types', body: '// Union — can be either type\ntype Status = "active" | "inactive" | "banned";\ntype ID = string | number;\n\n// Intersection — must satisfy both\ntype AdminHero = Hero & { permissions: string[]; };' },
    { title: 'Hint 5: Enums & Type Guards', body: 'enum HeroClass {\n  Warrior = "WARRIOR",\n  Mage = "MAGE",\n  Rogue = "ROGUE"\n}\n\n// Type guard\nfunction isHero(obj: unknown): obj is Hero {\n  return typeof obj === "object" && obj !== null && "name" in obj;\n}' },
  ],
  json: [
    { title: 'Hint 1: JSON Syntax Rules', body: '// 6 valid types: string, number, boolean, null, array, object\n{\n  "name": "string value",\n  "level": 42,\n  "active": true,\n  "score": null,\n  "tags": ["a", "b"],\n  "meta": { "key": "value" }\n}' },
    { title: 'Hint 2: Arrays in JSON', body: '{\n  "heroes": [\n    { "name": "Warrior", "level": 5 },\n    { "name": "Mage", "level": 8 },\n    { "name": "Rogue", "level": 3 }\n  ],\n  "count": 3\n}' },
    { title: 'Hint 3: Nested Objects', body: '{\n  "hero": {\n    "stats": {\n      "attack": 80,\n      "defense": 60\n    },\n    "location": {\n      "x": 10, "y": 25, "map": "dungeon"\n    }\n  }\n}' },
    { title: 'Hint 4: JSON Common Errors', body: '// ❌ Wrong: Trailing comma\n{ "name": "Alice", }\n\n// ❌ Wrong: Single quotes\n{ \'name\': \'Alice\' }\n\n// ❌ Wrong: Undefined / Functions not allowed\n{ "fn": function() {} }\n\n// ✅ Correct\n{ "name": "Alice" }' },
    { title: 'Hint 5: Parse & Stringify in JS', body: '// JSON string → JS Object\nconst hero = JSON.parse(\'{"name":"Alice","level":5}\');\nconsole.log(hero.name); // "Alice"\n\n// JS Object → JSON string\nconst jsonStr = JSON.stringify(hero, null, 2);\nconsole.log(jsonStr); // Pretty-printed' },
  ],
  xml: [
    { title: 'Hint 1: XML Declaration & Root', body: '<?xml version="1.0" encoding="UTF-8"?>\n<!-- Every XML file must have ONE root element -->\n<root>\n  <child>content</child>\n</root>' },
    { title: 'Hint 2: Attributes', body: '<hero id="001" class="warrior" active="true">\n  <name>XML Knight</name>\n  <level>5</level>\n</hero>\n\n<!-- Attributes go inside the opening tag -->' },
    { title: 'Hint 3: Self-Closing Tags', body: '<!-- Tags with no content can be self-closing -->\n<image src="hero.png" width="100" height="100" />\n<br />\n<input type="text" name="username" />' },
    { title: 'Hint 4: CDATA Section', body: '<!-- Use CDATA for content with special characters -->\n<description>\n  <![CDATA[\n    if (a < b && c > d) {\n      console.log("Special chars OK here!");\n    }\n  ]]>\n</description>' },
    { title: 'Hint 5: XML Namespaces', body: '<!-- Namespaces prevent naming conflicts -->\n<root xmlns:hero="http://codequest.app/hero"\n      xmlns:item="http://codequest.app/item">\n  <hero:stats level="5" health="100" />\n  <item:sword damage="80" />\n</root>' },
  ],
  yaml: [
    { title: 'Hint 1: Basic Key-Value Pairs', body: '# YAML uses indentation (spaces only, NO tabs)\nname: Alice\nlevel: 5\nactive: true\nhealth: 100.5\ndescription: "A brave warrior"' },
    { title: 'Hint 2: Lists', body: '# Dash (-) creates a list item\nskills:\n  - Sword Strike\n  - Shield Bash\n  - Battle Cry\n\n# Inline list\ntags: [warrior, fighter, tank]' },
    { title: 'Hint 3: Nested Objects', body: 'hero:\n  name: Alice\n  stats:\n    attack: 80\n    defense: 70\n  location:\n    map: dungeon\n    coordinates: { x: 10, y: 25 }' },
    { title: 'Hint 4: Multi-line Strings', body: '# Literal block (keeps newlines)\ndescription: |\n  Line one\n  Line two\n  Line three\n\n# Folded block (collapses newlines to spaces)\nsummary: >\n  This is a very long sentence\n  that wraps across multiple lines.' },
    { title: 'Hint 5: Anchors & Aliases (DRY)', body: '# Define reusable block with &\ndefaults: &defaults\n  timeout: 30\n  retries: 3\n  region: us-east-1\n\n# Reuse it with *\nproduction:\n  <<: *defaults\n  host: prod.app.com\n\nstaging:\n  <<: *defaults\n  host: staging.app.com' },
  ],
  markdown: [
    { title: 'Hint 1: Headings & Text', body: '# H1 — Page Title\n## H2 — Section\n### H3 — Subsection\n\n**Bold text**\n*Italic text*\n~~Strikethrough~~\n`inline code`' },
    { title: 'Hint 2: Lists & Tasks', body: '<!-- Unordered -->\n- Item A\n- Item B\n  - Nested item\n\n<!-- Ordered -->\n1. Step one\n2. Step two\n\n<!-- Task list -->\n- [x] Completed task\n- [ ] Pending task' },
    { title: 'Hint 3: Links & Images', body: '[Link text](https://example.com)\n[Link with title](https://example.com "Hover title")\n\n![Alt text](image.png)\n![Alt text](image.png "Image title")' },
    { title: 'Hint 4: Code Blocks & Tables', body: '<!-- Inline code -->\nUse `console.log()` to debug.\n\n<!-- Fenced code block -->\n```javascript\nconst x = 42;\nconsole.log(x);\n```\n\n| Col 1 | Col 2 |\n|-------|-------|\n| A     | B     |' },
    { title: 'Hint 5: Blockquotes & Alerts', body: '> This is a blockquote.\n> Multiple lines possible.\n\n> **Note**\n> GitHub renders special alerts!\n\n> **Warning**  \n> This action is irreversible.' },
  ],
  graphql: [
    { title: 'Hint 1: Types & Fields', body: 'type Hero {\n  id: ID!           # Non-null (required)\n  name: String!\n  level: Int!\n  health: Float\n  bio: String       # Nullable (optional)\n  skills: [Skill!]! # Non-null list of non-null items\n}' },
    { title: 'Hint 2: Queries', body: '# Simple query\nquery GetHero {\n  hero(id: "1") {\n    name\n    level\n    skills {\n      name\n      damage\n    }\n  }\n}\n\n# Query with variables\nquery GetHero($id: ID!, $minLevel: Int = 1) {\n  hero(id: $id, minLevel: $minLevel) { name }\n}' },
    { title: 'Hint 3: Mutations', body: '# Mutations modify data\nmutation CreateHero($name: String!, $class: String!) {\n  createHero(name: $name, class: $class) {\n    id\n    name\n    level\n  }\n}\n\nmutation LevelUp($heroId: ID!) {\n  levelUp(id: $heroId) { level health }\n}' },
    { title: 'Hint 4: Subscriptions (Real-time)', body: '# Subscriptions = WebSocket-based real-time updates\nsubscription OnHeroLevelUp {\n  heroLeveledUp {\n    name\n    newLevel\n    xpEarned\n  }\n}\n\nsubscription OnBossSpawned($region: String!) {\n  bossSpawned(region: $region) { name health }\n}' },
    { title: 'Hint 5: Fragments & Interfaces', body: '# Reuse field sets with fragments\nfragment HeroStats on Hero {\n  name\n  level\n  health\n}\n\nquery { hero(id:"1") { ...HeroStats skills { name } } }\n\n# Interface\ninterface Character { id: ID! name: String! }\ntype Hero implements Character { id: ID! name: String! class: String! }' },
  ],
  python: [
    { title: 'Hint 1: Variables & Data Types', body: 'name = "Alice"        # str\nlevel = 5             # int\nhealth = 100.5        # float\nis_active = True      # bool\nitems = ["sword", "potion"]  # list\nstats = {"atk": 80}  # dict\ncoords = (10, 25)    # tuple (immutable)' },
    { title: 'Hint 2: Functions & Type Hints', body: 'def greet(name: str, times: int = 1) -> str:\n    """Return a greeting message."""\n    return f"Hello, {name}! " * times\n\n# Lambda (anonymous function)\nsquare = lambda x: x ** 2\n\n# *args and **kwargs\ndef log(*args, **kwargs):\n    print(args, kwargs)' },
    { title: 'Hint 3: List Comprehensions', body: '# Standard loop\nsquares = []\nfor i in range(10):\n    squares.append(i ** 2)\n\n# List comprehension (Pythonic!)\nsquares = [i ** 2 for i in range(10)]\n\n# With filter\nevens = [i for i in range(20) if i % 2 == 0]\n\n# Dict comprehension\nscores = {name: len(name) for name in ["Alice", "Bob"]}' },
    { title: 'Hint 4: Classes & OOP', body: 'class Hero:\n    class_var = "Warrior"  # Shared by all instances\n\n    def __init__(self, name: str):\n        self.name = name  # Instance variable\n        self._health = 100  # Protected\n\n    @property\n    def health(self): return self._health\n\n    @classmethod\n    def from_dict(cls, data): return cls(data["name"])\n\n    def __repr__(self): return f"Hero({self.name})"' },
    { title: 'Hint 5: Error Handling & Context Managers', body: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f"Error: {e}")\nexcept (ValueError, TypeError) as e:\n    print(f"Type error: {e}")\nelse:\n    print("No error!")\nfinally:\n    print("Always runs")\n\n# Context manager\nwith open("file.txt", "r") as f:\n    content = f.read()' },
  ],
  java: [
    { title: 'Hint 1: Classes & Objects', body: 'public class Hero {\n    // Fields\n    private String name;\n    private int level = 1;\n\n    // Constructor\n    public Hero(String name) {\n        this.name = name;\n    }\n\n    // Getter/Setter\n    public String getName() { return name; }\n    public void setLevel(int l) { this.level = l; }\n\n    // toString override\n    @Override\n    public String toString() {\n        return name + " (Lvl " + level + ")";\n    }\n}' },
    { title: 'Hint 2: Inheritance & Interfaces', body: 'interface Combatant {\n    int attack();\n    default String describe() { return "A combatant"; }\n}\n\nclass Warrior extends Hero implements Combatant {\n    public Warrior(String name) { super(name); }\n\n    @Override\n    public int attack() { return 80; }\n}' },
    { title: 'Hint 3: Collections', body: 'import java.util.*;\n\nList<String> skills = new ArrayList<>();\nskills.add("Sword Strike");\nskills.remove("Sword Strike");\n\nMap<String, Integer> stats = new HashMap<>();\nstats.put("attack", 80);\nstats.getOrDefault("defense", 0);\n\nSet<String> tags = new HashSet<>();\ntags.add("warrior");' },
    { title: 'Hint 4: Streams (Java 8+)', body: 'import java.util.stream.*;\n\nList<Hero> heroes = List.of(...);\n\n// Filter, map, collect\nList<String> names = heroes.stream()\n    .filter(h -> h.getLevel() > 5)\n    .map(Hero::getName)\n    .sorted()\n    .collect(Collectors.toList());\n\n// Aggregate\nint totalXP = heroes.stream()\n    .mapToInt(Hero::getXP)\n    .sum();' },
    { title: 'Hint 5: Exception Handling', body: 'public class GameException extends RuntimeException {\n    public GameException(String msg) { super(msg); }\n}\n\ntry {\n    if (level > MAX_LEVEL)\n        throw new GameException("Max level reached!");\n} catch (GameException e) {\n    System.err.println("Error: " + e.getMessage());\n} finally {\n    System.out.println("Cleanup done.");\n}' },
  ],
  csharp: [
    { title: 'Hint 1: Classes & Properties', body: 'public class Hero {\n    // Auto-properties\n    public string Name { get; private set; }\n    public int Level { get; set; } = 1;\n\n    // Expression-bodied getter\n    public bool IsElite => Level >= 10;\n\n    public Hero(string name) => Name = name;\n\n    public override string ToString() =>\n        $"{Name} | Level: {Level} | Elite: {IsElite}";\n}' },
    { title: 'Hint 2: LINQ (C# Superpower)', body: 'using System.Linq;\n\nvar heroes = new List<Hero> { ... };\n\n// LINQ query syntax\nvar elite = from h in heroes\n            where h.Level >= 10\n            orderby h.Level descending\n            select h.Name;\n\n// LINQ method syntax\nvar names = heroes\n    .Where(h => h.Level >= 10)\n    .OrderByDescending(h => h.Level)\n    .Select(h => h.Name);' },
    { title: 'Hint 3: Async/Await (.NET)', body: 'using System.Net.Http;\nusing System.Text.Json;\n\npublic async Task<Hero> FetchHeroAsync(int id) {\n    using var http = new HttpClient();\n    var json = await http.GetStringAsync(\n        $"https://api.codequest.app/heroes/{id}");\n    return JsonSerializer.Deserialize<Hero>(json);\n}' },
    { title: 'Hint 4: Records & Pattern Matching', body: '// Record (immutable data type, C# 9+)\npublic record Hero(string Name, int Level, string Class);\n\n// Pattern matching (switch expression)\nstring GetTitle(Hero h) => h.Level switch {\n    >= 20 => "Legendary",\n    >= 10 => "Elite",\n    >=  5 => "Veteran",\n    _     => "Novice"\n};' },
    { title: 'Hint 5: Generics & Extension Methods', body: '// Generic repository\npublic class Repository<T> where T : class {\n    private readonly List<T> _items = new();\n    public void Add(T item) => _items.Add(item);\n    public IEnumerable<T> GetAll() => _items;\n}\n\n// Extension method\npublic static class HeroExtensions {\n    public static Hero LevelUp(this Hero h) =>\n        h with { Level = h.Level + 1 };\n}' },
  ],
  go: [
    { title: 'Hint 1: Variables & Types', body: '// Short declaration (inside functions)\nname := "Alice"\nlevel := 5\nhealth := 100.0\n\n// Explicit declaration\nvar xp int = 0\nvar skills []string = []string{"Strike", "Block"}\n\n// Constants\nconst MaxLevel = 100\nconst Pi = 3.14159' },
    { title: 'Hint 2: Structs & Methods', body: 'type Hero struct {\n    Name   string\n    Level  int\n    Health float64\n}\n\n// Method with value receiver (copy)\nfunc (h Hero) Describe() string {\n    return fmt.Sprintf("%s Lvl%d", h.Name, h.Level)\n}\n\n// Method with pointer receiver (modifies original)\nfunc (h *Hero) LevelUp() {\n    h.Level++\n    h.Health += 20\n}' },
    { title: 'Hint 3: Interfaces', body: 'type Animal interface {\n    Sound() string\n    Move(speed int)\n}\n\n// Go interfaces are satisfied implicitly!\ntype Dog struct{ Name string }\nfunc (d Dog) Sound() string { return "Woof" }\nfunc (d Dog) Move(s int) { fmt.Printf("Running at %d\\n", s) }\n\n// Dog automatically satisfies Animal' },
    { title: 'Hint 4: Goroutines & Channels (Go\'s Superpower)', body: 'func fetchData(url string, ch chan<- string) {\n    // Simulate work\n    ch <- "Data from " + url\n}\n\nfunc main() {\n    ch := make(chan string, 2)\n    go fetchData("url1", ch)\n    go fetchData("url2", ch)\n\n    result1 := <-ch\n    result2 := <-ch\n    fmt.Println(result1, result2)\n}' },
    { title: 'Hint 5: Error Handling', body: '// Go errors are values (no exceptions!)\nfunc divide(a, b float64) (float64, error) {\n    if b == 0 {\n        return 0, fmt.Errorf("cannot divide by zero")\n    }\n    return a / b, nil\n}\n\nresult, err := divide(10, 0)\nif err != nil {\n    log.Printf("Error: %v", err)\n    return\n}\nfmt.Println(result)' },
  ],
  rust: [
    { title: 'Hint 1: Ownership & Borrowing', body: '// Each value has one owner\nlet s1 = String::from("hello");\nlet s2 = s1; // s1 is MOVED to s2 (not copied)\n// s1 is now invalid!\n\n// Borrow (reference) — no ownership transfer\nlet s3 = String::from("world");\nlet len = calculate_length(&s3); // Pass reference\nprintln!("{} has {} chars", s3, len); // s3 still valid!' },
    { title: 'Hint 2: Structs & Impl', body: '#[derive(Debug, Clone)]\nstruct Hero {\n    name: String,\n    level: u32,\n}\n\nimpl Hero {\n    // Constructor (associated function)\n    fn new(name: &str) -> Self {\n        Hero { name: name.to_string(), level: 1 }\n    }\n\n    // Method\n    fn level_up(&mut self) { self.level += 1; }\n}\n\nlet mut hero = Hero::new("Rust Crusader");\nhero.level_up();\nprintln!("{:?}", hero);' },
    { title: 'Hint 3: Enums & Pattern Matching', body: '#[derive(Debug)]\nenum QuestResult {\n    Success { xp: u32 },\n    Failure(String),\n    Abandoned,\n}\n\nlet result = QuestResult::Success { xp: 200 };\n\nmatch result {\n    QuestResult::Success { xp } => println!("Won! +{} XP", xp),\n    QuestResult::Failure(msg)   => println!("Failed: {}", msg),\n    QuestResult::Abandoned      => println!("Abandoned"),\n}' },
    { title: 'Hint 4: Option & Result (No Null!)', body: '// Option<T> = Some(value) or None\nfn find_hero(name: &str) -> Option<Hero> {\n    if name.is_empty() { None } else { Some(Hero::new(name)) }\n}\n\n// ? operator propagates errors\nfn load_hero(id: u32) -> Result<Hero, String> {\n    let data = read_file(id)?; // Returns Err if fails\n    let hero = parse_hero(&data)?;\n    Ok(hero)\n}' },
    { title: 'Hint 5: Traits (like Interfaces)', body: 'trait Combatant {\n    fn attack(&self) -> u32;\n    fn describe(&self) -> String {\n        format!("Combatant with {} attack", self.attack())\n    }\n}\n\nstruct Warrior { strength: u32 }\nimpl Combatant for Warrior {\n    fn attack(&self) -> u32 { self.strength * 2 }\n}\n\n// Generic function using trait bound\nfn battle<T: Combatant>(c: &T) {\n    println!("Attack: {}", c.attack());\n}' },
  ],
  php: [
    { title: 'Hint 1: Variables & Types', body: '<?php\n// Variables start with $\n$name = "Alice";       // string\n$level = 5;            // int\n$health = 100.5;       // float\n$active = true;        // bool\n$items = [];           // array\n$nothing = null;       // null\n\n// Type juggling (PHP is loosely typed)\nvar_dump(0 == "0");    // bool(true)\nvar_dump(0 === "0");   // bool(false) — strict' },
    { title: 'Hint 2: Arrays (PHP\'s Swiss Army Knife)', body: '// Indexed array\n$skills = ["Sword", "Shield", "Magic"];\n$skills[] = "Stealth"; // Add item\n\n// Associative array (like object/dict)\n$stats = [\n    "attack"  => 80,\n    "defense" => 70,\n    "speed"   => 90,\n];\necho $stats["attack"]; // 80\n\n// 2D array\n$heroes = [\n    ["name" => "Alice", "level" => 5],\n    ["name" => "Bob",   "level" => 3],\n];' },
    { title: 'Hint 3: Functions', body: '// Regular function\nfunction greet(string $name, int $times = 1): string {\n    return str_repeat("Hello, $name! ", $times);\n}\n\n// Arrow function (PHP 7.4+)\n$double = fn($n) => $n * 2;\n\n// Variadic function\nfunction sumAll(int ...$nums): int {\n    return array_sum($nums);\n}\necho sumAll(1, 2, 3, 4); // 10' },
    { title: 'Hint 4: Classes & OOP', body: '<?php\nclass Hero {\n    public function __construct(\n        private string $name,\n        private int $level = 1 // Constructor property promotion\n    ) {}\n\n    public function levelUp(): static { // Fluent interface\n        $this->level++;\n        return $this;\n    }\n\n    public function __toString(): string {\n        return "{$this->name} Lvl{$this->level}";\n    }\n}\n\n$hero = (new Hero("PHP Dragon"))->levelUp()->levelUp();\necho $hero; // "PHP Dragon Lvl3"' },
    { title: 'Hint 5: Common PHP Functions', body: '<?php\n// String\n$s = "Hello World";\necho strlen($s);           // 11\necho strtolower($s);       // hello world\necho str_replace("o","0",$s); // Hell0 W0rld\necho substr($s, 6, 5);     // World\n\n// Array\n$arr = [3, 1, 4, 1, 5];\nsort($arr);\n$mapped = array_map(fn($n) => $n * 2, $arr);\n$filtered = array_filter($arr, fn($n) => $n > 2);\n$total = array_sum($arr);' },
  ],
  ruby: [
    { title: 'Hint 1: Variables & Methods', body: '# Variable types\nname = "Alice"         # local\n@instance_var = 5     # instance (inside class)\n@@class_var = 0       # class-level\nCONSTANT = 3.14       # constant\n\n# Method definition\ndef greet(name, times: 1)\n  "Hello, #{name}! " * times\nend\n\ngreet("World")           # times defaults to 1\ngreet("World", times: 3)' },
    { title: 'Hint 2: Blocks, Procs & Lambdas', body: '# Block (anonymous code passed to method)\n[1,2,3].each { |n| puts n }\n[1,2,3].each do |n|\n  puts n * 2\nend\n\n# Proc (reusable block)\ndouble = Proc.new { |n| n * 2 }\ndouble.call(5) # → 10\n\n# Lambda (strict Proc)\nsquare = ->(n) { n ** 2 }\nsquare.(4) # → 16' },
    { title: 'Hint 3: Enumerable (Ruby\'s Magic)', body: 'heroes = [{name:"Alice", lvl:5}, {name:"Bob", lvl:3}]\n\n# map — transform\nnames = heroes.map { |h| h[:name] }       # ["Alice","Bob"]\n\n# select — filter\nelite = heroes.select { |h| h[:lvl] >= 5 } # [{name:"Alice"...}]\n\n# reduce — aggregate\ntotal = heroes.reduce(0) { |sum,h| sum + h[:lvl] } # 8\n\n# each_with_object\nresult = heroes.each_with_object({}) { |h, acc| acc[h[:name]] = h[:lvl] }' },
    { title: 'Hint 4: Modules & Mixins', body: 'module Magical\n  def cast_spell(name)\n    puts "✨ #{self.name} casts #{name}!"\n  end\n\n  def self.included(base)\n    puts "#{base} gained magic powers!"\n  end\nend\n\nclass Mage\n  include Magical\n  attr_reader :name\n  def initialize(name) = @name = name\nend\n\nMage.new("Gandalf").cast_spell("Fireball")' },
    { title: 'Hint 5: Metaprogramming (Ruby Unique!)', body: '# define_method dynamically\nclass Hero\n  [:attack, :defend, :dodge].each do |action|\n    define_method("can_#{action}?") { true }\n  end\nend\n\nhero = Hero.new\nhero.can_attack?  # → true\nhero.can_dodge?   # → true\n\n# method_missing — intercept unknown calls\nclass DynamicHero\n  def method_missing(name, *args)\n    "You called #{name} with #{args}"\n  end\nend' },
  ],
  kotlin: [
    { title: 'Hint 1: Variables & Null Safety', body: '// val = immutable, var = mutable\nval name: String = "Alice"   // Cannot reassign\nvar level: Int = 1            // Can reassign\n\n// Nullable type (use ? to allow null)\nvar nickname: String? = null\n\n// Safe call operator (?.) — no NullPointerException!\nval len = nickname?.length    // null if nickname is null\n\n// Elvis operator (?:) — default value\nval displayName = nickname ?: "Anonymous"' },
    { title: 'Hint 2: Data Classes', body: '// Data class auto-generates equals, hashCode, toString, copy\ndata class Hero(\n    val name: String,\n    val level: Int,\n    val health: Double = 100.0\n)\n\nval hero = Hero("Alice", 5)\nval stronger = hero.copy(level = 10) // Create modified copy\n\n// Destructuring\nval (heroName, heroLevel) = hero\nprintln("$heroName is level $heroLevel")' },
    { title: 'Hint 3: When Expression', body: 'val level = 15\n\nval title = when {\n    level >= 20 -> "Legendary"\n    level >= 10 -> "Elite"\n    level >= 5  -> "Veteran"\n    else        -> "Novice"\n}\n\n// When with argument\nval desc = when (title) {\n    "Legendary" -> "💎 Ultra rare!"\n    "Elite"     -> "⭐ Great rank!"\n    else        -> "Keep grinding!"\n}' },
    { title: 'Hint 4: Coroutines (Async Magic)', body: 'import kotlinx.coroutines.*\n\nsuspend fun fetchHero(id: Int): Hero {\n    delay(100) // Non-blocking pause\n    return Hero("Hero_$id", id)\n}\n\nfun main() = runBlocking {\n    // Launch concurrent coroutines\n    val jobs = (1..5).map { id ->\n        async { fetchHero(id) }\n    }\n    val heroes = jobs.awaitAll()\n    heroes.forEach { println(it) }\n}' },
    { title: 'Hint 5: Extension Functions', body: '// Add methods to existing classes without subclassing!\nfun String.isPalindrome(): Boolean =\n    this == this.reversed()\n\nfun Int.factorial(): Long =\n    if (this <= 1) 1L else this * (this - 1).factorial()\n\nfun Hero.powerScore(): Double =\n    level * 1.5 + health * 0.1\n\n"racecar".isPalindrome() // true\n5.factorial()            // 120\nhero.powerScore()        // calculated' },
  ],
  swift: [
    { title: 'Hint 1: Optionals', body: '// Optional = might have a value or be nil\nvar nickname: String? = nil\nvar level: Int? = 5\n\n// Optional binding (safe unwrap)\nif let lv = level {\n    print("Level: \\(lv)")\n}\n\n// Guard (early exit pattern)\nfunc greet(_ name: String?) {\n    guard let name = name else {\n        print("No name!"); return\n    }\n    print("Hello, \\(name)!")\n}\n\n// Nil coalescing (??) — default value\nlet display = nickname ?? "Anonymous"' },
    { title: 'Hint 2: Structs vs Classes', body: '// Struct = Value Type (copied)\nstruct Point { var x: Int; var y: Int }\nvar p1 = Point(x: 1, y: 2)\nvar p2 = p1      // Independent copy\np2.x = 99        // p1.x still 1\n\n// Class = Reference Type (shared)\nclass Hero {\n    var name: String\n    init(_ n: String) { name = n }\n}\nlet h1 = Hero("Alice")\nlet h2 = h1      // Same object!\nh2.name = "Bob"  // h1.name is now "Bob" too!' },
    { title: 'Hint 3: Protocols & Extensions', body: 'protocol Drawable {\n    func draw() -> String\n    var color: String { get }\n}\n\n// Extension adds default implementation\nextension Drawable {\n    func describe() -> String {\n        "I am \\(color) and draw: \\(draw())"\n    }\n}\n\nstruct Circle: Drawable {\n    var color = "red"\n    func draw() -> String { "⭕" }\n}\n\n// Extend existing types!\nextension Int {\n    var isEven: Bool { self % 2 == 0 }\n}' },
    { title: 'Hint 4: Closures', body: '// Closure = Swift\'s anonymous function\nlet greet = { (name: String) -> String in\n    return "Hello, \\(name)!"\n}\n\n// Trailing closure syntax\nlet numbers = [3, 1, 4, 1, 5]\nlet sorted = numbers.sorted { $0 < $1 } // $0, $1 = shorthand args\nlet doubled = numbers.map { $0 * 2 }\nlet evens = numbers.filter { $0 % 2 == 0 }' },
    { title: 'Hint 5: Error Handling', body: 'enum GameError: Error {\n    case invalidLevel(Int)\n    case heroNotFound(String)\n    case networkFailure\n}\n\nfunc loadHero(level: Int) throws -> Hero {\n    guard level > 0 else {\n        throw GameError.invalidLevel(level)\n    }\n    return Hero("Hero_\\(level)")\n}\n\ndo {\n    let hero = try loadHero(level: -1)\n    print(hero.name)\n} catch GameError.invalidLevel(let lvl) {\n    print("Invalid level: \\(lvl)")\n} catch { print("Unknown error: \\(error)") }' },
  ],
  dart: [
    { title: 'Hint 1: Variables & Null Safety', body: '// Dart 2.x has sound null safety\nString name = "Alice";         // Non-nullable\nString? nickname = null;       // Nullable\nint level = 5;\nfinal double health = 100.0;  // final = cannot reassign\nconst pi = 3.14159;           // const = compile-time constant\n\n// Null-aware operators\nString display = nickname ?? "Guest";      // Default value\nint? len = nickname?.length;               // Safe access\nnickname ??= "Code Warrior";              // Assign if null' },
    { title: 'Hint 2: Classes & Constructors', body: 'class Hero {\n  final String name;\n  int level;\n  double health;\n\n  // Generative constructor\n  Hero({required this.name, this.level = 1, this.health = 100});\n\n  // Named constructor\n  Hero.starter(String name) : this(name: name);\n\n  // Factory constructor\n  factory Hero.fromMap(Map<String, dynamic> map) {\n    return Hero(name: map["name"], level: map["level"]);\n  }\n\n  @override\n  String toString() => "$name (Lvl $level)";\n}' },
    { title: 'Hint 3: Collections & Spread', body: 'List<String> skills = ["Strike", "Block"];\nskills.add("Dodge");\nskills.addAll(["Magic", "Heal"]);\n\n// Spread operator (...)\nList<String> all = [...skills, ...["Ultimate", "Passive"]];\n\n// Collection if & for\nList<Widget> items = [\n  Text("Header"),\n  if (isPremium) Icon(Icons.star),  // Conditional element\n  for (var s in skills) Text(s),    // Loop in literal\n];\n\nMap<String, int> stats = {"atk": 80, "def": 60};\nstats["spd"] = 90;' },
    { title: 'Hint 4: async/await & Futures', body: 'import "dart:async";\n\nFuture<String> fetchHeroName(int id) async {\n  await Future.delayed(Duration(seconds: 1));\n  return "Hero_$id";\n}\n\n// Multiple concurrent futures\nFuture<void> loadAll() async {\n  final results = await Future.wait([\n    fetchHeroName(1),\n    fetchHeroName(2),\n    fetchHeroName(3),\n  ]);\n  print(results); // [Hero_1, Hero_2, Hero_3]\n}\n\n// Stream (continuous data)\nStream<int> levelStream() async* {\n  for (int i = 1; i <= 5; i++) {\n    await Future.delayed(Duration(milliseconds: 100));\n    yield i;\n  }\n}' },
    { title: 'Hint 5: Mixins', body: 'mixin Magical {\n  int mana = 100;\n\n  void castSpell(String spell) {\n    if (mana >= 20) {\n      mana -= 20;\n      print("✨ Casting $spell! Mana: $mana");\n    } else {\n      print("Not enough mana!");\n    }\n  }\n}\n\nmixin Athletic {\n  double stamina = 100.0;\n  void sprint() => stamina -= 10;\n}\n\n// A class can mix in multiple mixins!\nclass MageWarrior extends Hero with Magical, Athletic {\n  MageWarrior(String name) : super(name: name);\n}' },
  ],
  c: [
    { title: 'Hint 1: Data Types & Pointers', body: '// Primitive types\nint age = 25;\nfloat health = 100.5f;\ndouble pi = 3.14159265;\nchar grade = \'A\';\n\n// Pointer — stores memory address\nint level = 5;\nint *pLevel = &level;  // & = address-of\nprintf("%d\\n", *pLevel); // * = dereference\n\n*pLevel = 10; // Modifies original variable!\nprintf("%d\\n", level); // 10' },
    { title: 'Hint 2: Arrays & Strings', body: '// Array\nint scores[5] = {90, 85, 78, 92, 88};\nprintf("First: %d\\n", scores[0]);\n\n// String (char array)\nchar name[50] = "Code Warrior";\nprintf("Name: %s\\n", name);\n\n// String functions\n#include <string.h>\nprintf("Length: %lu\\n", strlen(name));\nstrcpy(name, "New Name");\nstrcat(name, " Jr.");\nprintf("Modified: %s\\n", name);' },
    { title: 'Hint 3: Structs', body: 'typedef struct {\n    char name[50];\n    int  level;\n    float health;\n} Hero;\n\n// Initialize struct\nHero warrior = {"C Crusader", 1, 100.0f};\n\n// Access fields with .\nwarrior.level++;\nprintf("%s: Lvl %d\\n", warrior.name, warrior.level);\n\n// Pointer to struct — use -> instead of .\nHero *pHero = &warrior;\npHero->health -= 10.0f;\nprintf("HP: %.1f\\n", pHero->health);' },
    { title: 'Hint 4: Functions & Recursion', body: '// Prototype declaration\nint factorial(int n);\nvoid swap(int *a, int *b);\n\n// Recursive function\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\n// Pass by pointer (to modify original)\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint x = 5, y = 10;\nswap(&x, &y);\nprintf("%d %d\\n", x, y); // 10 5' },
    { title: 'Hint 5: Dynamic Memory', body: '#include <stdlib.h>\n\n// malloc — allocate memory on heap\nint *arr = (int *)malloc(5 * sizeof(int));\nif (arr == NULL) { /* allocation failed */ return; }\n\nfor (int i = 0; i < 5; i++)\n    arr[i] = i * 10;\n\n// realloc — resize allocation\narr = (int *)realloc(arr, 10 * sizeof(int));\n\n// calloc — allocate & zero-initialize\nint *zeros = (int *)calloc(5, sizeof(int));\n\n// ALWAYS free what you allocate!\nfree(arr);\nfree(zeros);' },
  ],
  cpp: [
    { title: 'Hint 1: References vs Pointers', body: '// Reference — alias for existing variable\nint level = 5;\nint& ref = level;    // ref IS level\nref = 10;            // level is now 10\n\n// Pointer — stores address\nint* ptr = &level;\n*ptr = 20;           // level is now 20\n\n// Const reference (efficient parameter passing)\nvoid printName(const std::string& name) {\n    std::cout << name << "\\n"; // No copy made!\n}' },
    { title: 'Hint 2: Classes & OOP', body: 'class Hero {\nprivate:\n    std::string name;\n    int level;\n\npublic:\n    // Constructor & Destructor\n    Hero(std::string n) : name(std::move(n)), level(1) {}\n    ~Hero() { std::cout << name << " destroyed\\n"; }\n\n    // Operator overloading\n    bool operator>(const Hero& other) const {\n        return level > other.level;\n    }\n\n    friend std::ostream& operator<<(std::ostream& os, const Hero& h);\n};' },
    { title: 'Hint 3: Templates', body: '// Generic function\ntemplate<typename T>\nT maxValue(T a, T b) {\n    return (a > b) ? a : b;\n}\n\nmaxValue(5, 3);          // int\nmaxValue(3.14, 2.71);    // double\nmaxValue(std::string("b"), std::string("a"));\n\n// Template class\ntemplate<typename T>\nclass Stack {\n    std::vector<T> data;\npublic:\n    void push(const T& item) { data.push_back(item); }\n    T pop() { auto top = data.back(); data.pop_back(); return top; }\n};' },
    { title: 'Hint 4: Smart Pointers (Modern C++)', body: '#include <memory>\n\n// unique_ptr — single ownership, auto-deletes\nauto hero = std::make_unique<Hero>("C++ Champ");\n// hero is auto-freed when it goes out of scope!\n\n// shared_ptr — shared ownership, ref-counted\nauto shared = std::make_shared<Hero>("Shared Hero");\nauto copy = shared; // ref count = 2\n// freed when last shared_ptr is destroyed\n\n// weak_ptr — non-owning reference\nstd::weak_ptr<Hero> weak = shared;' },
    { title: 'Hint 5: STL Algorithms & Lambda', body: '#include <algorithm>\n#include <vector>\n\nstd::vector<int> scores = {90, 45, 78, 92, 33};\n\n// Sort with comparator\nstd::sort(scores.begin(), scores.end(),\n    [](int a, int b) { return a > b; }); // Descending\n\n// Find element\nauto it = std::find(scores.begin(), scores.end(), 78);\n\n// Transform (like map)\nstd::vector<int> doubled(scores.size());\nstd::transform(scores.begin(), scores.end(), doubled.begin(),\n    [](int n) { return n * 2; });' },
  ],
  sql: [
    { title: 'Hint 1: SELECT & Filtering', body: '-- Get all columns\nSELECT * FROM heroes;\n\n-- Specific columns\nSELECT name, level, class FROM heroes;\n\n-- WHERE clause\nSELECT name, xp FROM heroes\nWHERE level > 5 AND class = \'Mage\';\n\n-- ORDER BY\nSELECT * FROM heroes ORDER BY level DESC;\n\n-- LIMIT results\nSELECT * FROM heroes LIMIT 10;' },
    { title: 'Hint 2: JOINs', body: '-- INNER JOIN — only matching rows\nSELECT h.name, s.skill_name\nFROM heroes h\nINNER JOIN hero_skills hs ON h.id = hs.hero_id\nINNER JOIN skills s ON hs.skill_id = s.id;\n\n-- LEFT JOIN — all heroes, even without skills\nSELECT h.name, s.skill_name\nFROM heroes h\nLEFT JOIN hero_skills hs ON h.id = hs.hero_id\nLEFT JOIN skills s ON hs.skill_id = s.id;' },
    { title: 'Hint 3: Aggregate Functions', body: 'SELECT\n    class,\n    COUNT(*)   AS hero_count,\n    AVG(level) AS avg_level,\n    MAX(xp)    AS max_xp,\n    MIN(level) AS min_level,\n    SUM(xp)    AS total_xp\nFROM heroes\nGROUP BY class\nHAVING COUNT(*) > 1\nORDER BY avg_level DESC;' },
    { title: 'Hint 4: Subqueries', body: '-- Scalar subquery\nSELECT name, level\nFROM heroes\nWHERE level = (SELECT MAX(level) FROM heroes);\n\n-- IN with subquery\nSELECT name FROM heroes\nWHERE id IN (\n    SELECT hero_id FROM hero_skills\n    WHERE skill_id IN (SELECT id FROM skills WHERE damage > 80)\n);\n\n-- Correlated subquery\nSELECT name, level,\n    (SELECT COUNT(*) FROM quests WHERE hero_id = h.id) AS quest_count\nFROM heroes h;' },
    { title: 'Hint 5: CREATE, ALTER, INDEX', body: '-- Create table with constraints\nCREATE TABLE heroes (\n    id       INT PRIMARY KEY AUTO_INCREMENT,\n    name     VARCHAR(100) NOT NULL UNIQUE,\n    level    INT DEFAULT 1 CHECK (level >= 1),\n    class    ENUM(\'Warrior\',\'Mage\',\'Rogue\') NOT NULL,\n    xp       INT DEFAULT 0,\n    created  TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Add column\nALTER TABLE heroes ADD COLUMN premium BOOLEAN DEFAULT FALSE;\n\n-- Create index for faster queries\nCREATE INDEX idx_heroes_level ON heroes(level DESC);' },
  ],
  postgresql: [
    { title: 'Hint 1: CTE (WITH clause)', body: '-- Common Table Expression — like a temp named query\nWITH elite_heroes AS (\n    SELECT name, level, xp\n    FROM heroes\n    WHERE level >= 10\n),\ntop_xp AS (\n    SELECT name, xp,\n           RANK() OVER (ORDER BY xp DESC) AS rank\n    FROM elite_heroes\n)\nSELECT * FROM top_xp WHERE rank <= 3;' },
    { title: 'Hint 2: Window Functions', body: 'SELECT\n    name, level, xp,\n    -- Running total\n    SUM(xp) OVER (ORDER BY xp) AS cumulative_xp,\n    -- Rank (with gaps)\n    RANK() OVER (ORDER BY xp DESC) AS rank,\n    -- Dense rank (no gaps)\n    DENSE_RANK() OVER (PARTITION BY class ORDER BY xp DESC) AS class_rank,\n    -- Previous row value\n    LAG(xp, 1, 0) OVER (ORDER BY xp) AS prev_xp\nFROM heroes;' },
    { title: 'Hint 3: JSONB (Native JSON)', body: '-- Create table with JSONB column\nCREATE TABLE hero_profiles (\n    id SERIAL PRIMARY KEY,\n    name TEXT,\n    data JSONB\n);\n\nINSERT INTO hero_profiles (name, data) VALUES\n(\'Alice\', \'{"class":"Mage","skills":["Fireball"],"stats":{"atk":90}}\');\n\n-- Query JSONB\nSELECT name, data->>\'class\' AS class  -- Text output\nFROM hero_profiles\nWHERE data->\'stats\'->\'atk\'::int > 80; -- Numeric compare\n\n-- Update JSONB field\nUPDATE hero_profiles\nSET data = jsonb_set(data, \'{stats,atk}\', \'99\'::jsonb)\nWHERE name = \'Alice\';' },
    { title: 'Hint 4: Recursive CTEs', body: '-- Great for hierarchies, trees, graphs\nWITH RECURSIVE skill_tree AS (\n    -- Base case\n    SELECT id, name, parent_id, 1 AS depth\n    FROM skills WHERE parent_id IS NULL\n\n    UNION ALL\n\n    -- Recursive case\n    SELECT s.id, s.name, s.parent_id, st.depth + 1\n    FROM skills s\n    INNER JOIN skill_tree st ON s.parent_id = st.id\n    WHERE st.depth < 10 -- Prevent infinite loops\n)\nSELECT depth, REPEAT(\'  \', depth) || name AS skill_path\nFROM skill_tree\nORDER BY depth, name;' },
    { title: 'Hint 5: PostgreSQL-Specific Types', body: '-- Arrays\nCREATE TABLE heroes (skills TEXT[], tags INTEGER[]);\nINSERT INTO heroes VALUES (ARRAY[\'Strike\',\'Block\'], \'{1,2,3}\');\nSELECT * FROM heroes WHERE \'Strike\' = ANY(skills);\n\n-- Range types\nCREATE TABLE events (during TSRANGE);\nSELECT * FROM events WHERE during @> NOW(); -- Contains current time\n\n-- UUID\nCREATE EXTENSION IF NOT EXISTS "uuid-ossp";\nSELECT uuid_generate_v4();\n\n-- Full-text search\nSELECT name FROM heroes\nWHERE to_tsvector(\'english\', bio) @@ to_tsquery(\'magic & warrior\');' },
  ],
  mongodb: [
    { title: 'Hint 1: CRUD Operations', body: '// INSERT\ndb.heroes.insertOne({ name: "Alice", level: 5 });\ndb.heroes.insertMany([{ name: "Bob" }, { name: "Carol" }]);\n\n// READ\ndb.heroes.find({ level: { $gte: 5 } });\ndb.heroes.findOne({ name: "Alice" });\n\n// UPDATE\ndb.heroes.updateOne({ name: "Alice" }, { $set: { level: 6 }, $push: { skills: "Fireball" } });\ndb.heroes.updateMany({ level: { $lt: 3 } }, { $inc: { xp: 50 } });\n\n// DELETE\ndb.heroes.deleteOne({ name: "Bob" });\ndb.heroes.deleteMany({ level: { $lt: 1 } });' },
    { title: 'Hint 2: Query Operators', body: '// Comparison\n{ level: { $gt: 5 } }    // Greater than\n{ level: { $gte: 5 } }   // Greater or equal\n{ level: { $lt: 10 } }   // Less than\n{ level: { $in: [3,5,7] } } // Match any\n{ level: { $nin: [1,2] } }  // Not in\n\n// Logical\n{ $and: [{ level: { $gt: 5 } }, { class: "Mage" }] }\n{ $or: [{ class: "Mage" }, { class: "Wizard" }] }\n{ level: { $not: { $gt: 10 } } }\n\n// Array operators\n{ skills: { $all: ["Fireball", "Ice"] } }\n{ skills: { $size: 3 } }' },
    { title: 'Hint 3: Aggregation Pipeline', body: '// Pipeline stages\ndb.heroes.aggregate([\n  { $match: { level: { $gte: 5 } } },      // Filter\n  { $group: {                               // Group\n      _id: "$class",\n      avgLevel: { $avg: "$level" },\n      count: { $sum: 1 }\n  }},\n  { $sort: { avgLevel: -1 } },             // Sort\n  { $limit: 5 },                           // Limit\n  { $project: {                            // Shape output\n      class: "$_id",\n      avgLevel: { $round: ["$avgLevel", 1] },\n      count: 1, _id: 0\n  }}\n]);' },
    { title: 'Hint 4: Indexes', body: '// Single field index\ndb.heroes.createIndex({ level: -1 }); // -1 = descending\n\n// Compound index\ndb.heroes.createIndex({ class: 1, level: -1 });\n\n// Text index (for search)\ndb.heroes.createIndex({ name: "text", bio: "text" });\ndb.heroes.find({ $text: { $search: "warrior magic" } });\n\n// TTL index (auto-delete after time)\ndb.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });\n\n// Explain query plan\ndb.heroes.find({ level: 5 }).explain("executionStats");' },
    { title: 'Hint 5: Lookup (JOIN equivalent)', body: '// $lookup = LEFT OUTER JOIN\ndb.orders.aggregate([\n  {\n    $lookup: {\n      from: "heroes",      // Collection to join\n      localField: "hero_id",   // Field in orders\n      foreignField: "_id",     // Field in heroes\n      as: "hero_details"       // Output array field\n    }\n  },\n  { $unwind: "$hero_details" }, // Flatten array\n  {\n    $project: {\n      orderId: "$_id",\n      heroName: "$hero_details.name",\n      heroLevel: "$hero_details.level",\n      amount: 1\n    }\n  }\n]);' },
  ],
  redis: [
    { title: 'Hint 1: Strings & Counters', body: '# Basic set/get\nSET key "value"\nGET key\n\n# Atomic counters (great for rate limiting, view counts)\nSET hero:views 0\nINCR hero:views        # → 1 (atomic!)\nINCRBY hero:views 10   # → 11\nDECR hero:views        # → 10\n\n# Expiry (TTL)\nSETEX session:abc 3600 "user_data"  # Expire in 1 hour\nTTL session:abc         # Remaining seconds\nPERSIST session:abc     # Remove expiry\nEXPIRE key 300          # Set expiry on existing key' },
    { title: 'Hint 2: Hashes (Store Objects)', body: '# Store object fields\nHSET hero:1 name "Alice" level 5 class "Mage"\nHGET hero:1 name          # "Alice"\nHGETALL hero:1            # All fields + values\nHKEYS hero:1              # ["name","level","class"]\nHVALS hero:1              # ["Alice","5","Mage"]\nHEXISTS hero:1 email      # 0 (not exists)\n\n# Increment hash field\nHINCRBY hero:1 level 1    # level → 6\n\n# Delete field\nHDEL hero:1 class' },
    { title: 'Hint 3: Lists (Queues & Stacks)', body: '# FIFO Queue (message queue)\nRPUSH queue:tasks "task1"  # Push to right\nRPUSH queue:tasks "task2"\nLPOP queue:tasks            # Pop from left → "task1"\n\n# LIFO Stack\nLPUSH stack:calls "call1"\nLPUSH stack:calls "call2"\nLPOP stack:calls            # → "call2"\n\n# View without removing\nLRANGE queue:tasks 0 -1    # All elements\nLRANGE queue:tasks 0 4     # First 5\nLLEN queue:tasks            # Length\n\n# Blocking pop (great for workers)\nBLPOP queue:tasks 30        # Wait up to 30s' },
    { title: 'Hint 4: Sorted Sets (Leaderboards)', body: '# ZADD score member\nZADD leaderboard 5800 "Alice"\nZADD leaderboard 3400 "Bob"\nZADD leaderboard 9100 "Carol"\n\n# Range queries\nZRANGE leaderboard 0 -1 WITHSCORES REV  # Top to bottom\nZRANGE leaderboard 0 2 WITHSCORES        # Top 3\n\n# Rank (0-indexed)\nZRANK leaderboard "Bob"        # 0 (lowest)\nZREVRANK leaderboard "Bob"     # rank from top\n\n# Score\nZSCORE leaderboard "Alice"     # 5800\n\n# Increment score atomically\nZINCRBY leaderboard 200 "Bob"  # Bob → 3600\n\n# Count in range\nZCOUNT leaderboard 3000 9000   # Members with 3000-9000 score' },
    { title: 'Hint 5: Pub/Sub & Patterns', body: '# Publisher/Subscriber (real-time messaging)\n# Subscribe to channel (blocks, listens)\nSUBSCRIBE quest:updates\nPSUBSCRIBE quest:*         # Pattern subscription\n\n# Publish from another client\nPUBLISH quest:updates "New boss: Redis Dragon!"\nPUBLISH quest:rewards "500 XP earned!"\n\n# Transactions (atomic batch)\nMULTI\n  SET score 100\n  INCR score\n  GET score\nEXEC             # Execute atomically\n\n# Pipeline (reduce round-trips)\n# Send multiple commands, get all responses at once\n# (Use client library: redis-py, ioredis, etc.)' },
  ],
  bash: [
    { title: 'Hint 1: Variables & Input', body: '#!/bin/bash\n# Variables (no spaces around =)\nNAME="Alice"\nLEVEL=5\n\n# Special variables\necho $0   # Script name\necho $1   # First argument\necho $#   # Number of arguments\necho "$@" # All arguments\necho $$   # Current PID\necho $?   # Last exit code\n\n# Read user input\nread -p "Enter hero name: " HERO_NAME\necho "Welcome, $HERO_NAME!"' },
    { title: 'Hint 2: Conditionals', body: '#!/bin/bash\nLEVEL=8\n\n# File/string tests\n[ -f "/etc/hosts" ] && echo "File exists"\n[ -d "/tmp" ] && echo "Directory exists"\n[ -z "$VAR" ] && echo "VAR is empty"\n[ -n "$VAR" ] && echo "VAR is not empty"\n\n# Numeric comparison\nif [ $LEVEL -ge 10 ]; then\n    echo "Elite!"\nelif [ $LEVEL -ge 5 ]; then\n    echo "Veteran"\nelse\n    echo "Novice"\nfi\n\n# [[ ]] for regex\n[[ "$NAME" =~ ^[A-Z] ]] && echo "Starts with uppercase"' },
    { title: 'Hint 3: Loops', body: '#!/bin/bash\n# For loop over list\nfor COLOR in red green blue; do\n    echo "Color: $COLOR"\ndone\n\n# For loop over range\nfor i in {1..5}; do echo "Step $i"; done\n\n# C-style for loop\nfor ((i=0; i<5; i++)); do echo $i; done\n\n# While loop\nCOUNTER=0\nwhile [ $COUNTER -lt 5 ]; do\n    echo "Count: $COUNTER"\n    ((COUNTER++))\ndone\n\n# Loop over files\nfor FILE in /etc/*.conf; do\n    echo "$FILE"\ndone' },
    { title: 'Hint 4: Functions & Error Handling', body: '#!/bin/bash\n# Functions\ngreet() {\n    local name=$1  # local = function-scoped\n    echo "Hello, $name!"\n    return 0       # Exit code (0=success)\n}\n\n# Call function\ngreet "Alice"\necho "Exit code: $?"\n\n# Error handling\nset -e  # Exit on any error\nset -u  # Treat unset vars as error\nset -o pipefail  # Catch pipe errors\n\n# Trap signals\ntrap "echo \'Cleanup!\'; exit" INT TERM EXIT\n\n# Check command success\nif ! command -v git &>/dev/null; then\n    echo "git not installed!"\n    exit 1\nfi' },
    { title: 'Hint 5: Text Processing (grep, awk, sed)', body: '#!/bin/bash\nDATA="Alice:Mage:10\nBob:Warrior:5\nCarol:Rogue:8"\n\n# grep — search\necho "$DATA" | grep "Mage"\necho "$DATA" | grep -v "Bob"      # Exclude\necho "$DATA" | grep -c ":"        # Count matches\n\n# awk — column processing\necho "$DATA" | awk -F: \'{ print $1, "Level:", $3 }\'\necho "$DATA" | awk -F: \'$3 >= 8 { print $1 }\'\n\n# sed — stream editor (find & replace)\necho "$DATA" | sed \'s/Mage/Archmage/g\'\necho "$DATA" | sed \'/Bob/d\'       # Delete line\necho "$DATA" | sed \'2p\'           # Print line 2\n\n# Pipeline combination\ncat /etc/passwd | awk -F: \'{ print $1 }\' | sort | head -5' },
  ],
  r: [
    { title: 'Hint 1: Vectors (R\'s Core)', body: '# Everything in R is a vector!\nx <- c(1, 2, 3, 4, 5)   # Numeric vector\nn <- c("Alice","Bob","Carol")  # Character\nb <- c(TRUE, FALSE, TRUE)      # Logical\n\n# Vectorized operations (no loop needed)\nx * 2         # [2, 4, 6, 8, 10]\nx^2           # [1, 4, 9, 16, 25]\nx[x > 3]      # [4, 5]\n\n# Named vectors\nscores <- c(Alice=90, Bob=75, Carol=88)\nscores["Alice"]  # 90\nscores[scores > 80]  # Alice=90, Carol=88' },
    { title: 'Hint 2: Data Frames', body: '# Data frame = table (like Excel or SQL)\nheroes <- data.frame(\n  name  = c("Alice", "Bob", "Carol"),\n  level = c(10, 5, 8),\n  class = c("Mage", "Warrior", "Rogue"),\n  stringsAsFactors = FALSE\n)\n\n# Access columns\nheroes$name          # Column as vector\nheroes[["level"]]    # Same thing\nheroes[1, ]          # First row\nheroes[, "name"]     # Name column\n\n# Filter rows\nheroes[heroes$level > 6, ]\nsubset(heroes, level > 6 & class == "Mage")' },
    { title: 'Hint 3: Functions', body: '# Function definition\nlevel_up <- function(hero_df, amount = 1) {\n  hero_df$level <- hero_df$level + amount\n  return(hero_df)\n}\n\n# Apply family (vectorized iteration)\nscores <- c(80, 95, 67, 88, 73)\nsapply(scores, function(s) if (s >= 90) "A" else "B")  # [B,A,B,B,B]\n\n# lapply (returns list)\nresults <- lapply(1:5, function(i) i^2)\nunlist(results)  # [1, 4, 9, 16, 25]\n\n# vapply (type-safe sapply)\nvapply(scores, function(s) s * 2, numeric(1))' },
    { title: 'Hint 4: Statistical Functions', body: '# Descriptive statistics\ndata <- c(23, 45, 12, 67, 34, 89, 56, 78)\nmean(data)    # Arithmetic mean\nmedian(data)  # Middle value\nsd(data)      # Standard deviation\nvar(data)     # Variance\nrange(data)   # Min and max\nquantile(data, c(0.25, 0.75)) # Q1 and Q3\nsummary(data) # Full summary\n\n# Correlation\ncor(c(1,2,3,4), c(2,4,5,8))  # Pearson correlation\n\n# Linear regression\nmodel <- lm(level ~ xp + class, data = heroes)\nsummary(model)\npredict(model, newdata = data.frame(xp=500, class="Mage"))' },
    { title: 'Hint 5: Plotting (Base R)', body: '# Base R plotting (no library needed)\nx <- 1:100\ny <- x^2 + rnorm(100, 0, 200)\n\n# Scatter plot\nplot(x, y, main="Hero XP Curve",\n     xlab="Level", ylab="XP Required",\n     col="blue", pch=19, cex=0.5)\n\n# Add regression line\nabline(lm(y~x), col="red", lwd=2)\n\n# Histogram\nhist(y, breaks=20, main="XP Distribution",\n     col="steelblue", border="white")\n\n# Bar chart\ncounts <- table(heroes$class)\nbarplot(counts, main="Heroes by Class",\n        col=c("gold","navy","crimson"),\n        las=2)  # Rotate x labels' },
  ],
  matlab: [
    { title: 'Hint 1: Matrices (MATLAB\'s Superpower)', body: '% Create matrices\nA = [1 2 3; 4 5 6; 7 8 9];  % 3x3 matrix\nB = zeros(3, 3);              % All zeros\nI = eye(4);                   % 4x4 identity\nR = rand(3, 4);               % Random values\n\n% Matrix operations\nA\' % Transpose\nA * B   % Matrix multiplication\nA .* A  % Element-wise multiplication\nA / B   % Matrix division (A * inv(B))\n\n% Linear algebra\ndet(A)   % Determinant\ninv(A)   % Inverse\nrank(A)  % Rank\n[V,D] = eig(A); % Eigenvalues/vectors' },
    { title: 'Hint 2: Vectors & Ranges', body: '% Row vector\nv = [1, 2, 3, 4, 5];\n\n% Column vector\ncol = [1; 2; 3; 4; 5];\n\n% Range with step\nx = 0:0.1:10;     % 0 to 10, step 0.1\nx = linspace(0, 2*pi, 100); % 100 evenly spaced\n\n% Vectorized math (no loops!)\ny = sin(x);      % Apply sin to each element\nz = x.^2 + 2*x; % Element-wise operations\n\n% Indexing (1-based!)\nv(1)     % First element\nv(end)   % Last element\nv(2:4)   % Elements 2,3,4\nv(v > 3) % Elements > 3' },
    { title: 'Hint 3: Control Flow', body: '% If-else\nscore = 85;\nif score >= 90\n    grade = \'A\';\nelseif score >= 70\n    grade = \'B\';\nelse\n    grade = \'C\';\nend\nfprintf(\'Grade: %s\\n\', grade);\n\n% For loop\ntotal = 0;\nfor i = 1:10\n    total = total + i;\nend\nfprintf(\'Sum 1-10: %d\\n\', total);\n\n% While loop\nn = 1;\nwhile n < 100\n    n = n * 2;\nend\nfprintf(\'First power of 2 >= 100: %d\\n\', n);\n\n% Switch\nswitch grade\n    case \'A\', disp(\'Excellent!\')\n    case \'B\', disp(\'Good!\')\n    otherwise, disp(\'Keep trying!\')\nend' },
    { title: 'Hint 4: Functions & Scripts', body: '% Function (save as hero.m or inside script with local functions)\nfunction result = levelUp(hero, amount)\n    if nargin < 2  % Default argument\n        amount = 1;\n    end\n    result = hero;\n    result.level = hero.level + amount;\n    result.health = hero.health + 20 * amount;\nend\n\n% Anonymous function\npower_score = @(atk, def, spd) atk*0.5 + def*0.3 + spd*0.2;\npower_score(90, 70, 80)  % 81\n\n% Struct\nhero.name = \'MATLAB Mage\';\nhero.level = 5;\nhero.health = 100;\nhero = levelUp(hero, 3);\nfprintf(\'%s: Lvl %d, HP %d\\n\', hero.name, hero.level, hero.health);' },
    { title: 'Hint 5: Plotting (MATLAB\'s Best Feature)', body: '% Line plot\nx = linspace(0, 4*pi, 200);\ny1 = sin(x);\ny2 = cos(x);\n\nfigure(\'Color\',\'white\');\nplot(x, y1, \'b-\', \'LineWidth\', 2, \'DisplayName\', \'sin(x)\');\nhold on;\nplot(x, y2, \'r--\', \'LineWidth\', 2, \'DisplayName\', \'cos(x)\');\nlegend(\'show\');\ntitle(\'Trigonometric Functions\');\nxlabel(\'x (radians)\');\nylabel(\'Amplitude\');\ngrid on;\n\n% Subplots\nfigure;\nsubplot(2,2,1); bar(rand(5,1),\'FaceColor\',[0 0.5 1]);\nsubplot(2,2,2); histogram(randn(1000,1),30);\nsubplot(2,2,3); scatter(rand(50,1),rand(50,1),50,\'filled\');\nsubplot(2,2,4); surf(peaks(30)); colormap(jet);' },
  ],
  sass: [
    { title: 'Hint 1: Variables', body: '// Sass variables start with $\n$primary-color: #ff00ff;\n$spacing-unit: 16px;\n\n.hero-header {\n  color: $primary-color;\n  padding: $spacing-unit * 2;\n}' },
    { title: 'Hint 2: Nesting', body: '/* Nest selectors inside each other to reflect HTML hierarchy */\n.nav-container {\n  background: #333;\n  .nav-item {\n    display: inline-block;\n    a {\n      color: #fff;\n      text-decoration: none;\n    }\n  }\n}' },
    { title: 'Hint 3: Ampersand (&) Referencing', body: '// Use & to reference the parent selector (great for pseudo-classes)\n.btn-action {\n  background: #00f5ff;\n  &:hover {\n    background: #ff00ff;\n    box-shadow: 0 0 10px #ff00ff;\n  }\n  &::before {\n    content: "⚔️ ";\n  }\n}' },
    { title: 'Hint 4: Mixins (@mixin and @include)', body: '// Define reusable style blocks with arguments\n@mixin flex-layout($dir, $justify) {\n  display: flex;\n  flex-direction: $dir;\n  justify-content: $justify;\n  align-items: center;\n}\n\n.card-row {\n  @include flex-layout(row, space-between);\n}' },
    { title: 'Hint 5: Extend/Inheritance (@extend)', body: '/* Share a set of properties between selectors */\n.message-box {\n  border: 1px solid #ccc;\n  padding: 10px;\n  color: #333;\n}\n\n.success-box {\n  @extend .message-box;\n  border-color: green;\n  background: #e6ffe6;\n}' }
  ],
  elixir: [
    { title: 'Hint 1: Immutable Variables', body: '# All variables in Elixir are immutable\nx = 10\n# Re-binding works, but the original memory space is untouched\nx = x + 1\nIO.puts(x) # -> 11' },
    { title: 'Hint 2: Pattern Matching', body: '# The = operator is actually a match operator!\n{status, message} = {:ok, "Success"}\nIO.puts(message) # -> "Success"\n\n# Matching lists\n[head | tail] = [1, 2, 3]\n# head = 1, tail = [2, 3]' },
    { title: 'Hint 3: Pattern-Matched Functions', body: 'defmodule Math do\n  # Match on argument values!\n  def factorial(0), do: 1\n  def factorial(n) when n > 0, do: n * factorial(n - 1)\nend\nIO.puts(Math.factorial(5)) # -> 120' },
    { title: 'Hint 4: Pipe Operator (|>)', body: '# Pipe output of one function to the first parameter of the next\n" elixir compiler "\n|> String.trim()\n|> String.upcase()\n|> String.split()\n# Result: ["ELIXIR", "COMPILER"]' },
    { title: 'Hint 5: Processes & Messaging', body: '# Elixir achieves concurrency via lightweight BEAM processes\npid = spawn(fn ->\n  receive do\n    {:hello, sender} -> send(sender, :world)\n  end\nend)\n\nsend(pid, {:hello, self()})\nreceive do\n  reply -> IO.puts("Received reply: #{reply}")\nend' }
  ],
  scala: [
    { title: 'Hint 1: val vs var', body: '// val defines immutable values, var defines mutable variables\nval gravity = 9.8  // cannot reassign\nvar health = 100\nhealth = 90        // valid' },
    { title: 'Hint 2: Case Classes', body: '// Case classes are records: immutable, equatable, patterns-enabled\ncase class Hero(name: String, level: Int)\nval h1 = Hero("Scala Knight", 5)\nval h2 = h1.copy(level = 6) // copying records' },
    { title: 'Hint 3: Pattern Matching', body: 'val heroClass = "Mage"\nval attackType = heroClass match {\n  case "Warrior" => "Sword Slash"\n  case "Mage"    => "Spell Cast"\n  case _         => "Fist Punch"\n}' },
    { title: 'Hint 4: Functional Collections', body: 'val levels = List(1, 4, 8, 12, 3)\n\n// Transform and filter\nval eliteLevels = levels.filter(_ >= 5).map(_ * 10)\n// eliteLevels = List(80, 120)' },
    { title: 'Hint 5: Implicits & Extension Methods', body: '// Extend existing types with implicit classes (Scala 2)\nimplicit class StringOps(val s: String) {\n  def shout: String = s.toUpperCase + "!"\n}\nprintln("fight".shout) // "FIGHT!"' }
  ],
  perl: [
    { title: 'Hint 1: Scalars, Arrays, Hashes', body: '# Scalars start with $\nmy $name = "Perl Mage";\n\n# Arrays start with @\nmy @skills = ("Slash", "Block");\nprint $skills[0]; # Access uses $\n\n# Hashes start with %\nmy %stats = (attack => 80, defense => 65);\nprint $stats{attack};' },
    { title: 'Hint 2: Regular Expressions', body: 'my $text = "Level up: Lvl 15 reached.";\nif ($text =~ /Lvl\s+(\d+)/) {\n    my $lvl = $1;\n    print "Extracted level: $lvl\\n";\n}' },
    { title: 'Hint 3: File and Stream Operations', body: 'open(my $fh, "<", "quest.log") or die "Cannot open: $!";\nwhile (my $line = <$fh>) {\n    chomp($line);\n    print "Log: $line\\n" if $line =~ /ERROR/;\n}\nclose($fh);' },
    { title: 'Hint 4: array operations (map/grep)', body: 'my @nums = (1..10);\n\n# grep filters elements\nmy @evens = grep { $_ % 2 == 0 } @nums;\n\n# map transforms elements\nmy @squares = map { $_ * $_ } @nums;' },
    { title: 'Hint 5: Subroutines', body: 'sub calculate_xp {\n    my ($base_xp, $multiplier) = @_;\n    return $base_xp * $multiplier;\n}\nmy $earned = calculate_xp(100, 1.5);' }
  ],
  haskell: [
    { title: 'Hint 1: Functions & Types', body: '-- Haskell functions have strict type signatures\nadd :: Int -> Int -> Int\nadd x y = x + y\n\n-- Call function without parenthesis\nresult = add 5 10' },
    { title: 'Hint 2: Lazy Evaluation', body: '-- Haskell doesn\'t evaluate code until it is needed\ninfiniteOnes = 1 : infiniteOnes\n\n-- Takes first 5 ones from an infinite list!\nfiveOnes = take 5 infiniteOnes -- [1,1,1,1,1]' },
    { title: 'Hint 3: Pattern Matching', body: '-- Exhaustive equations define logical outcomes\nfactorial :: Int -> Int\nfactorial 0 = 1\nfactorial n = n * factorial (n - 1)' },
    { title: 'Hint 4: List Comprehensions', body: '-- Math-style generator set logic\nevensUpToTen = [x | x <- [1..10], x `mod` 2 == 0]\n-- Result: [2,4,6,8,10]' },
    { title: 'Hint 5: Custom Data Types', body: '-- algebraic data types (ADTs)\ndata QuestStatus = Active Int | Completed | Failed String\n\ncheckStatus :: QuestStatus -> String\ncheckStatus Completed = "Quest claimed!"\ncheckStatus (Failed reason) = "Failed: " ++ reason\ncheckStatus (Active days) = "Days left: " ++ show days' }
  ],
  mysql: [
    { title: 'Hint 1: MySQL Storage Engines', body: '-- InnoDB supports transactions & foreign keys\nCREATE TABLE users (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    name VARCHAR(50)\n) ENGINE=InnoDB;' },
    { title: 'Hint 2: Transactions', body: 'START TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT; -- or ROLLBACK if error' },
    { title: 'Hint 3: String Functions', body: 'SELECT CONCAT(first_name, \' \', last_name) AS full_name,\n       SUBSTRING(bio, 1, 50) AS short_bio,\n       REPLACE(title, \'Bug\', \'Feature\')\nFROM profiles;' },
    { title: 'Hint 4: Limit & Offset', body: '-- Retrieve items starting from row 10 (11th item), limit to 5\nSELECT * FROM inventory\nORDER BY power DESC\nLIMIT 5 OFFSET 10;' },
    { title: 'Hint 5: MySQL Variables', body: 'SET @max_level = 100;\nSELECT * FROM heroes WHERE level >= @max_level;' }
  ],
  sqlite: [
    { title: 'Hint 1: Dynamic Typing', body: '-- SQLite allows any type in any column (except INTEGER PRIMARY KEY)\nCREATE TABLE items (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    val TEXT\n);' },
    { title: 'Hint 2: SQLite Special Commands', body: '-- Special shell dot commands\n.tables       -- List all tables\n.schema items -- View creation SQL\n.mode csv     -- Set output style' },
    { title: 'Hint 3: Auto-increment primary key', body: 'CREATE TABLE logs (\n    id INTEGER PRIMARY KEY AUTOINCREMENT, -- SQLite automatically handles sequences\n    msg TEXT\n);' },
    { title: 'Hint 4: Date & Time functions', body: 'INSERT INTO logs (msg) VALUES (\'Quest solved\');\nSELECT datetime(\'now\');\nSELECT date(\'now\', \'-1 day\');' },
    { title: 'Hint 5: SQLite LIMIT and rowid', body: 'SELECT rowid, * FROM items LIMIT 10;' }
  ],
  cassandra: [
    { title: 'Hint 1: Keyspaces & Replication', body: '-- Keyspace is the equivalent of a Database schema\nCREATE KEYSPACE codequest_keyspace\nWITH replication = {\n  \'class\': \'SimpleStrategy\',\n  \'replication_factor\': 1\n};' },
    { title: 'Hint 2: Primary Keys (Partition + Clustering)', body: 'CREATE TABLE user_messages (\n    user_id uuid,\n    message_time timestamp,\n    body text,\n    PRIMARY KEY (user_id, message_time) -- user_id is Partition key, message_time is Clustering key\n);' },
    { title: 'Hint 3: CQL Query Constraints', body: '-- Query MUST filter on partition key, cannot join tables\nSELECT * FROM user_messages\nWHERE user_id = 550e8400-e29b-41d4-a716-446655440000\nORDER BY message_time DESC;' },
    { title: 'Hint 4: Collections in Cassandra', body: 'ALTER TABLE heroes ADD phone_numbers set<text>;\nUPDATE heroes SET phone_numbers = phone_numbers + {\'555-0199\'} WHERE id = 1;' },
    { title: 'Hint 5: TTL (Time To Live)', body: '-- Auto-delete message after 2 hours (7200 seconds)\nINSERT INTO user_messages (user_id, message_time, body)\nVALUES (uuid(), toTimestamp(now()), \'Temp message\')\nUSING TTL 7200;' }
  ],
  neo4j: [
    { title: 'Hint 1: Nodes and Relationships', body: '// Create Node: (label:Label {key: val})\nCREATE (h:Hero {name: "Galahad"})\nCREATE (w:Weapon {type: "Sword"})\n\n// Create Relationship: (node)-[:REL]->(node)\nCREATE (h)-[:EQUIPPED_WITH]->(w)' },
    { title: 'Hint 2: Match & Return', body: '// Find nodes and return their fields\nMATCH (h:Hero)\nWHERE h.name = "Galahad"\nRETURN h.name, h.level;' },
    { title: 'Hint 3: Graph Traversal', body: '// Traverse relationships easily\nMATCH (h:Hero)-[:MEMBER_OF]->(g:Guild)-[:ALLIED_TO]->(o:Guild)\nRETURN h.name, o.name;' },
    { title: 'Hint 4: Merge (Create if not exists)', body: '// Atomically update or insert\nMERGE (h:Hero {name: "Arthur"})\nON CREATE SET h.level = 1\nON MATCH SET h.level = h.level + 1\nRETURN h;' },
    { title: 'Hint 5: Shortest Path Queries', body: '// Find connections between nodes in network\nMATCH p=shortestPath((h:Hero {name:"Arthur"})-[:FRIEND_OF*..5]-(m:Hero {name:"Merlin"}))\nRETURN p;' }
  ],
  react: [
    { title: 'Hint 1: JSX Syntax', body: '// JSX allows writing HTML tags in JS. Tags must close, and class is className.\nconst element = (\n  <div className="card">\n    <h2>React Card</h2>\n  </div>\n);' },
    { title: 'Hint 2: useState Hook', body: '// Manage component state dynamically\nimport React, { useState } from "react";\n\nfunction Component() {\n  const [val, setVal] = useState("init");\n  return <button onClick={() => setVal("updated")}>{val}</button>;\n}' },
    { title: 'Hint 3: useEffect Hook', body: '// Handle side-effects (APIs, subscriptions, DOM tweaks)\nimport React, { useEffect } from "react";\n\nuseEffect(() => {\n  console.log("Component mounted");\n  return () => console.log("Component unmounted");\n}, []); // Empty array = runs once' },
    { title: 'Hint 4: Props Pass-Through', body: '// Pass data down from parent to child components\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n\n// Usage: <Welcome name="React Warrior" />' },
    { title: 'Hint 5: Keys in Lists', body: '// Always provide a unique "key" prop to list elements for rendering optimization\nconst listItems = items.map((item) =>\n  <li key={item.id}>{item.name}</li>\n);' }
  ],
  angular: [
    { title: 'Hint 1: Component Structure', body: '// Components pair TypeScript classes with HTML templates\nimport { Component } from "@angular/core";\n\n@Component({\n  selector: "app-root",\n  template: "<h1>{{title}}</h1>"\n})\nexport class AppComponent {\n  title = "Angular Quest";\n}' },
    { title: 'Hint 2: Property & Event Binding', body: '<!-- Property Binding [] binds values. Event Binding () binds methods -->\n<input [value]="heroName">\n<button (click)="saveHero()">Save</button>' },
    { title: 'Hint 3: Structural Directives', body: '<!-- *ngIf displays elements conditionally. *ngFor loops collections -->\n<div *ngIf="isPremium">Premium Account</div>\n<ul>\n  <li *ngFor="let item of inventory">{{ item }}</li>\n</ul>' },
    { title: 'Hint 4: Input and Output', body: '// Share data between parent and child components\nimport { Input, Output, EventEmitter } from "@angular/core";\n\n@Input() name: string = "";\n@Output() onLeveledUp = new EventEmitter<number>();' },
    { title: 'Hint 5: Dependency Injection', body: '// Services are injected into constructor declarations\nimport { HeroService } from "./hero.service";\n\nconstructor(private heroService: HeroService) {\n  this.heroes = heroService.getHeroes();\n}' }
  ],
  vue: [
    { title: 'Hint 1: Single File Component', body: '<!-- Vue SFC contains template, script, and scoped styling -->\n<template>\n  <button @click="count++">{{ count }}</button>\n</template>\n<script>\nexport default { data() { return { count: 0 } } }\n</script>' },
    { title: 'Hint 2: Data Options API', body: '// Data properties must return a reactive function mapping values\ndata() {\n  return {\n    playerName: "Vue Mage",\n    health: 100\n  };\n}' },
    { title: 'Hint 3: Methods and Computed', body: '// Methods are functions; Computed are cached calculations\ncomputed: {\n  isAlive() { return this.health > 0; }\n},\nmethods: {\n  heal() { this.health = Math.min(100, this.health + 10); }\n}' },
    { title: 'Hint 4: Vue Directives', body: '<!-- v-bind or : binds properties. v-on or @ binds actions. v-model handles 2-way binding -->\n<img :src="avatarUrl">\n<button @click="attack">Attack</button>\n<input v-model="username">' },
    { title: 'Hint 5: Conditional & List Rendering', body: '<!-- Vue control statements -->\n<p v-if="health <= 0">Game Over</p>\n<ul>\n  <li v-for="(item, index) in bag" :key="index">{{ item }}</li>\n</ul>' }
  ],
  svelte: [
    { title: 'Hint 1: Reactive Declarations', body: '<!-- Svelte handles state implicitly. Reassign variables to trigger updates -->\n<script>\n  let count = 0;\n  // Reactive variable (auto updates when count changes)\n  $: doubled = count * 2;\n</script>\n<button on:click={() => count++}>{doubled}</button>' },
    { title: 'Hint 2: Two-way Binding', body: '<!-- Bind variables directly to input values -->\n<script>\n  let username = "";\n</script>\n<input bind:value={username}>\n<p>Hello {username}!</p>' },
    { title: 'Hint 3: Logic Blocks', body: '<!-- Svelte logic loops in HTML markup -->\n{#if count > 10}\n  <p>Epic level!</p>\n{:else}\n  <p>Keep grinding!</p>\n{/if}' },
    { title: 'Hint 4: Loops and Lists', body: '<!-- Svelte list generator syntax -->\n<ul>\n  {#each items as item (item.id)}\n    <li>{item.name}</li>\n  {/each}\n</ul>' },
    { title: 'Hint 5: Event Modifiers', body: '<!-- Modify events inline inside HTML -->\n<form on:submit|preventDefault={submitForm}>\n  <button type="submit">Submit</button>\n</form>' }
  ],
  nextjs: [
    { title: 'Hint 1: Pages and Routing', body: '// Next.js handles routing dynamically through pages file structures\n// pages/about.js maps to /about\nexport default function About() {\n  return <h1>About Next.js Portal</h1>;\n}' },
    { title: 'Hint 2: Data Fetching Options', body: '// SSR (Server Side Rendering) or SSG (Static Site Generation)\nexport async function getServerSideProps(context) {\n  // Runs on server for every request\n  return { props: { data: "Loaded" } };\n}' },
    { title: 'Hint 3: Link Component', body: '// Enable client-side transition navigation\nimport Link from "next/link";\n\n<Link href="/dashboard">\n  <a>Dashboard</a>\n</Link>' },
    { title: 'Hint 4: Metadata in Head', body: '// Custom title and description meta per page\nimport Head from "next/head";\n\n<Head>\n  <title>Custom Page Title</title>\n  <meta name="description" content="Meta descriptions SEO">\n</Head>' },
    { title: 'Hint 5: Custom APIs', body: '// Write backend serverless endpoints directly inside pages/api/\n// pages/api/status.js\nexport default function handler(req, res) {\n  res.status(200).json({ status: "active" });\n}' }
  ],
  bootstrap: [
    { title: 'Hint 1: Grid System', body: '<!-- 12-column responsive layout grids -->\n<div class="row">\n  <div class="col-md-8">Main content area (8 columns wide)</div>\n  <div class="col-md-4">Sidebar area (4 columns wide)</div>\n</div>' },
    { title: 'Hint 2: Padding & Margins', body: '<!-- Utility class formats: {property}{side}-{size} -->\n<!-- m = margin, p = padding, y = vertical, x = horizontal -->\n<div class="pt-3 mb-5 px-2">\n  Styled spacing content\n</div>' },
    { title: 'Hint 3: Responsive Display', body: '<!-- Hide or show elements based on window width -->\n<div class="d-none d-md-block">Visible on desktops only</div>\n<div class="d-block d-md-none">Visible on mobile devices only</div>' },
    { title: 'Hint 4: Colors & Backgrounds', body: '<!-- Standard colors: primary, secondary, success, danger, warning, info -->\n<button class="btn btn-danger text-white">Danger Alert</button>\n<div class="bg-light text-dark p-3">Info Panel</div>' },
    { title: 'Hint 5: Modal & Dropdowns', body: '<!-- Use data attributes to trigger JS interactions without writing JS -->\n<button type="button" data-bs-toggle="modal" data-bs-target="#settingsModal">\n  Open Settings\n</button>' }
  ],
  tailwind: [
    { title: 'Hint 1: Flex and Alignment', body: '<!-- Style layouts quickly using utility descriptors -->\n<div class="flex items-center justify-between gap-4">\n  <div>Left side</div>\n  <div>Right side</div>\n</div>' },
    { title: 'Hint 2: Custom Spacing', body: '<!-- Margin (m-), Padding (p-), Height (h-), Width (w-) -->\n<!-- Numbers indicate relative sizes: w-4 = 1rem/16px -->\n<div class="w-64 h-32 p-4 mt-6 bg-slate-800">\n  Custom box\n</div>' },
    { title: 'Hint 3: Responsive Breakpoints', body: '<!-- Breakpoints prefix overrides rules: sm:, md:, lg:, xl: -->\n<div class="w-full md:w-1/2 lg:w-1/3 bg-slate-500">\n  Responsive width card\n</div>' },
    { title: 'Hint 4: Hover and Active States', body: '<!-- Prepend state keyword next to the property styling -->\n<button class="bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition-all text-black font-semibold py-2 px-4">\n  Submit\n</button>' },
    { title: 'Hint 5: Arbitrary Values', body: '<!-- Enclose arbitrary units inside square brackets -->\n<div class="w-[375px] h-[80vh] bg-[#121214] text-[18px]">\n  Custom size element\n</div>' }
  ],
  nodejs: [
    { title: 'Hint 1: CommonJS Modules', body: '// Import dependencies using require, export using module.exports\nconst fs = require("fs");\nconst { join } = require("path");\n\nmodule.exports = { fileLoader };' },
    { title: 'Hint 2: Filesystem operations', body: '// Read and write files asynchronously\nconst fs = require("fs");\n\nfs.readFile("quest.json", "utf8", (err, data) => {\n  if (err) throw err;\n  console.log("Content:", JSON.parse(data));\n});' },
    { title: 'Hint 3: Buffers', body: '// Node handles binary data streams using Buffer structures\nconst buf = Buffer.from("CodeQuest", "utf-8");\nconsole.log(buf.toString("hex")); // -> 436f64655175657374\nconsole.log(buf.length); // -> 9' },
    { title: 'Hint 4: Process Information', body: '// Access process arguments, memory logs, and environment variables\nconst port = process.env.PORT || 3000;\nconst args = process.argv.slice(2);\nconsole.log("Arguments passed:", args);' },
    { title: 'Hint 5: Event Emitter', body: '// Build async event loops inside Node engines\nconst EventEmitter = require("events");\nconst myEmitter = new EventEmitter();\n\nmyEmitter.on("levelUp", (lvl) => console.log("Ranked:", lvl));\nmyEmitter.emit("levelUp", 15);' }
  ],
  express: [
    { title: 'Hint 1: Routing Map', body: '// Express defines methods (get, post, put, delete) mapped to URL patterns\napp.get("/heroes/:id", (req, res) => {\n  const heroId = req.params.id;\n  res.send(`Hero identifier: ${heroId}`);\n});' },
    { title: 'Hint 2: Middleware pipeline', body: '// Middleware executes sequentially before the final endpoint routing\napp.use(express.json()); // Parses incoming JSON payloads\napp.use((req, res, next) => {\n  console.log("IP Logger:", req.ip);\n  next(); // Mandatory to pass along execution\n});' },
    { title: 'Hint 3: Request parameters', body: '// Read arguments from query limits or body properties\n// URL: /api/search?class=Warrior\nconst searchClass = req.query.class;\nconst requestPayload = req.body;' },
    { title: 'Hint 4: Express Router', body: '// Organize routers inside modular, sub-route files\nconst router = express.Router();\nrouter.get("/subpath", (req, res) => res.send("Active"));\n\n// Mount router\napp.use("/main", router);' },
    { title: 'Hint 5: Error Handlers', body: '// Error middlewares declare exactly 4 arguments: (err, req, res, next)\napp.use((err, req, res, next) => {\n  console.error("API Crash log:", err.stack);\n  res.status(500).json({ error: "Something broke!" });\n});' }
  ],
  fastify: [
    { title: 'Hint 1: JSON Schema Validation', body: '// Fastify compiles validation structures for fast request checks\nfastify.get("/user/:id", {\n  schema: {\n    params: {\n      type: "object",\n      properties: { id: { type: "integer" } }\n    }\n  }\n}, async (request, reply) => {\n  return { userId: request.params.id };\n});' },
    { title: 'Hint 2: Plugin Architecture', body: '// Declare modules inside plugins. Everything is a plugin!\nfastify.register(require("./db-plugin"));' },
    { title: 'Hint 3: Async handlers', body: '// Returning values inside async functions automatically sends response data\nfastify.get("/", async (request, reply) => {\n  return { status: "active" }; // no reply.send needed\n});' },
    { title: 'Hint 4: Hooks Lifecycle', body: '// Execute actions on specific execution lifecycles\nfastify.addHook("onRequest", async (request, reply) => {\n  // Run authentication checks here\n});' },
    { title: 'Hint 5: Output Serializer Optimization', body: '// Compile schema templates for response data parsing to optimize performance\nconst schema = { response: { 200: { type: "object", properties: { success: { type: "boolean" } } } } };' }
  ],
  django: [
    { title: 'Hint 1: MTV Architecture', body: '# Model (data mapping), Template (HTML display), View (logic controller)\n# views.py\nfrom django.shortcuts import render\n\ndef home_view(request):\n    return render(request, "index.html", {"title": "Django Portal"})' },
    { title: 'Hint 2: Django ORM Queries', body: '# Query the database using python object variables\nfrom .models import Hero\n\n# Get all record list\nwarriors = Hero.objects.filter(class_type="Warrior")\n# Get single element\ntop_hero = Hero.objects.get(id=1)' },
    { title: 'Hint 3: URL dispatcher', body: '# urls.py binds endpoints to view controllers\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path("hero/<int:hero_id>/", views.get_hero_profile),\n]' },
    { title: 'Hint 4: HTML Template Variables', body: '<!-- Template tags loop or display values in index.html -->\n<h2>Welcome {{ hero.name }}</h2>\n<ul>\n  {% for skill in skills %}\n    <li>{{ skill }}</li>\n  {% endfor %}\n</ul>' },
    { title: 'Hint 5: Admin Panel registration', body: '# Register your models to auto-create dashboards in Django Admin\n# admin.py\nfrom django.contrib import admin\nfrom .models import Hero\n\nadmin.site.register(Hero)' }
  ],
  flask: [
    { title: 'Hint 1: App Instance and Routes', body: '# Declare application and routes using python decorators\nfrom flask import Flask\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return "Welcome to Flask server"' },
    { title: 'Hint 2: Parsing JSON requests', body: '# Fetch properties from JSON request bodies\nfrom flask import request, jsonify\n\n@app.route("/api/log", methods=["POST"])\ndef log_data():\n    req_data = request.get_json()\n    return jsonify({"received": req_data["key"]})' },
    { title: 'Hint 3: Rendering Templates', body: '# Render HTML templates with Jinja2 placeholders\nfrom flask import render_template\n\n@app.route("/dashboard")\ndef dashboard():\n    return render_template("dashboard.html", username="Flask Mage")' },
    { title: 'Hint 4: Request context lifecycle', body: '# Execute code blocks before or after requests\n@app.before_request\ndef before_request_hook():\n    print("New request incoming")' },
    { title: 'Hint 5: URL Parameters redirection', body: '# Path parameters conversion\n@app.route("/user/<int:user_id>")\ndef get_user(user_id):\n    return f"User ID integer: {user_id}"' }
  ],
  fastapi: [
    { title: 'Hint 1: API Route and Async Decorators', body: '# FastAPI leverages async python engines\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get("/")\nasync def index():\n    return {"message": "Async endpoint"}' },
    { title: 'Hint 2: Type validation with Pydantic', body: '# Declare incoming schemas. Types are checked at runtime!\nfrom pydantic import BaseModel\n\nclass Payload(BaseModel):\n    title: str\n    score: float\n    tags: list[str] = []' },
    { title: 'Hint 3: Swagger documentation', body: '# FastAPI auto-creates interactive API docs at /docs and /redoc!\n# Navigate to http://localhost:8000/docs in your browser to test endpoints.' },
    { title: 'Hint 4: Query and Path parameters', body: '# FastAPI infers parameters based on function declarations\n@app.get("/items/{item_id}")\nasync def read_item(item_id: int, q: str | None = None):\n    return {"id": item_id, "query_arg": q}' },
    { title: 'Hint 5: Dependency Injection', body: '# Set route dependency actions (e.g. database connections, authorization)\nfrom fastapi import Depends\n\nasync def check_key(token: str):\n    if token != "secret": raise HTTPException(status_code=400)\n\n@app.get("/secure")\nasync def secure_endpoint(auth = Depends(check_key)):\n    return {"data": "Secure info"}' }
  ],
  springboot: [
    { title: 'Hint 1: Annotations', body: '// Spring Boot relies on Java annotations to configure architecture\n@RestController // Tells Spring this class handles HTTP REST calls\n@RequestMapping("/api") // Mount path endpoint prefix' },
    { title: 'Hint 2: REST Endpoint mappings', body: '// Maps HTTP verbs to logic methods\n@GetMapping("/users/{id}")\npublic User getUser(@PathVariable Long id) {\n    return userService.findUser(id);\n}' },
    { title: 'Hint 3: Dependency Injection (@Autowired)', body: '// Spring manages component instances and injects them automatically\n@Autowired\nprivate HeroService heroService; // Auto instantiated and linked' },
    { title: 'Hint 4: Spring Configuration properties', body: '# application.properties file configures ports and databases\nserver.port=8080\nspring.datasource.url=jdbc:mysql://localhost:3306/db' },
    { title: 'Hint 5: Entity and JPA Repository', body: '// Map database schemas directly to Java classes using Hibernate ORM\n@Entity\npublic class Hero { @Id @GeneratedValue Long id; String name; }\ninterface HeroRepository extends JpaRepository<Hero, Long> {}' }
  ],
  aspnetcore: [
    { title: 'Hint 1: Controllers structure', body: '// Controllers subclass ControllerBase, declaring routing templates\n[ApiController]\n[Route("api/[controller]")]\npublic class GameController : ControllerBase {\n    // Endpoints go here\n}' },
    { title: 'Hint 2: HTTP Action verbs', body: '// Maps requests to class actions\n[HttpGet("{id}")]\npublic ActionResult<string> GetProgress(int id) {\n    return Ok($"User data: {id}"); // Returns HTTP 200\n}' },
    { title: 'Hint 3: Dependency Injection', body: '// Register services in Program.cs, then inject in constructors\n// Program.cs: builder.Services.AddScoped<IGameDb, SqlDb>();\npublic GameController(IGameDb db) {\n    _db = db;\n}' },
    { title: 'Hint 4: Data Validation attributes', body: '// Add structural validation to data transfer objects (DTOs)\npublic class LoginDto {\n    [Required] [EmailAddress]\n    public string Email { get; set; }\n}' },
    { title: 'Hint 5: Entity Framework Core', body: '// EF Core queries DB tables using C# LINQ syntax structures\nvar warriors = await _context.Heroes\n    .Where(h => h.Class == "Warrior")\n    .ToListAsync();' }
  ],
  laravel: [
    { title: 'Hint 1: Routing maps', body: '// routes/web.php or routes/api.php handles mappings\nuse App\\Http\\Controllers\\HeroController;\n\nRoute::get(\'/hero/{id}\', [HeroController::class, \'show\']);' },
    { title: 'Hint 2: Eloquent ORM Models', body: '// Laravel\'s active record DB mapping models\nuse App\\Models\\Hero;\n\n// Fetch list\n$heroes = Hero::where(\'level\', \'>\', 5)->get();\n// Save new\n$hero = new Hero; $hero->name = "Lar Mage"; $hero->save();' },
    { title: 'Hint 3: Artisan CLI', body: '# Laravel command-line tool for migrations, servers, and controllers\nphp artisan serve              # Start dev server\nphp artisan make:controller Api # Create controller class' },
    { title: 'Hint 4: Database Migrations', body: '// Define DB structure using migrations\nSchema::create(\'heroes\', function (Blueprint $table) {\n    $table->id();\n    $table->string(\'name\');\n    $table->timestamps();\n});' },
    { title: 'Hint 5: Blade Templates', body: '<!-- Blade variables format -->\n<h1>Welcome, {{ $username }}</h1>\n@if ($level > 10)\n    <p>Premium Champion!</p>\n@endif' }
  ],
  codeigniter: [
    { title: 'Hint 1: Lightweight Controllers', body: '// Subclass BaseController to declare routes\nnamespace App\\Controllers;\n\nclass Main extends BaseController {\n    public function index() {\n        return view(\'welcome_message\');\n    }\n}' },
    { title: 'Hint 2: Query Builder', body: '// CodeIgniter\'s secure SQL builder syntax\n$db = \\Config\\Database::connect();\n$builder = $db->table(\'heroes\');\n$query   = $builder->getWhere([\'level\' => 5]);\n$results = $query->getResult();' },
    { title: 'Hint 3: Custom Routing rules', body: '// Set routing structures in Config/Routes.php\n$routes->get(\'api/users\', \'Users::index\');\n$routes->post(\'api/user/create\', \'Users::create\');' },
    { title: 'Hint 4: Models mapping', body: '// Subclass Model to handle validation and queries automatically\nnamespace App\\Models;\nuse CodeIgniter\\Model;\n\nclass HeroModel extends Model {\n    protected $table = \'heroes\';\n    protected $allowedFields = [\'name\', \'level\'];\n}' },
    { title: 'Hint 5: Helper Functions', body: '// Load helper files for URL, string, or filesystem formatting\nhelper(\'url\');\necho base_url(\'assets/css/style.css\');' }
  ],
  rails: [
    { title: 'Hint 1: Rails CLI Scaffolding', body: '# Rails automates structure generation\nrails new codequest-app   # Create project folder\nrails generate model Hero # Generate models/migrations\nrails db:migrate          # Execute migrations' },
    { title: 'Hint 2: Active Record Querying', body: '# Query records instantly using Ruby objects\n# Find record\nhero = Hero.find(1)\n# Filter records\nelite = Hero.where("level >= ?", 10).order(xp: :desc)' },
    { title: 'Hint 3: Strong Controllers Params', body: '# Rails blocks unauthorized fields (mass assignment protection)\ndef hero_params\n  params.require(:hero).permit(:name, :class_type)\nend' },
    { title: 'Hint 4: Embedded Ruby (ERB)', body: '<!-- Display data dynamically in views templates -->\n<h1>Hero profile: <%= @hero.name %></h1>\n<% if @hero.level >= 5 %>\n  <p>Veteran Player</p>\n<% end %>' },
    { title: 'Hint 5: MVC Layout pipelines', body: '# Controllers route requests, load models, and assign instance variables (@var)\n# Active record relationships are declared inside models:\nclass Hero < ApplicationRecord\n  has_many :items\nend' }
  ],
  gin: [
    { title: 'Hint 1: Route Setup', body: '// Declare route and return variables inside context\npackage main\nimport "github.com/gin-gonic/gin"\n\nfunc main() {\n  r := gin.Default()\n  r.GET("/api", func(c *gin.Context) {\n    c.JSON(200, gin.H{"status": "ok"})\n  })\n  r.Run()\n}' },
    { title: 'Hint 2: Bind request payloads', body: '// Unmarshal request JSON structures directly to Go structs\ntype Input struct {\n  Name string `json:"name" binding:"required"`\n}\n\n// Inside context handler:\nvar data Input\nif err := c.ShouldBindJSON(&data); err != nil { return }' },
    { title: 'Hint 3: Route Groups', body: '// Group paths together and apply shared middleware routers\napi := r.Group("/api")\n{\n  api.GET("/users", getUsers)\n  api.POST("/user", createUser)\n}' },
    { title: 'Hint 4: Context Headers', body: '// Access request headers, cookies, and parameters easily\nauthHeader := c.GetHeader("Authorization")\nparamId := c.Param("id")' },
    { title: 'Hint 5: Production Mode', body: '// Set production environment to disable verbose debugging logs\nimport "github.com/gin-gonic/gin"\n\ngin.SetMode(gin.ReleaseMode)' }
  ],
  echo: [
    { title: 'Hint 1: Echo Instances', body: '// Echo setup and simple route handlers\npackage main\nimport (\n  "github.com/labstack/echo/v4"\n  "net/http"\n)\nfunc main() {\n  e := echo.New()\n  e.GET("/", func(c echo.Context) error {\n    return c.String(http.StatusOK, "Echo server active")\n  })\n  e.Start(":8080")\n}' },
    { title: 'Hint 2: Request Binding', body: '// Bind query parameters, URL path variables, and body json to structures\ntype User struct {\n  Name  string `json:"name"`\n  Email string `json:"email"`\n}\n// Inside handler: u := new(User); c.Bind(u)' },
    { title: 'Hint 3: Built-in Middleware', body: '// Echo includes useful middlewares like Logger, Recover, and CORS\nimport "github.com/labstack/echo/v4/middleware"\n\ne.Use(middleware.Logger())\ne.Use(middleware.Recover())' },
    { title: 'Hint 4: Context Response types', body: '// Return varying response formats easily\nreturn c.JSON(http.StatusOK, map[string]string{"key": "val"})\nreturn c.HTML(http.StatusOK, "<h1>Title</h1>")\nreturn c.NoContent(http.StatusNoContent)' },
    { title: 'Hint 5: Echo Grouping Routing', body: '// Group endpoints together under path prefixes\nadminGroup := e.Group("/admin")\nadminGroup.Use(adminAuthMiddleware)\nadminGroup.GET("/panel", showPanel)' }
  ],
  actix: [
    { title: 'Hint 1: Async Handlers', body: '// Actix handlers return impl Responder with HTTP statuses\nuse actix_web::{get, HttpResponse, Responder};\n\n#[get("/api")]\nasync fn get_api() -> impl Responder {\n    HttpResponse::Ok().body("Actix Engine active")\n}' },
    { title: 'Hint 2: Server initialization', body: '// Multi-threaded server builder structure\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    HttpServer::new(|| App::new().service(get_api))\n        .bind(("127.0.0.1", 8080))?\n        .run()\n        .await\n}' },
    { title: 'Hint 3: Path Parameters Extractor', body: '// Extract values from URL route patterns\nuse actix_web::web;\n\n// Route: /api/hero/{id}\n#[get("/hero/{id}")]\nasync fn get_hero(id: web::Path<u32>) -> impl Responder {\n    format!("Hero ID: {}", id.into_inner())\n}' },
    { title: 'Hint 4: JSON Payload Parsing', body: '// Automatically validate and extract JSON payloads using Serde structs\nuse serde::Deserialize;\n\n#[derive(Deserialize)]\nstruct HeroData { name: String, level: u32 }\n\n#[post("/hero")]\nasync fn save_hero(info: web::Json<HeroData>) -> impl Responder { "Saved" }' },
    { title: 'Hint 5: Shared Application State', body: '// Share configurations or db connection pools across threads using AppState\nstruct AppState { db_connection: String }\n\n// Register:\n// App::new().app_data(web::Data::new(AppState { db_connection: ... }))' }
  ],
  rocket: [
    { title: 'Hint 1: Rocket Launch macro', body: '// Launch engine using #[launch] or #[rocket::main]\n#[macro_use] extern crate rocket;\n\n#[launch]\nfn rocket() -> _ {\n    rocket::build().mount("/", routes![index])\n}' },
    { title: 'Hint 2: Route handlers parameters', body: '// Define request mapping macro parameters above functions\n#[get("/welcome/<name>/<age>")]\nfn welcome(name: &str, age: u8) -> String {\n    format!("Welcome {}, age {}!", name, age)\n}' },
    { title: 'Hint 3: Type-safe JSON serialization', body: '// Use rocket::serde::json::Json for payload validations\nuse rocket::serde::{Serialize, json::Json};\n\n#[derive(Serialize)]\nstruct ResponseData { success: bool }\n\n#[get("/api")]\nfn get_data() -> Json<ResponseData> { Json(ResponseData { success: true }) }' },
    { title: 'Hint 4: Request Guards', body: '// Enforce permissions, api keys, or headers dynamically\n// Implement FromRequest trait to authorize users prior to endpoint routing' },
    { title: 'Hint 5: Fairings (Rocket middleware)', body: '// Custom actions run during request/response execution pipelines\n// Used for CORS headers, db migrations, or execution logging.' }
  ],
  ktor: [
    { title: 'Hint 1: Ktor netty setup', body: '// Configure Netty engine server inside main functions\nimport io.ktor.server.engine.*\nimport io.ktor.server.netty.*\n\nfun main() {\n    embeddedServer(Netty, port = 8080) {\n        // Configure routing plugins\n    }.start(wait = true)\n}' },
    { title: 'Hint 2: Routing DSL', body: '// Map routing patterns inside DSL blocks\nrouting {\n    get("/api/status") {\n        call.respondText("Server online")\n    }\n}' },
    { title: 'Hint 3: Content Negotiation (JSON)', body: '// Register Jackson or KotlinX serialization plugins for JSON support\ninstall(ContentNegotiation) {\n    json() // Parses request and response models automatically\n}' },
    { title: 'Hint 4: Receive payloads', body: '// Receive structures directly inside controller routes\npost("/api/user") {\n    val data = call.receive<UserDataClass>()\n    call.respond(HttpStatusCode.Created, data)\n}' },
    { title: 'Hint 5: Coroutines async operations', body: '// Ktor leverages non-blocking Kotlin coroutines internally\nget("/api/async") {\n    val data = fetchDatabaseResultAsync() // suspend function\n    call.respond(data)\n}' }
  ],
  playframework: [
    { title: 'Hint 1: MVC Routing table', body: '# Play uses a separate routes file mapping URLs to class methods\n# conf/routes\nGET     /api/status     controllers.ApiController.getStatus' },
    { title: 'Hint 2: Scala controllers logic', body: '// Controllers return Action blocks wrapping HTTP results\nclass ApiController extends BaseController {\n    def getStatus = Action { Ok("Play Framework online") }\n}' },
    { title: 'Hint 3: JSON response formats', body: '// Generate JSON responses natively using Play JSON library\nimport play.api.libs.json._\n\nval data = Json.obj("status" -> "active", "xp" -> 150)\nOk(data) // Returns application/json response header' },
    { title: 'Hint 4: Play Async Controllers', body: '// Process requests inside Futures to optimize thread pools\ndef index = Action.async { \n    val futureResult = fetchRemoteServiceData()\n    futureResult.map(res => Ok(res))\n}' },
    { title: 'Hint 5: Dependency Injection', body: '// Play manages dependencies using Guice framework injection\n@Singleton\nclass Service @Inject()(ws: WSClient) { /* ... */ }' }
  ],
  oracle: [
    { title: 'Hint 1: PL/SQL block structure', body: '-- Code is written in blocks: Declare, Begin, Exception, End\nDECLARE\n  v_count NUMBER := 0;\nBEGIN\n  SELECT COUNT(*) INTO v_count FROM heroes;\n  DBMS_OUTPUT.PUT_LINE(\'Total heroes: \' || v_count);\nEND;' },
    { title: 'Hint 2: Oracle cursor variables', body: '-- Fetch multiple records sequentially using cursors\nDECLARE\n  CURSOR c_heroes IS SELECT name, level FROM heroes;\n  v_name VARCHAR2(100);\n  v_lvl  NUMBER;\nBEGIN\n  OPEN c_heroes;\n  LOOP\n    FETCH c_heroes INTO v_name, v_lvl;\n    EXIT WHEN c_heroes%NOTFOUND;\n    -- logic\n  END LOOP;\n  CLOSE c_heroes;\nEND;' },
    { title: 'Hint 3: Exception management', body: '-- Oracle database exception trapping\nBEGIN\n  -- database action\nEXCEPTION\n  WHEN NO_DATA_FOUND THEN\n    DBMS_OUTPUT.PUT_LINE(\'Record missing\');\n  WHEN OTHERS THEN\n    DBMS_OUTPUT.PUT_LINE(\'System error happened\');\nEND;' },
    { title: 'Hint 4: PL/SQL Sequences', body: '-- Generate unique auto-increment keys in legacy Oracle DB\nCREATE SEQUENCE seq_hero_id START WITH 1 INCREMENT BY 1;\nINSERT INTO heroes (id, name) VALUES (seq_hero_id.NEXTVAL, \'Ora Knight\');' },
    { title: 'Hint 5: Procedures and Functions', body: '// Define database procedures to build modular SQL APIs\nCREATE OR REPLACE PROCEDURE promote_hero(p_id IN NUMBER) IS\nBEGIN\n  UPDATE heroes SET level = level + 1 WHERE id = p_id;\nEND;' }
  ],
  mssql: [
    { title: 'Hint 1: T-SQL Stored Procedures', body: '-- Compile procedural SQL actions inside Stored Procedures\nCREATE PROCEDURE GetEliteHeroes\n    @MinLevel INT\nAS\nBEGIN\n    SELECT Name, Level FROM Heroes WHERE Level >= @MinLevel;\nEND;' },
    { title: 'Hint 2: Transactions error handling', body: '-- Wrap transactions in TRY-CATCH constructs\nBEGIN TRANSACTION;\nBEGIN TRY\n    -- update database queries\n    COMMIT TRANSACTION;\nEND TRY\nBEGIN CATCH\n    ROLLBACK TRANSACTION;\n    THROW;\nEND CATCH;' },
    { title: 'Hint 3: SQL Server temp tables', body: '-- Store transient query results inside temp tables (#)\nSELECT Name, Level INTO #TempHeroes FROM Heroes WHERE Class = \'Mage\';\nSELECT * FROM #TempHeroes;\nDROP TABLE #TempHeroes;' },
    { title: 'Hint 4: MSSQL Output parameter', body: '-- Fetch columns immediately from modified rows (like Postgres RETURNING)\nINSERT INTO Logs (Message)\nOUTPUT inserted.LogId, inserted.CreatedAt\nVALUES (\'Dungeon solved\');' },
    { title: 'Hint 5: Common Table Expressions (CTE)', body: '-- Build readable query abstractions recursively using WITH\nWITH RankedHeroes AS (\n    SELECT Name, XP, ROW_NUMBER() OVER (ORDER BY XP DESC) as Rank\n    FROM Heroes\n)\nSELECT * FROM RankedHeroes WHERE Rank <= 5;' }
  ],
  firebase: [
    { title: 'Hint 1: Firebase Node structures', body: '// Realtime DB stores records as standard JSON tree nodes\n// database ref: /players/101/name\nconst nameRef = ref(db, \'players/101/name\');' },
    { title: 'Hint 2: Set vs Update', body: '// set() overwrites the target path; update() modifies specified fields only\nset(ref(db, \'players/101\'), { name: "Bob", class: "Warrior" }); // Overwrites all fields!\nupdate(ref(db, \'players/101\'), { class: "Mage" }); // Updates class, name remains Bob' },
    { title: 'Hint 3: Read values asynchronously', body: '// Listen to values dynamically. Callback triggers on database modifications!\nimport { ref, onValue } from "firebase/database";\n\nonValue(ref(db, \'players/101\'), (snapshot) => {\n  console.log("Player data:", snapshot.val());\n});' },
    { title: 'Hint 4: Generate unique keys (push)', body: '// Add items to a list using auto-generated unique ID keys\nimport { ref, push } from "firebase/database";\n\nconst listRef = ref(db, \'quest_logs\');\npush(listRef, { log: "Quest completed", xp: 15 });' },
    { title: 'Hint 5: Database Security Rules', body: '// Rules configure write access validations inside Firebase console\n{\n  "rules": {\n    "players": {\n      ".read": true,\n      ".write": "auth != null" // authorized users only\n    }\n  }\n}' }
  ],
  firestore: [
    { title: 'Hint 1: Document Database Model', body: '// Firestore organizes records inside Documents containing keys, stored inside Collections\n// collection("users") -> doc("user_101")\nconst userDoc = doc(db, "users", "user_101");' },
    { title: 'Hint 2: Document CRUD operations', body: '// Write and read documents asynchronously\nimport { doc, setDoc, getDoc } from "firebase/firestore";\n\n// Write (overwrites or merges)\nawait setDoc(doc(db, "users", "user_101"), { level: 5 }, { merge: true });\n// Read\nconst snap = await getDoc(doc(db, "users", "user_101"));\nif (snap.exists()) console.log(snap.data());' },
    { title: 'Hint 3: Dynamic Queries', body: '// Filter collections using query and where operators\nimport { collection, query, where, getDocs } from "firebase/firestore";\n\nconst q = query(collection(db, "heroes"), where("level", ">=", 10));\nconst querySnapshot = await getDocs(q);\nquerySnapshot.forEach((doc) => console.log(doc.id, doc.data()));' },
    { title: 'Hint 4: Automatic Indexes', body: '// Firestore indexes simple fields automatically. \n// Complex multi-field filters (e.g. where("lvl", ">", 5).orderBy("xp")) require manual index configuration links generated in console errors.' },
    { title: 'Hint 5: Offline persistence', body: '// Firestore caches data locally to enable offline reads/writes out-of-the-box\n// Operations sync back to cloud server nodes once connections resume.' }
  ],
  objectivec: [
    { title: 'Hint 1: Interface & Implementation files', body: '// Header file (.h) declares class structures. Code file (.m) compiles logic.\n// Hero.h\n@interface Hero : NSObject\n- (void)levelUp;\n@end' },
    { title: 'Hint 2: Property configurations', body: '// Strong (retained object), assign (scalar values), weak (non-retained object)\n@property (nonatomic, strong) NSString *name;\n@property (nonatomic, assign) NSInteger level;' },
    { title: 'Hint 3: Square Bracket syntax', body: '// Objective-C calls methods by sending messages using square brackets\nHero *hero = [[Hero alloc] init];\n[hero setName:@"Objective Mage"];\n[hero levelUp]; // trigger method' },
    { title: 'Hint 4: String Literals', body: '// Prepend strings with @ to define NSString object variables\nNSString *str = @"Hello World";\nNSLog(@"Formatted message: %@", str);' },
    { title: 'Hint 5: ARC (Automatic Reference Counting)', body: '// Apple\'s compiler auto-inserts memory retain and release code blocks.\n// Simplifies memory cleanup cycles without dynamic garbage collection.' }
  ],
  julia: [
    { title: 'Hint 1: 1-Based Indexing', body: '# Julia array indexes start at 1 (unlike JS, Python, or C!)\nitems = ["Sword", "Shield"]\nprintln(items[1]) # -> "Sword"' },
    { title: 'Hint 2: High Performance Matrix Operations', body: '# Direct matrix transpose and operations\nA = [1 2; 3 4] # 2x2 matrix\nB = A\'         # Transpose\nC = A * B      # Matrix Multiplication' },
    { title: 'Hint 3: Multiple Dispatch', body: '# Functions compile differing logic based on type parameters!\nintroduce(x::Int) = println("Integer hero: ", x)\nintroduce(x::String) = println("Text mage: ", x)' },
    { title: 'Hint 4: Julia Packages (Pkg)', body: '# Add mathematical libraries using julia package manager\nimport Pkg\nPkg.add("LinearAlgebra")\nusing LinearAlgebra' },
    { title: 'Hint 5: Broadcasting (. operator)', body: '# Apply calculations element-by-element using the dot prefix\nnums = [1, 2, 3]\nsquared = nums .^ 2 # -> [1, 4, 9]' }
  ],
  powershell: [
    { title: 'Hint 1: Cmdlets syntax', body: '# PowerShell uses Verb-Noun command templates\nGet-Service -Name "MSSQLSERVER"\nSet-Content -Path "test.txt" -Value "Automation"' },
    { title: 'Hint 2: Variables and Strings', body: '# Variables start with $; double quotes interpolate values\n$Player = "Power Mage"\nWrite-Host "Active: $Player" # prints Active: Power Mage' },
    { title: 'Hint 3: Piping Objects', body: '# PowerShell pipes transfer complete objects (not just text streams like Bash!)\nGet-Process | Where-Object { $_.WorkingSet -gt 100MB } | Stop-Process' },
    { title: 'Hint 4: Custom Script Files', body: '# PowerShell scripts use the .ps1 extension. \n# Ensure execution policies allow script launches: Set-ExecutionPolicy RemoteSigned' },
    { title: 'Hint 5: CIM/WMI System information', body: '# Fetch hardware or OS configurations dynamically\nGet-CimInstance -ClassName Win32_LogicalDisk' }
  ],
  solidity: [
    { title: 'Hint 1: SPDX & Version declarations', body: '// SPDX License and Compiler version definition is mandatory at top\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;' },
    { title: 'Hint 2: State variables & Storage', body: '// Contract storage variables persist on blockchain ledger nodes\ncontract Storage {\n    uint256 public score; // Stored in contract storage block\n}' },
    { title: 'Hint 3: Mappings', body: '// Address lookup arrays (database tables index equivalent)\nmapping(address => uint256) public balances;\n\nfunction getBalance(address user) public view returns (uint256) {\n    return balances[user];\n}' },
    { title: 'Hint 4: Modifiers and Security', body: '// Modify method access parameters dynamically\nmodifier onlyOwner() {\n    require(msg.sender == owner, "Unauthorized");\n    _;\n}' },
    { title: 'Hint 5: Gas Fees optimization', body: '// Minimize write actions and use memory buffers inside functions to optimize gas costs\nfunction search(string memory info) public pure returns (bool) { /* pure logic */ }' }
  ],
  erlang: [
    { title: 'Hint 1: Functions and capitalization', body: '% Variables MUST start with Uppercase letters; Atoms start with lowercase\n-module(math).\n-export([add/2]).\n\nadd(X, Y) -> X + Y. % X and Y are variables, add is atom' },
    { title: 'Hint 2: Actor loops spawn', body: '% Spawn processes using loop parameters\nloop(State) ->\n  receive\n    {msg, Val} -> loop(Val)\n  end.' },
    { title: 'Hint 3: Messaging operator (!)', body: '% Send messages asynchronously using the exclamation mark\nPid ! {quest_log, "Completed"}.' },
    { title: 'Hint 4: Pattern matching arguments', body: '% Erlang functions match patterns on parameters\nfactorial(0) -> 1;\nfactorial(N) -> N * factorial(N - 1).' },
    { title: 'Hint 5: OTP Platform', body: '% Erlang OTP includes supervision structures to build fault-tolerant frameworks\n% "Let it crash" is the design philosophy!' }
  ],
  cobol: [
    { title: 'Hint 1: Program Divisions', body: '* COBOL programs strictly divide code into 4 Divisions\nIDENTIFICATION DIVISION.\nENVIRONMENT DIVISION.\nDATA DIVISION.\nPROCEDURE DIVISION.' },
    { title: 'Hint 2: Picture Clause variables', body: '* Declare variables sizing schemas using PIC\n01 HERO-NAME   PIC X(20).  * Text variable up to 20 chars\n01 GOLD-VAL    PIC 9(5).   * Integer variable up to 99999' },
    { title: 'Hint 3: Paragraph formatting', body: '* Execute code blocks sequentially using Paragraph blocks\nPROCEDURE DIVISION.\nMAIN-PARAGRAPH.\n    DISPLAY "Main actions".\n    PERFORM SUB-PARAGRAPH.\n    STOP RUN.\nSUB-PARAGRAPH.\n    DISPLAY "Sub actions".' },
    { title: 'Hint 4: Mainframe Displays', body: '* DISPLAY prints parameters; ACCEPT loads user inputs\nDISPLAY "Enter Gold: ".\nACCEPT GOLD-VAL.' },
    { title: 'Hint 5: Stop run statement', body: '* Every COBOL executable must terminate using STOP RUN\n* Forgetting this causes mainframes to hang or fail execution sequences.' }
  ],
  fortran: [
    { title: 'Hint 1: Implicit None', body: '! ALWAYS add implicit none to force variable declarations\nprogram sample\n  implicit none\n  integer :: level\n  level = 5\nend program sample' },
    { title: 'Hint 2: Do Loop structures', body: '! Loop structures\ninteger :: i, sum\nsum = 0\ndo i = 1, 10\n  sum = sum + i\nend do' },
    { title: 'Hint 3: Subroutines and Functions', body: '! Define calculations inside Functions\nreal function get_damage(atk, def)\n  implicit none\n  real, intent(in) :: atk, def\n  get_damage = atk - def\nend function get_damage' },
    { title: 'Hint 4: Standard output print', body: '! Print values using print *, parameters\nprint *, "Calculation output: ", sum' },
    { title: 'Hint 5: High Performance science', body: '! Fortran compiled code maps vector structures to hardware directly\n! The absolute choice for weather simulations, physics modelings, and aerodynamics.' }
  ],
  nuxtjs: [
    { title: 'Hint 1: File-Based Routing', body: '// pages/users/[id].vue → /users/123\n// pages/index.vue → /\n// pages/blog/index.vue → /blog\n// Use NuxtLink for client-side navigation\n<NuxtLink to="/about">About</NuxtLink>' },
    { title: 'Hint 2: useFetch & useAsyncData', body: '// useFetch — shorthand for SSR-safe fetching\nconst { data, error } = await useFetch("/api/heroes")\n\n// useAsyncData — for complex transforms\nconst { data } = await useAsyncData("heroes", () =>\n  $fetch("/api/heroes").then(r => r.data)\n)' },
    { title: 'Hint 3: Composables (useX pattern)', body: '// composables/useHero.ts\nexport const useHero = () => {\n  const hero = useState("hero", () => ({ level: 1 }))\n  const levelUp = () => hero.value.level++\n  return { hero, levelUp }\n}' },
    { title: 'Hint 4: Server API Routes', body: '// server/api/heroes.get.ts\nexport default defineEventHandler(async (event) => {\n  const heroes = await db.heroes.findMany()\n  return { heroes }\n})' },
    { title: 'Hint 5: Nuxt Modules ecosystem', body: '// nuxt.config.ts\nexport default defineNuxtConfig({\n  modules: [\n    "@nuxtjs/tailwindcss",\n    "@pinia/nuxt",\n    "@nuxt/image"\n  ]\n})' }
  ],
  nestjs: [
    { title: 'Hint 1: Module Architecture', body: '// app.module.ts — root module\n@Module({\n  imports: [HeroModule, DatabaseModule],\n  controllers: [AppController],\n  providers: [AppService]\n})\nexport class AppModule {}' },
    { title: 'Hint 2: Providers & Injection', body: '// hero.service.ts\n@Injectable()\nexport class HeroService {\n  constructor(\n    @InjectRepository(Hero)\n    private heroRepo: Repository<Hero>\n  ) {}\n\n  findAll() { return this.heroRepo.find(); }\n}' },
    { title: 'Hint 3: Guards & Middleware', body: '// auth.guard.ts\n@Injectable()\nexport class AuthGuard implements CanActivate {\n  canActivate(ctx: ExecutionContext): boolean {\n    const req = ctx.switchToHttp().getRequest();\n    return Boolean(req.headers.authorization);\n  }\n}' },
    { title: 'Hint 4: Pipes & Validation', body: '// main.ts\napp.useGlobalPipes(new ValidationPipe({\n  whitelist: true,          // strip unknown fields\n  forbidNonWhitelisted: true,\n  transform: true           // auto-cast types\n}))' },
    { title: 'Hint 5: Interceptors', body: '// logging.interceptor.ts\n@Injectable()\nexport class LoggingInterceptor implements NestInterceptor {\n  intercept(ctx: ExecutionContext, next: CallHandler) {\n    console.log("Before handler");\n    return next.handle().pipe(tap(() => console.log("After")));\n  }\n}' }
  ],
  lua: [
    { title: 'Hint 1: Tables (Lua Arrays & Objects)', body: '-- Arrays (1-indexed!)\nlocal items = {"Sword", "Shield", "Potion"}\nprint(items[1]) -- "Sword"\n\n-- Hash table (object)\nlocal hero = { name = "Kai", level = 5 }\nprint(hero.name) -- "Kai"' },
    { title: 'Hint 2: Functions & Closures', body: '-- Functions are first-class values\nlocal function add(a, b)\n  return a + b\nend\n\n-- Closures capture upvalues\nlocal function counter()\n  local count = 0\n  return function() count = count + 1; return count end\nend\nlocal tick = counter()\nprint(tick(), tick()) -- 1 2' },
    { title: 'Hint 3: Metatables (OOP)', body: '-- Lua OOP via metatables\nlocal Hero = {}\nHero.__index = Hero\n\nfunction Hero.new(name)\n  return setmetatable({ name = name, hp = 100 }, Hero)\nend\n\nfunction Hero:takeDamage(dmg)\n  self.hp = self.hp - dmg\nend\n\nlocal knight = Hero.new("Aldric")\nknight:takeDamage(20)\nprint(knight.hp) -- 80' },
    { title: 'Hint 4: Coroutines', body: '-- Coroutines — cooperative multithreading\nlocal co = coroutine.create(function()\n  for i = 1, 3 do\n    print("Step:", i)\n    coroutine.yield()\n  end\nend)\ncoroutine.resume(co) -- Step: 1\ncoroutine.resume(co) -- Step: 2' },
    { title: 'Hint 5: String manipulation', body: '-- Rich string library\nlocal name = "CODE.Q Arena"\nprint(string.upper(name))    -- CODE.Q ARENA\nprint(string.len(name))      -- 13\nprint(string.sub(name, 1, 6)) -- CODE.Q\nprint(string.find(name, "Arena")) -- 8 12' }
  ],
  gdscript: [
    { title: 'Hint 1: Nodes & Scenes', body: '# Every Godot object is a Node\n# Scenes are saved as .tscn files\n# Access child nodes with $\nextends Node2D\n\nfunc _ready():\n    $Sprite2D.visible = true\n    $AnimationPlayer.play("run")' },
    { title: 'Hint 2: Signals (Event System)', body: '# Define and emit signals\nsignal health_changed(new_health)\nsignal player_died\n\nfunc take_damage(amount: int):\n    health -= amount\n    emit_signal("health_changed", health)\n    if health <= 0:\n        emit_signal("player_died")' },
    { title: 'Hint 3: @export Properties', body: '# @export makes vars editable in Godot Inspector\n@export var speed: float = 200.0\n@export var max_health: int = 100\n@export var weapon: Texture2D\n\n# Then edit values visually in the Inspector panel' },
    { title: 'Hint 4: Input Handling', body: 'func _input(event):\n    if event is InputEventKey:\n        if event.pressed and event.keycode == KEY_SPACE:\n            jump()\n\n# Or via action maps (Input Map in Project Settings)\nif Input.is_action_pressed("move_right"):\n    velocity.x = SPEED' },
    { title: 'Hint 5: Tween Animations', body: '# Godot 4 Tween — smooth property animations\nvar tween = create_tween()\ntween.tween_property($Sprite2D, "modulate:a", 0.0, 0.5) # Fade out\ntween.tween_callback(queue_free) # Delete after fade' }
  ],
  wasm: [
    { title: 'Hint 1: Compile C to Wasm (Emscripten)', body: '// Compile C code to WebAssembly\n// Terminal:\n// emcc hero.c -o hero.wasm -s EXPORTED_FUNCTIONS="[\'_add\']"\n\n// hero.c\nint add(int a, int b) { return a + b; }' },
    { title: 'Hint 2: Instantiate Wasm in JavaScript', body: 'const { instance } = await WebAssembly.instantiateStreaming(\n  fetch("hero.wasm"),\n  { env: { memory: new WebAssembly.Memory({ initial: 1 }) } }\n);\nconst result = instance.exports.add(10, 20);\nconsole.log(result); // 30' },
    { title: 'Hint 3: WAT Text Format', body: ';; WAT = WebAssembly Text format (human-readable)\n(module\n  (func $square (export "square") (param $n i32) (result i32)\n    local.get $n\n    local.get $n\n    i32.mul  ;; n * n\n  )\n)' },
    { title: 'Hint 4: Wasm Memory Model', body: '// Wasm uses linear memory — a flat byte array\nconst memory = new WebAssembly.Memory({ initial: 1 }); // 64KB page\nconst buffer = new Uint8Array(memory.buffer);\nbuffer[0] = 42; // Write directly to memory' },
    { title: 'Hint 5: Rust to WebAssembly', body: '// Cargo.toml: crate-type = ["cdylib"]\nuse wasm_bindgen::prelude::*;\n\n#[wasm_bindgen]\npub fn greet(name: &str) -> String {\n    format!("Hello, {}!", name)\n}\n// Build: wasm-pack build --target web' }
  ],
  clojure: [
    { title: 'Hint 1: Persistent Data Structures', body: '; Clojure collections are IMMUTABLE by default\n(def items ["Sword" "Shield" "Potion"])\n(def updated (conj items "Scroll")) ; New vector, original unchanged\n(println items)   ;; ["Sword" "Shield" "Potion"]\n(println updated) ;; ["Sword" "Shield" "Potion" "Scroll"]' },
    { title: 'Hint 2: Destructuring', body: '; Extract values from collections elegantly\n(let [{:keys [name level hp]} hero]\n  (println name "is level" level))\n\n; Vector destructuring\n(let [[first & rest] inventory]\n  (println "First item:" first))' },
    { title: 'Hint 3: Threading Macros', body: '; -> threads value as FIRST argument\n(-> "  Hello World  " str/trim str/lower-case)\n;; => "hello world"\n\n; ->> threads value as LAST argument\n(->> [1 2 3 4 5]\n     (filter even?)\n     (map #(* % 10)))\n;; => (20 40)' },
    { title: 'Hint 4: Atoms (Mutable State)', body: '; Atoms allow safe mutable state\n(def score (atom 0))\n(swap! score + 10)   ; Atomically add 10\n(reset! score 0)     ; Reset to 0\n(println @score)     ; Deref with @' },
    { title: 'Hint 5: Macros', body: '; Macros transform code at compile time\n(defmacro when-hero [condition & body]\n  `(if ~condition (do ~@body) nil))\n\n(when-hero (> (:level hero) 5)\n  (println "Epic tier unlocked!")\n  (give-reward hero))' }
  ],
  fsharp: [
    { title: 'Hint 1: Discriminated Unions', body: '// Powerful type modeling\ntype Shape =\n    | Circle of radius: float\n    | Rectangle of width: float * height: float\n    | Triangle of base: float * height: float\n\nlet area shape =\n    match shape with\n    | Circle r       -> System.Math.PI * r * r\n    | Rectangle(w,h) -> w * h\n    | Triangle(b,h)  -> 0.5 * b * h' },
    { title: 'Hint 2: Option Type (Null Safety)', body: '// Option<T> replaces null references\nlet findHero name heroes =\n    heroes |> List.tryFind (fun h -> h.Name = name)\n\nmatch findHero "Arthur" heroList with\n| Some hero -> printfn "Found: %s Level %d" hero.Name hero.Level\n| None      -> printfn "Hero not found"' },
    { title: 'Hint 3: Record Types', body: '// Records are immutable by default\ntype Hero = { Name: string; Level: int; Health: float }\n\nlet hero = { Name = "Elara"; Level = 5; Health = 100.0 }\n// Create modified copy using "with"\nlet leveled = { hero with Level = hero.Level + 1 }' },
    { title: 'Hint 4: Async Workflows', body: '// F# async is built into the language\nlet fetchHero id = async {\n    let! response = Http.AsyncRequest $"/api/heroes/{id}"\n    let hero = Json.deserialize response.Body\n    return hero\n}\n\nlet hero = fetchHero 42 |> Async.RunSynchronously' },
    { title: 'Hint 5: Computation Expressions', body: '// Result type for railway-oriented programming\ntype ValidationError = TooShort | InvalidChar\n\nlet validateName (name: string) : Result<string, ValidationError> =\n    if name.Length < 3 then Error TooShort\n    elif name.Contains("!") then Error InvalidChar\n    else Ok name' }
  ],
  groovy: [
    { title: 'Hint 1: Dynamic Typing & GStrings', body: '// Groovy is optionally typed\ndef name = "GroovyHero"       // dynamic\nString title = "Level Master"  // static\n\n// GStrings — ${} interpolation\nprintln "Hero: ${name.toUpperCase()} — $title"\n\n// Multi-line strings\ndef bio = """\n  Name: $name\n  Title: $title\n"""' },
    { title: 'Hint 2: Closures & Collections', body: '// Closures — first-class functions\ndef square = { it * it }\nprintln square(5) // 25\n\n// Collection power methods\ndef nums = [1, 2, 3, 4, 5]\nprintln nums.collect { it * 2 }     // [2,4,6,8,10]\nprintln nums.findAll { it % 2 == 0 } // [2,4]\nprintln nums.inject(0) { acc, n -> acc + n } // 15' },
    { title: 'Hint 3: Groovy Maps (JSON-like)', body: '// Maps have powerful literals\ndef hero = [\n    name: "Groovy Knight",\n    skills: ["Slash", "Block"],\n    stats: [atk: 50, def: 30]\n]\n\nprintln hero.name              // Groovy Knight\nprintln hero["stats"]["atk"]   // 50\nhero.level = 7                 // Add new key' },
    { title: 'Hint 4: Gradle Build Script', body: '// build.gradle — Groovy DSL\nplugins {\n    id "java"\n    id "org.springframework.boot" version "3.2.0"\n}\n\ndependencies {\n    implementation "org.springframework.boot:spring-boot-starter-web"\n    testImplementation "org.springframework.boot:spring-boot-starter-test"\n}\n\ntasks.test { useJUnitPlatform() }' },
    { title: 'Hint 5: Jenkins Pipeline', body: '// Jenkinsfile — Declarative Pipeline\npipeline {\n    agent any\n    environment { APP_ENV = "staging" }\n    stages {\n        stage("Build")  { steps { sh "mvn clean package" } }\n        stage("Test")   { steps { sh "mvn test" } }\n        stage("Deploy") { steps { sh "./deploy.sh $APP_ENV" } }\n    }\n    post { failure { mail to: "team@dev.com", subject: "Build Failed!" } }\n}' }
  ],
  elasticsearch: [
    { title: 'Hint 1: Index & Document Basics', body: '// Elasticsearch stores JSON documents in indices\n// Create/update a document\nPUT /heroes/_doc/1\n{ "name": "ElasticSlayer", "level": 8, "class": "Warrior" }\n\n// Get document\nGET /heroes/_doc/1\n\n// Delete document\nDELETE /heroes/_doc/1' },
    { title: 'Hint 2: Full-Text Search', body: '// Match query — full text search with analysis\nGET /heroes/_search\n{\n  "query": {\n    "match": {\n      "description": "sword combat warrior"\n    }\n  },\n  "highlight": {\n    "fields": { "description": {} }\n  }\n}' },
    { title: 'Hint 3: Aggregations (Analytics)', body: '// Count heroes by class\nGET /heroes/_search\n{\n  "size": 0,\n  "aggs": {\n    "by_class": {\n      "terms": { "field": "class.keyword" }\n    },\n    "avg_level": {\n      "avg": { "field": "level" }\n    }\n  }\n}' },
    { title: 'Hint 4: Mappings (Schema)', body: 'PUT /heroes\n{\n  "mappings": {\n    "properties": {\n      "name":        { "type": "text" },\n      "class":       { "type": "keyword" },\n      "level":       { "type": "integer" },\n      "created_at":  { "type": "date" }\n    }\n  }\n}' },
    { title: 'Hint 5: Node.js Client', body: 'import { Client } from "@elastic/elasticsearch";\nconst client = new Client({ node: "http://localhost:9200" });\n\n// Index a document\nawait client.index({\n  index: "heroes",\n  document: { name: "ESHero", level: 6 }\n});\n\n// Search\nconst { hits } = await client.search({\n  index: "heroes",\n  query: { match: { name: "ESHero" } }\n});' }
  ],
  dynamodb: [
    { title: 'Hint 1: Table Design (Keys)', body: '// DynamoDB is key-value + document\n// Primary key = Partition Key (+ optional Sort Key)\n// Good key design is the most important skill!\n\n// Example: GameScores table\n// Partition Key: userId (String)\n// Sort Key: gameId (String)\n// This lets you query all games by a user efficiently' },
    { title: 'Hint 2: Single Table Design', body: '// Best practice: put multiple entity types in ONE table\n// Use composite keys to create relationships\n\n// PK            | SK\n// USER#u001     | USER#u001        ← user profile\n// USER#u001     | SCORE#game-001   ← score record\n// USER#u001     | ORDER#ord-123    ← order record\n\n// Query all data for user u001:\n// KeyConditionExpression: PK = "USER#u001"' },
    { title: 'Hint 3: SDK Query vs Scan', body: 'import { QueryCommand } from "@aws-sdk/client-dynamodb";\n\n// ALWAYS prefer Query over Scan\n// Query uses index = O(n results) cost\n// Scan reads ENTIRE table = very expensive!\n\nconst command = new QueryCommand({\n  TableName: "Heroes",\n  KeyConditionExpression: "userId = :uid",\n  ExpressionAttributeValues: { ":uid": { S: "user-001" } }\n});' },
    { title: 'Hint 4: Global Secondary Indexes (GSI)', body: '// GSI = alternative query access patterns\n// Add a GSI on "class" attribute to query by class\n\nGET heroes where class = "Warrior"\n// Without GSI → expensive Scan\n// With GSI → fast Query\n\n// Define GSI in table creation or modify table\n// Each GSI = additional write costs (WCU)' },
    { title: 'Hint 5: Condition Expressions', body: 'import { UpdateItemCommand } from "@aws-sdk/client-dynamodb";\n\n// Only update if item exists AND level < 10\nconst command = new UpdateItemCommand({\n  TableName: "Heroes",\n  Key: { heroId: { S: "hero-001" } },\n  UpdateExpression: "SET #lvl = #lvl + :inc",\n  ConditionExpression: "attribute_exists(heroId) AND #lvl < :max",\n  ExpressionAttributeNames: { "#lvl": "level" },\n  ExpressionAttributeValues: { ":inc": { N: "1" }, ":max": { N: "10" } }\n});' }
  ],
  prisma: [
    { title: 'Hint 1: Schema Definition Language', body: '// schema.prisma\ndatasource db {\n  provider = "postgresql"  // or "mysql", "sqlite"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\nmodel User {\n  id    Int    @id @default(autoincrement())\n  email String @unique\n  name  String?\n  posts Post[]\n}' },
    { title: 'Hint 2: CRUD Operations', body: '// Create\nconst hero = await prisma.hero.create({\n  data: { name: "PrismaKnight", level: 1 }\n})\n\n// Read\nconst heroes = await prisma.hero.findMany({\n  where: { level: { gte: 5 } }\n})\n\n// Update\nawait prisma.hero.update({\n  where: { id: 1 },\n  data: { level: { increment: 1 } }\n})\n\n// Delete\nawait prisma.hero.delete({ where: { id: 1 } })' },
    { title: 'Hint 3: Relations & Includes', body: '// One-to-Many: Author → Posts\nconst authorWithPosts = await prisma.author.findUnique({\n  where: { id: 1 },\n  include: {\n    posts: {\n      where: { published: true },\n      orderBy: { createdAt: "desc" }\n    }\n  }\n})' },
    { title: 'Hint 4: Migrations', body: '// After changing schema.prisma:\n// 1. Generate migration file:\n//    npx prisma migrate dev --name add_hero_level\n//\n// 2. Apply in production:\n//    npx prisma migrate deploy\n//\n// 3. Regenerate Prisma client:\n//    npx prisma generate\n\n// Prisma Studio — visual DB browser:\n// npx prisma studio' },
    { title: 'Hint 5: Transactions', body: '// Atomic transactions — all succeed or all fail\nconst [hero, inventory] = await prisma.$transaction([\n  prisma.hero.create({\n    data: { name: "NewHero", level: 1 }\n  }),\n  prisma.inventory.create({\n    data: { heroId: 1, item: "Starter Sword" }\n  })\n]);' }
  ],
  typeorm: [
    { title: 'Hint 1: Entity Definition', body: '// entities/Hero.ts\nimport { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";\n\n@Entity("heroes")\nexport class Hero {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column({ length: 100 })\n  name: string;\n\n  @Column({ default: 1 })\n  level: number;\n\n  @CreateDateColumn()\n  createdAt: Date;\n}' },
    { title: 'Hint 2: Relationships', body: '// One-to-Many: Hero → Skills\n@Entity()\nexport class Skill {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column()\n  name: string;\n\n  @ManyToOne(() => Hero, (hero) => hero.skills)\n  hero: Hero;\n}\n\n// In Hero entity:\n@OneToMany(() => Skill, (skill) => skill.hero)\nskills: Skill[];' },
    { title: 'Hint 3: QueryBuilder', body: '// Complex queries with QueryBuilder\nconst warriors = await heroRepo\n  .createQueryBuilder("hero")\n  .leftJoinAndSelect("hero.skills", "skill")\n  .where("hero.heroClass = :class", { class: "Warrior" })\n  .andWhere("hero.level >= :minLevel", { minLevel: 5 })\n  .orderBy("hero.level", "DESC")\n  .limit(10)\n  .getMany();' },
    { title: 'Hint 4: Active Record vs Data Mapper', body: '// Active Record — model knows how to save itself\n@Entity()\nexport class Hero extends BaseEntity {\n  @Column() name: string;\n}\nawait Hero.save({ name: "ActiveHero" });\nawait Hero.find({ where: { name: "ActiveHero" } });\n\n// Data Mapper — separate Repository class\nconst repo = AppDataSource.getRepository(Hero);\nawait repo.save(hero);\nawait repo.find();' },
    { title: 'Hint 5: Migrations', body: '// Generate migration automatically from entity changes:\n// npx typeorm migration:generate -n AddHeroLevel\n\n// Migration file:\nexport class AddHeroLevel1234567890 implements MigrationInterface {\n  async up(queryRunner: QueryRunner): Promise<void> {\n    await queryRunner.addColumn("heroes",\n      new TableColumn({ name: "level", type: "int", default: 1 })\n    );\n  }\n  async down(queryRunner: QueryRunner): Promise<void> {\n    await queryRunner.dropColumn("heroes", "level");\n  }\n}' }
  ],
  docker: [
    { title: 'Hint 1: Core Concepts', body: '# Key Docker concepts:\n# Image — read-only blueprint (like a class)\n# Container — running instance of an image\n# Dockerfile — instructions to build an image\n# Registry — store for images (Docker Hub)\n\n# Pull official image\ndocker pull node:20-alpine\n\n# Run a container\ndocker run -p 3000:3000 node:20-alpine' },
    { title: 'Hint 2: Dockerfile Best Practices', body: '# Good Dockerfile layer ordering (cache optimization)\nFROM node:20-alpine\nWORKDIR /app\n\n# Copy package files FIRST (cached if unchanged)\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Copy source AFTER (changes here don\'t bust npm cache)\nCOPY . .\nCMD ["node", "server.js"]' },
    { title: 'Hint 3: Docker Compose', body: '# docker-compose.yml\nversion: "3.9"\nservices:\n  app:\n    build: .\n    ports: ["3000:3000"]\n    depends_on: [db]\n    environment:\n      DATABASE_URL: postgresql://user:pass@db:5432/quest\n  db:\n    image: postgres:16-alpine\n    volumes: [pg_data:/var/lib/postgresql/data]\nvolumes:\n  pg_data:' },
    { title: 'Hint 4: Essential Commands', body: '# Build image\ndocker build -t my-hero-app:v1 .\n\n# List running containers\ndocker ps\n\n# Execute command in running container\ndocker exec -it my-container sh\n\n# View logs\ndocker logs -f my-container\n\n# Stop & remove everything\ndocker compose down --volumes' },
    { title: 'Hint 5: Multi-Stage Builds', body: '# Multi-stage: builder image → tiny production image\nFROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\n# Production stage — only copy built artifacts\nFROM node:20-alpine AS production\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCMD ["node", "dist/server.js"]' }
  ],
  kubernetes: [
    { title: 'Hint 1: Core Objects', body: '# Key Kubernetes objects:\n# Pod — smallest deployable unit (1+ containers)\n# Deployment — manages pods, handles rolling updates\n# Service — stable network endpoint for pods\n# Ingress — HTTP routing rules\n# ConfigMap/Secret — configuration & secrets\n# Namespace — virtual cluster isolation' },
    { title: 'Hint 2: Deployment & Scaling', body: '# Apply a deployment\nkubectl apply -f deployment.yaml\n\n# Scale replicas\nkubectl scale deployment hero-api --replicas=5\n\n# Rolling update (zero downtime)\nkubectl set image deployment/hero-api hero-api=myregistry/hero-api:v2.2\n\n# Check rollout status\nkubectl rollout status deployment/hero-api\n\n# Rollback\nkubectl rollout undo deployment/hero-api' },
    { title: 'Hint 3: Services & Networking', body: '# Service types:\n# ClusterIP — internal cluster traffic only (default)\n# NodePort — exposed on each node\'s IP:port\n# LoadBalancer — cloud provider load balancer\n# ExternalName — DNS alias\n\napiVersion: v1\nkind: Service\nmetadata:\n  name: hero-api\nspec:\n  type: LoadBalancer\n  selector: { app: hero-api }\n  ports: [{ port: 80, targetPort: 3000 }]' },
    { title: 'Hint 4: ConfigMaps & Secrets', body: '# ConfigMap — non-sensitive config\napiVersion: v1\nkind: ConfigMap\ndata:\n  NODE_ENV: "production"\n  PORT: "3000"\n\n# Secret — base64 encoded sensitive data\napiVersion: v1\nkind: Secret\ntype: Opaque\ndata:\n  DB_PASSWORD: cGFzc3dvcmQ=  # base64 of "password"\n\n# Use in pod spec:\n# envFrom: [{ configMapRef: { name: my-config } }]' },
    { title: 'Hint 5: Health Checks', body: 'spec:\n  containers:\n    - name: hero-api\n      image: hero-api:v1\n      # Liveness — restart if unhealthy\n      livenessProbe:\n        httpGet: { path: /health, port: 3000 }\n        initialDelaySeconds: 30\n        periodSeconds: 10\n      # Readiness — only send traffic when ready\n      readinessProbe:\n        httpGet: { path: /ready, port: 3000 }\n        initialDelaySeconds: 5' }
  ],
  terraform: [
    { title: 'Hint 1: Core Workflow', body: '# Terraform workflow:\n# 1. Write .tf config files\n# 2. terraform init   — download providers\n# 3. terraform plan   — preview changes (DRY RUN)\n# 4. terraform apply  — create/update real resources\n# 5. terraform destroy — delete all resources\n\n# Always run plan before apply!\nterraform plan -out=tfplan\nterraform apply tfplan' },
    { title: 'Hint 2: Variables', body: '# variables.tf\nvariable "region" {\n  description = "AWS region"\n  type        = string\n  default     = "us-east-1"\n}\n\nvariable "instance_count" {\n  type    = number\n  default = 2\n}\n\n# Use with var.\nresource "aws_instance" "app" {\n  count  = var.instance_count\n  region = var.region\n}' },
    { title: 'Hint 3: State Management', body: '# Terraform state tracks real-world resources\n# Always use REMOTE state for teams!\n\n# backend.tf — store state in S3\nterraform {\n  backend "s3" {\n    bucket = "my-terraform-state"\n    key    = "prod/hero-api/terraform.tfstate"\n    region = "us-east-1"\n    dynamodb_table = "terraform-locks"  # State locking\n  }\n}' },
    { title: 'Hint 4: Modules (Reusable Code)', body: '# modules/vpc/main.tf — reusable VPC module\nresource "aws_vpc" "main" {\n  cidr_block = var.cidr_block\n}\n\n# Root module usage\nmodule "production_vpc" {\n  source     = "./modules/vpc"\n  cidr_block = "10.0.0.0/16"\n}\n\nmodule "staging_vpc" {\n  source     = "./modules/vpc"\n  cidr_block = "10.1.0.0/16"\n}' },
    { title: 'Hint 5: Data Sources', body: '# Data sources fetch existing infrastructure info\n# without managing it with Terraform\n\n# Fetch latest Amazon Linux AMI ID automatically\ndata "aws_ami" "amazon_linux" {\n  most_recent = true\n  owners      = ["amazon"]\n  filter {\n    name   = "name"\n    values = ["amzn2-ami-hvm-*-x86_64-gp2"]\n  }\n}\n\nresource "aws_instance" "app" {\n  ami = data.aws_ami.amazon_linux.id\n}' }
  ],
  nginx: [
    { title: 'Hint 1: Core Directives', body: '# Main nginx.conf structure:\nevents {\n  worker_connections 1024;\n}\nhttp {\n  include mime.types;\n  # Virtual host configurations\n  include /etc/nginx/sites-enabled/*;\n}\n\n# Sites go in server {} blocks\nserver {\n  listen 80;\n  server_name example.com;\n}' },
    { title: 'Hint 2: Reverse Proxy Setup', body: '# Proxy requests to Node.js/Python backend\nserver {\n  listen 80;\n  server_name api.example.com;\n\n  location / {\n    proxy_pass         http://127.0.0.1:3000;\n    proxy_http_version 1.1;\n    proxy_set_header   Upgrade $http_upgrade;\n    proxy_set_header   Connection "upgrade";\n    proxy_set_header   Host $host;\n    proxy_set_header   X-Real-IP $remote_addr;\n  }\n}' },
    { title: 'Hint 3: SSL/TLS with Certbot', body: '# Install free SSL certificate\n# sudo certbot --nginx -d yourdomain.com\n\n# Certbot auto-adds:\nserver {\n  listen 443 ssl;\n  ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;\n  ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;\n  include /etc/letsencrypt/options-ssl-nginx.conf;\n}' },
    { title: 'Hint 4: Load Balancing', body: '# Distribute traffic across multiple backend servers\nupstream backend_pool {\n  least_conn;  # Route to server with fewest connections\n  server 10.0.0.1:3000 weight=3;  # Gets 3x traffic\n  server 10.0.0.2:3000;\n  server 10.0.0.3:3000 backup;   # Only used if others fail\n}\n\nserver {\n  location / {\n    proxy_pass http://backend_pool;\n  }\n}' },
    { title: 'Hint 5: Performance Optimization', body: '# gzip compression\ngzip on;\ngzip_comp_level 5;\ngzip_min_length 256;\ngzip_types text/plain application/json application/javascript text/css;\n\n# Browser caching for static assets\nlocation ~* \\.(jpg|jpeg|png|gif|ico|css|js)$ {\n  expires 30d;\n  add_header Cache-Control "public, immutable";\n}\n\n# Rate limiting\nlimit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;\nlocation /api/ {\n  limit_req zone=api burst=10;\n}' }
  ]
};
