"use client";

import dynamic from "next/dynamic";

/**
 * 🛡️ Client Widgets — Hydration-safe wrapper for all client-only interactive widgets.
 * Moved to a Client Component because Next.js 16 Turbopack disallows
 * `{ ssr: false }` in Server Components (like layout.tsx).
 */
const WhatsAppWidget = dynamic(() => import('@/components/ui/WhatsAppWidget'), { ssr: false });
const StickyMobileCTA = dynamic(() => import('@/components/ui/StickyMobileCTA'), { ssr: false });
const SocialProofNotification = dynamic(() => import('@/components/ui/SocialProofNotification'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/ui/CookieConsent'), { ssr: false });
const TawkToChat = dynamic(() => import('@/components/ui/TawkToChat'), { ssr: false });
const ClarityScript = dynamic(() => import('@/components/monitoring/ClarityScript'), { ssr: false });
const MetaPixel = dynamic(() => import('@/components/monitoring/MetaPixel'), { ssr: false });
const ServiceWorkerRegister = dynamic(() => import('@/components/ui/ServiceWorkerRegister'), { ssr: false });
const GA4Script = dynamic(() => import('@/components/monitoring/GA4Script'), { ssr: false });
const SentryInit = dynamic(() => import('@/components/monitoring/SentryInit'), { ssr: false });
const GoogleCustomerReviews = dynamic(() => import('@/components/monitoring/GoogleCustomerReviews'), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <WhatsAppWidget />
      <StickyMobileCTA />
      <SocialProofNotification />
      <CookieConsent />
      <TawkToChat />
      <ClarityScript />
      <MetaPixel />
      <GA4Script />
      <SentryInit />
      <GoogleCustomerReviews />
      <ServiceWorkerRegister />
    </>
  );
}
