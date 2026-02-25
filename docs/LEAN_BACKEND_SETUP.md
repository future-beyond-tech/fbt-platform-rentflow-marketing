# RentFlow Lean Validation Backend — Setup

This project includes the **Lean Validation Backend** (waitlist, investor leads, ROI analytics). API routes require a Node server, so static export is disabled when the backend is enabled.

## Quick start

1. **Database (Neon)**  
   Create a project at [neon.tech](https://neon.tech), copy the connection string, then run:

   ```bash
   psql "$DATABASE_URL" -f db/schema.sql
   ```

2. **Environment variables**  
   Copy `.env.example` to `.env.local` and set:

   - `DATABASE_URL` — Neon PostgreSQL connection string
   - `RESEND_API_KEY` — optional; for waitlist welcome & investor notification emails
   - `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — optional; for rate limiting (skipped if unset)
   - `ADMIN_SECRET_KEY` — secret for `/api/admin/export`
   - `ENABLE_LEAN_BACKEND=true` — required so the build does not use static export (API routes need a server)

3. **Build & run**

   ```bash
   ENABLE_LEAN_BACKEND=true npm run build
   npm run start
   ```

   Or in development (API routes work without the env):

   ```bash
   npm run dev
   ```

4. **Deploy to Vercel**  
   Add the same env vars in the Vercel project, set `ENABLE_LEAN_BACKEND=true`, and deploy. Do not use "Output: Static Export" in Vercel when using this backend.

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/waitlist` | Join waitlist (email, fullName, optional referralCode) |
| GET | `/api/waitlist/position?email=...` or `?code=...` | Waitlist stats and position |
| POST | `/api/investors` | Submit investor lead |
| POST | `/api/analytics/roi` | Log ROI calculator usage |
| GET | `/api/admin/export?key=...&table=waitlist\|investors\|roi&format=csv\|json` | Export data (requires `ADMIN_SECRET_KEY`) |

## Static-only build (no backend)

If you remove or do not use the API routes and want a pure static export, set in `next.config.js`:

- `output: 'export'`
- Do not set `ENABLE_LEAN_BACKEND`.

Note: with the current API route files present, a static export build will fail; the codebase is set up for the lean backend.
