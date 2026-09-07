import type {
  PortfolioOverview,
  ContactSubmission,
  ContactMessage,
  AuditLog,
  DashboardSummary,
  AdminUser,
  Project,
  Skill,
  Experience,
  Education,
  Certificate,
  Achievement,
  Profile,
  MessageStatus,
  VisitorLog,
  AnalyticsSummary,
} from '../types/portfolio';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Baseline authentic data for Kanhaiya Pandey (used during initial SSR/static rendering or while backend boots)
export const DEFAULT_PORTFOLIO_DATA: PortfolioOverview = {
  profile: {
    fullName: 'Kanhaiya Pandey',
    title: 'Full-Stack Developer • DSA Enthusiast • Database & Applied ML Integrator',
    bio: 'Engineering resilient full-stack systems with strong Data Structures & Algorithms foundations, seamless database architectures, and applied machine learning capabilities.',
    aboutMarkdown:
      'I am a passionate Software Engineer focused on building robust full-stack applications and solving real-world problems. With strong foundations in Data Structures & Algorithms, Java, Spring Boot, and modern React, I enjoy crafting seamless user experiences backed by reliable database architectures.\n\nAlways excited to learn new technologies, build scalable systems, and collaborate on high-impact projects.',
    avatarUrl: '/assets/kanhaiya_real.jpg',
    availabilityStatus: 'Available for Full-Stack & AI Roles',
    location: 'Chengalpattu, Chennai, Tamil Nadu',
    email: 'kanhaiya542112@gmail.com',
    phone: '+91 9801573326',
    whatsapp: '+91 9801573326',
    linkedinUrl: 'https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/',
    githubUrl: 'https://github.com/kanhaiya28pandey/',
    coffeeUrl: 'pandey123@okhdfcbank',
  },
  skills: [
    // --- CORE & BACKEND TECHNOLOGIES ---
    {
      id: 1,
      name: 'Java',
      category: 'BACKEND',
      proficiencyLevel: 'ADVANCED',
      proficiencyPercentage: 85,
      description: 'Core Java, OOP principles, Collections framework, Multithreading, Concurrency, Lambda expressions and Streams.',
      iconKey: 'java',
      displayOrder: 1,
      status: 'PUBLISHED',
      relatedConcepts: ['OOP', 'Collections', 'Multithreading', 'Streams', 'Concurrency'],
      usedInProjects: ['Digital Universe Portfolio', 'JobFit AI (Resume Analyzer)'],
    },
    {
      id: 2,
      name: 'DSA',
      category: 'CORE',
      proficiencyLevel: 'ADVANCED',
      description: 'Data Structures & Algorithms: trees, graphs, dynamic programming, algorithmic efficiency, and memory optimization.',
      iconKey: 'dsa',
      displayOrder: 2,
      status: 'PUBLISHED',
      relatedConcepts: ['Time & Space Complexity', 'Dynamic Programming', 'Graph & Tree Traversals', 'Binary Search & Sorting'],
      usedInProjects: ['150+ DSA Problems Solved', 'Competitive Programming Lab'],
    },
    {
      id: 3,
      name: 'OOP',
      category: 'CORE',
      proficiencyLevel: 'ADVANCED',
      description: 'Object-Oriented Programming: modular system decomposition, SOLID principles, design patterns, and clean architecture.',
      iconKey: 'oop',
      displayOrder: 3,
      status: 'PUBLISHED',
      relatedConcepts: ['SOLID Principles', 'Inheritance & Polymorphism', 'Encapsulation & Abstraction', 'Design Patterns'],
      usedInProjects: ['Enterprise Spring Boot Architectures', 'Modular Full-Stack Systems'],
    },
    {
      id: 4,
      name: 'Problem Solving',
      category: 'CORE',
      proficiencyLevel: 'ADVANCED',
      description: 'Analytical problem solving, edge-case mitigation, competitive logic, and production system debugging.',
      iconKey: 'problem-solving',
      displayOrder: 4,
      status: 'PUBLISHED',
      relatedConcepts: ['Algorithmic Logic', 'Edge-Case Analysis', 'System Optimization', 'Mathematical Thinking'],
      usedInProjects: ['LeetCode / GFG Competitive Profiles', 'ResumeIQ (JobFit AI)'],
    },
    {
      id: 5,
      name: 'Python',
      category: 'CORE',
      proficiencyLevel: 'ADVANCED',
      description: 'Python scripting, data structures, automation pipelines, and machine learning libraries.',
      iconKey: 'python',
      displayOrder: 5,
      status: 'PUBLISHED',
      relatedConcepts: ['Data Processing Pipelines', 'Sentence-Transformers', 'Vector Embeddings', 'Analytical Scripting'],
      usedInProjects: ['ResumeIQ (JobFit AI)', 'Student Performance Analytics System'],
    },
    {
      id: 6,
      name: 'C & C++',
      category: 'CORE',
      proficiencyLevel: 'INTERMEDIATE',
      description: 'Foundational systems programming, memory management, pointers, and algorithmic implementation.',
      iconKey: 'cpp',
      displayOrder: 6,
      status: 'PUBLISHED',
      relatedConcepts: ['Pointers & Memory Allocation', 'Low-Level Data Structures', 'Standard Template Library (STL)', 'Efficient I/O'],
      usedInProjects: ['Academic Systems Labs', 'DSA Foundations'],
    },

    // --- BACKEND TECHNOLOGIES (Middle Orbit) ---
    {
      id: 7,
      name: 'Spring Boot',
      category: 'BACKEND',
      proficiencyLevel: 'ADVANCED',
      description: 'Production backend engineering: Spring MVC, Spring Data JPA, Actuator, and microservice architectures.',
      iconKey: 'spring',
      displayOrder: 7,
      status: 'PUBLISHED',
      relatedConcepts: ['Dependency Injection', 'Spring MVC Controllers', 'Data JPA Repositories', 'Auto-Configuration'],
      usedInProjects: ['Digital Universe Portfolio & CMS', 'Production REST Services'],
    },
    {
      id: 8,
      name: 'Spring Security',
      category: 'BACKEND',
      proficiencyLevel: 'ADVANCED',
      description: 'Stateless JWT & cookie security, password encryption, role-based access control (RBAC), and brute-force protection.',
      iconKey: 'security',
      displayOrder: 8,
      status: 'PUBLISHED',
      relatedConcepts: ['HttpOnly Cookies', 'CSRF Protection', 'Authentication Filters', 'Brute-Force Rate Limiting'],
      usedInProjects: ['Digital Universe Portfolio & CMS'],
    },
    {
      id: 9,
      name: 'REST APIs',
      category: 'BACKEND',
      proficiencyLevel: 'ADVANCED',
      description: 'Stateless RESTful endpoint design, standard HTTP status codes, DTO mapping, and OpenAPI contracts.',
      iconKey: 'api',
      displayOrder: 9,
      status: 'PUBLISHED',
      relatedConcepts: ['HTTP Verbs & Status Codes', 'DTO Layering', 'Stateless Architecture', 'Error Response Schema'],
      usedInProjects: ['Digital Universe Portfolio & CMS', 'ResumeIQ (JobFit AI)'],
    },
    {
      id: 10,
      name: 'Hibernate / JPA',
      category: 'BACKEND',
      proficiencyLevel: 'ADVANCED',
      description: 'Object-Relational Mapping (ORM), entity relationships, lazy/eager loading, transactions, and caching.',
      iconKey: 'hibernate',
      displayOrder: 10,
      status: 'PUBLISHED',
      relatedConcepts: ['ORM Mapping', 'Entity Lifecycle', 'JPA Query Methods', 'Transaction Management'],
      usedInProjects: ['Digital Universe Portfolio & CMS'],
    },
    {
      id: 11,
      name: 'FastAPI',
      category: 'CORE',
      proficiencyLevel: 'INTERMEDIATE',
      proficiencyPercentage: 78,
      description: 'Modern asynchronous Python REST API framework, Pydantic schemas, and fast ML inference microservices.',
      iconKey: 'fastapi',
      displayOrder: 11,
      status: 'PUBLISHED',
      relatedConcepts: ['Async / Await Defs', 'Pydantic Data Validation', 'Automatic OpenAPI Docs', 'ML Model Serving'],
      usedInProjects: ['ResumeIQ (JobFit AI)'],
    },

    // --- FRONTEND TECHNOLOGIES (5) ---
    {
      id: 12,
      name: 'React',
      category: 'FRONTEND',
      proficiencyLevel: 'ADVANCED',
      proficiencyPercentage: 85,
      description: 'Modern component-driven UI development, hooks, state machines, Virtual DOM, and responsive glassmorphism.',
      iconKey: 'react',
      displayOrder: 12,
      status: 'PUBLISHED',
      relatedConcepts: ['Custom Hooks & Context', 'Component Lifecycle', 'Virtual DOM Diffing', 'State Management'],
      usedInProjects: ['Digital Universe Portfolio & CMS', 'ResumeIQ (JobFit AI)'],
    },
    {
      id: 13,
      name: 'TypeScript',
      category: 'FRONTEND',
      proficiencyLevel: 'ADVANCED',
      proficiencyPercentage: 82,
      description: 'Strict type systems, custom interfaces, generics, union types, and robust compile-time safety.',
      iconKey: 'typescript',
      displayOrder: 13,
      status: 'PUBLISHED',
      relatedConcepts: ['Static Typing', 'Generics & Utility Types', 'Interface Contracts', 'Strict Null Safety'],
      usedInProjects: ['Digital Universe Portfolio & CMS', 'ResumeIQ (JobFit AI)'],
    },
    {
      id: 14,
      name: 'JavaScript',
      category: 'FRONTEND',
      proficiencyLevel: 'ADVANCED',
      proficiencyPercentage: 88,
      description: 'Modern ES6+, closures, promises, async/await, DOM APIs, and functional programming patterns.',
      iconKey: 'javascript',
      displayOrder: 14,
      status: 'PUBLISHED',
      relatedConcepts: ['ES6+ Syntax', 'Promises & Async/Await', 'Event Delegation', 'Functional Array Methods'],
      usedInProjects: ['All Web Applications'],
    },
    {
      id: 15,
      name: 'HTML5',
      category: 'FRONTEND',
      proficiencyLevel: 'ADVANCED',
      proficiencyPercentage: 90,
      description: 'Semantic HTML5 structure, modern layout tags, responsive accessibility, and fluid standards.',
      iconKey: 'html',
      displayOrder: 15,
      status: 'PUBLISHED',
      relatedConcepts: ['Semantic Elements', 'Web Accessibility (a11y)', 'DOM Structure', 'Modern Web Standards'],
      usedInProjects: ['All Web Applications'],
    },
    {
      id: 16,
      name: 'CSS3',
      category: 'FRONTEND',
      proficiencyLevel: 'ADVANCED',
      proficiencyPercentage: 88,
      description: 'Modern CSS3 layout (Flexbox/Grid), Tailwind utilities, glassmorphic styling, and fluid responsive animations.',
      iconKey: 'css',
      displayOrder: 16,
      status: 'PUBLISHED',
      relatedConcepts: ['Flexbox & CSS Grid', 'Backdrop Filters', 'CSS Custom Properties', 'Responsive Breakpoints'],
      usedInProjects: ['All Frontend Projects'],
    },

    // --- DATABASE TECHNOLOGIES (Outer Orbit) ---
    {
      id: 17,
      name: 'PostgreSQL',
      category: 'DATABASE',
      proficiencyLevel: 'ADVANCED',
      description: 'Relational database schema modeling, indexing, joins, transactions, and query optimization.',
      iconKey: 'postgresql',
      displayOrder: 17,
      status: 'PUBLISHED',
      relatedConcepts: ['Relational Schema Design', 'B-Tree Indexing', 'ACID Transactions', 'Query Optimization'],
      usedInProjects: ['Digital Universe Portfolio & CMS'],
    },
    {
      id: 18,
      name: 'MySQL',
      category: 'DATABASE',
      proficiencyLevel: 'ADVANCED',
      description: 'Normalized database design, relational foreign keys, complex joins, and stored queries.',
      iconKey: 'mysql',
      displayOrder: 18,
      status: 'PUBLISHED',
      relatedConcepts: ['Relational Normalization', 'Complex SQL Joins', 'Primary & Foreign Keys', 'Data Integrity'],
      usedInProjects: ['Student Performance Analytics System'],
    },
    {
      id: 19,
      name: 'MongoDB',
      category: 'DATABASE',
      proficiencyLevel: 'ADVANCED',
      description: 'NoSQL document database, schema design, aggregation pipelines, and persistent cloud storage.',
      iconKey: 'mongodb',
      displayOrder: 19,
      status: 'PUBLISHED',
      relatedConcepts: ['Document Data Modeling', 'Aggregation Framework', 'Index Optimization', 'Atlas Cloud Persistence'],
      usedInProjects: ['ResumeIQ (JobFit AI)'],
    },

    // --- TOOLS & WORKFLOW (Outer Orbit) ---
    {
      id: 20,
      name: 'Git & GitHub',
      category: 'TOOLS',
      proficiencyLevel: 'ADVANCED',
      description: 'Version control, feature branching, pull request workflows, merge conflict resolution, and CI/CD foundations.',
      iconKey: 'git',
      displayOrder: 20,
      status: 'PUBLISHED',
      relatedConcepts: ['Branching Workflows', 'Commit Conventions', 'Pull Requests & Code Reviews', 'Repository Management'],
      usedInProjects: ['All Projects & Open Source Repositories'],
    },
    {
      id: 21,
      name: 'Docker',
      category: 'TOOLS',
      proficiencyLevel: 'INTERMEDIATE',
      description: 'Containerization, Dockerfile multi-stage builds, container isolation, and reproducible deployments.',
      iconKey: 'docker',
      displayOrder: 21,
      status: 'PUBLISHED',
      relatedConcepts: ['Multi-Stage Dockerfiles', 'Container Networking', 'Volume Mounts', 'Image Optimization'],
      usedInProjects: ['Microservice Deployments'],
    },
    {
      id: 22,
      name: 'Postman',
      category: 'TOOLS',
      proficiencyLevel: 'ADVANCED',
      description: 'API testing, collection runner, environment variables, automated response assertions, and documentation.',
      iconKey: 'postman',
      displayOrder: 22,
      status: 'PUBLISHED',
      relatedConcepts: ['API Request Testing', 'Environment Variables', 'Response Status Assertions', 'Mocking & Collections'],
      usedInProjects: ['Spring Boot API Verification', 'FastAPI Testing'],
    },
    {
      id: 23,
      name: 'VS Code',
      category: 'TOOLS',
      proficiencyLevel: 'ADVANCED',
      description: 'Modern developer workflow: integrated debugging, Git lens, linting configurations, and productivity extensions.',
      iconKey: 'vscode',
      displayOrder: 23,
      status: 'PUBLISHED',
      relatedConcepts: ['Integrated Debugging', 'Extensions Ecosystem', 'Keyboard Workflows', 'Workspace Configs'],
      usedInProjects: ['Primary Development Environment'],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'ResumeIQ — AI Resume Analyzer & ATS Score Engine',
      slug: 'resumeiq',
      summary:
        'AI-powered resume analysis platform that evaluates ATS compatibility, identifies missing skills with semantic matching, and generates automated improvement roadmaps using Google Gemini AI.',
      descriptionMarkdown:
        '### Intelligent Resume & ATS Optimization Platform\nResumeIQ combines traditional ATS parsing with modern generative AI and sentence transformers to evaluate resumes against target job descriptions with deep semantic precision.\n\n### Key Highlights\n- **Multimodal Document Parsing**: High-fidelity text extraction from PDF and DOCX files using PDFPlumber and Python-DOCX.\n- **Semantic Vector Similarity**: Sentence-transformer embeddings analyze contextual relevance beyond basic keyword matching.\n- **Automated ATS Scoring Engine**: Evaluates section structure, formatting, quantifiable achievements, and contact health.\n- **Google Gemini AI Recommendations**: Generates candidate strengths, weaknesses, actionable suggestions, and tailored cover letters.\n- **Interactive Analytics Dashboard**: Visualizes match trends, ATS grade distributions, and missing skill heatmaps with Recharts.\n\n### Tech Stack\nReact 19, Vite, FastAPI, Python, Google Gemini AI, Sentence Transformers, MongoDB, ATS Engine.',
      thumbnailUrl: '/assets/projects/resumeiq.jpg',
      bannerUrl: '/assets/projects/resumeiq.jpg',
      liveUrl: '',
      githubUrl: 'https://github.com/kanhaiya28pandey/ResumeIQ',
      category: 'AI / ML',
      isFeatured: true,
      displayOrder: 1,
      status: 'PUBLISHED',
      tag: '2026',
      skills: [
        { id: 101, name: 'React 19', category: 'FRONTEND', proficiencyLevel: 'ADVANCED', displayOrder: 1, status: 'PUBLISHED' },
        { id: 102, name: 'FastAPI', category: 'BACKEND', proficiencyLevel: 'ADVANCED', displayOrder: 2, status: 'PUBLISHED' },
        { id: 103, name: 'Python', category: 'CORE', proficiencyLevel: 'ADVANCED', displayOrder: 3, status: 'PUBLISHED' },
        { id: 104, name: 'Gemini AI', category: 'AI / ML', proficiencyLevel: 'ADVANCED', displayOrder: 4, status: 'PUBLISHED' },
        { id: 105, name: 'MongoDB', category: 'DATABASE', proficiencyLevel: 'ADVANCED', displayOrder: 5, status: 'PUBLISHED' },
      ],
    },
    {
      id: 2,
      title: 'YourTube — Full-Stack Video Streaming Platform',
      slug: 'youtube-clone',
      summary:
        'Feature-rich YouTube-style video streaming platform with video upload/playback, OTP authentication, Razorpay payments, premium subscriptions, watch history, and WebRTC video calling.',
      descriptionMarkdown:
        '### High-Performance Media Streaming & Social Interaction Engine\nYourTube delivers a production-ready video sharing experience built with Next.js 15, Node.js, Express, and MongoDB.\n\n### Key Highlights\n- **Video Processing & Adaptive Streaming**: Chunked video uploads, stream playback, and responsive media controls.\n- **Secure Authentication & Phone OTP**: Multi-tier authentication with JWT, Twilio SMS/OTP verification, and email alerts.\n- **Monetization & Razorpay Integration**: Premium subscriber plans, checkout workflow, and automated payment verification.\n- **Real-Time Communication**: Peer-to-peer video calling powered by WebRTC and instant notifications via Socket.IO.\n- **Social Engagement**: Nested comments, likes/dislikes, watch later playlists, and chronological watch history tracking.\n\n### Tech Stack\nNext.js 15, React 19, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS, Razorpay, Socket.IO, WebRTC.',
      thumbnailUrl: '/assets/projects/youtube_clone.jpg',
      bannerUrl: '/assets/projects/youtube_clone.jpg',
      liveUrl: 'https://youtube-clone-xi-teal.vercel.app',
      githubUrl: 'https://github.com/kanhaiya28pandey/youtube-clone',
      category: 'FULLSTACK',
      isFeatured: true,
      displayOrder: 2,
      status: 'PUBLISHED',
      tag: '2026',
      skills: [
        { id: 201, name: 'Next.js 15', category: 'FRONTEND', proficiencyLevel: 'ADVANCED', displayOrder: 1, status: 'PUBLISHED' },
        { id: 202, name: 'React 19', category: 'FRONTEND', proficiencyLevel: 'ADVANCED', displayOrder: 2, status: 'PUBLISHED' },
        { id: 203, name: 'TypeScript', category: 'FRONTEND', proficiencyLevel: 'ADVANCED', displayOrder: 3, status: 'PUBLISHED' },
        { id: 204, name: 'Node.js', category: 'BACKEND', proficiencyLevel: 'ADVANCED', displayOrder: 4, status: 'PUBLISHED' },
        { id: 205, name: 'MongoDB', category: 'DATABASE', proficiencyLevel: 'ADVANCED', displayOrder: 5, status: 'PUBLISHED' },
        { id: 206, name: 'Razorpay', category: 'TOOLS', proficiencyLevel: 'ADVANCED', displayOrder: 6, status: 'PUBLISHED' },
      ],
    },
    {
      id: 3,
      title: 'Enterprise Digital Banking & Security System',
      slug: 'banking-system',
      summary:
        'Enterprise-grade banking and transaction platform featuring 6-layer transaction validation, 5 automated fraud detection algorithms, role-based access control (RBAC), multi-step KYC, and immutable audit logs.',
      descriptionMarkdown:
        '### Mission-Critical Financial Transaction Architecture\nAn enterprise-grade financial core built with Spring Boot 3.2, Spring Security, MongoDB, and React 19 + Redux Toolkit.\n\n### Key Highlights\n- **6-Layer Transaction Security**: Multi-tier verification pipeline validating balance constraints, transaction limits, and OTP authorizations.\n- **Algorithmic Fraud Detection**: 5 real-time anomaly detection rules tracking rapid transfers, abnormal geographical shifts, and frequency spikes.\n- **Real-Time Balance Synchronization**: Spring WebSocket endpoints pushing immediate ledger balance updates to active user sessions.\n- **Multi-Step KYC Onboarding**: Comprehensive customer registration with document verification and account state machines.\n- **Tamper-Evident Audit Trails**: Immutable event logging for sensitive operations, administrative overrides, and transaction lifecycles.\n\n### Tech Stack\nJava 17, Spring Boot 3.2, Spring Security, JWT, MongoDB, React 19, TypeScript, Redux Toolkit, WebSocket.',
      thumbnailUrl: '/assets/projects/banking_system.jpg',
      bannerUrl: '/assets/projects/banking_system.jpg',
      liveUrl: '',
      githubUrl: 'https://github.com/kanhaiya28pandey/banking-system',
      category: 'BACKEND',
      isFeatured: true,
      displayOrder: 3,
      status: 'PUBLISHED',
      tag: '2026',
      skills: [
        { id: 301, name: 'Java 17', category: 'BACKEND', proficiencyLevel: 'ADVANCED', displayOrder: 1, status: 'PUBLISHED' },
        { id: 302, name: 'Spring Boot', category: 'BACKEND', proficiencyLevel: 'ADVANCED', displayOrder: 2, status: 'PUBLISHED' },
        { id: 303, name: 'Spring Security', category: 'BACKEND', proficiencyLevel: 'ADVANCED', displayOrder: 3, status: 'PUBLISHED' },
        { id: 304, name: 'MongoDB', category: 'DATABASE', proficiencyLevel: 'ADVANCED', displayOrder: 4, status: 'PUBLISHED' },
        { id: 305, name: 'TypeScript', category: 'FRONTEND', proficiencyLevel: 'ADVANCED', displayOrder: 5, status: 'PUBLISHED' },
      ],
    },
    {
      id: 4,
      title: 'Student Performance Analytics & Prediction System',
      slug: 'student-performance-system',
      summary:
        'Machine learning-driven academic intelligence platform that predicts student academic outcomes, identifies at-risk students, and provides actionable performance analytics using Flask, MySQL, and Scikit-Learn.',
      descriptionMarkdown:
        '### Predictive Educational Analytics & Risk Early-Warning Engine\nAn academic intelligence platform designed to empower educators with data-driven predictive student performance forecasting.\n\n### Key Highlights\n- **Predictive Machine Learning Pipeline**: Scikit-Learn regression and classification models trained on historical student assessment records.\n- **At-Risk Student Identification**: Automated early-warning indicators highlighting students needing academic intervention.\n- **Relational Data Modeling**: Structured MySQL schema with Flask-SQLAlchemy migrations and JWT authenticated teacher/student portals.\n- **Actionable Diagnostic Dashboards**: Subject score breakdowns, attendance correlation charts, and semester progress tracking.\n- **Automated Grade Reports**: Summary exports and analytical performance digests for academic advisors.\n\n### Tech Stack\nPython, Flask, Flask-SQLAlchemy, MySQL, Pandas, NumPy, Scikit-Learn, React, JWT.',
      thumbnailUrl: '/assets/projects/student_system.jpg',
      bannerUrl: '/assets/projects/student_system.jpg',
      liveUrl: '',
      githubUrl: 'https://github.com/kanhaiya28pandey/student-performance-system',
      category: 'AI / ML',
      isFeatured: true,
      displayOrder: 4,
      status: 'PUBLISHED',
      tag: '2026',
      skills: [
        { id: 401, name: 'Python', category: 'CORE', proficiencyLevel: 'ADVANCED', displayOrder: 1, status: 'PUBLISHED' },
        { id: 402, name: 'Flask', category: 'BACKEND', proficiencyLevel: 'ADVANCED', displayOrder: 2, status: 'PUBLISHED' },
        { id: 403, name: 'Scikit-Learn', category: 'AI / ML', proficiencyLevel: 'ADVANCED', displayOrder: 3, status: 'PUBLISHED' },
        { id: 404, name: 'MySQL', category: 'DATABASE', proficiencyLevel: 'ADVANCED', displayOrder: 4, status: 'PUBLISHED' },
        { id: 405, name: 'React', category: 'FRONTEND', proficiencyLevel: 'ADVANCED', displayOrder: 5, status: 'PUBLISHED' },
      ],
    },
  ],
  experiences: [
    {
      id: 1,
      organization: 'ElevanceSkill',
      role: 'Full-Stack Web Development Intern',
      location: 'Remote, India',
      duration: 'Jun 2024 – Aug 2024',
      employmentType: 'Fully Remote',
      assignedProjectName: 'YourTube (YouTube Clone Platform)',
      assignedProjectSlug: 'youtube-clone',
      technologies: 'Next.js 15, React 19, TypeScript, Node.js, Express, MongoDB, Razorpay, WebRTC, Socket.IO',
      certificatesJson: JSON.stringify([
        { title: 'Completion Certificate', fileUrl: '/assets/certificates/elevanceskill_certificate.pdf', type: 'CERTIFICATE' },
        { title: 'Experience Letter', fileUrl: '/assets/certificates/elevanceskill_experience_letter.pdf', type: 'LETTER' },
        { title: 'Letter of Recommendation (LOR)', fileUrl: '/assets/certificates/elevanceskill_lor.pdf', type: 'LOR' },
      ]),
      descriptionMarkdown:
        'Joined ElevanceSkill as a Full-Stack Web Development Intern to build high-performance streaming architectures.\nArchitected and engineered "YourTube", an end-to-end media streaming platform replicating production YouTube capabilities.\nEngineered chunked multipart video upload processing and responsive video playback using Next.js 15, Node.js, and Express.\nIntegrated JWT authentication with multi-factor SMS/phone OTP verification for zero-trust user onboarding.\nConfigured Razorpay payment workflows for premium channel subscriptions and automated billing pipelines.\nImplemented real-time WebRTC peer-to-peer calling and Socket.IO instant messaging and notification hubs.',
      isCurrent: false,
      displayOrder: 1,
      status: 'PUBLISHED',
    },
    {
      id: 2,
      organization: 'Google AI-ML • EduSkills Foundation',
      role: 'Artificial Intelligence & Machine Learning Intern',
      location: 'Virtual / Remote, India',
      duration: 'Jul 2024 – Sep 2024',
      employmentType: 'Virtual Internship',
      assignedProjectName: undefined,
      assignedProjectSlug: undefined,
      technologies: 'Python, Machine Learning, TensorFlow, Scikit-Learn, Pandas, NumPy, Deep Learning, Model Evaluation',
      certificatesJson: JSON.stringify([
        { title: 'Google AI-ML Internship Certificate', fileUrl: '/assets/certificates/google_aiml_eduskills_certificate.pdf', type: 'CERTIFICATE' },
      ]),
      descriptionMarkdown:
        'Selected for the Google for Developers & EduSkills Foundation artificial intelligence and machine learning industry internship track.\nEngineered end-to-end predictive modeling pipelines using Scikit-Learn regression, classification, and clustering algorithms.\nBuilt and fine-tuned neural network architectures with TensorFlow and Keras for pattern recognition and image classification.\nExecuted automated exploratory data analysis (EDA), statistical validation, missing value imputation, and feature scaling with Pandas.\nConducted hyperparameter grid searches, ROC-AUC curve analysis, and confusion matrix evaluations for production readiness.\nCollaborated in technical mentorship sessions, code reviews, and industry evaluation milestones under Google engineering mentors.',
      isCurrent: false,
      displayOrder: 2,
      status: 'PUBLISHED',
    },
    {
      id: 3,
      organization: 'Palo Alto Networks • EduSkills Foundation',
      role: 'Cybersecurity Virtual Intern',
      location: 'Virtual / Remote, India',
      duration: 'Jan 2024 – Mar 2024',
      employmentType: 'Virtual Internship',
      assignedProjectName: undefined,
      assignedProjectSlug: undefined,
      technologies: 'Network Security, Next-Gen Firewalls, Cloud Security, SOC Operations, AI Cyber Defense, Zero Trust, Threat Intelligence',
      certificatesJson: JSON.stringify([
        { title: 'Cybersecurity Fundamentals', fileUrl: '/assets/certificates/paloalto_cybersecurity_fundamentals.pdf', type: 'CERTIFICATE' },
        { title: 'Network Security Fundamentals', fileUrl: '/assets/certificates/paloalto_network_security.pdf', type: 'CERTIFICATE' },
        { title: 'Cloud Security Fundamentals', fileUrl: '/assets/certificates/paloalto_cloud_security.pdf', type: 'CERTIFICATE' },
        { title: 'SOC Operations Fundamentals', fileUrl: '/assets/certificates/paloalto_soc_operations.pdf', type: 'CERTIFICATE' },
        { title: 'AI in Cybersecurity Fundamentals', fileUrl: '/assets/certificates/paloalto_ai_cybersecurity.pdf', type: 'CERTIFICATE' },
        { title: 'Final EduSkills Internship Certificate', fileUrl: '/assets/certificates/paloalto_eduskills_final.pdf', type: 'CERTIFICATE' },
      ]),
      descriptionMarkdown:
        'Completed the enterprise cybersecurity virtual internship conducted by Palo Alto Networks Academy and EduSkills Foundation.\nMastered Next-Generation Firewall (NGFW) configuration, granular traffic inspection, and encrypted tunnel enforcement.\nConducted cloud security posture assessments, evaluating attack surface reduction and micro-segmentation policies.\nPerformed Security Operations Center (SOC) triage, multi-source log correlation, threat hunting, and automated incident alerting.\nExplored predictive AI models for behavioral threat intelligence, anomaly detection, and automated zero-day mitigation.\nSuccessfully earned 5 official Palo Alto Networks Academy credentials plus the comprehensive EduSkills final internship certificate.',
      isCurrent: false,
      displayOrder: 3,
      status: 'PUBLISHED',
    },
  ],
  educations: [
    {
      id: 1,
      institution: 'SRM Institute of Science and Technology, Kattankulathur, Chennai, Tamil Nadu',
      degree: 'Master of Computer Applications (MCA)',
      fieldOfStudy: 'Computer Applications & Software Engineering',
      duration: '2025 – 2027 (Present)',
      gradeOrPercentage: 'CGPA: 9.885',
      description:
        'Advanced graduate coursework focusing on Data Structures & Algorithms, Distributed Backend Systems, Database Architecture, Cloud Computing, and Scalable Full-Stack Engineering.',
      displayOrder: 1,
      status: 'PUBLISHED',
      certificatesJson: JSON.stringify([
        { title: 'Semester Grade Card / Marksheet', fileUrl: '/assets/certificates/srm_mca_grade_card.pdf', type: 'MARKSHEET' },
        { title: 'Student Identity & Enrollment Verification', fileUrl: '/assets/certificates/srm_student_id.pdf', type: 'CERTIFICATE' },
      ]),
    },
    {
      id: 2,
      institution: 'Sardar Vallabh Bhai Patel College, Bhabua (Kaimur), Bihar / Veer Kunwar Singh University',
      degree: 'Bachelor of Computer Applications (BCA)',
      fieldOfStudy: 'Computer Applications',
      duration: '2021 – 2024',
      gradeOrPercentage: '74.52% (First Class)',
      description:
        'Comprehensive undergraduate curriculum covering Object-Oriented Programming (Java & C++), Data Structures, Relational Database Management Systems (SQL), Web Technologies, and Software Project Development.',
      displayOrder: 2,
      status: 'PUBLISHED',
      certificatesJson: JSON.stringify([
        { title: 'BCA Degree Certificate', fileUrl: '/assets/certificates/bca_degree_certificate.pdf', type: 'CERTIFICATE' },
        { title: 'Consolidated Final Marksheet', fileUrl: '/assets/certificates/bca_consolidated_marksheet.pdf', type: 'MARKSHEET' },
      ]),
    },
    {
      id: 3,
      institution: 'Atal Bihari Singh High School, Bhabua (Kaimur), Bihar / BSEB',
      degree: 'Senior Secondary (12th / Intermediate in Science)',
      fieldOfStudy: 'Physics, Chemistry & Mathematics (PCM)',
      duration: '2019 – 2021',
      gradeOrPercentage: '71% (First Division)',
      description:
        'Higher secondary curriculum specializing in advanced Mathematics, Physics, Chemistry, and analytical problem solving with First Division honors.',
      displayOrder: 3,
      status: 'PUBLISHED',
      certificatesJson: JSON.stringify([
        { title: '12th Board Marksheet', fileUrl: '/assets/certificates/12th_board_marksheet.pdf', type: 'MARKSHEET' },
        { title: '12th Passing Certificate', fileUrl: '/assets/certificates/12th_passing_certificate.pdf', type: 'CERTIFICATE' },
      ]),
    },
    {
      id: 4,
      institution: 'Atal Bihari Singh High School, Bhabua (Kaimur), Bihar / BSEB',
      degree: 'Secondary School Examination (10th / Matriculation)',
      fieldOfStudy: 'General Science, Mathematics & Social Studies',
      duration: '2017 – 2019',
      gradeOrPercentage: 'First Division',
      description:
        'Foundational academic education with focus on Mathematics, Science, and Social Sciences, completed with First Division distinction.',
      displayOrder: 4,
      status: 'PUBLISHED',
      certificatesJson: JSON.stringify([
        { title: '10th Board Marksheet', fileUrl: '/assets/certificates/10th_board_marksheet.pdf', type: 'MARKSHEET' },
        { title: '10th Matriculation Passing Certificate', fileUrl: '/assets/certificates/10th_passing_certificate.pdf', type: 'CERTIFICATE' },
      ]),
    },
  ],
  certificates: [
    {
      id: 1,
      title: 'OpenAI & Generative AI',
      issuingOrg: 'SRM University',
      issueDate: '2025',
      credentialUrl: 'https://www.srmist.edu.in',
      iconKey: 'brain',
      displayOrder: 1,
      status: 'PUBLISHED',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      issuingOrg: 'Oasis Technologies Pvt. Ltd.',
      issueDate: '2024',
      credentialUrl: '/assets/certificates/oasis_fullstack_certificate.pdf',
      iconKey: 'layers',
      displayOrder: 2,
      status: 'PUBLISHED',
    },
    {
      id: 3,
      title: 'Microsoft Python',
      issuingOrg: 'Microsoft',
      issueDate: '2025',
      credentialUrl: 'https://learn.microsoft.com',
      iconKey: 'terminal',
      displayOrder: 3,
      status: 'PUBLISHED',
    },
    {
      id: 4,
      title: 'Web Development with Python',
      issuingOrg: 'Microsoft',
      issueDate: '2025',
      credentialUrl: 'https://learn.microsoft.com',
      iconKey: 'globe',
      displayOrder: 4,
      status: 'PUBLISHED',
    },
    {
      id: 5,
      title: 'Advanced Python Development Techniques',
      issuingOrg: 'Microsoft',
      issueDate: '2025',
      credentialUrl: 'https://learn.microsoft.com',
      iconKey: 'cpu',
      displayOrder: 5,
      status: 'PUBLISHED',
    },
    {
      id: 6,
      title: 'Python Programming Fundamentals',
      issuingOrg: 'Microsoft',
      issueDate: '2025',
      credentialUrl: 'https://learn.microsoft.com',
      iconKey: 'book',
      displayOrder: 6,
      status: 'PUBLISHED',
    },
    {
      id: 7,
      title: 'Data Analysis & Visualization with Python',
      issuingOrg: 'Microsoft',
      issueDate: '2025',
      credentialUrl: 'https://learn.microsoft.com',
      iconKey: 'chart',
      displayOrder: 7,
      status: 'PUBLISHED',
    },
    {
      id: 8,
      title: 'Automation and Scripting with Python',
      issuingOrg: 'Microsoft',
      issueDate: '2025',
      credentialUrl: 'https://learn.microsoft.com',
      iconKey: 'cog',
      displayOrder: 8,
      status: 'PUBLISHED',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Competitive Programming & DSA Milestone',
      metricValue: '350+ Solved',
      description: 'Solved 150+ DSA questions on LeetCode and 200+ on GeeksforGeeks (GFG). Practicing algorithmic problem solving, time complexity optimization, and core data structures.',
      organization: 'LeetCode & GeeksforGeeks',
      issueDate: '2024 - Present',
      iconKey: 'flame',
      proofUrl: '',
      displayOrder: 1,
      status: 'PUBLISHED',
    },
    {
      id: 2,
      title: 'Class Representative (CR) — MCA',
      metricValue: 'Leadership',
      description: 'Responsible Class Representative (CR) of MCA - E section in SRM University, KTR Campus. Coordinating academic schedules, technical seminars, and student-faculty communication.',
      organization: 'SRM University, KTR Campus',
      issueDate: '2024 - Present',
      iconKey: 'crown',
      proofUrl: '',
      displayOrder: 2,
      status: 'PUBLISHED',
    },
  ],
  settings: {
    site_title: 'Kanhaiya | techwithkanhaiya',
    meta_description: 'Official portfolio of Kanhaiya Pandey - Full-Stack Developer & Software Engineer.',
    support_coffee_url: 'pandey123@okhdfcbank',
    availability_badge: 'Available for Full-Stack & AI Roles',
    dsa_solved_count: '150+',
    github_url: 'https://github.com/kanhaiya28pandey/',
    linkedin_url: 'https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/',
    email: 'kanhaiya542112@gmail.com',
    phone_number: '+91 9801573326',
    whatsapp_number: '+91 9801573326',
    about_avatar_url: '/assets/kanhaiya_real.jpg',
    about_stream_badge: 'Software Engineer',
    about_text:
      'I am a passionate Software Engineer focused on building robust full-stack applications and solving real-world problems. With strong foundations in Data Structures & Algorithms, Java, Spring Boot, and modern React, I enjoy crafting seamless user experiences backed by reliable database architectures.\n\nAlways excited to learn new technologies, build scalable systems, and collaborate on high-impact projects.',
    leetcode_url: '',
    gfg_url: '',
    codeforces_url: '',
    instagram_url: '',
  },
};

