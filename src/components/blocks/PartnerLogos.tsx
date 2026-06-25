import React from 'react';
import { ShieldCheck, Award, Network } from 'lucide-react';

const constantPartners = [
  { name: "Apollo Hospitals", logo: "/media-cdn/Partners-Logos/apollo-hospitals.webp" },
  { name: "White Lotus International Hospital", logo: "/media-cdn/Partners-Logos/white-lotus-nternational-hospital.webp" },
  { name: "Nuclear Healthcare", logo: "/media-cdn/Partners-Logos/nuclear-healthcare.webp" },
  { name: "MPCT Hospital", logo: "/media-cdn/Partners-Logos/mpct-hospital.webp" },
  { name: "Medicover Hospital", logo: "/media-cdn/Partners-Logos/medicover-hospital.webp" },
  { name: "Agarwal Diagnostics", logo: "/media-cdn/Partners-Logos/agarwal-diagnostics.webp" },
  { name: "WeCare Diagnostics", logo: "/media-cdn/Partners-Logos/wecare-diagnostics.webp" }
];

const slidingPartners = [
  { name: "Polaris Hospitals", logo: "/media-cdn/Partners-Logos/polaris-hopsital.webp" },
  { name: "Neuberg Diagnostics", logo: "/media-cdn/Partners-Logos/neuberg-diagnostics-logo.webp" },
  { name: "NDC Diagnostics", logo: "/media-cdn/Partners-Logos/ndc-diagnostics.webp" },
  { name: "Medcare", logo: "/media-cdn/Partners-Logos/medcare.webp" },
  { name: "Lotus Panvel", logo: "/media-cdn/Partners-Logos/lotus-panvel-ct-mri-scan.webp" },
  { name: "Heart Mate", logo: "/media-cdn/Partners-Logos/heart-mate-logo.webp" },
  { name: "General Diagnostics", logo: "/media-cdn/Partners-Logos/general-diagnostics.webp" }
];

export default function PartnerLogos() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden relative">
      {/* Dynamic Background Gradients for 3D depth */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <Network size={16} className="text-[#E55D87]" /> Licensed Partner Networks
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Our Elite Hospital & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E55D87] to-pink-400">Diagnostic Associations</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Henotic Diagnostics is proud to partner with leading national hospitals and diagnostic institutions, providing high-accuracy testing and priority clinical solutions.
          </p>
        </div>

        {/* ==================================================== */}
        {/* FIRST SET OF LOGOS: Constant Grid Layout             */}
        {/* ==================================================== */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <Award className="text-[#E55D87]" size={24} />
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
              Hospital Referral Partners
            </h3>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider ml-auto bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Constant Grid
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
            {constantPartners.map((partner, i) => (
              <div 
                key={i}
                className="group relative rounded-2xl p-6 flex items-center justify-center bg-slate-800/40 border border-slate-800 hover:border-slate-700/60 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(37,99,235,0.15)] transition-all duration-500 ease-out cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                {/* 3D Depth Card Shadow Lifting */}
                <div 
                  className="w-full aspect-[4/3] flex items-center justify-center transition-transform duration-500 group-hover:translate-z-6"
                  style={{ transform: 'translateZ(0px)' }}
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    title={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                {/* Micro Ambient Glow behind Card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-[#E55D87]/0 group-hover:from-blue-600/5 group-hover:to-[#E55D87]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>

        {/* ==================================================== */}
        {/* SECOND SET OF LOGOS: Infinite Moving Carousel        */}
        {/* ==================================================== */}
        <div>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
            <ShieldCheck className="text-emerald-400" size={24} />
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
              Affiliated Medical Labs & Clinics
            </h3>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider ml-auto bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              Infinite Slider
            </span>
          </div>

          {/* Carousel Slider Container */}
          <div className="relative w-full overflow-hidden py-4 rounded-3xl bg-slate-800/20 border border-slate-800/80 backdrop-blur-md shadow-[inset_0_4px_30px_rgba(0,0,0,0.2)]">
            {/* Left/Right Fading Overlays for premium glow effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee flex items-center gap-8 py-2">
              {/* Render original list */}
              {slidingPartners.map((partner, i) => (
                <div 
                  key={`orig-${i}`}
                  className="flex-shrink-0 w-44 h-24 p-6 rounded-2xl bg-slate-800/35 border border-slate-800/60 flex items-center justify-center hover:border-slate-700/80 shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_45px_rgba(37,211,102,0.1)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    title={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate list once for seamless infinite loop */}
              {slidingPartners.map((partner, i) => (
                <div 
                  key={`dup-${i}`}
                  className="flex-shrink-0 w-44 h-24 p-6 rounded-2xl bg-slate-800/35 border border-slate-800/60 flex items-center justify-center hover:border-slate-700/80 shadow-[0_15px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_45px_rgba(37,211,102,0.1)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    title={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Self-contained CSS Marquee Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
}
