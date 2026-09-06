import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. Java (Duke Coffee Cup)
export const JavaIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8.8 17.2c2.6.3 5.4.1 7.8-.8.6-.2 1.2.3 1.1.9-.3 1.4-2.1 2.3-4.5 2.5-3.3.3-6.4-.4-7.5-1.9-.3-.4 0-.8.5-.8 1 .1 1.8.1 2.6.1z"
      fill="#5382A1"
    />
    <path
      d="M7.7 13.9c2.9.3 6.1.1 8.8-1 .7-.3 1.3.3 1.1 1-.4 1.6-2.6 2.5-5.3 2.7-3.9.3-7.5-.4-8.8-2-.3-.4 0-.8.6-.8 1.1.1 2.3.1 3.6.1z"
      fill="#E76F00"
    />
    <path
      d="M13.2 7.8c1 .9 1.6 2.2 1.3 3.6-.5 2.1-2.9 3.2-5.3 2.6-.7-.2-.6-.9.1-.9 1.8.1 3.4-.6 3.8-2 .4-1.2-.2-2.3-1.1-3-.3-.2 0-.6.3-.5.4.1.7.1.9.2z"
      fill="#5382A1"
    />
    <path
      d="M10.8 2.1c.8 1 1.2 2.3.9 3.6-.4 1.8-2.2 2.8-4.2 2.4-.6-.1-.5-.8.1-.8 1.5.1 2.8-.5 3.1-1.8.3-1.1-.1-2.1-.9-2.8-.3-.2 0-.6.3-.5.3.1.5.1.7.1z"
      fill="#E76F00"
    />
    <path
      d="M17.5 15.5c2.4-.5 4.5-1.9 4.5-3.8 0-1.8-1.8-3.1-4.2-3.6-.5-.1-.7-.7-.3-1 2.9.5 5.5 2.1 5.5 4.6 0 2.6-2.8 4.4-5.9 4.8-.5.1-.8-.4-.6-.8.3-.1.7-.1 1-.2z"
      fill="#5382A1"
    />
  </svg>
);

// 2. Spring Boot
export const SpringBootIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2L3 7.2v10.4l9 5.2 9-5.2V7.2L12 2z"
      fill="#6DB33F"
      fillOpacity="0.15"
      stroke="#6DB33F"
      strokeWidth="1.5"
    />
    <path
      d="M16.5 14.2c-1.8 2.4-5.1 2.8-7.3 1-2.3-1.8-2.7-5.1-.9-7.3 1.8-2.4 5.1-2.8 7.3-1 .2.2.3.3.4.5-1.4-.4-3.1-.2-4.4.7-1.7 1.2-2.1 3.5-1 5.2 1.1 1.7 3.4 2.2 5.1 1.1.3-.2.5-.4.8-.7z"
      fill="#6DB33F"
    />
  </svg>
);

// 3. Spring Security
export const SpringSecurityIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2L4 5.5v6.2c0 5.2 3.4 10.1 8 11.3 4.6-1.2 8-6.1 8-11.3V5.5L12 2z"
      fill="#6DB33F"
      fillOpacity="0.15"
      stroke="#6DB33F"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="11" r="2" fill="#6DB33F" />
    <path d="M12 13v3" stroke="#6DB33F" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 4. React Atom
export const ReactIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="3.5" ry="9" stroke="#61DAFB" strokeWidth="1.5" />
    <ellipse
      cx="12"
      cy="12"
      rx="3.5"
      ry="9"
      transform="rotate(60 12 12)"
      stroke="#61DAFB"
      strokeWidth="1.5"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="3.5"
      ry="9"
      transform="rotate(120 12 12)"
      stroke="#61DAFB"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
  </svg>
);

// 5. TypeScript
export const TypeScriptIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <path d="M4 9h6v2H7.9v7H5.9v-7H4V9z" fill="#FFFFFF" />
    <path
      d="M13.2 14.8c.8.5 1.7.8 2.6.8.9 0 1.5-.4 1.5-.9 0-.6-.5-.9-1.8-1.3-1.8-.6-2.7-1.4-2.7-2.7 0-1.6 1.3-2.7 3.3-2.7 1 0 1.9.2 2.6.6l-.6 1.6c-.6-.4-1.3-.6-2-.6-.9 0-1.4.4-1.4.9 0 .5.5.8 1.8 1.2 1.9.6 2.8 1.4 2.8 2.8 0 1.7-1.3 2.7-3.5 2.7-1.1 0-2.3-.3-3.1-.9l.7-1.4z"
      fill="#FFFFFF"
    />
  </svg>
);