export const fetchPortfolioOverview = async (): Promise<PortfolioOverview> => {
  try {
    const response = await fetch(`${API_BASE_URL}/public/overview`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch portfolio data (status: ${response.status})`);
    }

    const data: PortfolioOverview = await response.json();
    return data;
  } catch (err) {
    console.warn('Backend API currently unreachable. Serving default authentic portfolio baseline data.', err);
    return DEFAULT_PORTFOLIO_DATA;
  }
};

export const submitContactMessage = async (
  payload: ContactSubmission
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/public/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || 'Failed to submit contact message');
    }

    const res = await response.json();
    return { success: true, message: res.message || 'Message sent successfully!' };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error sending message';
    return { success: false, message: errorMsg };
  }
};

// ==========================================
// ADMIN CMS CLIENT APIs
// ==========================================

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('admin_jwt');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const adminLogin = async (credentials: {
  username: string;
  password: string;
}): Promise<{ success: boolean; data?: { token: string; username: string; role: string }; message?: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return { success: false, message: err.message || 'Invalid username or password' };
    }

    const data = await response.json();
    if (data.token) {
      localStorage.setItem('admin_jwt', data.token);
    }
    return { success: true, data };
  } catch (err: unknown) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Network error during login',
    };
  }
};

export const adminLogout = async (): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/admin/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: getAuthHeaders(),
    });
  } finally {
    localStorage.removeItem('admin_jwt');
  }
};

export const checkAdminAuth = async (): Promise<AdminUser | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/auth/me`, {
      method: 'GET',
      credentials: 'include',
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.authenticated ? (data as AdminUser) : null;
  } catch {
    return null;
  }
};

export const fetchAdminSummary = async (): Promise<DashboardSummary> => {
  const response = await fetch(`${API_BASE_URL}/admin/dashboard/summary`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch dashboard summary');
  return response.json();
};

export const updateAdminProfile = async (profileData: Partial<Profile>): Promise<Profile> => {
  const response = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error('Failed to update profile');
  return response.json();
};

// --- Projects ---
export const fetchAdminProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/projects`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
};

export const createAdminProject = async (project: Partial<Project>): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/admin/projects`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to create project');
  }
  return response.json();
};

export const updateAdminProject = async (id: number, project: Partial<Project>): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
};

