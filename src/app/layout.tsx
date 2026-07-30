import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import MedicalClinicSchema from '@/components/seo/MedicalClinicSchema';
import { Analytics } from '@vercel/analytics/next';
import ThirdPartyScripts from '@/components/seo/ThirdPartyScripts';
import SiteHeader from "@/components/layout/SiteHeader";
import Providers from '@/providers/Providers';
import "./globals.css";

/**
 * System font stack — eliminates 84KB woff2 download from critical path.
 * -apple-system (iOS/macOS), Segoe UI (Windows), Roboto (Android) are all
 * Inter-like geometric sans-serif fonts. Zero network cost, instant render.
 */
const systemFontClass = 'font-system';

// 🚀 Lazy-load below-fold components to reduce initial DOM + JS bundle
const SecondFooter = dynamic(() => import("@/components/layout/SecondFooter"));
const SiteFooter = dynamic(() => import("@/components/layout/SiteFooter"));
const WhatsAppWidget = dynamic(() => import('@/components/ui/WhatsAppWidget'));
const StickyMobileCTA = dynamic(() => import('@/components/ui/StickyMobileCTA'));
const SocialProofNotification = dynamic(() => import('@/components/ui/SocialProofNotification'));
const CookieConsent = dynamic(() => import('@/components/ui/CookieConsent'));

// 📊 Monitoring & Tracking (lazy-loaded, env-gated)
const TawkToChat = dynamic(() => import('@/components/ui/TawkToChat'));
const ClarityScript = dynamic(() => import('@/components/monitoring/ClarityScript'));
const MetaPixel = dynamic(() => import('@/components/monitoring/MetaPixel'));
const ServiceWorkerRegister = dynamic(() => import('@/components/ui/ServiceWorkerRegister'));
const GA4Script = dynamic(() => import('@/components/monitoring/GA4Script'));
const SentryInit = dynamic(() => import('@/components/monitoring/SentryInit'));

export const metadata: Metadata = {
  metadataBase: new URL('https://www.henoticdiagnostics.com'),
  title: {
    default: 'Henotic Diagnostics | Premier Diagnostic Center',
    template: '%s | Henotic Diagnostics'
  },
  description: "Mumbai & Navi Mumbai's premier diagnostic center featuring advanced 3.0T MRI, low-dose CT, and automated pathology. NABH Accredited.",
  verification: {
    other: {
      'google-adsense-account': 'ca-pub-2224247495448831',
    },
  },
  alternates: {
    canonical: 'https://www.henoticdiagnostics.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.henoticdiagnostics.com',
    siteName: 'Henotic Diagnostics',
    images: [
      {
        url: 'https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp',
        width: 1200,
        height: 630,
        alt: 'Henotic Diagnostics Premier Facility',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henotic Diagnostics',
    description: "Advanced diagnostic imaging and pathology in Mumbai.",
    images: ['https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/Hero/henotic-diagnostics-mri-scan-panvel-navi-mumbai.webp'],
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth">
        <head>
          <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://storage.googleapis.com" />
          {/* PWA */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#1e3a5f" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          {/* Preload LCP hero image — direct from GCS CDN, no /_next/image proxy */}
          <link
            rel="preload"
            as="image"
            href="https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp"
            type="image/webp"
          />
        </head>
      <body suppressHydrationWarning className={`${systemFontClass} flex flex-col min-h-screen bg-gray-50`}>
        <Providers>
          {/* ♿ Skip to Content — Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:bg-blue-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-xl focus:font-bold focus:shadow-2xl focus:outline-none"
          >
            Skip to main content
          </a>

          <ThirdPartyScripts />
          <MedicalClinicSchema />
          {/* WebSite Schema for Sitelinks Search Box */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Henotic Diagnostics',
              url: 'https://www.henoticdiagnostics.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.henoticdiagnostics.com/services?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }) }}
          />
          <SiteHeader />
          
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          
          <SecondFooter />
          <SiteFooter />
          <WhatsAppWidget />
          <StickyMobileCTA />
          <SocialProofNotification />
          <CookieConsent />
          <TawkToChat />
          <ClarityScript />
          <MetaPixel />
          <GA4Script />
          <SentryInit />
          <Analytics />
          <ServiceWorkerRegister />
        </Providers>
        </body>
    </html>
  );
}