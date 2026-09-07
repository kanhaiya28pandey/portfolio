-- ==============================================================================
-- V6__create_stored_files_table.sql: Cloud Database Persistent File Storage
-- ==============================================================================

CREATE TABLE IF NOT EXISTS stored_files (
    id BIGSERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL UNIQUE,
    original_file_name VARCHAR(255) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    file_data BYTEA NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_stored_files_name ON stored_files(file_name);
