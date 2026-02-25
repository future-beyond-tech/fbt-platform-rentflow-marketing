# RentFlow — Comprehensive Backend & Infrastructure Requirements Document

## Executive Summary

**Document Version:** 1.0  
**Date:** February 23, 2026  
**Classification:** Technical Architecture — Confidential  

### Current State Assessment

| Component | Status | Risk Level |
|-----------|--------|------------|
| Frontend (Next.js 16) | ✅ Functional | Low |
| Waitlist Form | ⚠️ Mocked | Critical |
| Investor Form | ⚠️ Mocked | Critical |
| ROI Calculator | ✅ Frontend Only | Medium |
| Authentication | ⚠️ Placeholders | Critical |
| Dashboard | ⚠️ Placeholder | Critical |
| API Layer | ❌ Missing | Critical |
| Database | ❌ Missing | Critical |
| Payment Integration | ❌ Missing | High |
| Email Service | ❌ Missing | High |

### Executive Recommendation

**Current Technical Debt:** EXTREME  
**Production Readiness:** 15%  
**Estimated Time to MVP:** 12-16 weeks with dedicated team  
**Estimated Time to Production:** 20-24 weeks  

---

## 1. High-Level System Architecture

### 1.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                     CLIENT LAYER                                        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│  Web App (Next.js 16)    │    Mobile App (Future)    │    Partner APIs                 │
│  ├─ Marketing Pages      │    ├─ React Native        │    ├─ Webhooks                  │
│  ├─ Dashboard            │    ├─ iOS/Android         │    └─ Embedded Widgets          │
│  └─ Auth Pages           │    └─ Push Notifications  │                                 │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                  EDGE / CDN LAYER                                       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│  Vercel Edge / CloudFront  │  DDoS Protection (Cloudflare)  │  WAF Rules               │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   API GATEWAY LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ Rate Limit  │  │ Auth Middleware│  │ Request     │  │ Response    │  │ Logging     │   │
│  │ (Redis)     │  │ (JWT/OAuth2)  │  │ Validation  │  │ Caching     │  │ & Tracing   │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 MICROSERVICES LAYER                                     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │   AUTH       │  │  TENANT      │  │  PROPERTY    │  │   BILLING    │                │
│  │  SERVICE     │  │  SERVICE     │  │  SERVICE     │  │  SERVICE     │                │
│  │              │  │              │  │              │  │              │                │
│  │ • Login/Reg  │  │ • Onboarding │  │ • CRUD       │  │ • Invoicing  │                │
│  │ • JWT Mgmt   │  │ • Profiles   │  │ • Analytics  │  │ • Payments   │                │
│  │ • RBAC       │  │ • Settings   │  │ • Search     │  │ • Usage Trk  │                │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘                │
│                                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                │
│  │  WAITLIST    │  │  INVESTOR    │  │NOTIFICATION  │  │  ANALYTICS   │                │
│  │  SERVICE     │  │   CRM        │  │  SERVICE     │  │  SERVICE     │                │
│  │              │  │  SERVICE     │  │              │  │              │                │
│  │ • Signup     │  │              │  │ • Email      │  │ • Reports    │                │
│  │ • Referrals  │  │ • Lead Capt  │  │ • SMS        │  │ • Dashboard  │                │
│  │ • Scarcity   │  │ • Nurturing  │  │ • WhatsApp   │  │ • Exports    │                │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘                │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                  DATA LAYER                                             │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐                        │
│  │   PostgreSQL   │    │     Redis      │    │  Elasticsearch │                        │
│  │   (Primary DB) │    │    (Cache/     │    │   (Search/     │                        │
│  │                │    │    Sessions)   │    │    Logs)       │                        │
│  │ • Users        │    │                │    │                │                        │
│  │ • Tenants      │    │ • Sessions     │    │ • Property     │                        │
│  │ • Properties   │    │ • Rate Limits  │    │   Search       │                        │
│  │ • Invoices     │    │ • Caching      │    │ • Analytics    │                        │
│  │ • Payments     │    │ • Pub/Sub      │    │ • Audit Logs   │                        │
│  └────────────────┘    └────────────────┘    └────────────────┘                        │
│                                                                                         │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐                        │
│  │  ClickHouse    │    │   S3/MinIO     │    │  TimescaleDB   │                        │
│  │ (Analytics DB) │    │  (File Storage)│    │  (Time Series) │                        │
│  │                │    │                │    │                │                        │
│  │ • Usage Events │    │ • Documents    │    │ • Metrics      │                        │
│  │ • Billing Data │    │ • Images       │    │ • Monitoring   │                        │
│  │ • Aggregations │    │ • Exports      │    │ • IoT Data     │                        │
│  └────────────────┘    └────────────────┘    └────────────────┘                        │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
                                           │
                                           ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL INTEGRATIONS                                      │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  Payments          Communication        Compliance           Monitoring                │
│  ├─ Razorpay       ├─ SendGrid/SES      ├─ GST API           ├─ DataDog/NewRelic       │
│  ├─ Stripe         ├─ Twilio (SMS)      ├─ PAN Verification  ├─ PagerDuty              │
│  ├─ UPI (NPCI)     ├─ WhatsApp API      ├─ Aadhaar (eKYC)    └─ StatusPage             │
│  └─ Auto-debit     └─ Firebase (Push)   └─ eSign (DigiLocker)                            │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Technology Stack Recommendations

| Layer | Technology | Justification |
|-------|------------|---------------|
| **API Framework** | Node.js + Fastify/NestJS | High throughput, TypeScript native, microservices-friendly |
| **Primary Database** | PostgreSQL 16 | ACID compliance, JSON support, excellent for multi-tenant |
| **Cache Layer** | Redis Cluster | Sessions, rate limiting, real-time features |
| **Search Engine** | Elasticsearch 8 | Full-text property search, analytics aggregation |
| **Queue System** | RabbitMQ / Apache Kafka | Event-driven architecture, async processing |
| **Object Storage** | AWS S3 / Cloudflare R2 | Document storage, backups, exports |
| **Analytics DB** | ClickHouse | High-speed aggregations, usage-based billing |
| **Time Series** | TimescaleDB | Metrics, IoT data, monitoring |

---

## 2. Backend Service Breakdown

### 2.1 Authentication Service

#### Responsibilities
- User registration and login
- JWT token issuance and rotation
- Multi-factor authentication (MFA)
- Password reset and recovery
- Session management
- Role-based access control (RBAC)
- OAuth2 integration (Google, LinkedIn)
- API key management for integrations

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/auth/register | No | User registration |
| POST | /api/v1/auth/login | No | User login |
| POST | /api/v1/auth/logout | Yes | Logout user |
| POST | /api/v1/auth/refresh | Yes | Refresh access token |
| POST | /api/v1/auth/forgot-password | No | Password reset request |
| POST | /api/v1/auth/reset-password | No | Password reset confirmation |
| POST | /api/v1/auth/verify-email | No | Email verification |
| POST | /api/v1/auth/mfa/enable | Yes | Enable MFA |
| POST | /api/v1/auth/mfa/verify | Yes | Verify MFA code |
| GET | /api/v1/auth/me | Yes | Get current user |
| PUT | /api/v1/auth/me | Yes | Update profile |

#### Required Database Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email_verified_at TIMESTAMP,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(255),
    role VARCHAR(50) DEFAULT 'owner', -- super_admin, admin, manager, viewer
    status VARCHAR(20) DEFAULT 'active', -- active, suspended, pending
    last_login_at TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Sessions table (can use Redis instead)
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token_hash VARCHAR(255) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- API Keys for integrations
CREATE TABLE api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    name VARCHAR(100) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    permissions JSONB DEFAULT '[]',
    last_used_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);
```

#### Indexes
```sql
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_sessions_expires ON user_sessions(expires_at);
CREATE INDEX idx_api_keys_tenant ON api_keys(tenant_id);
```

#### Security Requirements
- Passwords: bcrypt with cost factor 12+
- JWT: RS256 with 2048-bit RSA keys
- Token expiration: Access 15min, Refresh 7 days
- Rate limiting: 5 login attempts per 15 minutes per IP
- Session rotation on privilege changes
- Automatic logout on password change

---

### 2.2 Tenant Management Service

#### Responsibilities
- Multi-tenant isolation
- Tenant onboarding workflow
- Subscription and plan management
- Usage tracking per tenant
- Tenant-specific settings and configuration
- White-label customization

#### Required Endpoints

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | /api/v1/tenants | Yes | system | Create new tenant |
| GET | /api/v1/tenants | Yes | system | List all tenants |
| GET | /api/v1/tenants/:id | Yes | admin+ | Get tenant details |
| PUT | /api/v1/tenants/:id | Yes | admin+ | Update tenant |
| DELETE | /api/v1/tenants/:id | Yes | system | Soft delete tenant |
| GET | /api/v1/tenants/:id/settings | Yes | admin+ | Get tenant settings |
| PUT | /api/v1/tenants/:id/settings | Yes | admin+ | Update settings |
| GET | /api/v1/tenants/:id/usage | Yes | admin+ | Get usage metrics |
| GET | /api/v1/tenants/:id/billing | Yes | admin+ | Get billing info |

#### Required Database Tables

```sql
-- Tenants table (multi-tenant root)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    plan VARCHAR(50) DEFAULT 'starter', -- starter, growth, enterprise
    status VARCHAR(20) DEFAULT 'trial', -- trial, active, suspended, cancelled
    billing_email VARCHAR(255) NOT NULL,
    billing_address JSONB,
    gst_number VARCHAR(50),
    pan_number VARCHAR(20),
    settings JSONB DEFAULT '{}',
    white_label JSONB DEFAULT '{}', -- logo, colors, domain
    trial_ends_at TIMESTAMP,
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

-- Tenant membership (users ↔ tenants)
CREATE TABLE tenant_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member', -- owner, admin, manager, viewer
    permissions JSONB DEFAULT '{}',
    invited_by UUID REFERENCES users(id),
    invited_at TIMESTAMP,
    joined_at TIMESTAMP DEFAULT NOW(),
    last_active_at TIMESTAMP,
    UNIQUE(tenant_id, user_id)
);

-- Usage tracking for billing
CREATE TABLE usage_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL, -- beds, invoices, payments, messages
    quantity INTEGER NOT NULL DEFAULT 0,
    recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
    metadata JSONB DEFAULT '{}',
    UNIQUE(tenant_id, metric_type, recorded_at)
);

