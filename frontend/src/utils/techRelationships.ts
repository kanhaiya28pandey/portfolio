export interface TechCategoryTheme {
  main: string;
  glow: string;
  border: string;
  bg: string;
  text: string;
}

export const getCategoryTheme = (category: string = ''): TechCategoryTheme => {
  switch (category.toUpperCase()) {
    case 'CORE':
      return {
        main: '#38BDF8', // Cyan / Light Blue
        glow: 'rgba(56, 189, 248, 0.45)',
        border: 'rgba(56, 189, 248, 0.6)',
        bg: 'rgba(56, 189, 248, 0.12)',
        text: '#7DD3FC',
      };
    case 'FRONTEND':
      return {
        main: '#60A5FA', // Blue / Indigo
        glow: 'rgba(96, 165, 250, 0.45)',
        border: 'rgba(96, 165, 250, 0.6)',
        bg: 'rgba(96, 165, 250, 0.12)',
        text: '#93C5FD',
      };
    case 'BACKEND':
      return {
        main: '#34D399', // Emerald / Teal
        glow: 'rgba(52, 211, 153, 0.45)',
        border: 'rgba(52, 211, 153, 0.6)',
        bg: 'rgba(52, 211, 153, 0.12)',
        text: '#6EE7B7',
      };
    case 'DATABASE':
      return {
        main: '#A855F7', // Purple
        glow: 'rgba(168, 85, 247, 0.45)',
        border: 'rgba(168, 85, 247, 0.6)',
        bg: 'rgba(168, 85, 247, 0.12)',
        text: '#C084FC',
      };
    case 'TOOLS':
      return {
        main: '#F59E0B', // Amber / Orange
        glow: 'rgba(245, 158, 11, 0.45)',
        border: 'rgba(245, 158, 11, 0.6)',
        bg: 'rgba(245, 158, 11, 0.12)',
        text: '#FCD34D',
      };
    case 'AI / ML':
    case 'AIML':
    case 'AI':
    case 'MACHINE LEARNING':
    case 'DATA SCIENCE':
      return {
        main: '#EC4899', // Electric Pink / Magenta
        glow: 'rgba(236, 72, 153, 0.45)',
        border: 'rgba(236, 72, 153, 0.6)',
        bg: 'rgba(236, 72, 153, 0.12)',
        text: '#F472B6',
      };
    case 'CYBER SECURITY':
    case 'CYBERSECURITY':
    case 'SECURITY':
    case 'CYBER FORENSIC':
    case 'FORENSICS':
      return {
        main: '#10B981', // Emerald / Neon Green Shield
        glow: 'rgba(16, 185, 129, 0.45)',
        border: 'rgba(16, 185, 129, 0.6)',
        bg: 'rgba(16, 185, 129, 0.12)',
        text: '#34D399',
      };
    case 'CLOUD':
    case 'DEVOPS':
      return {
        main: '#06B6D4', // Sky / Cyan Cloud
        glow: 'rgba(6, 182, 212, 0.45)',
        border: 'rgba(6, 182, 212, 0.6)',
        bg: 'rgba(6, 182, 212, 0.12)',
        text: '#67E8F9',
      };
    default:
      return {
        main: '#22D3EE',
        glow: 'rgba(34, 211, 238, 0.45)',
        border: 'rgba(34, 211, 238, 0.6)',
        bg: 'rgba(34, 211, 238, 0.12)',
        text: '#67E8F9',
      };
  }
};

/**
 * Technology Relationship Graph for Focus Mode.
 * When a technology is clicked/focused, related technologies receive secondary glowing aura.
 */
