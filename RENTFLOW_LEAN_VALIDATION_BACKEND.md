# RentFlow — Lean Validation Backend Architecture

## Executive Summary

**Objective:** Backend for market validation only  
**Scope:** Waitlist, Investor Leads, ROI Analytics  
**Deployment Time:** 2-4 hours  
**Monthly Cost:** $0-20  
**Max Scale:** 100K users (before upgrade needed)

---

## Architecture Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LEAN VALIDATION PRINCIPLES                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✅ DO                          ❌ DON'T                                    │
│  ─────────────────────────────────────────                                  │
│  Serverless (pay per request)   Provisioned servers                         │
│  Managed databases              Self-hosted DB                              │
│  Serverless functions           Microservices                               │
│  Single codebase                Multiple repos                              │
│  No auth (for public forms)     JWT/auth for everything                     │
│  Email API (SendGrid/Resend)    Custom email infrastructure                 │
│  Static frontend hosting        SSR for validation                          │
│  CSV exports for analysis       Complex dashboards                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Minimal Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │              Next.js 16 (Static Export)                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │  │
│  │  │   Landing   │  │  Waitlist   │  │    ROI      │  │   Investor   │ │  │
│  │  │    Page     │  │    Page     │  │ Calculator  │  │    Form      │ │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘ │  │
│  │         │                │                │                │         │  │
│  │         └────────────────┴────────────────┴────────────────┘         │  │
│  │                              │                                        │  │
│  └──────────────────────────────┼────────────────────────────────────────┘  │
│                                 │                                           │
│                                 ▼                                           │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     VERCEL EDGE FUNCTIONS                             │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │  │
│  │  │  POST       │  │    GET      │  │   POST      │  │    POST      │ │  │
│  │  │ /waitlist   │  │ /waitlist/  │  │ /analytics/ │  │ /investors   │ │  │
│  │  │             │  │   position  │  │    roi      │  │              │ │  │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘ │  │
│  │         └────────────────┴────────────────┴────────────────┘         │  │
│  │                              │                                        │  │
│  └──────────────────────────────┼────────────────────────────────────────┘  │
│                                 │                                           │
│                                 ▼                                           │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                      NEON SERVERLESS POSTGRES                         │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │  │
│  │  │  waitlist   │  │    leads    │  │   events    │                   │  │
│  │  │   entries   │  │  (investor) │  │    (roi)    │                   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                      EXTERNAL SERVICES (FREE TIER)                    │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                   │  │
│  │  │   RESEND    │  │  PLAUSIBLE  │  │   UPSTASH   │                   │  │
│  │  │   (email)   │  │ (analytics) │  │  (redis)    │                   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack (Lean Edition)

| Component | Choice | Free Tier | Why |
|-----------|--------|-----------|-----|
| **Frontend Hosting** | Vercel | Unlimited static | Already using |
| **API Layer** | Vercel Edge Functions | 1M requests/mo | Same platform, zero cold start |
| **Database** | Neon PostgreSQL | 3 GB, 190 compute hours | Serverless, scales to zero |
| **Rate Limiting** | Upstash Redis | 10K requests/day | Prevents abuse |
| **Email** | Resend | 3,000 emails/day | Simple API, great deliverability |
| **Analytics** | Plausible (self-hosted) or Google Analytics | - | Privacy-focused option |
| **Monitoring** | Vercel Analytics | Included | Basic metrics |

### Alternative Stack (Even Cheaper)

| Component | Alternative | Free Tier |
|-----------|-------------|-----------|
| **API Layer** | Cloudflare Workers | 100K requests/day |
| **Database** | Supabase PostgreSQL | 500 MB |
| **Email** | SendGrid | 100 emails/day |
| **Forms** | Formspree (no-code) | 50 submissions/mo |

---

## 3. Database Schema (Minimal)