-- Subscription history
CREATE TABLE subscription_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    plan VARCHAR(50) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    status VARCHAR(20) NOT NULL, -- active, cancelled, expired
    started_at TIMESTAMP NOT NULL,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### Multi-Tenant Strategy: Row-Level Security (RLS)

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY tenant_isolation ON properties
    USING (tenant_id = current_setting('app.current_tenant')::UUID);

-- Set tenant context before queries
SET app.current_tenant = 'tenant-uuid-here';
```

---

### 2.3 Property Management Service

#### Responsibilities
- Property CRUD operations
- Floor and room management
- Bed/unit inventory
- Amenity tracking
- Maintenance scheduling
- Document management
- Property analytics

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/properties | Yes | Create property |
| GET | /api/v1/properties | Yes | List properties |
| GET | /api/v1/properties/:id | Yes | Get property details |
| PUT | /api/v1/properties/:id | Yes | Update property |
| DELETE | /api/v1/properties/:id | Yes | Delete property |
| POST | /api/v1/properties/:id/floors | Yes | Add floor |
| GET | /api/v1/properties/:id/floors | Yes | List floors |
| POST | /api/v1/floors/:id/rooms | Yes | Add room |
| POST | /api/v1/rooms/:id/beds | Yes | Add bed |
| GET | /api/v1/beds | Yes | List all beds |
| PUT | /api/v1/beds/:id | Yes | Update bed status |
| GET | /api/v1/properties/analytics | Yes | Property analytics |

#### Required Database Tables

```sql
-- Properties table
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- pg, hostel, coliving, apartment
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(2) DEFAULT 'IN',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    total_floors INTEGER DEFAULT 1,
    amenities JSONB DEFAULT '[]',
    rules JSONB DEFAULT '{}', -- guest policy, timing, etc.
    images JSONB DEFAULT '[]',
    documents JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, maintenance
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
);

-- Floors table
CREATE TABLE floors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    floor_number INTEGER NOT NULL,
    name VARCHAR(100),
    total_rooms INTEGER DEFAULT 0,
    amenities JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(property_id, floor_number)
);

-- Rooms table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    floor_id UUID NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    room_number VARCHAR(50) NOT NULL,
    room_type VARCHAR(50) DEFAULT 'standard', -- standard, deluxe, premium
    total_beds INTEGER NOT NULL DEFAULT 1,
    amenities JSONB DEFAULT '[]',
    square_footage INTEGER,
    rent_amount DECIMAL(10,2),
    deposit_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'available', -- available, occupied, maintenance
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Beds/Units table
CREATE TABLE beds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    bed_number VARCHAR(50) NOT NULL,
    bed_type VARCHAR(50) DEFAULT 'single', -- single, double, bunk
    current_tenant_id UUID REFERENCES tenants(id),
    rent_amount DECIMAL(10,2) NOT NULL,
    deposit_amount DECIMAL(10,2),
    status VARCHAR(20) DEFAULT 'vacant', -- vacant, occupied, reserved, maintenance
    amenities JSONB DEFAULT '[]',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Property documents
CREATE TABLE property_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- deed, license, insurance, inspection
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    expiry_date DATE,
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Maintenance records
CREATE TABLE maintenance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id),
    room_id UUID REFERENCES rooms(id),
    bed_id UUID REFERENCES beds(id),
    issue_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    status VARCHAR(20) DEFAULT 'open', -- open, in_progress, completed, cancelled
    reported_by UUID REFERENCES users(id),
    assigned_to UUID REFERENCES users(id),
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### 2.4 Tenant (Resident) Lifecycle Service

#### Responsibilities
- Tenant onboarding
- Background verification
- Digital agreements
- KYC document management
- Notice tracking
- Tenant history

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/residents | Yes | Create resident profile |
| GET | /api/v1/residents | Yes | List residents |
| GET | /api/v1/residents/:id | Yes | Get resident details |
| PUT | /api/v1/residents/:id | Yes | Update resident |
| POST | /api/v1/residents/:id/verify | Yes | Trigger verification |
| POST | /api/v1/residents/:id/agreements | Yes | Create agreement |
| GET | /api/v1/residents/:id/agreements | Yes | List agreements |
| POST | /api/v1/residents/:id/checkin | Yes | Record check-in |
| POST | /api/v1/residents/:id/checkout | Yes | Record check-out |
| POST | /api/v1/residents/:id/notice | Yes | Submit notice |

#### Required Database Tables

```sql
-- Residents (tenants/occupants)
CREATE TABLE residents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    bed_id UUID REFERENCES beds(id),
    
    -- Personal info
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    emergency_contact JSONB,
    
    -- KYC
    pan_number VARCHAR(20),
    aadhaar_number VARCHAR(20),
    kyc_status VARCHAR(20) DEFAULT 'pending', -- pending, verified, rejected
    kyc_documents JSONB DEFAULT '[]',
    
    -- Employment/Education
    occupation VARCHAR(100),
    organization VARCHAR(255),
    organization_address TEXT,
    
    -- Current status
    status VARCHAR(20) DEFAULT 'prospect', -- prospect, active, inactive, blacklisted
    check_in_date DATE,
    check_out_date DATE,
    expected_check_out DATE,
    
    -- Meta
    source VARCHAR(50), -- how they found out
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Rental agreements
CREATE TABLE rental_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
    bed_id UUID NOT NULL REFERENCES beds(id),
    
    -- Agreement details
    agreement_number VARCHAR(100) UNIQUE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    rent_amount DECIMAL(10,2) NOT NULL,
    deposit_amount DECIMAL(10,2) NOT NULL,
    maintenance_charges DECIMAL(10,2) DEFAULT 0,
    utility_charges DECIMAL(10,2) DEFAULT 0,
    
    -- Terms
    notice_period_days INTEGER DEFAULT 30,
    rent_due_day INTEGER DEFAULT 5,
    late_fee_percentage DECIMAL(5,2) DEFAULT 5.00,
    
    -- Document
    document_url TEXT,
    signed_by_resident_at TIMESTAMP,
    signed_by_owner_at TIMESTAMP,
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft', -- draft, active, expired, terminated
    termination_reason TEXT,
    terminated_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Background verifications
CREATE TABLE background_checks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- internal, third_party
    check_type VARCHAR(50) NOT NULL, -- identity, criminal, employment, address
    status VARCHAR(20) DEFAULT 'pending', -- pending, in_progress, completed, failed
    result JSONB,
    report_url TEXT,
    cost DECIMAL(10,2),
    initiated_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- Notices (move-out notices)
CREATE TABLE notices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
    agreement_id UUID NOT NULL REFERENCES rental_agreements(id),
    notice_type VARCHAR(20) NOT NULL, -- move_out, rent_increase, termination
    notice_date DATE NOT NULL,
    intended_date DATE NOT NULL,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'active', -- active, acknowledged, withdrawn, expired
    acknowledged_by UUID REFERENCES users(id),
    acknowledged_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 2.5 Billing & Invoicing Service

#### Responsibilities
- Automated invoice generation
- Prorated calculations
- Multi-component billing
- Late fee calculations
- Payment tracking
- GST compliance
- Usage-based billing aggregation

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/invoices | Yes | Create invoice |
| GET | /api/v1/invoices | Yes | List invoices |
| GET | /api/v1/invoices/:id | Yes | Get invoice details |
| PUT | /api/v1/invoices/:id | Yes | Update invoice |
| POST | /api/v1/invoices/:id/send | Yes | Send invoice |
| POST | /api/v1/invoices/generate-batch | Yes | Batch generate |
| GET | /api/v1/invoices/overdue | Yes | Get overdue invoices |
| POST | /api/v1/invoices/:id/credit-note | Yes | Create credit note |
| GET | /api/v1/billing/settings | Yes | Get billing settings |
| PUT | /api/v1/billing/settings | Yes | Update billing settings |

#### Required Database Tables

```sql
-- Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    resident_id UUID REFERENCES residents(id),
    agreement_id UUID REFERENCES rental_agreements(id),
    
    -- Invoice details
    invoice_number VARCHAR(100) UNIQUE NOT NULL,
    invoice_type VARCHAR(50) DEFAULT 'rent', -- rent, deposit, maintenance, utility, penalty
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    
    -- Amounts
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    amount_paid DECIMAL(12,2) DEFAULT 0,
    balance_due DECIMAL(12,2) GENERATED ALWAYS AS (total_amount - amount_paid) STORED,
    
    -- GST (India specific)
    gst_enabled BOOLEAN DEFAULT TRUE,
    gst_number VARCHAR(50),
    cgst_rate DECIMAL(5,2) DEFAULT 9,
    sgst_rate DECIMAL(5,2) DEFAULT 9,
    igst_rate DECIMAL(5,2) DEFAULT 18,
    
    -- Status
    status VARCHAR(20) DEFAULT 'draft', -- draft, sent, viewed, paid, overdue, cancelled
    sent_at TIMESTAMP,
    paid_at TIMESTAMP,
    
    -- Metadata
    notes TEXT,
    terms TEXT,
    line_items JSONB NOT NULL DEFAULT '[]',
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Invoice line items (denormalized for performance)
CREATE TABLE invoice_line_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) DEFAULT 1,
    unit VARCHAR(50),
    rate DECIMAL(12,2) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    metadata JSONB DEFAULT '{}'
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    invoice_id UUID REFERENCES invoices(id),
    resident_id UUID REFERENCES residents(id),
    
    -- Payment details
    payment_number VARCHAR(100) UNIQUE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method VARCHAR(50) NOT NULL, -- upi, card, netbanking, cash, cheque
    payment_mode VARCHAR(50), -- razorpay, stripe, cashfree, manual
    
    -- Gateway info
    gateway_payment_id VARCHAR(255),
    gateway_order_id VARCHAR(255),
    gateway_signature VARCHAR(255),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, refunded
    paid_at TIMESTAMP,
    
    -- Metadata
    utr_number VARCHAR(100), -- for UPI/bank transfers
    notes TEXT,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Payment allocations (for partial payments across invoices)
CREATE TABLE payment_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Utility readings
CREATE TABLE utility_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id),
    
    reading_type VARCHAR(50) NOT NULL, -- electricity, water, gas, internet
    reading_date DATE NOT NULL,
    previous_reading DECIMAL(12,2) NOT NULL,
    current_reading DECIMAL(12,2) NOT NULL,
    consumption DECIMAL(12,2) GENERATED ALWAYS AS (current_reading - previous_reading) STORED,
    
    rate_per_unit DECIMAL(10,2),
    total_amount DECIMAL(12,2),
    
    -- Distribution
    distributed_to JSONB DEFAULT '[]', -- bed_ids with split amounts
    
    recorded_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Billing settings per tenant