export const deleteAdminProject = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/projects/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete project');
};

// --- Skills ---
export const fetchAdminSkills = async (): Promise<Skill[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/skills`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch skills');
  return response.json();
};

export const createAdminSkill = async (skill: Partial<Skill>): Promise<Skill> => {
  const response = await fetch(`${API_BASE_URL}/admin/skills`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(skill),
  });
  if (!response.ok) throw new Error('Failed to create skill');
  return response.json();
};

export const updateAdminSkill = async (id: number, skill: Partial<Skill>): Promise<Skill> => {
  const response = await fetch(`${API_BASE_URL}/admin/skills/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(skill),
  });
  if (!response.ok) throw new Error('Failed to update skill');
  return response.json();
};

export const deleteAdminSkill = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/skills/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete skill');
};

// --- Experiences ---
export const fetchAdminExperiences = async (): Promise<Experience[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/experiences`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch experiences');
  return response.json();
};

export const createAdminExperience = async (exp: Partial<Experience>): Promise<Experience> => {
  const response = await fetch(`${API_BASE_URL}/admin/experiences`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(exp),
  });
  if (!response.ok) throw new Error('Failed to create experience');
  return response.json();
};

export const updateAdminExperience = async (id: number, exp: Partial<Experience>): Promise<Experience> => {
  const response = await fetch(`${API_BASE_URL}/admin/experiences/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(exp),
  });
  if (!response.ok) throw new Error('Failed to update experience');
  return response.json();
};