```sql
-- =====================================================
-- RENTFLOW LEAN VALIDATION SCHEMA
-- ~50 lines of SQL, deploys in seconds
-- =====================================================

-- Waitlist entries
CREATE TABLE waitlist_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(200),
    phone VARCHAR(20),
    company_name VARCHAR(200),
    
    -- Referral tracking
    referral_code VARCHAR(50) UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(6), 'hex'),
    referred_by UUID REFERENCES waitlist_entries(id),
    referral_count INTEGER DEFAULT 0,
    position INTEGER,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- pending, invited, registered
    
    -- Source tracking
    source VARCHAR(100),
    utm_campaign VARCHAR(200),
    utm_source VARCHAR(200),
    utm_medium VARCHAR(200),
    
    -- Metadata
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Investor leads
CREATE TABLE investor_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    investor_type VARCHAR(50), -- angel, vc, pg_operator, corporate
    linkedin_url TEXT,
    message TEXT,
    
    -- Simple CRM
    status VARCHAR(20) DEFAULT 'new', -- new, contacted, qualified, lost
    notes TEXT,
    
    -- Source
    source VARCHAR(100),
    
    -- Meta
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ROI calculator events
CREATE TABLE roi_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(100),
    
    -- Inputs
    properties INTEGER,
    beds_per_property INTEGER,
    avg_rent INTEGER,
    utility_cost_per_bed INTEGER,
    
    -- Results
    admin_hours_saved DECIMAL(10,2),
    revenue_leakage_recovered DECIMAL(12,2),
    annual_profit_impact DECIMAL(12,2),
    cost_reduction_pct INTEGER,
    
    -- Source
    source VARCHAR(100),
    
    -- Meta
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Simple indexes
CREATE INDEX idx_waitlist_email ON waitlist_entries(email);
CREATE INDEX idx_waitlist_referral ON waitlist_entries(referral_code);
CREATE INDEX idx_investor_email ON investor_leads(email);
CREATE INDEX idx_roi_session ON roi_calculations(session_id);
CREATE INDEX idx_roi_created ON roi_calculations(created_at);
```

---

## 4. API Endpoints (5 Total)

### 4.1 POST /api/waitlist
Join the waitlist.

**Request:**
```json
{
  "email": "user@example.com",
  "fullName": "John Doe",
  "phone": "9876543210",
  "companyName": "Doe PG",
  "referralCode": "ABC123" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "position": 348,
    "referralCode": "XYZ789",
    "referralLink": "https://rentflow.in/waitlist?ref=XYZ789",
    "message": "You're on the list!"
  }
}
```

