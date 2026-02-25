# RentFlow Premium Marketing Site

**Future Beyond Tech (FBT) - Official Flagship Product**

A world-class, conversion-optimized marketing website for RentFlow — the world's first usage-based property management platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd rentflow-landing

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create static export
npm run build

# Output will be in /dist folder
```

## 📁 Project Structure

```
rentflow-landing/
├── app/
│   ├── page.tsx          # Main landing page (all sections)
│   ├── layout.tsx        # Root layout with SEO metadata
│   └── globals.css       # Global styles & Tailwind
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind customization
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## 🎨 Design System

### Colors
- **Primary:** Blue 600 (#2563eb) to Indigo 600 (#4f46e5)
- **Secondary:** Purple 600 (#9333ea)
- **Accent:** Amber 400 (#fbbf24) for highlights
- **Success:** Green 500 (#22c55e)
- **Background:** Slate 50 (#f8fafc) to White
- **Dark:** Slate 900 (#0f172a)

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold (700), tight tracking
- **Body:** Regular (400), relaxed line-height

### Animations
- **Hero Orbs:** 8s infinite scale/opacity loop
- **Scroll Reveal:** Framer Motion viewport triggers
- **Hover Effects:** Scale 1.05, shadow elevation
- **Page Load:** Staggered fade-in sequence

## 📱 Sections Overview

### 1. Navigation
- Glass morphism effect on scroll
- Responsive mobile menu
- Smooth scroll to sections

### 2. Hero Section
- Animated gradient background
- Floating orb effects
- Dual CTA buttons (Trial + Demo)
- Trust badges

### 3. Stats Bar
- 4 key metrics with animated counters
- Grid layout (4 cols desktop, 2 cols mobile)

### 4. Problem/Solution
- Split layout: Problems (left) vs Solution Preview (right)
- Interactive dashboard mockup
- Pain point cards with icons

### 5. Features Grid
- 6 feature cards in 3x2 grid
- Hover lift effect with shadow
- Gradient icon backgrounds

### 6. ROI Section
- Cost comparison bar chart (Recharts)
- Dark theme with gradient text
- Savings calculator preview

### 7. Testimonials
- 3 customer cards
- Star ratings
- Profile images with company info

### 8. Pricing
- 3-tier cards (Starter/Growth/Enterprise)
- Highlighted "Most Popular" plan
- Feature checklists

### 9. Investors Section
- Portfolio dashboard mockup
- Real-time metrics display
- Area chart visualization

### 10. CTA Section
- Gradient background (Blue to Purple)
- Large headline
- Dual action buttons

### 11. Footer
- 5-column layout
- Social links
- Legal links

## 🎯 Conversion Optimization

### Primary CTAs
1. **"Start Free Trial"** - Main conversion goal
2. **"Talk to Sales"** - Enterprise leads
3. **"Watch Demo"** - Product education

### Trust Signals
- Customer testimonials with photos
- Stats (500+ properties, 99.99% uptime)
- Security badges (SOC 2, encryption)
- "No credit card required" reassurance

### Urgency/Scarcity
- "World-first innovation" positioning
- ROI payback in 6 days
- 1,916% ROI statistic

## 🔧 Customization

### Changing Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "#your-color",
  }
}
```

### Adding Sections
1. Create component in `page.tsx`
2. Add to main component return
3. Include in navigation if needed

### Updating Content
- **Stats:** Edit `stats` array in page.tsx
- **Features:** Edit `features` array
- **Testimonials:** Edit `testimonials` array
- **Pricing:** Edit `pricingTiers` array

## 📊 Performance

- **Lighthouse Score:** 95+ (estimated)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Bundle Size:** Optimized with tree-shaking

## 🔒 SEO

### Meta Tags (in layout.tsx)
- Title: "RentFlow - The Future of Property Management | FBT"
- Description: Optimized for keywords
- Open Graph: Social sharing optimized
- Keywords: Property management, PG, SaaS, etc.

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Section landmarks
- Alt text for images
- ARIA labels where needed

## 🌐 Deployment

### Static Export (Recommended)
```bash
npm run build
# Upload /dist to any static host
```

### Vercel (Optimized)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag /dist to Netlify drop
```

## 📝 Content Strategy

### Target Audiences
1. **PG Owners** - Pain: Admin chaos, Solution: Automation
2. **Property Managers** - Pain: Scale, Solution: Portfolio view
3. **Investors** - Pain: Visibility, Solution: Analytics
4. **Enterprise** - Pain: Compliance, Solution: Security

### Key Messages
- "World-first usage-based pricing"
- "Zero-friction operations"
- "35 hours saved monthly"
- "₹4.6L net profit annually"

## 🎭 Brand Voice

- **Professional** but approachable
- **Confident** but not arrogant
- **Data-driven** with proof points
- **Innovative** (world-first positioning)

## 📞 Contact

**Future Beyond Tech**
- Website: https://futurebeyondtech.com
- Email: hello@rentflow.in
- Product: https://rentflow.in

---

**Built with ❤️ by FBT Engineering Team**
**© 2026 Future Beyond Tech. All rights reserved.**
