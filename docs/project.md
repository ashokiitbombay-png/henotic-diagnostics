# Project Overview & Specification

## 1. Executive Summary
**Henotic Diagnostics** (`www.henoticdiagnostics.com`) is an enterprise-grade medical diagnostic web platform serving Mumbai, Navi Mumbai, Thane, and surrounding regions. The platform connects patients with premier NABL-accredited diagnostic centers for MRI, CT Scans, PET-CT, Pathology, Ultrasound, and Cardiology services.

---

## 2. Business Objectives & Core Features
- **Programmatic SEO (PSEO)**: Rank for over 45,000 hyper-local medical search queries across services, regions, and micro-locations.
- **Instant Booking Engine (`/booking-system/`)**: Standalone, decoupled single-page application enabling patients to select from 400+ diagnostic tests, choose from 20 partner centers, and dispatch formatted WhatsApp booking requests with live 3D preview.
- **Headless WordPress Integration**: Dynamic medical blog (`/blog`) and articles powered by WPGraphQL with automated CDN fallback image resolution.
- **Google Merchant Center & Product Feeds**: Automated XML product feed generator (`/api/products/feed`) and dedicated GMC product landing pages (`/gmc/[product]`).
- **Reports & Patient Portal**: Secure OTP-verified diagnostic report download engine (`/reports` & `/api/reports/verify-otp`).

---

## 3. Technology Stack & Specifications

| Layer | Technology | Version / Details |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.2.9` |
| **UI Library** | React | `19.2.7` |
| **Type System** | TypeScript | `6.0.3` |
| **Styling Engine** | Tailwind CSS | `3.4.19` |
| **Iconography** | FontAwesome 6 Pro & Lucide React | `1.17.0` |
| **Headless CMS** | WordPress + WPGraphQL | `@apollo/client ^4.2.1` |
| **Cache & Rate Limiting** | Upstash Redis | `@upstash/redis ^1.34.0`, `@upstash/ratelimit ^2.0.8` |
| **Storage & CDN** | Google Cloud Storage (GCS) | `storage.googleapis.com` |
| **Sitemap Streamer** | Custom Node.js Script | `scripts/generate-sitemaps.ts` (`tsx`) |
| **Automated Testing** | Playwright & Vitest | `@playwright/test ^1.62.1`, `vitest ^3.2.0` |
| **Deployment** | Vercel Serverless / Edge Network | Production Deployment |

---

## 4. System Boundaries & Guarantees
1. **Decoupled Static Portals**: The single-page booking application (`public/booking-system/index.html`) operates completely isolated from Next.js server components, ensuring 0 layout corruption, 0 header breakage, and 0 schema regressions.
2. **Zero Hydration Mismatch**: All dynamic client components implement explicit mounting guards (`mounted` state) to prevent SSR/CSR HTML mismatches.
3. **Resilient Data Ingestion**: Fallbacks are enforced at every layer (GraphQL failures default to curated local JSON config matrices).