**Implementation:**
```typescript
// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limit: 3 submissions per IP per hour
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, fullName, phone, companyName, referralCode } = body;

    // Basic validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email required' },
        { status: 400 }
      );
    }

    // Get referrer if code provided
    let referredBy = null;
    if (referralCode) {
      const referrer = await sql`
        SELECT id FROM waitlist_entries WHERE referral_code = ${referralCode}
      `;
      if (referrer.length > 0) {
        referredBy = referrer[0].id;
        // Increment referrer count
        await sql`
          UPDATE waitlist_entries 
          SET referral_count = referral_count + 1 
          WHERE id = ${referredBy}
        `;
      }
    }

    // Calculate position
    const countResult = await sql`SELECT COUNT(*) as count FROM waitlist_entries`;
    const position = parseInt(countResult[0].count) + 1;

    // Insert entry
    const result = await sql`
      INSERT INTO waitlist_entries (
        email, full_name, phone, company_name, 
        referred_by, position, ip_address, user_agent
      ) VALUES (
        ${email}, ${fullName}, ${phone}, ${companyName},
        ${referredBy}, ${position}, ${ip}, ${request.headers.get('user-agent')}
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id, referral_code, position
    `;

    if (result.length === 0) {
      // Email already exists
      const existing = await sql`
        SELECT id, referral_code, position 
        FROM waitlist_entries WHERE email = ${email}
      `;
      return NextResponse.json({
        success: true,
        data: {
          id: existing[0].id,
          position: existing[0].position,
          referralCode: existing[0].referral_code,
          referralLink: `https://rentflow.in/waitlist?ref=${existing[0].referral_code}`,
          message: "You're already on the list!",
          alreadyRegistered: true
        }
      });
    }

    // Send welcome email (async, don't await)
    resend.emails.send({
      from: 'RentFlow <hello@rentflow.in>',
      to: email,
      subject: "You're on the RentFlow waitlist!",
      html: `<p>Hi ${fullName || 'there'},</p>
             <p>You're #${position} on the waitlist.</p>
             <p>Share your referral link to move up: 
             https://rentflow.in/waitlist?ref=${result[0].referral_code}</p>`
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      data: {
        id: result[0].id,
        position: result[0].position,
        referralCode: result[0].referral_code,
        referralLink: `https://rentflow.in/waitlist?ref=${result[0].referral_code}`,
        message: "You're on the list! We'll be in touch."
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
```

### 4.2 GET /api/waitlist/position
Get waitlist stats and position.

**Query Params:**
- `email` (optional): Get specific position
- `code` (optional): Get referrer stats

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEntries": 348,
    "spotsRemaining": 152,
    "position": 156,
    "referralCount": 5,
    "estimatedLaunch": "2026-07-01"
  }
}
```

**Implementation:**
```typescript
// app/api/waitlist/position/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const code = searchParams.get('code');

    // Get total count
    const countResult = await sql`
      SELECT COUNT(*) as count FROM waitlist_entries
    `;
    const totalEntries = parseInt(countResult[0].count);

    let position = null;
    let referralCount = 0;

    if (email) {
      const entry = await sql`
        SELECT position, referral_count 
        FROM waitlist_entries WHERE email = ${email}
      `;
      if (entry.length > 0) {
        position = entry[0].position;
        referralCount = entry[0].referral_count;
      }
    }

    if (code) {
      const entry = await sql`
        SELECT position, referral_count 
        FROM waitlist_entries WHERE referral_code = ${code}
      `;
      if (entry.length > 0) {
        position = entry[0].position;
        referralCount = entry[0].referral_count;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalEntries,
        spotsRemaining: Math.max(0, 500 - totalEntries),
        position,
        referralCount,
        estimatedLaunch: '2026-07-01'
      }
    });

  } catch (error) {
    console.error('Position error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
```

### 4.3 POST /api/investors
Submit investor lead.

**Request:**
```json
{
  "fullName": "Jane Smith",
  "email": "jane@vc.com",
  "phone": "+91-9876543210",
  "investorType": "VC",
  "linkedinUrl": "https://linkedin.com/in/jane",
  "message": "Interested in learning more"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "message": "Thank you! We'll be in touch within 48 hours."
  }
}
```

**Implementation:**
```typescript
// app/api/investors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const sql = neon(process.env.DATABASE_URL!);
const resend = new Resend(process.env.RESEND_API_KEY);

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, investorType, linkedinUrl, message } = body;

    // Validation
    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email required' },
        { status: 400 }
      );
    }

    // Insert lead
    const result = await sql`
      INSERT INTO investor_leads (
        full_name, email, phone, investor_type, 
        linkedin_url, message, ip_address
      ) VALUES (
        ${fullName}, ${email}, ${phone}, ${investorType},
        ${linkedinUrl}, ${message}, ${ip}
      )
      RETURNING id
    `;

    // Notify admin (async)
    resend.emails.send({
      from: 'RentFlow <hello@rentflow.in>',
      to: 'founders@rentflow.in',
      subject: `New Investor Lead: ${fullName}`,
      html: `<p><strong>${fullName}</strong> (${investorType})</p>
             <p>Email: ${email}</p>
             <p>LinkedIn: ${linkedinUrl || 'N/A'}</p>
             <p>Message: ${message || 'N/A'}</p>`
    }).catch(console.error);

    return NextResponse.json({
      success: true,
      data: {
        id: result[0].id,
        message: "Thank you! We'll be in touch within 48 hours."
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Investor lead error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
```

### 4.4 POST /api/analytics/roi
Log ROI calculator usage.

**Request:**
```json
{
  "sessionId": "sess_abc123",
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
  "source": "landing_page"
}
```

**Response:**
```json
{
  "success": true
}
```

**Implementation:**
```typescript
// app/api/analytics/roi/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, inputs, results, source } = body;

    await sql`
      INSERT INTO roi_calculations (
        session_id, properties, beds_per_property, avg_rent,
        utility_cost_per_bed, admin_hours_saved, revenue_leakage_recovered,
        annual_profit_impact, cost_reduction_pct, source, ip_address
      ) VALUES (
        ${sessionId}, ${inputs.properties}, ${inputs.bedsPerProperty}, 
        ${inputs.avgRent}, ${inputs.utilityCostPerBed},
        ${results.adminHoursSaved}, ${results.revenueLeakageRecovered},
        ${results.annualProfitImpact}, ${results.costReductionPct},
        ${source}, ${request.ip}
      )
    `;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('ROI analytics error:', error);
    // Silent fail for analytics
    return NextResponse.json({ success: true });
  }
}
```

### 4.5 GET /api/admin/export
Export data for analysis (protected by secret key).

**Query Params:**
- `key`: Admin secret key
- `table`: waitlist | investors | roi
- `format`: csv | json

**Implementation:**
```typescript
// app/api/admin/export/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);
const ADMIN_KEY = process.env.ADMIN_SECRET_KEY;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const table = searchParams.get('table');
    const format = searchParams.get('format') || 'json';

    // Simple auth
    if (key !== ADMIN_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let data;
    switch (table) {
      case 'waitlist':
        data = await sql`SELECT * FROM waitlist_entries ORDER BY created_at DESC`;
        break;
      case 'investors':
        data = await sql`SELECT * FROM investor_leads ORDER BY created_at DESC`;
        break;
      case 'roi':
        data = await sql`SELECT * FROM roi_calculations ORDER BY created_at DESC`;
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid table' },
          { status: 400 }
        );
    }

    if (format === 'csv') {
      // Simple CSV conversion
      const headers = Object.keys(data[0] || {}).join(',');
      const rows = data.map((row: any) => 
        Object.values(row).map(v => `"${v}"`).join(',')
      );
      const csv = [headers, ...rows].join('\n');
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${table}.csv"`
        }
      });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
