-- ==============================================================================
-- V3__visitor_analytics.sql: Visitor Analytics & Telemetry Table
-- ==============================================================================

CREATE TABLE IF NOT EXISTS visitor_logs (
    id BIGSERIAL PRIMARY KEY,
    ip_address VARCHAR(100) NULL,
    user_agent VARCHAR(500) NULL,
    device_type VARCHAR(50) NOT NULL DEFAULT 'Desktop',
    browser VARCHAR(50) NOT NULL DEFAULT 'Other',
    operating_system VARCHAR(50) NOT NULL DEFAULT 'Other',
    referrer VARCHAR(500) NULL,
    page_path VARCHAR(255) NOT NULL DEFAULT '/',
    visited_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_visitor_logs_visited_at ON visitor_logs(visited_at);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_ip ON visitor_logs(ip_address);