// 6. JavaScript
export const JavaScriptIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect width="24" height="24" rx="4" fill="#F7DF1E" />
    <path
      d="M6 16.5c.5.8 1.3 1.3 2.3 1.3 1.2 0 2-.7 2-2.2v-6.6h-2.2v6.6c0 .6-.3.9-.8.9-.4 0-.7-.2-.9-.6l-.4.6zM13.5 16.4c.9.8 2 1.4 3.3 1.4 1.9 0 3.1-1 3.1-2.5 0-1.6-1.1-2.3-2.6-2.9-1.1-.5-1.7-.8-1.7-1.5 0-.5.4-.9 1.2-.9.7 0 1.4.3 1.9.8l1.1-1.3c-.8-.7-1.8-1.1-3-1.1-2 0-3.3 1.2-3.3 2.6 0 1.4 1 2.2 2.5 2.8 1.1.5 1.8.8 1.8 1.6 0 .6-.5 1-1.4 1-.9 0-1.7-.4-2.3-1.1l-.6 1.2z"
      fill="#000000"
    />
  </svg>
);

// 7. Python
export const PythonIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M11.9 2c-4.2 0-3.9 1.8-3.9 1.8l.1 1.9h4v.6H6.3S3.5 6 3.5 10.2c0 4.2 2.5 4 2.5 4h1.5v-2.1c0-2.4 2.1-2.3 2.1-2.3h4.1s2 .1 2-2V4s.3-2-3.8-2zm-2.2 1.3c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z"
      fill="#3776AB"
    />
    <path
      d="M12.1 22c4.2 0 3.9-1.8 3.9-1.8l-.1-1.9h-4v-.6h5.8s2.8.3 2.8-3.9c0-4.2-2.5-4-2.5-4h-1.5v2.1c0 2.4-2.1 2.3-2.1 2.3H10.3s-2-.1-2 2V20s-.3 2 3.8 2zm2.2-1.3c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z"
      fill="#FFD43B"
    />
  </svg>
);

// 8. C / C++
export const CppIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2z"
      fill="#00599C"
      fillOpacity="0.15"
      stroke="#00599C"
      strokeWidth="1.5"
    />
    <path
      d="M10.5 8.5C9.6 7.6 8.3 7 6.8 7 3.6 7 1.5 9.5 1.5 12s2.1 5 5.3 5c1.5 0 2.8-.6 3.7-1.5"
      stroke="#00599C"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M14 12h3M15.5 10.5v3M18.5 12h3M20 10.5v3" stroke="#659AD2" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 9. Node.js
export const NodeJsIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z"
      fill="#339933"
      fillOpacity="0.15"
      stroke="#339933"
      strokeWidth="1.5"
    />
    <path
      d="M8.5 15.5V11c0-1.5 1-2.5 2.5-2.5h1c1.5 0 2.5 1 2.5 2.5v1.5h-2V11c0-.4-.3-.7-.7-.7h-.6c-.4 0-.7.3-.7.7v4.5H8.5z"
      fill="#339933"
    />
  </svg>
);

// 10. FastAPI
export const FastApiIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#009688" fillOpacity="0.15" stroke="#009688" strokeWidth="1.5" />
    <path d="M13 3L6 14h5l-1 7 8-12h-5l1-6z" fill="#009688" stroke="#009688" strokeWidth="0.5" />
  </svg>
);

// 11. PostgreSQL (Slonik Elephant)
export const PostgreSqlIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 3c-4.9 0-8.9 3.5-9.8 8.1-.5 2.4.1 4.9 1.6 6.8 1.4 1.8 3.5 2.9 5.8 3.1.5 0 .9-.3 1-.8l.3-1.6c.1-.5.5-.8 1-.8h.2c.5 0 .9.3 1 .8l.3 1.6c.1.5.5.8 1 .8 2.3-.2 4.4-1.3 5.8-3.1 1.5-1.9 2.1-4.4 1.6-6.8C20.9 6.5 16.9 3 12 3z"
      fill="#336791"
      fillOpacity="0.2"
      stroke="#336791"
      strokeWidth="1.5"
    />
    <path
      d="M8.5 10c0-1.5 1.5-2.5 3.5-2.5s3.5 1 3.5 2.5v3c0 1.5-1 2.5-2.5 2.5h-2c-1.5 0-2.5-1-2.5-2.5v-3z"
      stroke="#336791"
      strokeWidth="1.2"
    />
    <circle cx="9.5" cy="10" r="1" fill="#4169E1" />
    <circle cx="14.5" cy="10" r="1" fill="#4169E1" />
  </svg>
);

