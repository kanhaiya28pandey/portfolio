-- ==============================================================================
-- V4__add_achievement_fields.sql: Complete Achievement Entity Schema
-- ==============================================================================

ALTER TABLE achievements ADD COLUMN IF NOT EXISTS organization VARCHAR(200) NULL;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS issue_date VARCHAR(100) NULL;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS proof_url VARCHAR(500) NULL;
