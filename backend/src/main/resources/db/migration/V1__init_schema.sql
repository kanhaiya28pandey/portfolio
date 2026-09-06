-- ==============================================================================
-- V1__init_schema.sql: Initial Schema Definition for Pandey Jee Portfolio & CMS
-- ==============================================================================

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ROLE_ADMIN',
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMP NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Profile Table (Single Portfolio Owner Identity)
CREATE TABLE IF NOT EXISTS profiles (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    about_markdown TEXT NOT NULL,
    avatar_url VARCHAR(500) NULL,
    portrait_3d_url VARCHAR(500) NULL,
    resume_url VARCHAR(500) NULL,
    availability_status VARCHAR(100) NOT NULL DEFAULT 'Open to Opportunities',
    location VARCHAR(150) NULL,
    email VARCHAR(200) NULL,
    linkedin_url VARCHAR(500) NULL,
    github_url VARCHAR(500) NULL,
    coffee_url VARCHAR(500) NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skills Table (Technology Universe Nodes)
CREATE TABLE IF NOT EXISTS skills (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL, -- FRONTEND, BACKEND, DATABASE, TOOLS, CORE
    proficiency_level VARCHAR(50) NOT NULL DEFAULT 'INTERMEDIATE', -- BEGINNER, LEARNING, INTERMEDIATE, ADVANCED, STRONG
    description TEXT NULL,
    icon_key VARCHAR(100) NULL,
    display_order INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED', -- DRAFT, PUBLISHED, ARCHIVED
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    summary VARCHAR(500) NOT NULL,
    description_markdown TEXT NULL,
    thumbnail_url VARCHAR(500) NULL,
    banner_url VARCHAR(500) NULL,
    live_url VARCHAR(500) NULL,
    github_url VARCHAR(500) NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'FULLSTACK', -- FULLSTACK, BACKEND, FRONTEND
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED', -- DRAFT, PUBLISHED, ARCHIVED
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 5. Project Skills Join Table
CREATE TABLE IF NOT EXISTS project_skills (
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, skill_id)
);

-- 6. Experience Timeline
CREATE TABLE IF NOT EXISTS experiences (
    id BIGSERIAL PRIMARY KEY,
    organization VARCHAR(200) NOT NULL,
    role VARCHAR(150) NOT NULL,
    location VARCHAR(150) NULL,
    duration VARCHAR(100) NOT NULL,
    description_markdown TEXT NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. Education Timeline
CREATE TABLE IF NOT EXISTS educations (
    id BIGSERIAL PRIMARY KEY,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(150) NOT NULL,
    field_of_study VARCHAR(150) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    grade_or_percentage VARCHAR(50) NULL,
    description TEXT NULL,
    display_order INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Certificates
CREATE TABLE IF NOT EXISTS certificates (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    issuing_org VARCHAR(200) NOT NULL,
    issue_date VARCHAR(100) NOT NULL,
    credential_url VARCHAR(500) NULL,
    thumbnail_url VARCHAR(500) NULL,
    display_order INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 9. Achievements & Highlights
CREATE TABLE IF NOT EXISTS achievements (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    metric_value VARCHAR(100) NOT NULL,
    description VARCHAR(500) NULL,
    icon_key VARCHAR(100) NULL,
    display_order INT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED'
);

-- 10. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(200) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    inquiry_type VARCHAR(100) NOT NULL DEFAULT 'GENERAL', -- JOB, INTERNSHIP, COLLABORATION, FREELANCE, GENERAL
    ip_address VARCHAR(100) NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW', -- NEW, READ, REPLIED, ARCHIVED
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 11. Admin Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    admin_username VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL, -- LOGIN, LOGOUT, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, etc.
    entity_type VARCHAR(100) NULL,
    entity_id VARCHAR(100) NULL,
    details TEXT NULL,
    ip_address VARCHAR(100) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 12. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    id BIGSERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description VARCHAR(255) NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for optimal lookup performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_status ON skills(status);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