```

---

## 5. Environment Variables

```bash
# .env.local (add to .gitignore!)

# Database (Neon)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxx"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://xxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="xxxx"

# Admin
ADMIN_SECRET_KEY="your-secret-key-here"

# Optional: Analytics
PLAUSIBLE_DOMAIN="rentflow.in"
```

---

## 6. Deployment Steps

### Step 1: Database (Neon)
```bash
# 1. Sign up at https://neon.tech
# 2. Create project
# 3. Get connection string
# 4. Run schema:
psql $DATABASE_URL -f schema.sql
```

### Step 2: Redis (Upstash)
```bash
# 1. Sign up at https://upstash.com
# 2. Create Redis database
# 3. Copy REST URL and token
```

### Step 3: Email (Resend)
```bash
# 1. Sign up at https://resend.com
# 2. Verify domain (rentflow.in)
# 3. Get API key
```

### Step 4: Update Code
```bash
# Install dependencies
npm install @neondatabase/serverless resend @upstash/ratelimit @upstash/redis

# Add API routes (create files above)
mkdir -p app/api/waitlist app/api/waitlist/position app/api/investors app/api/analytics/roi app/api/admin/export

# Create route files...
```

### Step 5: Deploy
```bash
# Add env vars to Vercel
vercel env add DATABASE_URL
vercel env add RESEND_API_KEY
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
vercel env add ADMIN_SECRET_KEY

# Deploy
vercel --prod
```

---

## 7. Cost Breakdown

### Monthly Cost Estimate (1,000 users)

| Service | Free Tier | Estimated Usage | Cost |
|---------|-----------|-----------------|------|
| **Vercel** | 1M executions | < 100K | $0 |
| **Neon** | 3 GB, 190 hrs | 1 GB, 50 hrs | $0 |
| **Upstash** | 10K/day | < 5K | $0 |
| **Resend** | 3K/day | < 1K | $0 |
| **Domain** | - | - | Already paid |
| **Plausible** | - | Self-hosted | $0 |
| **TOTAL** | | | **$0** |

### Monthly Cost Estimate (10,000 users)

| Service | Usage | Cost |
|---------|-------|------|
| Vercel | Included | $0 |
| Neon | 2 GB, 100 hrs | $0 |
| Upstash | ~30K/month | $0 |
| Resend | ~10K emails | $0 |
| **TOTAL** | | **$0** |

### Monthly Cost Estimate (100,000 users)

| Service | Usage | Cost |
|---------|-------|------|
| Neon | 5 GB, 500 hrs | ~$10 |
| Upstash | Pay-as-you-go | ~$5 |
| Resend | Pay-as-you-go | ~$20 |
| **TOTAL** | | **~$35** |

---

## 8. Updated Frontend Integration

### WaitlistForm.tsx (Updated)

```typescript
'use client';