export const deleteAdminExperience = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/experiences/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete experience');
};

// --- Educations ---
export const fetchAdminEducations = async (): Promise<Education[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/educations`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch educations');
  return response.json();
};

export const createAdminEducation = async (edu: Partial<Education>): Promise<Education> => {
  const response = await fetch(`${API_BASE_URL}/admin/educations`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(edu),
  });
  if (!response.ok) throw new Error('Failed to create education');
  return response.json();
};

export const updateAdminEducation = async (id: number, edu: Partial<Education>): Promise<Education> => {
  const response = await fetch(`${API_BASE_URL}/admin/educations/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(edu),
  });
  if (!response.ok) throw new Error('Failed to update education');
  return response.json();
};

export const deleteAdminEducation = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/educations/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete education');
};

// --- Certificates ---
export const fetchAdminCertificates = async (): Promise<Certificate[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/certificates`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch certificates');
  return response.json();
};

export const createAdminCertificate = async (cert: Partial<Certificate>): Promise<Certificate> => {
  const response = await fetch(`${API_BASE_URL}/admin/certificates`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(cert),
  });
  if (!response.ok) throw new Error('Failed to create certificate');
  return response.json();
};

export const updateAdminCertificate = async (id: number, cert: Partial<Certificate>): Promise<Certificate> => {
  const response = await fetch(`${API_BASE_URL}/admin/certificates/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(cert),
  });
  if (!response.ok) throw new Error('Failed to update certificate');
  return response.json();
};

