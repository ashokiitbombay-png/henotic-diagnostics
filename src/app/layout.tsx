import type { Metadata } from 'next';
import Script from 'next/script';
import { GoogleTagManager } from '@next/third-parties/google';
import MedicalClinicSchema from '@/components/seo/MedicalClinicSchema';
import { Analytics } from '@vercel/analytics/next';
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";


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
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2224247495448831" crossOrigin="anonymous"></script>
</head>
      <link rel="preconnect" href="https://www.transparenttextures.com" crossOrigin="anonymous" /><link rel="preconnect" href="https://grainy-gradients.vercel.app" crossOrigin="anonymous" /><body suppressHydrationWarning className="flex flex-col min-h-screen bg-gray-50">
        
        <GoogleTagManager gtmId="GTM-WKF28JPK" />
        <MedicalClinicSchema />
        <SiteHeader />
        
        <main className="flex-grow pt-[88px]">
          {children}
        </main>
        
        <SecondFooter />
        <SiteFooter />
        <Analytics />
        </body>
    </html>
  );
}