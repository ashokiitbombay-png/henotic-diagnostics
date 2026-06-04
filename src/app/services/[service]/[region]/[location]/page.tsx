import React from "react";
import { Metadata } from "next";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { MapPin, Calendar, Clock, ShieldCheck, Phone, ArrowRight } from "lucide-react";
import GoogleReviews from "@/components/features/reviews/GoogleReviews";

export const revalidate = 0;

const GET_SERVICE_CONTENT = gql`
  query GetServiceContent($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

// Helper to format URL slugs (e.g., "navi-mumbai" -> "Navi Mumbai")
const formatText = (text: string) => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

// ==========================================
// 1. DYNAMIC SEO METADATA GENERATOR
// ==========================================
export async function generateMetadata({ params }: { params: Promise<{ service: string, region: string, location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceName = formatText(resolvedParams.service);
  const locationName = formatText(resolvedParams.location);
  const regionName = formatText(resolvedParams.region);

  // This is what Google sees when crawling this specific page
  return {
    title: `Best ${serviceName} in ${locationName}, ${regionName} | Henotic Diagnostics`,
    description: `Looking for a ${serviceName} in ${locationName}? Henotic Diagnostics offers highly accurate, NABL-accredited imaging and pathology with same-day reports. Book now!`,
    keywords: `${serviceName} in ${locationName}, best ${serviceName} near me, ${serviceName} cost in ${locationName}, diagnostic center in ${locationName} ${regionName}`,
    alternates: {
      canonical: `https://henoticdiagnostics.com/services/${resolvedParams.service}/${resolvedParams.region}/${resolvedParams.location}`
    },
    openGraph: {
      title: `${serviceName} in ${locationName} | Henotic Diagnostics`,
      description: `Fast, accurate ${serviceName} available at our advanced facility near ${locationName}.`,
      type: "website",
    }
  };
}

// ==========================================
// 2. MAIN LANDING PAGE COMPONENT
// ==========================================
export default async function ServiceLocationPage({ params }: { params: Promise<{ service: string, region: string, location: string }> }) {
  const resolvedParams = await params;
  const client = getClient();
  let wpContent: any = null;
  
  const serviceName = formatText(resolvedParams.service);
  const locationName = formatText(resolvedParams.location);
  const regionName = formatText(resolvedParams.region);

  try {
    const { data } = await client.query<any>({
      query: GET_SERVICE_CONTENT,
      variables: { slug: resolvedParams.service },
      fetchPolicy: "no-cache", 
    });
    if (data?.service) { wpContent = data.service.content; }
  } catch (error) {
    console.error("Failed to fetch WordPress content:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans mt-[80px]">
      
      {/* 1. HERO SECTION (Google Ads Optimization) */}
      <section className="bg-gradient-to-r from-blue-950 to-blue-900 pt-20 pb-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <MapPin size={14} className="text-[#E55D87]" /> Available near {locationName}
            </div>
            
            {/* The Dynamic H1 Tag - Critical for SEO */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Top-Rated {serviceName} in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E55D87] to-pink-400">{locationName}</span>
            </h1>
            
            <p className="text-lg text-blue-100 mb-8 font-medium max-w-xl">
              Get highly accurate <strong>{serviceName}</strong> reports from Navi Mumbai's most trusted, NABL-accredited diagnostic network. No long waiting times.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact#booking" className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-extrabold py-4 px-8 rounded-2xl transition-all shadow-lg text-lg">
                <Calendar size={20} /> Book in {locationName}
              </Link>
            </div>
            
            <div className="mt-8 flex items-center gap-6 text-sm font-bold text-blue-200">
              <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#E55D87]" /> NABL Certified</div>
              <div className="flex items-center gap-2"><Clock size={18} className="text-[#E55D87]" /> Same-Day Reports</div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img src="https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/henotic-diagnostics-waiting-area.webp" alt={`${serviceName} in ${locationName}`} className="rounded-[2rem] shadow-2xl border-4 border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* 2. CONTENT & BOOKING SPLIT */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left: Dynamic Medical Content (From WordPress) */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 pb-6 border-b border-slate-100">
              About {serviceName}
            </h2>
            
            {wpContent ? (
              <div 
                className="wp-content-wrapper text-slate-700 font-medium leading-relaxed"
                dangerouslySetInnerHTML={{ __html: wpContent }} 
              />
            ) : (
              <p className="text-slate-500 italic">Detailed medical information for this service is being updated.</p>
            )}
          </div>

          {/* Right: Sticky Local Booking Widget */}
          <div className="lg:col-span-1 sticky top-[100px]">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border-t-8 border-[#E55D87]">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Book Your Slot</h3>
              <p className="text-slate-500 font-medium text-sm mb-6">Priority booking for patients from {locationName}, {regionName}.</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500 shrink-0" size={20} /> Zero Waiting Time</li>
                <li className="flex items-start gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500 shrink-0" size={20} /> Digital Reports via WhatsApp</li>
                <li className="flex items-start gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500 shrink-0" size={20} /> Free Expert Counseling</li>
              </ul>
              
              <Link href={`/contact?service=${resolvedParams.service}&location=${resolvedParams.location}#booking`} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 px-6 rounded-xl transition-all shadow-md">
                Secure Appointment <ArrowRight size={18} />
              </Link>
              
              <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm font-bold text-slate-500 mb-2">Or call for instant booking:</p>
                <a href="tel:08879327184" className="flex items-center justify-center gap-2 text-xl font-black text-slate-900 hover:text-blue-600 transition-colors">
                  <Phone size={20} className="text-[#E55D87]" /> 08879327184
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TRUST SIGNALS */}
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

// Needed for Lucide Icons in WP content
function CheckCircle(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}