export const deleteAdminCertificate = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/certificates/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete certificate');
};

// --- Achievements ---
export const fetchAdminAchievements = async (): Promise<Achievement[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievements`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch achievements');
  return response.json();
};

export const createAdminAchievement = async (ach: Partial<Achievement>): Promise<Achievement> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievements`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(ach),
  });
  if (!response.ok) throw new Error('Failed to create achievement');
  return response.json();
};

export const updateAdminAchievement = async (id: number, ach: Partial<Achievement>): Promise<Achievement> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievements/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(ach),
  });
  if (!response.ok) throw new Error('Failed to update achievement');
  return response.json();
};

export const deleteAdminAchievement = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/achievements/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete achievement');
};

// --- Contact Messages ---
export const fetchAdminMessages = async (status?: MessageStatus): Promise<ContactMessage[]> => {
  const url = status
    ? `${API_BASE_URL}/admin/messages?status=${status}`
    : `${API_BASE_URL}/admin/messages`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
};

export const updateAdminMessageStatus = async (
  id: number,
  status: MessageStatus
): Promise<ContactMessage> => {
  const response = await fetch(`${API_BASE_URL}/admin/messages/${id}/status?status=${status}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to update message status');
  return response.json();
};

// --- Audit Logs ---
export const fetchAdminAuditLogs = async (): Promise<AuditLog[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/audit-logs`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch audit logs');
  return response.json();
};

// --- File Upload ---
export const uploadAdminFile = async (
  file: File,
  allowDoc = false
): Promise<{ fileUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('allowDoc', String(allowDoc));

  const token = localStorage.getItem('admin_jwt');
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}/admin/upload`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || 'File upload failed');
  }

  return response.json();
};

// --- Settings & Profile ---
export const fetchAdminSettings = async (): Promise<Record<string, string>> => {
  const response = await fetch(`${API_BASE_URL}/admin/settings`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    // If backend endpoint isn't up yet or returns error, fallback to public settings
    const pub = await fetch(`${API_BASE_URL}/public/settings`).catch(() => null);
    if (pub && pub.ok) return pub.json();
    return DEFAULT_PORTFOLIO_DATA.settings;
  }
  return response.json();
};

export const updateAdminSettings = async (
  settings: Record<string, string>
): Promise<Record<string, string>> => {
  const response = await fetch(`${API_BASE_URL}/admin/settings`, {
    method: 'PUT',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(settings),
  });
  if (!response.ok) throw new Error('Failed to update site settings');
  return response.json();
};

export const fetchAdminProfile = async (): Promise<Profile> => {
  const response = await fetch(`${API_BASE_URL}/public/profile`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) return DEFAULT_PORTFOLIO_DATA.profile;
  return response.json();
};

// --- Inquiries / Messages Deletion ---
export const deleteAdminMessage = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/messages/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete message');
};

export const batchDeleteAdminMessages = async (ids: number[]): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/messages/batch-delete`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(ids),
  });
  if (!response.ok) throw new Error('Failed to delete selected messages');
};

