import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ShieldCheck, Star, CheckCircle2, Phone, CalendarCheck, Sparkles, HeartPulse, Trophy } from "lucide-react";

// 🛡️ Booking Engine Isolation — fully decoupled from landing page PSEO content
const BookingForm = dynamic(() => import("@/components/forms/BookingForm"), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-white/10 rounded-2xl h-[400px] flex items-center justify-center border border-white/10">
      <p className="text-white/40 font-bold">Loading booking form...</p>
    </div>
  ),
});

interface LandingPageTemplateProps {
  service: string;
  keyword?: string;
  formattedService: string;
}

export default function LandingPageTemplate({
  service,
  keyword,
  formattedService
}: LandingPageTemplateProps) {
  // DYNAMIC KEYWORD INSERTION (DKI)
  const headline = keyword ? decodeURIComponent(keyword) : `Premium ${formattedService} Services`;

  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-900 via-slate-950 to-blue-950 text-white font-sans overflow-hidden -mt-[88px] relative z-50">
      
      {/* Dynamic light circles for premium glassmorphism background */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-blue-600"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[130px] opacity-25 bg-pink-500/70"></div>

      {/* 🚀 No-Leak Header: Replaces site navigation with a trust-only banner */}
      <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4 px-6 md:px-12 flex justify-between items-center shadow-lg relative z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1.5 shadow-md">
            <Image 
              src="https://storage.googleapis.com/wp-media-henoticbucket/Site-Icon-SVG%20files/henotic-diagnostics-logo-site-icon.webp" 
              alt="Henotic Diagnostics Logo" 
              width={36}
              height={36}
              className="w-9 h-9 object-contain" 
              priority
            />
          </div>
          <div className="flex flex-col justify-center leading-none">
            <span className="text-white font-black text-lg md:text-xl tracking-tight">HENOTIC</span>
            <span className="text-blue-400 font-bold text-[9px] md:text-[11px] tracking-[0.2em] uppercase">DIAGNOSTICS</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="hidden sm:flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-slate-300">
            <ShieldCheck size={18} className="text-emerald-400" /> NABL Accredited
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-xs md:text-sm font-extrabold text-slate-300">
            <Trophy size={18} className="text-amber-400" /> NABL Certified
          </span>
          <span className="flex items-center gap-1 text-xs md:text-sm font-extrabold text-slate-300">
            <Star size={18} className="text-yellow-400 fill-yellow-400" /> 4.9/5 Rated
          </span>
        </div>
      </header>

      {/* Hero & Form Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-md">
              <Sparkles size={14} className="text-pink-400" /> Priority Booking Active
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white capitalize drop-shadow-2xl">
              {headline}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 font-semibold leading-relaxed max-w-2xl drop-shadow">
              Secure your appointment at Henotic Diagnostics for a seamless, fast, and completely stress-free experience. 
              Get accurate reports generated using world-class diagnostic systems.
            </p>
            
            {/* Value Props Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {[
                { title: "NABL & AERB Accredited Labs", desc: "Highest tier testing accuracy standards." },
                { title: "Advanced Imaging & Pathology", desc: "Top-tier 3T MRI & 128-Slice CT scanners." },
                { title: "Same-Day Reporting", desc: "Reports delivered straight to your WhatsApp." },
                { title: "Zero Wait-Time Guarantee", desc: "Prioritized slots. Walk in, get tested, walk out." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <div className="bg-gradient-to-br from-blue-500 to-pink-500 p-2.5 rounded-xl text-white shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">{item.title}</h4>
                    <p className="text-slate-400 text-xs font-bold mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-400 border border-emerald-500/20">
                  <HeartPulse size={24} />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">Need assistance with booking?</h4>
                  <p className="text-slate-400 text-xs font-bold">Talk to our customer care executives directly.</p>
                </div>
              </div>
              <a 
                href="tel:08879327184" 
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black px-6 py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 text-base w-full sm:w-auto"
              >
                <Phone size={18} /> 08879327184
              </a>
            </div>
          </div>
          
          {/* Right Form Column (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/25 to-pink-500/25 rounded-[3rem] blur-2xl -z-10"></div>
            <div className="bg-slate-900 border-4 border-slate-800 rounded-[3rem] p-1.5 shadow-2xl relative overflow-hidden">
              <BookingForm />
            </div>
          </div>

        </div>
      </div>

      {/* Trust badges footer strip */}
      <footer className="bg-slate-950/80 border-t border-slate-900 py-10 px-6 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-slate-500 text-sm font-bold">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Henotic Diagnostics. All rights reserved. All tests conducted by licensed professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-bold">
            <span>NABL Certified</span>
            <span>•</span>
            <span>AERB Approved</span>
            <span>•</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