// 12. MySQL (Dolphin)
export const MySqlIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 15.5c-1.2 2-3.8 3.5-6.8 3.5-4.5 0-8.2-3.2-8.2-7.2 0-3.3 2.5-6 6-6.8.6-.1 1.2-.1 1.8 0 2.2.4 4 1.7 5 3.5"
      stroke="#00758F"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M17 12c-1.5-2-4.5-2.5-6.5-1-2 1.5-2.5 4.5-1 6.5 1.5 2 4.5 2.5 6.5 1"
      stroke="#F29111"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// 13. MongoDB (Leaf)
export const MongoDbIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 2C11.5 3 7 9 7 14c0 3.5 2.2 6.5 5 7.5V2z"
      fill="#47A248"
      fillOpacity="0.2"
      stroke="#47A248"
      strokeWidth="1.5"
    />
    <path
      d="M12 2c.5 1 5 7 5 12 0 3.5-2.2 6.5-5 7.5V2z"
      fill="#47A248"
      stroke="#47A248"
      strokeWidth="1.5"
    />
    <path d="M12 18v4" stroke="#47A248" strokeWidth="1.5" />
  </svg>
);

// 14. Docker (Whale & Containers)
export const DockerIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M3 13.5c1.5-1 3.5-.5 5 0 2 .5 4 .5 6 0 2-.5 4 0 5.5 1.5 1.5 1.5 1.5 3.5 0 5-2.5 2.5-8.5 2.5-12.5 0C4.5 18.5 3 16 3 13.5z"
      fill="#2496ED"
      fillOpacity="0.2"
      stroke="#2496ED"
      strokeWidth="1.5"
    />
    <rect x="6" y="9" width="2" height="2" fill="#2496ED" />
    <rect x="9" y="9" width="2" height="2" fill="#2496ED" />
    <rect x="12" y="9" width="2" height="2" fill="#2496ED" />
    <rect x="9" y="6" width="2" height="2" fill="#2496ED" />
    <rect x="12" y="6" width="2" height="2" fill="#2496ED" />
  </svg>
);

// 15. Git
export const GitIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21.7 10.3l-8-8c-.4-.4-1-.4-1.4 0L9.7 5c-.3-.1-.7-.1-1.1 0L6.7 3.1c-.4-.4-1-.4-1.4 0l-3 3c-.4.4-.4 1 0 1.4l1.9 1.9c-.1.4-.1.8 0 1.1l-2.9 2.9c-.4.4-.4 1 0 1.4l8 8c.4.4 1 .4 1.4 0l2.6-2.6c.4.1.8.1 1.1 0l2.9 2.9c.4.4 1 .4 1.4 0l3-3c.4-.4.4-1 0-1.4l-2.9-2.9c.1-.4.1-.8 0-1.1l2.9-2.9c.4-.4.4-1 0-1.4z"
      fill="#F05032"
      fillOpacity="0.15"
      stroke="#F05032"
      strokeWidth="1.5"
    />
    <circle cx="15" cy="9" r="1.5" fill="#F05032" />
    <circle cx="9" cy="15" r="1.5" fill="#F05032" />
  </svg>
);

// 16. Postman
export const PostmanIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#FF6C37" fillOpacity="0.15" stroke="#FF6C37" strokeWidth="1.5" />
    <path
      d="M15 8l-6 4 6 4-2-4 2-4z"
      fill="#FF6C37"
    />
    <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
  </svg>
);

// 17. VS Code
export const VsCodeIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M17.5 2.5l4 2v15l-4 2-10-8.5 6-4-6-4 10-2.5z"
      fill="#007ACC"
      fillOpacity="0.2"
      stroke="#007ACC"
      strokeWidth="1.5"
    />
    <path d="M7.5 10.5l-4-3-1.5 1 3.5 3.5-3.5 3.5 1.5 1 4-3" stroke="#007ACC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 18. HTML5
export const HtmlIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 3l1.5 17L12 22l6.5-2L20 3H4z"
      fill="#E34F26"
      fillOpacity="0.15"
      stroke="#E34F26"
      strokeWidth="1.5"
    />
    <path
      d="M8 8h8l-.5 5.5-3.5 1-3.5-1-.2-2.5h2l.1 1.2 1.6.4 1.6-.4.2-2.2H8V8z"
      fill="#E34F26"
    />
  </svg>
);