CREATE TABLE billing_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Invoice settings
    invoice_prefix VARCHAR(20) DEFAULT 'INV',
    invoice_starting_number INTEGER DEFAULT 1000,
    default_due_days INTEGER DEFAULT 5,
    
    -- Late fees
    late_fee_enabled BOOLEAN DEFAULT TRUE,
    late_fee_type VARCHAR(20) DEFAULT 'percentage', -- percentage, fixed
    late_fee_value DECIMAL(10,2) DEFAULT 5.00,
    late_fee_grace_period_days INTEGER DEFAULT 3,
    
    -- Reminders
    reminder_enabled BOOLEAN DEFAULT TRUE,
    reminder_days_before INTEGER DEFAULT 3,
    reminder_days_after INTEGER[] DEFAULT ARRAY[1, 7, 15],
    
    -- GST
    gst_enabled BOOLEAN DEFAULT TRUE,
    gst_number VARCHAR(50),
    cgst_rate DECIMAL(5,2) DEFAULT 9,
    sgst_rate DECIMAL(5,2) DEFAULT 9,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tenant_id)
);
```

---

### 2.6 Payment Gateway Service

#### Responsibilities
- Payment gateway integration
- UPI QR generation
- Auto-debit setup
- Payment reconciliation
- Refund processing
- Webhook handling

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/payments/initiate | Yes | Initiate payment |
| POST | /api/v1/payments/:id/verify | Yes | Verify payment |
| POST | /api/v1/payments/webhooks/razorpay | No | Razorpay webhook |
| GET | /api/v1/payments/methods | Yes | List saved methods |
| POST | /api/v1/payments/methods | Yes | Save payment method |
| DELETE | /api/v1/payments/methods/:id | Yes | Remove payment method |
| POST | /api/v1/payments/:id/refund | Yes | Process refund |
| GET | /api/v1/payments/reconciliation | Yes | Reconciliation report |

#### Required Database Tables

```sql
-- Payment methods (saved cards/UPI)
CREATE TABLE saved_payment_methods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
    
    method_type VARCHAR(50) NOT NULL, -- card, upi, netbanking
    gateway VARCHAR(50) NOT NULL,
    gateway_token VARCHAR(255) NOT NULL,
    
    -- Card details (masked)
    card_network VARCHAR(50),
    card_last4 VARCHAR(4),
    card_expiry_month VARCHAR(2),
    card_expiry_year VARCHAR(4),
    
    -- UPI
    upi_vpa VARCHAR(255),
    
    is_default BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Auto-debit mandates (eNACH/eMandate)
CREATE TABLE payment_mandates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resident_id UUID NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
    agreement_id UUID NOT NULL REFERENCES rental_agreements(id),
    
    mandate_type VARCHAR(50) NOT NULL, -- enach, emandate, standing_instruction
    gateway VARCHAR(50) NOT NULL,
    gateway_mandate_id VARCHAR(255) NOT NULL,
    
    max_amount DECIMAL(12,2) NOT NULL,
    frequency VARCHAR(50) NOT NULL, -- monthly, quarterly, as_presented
    
    status VARCHAR(20) DEFAULT 'pending', -- pending, active, suspended, cancelled
    
    start_date DATE NOT NULL,
    end_date DATE,
    
    authorized_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payment gateway logs
CREATE TABLE gateway_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gateway VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_id VARCHAR(255),
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    processed_at TIMESTAMP,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### External Integrations

| Provider | Use Case | Priority |
|----------|----------|----------|
| Razorpay | Primary PG (India) | P0 |
| Cashfree | Backup PG | P1 |
| Stripe | International | P2 |
| Setu | Account aggregator | P2 |
| NPCI | UPI infrastructure | P1 |

---

### 2.7 Waitlist Service

#### Responsibilities
- Waitlist entry capture
- Referral tracking and gamification
- Position management
- Scarcity marketing
- Email automation
- Spam protection

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/waitlist | No | Join waitlist |
| GET | /api/v1/waitlist/position | No | Get position |
| POST | /api/v1/waitlist/referral | No | Record referral |
| GET | /api/v1/waitlist/stats | No | Public stats |
| GET | /api/v1/admin/waitlist | Yes | Admin list |
| PUT | /api/v1/admin/waitlist/:id | Yes | Update entry |
| POST | /api/v1/admin/waitlist/:id/invite | Yes | Send invite |

#### Required Database Tables

```sql
-- Waitlist entries
CREATE TABLE waitlist_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(200),
    phone VARCHAR(20),
    company_name VARCHAR(200),
    
    -- Referral tracking
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by UUID REFERENCES waitlist_entries(id),
    referral_count INTEGER DEFAULT 0,
    
    -- Position tracking
    position_number INTEGER,
    original_position INTEGER,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- pending, invited, registered, cancelled
    priority VARCHAR(20) DEFAULT 'normal', -- normal, high, vip
    
    -- Engagement
    source VARCHAR(100), -- landing, waitlist, referral, ad
    utm_campaign VARCHAR(200),
    utm_source VARCHAR(200),
    utm_medium VARCHAR(200),
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    
    -- Timeline
    invited_at TIMESTAMP,
    registered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Waitlist referral events
CREATE TABLE waitlist_referrals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referrer_id UUID NOT NULL REFERENCES waitlist_entries(id) ON DELETE CASCADE,
    referred_id UUID NOT NULL REFERENCES waitlist_entries(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, invalid
    reward_claimed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(referrer_id, referred_id)
);

-- Email events
CREATE TABLE waitlist_email_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    waitlist_id UUID NOT NULL REFERENCES waitlist_entries(id) ON DELETE CASCADE,
    email_type VARCHAR(50) NOT NULL, -- welcome, position_update, invitation
    sent_at TIMESTAMP DEFAULT NOW(),
    opened_at TIMESTAMP,
    clicked_at TIMESTAMP,
    
    -- Tracking
    message_id VARCHAR(255),
    provider VARCHAR(50)
);
```

#### Spam Protection Strategy

```javascript
// Rate limiting rules
const rateLimits = {
  // Per IP
  ip: { points: 5, duration: 60 * 60 }, // 5 submissions per hour per IP
  
  // Per email domain (prevent disposable emails)
  domain: { points: 10, duration: 60 * 60 },
  
  // Global burst protection
  global: { points: 100, duration: 60 }, // 100 submissions per minute globally
};

// Email validation
const validateEmail = (email) => {
  // 1. Regex validation
  // 2. DNS MX record check
  // 3. Disposable email blacklist
  // 4. Role-based email detection (admin@, info@, etc.)
  // 5. Honeypot field check
};

// Bot protection
const botProtection = {
  honeypotField: 'website', // invisible field
  timeOnPage: { min: 3000 }, // minimum 3 seconds
  mouseMovement: true, // check for human-like movement
};
```

---

### 2.8 Investor CRM Service

#### Responsibilities
- Investor lead capture
- Lead scoring and qualification
- Drip email campaigns
- Document distribution
- Meeting scheduling
- Pipeline tracking

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/investor-leads | No | Submit lead |
| GET | /api/v1/investor-leads/:id | Yes | Get lead |
| GET | /api/v1/admin/investor-leads | Yes | Admin list |
| PUT | /api/v1/admin/investor-leads/:id | Yes | Update lead |
| POST | /api/v1/admin/investor-leads/:id/note | Yes | Add note |
| POST | /api/v1/admin/investor-leads/:id/email | Yes | Send email |
| GET | /api/v1/investor/documents | Yes | Access documents |

#### Required Database Tables

```sql
-- Investor leads
CREATE TABLE investor_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Contact info
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    linkedin_url TEXT,
    
    -- Profile
    investor_type VARCHAR(50), -- angel, vc, pg_operator, corporate
    investment_range VARCHAR(50), -- <10L, 10-50L, 50L-1Cr, 1Cr+
    geography VARCHAR(100),
    
    -- Qualification
    accredited BOOLEAN,
    previous_investments TEXT,
    
    -- CRM
    status VARCHAR(20) DEFAULT 'new', -- new, contacted, qualified, meeting_scheduled, pitched, negotiating, closed, lost
    lead_score INTEGER DEFAULT 0, -- 0-100
    lead_temperature VARCHAR(20) GENERATED ALWAYS AS (
        CASE 
            WHEN lead_score >= 80 THEN 'hot'
            WHEN lead_score >= 50 THEN 'warm'
            ELSE 'cold'
        END
    ) STORED,
    
    -- Assignment
    assigned_to UUID REFERENCES users(id),
    
    -- Source tracking
    source VARCHAR(100),
    utm_campaign VARCHAR(200),
    
    -- Communication
    last_contacted_at TIMESTAMP,
    next_follow_up_at TIMESTAMP,
    
    -- Notes
    message TEXT,
    internal_notes TEXT,
    
    -- Document access
    document_access_enabled BOOLEAN DEFAULT FALSE,
    document_access_expires_at TIMESTAMP,
    
    -- Metadata
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Lead activities
CREATE TABLE investor_lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES investor_leads(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- email_sent, email_opened, call_made, meeting_scheduled, note_added
    description TEXT,
    performed_by UUID REFERENCES users(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Document access log
CREATE TABLE investor_document_access (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES investor_leads(id) ON DELETE CASCADE,
    document_name VARCHAR(200) NOT NULL,
    accessed_at TIMESTAMP DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);
```

---

### 2.9 Notification Service

#### Responsibilities
- Email delivery
- SMS delivery
- WhatsApp messaging
- Push notifications
- In-app notifications
- Template management
- Delivery tracking

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/v1/notifications/email | Yes | Send email |
| POST | /api/v1/notifications/sms | Yes | Send SMS |
| POST | /api/v1/notifications/whatsapp | Yes | Send WhatsApp |
| POST | /api/v1/notifications/push | Yes | Send push |
| GET | /api/v1/notifications/templates | Yes | List templates |
| POST | /api/v1/notifications/templates | Yes | Create template |
| GET | /api/v1/notifications/history | Yes | Notification history |

#### Required Database Tables