export const TECH_RELATIONSHIPS: Record<string, string[]> = {
  'spring boot': ['java', 'spring security', 'rest apis', 'hibernate / jpa', 'postgresql', 'mysql', 'docker'],
  'java': ['spring boot', 'dsa', 'oop', 'spring security', 'postgresql', 'hibernate / jpa'],
  'spring security': ['spring boot', 'java', 'rest apis'],
  'rest apis': ['spring boot', 'fastapi', 'react', 'node.js', 'postman'],
  'hibernate / jpa': ['spring boot', 'java', 'postgresql', 'mysql'],
  'react': ['javascript', 'typescript', 'html5', 'css3', 'node.js', 'fastapi'],
  'typescript': ['react', 'javascript', 'node.js', 'vs code'],
  'javascript': ['react', 'typescript', 'html5', 'css3', 'node.js'],
  'html5': ['css3', 'javascript', 'react'],
  'css3': ['html5', 'javascript', 'react'],
  'postgresql': ['java', 'spring boot', 'hibernate / jpa', 'mysql'],
  'mysql': ['postgresql', 'spring boot', 'hibernate / jpa'],
  'mongodb': ['node.js', 'fastapi', 'python'],
  'docker': ['spring boot', 'git & github', 'postgresql'],
  'git & github': ['vs code', 'docker', 'postman'],
  'postman': ['rest apis', 'spring boot', 'fastapi'],
  'vs code': ['git & github', 'typescript', 'react', 'python'],
  'dsa': ['java', 'python', 'c & c++', 'problem solving'],
  'oop': ['java', 'c & c++', 'spring boot'],
  'problem solving': ['dsa', 'java', 'python', 'c & c++'],
  'python': ['fastapi', 'dsa', 'problem solving', 'mongodb'],
  'c & c++': ['dsa', 'oop', 'problem solving'],
  'node.js': ['javascript', 'typescript', 'react', 'mongodb', 'rest apis'],
  'fastapi': ['python', 'rest apis', 'react', 'mongodb', 'postman'],
};

export const areTechnologiesRelated = (techA: string, techB: string): boolean => {
  if (!techA || !techB) return false;
  const a = techA.toLowerCase();
  const b = techB.toLowerCase();
  if (a === b) return true;
  const listA = TECH_RELATIONSHIPS[a] || [];
  const listB = TECH_RELATIONSHIPS[b] || [];
  return listA.includes(b) || listB.includes(a);
};

export interface TechDetails {
  description: string;
  proficiency: number;
  level: string;
  keyConcepts: string[];
  usedInProjects: string[];
  relatedTechNames: string[];
}

