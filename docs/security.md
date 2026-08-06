# Henotic Diagnostics Security Architecture & Audit Report

## 1. Security Architecture Summary

This document details the security model, vulnerability prevention rules, credential safety policies, and transport security controls enforced across the **Henotic Diagnostics** web platform (`www.henoticdiagnostics.com`).

The application adheres to OWASP Web Application Security standards, HIPAA/NABL patient data privacy guidelines, and Vercel Edge Serverless security best practices.

---

## 2. Credentials & Environment Variable Governance

### A. Zero Hardcoded Secrets Guarantee
- **Strict Separation**: 100% of sensitive API keys, database credentials, SMTP passwords, and secret tokens are loaded dynamically from environment variables (`process.env.*`).
- **Zero In-Code Secrets**: Source code files in `src/`, `public/`, `scripts/`, and `tests/` contain **zero** plaintext API keys, passwords, or secret tokens.
- **Git Protection (`.gitignore`)**:
  - Local environment files (`.env`, `.env*.local`, `.env.production`) are strictly ignored in `.gitignore`.
  - Only a sanitized template (`.env.example`) containing non-sensitive placeholder variables is tracked in version control.

### B. Client vs. Server Scope Isolation
- **Public Variables (`NEXT_PUBLIC_*`)**: Strictly restricted to public client-facing identifiers (e.g. `NEXT_PUBLIC_WORDPRESS_API_URL`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `NEXT_PUBLIC_GA4_ID`).
- **Private Variables (Server-Only)**: Secrets (e.g. `RAZORPAY_KEY_SECRET`, `REVALIDATION_SECRET`, `WEBHOOK_SIGNING_SECRET`, `SMTP_PASS`, `TWILIO_AUTH_TOKEN`) are restricted to Node.js serverless execution contexts (`server-only`).

---

## 3. API & Serverless Endpoint Security

### A. Timing-Safe Secret Verification
- Webhook and cache revalidation endpoints (`/api/revalidate`, `/api/revalidate/flush`, `/api/revalidate/webhook`) verify secret tokens using **constant-time string comparison** (`crypto.timingSafeEqual` / `timingSafeCompare`) to prevent timing side-channel attacks.

### B. HMAC-SHA256 Signature Verification
- Incoming webhooks support HMAC-SHA256 payload verification via the `X-Webhook-Signature` header, validating that incoming requests originate strictly from authorized upstream sources.

### C. Rate Limiting & Abuse Prevention
- Sensitive API routes (e.g. `/api/booking`, `/api/payment/create-order`, `/api/reports/verify-otp`) leverage **Upstash Redis Rate Limiting** (`@upstash/ratelimit`) to mitigate Denial of Service (DoS), automated bot spam, and brute-force OTP attempts.

### D. Payment Security (Razorpay)
- Order creation (`/api/payment/create-order`) and signature verification (`/api/payment/verify`) execute HMAC-SHA256 verification using `RAZORPAY_KEY_SECRET` before updating booking statuses.
- No credit card, debit card, or UPI PIN data is processed or stored on Henotic Diagnostics servers.

---

## 4. HTTP Security Headers & Transport Security

Enforced via Next.js configuration (`next.config.js`) across all HTTP routes:

```javascript
// HTTP Security Headers Configuration
{
  key: 'Strict-Transport-Security',
  value: 'max-age=31536000; includeSubDomains; preload' // Forces HTTPS for 1 year
},
{
  key: 'X-Frame-Options',
  value: 'DENY' // Prevents clickjacking framing attacks
},
{
  key: 'X-Content-Type-Options',
  value: 'nosniff' // Prevents MIME-type sniffing
},
{
  key: 'X-XSS-Protection',
  value: '1; mode=block' // Enables browser cross-site scripting filter
},
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin' // Limits referrer leakages
}
```

---

## 5. Input Validation, XSS & Data Privacy

### A. Input Sanitization & Auto-Formatting
- **Patient Name Input**: Auto-capitalized and sanitized to prevent script injection.
- **Phone Number Input**: Sanitized to extract 10 numerical digits, stripping illegal non-digit characters.
- **Micro-Location & Service Slugs**: Strictly validated against whitelist configuration files (`src/config/services.ts`, `src/config/locations.ts`).

### B. Cross-Site Scripting (XSS) Prevention
- React JSX automatically escapes dynamic values prior to rendering DOM elements.
- Static application portals (`public/booking-system/index.html`) use explicit text nodes and encoded attributes for all user-supplied data.

### C. Patient Data Confidentiality & Medical Privacy
- **OTP Verification**: Patient diagnostic reports (`/reports`) require 2-Factor OTP verification via SMS before releasing download links.
- **WhatsApp Deep Links**: Direct WhatsApp dispatches format appointment requests client-side without storing unprotected patient medical data in public logs.

---

## 6. Static Portal Security Model (`public/booking-system/`)

- Located at `public/booking-system/index.html`, the standalone single-page application is served statically by Next.js.
- **Isolation Security**: Operates completely decoupled from backend App Router server components.
- **Client Storage Safety**: Local audit history saved in `localStorage` (`henotic_history`) is stored locally within the user's browser session and can be cleared via 1-click controls.

---

## 7. Operational Security Checklist

| Control Point | Status | Implementation Standard |
| :--- | :---: | :--- |
| **Git Secret Scanning** | ✅ PASSED | Zero API keys or secrets in repository history |
| **`.gitignore` Enforced** | ✅ PASSED | `.env`, `.env*.local`, build artifacts ignored |
| **HSTS HTTPS Preload** | ✅ PASSED | Max-age 31536000 with subdomains preloaded |
| **Clickjacking Protection** | ✅ PASSED | `X-Frame-Options: DENY` |
| **Payment Verification** | ✅ PASSED | Razorpay HMAC-SHA256 signature verification |
| **Timing Attack Safety** | ✅ PASSED | Constant-time comparisons (`timingSafeCompare`) |
| **Report Access OTP** | ✅ PASSED | 2FA OTP verification required for report access |