```sql
-- Notification templates
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL, -- email, sms, whatsapp, push
    channel VARCHAR(50) NOT NULL, -- transactional, promotional, reminder
    
    subject TEXT,
    body TEXT NOT NULL,
    body_html TEXT,
    
    variables JSONB DEFAULT '[]',
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(tenant_id, name, type)
);

-- Notification queue
CREATE TABLE notification_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    recipient_type VARCHAR(50) NOT NULL, -- user, resident, group
    recipient_id UUID,
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(20),
    
    template_id UUID REFERENCES notification_templates(id),
    
    channel VARCHAR(20) NOT NULL, -- email, sms, whatsapp, push
    subject TEXT,
    content TEXT,
    
    variables JSONB DEFAULT '{}',
    
    status VARCHAR(20) DEFAULT 'pending', -- pending, processing, sent, failed, cancelled
    priority INTEGER DEFAULT 5, -- 1-10
    
    scheduled_at TIMESTAMP DEFAULT NOW(),
    sent_at TIMESTAMP,
    delivered_at TIMESTAMP,
    failed_at TIMESTAMP,
    error_message TEXT,
    
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 3,
    
    metadata JSONB DEFAULT '{}',
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Notification preferences
CREATE TABLE notification_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    channel VARCHAR(20) NOT NULL, -- email, sms, whatsapp, push
    event_type VARCHAR(100) NOT NULL, -- invoice_created, payment_received, etc.
    
    enabled BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, channel, event_type)
);
```

#### External Integrations

| Provider | Channel | Priority |
|----------|---------|----------|
| SendGrid / AWS SES | Email | P0 |
| Twilio | SMS | P0 |
| WhatsApp Business API | WhatsApp | P1 |
| Firebase FCM | Push | P2 |
| MSG91 | Backup SMS | P2 |

---

### 2.10 Analytics & Reporting Service

#### Responsibilities
- Dashboard metrics aggregation
- Financial reports
- Occupancy analytics
- Usage analytics for billing
- Custom report builder
- Data exports
- Scheduled reports

#### Required Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/v1/analytics/dashboard | Yes | Dashboard metrics |
| GET | /api/v1/analytics/revenue | Yes | Revenue analytics |
| GET | /api/v1/analytics/occupancy | Yes | Occupancy rates |
| GET | /api/v1/analytics/usage | Yes | Usage metrics |
| GET | /api/v1/reports | Yes | List saved reports |
| POST | /api/v1/reports | Yes | Create report |
| POST | /api/v1/reports/:id/run | Yes | Run report |
| GET | /api/v1/reports/:id/export | Yes | Export report |

#### Required Database Tables

```sql
-- Analytics events (time-series)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    event_type VARCHAR(100) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    
    user_id UUID REFERENCES users(id),
    resident_id UUID REFERENCES residents(id),
    property_id UUID REFERENCES properties(id),
    
    event_data JSONB DEFAULT '{}',
    
    created_at TIMESTAMP DEFAULT NOW(),
    event_timestamp TIMESTAMP NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (event_timestamp);

-- Create monthly partitions
CREATE TABLE analytics_events_2026_01 PARTITION OF analytics_events
    FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

-- Daily aggregations (for fast dashboard queries)
CREATE TABLE analytics_daily (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    metric_date DATE NOT NULL,
    metric_type VARCHAR(100) NOT NULL,
    
    -- Dimensions
    property_id UUID REFERENCES properties(id),
    
    -- Values
    value_numeric DECIMAL(15,2),
    value_integer INTEGER,
    value_json JSONB,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(tenant_id, metric_date, metric_type, property_id)
);

-- Saved reports
CREATE TABLE saved_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    
    name VARCHAR(200) NOT NULL,
    description TEXT,
    
    report_type VARCHAR(50) NOT NULL, -- financial, occupancy, custom
    
    -- Report configuration
    filters JSONB DEFAULT '{}',
    columns JSONB DEFAULT '[]',
    sort_by JSONB DEFAULT '{}',
    
    -- Scheduling
    is_scheduled BOOLEAN DEFAULT FALSE,
    schedule_cron VARCHAR(100),
    schedule_recipients JSONB DEFAULT '[]',
    
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Report runs
CREATE TABLE report_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID NOT NULL REFERENCES saved_reports(id) ON DELETE CASCADE,
    
    status VARCHAR(20) DEFAULT 'running', -- running, completed, failed
    
    parameters JSONB DEFAULT '{}',
    result_count INTEGER,
    result_summary JSONB,
    
    file_url TEXT,
    file_format VARCHAR(20),
    
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    error_message TEXT
);
```

---

## 3. Complete API Endpoint Catalog

### 3.1 Authentication Endpoints

| # | Method | Endpoint | Auth | Rate Limit | Purpose |
|---|--------|----------|------|------------|---------|
| 1 | POST | /api/v1/auth/register | No | 5/hr/IP | User registration |
| 2 | POST | /api/v1/auth/login | No | 5/15min/IP | User login |
| 3 | POST | /api/v1/auth/logout | Yes | 60/min | Logout |
| 4 | POST | /api/v1/auth/refresh | Yes | 60/min | Refresh token |
| 5 | POST | /api/v1/auth/forgot-password | No | 3/hr/IP | Password reset request |
| 6 | POST | /api/v1/auth/reset-password | No | 5/15min | Password reset confirm |
| 7 | POST | /api/v1/auth/verify-email | No | 10/hr | Email verification |
| 8 | POST | /api/v1/auth/resend-verification | Yes | 3/hr | Resend verification email |
| 9 | POST | /api/v1/auth/mfa/enable | Yes | 10/min | Enable MFA |
| 10 | POST | /api/v1/auth/mfa/verify | Yes | 5/min | Verify MFA code |
| 11 | POST | /api/v1/auth/mfa/disable | Yes | 5/min | Disable MFA |
| 12 | GET | /api/v1/auth/sessions | Yes | 60/min | List active sessions |
| 13 | DELETE | /api/v1/auth/sessions/:id | Yes | 60/min | Revoke session |
| 14 | GET | /api/v1/auth/me | Yes | 120/min | Get current user |
| 15 | PUT | /api/v1/auth/me | Yes | 30/min | Update profile |
| 16 | PUT | /api/v1/auth/me/password | Yes | 5/min | Change password |
| 17 | POST | /api/v1/auth/api-keys | Yes | 10/min | Create API key |
| 18 | GET | /api/v1/auth/api-keys | Yes | 60/min | List API keys |
| 19 | DELETE | /api/v1/auth/api-keys/:id | Yes | 30/min | Revoke API key |

### 3.2 Tenant Management Endpoints

| # | Method | Endpoint | Auth | Role | Rate Limit |
|---|--------|----------|------|------|------------|
| 20 | POST | /api/v1/tenants | Yes | system | 10/min |
| 21 | GET | /api/v1/tenants | Yes | system | 60/min |
| 22 | GET | /api/v1/tenants/:id | Yes | admin+ | 120/min |
| 23 | PUT | /api/v1/tenants/:id | Yes | admin+ | 30/min |
| 24 | DELETE | /api/v1/tenants/:id | Yes | system | 10/min |
| 25 | GET | /api/v1/tenants/:id/settings | Yes | admin+ | 120/min |
| 26 | PUT | /api/v1/tenants/:id/settings | Yes | admin+ | 30/min |
| 27 | GET | /api/v1/tenants/:id/usage | Yes | admin+ | 60/min |
| 28 | GET | /api/v1/tenants/:id/billing | Yes | admin+ | 60/min |
| 29 | GET | /api/v1/tenants/:id/members | Yes | admin+ | 60/min |
| 30 | POST | /api/v1/tenants/:id/members | Yes | admin+ | 30/min |
| 31 | PUT | /api/v1/tenants/:id/members/:userId | Yes | admin+ | 30/min |
| 32 | DELETE | /api/v1/tenants/:id/members/:userId | Yes | admin+ | 10/min |

### 3.3 Property Management Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 33 | POST | /api/v1/properties | Yes | 30/min |
| 34 | GET | /api/v1/properties | Yes | 120/min |
| 35 | GET | /api/v1/properties/:id | Yes | 120/min |
| 36 | PUT | /api/v1/properties/:id | Yes | 30/min |
| 37 | DELETE | /api/v1/properties/:id | Yes | 10/min |
| 38 | POST | /api/v1/properties/:id/floors | Yes | 30/min |
| 39 | GET | /api/v1/properties/:id/floors | Yes | 120/min |
| 40 | PUT | /api/v1/floors/:id | Yes | 30/min |
| 41 | DELETE | /api/v1/floors/:id | Yes | 10/min |
| 42 | POST | /api/v1/floors/:id/rooms | Yes | 30/min |
| 43 | GET | /api/v1/floors/:id/rooms | Yes | 120/min |
| 44 | PUT | /api/v1/rooms/:id | Yes | 30/min |
| 45 | DELETE | /api/v1/rooms/:id | Yes | 10/min |
| 46 | POST | /api/v1/rooms/:id/beds | Yes | 30/min |
| 47 | GET | /api/v1/rooms/:id/beds | Yes | 120/min |
| 48 | PUT | /api/v1/beds/:id | Yes | 30/min |
| 49 | DELETE | /api/v1/beds/:id | Yes | 10/min |
| 50 | POST | /api/v1/properties/:id/documents | Yes | 10/min |
| 51 | GET | /api/v1/properties/:id/documents | Yes | 120/min |
| 52 | DELETE | /api/v1/documents/:id | Yes | 10/min |
| 53 | POST | /api/v1/properties/:id/maintenance | Yes | 30/min |
| 54 | GET | /api/v1/properties/:id/maintenance | Yes | 120/min |
| 55 | PUT | /api/v1/maintenance/:id | Yes | 30/min |

### 3.4 Resident Management Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 56 | POST | /api/v1/residents | Yes | 30/min |
| 57 | GET | /api/v1/residents | Yes | 120/min |
| 58 | GET | /api/v1/residents/:id | Yes | 120/min |
| 59 | PUT | /api/v1/residents/:id | Yes | 30/min |
| 60 | DELETE | /api/v1/residents/:id | Yes | 10/min |
| 61 | POST | /api/v1/residents/:id/verify | Yes | 10/min |
| 62 | GET | /api/v1/residents/:id/verifications | Yes | 60/min |
| 63 | POST | /api/v1/residents/:id/agreements | Yes | 30/min |
| 64 | GET | /api/v1/residents/:id/agreements | Yes | 60/min |
| 65 | GET | /api/v1/agreements/:id | Yes | 60/min |
| 66 | PUT | /api/v1/agreements/:id | Yes | 10/min |
| 67 | POST | /api/v1/agreements/:id/sign | Yes | 10/min |
| 68 | POST | /api/v1/residents/:id/checkin | Yes | 10/min |
| 69 | POST | /api/v1/residents/:id/checkout | Yes | 10/min |
| 70 | POST | /api/v1/residents/:id/notice | Yes | 10/min |
| 71 | GET | /api/v1/residents/:id/notices | Yes | 60/min |