import { useState } from 'react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Get referral code from URL if present
      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get('ref');

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName,
          referralCode,
          source: 'waitlist_page'
        })
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center p-6">
        <h3 className="text-xl font-bold text-green-600 mb-2">You're on the list!</h3>
        <p className="text-slate-600 mb-4">Position: #{result.position}</p>
        <p className="text-sm text-slate-500">
          Share your link to move up:<br />
          <code className="bg-slate-100 px-2 py-1 rounded">{result.referralLink}</code>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Full name (optional)"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border"
      />
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-xl border"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3 bg-blue-600 text-white rounded-xl"
      >
        {status === 'loading' ? 'Joining...' : 'Join Founding Operators'}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
```

### ROICalculatorSection.tsx (Analytics Update)

```typescript
// Add to the calculator - log when user calculates
const logCalculation = async (inputs: CalculatorInputs, results: any) => {
  try {
    await fetch('/api/analytics/roi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: getSessionId(), // Generate or retrieve from localStorage
        inputs,
        results,
        source: 'landing_page'
      })
    });
  } catch {
    // Silent fail for analytics
  }
};

// Call in compute function
const roi = useMemo(() => {
  const results = computeROI(inputs);
  logCalculation(inputs, results); // Log for analytics
  return results;
}, [inputs]);
```

---

## 9. Monitoring & Analytics

### Simple Dashboard Queries

```sql
-- Daily waitlist signups
SELECT 
  DATE(created_at) as date,
  COUNT(*) as signups
FROM waitlist_entries
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Referral performance
SELECT 
  referral_code,
  email,
  referral_count,
  position
FROM waitlist_entries
WHERE referral_count > 0
ORDER BY referral_count DESC
LIMIT 20;

-- Investor lead quality
SELECT 
  investor_type,
  COUNT(*) as count,
  COUNT(CASE WHEN linkedin_url IS NOT NULL THEN 1 END) as with_linkedin
FROM investor_leads
GROUP BY investor_type;

-- ROI calculator usage
SELECT 
  DATE(created_at) as date,
  COUNT(*) as calculations,
  AVG(properties) as avg_properties,
  AVG(annual_profit_impact) as avg_impact
FROM roi_calculations
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Conversion funnel (rough estimate)
SELECT 
  'ROI Calculations' as step,
  COUNT(DISTINCT session_id) as count
FROM roi_calculations
UNION ALL
SELECT 
  'Waitlist Signups' as step,
  COUNT(*) as count
FROM waitlist_entries;
```

---

## 10. Validation Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Waitlist Signups** | 500 in 30 days | Database count |
| **Referral Rate** | >20% have referrals | SQL query |
| **Investor Leads** | 20 qualified leads | Manual review |
| **ROI Calculations** | 1,000 in 30 days | Database count |
| **Email Open Rate** | >40% | Resend analytics |
| **Conversion Rate** | 5% calc → waitlist | Funnel analysis |

---

## Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LEAN VALIDATION BACKEND                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DEPLOYMENT TIME: 2-4 hours                                                 │
│  MONTHLY COST: $0 (up to 100K users)                                        │
│  LINES OF CODE: ~300                                                        │
│  INFRASTRUCTURE: Zero (fully serverless)                                    │
│  MAINTENANCE: Near zero                                                     │
│                                                                             │
│  INCLUDES:                                                                  │
│  ✅ Waitlist with referral tracking                                         │
│  ✅ Investor lead capture                                                   │
│  ✅ ROI calculator analytics                                                │
│  ✅ Rate limiting & spam protection                                         │
│  ✅ Email notifications                                                     │
│  ✅ Data export for analysis                                                │
│                                                                             │
│  NEXT STEPS (after validation):                                             │
│  1. Build full auth system                                                  │
│  2. Add property management                                                 │
│  3. Implement billing                                                       │
│  4. Add payment processing                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

**Ready to deploy? Start with Step 1: Create your Neon database.**
