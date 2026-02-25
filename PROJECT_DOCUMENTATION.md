# RentFlow - Project Documentation

## 1. Project Overview
RentFlow is a world-first usage-based property management platform designed specifically for the Indian PG (Paying Guest) and co-living market. It aims to eliminate administrative friction, reduce revenue leakage, and provide institutional-grade portfolio management for property owners and investors.

- **Objective**: Automate 35+ hours of monthly admin work and increase revenue by ~23% for property owners.
- **Key Proposition**: Usage-based pricing (pay for what you use, not fixed seats/properties).

---

## 2. Technology Stack
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Font**: Inter (via Next.js Font Optimization)

---

## 3. Project Structure
The project follows a modular architecture separating routing (`app/`) from business logic and complex UI (`src/modules/`).

### Root Directory
- `app/`: Next.js App Router directory containing page definitions and layouts.
- `src/`: Core source code.
    - `config/`: Configuration files (routes, site metadata, env).
    - `modules/`: Feature-specific modules (Marketing, Auth, Dashboard, Shared).
    - `providers/`: React Context providers (Auth, Theme, Query).
    - `styles/`: Global CSS and Tailwind configurations.
- `data/`: Static data used across the application.
- `public/`: Static assets (images, fonts).

---

## 4. Routes and Pages

### Marketing & Growth
| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `LandingPage.tsx` | Main marketing landing page. High-conversion sections including Hero, Stats, Problem/Solution, Features, ROI Chart, Testimonials, and Pricing. |
| `/waitlist` | `ViralLandingPage.tsx`| Viral waitlist page for founding members. Includes benefits, countdown, and referral mechanics. |

### Authentication
| Route | Component | Status |
| :--- | :--- | :--- |
| `/login` | `LoginPage.tsx` | Placeholder for authentication flow. |
| `/register` | `RegisterPage.tsx`| Placeholder for new account creation. |

### Application
| Route | Component | Status |
| :--- | :--- | :--- |
| `/dashboard` | `DashboardPage.tsx`| Main dashboard for property management (Placeholder). |

---

## 5. Detailed Page Information

### 5.1 Main Landing Page (`/`)
Located at `src/modules/marketing/landing/LandingPage.tsx`, it includes:
- **Hero**: Value proposition for Indian PG owners.
- **Stats**: Real-world impact metrics (500+ properties, 50k+ beds).
- **Problem/Solution**: Highlights admin burden and revenue leakage.
- **Features**: Automatic utility calculation, rent collection, GST compliance, etc.
- **ROI Section**: Interactive Recharts bar chart comparing Traditional software vs. RentFlow.
- **Pricing**: Starter (₹1,999/mo), Growth (₹4,999/mo), and Enterprise tiers.
- **Investor Story**: Institutional-grade portfolio management highlights.

### 5.2 Waitlist Page (`/waitlist`)
Located at `src/modules/marketing/waitlist/ViralLandingPage.tsx`, it focuses on:
- **Early Access**: 50% lifetime discount for founding members.
- **Viral Growth**: Waitlist form and social proof sections.
- **Information**: FAQ and "How It Works" for the waitlist program.

---

## 6. Development & Configuration
- **Route Config**: Centralized in `src/config/routes.ts`.
- **Site Metadata**: Configured in `src/config/site.ts` and `layout.tsx`.
- **Styling**: Uses standard Tailwind utility classes with `tailwind-merge` and `clsx` for dynamic styling.
- **Responsive Design**: Built with a mobile-first approach using Tailwind breakpoints.

---

## 7. Future Modules (Planned)
- **Auth Module**: Implementation of services and hooks in `src/modules/auth/`.
- **Dashboard Module**: Implementation of property management features in `src/modules/dashboard/`.
- **API Routes**: Backend integration via `app/api/`.

---
*Document Generated on: 2026-02-23*