// 19. CSS3
export const CssIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 3l1.5 17L12 22l6.5-2L20 3H4z"
      fill="#1572B6"
      fillOpacity="0.15"
      stroke="#1572B6"
      strokeWidth="1.5"
    />
    <path
      d="M8 8h8l-.5 5.5-3.5 1-3.5-1-.2-2.5h2l.1 1.2 1.6.4 1.6-.4.2-2.2H8V8z"
      fill="#1572B6"
    />
  </svg>
);

// 20. Tailwind CSS
export const TailwindIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 6c-2.7 0-4.3 1.3-5 4 .9-1.3 2-1.8 3.3-1.3 1 .4 1.7 1.1 2.5 1.9C14.1 11.9 15.6 13 18.7 13c2.7 0 4.3-1.3 5-4-.9 1.3-2 1.8-3.3 1.3-1-.4-1.7-1.1-2.5-1.9C16.6 7.1 15.1 6 12 6zM5.3 13C2.6 13 1 14.3.3 17c.9-1.3 2-1.8 3.3-1.3 1 .4 1.7 1.1 2.5 1.9 1.3 1.3 2.8 2.4 5.9 2.4 2.7 0 4.3-1.3 5-4-.9 1.3-2 1.8-3.3 1.3-1-.4-1.7-1.1-2.5-1.9-1.3-1.3-2.8-2.4-5.9-2.4z"
      fill="#06B6D4"
    />
  </svg>
);

// 21. Data Structures & Algorithms (DSA Binary Tree Graph)
export const DsaIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="4" r="2.5" stroke="#38BDF8" strokeWidth="1.5" fill="#38BDF8" fillOpacity="0.2" />
    <circle cx="6" cy="12" r="2.5" stroke="#818CF8" strokeWidth="1.5" fill="#818CF8" fillOpacity="0.2" />
    <circle cx="18" cy="12" r="2.5" stroke="#818CF8" strokeWidth="1.5" fill="#818CF8" fillOpacity="0.2" />
    <circle cx="4" cy="20" r="2" stroke="#A78BFA" strokeWidth="1.5" fill="#A78BFA" fillOpacity="0.2" />
    <circle cx="8" cy="20" r="2" stroke="#A78BFA" strokeWidth="1.5" fill="#A78BFA" fillOpacity="0.2" />
    <circle cx="16" cy="20" r="2" stroke="#A78BFA" strokeWidth="1.5" fill="#A78BFA" fillOpacity="0.2" />
    <circle cx="20" cy="20" r="2" stroke="#A78BFA" strokeWidth="1.5" fill="#A78BFA" fillOpacity="0.2" />
    <path d="M10.5 6L7.5 10M13.5 6l3 4M5 14.5l-1 3.5M7 14.5l1 3.5M17 14.5l-1 3.5M19 14.5l1 3.5" stroke="#64748B" strokeWidth="1.2" />
  </svg>
);

// 22. Object Oriented Programming (OOP Modular Cubes)
export const OopIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L3.5 6.5v9L12 20l8.5-4.5v-9L12 2z" stroke="#C084FC" strokeWidth="1.5" fill="#C084FC" fillOpacity="0.15" />
    <path d="M12 2v9M3.5 6.5L12 11l8.5-4.5M12 11v9" stroke="#C084FC" strokeWidth="1.2" />
    <circle cx="12" cy="11" r="1.5" fill="#E879F9" />
  </svg>
);

// 23. Problem Solving
export const ProblemSolvingIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="#34D399" strokeWidth="1.5" fill="#34D399" fillOpacity="0.15" />
    <path d="M9 12l2 2 4-4" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 24. REST APIs
export const RestApiIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="3" stroke="#38BDF8" strokeWidth="1.5" fill="#38BDF8" fillOpacity="0.15" />
    <path d="M7 12h10M14 9l3 3-3 3" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="7" cy="12" r="1.5" fill="#38BDF8" />
  </svg>
);

// 25. Hibernate / JPA
export const HibernateIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#B07219" strokeWidth="1.5" fill="#B07219" fillOpacity="0.2" />
    <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#B07219" strokeWidth="1.5" />
    <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="#B07219" strokeWidth="1.5" />
    <path d="M12 9v6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 26. Bullseye Target Icon (Competitive Problem Solving)