### 3.5 Billing & Invoicing Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 72 | POST | /api/v1/invoices | Yes | 30/min |
| 73 | GET | /api/v1/invoices | Yes | 120/min |
| 74 | GET | /api/v1/invoices/:id | Yes | 120/min |
| 75 | PUT | /api/v1/invoices/:id | Yes | 30/min |
| 76 | DELETE | /api/v1/invoices/:id | Yes | 5/min |
| 77 | POST | /api/v1/invoices/:id/send | Yes | 10/min |
| 78 | POST | /api/v1/invoices/:id/mark-paid | Yes | 10/min |
| 79 | POST | /api/v1/invoices/:id/cancel | Yes | 10/min |
| 80 | POST | /api/v1/invoices/:id/credit-note | Yes | 5/min |
| 81 | POST | /api/v1/invoices/generate-batch | Yes | 5/min |
| 82 | GET | /api/v1/invoices/overdue | Yes | 60/min |
| 83 | POST | /api/v1/payments | Yes | 30/min |
| 84 | GET | /api/v1/payments | Yes | 120/min |
| 85 | GET | /api/v1/payments/:id | Yes | 120/min |
| 86 | POST | /api/v1/payments/:id/refund | Yes | 5/min |
| 87 | GET | /api/v1/billing/settings | Yes | 60/min |
| 88 | PUT | /api/v1/billing/settings | Yes | 30/min |
| 89 | POST | /api/v1/utilities/readings | Yes | 30/min |
| 90 | GET | /api/v1/utilities/readings | Yes | 120/min |
| 91 | PUT | /api/v1/utilities/readings/:id | Yes | 30/min |

### 3.6 Payment Gateway Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 92 | POST | /api/v1/payments/initiate | Yes | 30/min |
| 93 | POST | /api/v1/payments/:id/verify | Yes | 60/min |
| 94 | POST | /api/v1/payments/webhooks/razorpay | No | N/A |
| 95 | POST | /api/v1/payments/webhooks/cashfree | No | N/A |
| 96 | GET | /api/v1/payments/methods | Yes | 60/min |
| 97 | POST | /api/v1/payments/methods | Yes | 10/min |
| 98 | DELETE | /api/v1/payments/methods/:id | Yes | 10/min |
| 99 | POST | /api/v1/payments/mandates | Yes | 10/min |
| 100 | GET | /api/v1/payments/mandates | Yes | 60/min |
| 101 | DELETE | /api/v1/payments/mandates/:id | Yes | 5/min |
| 102 | GET | /api/v1/payments/reconciliation | Yes | 30/min |

### 3.7 Waitlist Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 103 | POST | /api/v1/waitlist | No | 3/hr/IP |
| 104 | GET | /api/v1/waitlist/position | No | 60/min |
| 105 | POST | /api/v1/waitlist/referral | No | 10/min |
| 106 | GET | /api/v1/waitlist/stats | No | 120/min |
| 107 | GET | /api/v1/admin/waitlist | Yes | 60/min |
| 108 | PUT | /api/v1/admin/waitlist/:id | Yes | 30/min |
| 109 | POST | /api/v1/admin/waitlist/:id/invite | Yes | 10/min |
| 110 | DELETE | /api/v1/admin/waitlist/:id | Yes | 5/min |

### 3.8 Investor CRM Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 111 | POST | /api/v1/investor-leads | No | 3/hr/IP |
| 112 | GET | /api/v1/investor-leads/:id | Yes | 60/min |
| 113 | GET | /api/v1/admin/investor-leads | Yes | 60/min |
| 114 | PUT | /api/v1/admin/investor-leads/:id | Yes | 30/min |
| 115 | DELETE | /api/v1/admin/investor-leads/:id | Yes | 5/min |
| 116 | POST | /api/v1/admin/investor-leads/:id/note | Yes | 30/min |
| 117 | POST | /api/v1/admin/investor-leads/:id/email | Yes | 10/min |
| 118 | GET | /api/v1/investor/documents | Yes | 60/min |
| 119 | POST | /api/v1/investor/documents/:id/access | Yes | 10/min |

### 3.9 Notification Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 120 | POST | /api/v1/notifications/email | Yes | 60/min |
| 121 | POST | /api/v1/notifications/sms | Yes | 60/min |
| 122 | POST | /api/v1/notifications/whatsapp | Yes | 60/min |
| 123 | POST | /api/v1/notifications/push | Yes | 60/min |
| 124 | GET | /api/v1/notifications/templates | Yes | 60/min |
| 125 | POST | /api/v1/notifications/templates | Yes | 30/min |
| 126 | PUT | /api/v1/notifications/templates/:id | Yes | 30/min |
| 127 | DELETE | /api/v1/notifications/templates/:id | Yes | 10/min |
| 128 | GET | /api/v1/notifications/history | Yes | 120/min |
| 129 | GET | /api/v1/notifications/preferences | Yes | 60/min |
| 130 | PUT | /api/v1/notifications/preferences | Yes | 30/min |

### 3.10 Analytics Endpoints

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 131 | GET | /api/v1/analytics/dashboard | Yes | 120/min |
| 132 | GET | /api/v1/analytics/revenue | Yes | 60/min |
| 133 | GET | /api/v1/analytics/occupancy | Yes | 60/min |
| 134 | GET | /api/v1/analytics/usage | Yes | 60/min |
| 135 | GET | /api/v1/analytics/payments | Yes | 60/min |
| 136 | GET | /api/v1/analytics/residents | Yes | 60/min |
| 137 | GET | /api/v1/reports | Yes | 60/min |
| 138 | POST | /api/v1/reports | Yes | 10/min |
| 139 | GET | /api/v1/reports/:id | Yes | 60/min |
| 140 | PUT | /api/v1/reports/:id | Yes | 10/min |
| 141 | DELETE | /api/v1/reports/:id | Yes | 5/min |
| 142 | POST | /api/v1/reports/:id/run | Yes | 5/min |
| 143 | GET | /api/v1/reports/:id/export | Yes | 10/min |
| 144 | GET | /api/v1/reports/:id/runs | Yes | 60/min |

### 3.11 ROI Calculator Analytics (New)

| # | Method | Endpoint | Auth | Rate Limit |
|---|--------|----------|------|------------|
| 145 | POST | /api/v1/analytics/roi-calculation | No | 10/min |
| 146 | GET | /api/v1/admin/analytics/roi-calculations | Yes | 60/min |

---

## 4. Database Schema Design

### 4.1 Schema Overview

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           RENTFLOW DATABASE SCHEMA                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                        │
│  │   tenants    │────▶│    users     │◀────│   api_keys   │                        │
│  │  (root)      │     │              │     │              │                        │
│  └──────┬───────┘     └──────────────┘     └──────────────┘                        │
│         │                    │                                                      │
│         │         ┌──────────┴──────────┐                                          │
│         │         │                     │                                          │
│         ▼         ▼                     ▼                                          │
│  ┌──────────────┐ ┌─────────────────┐  ┌─────────────────┐                         │
│  │  properties  │ │ tenant_members  │  │ user_sessions   │                         │
│  │              │ │                 │  │                 │                         │
│  └──────┬───────┘ └─────────────────┘  └─────────────────┘                         │
│         │                                                                           │
│    ┌────┴────┐                                                                      │
│    ▼         ▼                                                                      │
│  ┌────────┐ ┌────────┐                                                             │
│  │ floors │ │ mainte-│                                                             │
│  │        │ │ nance  │                                                             │
│  └───┬────┘ │records │                                                             │
│      │     └────────┘                                                             │
│      ▼                                                                             │
│  ┌────────┐                                                                        │
│  │ rooms  │                                                                        │
│  │        │                                                                        │
│  └───┬────┘                                                                        │
│      │                                                                             │
│      ▼                                                                             │
│  ┌────────┐     ┌──────────────┐     ┌──────────────┐                             │
│  │  beds  │◀────│  residents   │────▶│rental_agree- │                             │
│  │        │     │              │     │   ments      │                             │
│  └────────┘     └──────┬───────┘     └──────────────┘                             │
│                        │                                                           │
│    ┌───────────────────┼───────────────────┐                                      │
│    ▼                   ▼                   ▼                                      │
│  ┌──────────┐    ┌──────────┐     ┌──────────┐                                    │
│  │background│    │  notices │     │saved_pay-│                                    │
│  │_checks   │    │          │     │ment_meth-│                                    │
│  └──────────┘    └──────────┘     │  ods     │                                    │
│                                   └──────────┘                                    │
│                                                                                     │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                        │
│  │   invoices   │◀────│   payments   │────▶│ payment_mand-│                        │
│  │              │     │              │     │   ates       │                        │
│  └──────┬───────┘     └──────────────┘     └──────────────┘                        │
│         │                                                                           │
│         ▼                                                                           │
│  ┌─────────────────┐                                                                │
│  │ invoice_line_items│                                                               │
│  │ payment_allocations│                                                              │
│  │ utility_readings  │                                                               │
│  └─────────────────┘                                                                │
│                                                                                     │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                        │
│  │waitlist_entr-│     │investor_leads│     │notification_│                        │
│  │    ies       │     │              │     │   queue     │                        │
│  └──────────────┘     └──────────────┘     └──────────────┘                        │
│                                                                                     │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐                        │
│  │usage_tracking│     │analytics_    │     │   reports    │                        │
│  │              │     │   events     │     │              │                        │
│  └──────────────┘     └──────────────┘     └──────────────┘                        │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Complete Database Schema

See individual service sections above for detailed table definitions.

### 4.3 Indexing Strategy

