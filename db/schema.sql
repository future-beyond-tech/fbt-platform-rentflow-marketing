-- =====================================================
-- RENTFLOW LEAN VALIDATION SCHEMA
-- Run against Neon: psql $DATABASE_URL -f db/schema.sql
-- =====================================================

-- Waitlist entries
CREATE TABLE IF NOT EXISTS waitlist_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(200),
    phone VARCHAR(20),
    company_name VARCHAR(200),

    referral_code VARCHAR(50) UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'hex'),
    referred_by UUID REFERENCES waitlist_entries(id),
    referral_count INTEGER DEFAULT 0,
    position INTEGER,

    status VARCHAR(20) DEFAULT 'pending',

    source VARCHAR(100),
    utm_campaign VARCHAR(200),
    utm_source VARCHAR(200),
    utm_medium VARCHAR(200),

    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Investor leads
CREATE TABLE IF NOT EXISTS investor_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    investor_type VARCHAR(50),
    linkedin_url TEXT,
    message TEXT,

    status VARCHAR(20) DEFAULT 'new',
    notes TEXT,

    source VARCHAR(100),

    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ROI calculator events
CREATE TABLE IF NOT EXISTS roi_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(100),

    properties INTEGER,
    beds_per_property INTEGER,
    avg_rent INTEGER,
    utility_cost_per_bed INTEGER,

    admin_hours_saved DECIMAL(10,2),
    revenue_leakage_recovered DECIMAL(12,2),
    annual_profit_impact DECIMAL(12,2),
    cost_reduction_pct INTEGER,

    source VARCHAR(100),

    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral ON waitlist_entries(referral_code);
CREATE INDEX IF NOT EXISTS idx_investor_email ON investor_leads(email);
CREATE INDEX IF NOT EXISTS idx_roi_session ON roi_calculations(session_id);
CREATE INDEX IF NOT EXISTS idx_roi_created ON roi_calculations(created_at);
