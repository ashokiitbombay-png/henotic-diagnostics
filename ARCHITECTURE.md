# Architecture Documentation: Henotic Diagnostics Platform

Welcome to the architectural overview of the **Henotic Diagnostics** web platform (`www.henoticdiagnostics.com`). This document details the technical design, data flows, routing strategies, SEO matrix, static integrations, and deployment pipeline powering the application.

---

## 🛠️ 1. Tech Stack & Core Infrastructure

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) with Server-Side Rendering (SSR) & Static Site Generation (SSG)
- **Runtime & UI**: React 19, TypeScript 6
- **Styling**: Tailwind CSS v3, PostCSS, FontAwesome 6 Pro, Inter & Outfit Google Fonts
- **Data & Content Management**: Headless WordPress GraphQL (`WPGraphQL`) via `@apollo/client`
- **Caching & Rate Limiting**: Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`)
- **Static Assets & CDN**: Google Cloud Storage (GCS) CDN (`storage.googleapis.com`)
- **Email & Notifications**: Nodemailer (SMTP transport for automated booking receipts and OTP verification)
- **Testing**: Playwright (`@playwright/test`) for PSEO automated regression crawling, Vitest for unit testing
- **Deployment Platform**: Vercel Edge & Serverless Network

---

## 📁 2. Repository & File Structure

```
henotic-diagnostics/
├── public/                         # Public static assets & embedded portals
│   ├── booking-system/             # Standalone Single-Page Booking Application
│   │   └── index.html              # Embedded 400+ test booking engine & WhatsApp dispatcher
│   ├── sitemaps/                   # Streamed XML Sitemap Chunks (sitemap-1.xml .. sitemap-5.xml)
│   ├── sitemap.xml                 # Master Sitemap Index file referencing all chunks
│   ├── favicon.ico                 # Site favicon
│   └── robots.txt                  # Search engine crawler permissions
├── scripts/                        # Automated build & utility scripts
│   ├── generate-sitemaps.ts        # Streaming generator for 45,000+ PSEO URLs
│   └── shard-build.ts              # Custom build sharding script
├── src/
│   ├── app/                        # Next.js 16 App Router Routes
│   │   ├── (sitemap-html)/         # Segmented routes for HTML sitemaps
│   │   │   └── sitemap/            # /sitemap HTML sitemap directory page
│   │   ├── api/                    # Serverless API Route Handlers
│   │   │   ├── booking/            # /api/booking - Handles booking dispatch
│   │   │   ├── og/                 # /api/og - Dynamic Open Graph image generator
│   │   │   ├── payment/            # /api/payment/ (create-order, verify)
│   │   │   ├── products/feed/      # /api/products/feed - Google Merchant Center XML feed
│   │   │   ├── reminders/          # /api/reminders - SMS/Email appointment reminders
│   │   │   └── reports/            # /api/reports - OTP Verification & PDF downloads
│   │   ├── blog/                   # /blog & /blog/[slug] - WordPress Headless Blog
│   │   ├── city/                   # /city & /city/[city] - City diagnostic pages
│   │   ├── compare/                # /compare/[slug] - Diagnostic test comparison matrix
│   │   ├── conditions/             # /conditions/[condition] - Medical condition landing pages
│   │   ├── doctors/                # /doctors/[slug] - Radiologist & Doctor profiles
│   │   ├── gmc/                    # /gmc/[product] - Google Merchant Center product pages
│   │   ├── services/               # Diagnostic Service PSEO Matrix
│   │   │   ├── page.tsx            # All services catalog
│   │   │   ├── [service]/          # Level 1: /services/mri-scan
│   │   │   ├── [service]/[region]  # Level 2: /services/mri-scan/navi-mumbai
│   │   │   └── [service]/[region]/[location] # Level 3: /services/mri-scan/navi-mumbai/kharghar
│   │   └── layout.tsx              # Root Layout (SiteHeader, SiteFooter, Schema Markup)
│   ├── components/                 # UI & Feature Components
│   │   ├── blog/                   # Blog cards, sidebars, and resolvers
│   │   ├── features/               # Specialized features (reviews, calculators, maps)
│   │   ├── layout/                 # SiteHeader, SiteFooter, Mobile Navigation
│   │   ├── monitoring/             # Google Customer Reviews Shop Quality widget
│   │   ├── seo/                    # Structured Data JSON-LD schemas (MedicalClinic, FAQPage)
│   │   └── ui/                     # Reusable design components (buttons, modals, WhatsApp widget)
│   ├── config/                     # Data configuration matrices
│   │   ├── cities.ts               # Supported cities catalog
│   │   ├── comparisons.ts          # Test comparison matrix definitions
│   │   ├── conditions.ts           # Medical conditions database
│   │   ├── doctors.ts              # Medical specialist definitions
│   │   ├── locations.ts            # Micro-locations (Navi Mumbai, Western Suburbs, Thane, etc.)
│   │   └── services.ts             # 400+ Diagnostic tests & categories catalog
│   └── lib/                        # Utility functions & API clients
│       ├── apollo-client.ts        # WPGraphQL Client configuration
│       ├── blog-image-helper.ts    # Fallback image resolver for WordPress posts
│       └── utils.ts                # General helper utilities
├── tests/                          # E2E & Automated Test Suites
│   └── pseo-regression.spec.ts     # Playwright regression crawler for 500 PSEO samples
├── next.config.js                  # Next.js configuration & rewrite rules
├── package.json                    # Dependencies & npm scripts
└── tsconfig.json                   # TypeScript configuration
```

---

## 🏛️ 3. Key Architectural Domains

### A. Programmatic SEO (PSEO) & Matrix Routing
The core organic growth engine of Henotic Diagnostics is built on a 3-level matrix route hierarchy:
1. **Service Level**: `/services/[service]` (e.g. `/services/mri-scan`, `/services/pet-scan`)
2. **Region Level**: `/services/[service]/[region]` (e.g. `/services/mri-scan/navi-mumbai`)
3. **Micro-Location Level**: `/services/[service]/[region]/[location]` (e.g. `/services/mri-scan/navi-mumbai/kharghar`)

**Static Generation (`generateStaticParams`)**:
- High-priority pages are pre-rendered at build time (SSG) for sub-millisecond TTFB.
- Lower-frequency long-tail combinations are dynamically generated on-demand with ISR revalidation (`revalidate = 86400` / 1 day).

---

### B. Streaming Sitemap Architecture (45,000+ URLs)
To handle search engine indexing of over 45,000 PSEO URL combinations without hitting memory or 50,000-link sitemap limits:
- **Build-Time Streamer**: Executed prior to `next build` via `scripts/generate-sitemaps.ts`.
- **Chunking**: Split into 10,000-URL XML sitemaps stored statically in `public/sitemaps/` (`sitemap-1.xml` to `sitemap-5.xml`).
- **Master Index**: Main `public/sitemap.xml` references all chunked files.
- **Rewrites**: `next.config.js` maps legacy or direct sitemap paths seamlessly (`/sitemap/0.xml` ➔ `/sitemaps/sitemap-1.xml`).

---

### C. Headless WordPress GraphQL Integration
- Dynamic blog articles (`/blog/[slug]`) and custom page content are retrieved from a WordPress backend using WPGraphQL over `@apollo/client`.
- **Resilience & Fallback Engine**: If the headless WordPress instance encounters downtime or missing featured media, `src/lib/blog-image-helper.ts` automatically serves high-resolution category-relevant CDN fallbacks, preventing broken layouts or gradient placeholder fallbacks.

---

### D. Static Booking Portal Integration (`public/booking-system/`)
- Located in `public/booking-system/index.html`, this standalone single-page application is served statically by Next.js at `/booking-system/`.
- **0 Impact Guarantee**: Operates completely decoupled from Next.js server components, preserving 100% of main site headers, footers, logo schemas, and GraphQL types.
- **Portal Features**:
  - Catalog of 400+ diagnostic tests across 14 modalities.
  - Interactive 20 partner center locator with Google Maps integration.
  - Live 3D WhatsApp preview dispatcher supporting English, Hindi, and Marathi templates.
  - Printable VIP Digital Pass generator with real-time QR code synthesis.
  - LocalStorage booking audit drawer with CSV export/import capabilities.

---

### E. Security, Schema Markup & Floating Widgets
- **Structured Data**: Injects JSON-LD schemas (`MedicalClinic`, `DiagnosticLab`, `Physician`, `BreadcrumbList`, `FAQPage`) across all pages for rich snippet eligibility.
- **Floating Controls**: Floating WhatsApp & Emergency Phone widgets are dynamically offset (`bottom-[80px] md:bottom-8 right-4 md:right-6`) to prevent visual collision with third-party widgets like Google Customer Reviews Shop Quality badge (`BOTTOM_LEFT`).

---

## ⚡ 4. Build & Deployment Workflow

```bash
# Development Server
npm run dev

# Pre-render Sitemaps & Production Webpack Build
npm run build

# Run Playwright PSEO Automated Crawl Test
npm run test:pseo

# Deploy to Vercel Production
npx vercel --prod --yes
```

---

## 🔒 5. Quality & Performance Principles

1. **Hydration Protection**: All dynamic client components employ strict SSR mounting flags (`mounted` state) to eliminate React hydration mismatch errors.
2. **Resource Attribution**: All Google Cloud API calls adhere to strict project and billing attribution flags.
3. **Zero Data Loss**: Strict validation guarantees that data schema migrations or content edits preserve all pre-existing canonical tags, open graph meta tags, and structured data.
