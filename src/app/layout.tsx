import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";


import SecondFooter from "@/components/layout/SecondFooter";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Added data-scroll-behavior="smooth" to satisfy Next.js routing requirements
    <html suppressHydrationWarning lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning className="flex flex-col min-h-screen bg-gray-50">
        <SiteHeader />
        
        <main className="flex-grow pt-[88px]">
          {children}
        </main>
        
        <SecondFooter />
        <SiteFooter />
      </body>
    </html>
  );
}