export const clearOldAdminMessages = async (days: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/messages/clear-older-than?days=${days}`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error(`Failed to clear messages older than ${days} days`);
};

// --- Audit Logs Deletion ---
export const deleteAdminAuditLog = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/audit-logs/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete audit log');
};

export const batchDeleteAdminAuditLogs = async (ids: number[]): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/audit-logs/batch-delete`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(ids),
  });
  if (!response.ok) throw new Error('Failed to delete selected audit logs');
};

export const clearOldAdminAuditLogs = async (days: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/audit-logs/clear-older-than?days=${days}`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error(`Failed to clear audit logs older than ${days} days`);
};

export const clearAllAdminAuditLogs = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/audit-logs/clear-all`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to clear all audit logs');
};

// --- Public Visitor Tracking ---
export const trackPortfolioVisit = async (pagePath = '/', referrer?: string): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/public/track-visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pagePath,
        referrer: referrer || document.referrer || '',
      }),
    });
  } catch {
    // Silent telemetry fail safe
  }
};

// --- Admin Visitor Analytics ---
export const fetchAdminAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  const response = await fetch(`${API_BASE_URL}/admin/analytics/summary`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      todayVisits: 0,
      thisWeekVisits: 0,
      totalInquiries: 0,
      conversionRate: 0,
      deviceBreakdown: {},
      browserBreakdown: {},
      dailyVisits: [],
      recentVisitors: [],
    };
  }
  return response.json();
};