```sql
-- Core indexes for performance
CREATE INDEX CONCURRENTLY idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX CONCURRENTLY idx_users_tenant_status ON users(tenant_id, status) WHERE deleted_at IS NULL;

CREATE INDEX CONCURRENTLY idx_properties_tenant ON properties(tenant_id) WHERE deleted_at IS NULL;
CREATE INDEX CONCURRENTLY idx_properties_status ON properties(status) WHERE deleted_at IS NULL;
CREATE INDEX CONCURRENTLY idx_properties_location ON properties USING GIN (city, state);

CREATE INDEX CONCURRENTLY idx_beds_room ON beds(room_id);
CREATE INDEX CONCURRENTLY idx_beds_status ON beds(status);
CREATE INDEX CONCURRENTLY idx_beds_tenant ON beds(tenant_id);

CREATE INDEX CONCURRENTLY idx_residents_tenant ON residents(tenant_id);
CREATE INDEX CONCURRENTLY idx_residents_status ON residents(status);
CREATE INDEX CONCURRENTLY idx_residents_bed ON residents(bed_id) WHERE status = 'active';

CREATE INDEX CONCURRENTLY idx_invoices_tenant ON invoices(tenant_id);
CREATE INDEX CONCURRENTLY idx_invoices_status ON invoices(status);
CREATE INDEX CONCURRENTLY idx_invoices_due_date ON invoices(due_date) WHERE status IN ('sent', 'viewed', 'overdue');
CREATE INDEX CONCURRENTLY idx_invoices_resident ON invoices(resident_id);

CREATE INDEX CONCURRENTLY idx_payments_invoice ON payments(invoice_id);
CREATE INDEX CONCURRENTLY idx_payments_status ON payments(status);
CREATE INDEX CONCURRENTLY idx_payments_date ON payments(created_at);

CREATE INDEX CONCURRENTLY idx_analytics_events_tenant ON analytics_events(tenant_id, event_timestamp);
CREATE INDEX CONCURRENTLY idx_analytics_events_type ON analytics_events(event_type, event_timestamp);

-- Full-text search indexes
CREATE INDEX CONCURRENTLY idx_properties_search ON properties USING GIN(to_tsvector('english', name || ' ' || COALESCE(address_line1, '')));
CREATE INDEX CONCURRENTLY idx_residents_search ON residents USING GIN(to_tsvector('english', first_name || ' ' || last_name || ' ' || COALESCE(email, '') || ' ' || phone));
```

### 4.4 Partitioning Strategy

```sql
-- Partition analytics_events by month
CREATE TABLE analytics_events (
    -- columns...
) PARTITION BY RANGE (event_timestamp);

-- Create partitions for next 12 months
CREATE TABLE analytics_events_2026_03 PARTITION OF analytics_events
    FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
-- ... repeat for each month

-- Auto-partitioning function
CREATE OR REPLACE FUNCTION create_analytics_partition()
RETURNS void AS $$
DECLARE
    partition_date DATE;
    partition_name TEXT;
BEGIN
    partition_date := DATE_TRUNC('month', NOW() + INTERVAL '1 month');
    partition_name := 'analytics_events_' || TO_CHAR(partition_date, 'YYYY_MM');
    
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF analytics_events FOR VALUES FROM (%L) TO (%L)',
        partition_name,
        partition_date,
        partition_date + INTERVAL '1 month'
    );
END;
$$ LANGUAGE plpgsql;
```

---

## 5. Security & Compliance Requirements

### 5.1 Security Layers

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              SECURITY ARCHITECTURE                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  Layer 1: Network Security                                                          │
│  ├─ DDoS Protection (Cloudflare/AWS Shield)                                        │
│  ├─ WAF with Custom Rules                                                           │
│  ├─ IP Whitelisting for Admin Endpoints                                             │
│  ├─ VPC Isolation                                                                   │
│  └─ Private Subnets for Databases                                                   │
│                                                                                     │
│  Layer 2: Transport Security                                                        │
│  ├─ TLS 1.3 Only                                                                    │
│  ├─ HSTS Headers                                                                    │
│  ├─ Certificate Pinning                                                             │
│  └─ Perfect Forward Secrecy                                                         │
│                                                                                     │
│  Layer 3: Application Security                                                      │
│  ├─ Input Validation (Zod/Joi)                                                      │
│  ├─ Output Encoding                                                                 │
│  ├─ CSRF Protection                                                                 │
│  ├─ Clickjacking Protection (X-Frame-Options)                                       │
│  ├─ XSS Protection (CSP Headers)                                                    │
│  └─ Rate Limiting                                                                   │
│                                                                                     │
│  Layer 4: Authentication & Authorization                                            │
│  ├─ JWT with RS256                                                                  │
│  ├─ MFA Support                                                                     │
│  ├─ RBAC (Role-Based Access Control)                                                │
│  ├─ Resource-Level Permissions                                                      │
│  └─ API Key Management                                                              │
│                                                                                     │
│  Layer 5: Data Security                                                             │
│  ├─ Encryption at Rest (AES-256)                                                    │
│  ├─ Field-Level Encryption (PII)                                                    │
│  ├─ Database TDE                                                                    │
│  ├─ Secure Key Management (AWS KMS/HashiCorp Vault)                                 │
│  └─ Data Classification                                                             │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Input Validation Requirements

```typescript
// Validation schemas using Zod
import { z } from 'zod';

// Email validation
const emailSchema = z.string()
  .email('Invalid email format')
  .min(5, 'Email too short')
  .max(255, 'Email too long')
  .transform(email => email.toLowerCase().trim());

// Password validation
const passwordSchema = z.string()
  .min(12, 'Password must be at least 12 characters')
  .max(128, 'Password too long')
  .regex(/[A-Z]/, 'Must contain uppercase')
  .regex(/[a-z]/, 'Must contain lowercase')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special character');

// Phone validation (India)
const phoneSchema = z.string()
  .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number');

// PAN validation
const panSchema = z.string()
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format');

// Aadhaar validation
const aadhaarSchema = z.string()
  .regex(/^\d{12}$/, 'Invalid Aadhaar format');

// Sanitization
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML
    .trim()
    .slice(0, 10000); // Max length
};
```

### 5.3 Rate Limiting Strategy

```typescript
// Rate limiting configuration
const rateLimits = {
  // Authentication endpoints
  auth: {
    login: { points: 5, duration: 900 }, // 5 per 15 min
    register: { points: 3, duration: 3600 }, // 3 per hour
    passwordReset: { points: 3, duration: 3600 },
  },
  
  // API general
  api: {
    default: { points: 100, duration: 60 }, // 100 per minute
    authenticated: { points: 1000, duration: 60 },
  },
  
  // Specific endpoints
  endpoints: {
    waitlist: { points: 3, duration: 3600, perIP: true },
    investorLead: { points: 3, duration: 3600, perIP: true },
    payments: { points: 10, duration: 60 },
    exports: { points: 5, duration: 300 },
  },
  
  // Webhook endpoints (higher limits)
  webhooks: {
    razorpay: { points: 1000, duration: 60 },
  }
};
```

### 5.4 JWT Security Configuration

```typescript
// JWT Configuration
const jwtConfig = {
  // Algorithm
  algorithm: 'RS256',
  
  // Token expiration
  accessTokenExpiry: '15m',
  refreshTokenExpiry: '7d',
  
  // Key rotation
  keyRotationDays: 30,
  
  // Claims
  issuer: 'rentflow.in',
  audience: 'rentflow-api',
  
  // Security headers
  headers: {
    typ: 'JWT',
    kid: 'key-id', // For key rotation
  }
};

// Token claims structure
interface AccessTokenClaims {
  sub: string;        // User ID
  tenant: string;     // Tenant ID
  role: string;       // User role
  permissions: string[];
  jti: string;        // Token ID for revocation
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}
```

### 5.5 Data Encryption Requirements

```typescript
// Encryption at rest
const encryptionConfig = {
  // Database encryption
  database: {
    algorithm: 'AES-256-GCM',
    keyManagement: 'AWS_KMS',
    rotationPeriod: '90 days',
  },
  
  // Field-level encryption for PII
  fieldEncryption: {
    fields: [
      'aadhaar_number',
      'pan_number',
      'bank_account_number',
      'ifsc_code',
    ],
    algorithm: 'AES-256-GCM',
    deterministic: false, // Non-deterministic for searchability
  },
  
  // Backup encryption
  backups: {
    algorithm: 'AES-256-GCM',
    separateKey: true,
  }
};
```

### 5.6 Compliance Requirements

| Regulation | Requirements | Implementation |
|------------|--------------|----------------|
| **GDPR** | Data portability, right to deletion, consent management | Data export API, soft deletes, consent logs |
| **IT Act 2000 (India)** | Data protection, cyber security | Encryption, audit logs, incident response |
| **RBI Guidelines** | Payment data security | PCI DSS compliance, tokenization |
| **GST** | Invoice compliance, e-way bills | GST API integration, proper invoicing |
| **PDPB (Draft)** | Personal data protection | Data minimization, purpose limitation |

### 5.7 Security Checklist

```markdown
## Pre-Deployment Security Checklist

### Authentication & Authorization
- [ ] Password policy enforced (min 12 chars, complexity)
- [ ] Brute force protection (rate limiting)
- [ ] Account lockout after failed attempts
- [ ] MFA implemented for admin accounts
- [ ] Session timeout configured
- [ ] Secure password reset flow
- [ ] RBAC properly implemented
- [ ] API keys use least privilege

### Data Protection
- [ ] TLS 1.3 enforced
- [ ] HSTS enabled
- [ ] Database encryption at rest
- [ ] PII field-level encryption
- [ ] Secure key management
- [ ] Backup encryption
- [ ] Data retention policies

### Application Security
- [ ] Input validation on all endpoints
- [ ] Output encoding implemented
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (CSP headers)
- [ ] CSRF tokens for state-changing operations
- [ ] Clickjacking protection
- [ ] File upload validation
- [ ] Dependency vulnerability scanning

### Infrastructure Security
- [ ] VPC with private subnets
- [ ] Security groups configured
- [ ] WAF rules active
- [ ] DDoS protection enabled
- [ ] Logging and monitoring
- [ ] Incident response plan
- [ ] Regular security audits
```

---

## 6. DevOps & Deployment

