const bcrypt = require('bcryptjs');

// Professional seed data
const seedData = {
  users: [
    {
      email: 'admin@techsolutions.com',
      password: 'Admin@2024',
      role: 'Admin',
      isBlocked: false
    },
    {
      email: 'john.mitchell@devworks.io',
      password: 'SecurePass123!',
      role: 'User',
      isBlocked: false
    },
    {
      email: 'sarah.chen@innovatetech.com',
      password: 'SecurePass123!',
      role: 'User',
      isBlocked: false
    },
    {
      email: 'michael.rodriguez@cloudservices.net',
      password: 'SecurePass123!',
      role: 'User',
      isBlocked: false
    },
    {
      email: 'emily.watson@datastream.io',
      password: 'SecurePass123!',
      role: 'User',
      isBlocked: false
    },
    {
      email: 'david.anderson@codebase.com',
      password: 'SecurePass123!',
      role: 'User',
      isBlocked: false
    },
    {
      email: 'lisa.thompson@webmasters.org',
      password: 'SecurePass123!',
      role: 'User',
      isBlocked: false
    },
    {
      email: 'james.park@techventures.io',
      password: 'SecurePass123!',
      role: 'User',
      isBlocked: false
    }
  ],

  repositories: [
      {
        title: 'freeCodeCamp',
        description: 'Open source codebase for freeCodeCamp, a popular interactive learning web platform for coding and web development.',
        githubLink: 'https://github.com/freeCodeCamp/freeCodeCamp',
        downloadLink: 'https://github.com/freeCodeCamp/freeCodeCamp/archive/refs/heads/main.zip',
        license: 'BSD 3-Clause "New" or "Revised" License',
        version: 'main',
        readme: 'freeCodeCamp.org is a nonprofit community helping millions learn to code for free through an open-source curriculum covering full-stack web development and machine learning. It offers 12 free developer certifications including Responsive Web Design, JavaScript Algorithms, Front-End Libraries, Data Visualization, APIs, Python, Data Analysis, Information Security, Machine Learning, and more. Each certification requires completing 5 projects plus hundreds of coding challenges. The platform provides an interactive learning environment with thousands of challenges, automated testing, and a supportive community. With over 100,000 graduates landing developer jobs, freeCodeCamp has become one of the most popular coding education platforms. The repository is fully open-source under BSD-3-Clause license, with 431k stars and contributions from 5,610+ developers.',
        isPremium: true
      },
      {
        title: 'Free Programming Books',
        description: 'A massive collection of free programming books, maintained by the Ebook Foundation.',
        githubLink: 'https://github.com/EbookFoundation/free-programming-books',
        downloadLink: 'https://github.com/EbookFoundation/free-programming-books/archive/refs/heads/main.zip',
        license: 'Creative Commons Attribution 4.0 International',
        version: 'main',
        readme: 'This repository is a comprehensive, curated list of freely available programming books, courses, podcasts, and resources in multiple languages. Originally a Stack Overflow clone, it has grown to become one of GitHub\'s most popular repositories with 375k stars. The collection is organized by programming language and subject, covering topics from Python to JavaScript, Machine Learning to Web Development. Resources are available in over 40 languages including Arabic, Chinese, French, German, Spanish, Russian, and many more. The project also includes cheat sheets, interactive programming resources, problem sets for competitive programming, and podcasts/screencasts. Administered by the Free Ebook Foundation (a 501(c)(3) nonprofit), the repository emphasizes accessibility and is regularly updated by 3,100+ contributors. Licensed under CC-BY-4.0, making all resources freely shareable with attribution.',
        isPremium: true
      },
      {
        title: 'TensorFlow',
        description: 'An end-to-end open source machine learning platform by Google.',
        githubLink: 'https://github.com/tensorflow/tensorflow',
        downloadLink: 'https://github.com/tensorflow/tensorflow/archive/refs/heads/master.zip',
        license: 'Apache License 2.0',
        version: 'v2.20.0',
        readme: 'TensorFlow is Google\'s end-to-end open-source platform for machine learning, providing a comprehensive ecosystem of tools, libraries, and community resources. Originally developed by Google Brain\'s Machine Intelligence team, it has become the most widely-used machine learning framework with 192k stars. TensorFlow provides stable Python and C++ APIs, supporting CUDA-enabled GPUs, DirectX, and MacOS-metal devices. The platform enables researchers to push state-of-the-art ML boundaries while allowing developers to easily build and deploy ML-powered applications. Key features include distributed training, model optimization, deployment across platforms (mobile, web, server), and integration with specialized hardware. The repository includes comprehensive documentation, tutorials, official models, and codelabs. TensorFlow powers applications from computer vision to natural language processing, reinforcement learning to generative AI. Licensed under Apache 2.0, with 3,767 contributors and used by 533k+ projects.',
        isPremium: false
      },
      {
        title: 'Oh My Zsh',
        description: 'A delightful, open source, community-driven framework for managing your Zsh configuration.',
        githubLink: 'https://github.com/ohmyzsh/ohmyzsh',
        downloadLink: 'https://github.com/ohmyzsh/ohmyzsh/archive/refs/heads/master.zip',
        license: 'MIT License',
        version: 'master',
        readme: 'Oh My Zsh is a community-driven framework for managing Zsh configuration, transforming the terminal experience with 183k stars. It includes 300+ optional plugins (git, docker, node, python, AWS, etc.) and 140+ themes to customize your command prompt. The framework makes terminal work more efficient and enjoyable through powerful features like auto-completion, command history search, syntax highlighting, and git integration. Installation is simple via curl or wget, and configuration is managed through a single .zshrc file. Oh My Zsh supports multiple platforms including Linux, macOS, FreeBSD, and Windows (WSL2). The project emphasizes community contribution with 2,478 contributors and provides extensive documentation. Features include plugin management, theme selection, custom aliases, and advanced Zsh configurations. Licensed under MIT, Oh My Zsh has become the de facto standard for Zsh users seeking an enhanced, productivity-focused terminal experience.',
        isPremium: true
      },
      {
        title: 'Ladybird Browser',
        description: 'A new cross-platform browser project from the SerenityOS community.',
        githubLink: 'https://github.com/LadybirdBrowser/ladybird',
        downloadLink: 'https://github.com/LadybirdBrowser/ladybird/archive/refs/heads/master.zip',
        license: 'BSD 2-Clause "Simplified" License',
        version: 'master',
        readme: 'Ladybird is a truly independent web browser using a novel engine based on web standards, developed from scratch without relying on Chromium, WebKit, or Gecko. Currently in pre-alpha and suitable only for developers, Ladybird aims to build a complete, usable browser for the modern web with 54.2k stars. It uses a multi-process architecture with separate processes for UI, WebContent rendering, image decoding, and networking—each sandboxed for security. Core components inherited from SerenityOS include LibWeb (rendering engine), LibJS (JavaScript engine), LibWasm (WebAssembly), LibCrypto/LibTLS (cryptography), LibHTTP, LibGfx (2D graphics), LibUnicode, LibMedia, and LibCore. Ladybird runs on Linux, macOS, Windows (WSL2), and many Unix-like systems. The project is community-driven with 1,216 contributors, licensed under BSD-2-Clause. Development happens openly on GitHub with active Discord community support. Ladybird represents an ambitious effort to create browser diversity and independence in a Chromium-dominated landscape.',
        isPremium: false
      },
      {
        title: 'yt-dlp',
        description: 'A youtube-dl fork with additional features and fixes.',
        githubLink: 'https://github.com/yt-dlp/yt-dlp',
        downloadLink: 'https://github.com/yt-dlp/yt-dlp/archive/refs/heads/master.zip',
        license: 'The Unlicense',
        version: '2025.11.12',
        readme: 'yt-dlp is a feature-rich command-line audio/video downloader supporting thousands of websites, forked from the now-inactive youtube-dlc. With 135k stars, it provides extensive capabilities including format selection, subtitle downloading, metadata embedding, SponsorBlock integration, authentication, proxy support, and post-processing. Key features include downloading playlists, live streams, and partial videos; embedding thumbnails and metadata; multiple output templates; and support for various post-processing tasks (audio extraction, video remuxing, chapter splitting). yt-dlp supports multiple downloaders (aria2c, curl, ffmpeg, wget), impersonation of browsers for TLS fingerprinting bypass, and plugin system for custom extractors. It offers three release channels (stable, nightly, master) with self-updating capability. The tool requires Python 3.10+ and recommends ffmpeg for media processing. Extensive documentation covers installation, configuration, authentication, and advanced usage. Licensed under Unlicense (with some bundled components under different licenses), yt-dlp has 1,481 contributors and is actively maintained with frequent updates.',
        isPremium: true
      },
      {
        title: 'NocoBase',
        description: 'Open source no-code database platform.',
        githubLink: 'https://github.com/nocobase/nocobase',
        downloadLink: 'https://github.com/nocobase/nocobase/archive/refs/heads/main.zip',
        license: 'Other',
        version: 'v1.9.11',
        readme: 'NocoBase is an extensible AI-powered no-code/low-code platform for building business applications and enterprise solutions with 17k stars. It distinguishes itself through data model-driven architecture (not form/table-driven), separating UI from data structure for unlimited flexibility. Key features include integrated AI employees for roles like translator, analyst, or assistant; WYSIWYG interface with one-click mode switching; and plugin-based microkernel architecture where everything is extensible. NocoBase supports multiple data sources (main database, external databases, third-party APIs) and allows seamless AI-human collaboration in interfaces and workflows. The platform provides built-in code editor with syntax highlighting, auto-completion, and Git version control integration. Installation options include Docker, create-nocobase-app CLI, and Git source code. NocoBase enables rapid development of CRM, project management, admin dashboards, internal tools, and workflows without extensive coding. With 94 contributors, it\'s designed for teams needing adaptable, cost-effective solutions with total control and infinite extensibility. Suitable for both no-code users and developers requiring low-code customization.',
        isPremium: false
      },
      {
        title: 'Kestra',
        description: 'Open source orchestration and automation platform.',
        githubLink: 'https://github.com/kestra-io/kestra',
        downloadLink: 'https://github.com/kestra-io/kestra/archive/refs/heads/develop.zip',
        license: 'Apache License 2.0',
        version: 'v1.1.4',
        readme: 'Kestra is an open-source, event-driven orchestration platform making both scheduled and event-driven workflows easy with 22.7k stars. It brings Infrastructure as Code best practices to data, process, and microservice orchestration, enabling users to build reliable workflows from the UI in just a few lines of YAML. Key features include everything-as-code with Git integration, event-driven and scheduled workflows via triggers, declarative YAML interface, 300+ built-in plugins for databases/APIs/cloud services, intuitive UI with code editor, and scalability to handle millions of workflows. Kestra provides comprehensive workflow structure including namespaces, labels, subflows, retries, timeout, error handling, inputs/outputs, variables, conditional branching, advanced scheduling, backfills, dynamic tasks, and parallel/sequential execution. The platform supports running scripts in any language (Python, Node.js, R, Go, Shell) anywhere (local, remote, Docker, Kubernetes). Installation is simple via Docker with one command. Kestra enables monitoring via Slack/email, integrates with AWS/GCP/Azure, and includes AI Copilot. Licensed under Apache 2.0 with 285 contributors.',
        isPremium: true
      },
      {
        title: 'Budibase',
        description: 'Low-code platform for building internal tools.',
        githubLink: 'https://github.com/Budibase/budibase',
        downloadLink: 'https://github.com/Budibase/budibase/archive/refs/heads/master.zip',
        license: 'Other',
        version: '3.23.28',
        readme: 'Budibase is an open-source low-code platform saving engineers hundreds of hours building forms, portals, and approval apps securely with 27.1k stars. Unlike other platforms, Budibase builds and ships single-page applications with performance baked in and responsive design. It\'s open-source (GPL v3 licensed) and extensible—users can code against Budibase or fork it. The platform loads data from MongoDB, CouchDB, PostgreSQL, MySQL, Airtable, S3, DynamoDB, REST APIs, or starts from scratch with no data sources. Budibase provides beautifully designed, powerful pre-made components with extensive CSS styling options. Automation capabilities include webhooks, email automation, and workflow triggers. It integrates with popular tools and allows self-hosting on your infrastructure with global user management, SMTP, app portals, theming, and role-based access control. Deployment options include Docker, Kubernetes, Digital Ocean, and Budibase Cloud. The platform includes a public API enabling Budibase as a backend and interoperability. With 111 contributors, Budibase is suitable for creating internal tools, CRUD applications, admin panels, and business applications with minimal coding.',
        isPremium: false
      },
      {
        title: 'ToolJet',
        description: 'Open-source low-code framework to build internal tools.',
        githubLink: 'https://github.com/ToolJet/ToolJet',
        downloadLink: 'https://github.com/ToolJet/ToolJet/archive/refs/heads/main.zip',
        license: 'GNU Affero General Public License v3.0',
        version: 'v3.20.41-lts',
        readme: 'ToolJet is the open-source foundation of ToolJet AI—the AI-native platform for building internal tools, dashboards, workflows, and AI agents with 36.8k stars. The Community Edition provides a visual app builder with 60+ responsive components (tables, charts, forms, lists, progress bars), built-in no-code database, multi-page apps, multiplayer editing, and 75+ data source connections. It supports flexible deployment (Docker, Kubernetes, AWS, GCP, Azure), collaboration tools with inline comments, and code-anywhere capability (JavaScript and Python). Security features include AES-256-GCM encryption, proxy-only data flow, and SSO support. The Enterprise ToolJet AI edition adds AI app generation from natural language, AI query builder, AI debugging, agent builder for workflow automation, enterprise-grade security (SOC 2, GDPR), advanced RBAC, multi-environment management, GitSync, CI/CD integration, white-labeling, embedded apps, and enterprise support. Installation is simple via Docker, with extensive documentation and tutorials available. Licensed under AGPL-3.0 with 652 contributors, ToolJet is suitable for building internal applications, admin panels, and workflow automation tools rapidly.',
        isPremium: true
      },
      {
        title: 'Flowise',
        description: 'Drag & drop UI to build your customized LLM flow.',
        githubLink: 'https://github.com/FlowiseAI/Flowise',
        downloadLink: 'https://github.com/FlowiseAI/Flowise/archive/refs/heads/main.zip',
        license: 'Other',
        version: 'flowise@3.0.11',
        readme: 'Flowise is a drag-and-drop UI tool for building customized LLM flows and AI applications with visual programming. It enables developers and non-developers alike to create AI agents, chatbots, and LLM-powered applications through an intuitive node-based interface. Key features include support for multiple LLM providers (OpenAI, Anthropic, Cohere, HuggingFace), vector databases for semantic search, memory management, tool integration, and agent orchestration. Flowise provides templates for common use cases like conversational AI, document Q&A, and data analysis. The platform supports both cloud deployment and self-hosting options via Docker or npm. With AgentFlow capabilities, users can create complex multi-agent workflows with conditional logic, iterations, and tool usage. Flowise integrates with various data sources, supports streaming responses, and provides credential management for secure API key handling. The project has an active community with regular updates and enterprise features available. Suitable for prototyping LLM applications, building chatbots, creating RAG systems, and developing AI-powered tools without extensive coding knowledge.',
        isPremium: false
      },
      {
        title: 'NocoDB',
        description: 'Open source Airtable alternative.',
        githubLink: 'https://github.com/nocodb/nocodb',
        downloadLink: 'https://github.com/nocodb/nocodb/archive/refs/heads/develop.zip',
        license: 'GNU Affero General Public License v3.0',
        version: '0.265.1',
        readme: 'NocoDB is the fastest and easiest way to build databases online, serving as an open-source Airtable alternative with 58.4k stars. It provides a rich spreadsheet interface for database operations including create, read, update, delete tables/columns/rows, with advanced features like sort, filter, group, hide/unhide columns. NocoDB supports multiple view types (Grid, Gallery, Form, Kanban, Calendar) with collaborative and locked view permissions. Users can share bases/views publicly or privately with password protection. The platform offers variant cell types (ID, Links, Lookup, Rollup, Text, Attachment, Currency, Formula, User) and fine-grained access control with roles. It includes an App Store for workflow automations integrating with Slack, Discord, AWS SES, SMTP, S3, Google Cloud Storage, and more. Programmatic access is available via REST APIs and NocoDB SDK. Installation options include Docker with SQLite/PostgreSQL, auto-install script, and binaries for various platforms. NocoDB\'s mission is to provide the most powerful no-code interface for databases as open source to every internet business. Licensed under AGPL-3.0 with 333 contributors, it\'s suitable for creating database-backed applications, internal tools, and data management systems.',
        isPremium: true
      },
      {
        title: 'Dify',
        description: 'Open-source LLM application development platform.',
        githubLink: 'https://github.com/langgenius/dify',
        downloadLink: 'https://github.com/langgenius/dify/archive/refs/heads/main.zip',
        license: 'Other',
        version: '1.10.0',
        readme: 'Dify is an open-source LLM app development platform combining AI workflow, RAG pipeline, agent capabilities, model management, and observability features all in one place. It enables rapid development of generative AI applications through visual orchestration of workflows, prompt engineering, RAG implementation, and agent creation. Key features include support for multiple LLM providers, visual workflow builder, knowledge base management with various embedding models and retrieval strategies, prompt engineering studio, AI agent development with function calling, and comprehensive monitoring/logging. Dify provides both cloud and self-hosted deployment options via Docker Compose or Kubernetes. The platform supports multiple scenarios including chatbots, text generation, workflow automation, and RAG applications. It offers API-first design enabling easy integration with existing applications, team collaboration features, and enterprise-grade security. Dify includes annotation and improvement features for continuous optimization of AI applications. The project has a large active community with frequent updates and multilingual support. Suitable for developers, product managers, and enterprises looking to build and deploy LLM-powered applications quickly without deep ML expertise. Licensed under Apache 2.0.',
        isPremium: false
      },
      {
        title: 'Awesome',
        description: 'Curated list of awesome lists.',
        githubLink: 'https://github.com/sindresorhus/awesome',
        downloadLink: 'https://github.com/sindresorhus/awesome/archive/refs/heads/main.zip',
        license: 'Creative Commons Zero v1.0 Universal',
        version: 'main',
        readme: 'Awesome is a curated list of awesome lists about all kinds of interesting topics with 416k stars, making it one of GitHub\'s most starred repositories. This meta-list aggregates thousands of high-quality, curated resources across technology, programming, development, science, business, and more. Categories include Platforms (Node.js, iOS, Android, Electron, AWS, Docker), Programming Languages (JavaScript, Python, Rust, Go, Java, C++, etc.), Front-End and Back-End Development, Computer Science (Machine Learning, Deep Learning, Data Science, Algorithms), Big Data, Databases, Security, Content Management Systems, Hardware, Gaming, Development Environment tools, Networking, Decentralized Systems, and miscellaneous topics. Each category contains links to carefully selected projects, tools, frameworks, libraries, articles, books, and resources. The awesome project has strict guidelines ensuring quality and relevance of listed items. With 615 contributors and available at awesome.re, it serves as the ultimate starting point for developers, students, and professionals seeking high-quality resources. Licensed under CC0-1.0 (public domain), allowing unrestricted use. The awesome concept has spawned thousands of derivative lists following the same curation philosophy.',
        isPremium: true
      },
      {
        title: 'Public APIs',
        description: 'A collective list of free APIs for use in software and web development.',
        githubLink: 'https://github.com/public-apis/public-apis',
        downloadLink: 'https://github.com/public-apis/public-apis/archive/refs/heads/master.zip',
        license: 'MIT License',
        version: 'master',
        readme: 'This repository is a collective list of free APIs for use in software and web development, providing a comprehensive catalog of public APIs across numerous categories. It includes thousands of APIs organized by category such as Animals, Anime, Anti-Malware, Art & Design, Authentication, Blockchain, Books, Business, Calendar, Cloud Storage, Cryptocurrency, Currency Exchange, Data Validation, Development, Dictionaries, Documents, Email, Entertainment, Environment, Events, Finance, Food & Drink, Games, Geocoding, Government, Health, Jobs, Machine Learning, Music, News, Open Data, Patent, Personality, Phone, Photography, Science & Math, Security, Shopping, Social, Sports, Test Data, Text Analysis, Tracking, Transportation, URL Shorteners, Vehicle, Video, Weather, and more. Each API listing includes information about authentication requirements (API Key, OAuth, None), HTTPS support, and CORS compatibility. The project helps developers discover and integrate third-party services into their applications. Community-maintained with automated validation, the repository ensures listed APIs are active and accurate. With millions of developers using this resource, it\'s become the go-to reference for finding public APIs.',
        isPremium: false
      },
      {
        title: 'System Design Primer',
        description: 'Learn how to design large-scale systems. Prep for the system design interview.',
        githubLink: 'https://github.com/donnemartin/system-design-primer',
        downloadLink: 'https://github.com/donnemartin/system-design-primer/archive/refs/heads/master.zip',
        license: 'Other',
        version: 'master',
        readme: 'The System Design Primer is a comprehensive, organized collection of resources to help engineers learn how to design large-scale systems and prepare for system design interviews with 324k stars. It covers fundamental concepts including scalability, performance vs. scalability, latency vs. throughput, availability vs. consistency (CAP theorem), consistency patterns (weak, eventual, strong), availability patterns (fail-over, replication), DNS, CDN, load balancers, reverse proxies, application layer architecture, microservices, databases (SQL and NoSQL, replication, federation, sharding, denormalization, SQL tuning), caching strategies, asynchronous processing, and communication protocols (TCP, UDP, RPC, REST). The repo provides a study guide tailored to different preparation timelines, step-by-step approaches to tackling system design questions, and common interview questions with detailed solutions (including Pastebin, Twitter timeline, web crawler, Mint.com, social network, key-value store, Amazon sales ranking, AWS scaling). It includes Anki flashcards for spaced repetition learning, links to real-world architectures and company engineering blogs, and object-oriented design questions. With 122 contributors and translations in 20+ languages, it\'s essential reading for software engineers preparing for technical interviews.',
        isPremium: true
      },
      {
        title: 'Developer Roadmap',
        description: 'Roadmap to becoming a developer in 2024.',
        githubLink: 'https://github.com/kamranahmedse/developer-roadmap',
        downloadLink: 'https://github.com/kamranahmedse/developer-roadmap/archive/refs/heads/master.zip',
        license: 'Other',
        version: '4.0',
        readme: 'Developer Roadmap is a community-driven project providing interactive roadmaps, guides, and educational content to help developers grow in their careers with 344k stars. The platform offers comprehensive learning paths for Frontend, Backend, DevOps, Full Stack, and specialized roles including specific technology roadmaps for JavaScript, TypeScript, Python, React, Node.js, Angular, Vue, Go, Rust, Java, PHP, C++, Android, iOS, Flutter, System Design, Kubernetes, Docker, AWS, PostgreSQL, MongoDB, Machine Learning, AI, Blockchain, Cyber Security, and many more. Each roadmap is now interactive with clickable nodes providing detailed information about topics. The project includes best practices guides for backend/frontend performance, code review, API security, and AWS. It also features question sets to test knowledge in JavaScript, Node.js, React, Backend, and Frontend. Roadmaps help developers understand what to learn next, in what order, and provide curated resources for each topic. With 1,431 contributors and hosted at roadmap.sh, the project is actively maintained with new roadmaps regularly added. It\'s an invaluable resource for developers at all levels planning their learning journey and career development.',
        isPremium: false
      },
      {
        title: 'Elasticsearch',
        description: 'Open source distributed, RESTful search and analytics engine.',
        githubLink: 'https://github.com/elastic/elasticsearch',
        downloadLink: 'https://github.com/elastic/elasticsearch/archive/refs/heads/main.zip',
        license: 'Other',
        version: 'v9.2.1',
        readme: 'Elasticsearch is a distributed search and analytics engine, scalable data store, and vector database optimized for speed and relevance on production-scale workloads with 75.3k stars. It forms the foundation of Elastic\'s Stack platform, enabling use cases including Retrieval Augmented Generation (RAG), vector search, full-text search, log analysis, metrics monitoring, application performance monitoring (APM), and security logs. Elasticsearch provides near real-time search over massive datasets, integrates with generative AI applications, and supports semantic search via vector embeddings. Key features include distributed architecture for scalability, RESTful API for easy integration, powerful query DSL, aggregations for analytics, machine learning capabilities, and support for structured and unstructured data. The platform offers both cloud-managed (Elasticsearch Service) and self-hosted deployment options. Elasticsearch uses Lucene as its core search library and supports data ingestion from various sources. It includes a trial enterprise license with features like security, alerting, machine learning, and graph analytics, reverting to open Basic license after trial. With 2,091 contributors, extensive documentation, and language clients for Java, Python, JavaScript, .NET, Ruby, Go, and PHP, Elasticsearch powers search and analytics for thousands of organizations globally.',
        isPremium: true
      },
      {
        title: 'Kubernetes',
        description: 'Production-Grade Container Orchestration.',
        githubLink: 'https://github.com/kubernetes/kubernetes',
        downloadLink: 'https://github.com/kubernetes/kubernetes/archive/refs/heads/master.zip',
        license: 'Apache License 2.0',
        version: 'v1.34.2',
        readme: 'Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. It\'s the industry-standard container orchestration platform, originally designed by Google and now maintained by the Cloud Native Computing Foundation (CNCF). Kubernetes groups containers into logical units called pods and provides declarative configuration for application deployment. Key features include automatic bin packing, self-healing, horizontal scaling, service discovery, load balancing, automated rollouts and rollbacks, secret and configuration management, storage orchestration, and batch execution. The platform supports multi-cloud and hybrid cloud deployments, providing a consistent API across environments. Kubernetes has a rich ecosystem of tools and extensions including Helm for package management, Istio for service mesh, Prometheus for monitoring, and countless operators for managing stateful applications. With a massive community, extensive documentation, and cloud provider integrations (GKE, EKS, AKS), Kubernetes has become essential infrastructure for modern cloud-native applications. Licensed under Apache 2.0 with thousands of contributors, it\'s continuously evolving with regular releases bringing new features and improvements.',
        isPremium: false
      },
      {
        title: 'React',
        description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
        githubLink: 'https://github.com/facebook/react',
        downloadLink: 'https://github.com/facebook/react/archive/refs/heads/main.zip',
        license: 'MIT License',
        version: 'v19.2.0',
        readme: 'React is a JavaScript library for building user interfaces, developed and maintained by Facebook (Meta) with 240k stars, making it one of the most popular frontend libraries. React\'s core philosophy is declarative, component-based, and "learn once, write anywhere." It makes creating interactive UIs painless through simple views for each application state, efficiently updating and rendering only necessary components when data changes. Components are encapsulated units managing their own state, composed to build complex UIs. Since logic is written in JavaScript (not templates), you can pass rich data through apps while keeping state out of the DOM. React can render on servers using Node.js and power mobile apps via React Native. Key features include JSX syntax, virtual DOM for performance, hooks for functional components, context API for state management, concurrent rendering, suspense for data fetching, and extensive ecosystem. React is used by millions of developers and powers countless websites and applications. The library is highly performant, has excellent documentation at react.dev, and a massive ecosystem of tools, libraries, and components. Licensed under MIT with 1,721 contributors, React continues to evolve with regular releases bringing new features like Server Components and improved performance.',
        isPremium: true
      }
  ],

  products: [
    {
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
      title: 'Cloud DevOps Solutions',
      description: 'Comprehensive DevOps services including CI/CD pipeline setup, infrastructure as code, container orchestration with Kubernetes, monitoring solutions, and automated deployment strategies. Transform your development workflow with enterprise-grade tools and best practices.'
    },
    {
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
      title: 'Mobile App Development Services',
      description: 'End-to-end mobile application development for iOS and Android platforms. Specializing in React Native and Flutter for cross-platform solutions, native Swift and Kotlin development, UI/UX design, API integration, and App Store deployment.'
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      title: 'Data Analytics & Business Intelligence',
      description: 'Advanced data analytics solutions leveraging machine learning and AI. Services include data warehouse design, ETL pipeline development, predictive analytics, custom dashboard creation with Power BI and Tableau, and actionable business insights.'
    },
    {
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
      title: 'Cybersecurity Consulting',
      description: 'Enterprise-grade security solutions including penetration testing, vulnerability assessments, security audit services, compliance consulting (GDPR, HIPAA, SOC 2), incident response planning, and employee security awareness training programs.'
    },
    {
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72',
      title: 'Custom Software Development',
      description: 'Tailored software solutions designed to meet specific business requirements. Full-stack development with modern frameworks, legacy system modernization, third-party integrations, scalable architecture design, and ongoing maintenance and support.'
    },
    {
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3',
      title: 'AI & Machine Learning Solutions',
      description: 'Cutting-edge artificial intelligence services including natural language processing, computer vision, recommendation engines, predictive modeling, chatbot development, and custom ML model training for your specific business use cases.'
    },
    {
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      title: 'Web Application Development',
      description: 'Modern web application development using React, Angular, Vue.js, and Node.js. Progressive Web Apps (PWA), responsive design, RESTful API development, microservices architecture, and high-performance web solutions for businesses of all sizes.'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
      title: 'Cloud Migration Services',
      description: 'Seamless cloud migration services for AWS, Azure, and Google Cloud Platform. Infrastructure assessment, migration strategy planning, data migration, application modernization, cost optimization, and post-migration support and monitoring.'
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
      title: 'IT Consulting & Strategy',
      description: 'Strategic IT consulting services to align technology with business goals. Digital transformation roadmaps, technology stack evaluation, software architecture design, vendor selection, project management, and CTO advisory services for startups and enterprises.'
    },
    {
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      title: 'Blockchain Development',
      description: 'Blockchain and distributed ledger technology solutions including smart contract development, DeFi applications, NFT marketplace creation, cryptocurrency wallet integration, private blockchain networks, and blockchain consulting services.'
    }
  ],

  comments: [
    {
      name: 'Alexandra Peterson',
      comment: 'Excellent service! The team delivered our project ahead of schedule with exceptional quality. Their attention to detail and proactive communication made the entire process smooth and professional.'
    },
    {
      name: 'Robert Chen',
      comment: 'Outstanding technical expertise and professionalism. The solution they provided exceeded our expectations and has significantly improved our operational efficiency. Highly recommend their services!'
    },
    {
      name: 'Jennifer Martinez',
      comment: 'Working with this team has been a game-changer for our business. Their innovative approach to problem-solving and deep technical knowledge helped us achieve results we didn\'t think were possible.'
    },
    {
      name: 'William Thompson',
      comment: 'The cloud migration service was flawless. Minimal downtime, comprehensive planning, and excellent post-migration support. Our infrastructure is now more scalable and cost-effective than ever.'
    },
    {
      name: 'Maria Rodriguez',
      comment: 'Impressive work on our mobile app development project. The app is intuitive, fast, and our users love it. The team\'s expertise in React Native really shows in the final product.'
    },
    {
      name: 'Christopher Lee',
      comment: 'Top-notch cybersecurity consulting. They identified vulnerabilities we weren\'t aware of and implemented robust security measures. We now feel confident about our data protection strategies.'
    },
    {
      name: 'Amanda Davis',
      comment: 'The AI solution they developed for our customer service has reduced response times by 60%. Their machine learning expertise is truly world-class. Very satisfied with the results!'
    },
    {
      name: 'Daniel Johnson',
      comment: 'Exceptional DevOps implementation. Our deployment process went from hours to minutes, and the CI/CD pipeline they set up is incredibly reliable. Worth every penny!'
    },
    {
      name: 'Michelle Wang',
      comment: 'Great experience with the data analytics service. The dashboards they created provide real-time insights that have transformed our decision-making process. Professional and knowledgeable team.'
    },
    {
      name: 'Kevin Anderson',
      comment: 'The custom software solution perfectly addresses our unique business requirements. The development process was transparent, and they were very receptive to our feedback throughout the project.'
    },
    {
      name: 'Rachel Foster',
      comment: 'Superb blockchain development services. They helped us launch our NFT marketplace with all the features we needed. Their understanding of smart contracts and Web3 technologies is impressive.'
    },
    {
      name: 'Thomas Bennett',
      comment: 'The IT consulting provided strategic direction that aligned perfectly with our business goals. Their recommendations have positioned us well for future growth and digital transformation.'
    }
  ]
};

module.exports = seedData;