export const BullseyeTargetIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="#F43F5E" strokeWidth="1.5" fill="#F43F5E" fillOpacity="0.12" />
    <circle cx="12" cy="12" r="6" stroke="#F43F5E" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.5" fill="#F43F5E" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="#F43F5E" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 27. Brain / AI Logic Icon
export const BrainTechIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"
      stroke="#EC4899"
      strokeWidth="1.5"
      fill="#EC4899"
      fillOpacity="0.15"
    />
  </svg>
);

// 28. Code Braces Icon ({})
export const CodeBracesIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 4C6 4 5 5 5 7v2c0 1.5-1 2-2 2 1 0 2 .5 2 2v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2 2 2-1 0-2 .5-2 2v2c0 2-1 3-3 3"
      stroke="#A855F7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 29. Database Cylinder Stack
export const DatabaseStackIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#06B6D4" strokeWidth="1.5" fill="#06B6D4" fillOpacity="0.15" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" stroke="#06B6D4" strokeWidth="1.5" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#06B6D4" strokeWidth="1.5" />
  </svg>
);

// Universal Tech Logo Resolver
export const TechLogo: React.FC<{
  name?: string;
  iconKey?: string;
  className?: string;
}> = ({ name = '', iconKey = '', className = 'w-5 h-5' }) => {
  const query = `${name} ${iconKey}`.toLowerCase();

  if (query.includes('spring boot') || (query.includes('spring') && !query.includes('security'))) return <SpringBootIcon className={className} />;
  if (query.includes('security') || query.includes('cyber') || query.includes('forensic') || query.includes('firewall') || query.includes('wireshark') || query.includes('kali') || query.includes('shield')) return <SpringSecurityIcon className={className} />;
  if (query.includes('ai') || query.includes('ml') || query.includes('machine learning') || query.includes('deep learning') || query.includes('pytorch') || query.includes('tensorflow') || query.includes('neural') || query.includes('scikit') || query.includes('brain') || query.includes('llm')) return <BrainTechIcon className={className} />;
  if (query.includes('java 21') || query.includes('core java') || query.includes('java')) return <JavaIcon className={className} />;
  if (query.includes('react')) return <ReactIcon className={className} />;
  if (query.includes('typescript') || query.includes('ts')) return <TypeScriptIcon className={className} />;
  if (query.includes('javascript') || query.includes('js')) return <JavaScriptIcon className={className} />;
  if (query.includes('python') || query.includes('fastapi')) return query.includes('fastapi') ? <FastApiIcon className={className} /> : <PythonIcon className={className} />;
  if (query.includes('c++') || query.includes('c & c++') || query.includes('cpp')) return <CppIcon className={className} />;
  if (query.includes('node')) return <NodeJsIcon className={className} />;
  if (query.includes('postgres')) return <PostgreSqlIcon className={className} />;
  if (query.includes('mysql') || query.includes('sql')) return <MySqlIcon className={className} />;
  if (query.includes('mongo')) return <MongoDbIcon className={className} />;
  if (query.includes('docker')) return <DockerIcon className={className} />;
  if (query.includes('git') || query.includes('github')) return <GitIcon className={className} />;
  if (query.includes('postman')) return <PostmanIcon className={className} />;
  if (query.includes('html & css') || query.includes('html and css')) {
    return (
      <div className={`flex items-center -space-x-1.5 ${className}`}>
        <HtmlIcon className="w-4 h-4" />
        <CssIcon className="w-4 h-4" />
      </div>
    );
  }
  if (query.includes('html')) return <HtmlIcon className={className} />;
  if (query.includes('css') || query.includes('tailwind')) return query.includes('tailwind') ? <TailwindIcon className={className} /> : <CssIcon className={className} />;
  if (query.includes('dsa') || query.includes('data structures') || query.includes('algorithms')) return <DsaIcon className={className} />;
  if (query.includes('oop') || query.includes('object-oriented')) return <OopIcon className={className} />;
  if (query.includes('problem solving') || query.includes('logic')) return <ProblemSolvingIcon className={className} />;
  if (query.includes('api') || query.includes('rest')) return <RestApiIcon className={className} />;
  if (query.includes('hibernate') || query.includes('jpa')) return <HibernateIcon className={className} />;
  if (query.includes('cloud') || query.includes('aws') || query.includes('azure') || query.includes('gcp')) return <DatabaseStackIcon className={className} />;

  // Default fallback
  return <DsaIcon className={className} />;
};
