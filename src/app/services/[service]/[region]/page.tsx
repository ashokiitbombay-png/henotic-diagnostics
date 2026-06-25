import DynamicBreadcrumbs from '@/components/seo/DynamicBreadcrumbs';
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Activity } from "lucide-react";
import GoogleReviews from "@/components/features/reviews/GoogleReviews";
import { REGION_LOCATIONS } from '@/config/locations';
import { optimizeWordPressHTML } from '@/lib/utils';
import { getService } from '@/lib/wordpress/getService';

export const revalidate = 86400; // 24 hours cache revalidation

// Helper to format URL slugs (e.g., "navi-mumbai" -> "Navi Mumbai")
const formatText = (text: string) => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// ==========================================
// 1. DYNAMIC SEO METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = formatText(resolvedParams.service);
  const regionName = formatText(resolvedParams.region);

  return {
    title: `Best ${serviceName} in ${regionName} | Book Online | Henotic Diagnostics`,
    description: `Looking for a reliable ${serviceName} in ${regionName}? Henotic Diagnostics offers highly accurate, NABL-accredited diagnostic services with state-of-the-art technology.`,
    keywords: `${serviceName} in ${regionName}, best ${serviceName} centers ${regionName}, ${serviceName} cost ${regionName}`,
    alternates: {
      canonical: `https://www.henoticdiagnostics.com/services/${resolvedParams.service}/${resolvedParams.region}`
    }
  };
}

// ==========================================
// 2. MAIN REGIONAL HUB COMPONENT
// ==========================================
export default async function ServiceRegionPage({ params }: { params: Promise<{ service: string, region: string }> }) {
  const resolvedParams = await params;
  let wpContent: any = null;
  
  const serviceName = formatText(resolvedParams.service);
  const regionName = formatText(resolvedParams.region);
  
  // Get the list of specific locations for this region to build the SEO grid
  const locations = REGION_LOCATIONS[resolvedParams.region] || [];

  try {
    const serviceData = await getService(resolvedParams.service);
    if (serviceData) { wpContent = serviceData.content; }
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      {/* 🚀 DYNAMIC SEO BREADCRUMBS */}
      <DynamicBreadcrumbs />
      
      {/* 1. HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-900 pt-20 pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-100 text-sm font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
            <MapPin size={16} className="text-[#E55D87]" /> Regional Diagnostic Hub
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg">
            Premier {serviceName} Centers in <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E55D87] to-pink-400">{regionName}</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-10 font-medium max-w-3xl mx-auto">
            Access world-class diagnostic technology across our comprehensive network in {regionName}. Select your nearest neighborhood below for priority booking.
          </p>
        </div>
      </section>

      {/* 2. SEO INTERNAL LINKING GRID (The Secret Sauce) */}
      <section className="py-16 bg-white border-b border-slate-200 relative -mt-10 rounded-t-[3rem] z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Find a Center Near You in {regionName}
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Select your specific location to view tailored availability and book your slot.</p>
          </div>

          {locations.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {locations.map((loc) => (
                <Link 
                  key={loc}
                  href={`/services/${resolvedParams.service}/${resolvedParams.region}/${loc}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all group"
                >
                  <span className="font-bold text-slate-700 group-hover:text-blue-700">{formatText(loc)}</span>
                  <ArrowRight size={16} className="text-slate-500 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-amber-50 rounded-2xl text-amber-800 border border-amber-100 font-medium">
              We are expanding! Specific location pages for this region are currently being updated.
            </div>
          )}
        </div>
      </section>

      {/* 3. MEDICAL CONTENT */}
      <section className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Activity size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              About {serviceName}
            </h2>
          </div>
          
          {wpContent ? (
            <div 
              className="wp-content-wrapper text-slate-700 font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: optimizeWordPressHTML(wpContent) }} 
            />
          ) : (
            <p className="text-slate-500 italic text-center py-10">Detailed medical information for this service is being updated.</p>
          )}
        </div>
      </section>

      {/* 4. TRUST SIGNALS */}
      <GoogleReviews />

      {/* Global CSS for WordPress HTML Formatting */}
      <style dangerouslySetInnerHTML={{__html: `
        .wp-content-wrapper h2 { font-size: 2rem; font-weight: 800; color: #0f172a; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.2; }
        .wp-content-wrapper h3 { font-size: 1.5rem; font-weight: 800; color: #1e293b; margin-top: 2rem; margin-bottom: 0.75rem; }
        .wp-content-wrapper p { margin-bottom: 1.25rem; font-size: 1.125rem; }
        .wp-content-wrapper ul, .wp-content-wrapper ol { padding-left: 0; margin-bottom: 1.5rem; }
        .wp-content-wrapper ul li, .wp-content-wrapper ol li { position: relative; padding-left: 1.5rem; margin-bottom: 0.75rem; font-size: 1.125rem; }
        .wp-content-wrapper ul li::before { content: '✓'; position: absolute; left: 0; color: #E55D87; font-weight: bold; }
        .wp-content-wrapper a { color: #2563eb; font-weight: 800; text-decoration: underline; text-underline-offset: 4px; }
      `}} />
    </main>
  );
}