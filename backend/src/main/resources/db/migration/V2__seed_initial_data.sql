-- ==============================================================================
-- V2__seed_initial_data.sql: Authentic Baseline Data for Kanhaiya Pandey
-- ==============================================================================

-- Seed Profile
INSERT INTO profiles (
    full_name, title, bio, about_markdown, availability_status, location, email, linkedin_url, github_url, coffee_url
) VALUES (
    'Kanhaiya Pandey',
    'MCA Final Year Student | Full Stack Developer | Problem Solver',
    'I build modern, scalable and impactful applications with a passion for clean code and continuous learning.',
    'I am an MCA final year student specializing in Computer Applications with an emphasis on backend architectures, full-stack web development, and problem solving. My core focus lies in building scalable enterprise systems using Java, Spring Boot, and PostgreSQL, paired with responsive modern user interfaces built with React and TypeScript.\n\nI treat software development as an engineering craft: prioritizing maintainable architectures, secure API design, and intuitive user experiences.',
    'Open to Opportunities',
    'India',
    'kanhaiyapandey.dev@gmail.com',
    'https://linkedin.com',
    'https://github.com',
    'https://buymeacoffee.com'
) ON CONFLICT DO NOTHING;

-- Seed Core Skills (Technology Universe Orbit Nodes)
INSERT INTO skills (name, category, proficiency_level, description, icon_key, display_order, status) VALUES
('Java 21', 'BACKEND', 'ADVANCED', 'Core Java, OOP principles, Concurrency, Collections framework, Lambdas & Streams.', 'java', 1, 'PUBLISHED'),
('Spring Boot', 'BACKEND', 'ADVANCED', 'Spring MVC, Spring Data JPA, Spring Security, RESTful Web Services, Actuator.', 'spring', 2, 'PUBLISHED'),
('React', 'FRONTEND', 'INTERMEDIATE', 'Modern React, Hooks, Component design, State management, TypeScript integration.', 'react', 3, 'PUBLISHED'),
('TypeScript', 'FRONTEND', 'INTERMEDIATE', 'Type-safe frontend development, interfaces, generics, Vite tooling.', 'typescript', 4, 'PUBLISHED'),
('PostgreSQL', 'DATABASE', 'ADVANCED', 'Relational database schema modeling, indexing, joins, transactions, query optimization.', 'postgresql', 5, 'PUBLISHED'),
('REST APIs', 'BACKEND', 'ADVANCED', 'HTTP methods, stateless design, DTO mapping, status codes, OpenAPI documentation.', 'api', 6, 'PUBLISHED'),
('Git & GitHub', 'TOOLS', 'ADVANCED', 'Version control, branch management, collaborative workflows, CI/CD foundations.', 'git', 7, 'PUBLISHED'),
('Problem Solving', 'CORE', 'ADVANCED', 'Data Structures & Algorithms, array manipulation, tree traversal, system design basics.', 'code', 8, 'PUBLISHED')
ON CONFLICT (name) DO NOTHING;

-- Seed Initial Achievements
INSERT INTO achievements (title, metric_value, description, icon_key, display_order, status) VALUES
('Projects Built', '10+', 'Full stack web applications and backend services', 'rocket', 1, 'PUBLISHED'),
('Technologies Mastered', '15+', 'Languages, frameworks, and modern developer tools', 'cpu', 2, 'PUBLISHED'),
('Current Status', 'MCA Final Year', 'Master of Computer Applications degree candidate', 'award', 3, 'PUBLISHED')
ON CONFLICT DO NOTHING;

-- Seed Site Settings
INSERT INTO site_settings (setting_key, setting_value, description) VALUES
('site_title', 'Kanhaiya Pandey | Full Stack Developer', 'Portfolio website title for SEO'),
('meta_description', 'Official portfolio of Kanhaiya Pandey - MCA Final Year Student & Full Stack Developer.', 'Meta description tag'),
('support_coffee_url', 'https://buymeacoffee.com', 'Buy Me a Coffee platform profile link'),
('availability_badge', 'Available for Internships & Opportunities', 'Hero section availability text')
ON CONFLICT (setting_key) DO NOTHING;
