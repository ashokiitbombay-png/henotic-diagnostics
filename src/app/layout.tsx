import { GoogleTagManager } from '@next/third-parties/google';
import MedicalClinicSchema from '@/components/seo/MedicalClinicSchema';
import { Analytics } from '@vercel/analytics/next';
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";


import SecondFooter from "@/components/layout/SecondFooter";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Added data-scroll-behavior="smooth" to satisfy Next.js routing requirements
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth">
        <head>
          <link rel="preconnect" href="https://storage.googleapis.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://storage.googleapis.com" />
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