export const fetchAdminVisitors = async (): Promise<VisitorLog[]> => {
  const response = await fetch(`${API_BASE_URL}/admin/analytics/visitors`, {
    method: 'GET',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) return [];
  return response.json();
};

export const deleteAdminVisitor = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/analytics/visitors/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete visitor log');
};

export const batchDeleteAdminVisitors = async (ids: number[]): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/analytics/visitors/batch-delete`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
    body: JSON.stringify(ids),
  });
  if (!response.ok) throw new Error('Failed to delete selected visitor logs');
};

export const clearOldAdminVisitors = async (days: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/analytics/visitors/clear-older-than?days=${days}`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error(`Failed to clear visitor logs older than ${days} days`);
};

export const clearAllAdminVisitors = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/analytics/visitors/clear-all`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to clear all visitor logs');
};

export interface EmailDispatchReport {
  success: boolean;
  channel?: string;
  recipient?: string;
  message?: string;
  timestamp?: string;
  troubleshooting?: string;
  resendError?: string;
  web3formsError?: string;
  brevoError?: string;
  smtpError?: string;
}

export const testAdminEmailDispatch = async (): Promise<EmailDispatchReport> => {
  const response = await fetch(`${API_BASE_URL}/admin/test-email`, {
    method: 'POST',
    credentials: 'include',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Failed to dispatch test email');
  }
  return response.json();
};


