import React from 'react';
import BookingForm from '@/components/forms/BookingForm';
import { ShieldCheck, Star, CheckCircle2 } from 'lucide-react';

export default async function GoogleAdsLandingPage({ params, searchParams }: { params: Promise<{ service: string }>, searchParams: Promise<{ keyword?: string }> }) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  
  const serviceSlug = resolvedParams.service.replace(/-/g, ' ');
  // DYNAMIC KEYWORD INSERTION (DKI): Reads ?keyword= from Google Ads URL
  const headline = resolvedSearch.keyword ? decodeURIComponent(resolvedSearch.keyword) : `Premium ${serviceSlug} Services`;

  return (
    <main className="min-h-screen bg-slate-50 relative z-50">
      {/* 🚀 No-Leak Header: Replaces site navigation with a trust-only banner */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 flex justify-between items-center shadow-sm relative z-50">
        <div className="flex items-center gap-2">
           <img src="https://storage.googleapis.com/wp-media-henoticbucket/Site-Icon-SVG%20files/henotic-diagnostics-logo-site-icon.webp" alt="Logo" className="w-10 h-10" />
           <span className="font-black text-xl text-slate-800 tracking-tight">Henotic<span className="text-[#3494E6]">Diagnostics</span></span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
           <span className="flex items-center gap-1 text-sm font-bold text-slate-600"><ShieldCheck size={16} className="text-[#25D366]"/> NABL Accredited</span>
           <span className="flex items-center gap-1 text-sm font-bold text-slate-600"><Star size={16} className="text-amber-500 fill-amber-500"/> 4.9/5 Rated</span>
        </div>
      </header>

      {/* Hero & Form Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-6">
             Priority Booking
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6 capitalize">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium mb-8">
            Book your {serviceSlug} today. Secure your priority slot online to skip the wait. Same-day reports available.
          </p>
          <ul className="space-y-4 mb-10">
            {['NABL & AERB Certified Laboratory', 'Most Advanced 3T MRI & 128-Slice CT', 'Instant WhatsApp Reports', 'Zero Wait Time Promise'].map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                <CheckCircle2 className="text-[#3494E6]" /> {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Reusing your beautiful edge-to-edge booking form */}
        <div className="w-full">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}