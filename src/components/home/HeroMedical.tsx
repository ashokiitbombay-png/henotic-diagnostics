"use client";
import React from "react";
import { Calendar, Shield, Activity, Award } from "lucide-react";

const ACCREDITATIONS = [
  { 
    title: "PCPNDT", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/pcpndt-certified-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "NABL", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "ISO", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp" 
  },
  { 
    title: "AERB", 
    img: "https://storage.googleapis.com/wp-media-henoticbucket/Accreditation%20Logos/Atomic_Energy_Regulatory_Board_Henotic-Diagnostics-LOGO.svg%20(1).webp" 
  }
];

export default function HeroMedical() {
  const scrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden bg-slate-50">
      
      {/* 2026 Aesthetic Background Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 bg-gradient-to-br from-[#b06ab3] to-pink-300 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[120px] opacity-40 bg-gradient-to-tr from-[#4568dc] to-blue-300"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Premium Copy & CTAs */}
          <div className="max-w-2xl relative z-20">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-800 text-sm font-extrabold uppercase tracking-widest mb-8">
              <Shield size={16} className="text-[#E55D87]" /> Premium Diagnostic Center
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
              Precision You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Trust.</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 font-medium mb-10 leading-relaxed max-w-xl">
              Experience world-class diagnostics with our state-of-the-art 3T MRI & 128-Slice CT scanners. Get accurate, same-day reports without the waiting room hassle.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a 
                href="#booking" 
                onClick={scrollToBooking}
                className="flex items-center justify-center gap-2 text-white font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_15px_30px_-5px_rgba(176,106,179,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(176,106,179,0.6)] hover:-translate-y-1 text-lg"
                style={{ background: "linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)" }}
              >
                <Calendar size={20} /> Book Scan Now
              </a>
              <a 
                href="tel:08879327184" 
                className="flex items-center justify-center gap-2 bg-white text-slate-800 border-2 border-slate-200 hover:border-[#4568dc] hover:text-[#4568dc] font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 text-lg shadow-sm hover:shadow-md"
              >
                Call 08879327184
              </a>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
              <div className="flex flex-col gap-2">
                <Activity size={24} className="text-[#E55D87]" />
                <span className="font-bold text-slate-800">Advanced<br/>Imaging</span>
              </div>
              <div className="flex flex-col gap-2">
                <Award size={24} className="text-[#4568dc]" />
                <span className="font-bold text-slate-800">Expert<br/>Radiologists</span>
              </div>
              <div className="flex flex-col gap-2">
                <Shield size={24} className="text-[#6d2870]" />
                <span className="font-bold text-slate-800">100% Accurate<br/>Reports</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D Image & Deep Shadow Accreditations */}
          <div className="relative w-full z-10 lg:ml-8 mt-12 lg:mt-0 flex justify-center lg:block">
            
            {/* Main Foreground Image Container */}
            <div className="relative w-full max-w-md lg:max-w-none mx-auto">
              
              {/* 🌟 ACCREDITATION LOGOS (Top Left, Floating) 🌟 */}
              <div className="absolute -top-10 -left-6 sm:-top-16 sm:-left-12 z-30 flex gap-2 sm:gap-5">
                {ACCREDITATIONS.map((acc, index) => (
                  <div key={acc.title} className="flex flex-col items-center group animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 150}ms` }}>
                    {/* 3D Circular Logo Container */}
                    <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center p-2.5 sm:p-3 mb-2 transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110 relative
                      /* Deep 3D Shadow Effects */
                      shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3),_0_0_0_2px_rgba(255,255,255,0.8),_inset_0_-4px_6px_rgba(0,0,0,0.1),_inset_0_4px_6px_rgba(255,255,255,1)]
                    ">
                      <img width="800" height="800" decoding="async" src={acc.img} alt={`${acc.title} Certified`} className="w-full h-full object-contain drop-shadow-sm" fetchPriority="high" />
                      
                      {/* Subtle highlight for glass/3D pop */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/40 to-white/80 pointer-events-none"></div>
                    </div>
                    {/* Text Below */}
                    <span className="text-[9px] sm:text-xs font-black text-slate-800 tracking-wider uppercase drop-shadow-md bg-white/90 px-2 py-0.5 rounded-md backdrop-blur-sm border border-slate-100">
                      {acc.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Backglow for the image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#4568dc] to-[#b06ab3] rounded-[3rem] transform rotate-3 scale-105 opacity-30 blur-2xl transition-transform duration-700 hover:rotate-6"></div>
              
              {/* The Actual Image (Fully Visible, High Priority) */}
              <div className="relative bg-white p-2 sm:p-3 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transform -rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden border border-white/60">
                <img width="800" height="800" decoding="async" 
                  src="https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp" 
                  alt="Premium 3T MRI Scan at Henotic Diagnostics" 
                  className="rounded-[2.5rem] w-full h-auto object-cover aspect-[4/3] lg:aspect-square"
                fetchPriority="high" />
              </div>

              {/* Floating Performance Badge (Bottom Right) */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] border border-slate-100/50 flex items-center gap-3 sm:gap-4 animate-bounce hover:animate-none z-20">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 sm:p-3 rounded-full text-green-700 shadow-inner shrink-0">
                  <Activity size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-slate-500 uppercase tracking-widest leading-tight">Turnaround Time</div>
                  <div className="text-base sm:text-xl font-black text-slate-900 drop-shadow-sm leading-tight">Same Day Reports</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}