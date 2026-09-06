-- ==============================================================================
-- V5__expand_url_columns_to_text.sql: Expand URL & Asset Columns to TEXT
-- Allows long URLs, base64 Data URLs, and external CDN links without length truncation
-- ==============================================================================

ALTER TABLE profiles ALTER COLUMN avatar_url TYPE TEXT;
ALTER TABLE profiles ALTER COLUMN portrait_3d_url TYPE TEXT;
ALTER TABLE profiles ALTER COLUMN resume_url TYPE TEXT;
ALTER TABLE certificates ALTER COLUMN credential_url TYPE TEXT;
ALTER TABLE certificates ALTER COLUMN thumbnail_url TYPE TEXT;
ALTER TABLE achievements ALTER COLUMN proof_url TYPE TEXT;
ALTER TABLE projects ALTER COLUMN banner_url TYPE TEXT;
ALTER TABLE projects ALTER COLUMN thumbnail_url TYPE TEXT;
