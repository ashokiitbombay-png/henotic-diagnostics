import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import MedicalClinicSchema from '@/components/seo/MedicalClinicSchema';
import { Analytics } from '@vercel/analytics/next';
import ThirdPartyScripts from '@/components/seo/ThirdPartyScripts';
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import Providers from '@/providers/Providers';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import StickyMobileCTA from '@/components/ui/StickyMobileCTA';
import SocialProofNotification from '@/components/ui/SocialProofNotification';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'optional',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true,
});


import SecondFooter from "@/components/layout/SecondFooter";
export const metadata = {
  metadataBase: new URL('https://www.henoticdiagnostics.com'),
  title: {
    default: 'Henotic Diagnostics | Premier Diagnostic Center',
    template: '%s | Henotic Diagnostics'
  },
  description: "Mumbai & Navi Mumbai's premier diagnostic center featuring advanced 3.0T MRI, low-dose CT, and automated pathology. NABH Accredited.",
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
    // Added data-scroll-behavior="smooth" to satisfy Next.js routing requirements
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth">
        <head>
          <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://storage.googleapis.com" />
          {/* Preload LCP hero image to eliminate chain delay */}
          <link
            rel="preload"
            as="image"
            href="https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp"
            fetchPriority="high"
          />
        </head>
      <body suppressHydrationWarning className={`${inter.variable} ${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        <Providers>
          <ThirdPartyScripts />
          <MedicalClinicSchema />
          <SiteHeader />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <SecondFooter />
          <SiteFooter />
          <WhatsAppWidget />
          <StickyMobileCTA />
          <SocialProofNotification />
          <Analytics />
        </Providers>
        </body>
    </html>
  );
}