export const TECH_DETAILS_MAP: Record<string, TechDetails> = {
  'java': {
    description: 'A robust, object-oriented programming language used for building scalable, high-performance applications.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['OOP', 'Collections', 'Multithreading', 'JVM', 'Concurrency', 'Design Patterns'],
    usedInProjects: ['Portfolio Website (Backend)', 'ResumeIQ (JobFit AI)'],
    relatedTechNames: ['Spring Boot', 'PostgreSQL', 'MongoDB', 'Docker', 'Git & GitHub'],
  },
  'spring boot': {
    description: 'Enterprise Java framework for building robust, cloud-native microservices and RESTful API backends.',
    proficiency: 90,
    level: 'ADVANCED',
    keyConcepts: ['Spring MVC', 'Data JPA', 'Microservices', 'Spring Security', 'Actuator', 'RESTful Design'],
    usedInProjects: ['Portfolio Website (Backend)', 'Full-Stack Auth Service'],
    relatedTechNames: ['Java', 'Spring Security', 'Hibernate / JPA', 'PostgreSQL', 'Docker'],
  },
  'spring security': {
    description: 'De facto standard for securing Spring-based applications with JWT authentication, RBAC, and OAuth2.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['JWT Auth', 'RBAC', 'OAuth2', 'CSRF Protection', 'Filters', 'BCrypt'],
    usedInProjects: ['Portfolio Website (Backend)', 'Enterprise Auth Engine'],
    relatedTechNames: ['Spring Boot', 'Java', 'REST APIs', 'PostgreSQL', 'Postman'],
  },
  'rest apis': {
    description: 'Stateless HTTP-based API architecture utilizing modern standard status codes, pagination, and OpenAPI contracts.',
    proficiency: 90,
    level: 'ADVANCED',
    keyConcepts: ['Stateless Design', 'HTTP Verbs', 'JSON Payloads', 'OpenAPI/Swagger', 'Rate Limiting', 'DTOs'],
    usedInProjects: ['Portfolio API Hub', 'ResumeIQ Analyzer Engine'],
    relatedTechNames: ['Spring Boot', 'FastAPI', 'Postman', 'React', 'TypeScript'],
  },
  'hibernate / jpa': {
    description: 'ORM framework streamlining relational mapping, entity relationships, query caching, and ACID transactions.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Entity Mapping', 'JPQL', 'Lazy Loading', 'Transactions', 'First/Second Level Cache', 'Cascading'],
    usedInProjects: ['Portfolio Website (Backend)', 'Database Repository Hub'],
    relatedTechNames: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL'],
  },
  'react': {
    description: 'Component-driven declarative UI library for building responsive, high-performance single page web applications.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['React Hooks', 'Virtual DOM', 'Component Architecture', 'State Machines', 'Context API', 'TypeScript'],
    usedInProjects: ['Portfolio Website (Frontend)', 'ResumeIQ (JobFit AI)'],
    relatedTechNames: ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'FastAPI'],
  },
  'typescript': {
    description: 'Typed superset of JavaScript providing static typing, generics, interfaces, and compile-time correctness.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Static Typing', 'Generics', 'Interfaces', 'Union Types', 'Utility Types', 'Strict Null Checks'],
    usedInProjects: ['Portfolio Frontend', 'Modern Web Dashboard'],
    relatedTechNames: ['React', 'JavaScript', 'VS Code', 'FastAPI'],
  },
  'javascript': {
    description: 'Dynamic scripting language powering modern web applications with ES6+, async/await, and event-driven architectures.',
    proficiency: 90,
    level: 'ADVANCED',
    keyConcepts: ['ES6+ Syntax', 'Closures', 'Promises', 'Event Loop', 'DOM APIs', 'Functional Patterns'],
    usedInProjects: ['Interactive Portfolio', 'Algorithm Visualizer'],
    relatedTechNames: ['React', 'TypeScript', 'HTML5', 'CSS3'],
  },
  'html & css': {
    description: 'Modern semantic HTML5 markup combined with responsive CSS3, flexbox, grid, and glassmorphic designs.',
    proficiency: 90,
    level: 'ADVANCED',
    keyConcepts: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'Responsive Design', 'Glassmorphism', 'Animations'],
    usedInProjects: ['Personal Portfolio', 'Responsive Web UI'],
    relatedTechNames: ['React', 'TypeScript', 'JavaScript'],
  },
  'html5': {
    description: 'Semantic markup standard structuring modern accessible, fast, and SEO-optimized web documents.',
    proficiency: 90,
    level: 'ADVANCED',
    keyConcepts: ['Semantic Elements', 'Accessibility (a11y)', 'Canvas API', 'SEO Optimization', 'Audio/Video', 'Web Storage'],
    usedInProjects: ['Personal Portfolio', 'Landing Pages'],
    relatedTechNames: ['CSS3', 'JavaScript', 'React'],
  },
  'css3': {
    description: 'Modern style sheet language enabling fluid responsiveness, glassmorphic effects, and keyframe animations.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Flexbox', 'CSS Grid', 'Transitions & Keyframes', 'Glassmorphism', 'Custom Properties', 'Media Queries'],
    usedInProjects: ['Personal Portfolio', 'Design System'],
    relatedTechNames: ['HTML5', 'React', 'JavaScript'],
  },
  'postgresql': {
    description: 'Advanced open-source relational database supporting high concurrency, complex queries, and JSONB storage.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Relational Schema', 'Indexing & B-Trees', 'Transactions (ACID)', 'Query Plans', 'Foreign Keys', 'JSONB'],
    usedInProjects: ['Portfolio Database', 'ResumeIQ Persistence Engine'],
    relatedTechNames: ['Spring Boot', 'Hibernate / JPA', 'Java', 'MySQL'],
  },
  'mysql': {
    description: 'Reliable, widely-adopted relational database known for high performance and standard SQL operations.',
    proficiency: 80,
    level: 'ADVANCED',
    keyConcepts: ['Normalized Schemas', 'Joins', 'Indexes', 'Triggers', 'Stored Procedures', 'Replication'],
    usedInProjects: ['Database Projects', 'E-Commerce System'],
    relatedTechNames: ['PostgreSQL', 'Spring Boot', 'Hibernate / JPA'],
  },
  'mongodb': {
    description: 'Document-oriented NoSQL database designed for flexible schemas, rapid development, and cloud scalability.',
    proficiency: 80,
    level: 'ADVANCED',
    keyConcepts: ['Document Modeling', 'Aggregation Pipeline', 'BSON', 'Indexing', 'Sharding', 'Mongoose/Driver'],
    usedInProjects: ['Content Repository', 'Analytics Storage'],
    relatedTechNames: ['FastAPI', 'Python', 'Docker', 'Postman'],
  },
  'python': {
    description: 'Versatile programming language renowned for clean syntax, rapid prototyping, data structures, and ML tooling.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Data Structures', 'OOP in Python', 'Decorators', 'Generators', 'Asyncio', 'Scripting & Automation'],
    usedInProjects: ['ResumeIQ (JobFit AI)', 'Automation Scripts'],
    relatedTechNames: ['FastAPI', 'DSA', 'Problem Solving', 'MongoDB'],
  },
  'fastapi': {
    description: 'Modern, blazing-fast Python web framework for building REST APIs with automatic OpenAPI docs and type hints.',
    proficiency: 80,
    level: 'INTERMEDIATE',
    keyConcepts: ['Async Endpoints', 'Pydantic Models', 'Dependency Injection', 'OpenAPI/Swagger', 'JWT Tokens', 'Uvicorn'],
    usedInProjects: ['ResumeIQ AI Backend', 'Microservice Endpoints'],
    relatedTechNames: ['Python', 'REST APIs', 'Postman', 'Docker'],
  },
  'dsa': {
    description: 'Data Structures & Algorithms: trees, graphs, dynamic programming, algorithmic efficiency, and memory optimization.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Trees & Graphs', 'Dynamic Programming', 'Recursion', 'Hash Maps', 'Time/Space Complexity', 'Two Pointers'],
    usedInProjects: ['LeetCode 150+ Solutions', 'Algorithm Benchmark Engine'],
    relatedTechNames: ['Java', 'Python', 'C & C++', 'Problem Solving'],
  },
  'oop': {
    description: 'Object-Oriented Programming: modular system decomposition, SOLID design principles, and clean architecture patterns.',
    proficiency: 90,
    level: 'ADVANCED',
    keyConcepts: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'SOLID Principles', 'Design Patterns'],
    usedInProjects: ['Portfolio Backend', 'Enterprise Domain Models'],
    relatedTechNames: ['Java', 'Spring Boot', 'C & C++', 'DSA'],
  },
  'problem solving': {
    description: 'Analytical problem solving, edge-case mitigation, competitive logic, and production system debugging.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Analytical Logic', 'Edge Cases', 'Binary Search', 'Sliding Window', 'Greedy Methods', 'Debugging'],
    usedInProjects: ['Competitive Coding', 'System Optimization'],
    relatedTechNames: ['DSA', 'Java', 'Python', 'C & C++'],
  },
  'c & c++': {
    description: 'Foundational systems programming, pointer mechanics, manual memory management, and algorithmic execution.',
    proficiency: 75,
    level: 'INTERMEDIATE',
    keyConcepts: ['Pointers & References', 'Memory Allocation', 'STL Templates', 'Structs & Classes', 'Low-level Ops', 'Recursion'],
    usedInProjects: ['Systems Logic', 'Algorithmic Solutions'],
    relatedTechNames: ['DSA', 'OOP', 'Problem Solving'],
  },
  'git & github': {
    description: 'Distributed version control system for feature branching, collaborative reviews, conflict resolution, and CI/CD.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['Branching Strategies', 'Pull Requests', 'Merge & Rebase', 'Git Hooks', 'GitHub Actions', 'Semantic Commits'],
    usedInProjects: ['All Repositories', 'Open Source Workflows'],
    relatedTechNames: ['VS Code', 'Docker', 'Postman'],
  },
  'docker': {
    description: 'Containerization platform packaging applications with dependencies for consistent, reproducible deployments.',
    proficiency: 75,
    level: 'INTERMEDIATE',
    keyConcepts: ['Dockerfiles', 'Multi-stage Builds', 'Docker Compose', 'Container Networking', 'Image Layers', 'Volume Mounts'],
    usedInProjects: ['Containerized Backend', 'Database Dev Containers'],
    relatedTechNames: ['Spring Boot', 'PostgreSQL', 'Git & GitHub'],
  },
  'postman': {
    description: 'Comprehensive API testing platform for endpoint validation, automated test suites, environments, and mock servers.',
    proficiency: 85,
    level: 'ADVANCED',
    keyConcepts: ['API Collections', 'Environment Variables', 'Automated Tests', 'Pre-request Scripts', 'Mock Servers', 'Contract Tests'],
    usedInProjects: ['Portfolio API Suite', 'Auth Testing Collection'],
    relatedTechNames: ['REST APIs', 'Spring Boot', 'FastAPI'],
  },
  'vs code': {
    description: 'Extensible developer environment optimized with TypeScript tooling, debugger integrations, and Git lenses.',
    proficiency: 90,
    level: 'ADVANCED',
    keyConcepts: ['Workspace Config', 'Integrated Debugging', 'GitLens', 'Extensions Engine', 'Snippets', 'Remote Containers'],
    usedInProjects: ['Daily Development', 'Portfolio Codebase'],
    relatedTechNames: ['Git & GitHub', 'TypeScript', 'React', 'Python'],
  },
};