### 6.1 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: RentFlow CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # 1. Code Quality
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type check
        run: npm run type-check
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Security audit
        run: npm audit --audit-level=moderate

  # 2. Build Frontend
  build-frontend:
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Next.js
        run: |
          npm ci
          npm run build
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: frontend-build
          path: dist/

  # 3. Build Backend
  build-backend:
    needs: lint-and-test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: |
          docker build -t rentflow-api:${{ github.sha }} .
          docker tag rentflow-api:${{ github.sha }} rentflow-api:latest
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push rentflow-api:${{ github.sha }}

  # 4. Deploy to Staging
  deploy-staging:
    needs: [build-frontend, build-backend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - name: Deploy to staging
        run: |
          # Deploy commands

  # 5. Deploy to Production
  deploy-production:
    needs: [build-frontend, build-backend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to production
        run: |
          # Blue-green deployment
```

### 6.2 Docker Configuration

```dockerfile
# Dockerfile (Backend API)
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS production

# Security: Run as non-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs . .

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "dist/main.js"]
```

```yaml
# docker-compose.yml (Local Development)
version: '3.8'

services:
  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/rentflow
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./api:/app
      - /app/node_modules

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=rentflow
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  elasticsearch:
    image: elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

volumes:
  postgres_data:
```

### 6.3 Kubernetes Deployment

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rentflow-api
  namespace: production
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: rentflow-api
  template:
    metadata:
      labels:
        app: rentflow-api
    spec:
      serviceAccountName: rentflow-api
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
      containers:
        - name: api
          image: rentflow/api:latest
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "500m"
          env:
            - name: NODE_ENV
              value: "production"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: rentflow-secrets
                  key: database-url
          livenessProbe:
            httpGet:
              path: /health/live
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
```

### 6.4 Environment Configuration

```yaml
# Environment variables structure
# .env.example (committed to repo)

# Application
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/rentflow
DATABASE_POOL_SIZE=20

# Redis
REDIS_URL=redis://localhost:6379
REDIS_POOL_SIZE=10

# Authentication
JWT_PRIVATE_KEY_PATH=/secrets/jwt-private.pem
JWT_PUBLIC_KEY_PATH=/secrets/jwt-public.pem
JWT_ACCESS_TOKEN_EXPIRY=15m
JWT_REFRESH_TOKEN_EXPIRY=7d

# Encryption
ENCRYPTION_KEY_PATH=/secrets/master.key
FIELD_ENCRYPTION_KEY_PATH=/secrets/field.key

# External Services
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

SENDGRID_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

# AWS (if using)
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
S3_BUCKET=

# Monitoring
DATADOG_API_KEY=
SENTRY_DSN=
```

---

## 7. Observability & Monitoring

### 7.1 Logging Strategy

```typescript
// Structured logging configuration
const loggerConfig = {
  // Log levels
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  },
  
  // Log format (JSON for production)
  format: {
    production: 'json',
    development: 'pretty'
  },
  
  // Sensitive fields to redact
  redact: [
    'password',
    'token',
    'authorization',
    'cookie',
    'credit_card',
    'cvv',
    'aadhaar_number',
    'pan_number'
  ],
  
  // Correlation ID
  correlationId: {
    header: 'x-request-id',
    generate: true
  }
};

// Example log entry
{
  "timestamp": "2026-02-23T10:30:00.123Z",
  "level": "info",
  "message": "Invoice created",
  "service": "billing-service",
  "correlationId": "uuid-123",
  "tenantId": "tenant-456",
  "userId": "user-789",
  "event": {
    "type": "invoice.created",
    "invoiceId": "inv-001",
    "amount": 15000,
    "residentId": "res-001"
  },
  "performance": {
    "durationMs": 45,
    "dbQueries": 3
  },
  "request": {
    "method": "POST",
    "path": "/api/v1/invoices",
    "ip": "10.0.0.1"
  }
}
```

### 7.2 Metrics Collection

```typescript
// Key metrics to track
const metrics = {
  // Application metrics
  application: {
    requestDuration: 'histogram',
    requestCount: 'counter',
    errorRate: 'counter',
    activeConnections: 'gauge',
    queueDepth: 'gauge',
  },
  
  // Business metrics
  business: {
    registrations: 'counter',
    waitlistSignups: 'counter',
    investorLeads: 'counter',
    invoicesGenerated: 'counter',
    paymentsProcessed: 'counter',
    paymentSuccessRate: 'gauge',
    averageInvoiceAmount: 'histogram',
  },
  
  // Infrastructure metrics
  infrastructure: {
    cpuUsage: 'gauge',
    memoryUsage: 'gauge',
    diskUsage: 'gauge',
    dbConnections: 'gauge',
    redisConnections: 'gauge',
  }
};
```

### 7.3 Distributed Tracing

```typescript
// Tracing configuration with OpenTelemetry
const tracingConfig = {
  serviceName: 'rentflow-api',
  serviceVersion: process.env.VERSION || '1.0.0',
  
  // Sampling
  sampling: {
    type: 'probabilistic',
    rate: 0.1 // Sample 10% of requests
  },
  
  // Exporters
  exporters: [
    {
      type: 'jaeger',
      endpoint: process.env.JAEGER_ENDPOINT
    },
    {
      type: 'zipkin',
      endpoint: process.env.ZIPKIN_ENDPOINT
    }
  ],
  
  // Instrumentations
  instrumentations: [
    '@opentelemetry/instrumentation-http',
    '@opentelemetry/instrumentation-express',
    '@opentelemetry/instrumentation-postgres',
    '@opentelemetry/instrumentation-redis',
  ]
};
```

### 7.4 Alerting Rules

```yaml
# Alerting configuration
alerts:
  # Critical alerts (P0)
  critical:
    - name: DatabaseDown
      condition: up{job="postgres"} == 0
      duration: 1m
      
    - name: HighErrorRate
      condition: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
      duration: 2m
      
    - name: PaymentGatewayDown
      condition: up{job="razorpay-health"} == 0
      duration: 2m
      
    - name: DiskSpaceCritical
      condition: disk_usage_percent > 90
      duration: 5m
  
  # Warning alerts (P1)
  warning:
    - name: HighResponseTime
      condition: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
      duration: 5m
      
    - name: MemoryUsageHigh
      condition: memory_usage_percent > 80
      duration: 10m
      
    - name: FailedLoginAttempts
      condition: rate(failed_logins_total[5m]) > 10
      duration: 5m
  
  # Info alerts (P2)
  info:
    - name: BackupFailed
      condition: backup_last_success < (time() - 86400)
      
    - name: SSLExpiry
      condition: ssl_cert_expiry_days < 30
```

### 7.5 Dashboard Requirements

```markdown
## Required Dashboards

### 1. Infrastructure Dashboard
- CPU/Memory/Disk usage per service
- Database connection pool status
- Redis cache hit/miss rates
- Network I/O
- Container restart counts

### 2. Application Performance Dashboard
- Request rate and latency (p50, p95, p99)
- Error rates by endpoint
- Throughput per service
- Queue depths
- Background job processing rates

### 3. Business Metrics Dashboard
- Active tenants
- Total properties/beds
- Monthly recurring revenue (MRR)
- Invoice counts and amounts
- Payment success/failure rates
- Waitlist signups and referrals

### 4. Security Dashboard
- Failed login attempts
- Rate limiting triggers
- Suspicious activity alerts
- API key usage
- Data access patterns

### 5. User Experience Dashboard
- Page load times
- Frontend errors
- User journey funnels
- Feature adoption rates
- Support ticket trends
```

---

## 8. Scalability Strategy

### 8.1 Horizontal Scaling Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                            SCALABILITY ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                         LOAD BALANCER (ALB/NLB)                              │   │
│  │                    SSL Termination + Health Checks                           │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                              │
│                    ┌─────────────────┼─────────────────┐                           │
│                    ▼                 ▼                 ▼                           │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐          │
│  │   API Instance 1    │ │   API Instance 2    │ │   API Instance N    │          │
│  │   (Node.js)         │ │   (Node.js)         │ │   (Node.js)         │          │
│  │                     │ │                     │ │                     │          │
│  │  ┌───────────────┐  │ │  ┌───────────────┐  │ │  ┌───────────────┐  │          │
│  │  │  App Server   │  │ │  │  App Server   │  │ │  │  App Server   │  │          │
│  │  └───────────────┘  │ │  └───────────────┘  │ │  └───────────────┘  │          │
│  └──────────┬──────────┘ └──────────┬──────────┘ └──────────┬──────────┘          │
│             │                       │                       │                      │
│             └───────────────────────┼───────────────────────┘                      │
│                                     │                                               │
│  ┌──────────────────────────────────┼─────────────────────────────────────────────┐ │
│  │                         SHARED RESOURCES                                       │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐             │ │
│  │  │PostgreSQL│ │  Redis   │ │RabbitMQ/ │ │   S3     │ │Elasticsea│             │ │
│  │  │ Primary  │ │  Cluster │ │  Kafka   │ │          │ │  rch     │             │ │
│  │  │ + Replicas│ │         │ │          │ │          │ │          │             │ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘             │ │
│  └────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Database Scaling Strategy

```sql
-- Read replicas for query scaling
Primary (Write) ──► Read Replica 1 (Analytics)
              ──► Read Replica 2 (Reporting)
              ──► Read Replica 3 (API queries)

-- Connection pooling with PgBouncer
Application ──► PgBouncer (Transaction pool) ──► PostgreSQL
                     (max 1000 app connections)
                     (max 100 db connections)

-- Sharding strategy (if needed beyond single instance)
-- Shard by tenant_id for multi-tenant isolation
SELECT * FROM properties WHERE tenant_id = ? AND shard = tenant_id % 4;

-- Caching strategy
-- L1: Application cache (in-memory)
-- L2: Redis (distributed)
-- L3: Database (persistent)
```

### 8.3 Caching Strategy

```typescript
// Multi-layer caching
const cacheStrategy = {
  // L1: In-memory (per instance)
  local: {
    ttl: 60, // 1 minute
    maxSize: 1000,
    useFor: ['user_sessions', 'tenant_settings', 'feature_flags']
  },
  
  // L2: Redis (shared)
  redis: {
    ttl: 300, // 5 minutes
    useFor: [
      'api_responses',
      'property_listings',
      'invoice_calculations',
      'rate_limit_counters'
    ]
  },
  
  // L3: CDN
  cdn: {
    ttl: 86400, // 24 hours
    useFor: [
      'static_assets',
      'property_images',
      'document_previews',
      'report_exports'
    ]
  }
};

// Cache invalidation patterns
const cacheInvalidation = {
  // Write-through: Update cache when database is updated
  writeThrough: true,
  
  // Cache-aside: Check cache first, populate on miss
  cacheAside: true,
  
  // Event-based invalidation
  events: {
    'tenant.updated': ['tenant:*'],
    'property.updated': ['property:*', 'listings:*'],
    'invoice.paid': ['invoice:*', 'revenue:*'],
  }
};
```

### 8.4 Queue-Based Architecture

```typescript
// Message queue configuration
const queueConfig = {
  // High priority queue
  critical: {
    name: 'rentflow.critical',
    retries: 5,
    backoff: 'exponential',
    useFor: ['payments', 'notifications', 'auth']
  },
  
  // Standard queue
  default: {
    name: 'rentflow.default',
    retries: 3,
    backoff: 'linear',
    useFor: ['invoices', 'reports', 'exports']
  },
  
  // Low priority queue
  background: {
    name: 'rentflow.background',
    retries: 2,
    backoff: 'fixed',
    useFor: ['analytics', 'cleanup', 'imports']
  },
  
  // Scheduled queue
  scheduled: {
    name: 'rentflow.scheduled',
    useFor: ['reminders', 'recurring_invoices', 'reports']
  }
};

// Event producers
const eventProducers = {
  // When invoice is created
  'invoice.created': async (invoice) => {
    await queue.publish('notifications', {
      type: 'email',
      template: 'invoice_created',
      recipient: invoice.resident.email,
      data: invoice
    });
    
    await queue.publish('analytics', {
      event: 'invoice.created',
      tenantId: invoice.tenantId,
      amount: invoice.amount
    });
  },
  
  // When payment is received
  'payment.received': async (payment) => {
    await queue.publish('notifications', {
      type: 'email',
      template: 'payment_receipt',
      recipient: payment.resident.email,
      data: payment
    });
    
    await queue.publish('invoices', {
      action: 'mark_paid',
      invoiceId: payment.invoiceId
    });
  }
};
```

---

## 9. Gaps & Risk Assessment

### 9.1 Critical Gaps (P0)

| # | Gap | Impact | Mitigation |
|---|-----|--------|------------|
| 1 | **No API Layer** | Cannot process any data | Build REST API immediately |
| 2 | **No Database** | No data persistence | Set up PostgreSQL cluster |
| 3 | **No Authentication** | Anyone can access dashboard | Implement JWT auth |
| 4 | **Forms are Mocked** | Leads not captured | Connect to real endpoints |
| 5 | **No Payment Integration** | Cannot collect payments | Integrate Razorpay |
| 6 | **No Email Service** | Cannot communicate with users | Set up SendGrid/SES |

### 9.2 High Priority Gaps (P1)

| # | Gap | Impact | Mitigation |
|---|-----|--------|------------|
| 7 | No file upload handling | Cannot upload documents | Implement S3 integration |
| 8 | No background job processing | Slow user experience | Add Redis + Bull queue |
| 9 | No real-time features | No live notifications | Add WebSocket support |
| 10 | No search functionality | Poor UX finding properties | Add Elasticsearch |
| 11 | No caching layer | Performance issues | Add Redis caching |
| 12 | No audit logging | Compliance risk | Implement audit trail |

### 9.3 Medium Priority Gaps (P2)

| # | Gap | Impact | Mitigation |
|---|-----|--------|------------|
| 13 | No mobile app | Limited reach | Plan React Native app |
| 14 | No white-label support | Enterprise sales blocker | Add tenant customization |
| 15 | No advanced analytics | Limited insights | Add ClickHouse |
| 16 | No API documentation | Developer adoption | Add Swagger/OpenAPI |
| 17 | No webhook support | Integration limitations | Add webhook system |

### 9.4 Risk Assessment Matrix

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           RISK ASSESSMENT MATRIX                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  Impact                                                                             │
│    ▲                                                                                │
│    │                                                                                │
│  H │  [Data Breach]        [Payment Failure]      [No Auth]                        │
│    │                                                                                │
│  M │  [Downtime]           [Data Loss]            [Compliance]   [Performance]     │
│    │                                                                                │
│  L │  [UI Glitches]        [Minor Bugs]           [Feature Delays]                 │
│    │                                                                                │
│    └──────────────────────────────────────────────────────────────────────►         │
│         L              M              H          Likelihood                         │
│                                                                                     │
│  Legend:                                                                            │
│  [P0] Critical - Immediate action required                                          │
│  [P1] High - Address within sprint                                                  │
│  [P2] Medium - Address within quarter                                               │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### 9.5 Technical Debt Register

| ID | Description | Severity | Effort (days) | Created | Target Resolution |
|----|-------------|----------|---------------|---------|-------------------|
| TD-001 | Placeholder auth provider | Critical | 5 | 2026-02-23 | 2026-03-15 |
| TD-002 | Mocked waitlist form | Critical | 3 | 2026-02-23 | 2026-03-01 |
| TD-003 | Mocked investor form | Critical | 3 | 2026-02-23 | 2026-03-01 |
| TD-004 | Placeholder dashboard | Critical | 10 | 2026-02-23 | 2026-03-30 |
| TD-005 | No API routes | Critical | 15 | 2026-02-23 | 2026-04-15 |
| TD-006 | No database layer | Critical | 8 | 2026-02-23 | 2026-03-30 |
| TD-007 | Missing query client | High | 2 | 2026-02-23 | 2026-03-15 |
| TD-008 | Placeholder theme provider | Medium | 1 | 2026-02-23 | 2026-04-30 |

---

## 10. Production Readiness Checklist

### 10.1 Pre-Launch Checklist

```markdown
## Must Have (Launch Blockers)

### Backend Infrastructure
- [ ] Database cluster provisioned and tested
- [ ] API server deployed with auto-scaling
- [ ] Load balancer configured with SSL
- [ ] Redis cluster for sessions and caching
- [ ] File storage (S3) configured
- [ ] Backup and disaster recovery tested
- [ ] Monitoring and alerting active

### Security
- [ ] All endpoints authenticated (except public)
- [ ] Rate limiting active
- [ ] WAF rules configured
- [ ] Secrets in secure vault (not env vars)
- [ ] Penetration testing completed
- [ ] Security headers configured
- [ ] GDPR/privacy compliance verified

### Core Features
- [ ] User registration and login working
- [ ] Email verification functional
- [ ] Password reset working
- [ ] Waitlist capture and referral tracking
- [ ] Investor lead capture
- [ ] Basic dashboard loads data
- [ ] Property CRUD operations
- [ ] Invoice generation
- [ ] Payment processing (test mode)

### Integrations
- [ ] Email provider (SendGrid/SES) configured
- [ ] SMS provider (Twilio) configured
- [ ] Payment gateway (Razorpay) test mode
- [ ] Error tracking (Sentry) active
- [ ] Analytics (Mixpanel/Amplitude) tracking

### Operations
- [ ] Runbook created
- [ ] On-call rotation defined
- [ ] Incident response process documented
- [ ] Support channels established
- [ ] Status page configured

## Should Have (Post-Launch)

- [ ] WhatsApp integration
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] API documentation
- [ ] Partner integrations
- [ ] White-label support

## Nice to Have (Future)

- [ ] AI-powered features
- [ ] Predictive analytics
- [ ] Marketplace integrations
- [ ] International expansion
```

### 10.2 Launch Timeline Estimate

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| **Phase 1: Foundation** | Weeks 1-4 | Database, API scaffold, auth service |
| **Phase 2: Core Services** | Weeks 5-8 | Property, billing, resident services |
| **Phase 3: Integration** | Weeks 9-12 | Payments, notifications, file uploads |
| **Phase 4: Dashboard** | Weeks 13-16 | React components, data visualization |
| **Phase 5: Polish** | Weeks 17-20 | Testing, performance, security audit |
| **Phase 6: Launch Prep** | Weeks 21-24 | Load testing, monitoring, docs |

---

## Appendix A: Request/Response Schemas

### A.1 Waitlist Join Request

```json
// POST /api/v1/waitlist
// Request
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "9876543210",
  "companyName": "Doe PG Services",
  "referralCode": "JOHN2026",
  "source": "landing_page",
  "utmCampaign": "early_access",
  "utmSource": "google",
  "utmMedium": "cpc"
}

// Response 201 Created
{
  "id": "uuid",
  "email": "user@example.com",
  "position": 348,
  "referralCode": "DOE12345",
  "referralLink": "https://rentflow.in/waitlist?ref=DOE12345",
  "message": "You've joined the waitlist!",
  "createdAt": "2026-02-23T10:30:00Z"
}
```

### A.2 Investor Lead Request

```json
// POST /api/v1/investor-leads
// Request
{
  "fullName": "Jane Smith",
  "email": "jane@vcfirm.com",
  "phone": "+91-9876543210",
  "investorType": "VC",
  "linkedinUrl": "https://linkedin.com/in/janesmith",
  "message": "Interested in learning more about RentFlow's growth metrics."
}

// Response 201 Created
{
  "id": "uuid",
  "status": "new",
  "message": "Thank you for your interest. We'll be in touch within 48 hours.",
  "createdAt": "2026-02-23T10:30:00Z"
}
```

### A.3 ROI Calculator Log Request

```json
// POST /api/v1/analytics/roi-calculation
// Request
{
  "inputs": {
    "properties": 5,
    "bedsPerProperty": 20,
    "avgRent": 12000,
    "utilityCostPerBed": 800
  },
  "results": {
    "adminHoursSaved": 75,
    "revenueLeakageRecovered": 24000,
    "annualProfitImpact": 529200
  },
  "sessionId": "sess-uuid",
  "source": "landing_page"
}

// Response 204 No Content
```

---

## Appendix B: Technology Recommendations

### B.1 Recommended Tech Stack

| Component | Primary Choice | Alternative | Justification |
|-----------|---------------|-------------|---------------|
| **API Framework** | NestJS | Fastify | TypeScript-first, modular, enterprise-grade |
| **ORM** | Prisma | TypeORM | Type safety, migrations, great DX |
| **Validation** | Zod | Joi | TypeScript inference, composable |
| **Auth** | Passport.js | Auth0 | Flexible, JWT support, OAuth |
| **Queue** | Bull + Redis | RabbitMQ | Redis-backed, reliable, good DX |
| **Cache** | Redis | Memcached | Data structures, pub/sub, persistence |
| **Search** | Elasticsearch | Meilisearch | Full-featured, scalable, aggregations |
| **Monitoring** | DataDog | New Relic | Full-stack observability |
| **Logging** | Pino | Winston | High performance, structured |
| **Testing** | Vitest | Jest | Fast, modern, ESM support |

### B.2 Cloud Infrastructure Recommendations

| Component | AWS | GCP | Azure | Recommendation |
|-----------|-----|-----|-------|----------------|
| Compute | ECS/EKS | GKE | AKS | AWS ECS for simplicity |
| Database | RDS PostgreSQL | Cloud SQL | Azure DB | RDS with Multi-AZ |
| Cache | ElastiCache | Memorystore | Cache for Redis | ElastiCache |
| Storage | S3 | Cloud Storage | Blob Storage | S3 |
| CDN | CloudFront | Cloud CDN | CDN | CloudFront |
| DNS | Route53 | Cloud DNS | DNS | Route53 |
| WAF | AWS WAF | Cloud Armor | WAF | AWS WAF |

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-23 | System Architect | Initial document |

---

**END OF DOCUMENT**