export const getTechDetails = (
  name: string,
  category?: string,
  customDescription?: string
): TechDetails => {
  const q = name.toLowerCase().trim();
  const cat = (category || '').toUpperCase().trim();

  // If exact match in TECH_DETAILS_MAP
  if (TECH_DETAILS_MAP[q]) {
    const d = { ...TECH_DETAILS_MAP[q] };
    if (customDescription && customDescription.trim()) {
      d.description = customDescription.trim();
    }
    return d;
  }

  // Match partial key in TECH_DETAILS_MAP
  for (const [key, details] of Object.entries(TECH_DETAILS_MAP)) {
    if (q.includes(key) || key.includes(q)) {
      const d = { ...details };
      if (customDescription && customDescription.trim()) {
        d.description = customDescription.trim();
      }
      return d;
    }
  }

  // Domain-aware intelligent defaults for newly added technologies
  if (
    cat.includes('AI') ||
    cat.includes('ML') ||
    cat.includes('DATA') ||
    q.includes('pytorch') ||
    q.includes('tensorflow') ||
    q.includes('llm') ||
    q.includes('nlp') ||
    q.includes('langchain') ||
    q.includes('scikit') ||
    q.includes('neural')
  ) {
    return {
      description:
        customDescription?.trim() ||
        'Machine learning, neural network modeling, data feature engineering, and inference pipelines.',
      proficiency: 85,
      level: 'ADVANCED',
      keyConcepts: [
        'Neural Networks',
        'Model Optimization',
        'Feature Engineering',
        'Loss Functions',
        'Inference Pipelines',
        'Vector Embeddings',
      ],
      usedInProjects: ['AI Analytics Engine', 'Intelligent Automation Service'],
      relatedTechNames: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'],
    };
  }

  if (
    cat.includes('SECURITY') ||
    cat.includes('CYBER') ||
    cat.includes('FORENSIC') ||
    q.includes('wireshark') ||
    q.includes('kali') ||
    q.includes('crypt') ||
    q.includes('nmap') ||
    q.includes('penetration') ||
    q.includes('burp')
  ) {
    return {
      description:
        customDescription?.trim() ||
        'Defensive security engineering, vulnerability mitigation, packet inspection, and digital forensic integrity.',
      proficiency: 85,
      level: 'ADVANCED',
      keyConcepts: [
        'Vulnerability Assessment',
        'Packet Inspection',
        'Digital Artifacts',
        'Threat Modeling',
        'Zero Trust',
        'Incident Response',
      ],
      usedInProjects: ['Secure Authentication Gateway', 'Security Audit Tooling'],
      relatedTechNames: ['Spring Security', 'Linux', 'Python', 'Docker'],
    };
  }

  if (
    cat.includes('CLOUD') ||
    cat.includes('DEVOPS') ||
    q.includes('aws') ||
    q.includes('azure') ||
    q.includes('gcp') ||
    q.includes('k8s') ||
    q.includes('kubernetes')
  ) {
    return {
      description:
        customDescription?.trim() ||
        'Cloud infrastructure orchestration, automated CI/CD deployment pipelines, and high-availability scalability.',
      proficiency: 80,
      level: 'ADVANCED',
      keyConcepts: [
        'Infrastructure as Code',
        'Container Orchestration',
        'CI/CD Pipelines',
        'Cloud IAM',
        'Observability',
        'Load Balancing',
      ],
      usedInProjects: ['Cloud Infrastructure', 'Microservices Deployment'],
      relatedTechNames: ['Docker', 'Git & GitHub', 'Spring Boot', 'PostgreSQL'],
    };
  }

  // Default fallback
  return {
    description:
      customDescription?.trim() ||
      'Production-grade architecture, engineering best practices, and clean implementation.',
    proficiency: 80,
    level: 'ADVANCED',
    keyConcepts: [
      'Architecture',
      'Clean Code',
      'Best Practices',
      'Testing',
      'Scalability',
      'Performance',
    ],
    usedInProjects: ['Portfolio Platform', 'Engineering Services'],
    relatedTechNames: ['Java', 'React', 'Spring Boot', 'Docker', 'Git & GitHub'],
  };
};
