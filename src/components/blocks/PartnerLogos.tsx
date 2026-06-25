import React from 'react';
import { 
  ShieldCheck, Award, Network, Building2, 
  Activity, Microscope, Stethoscope, HeartPulse 
} from 'lucide-react';

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
    <section 
      className="py-24 overflow-hidden relative border-b border-white/20"
      style={{ backgroundImage: 'linear-gradient(to top, #df89b5 0%, #bfd9fe 100%)' }}
    >
      {/* Premium Ambient Light Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-white/30 rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/20 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-white text-slate-800 text-xs md:text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-sm">
            <Network size={16} className="text-[#c85694]" /> Licensed Partner Networks
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight tracking-tight">
            Our Elite Hospital & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c85694] to-[#4f6bf5]">Diagnostic Associations</span>
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium mb-8">
            Henotic Diagnostics is proud to partner with leading national hospitals and diagnostic institutions, providing high-accuracy testing and priority clinical solutions.
          </p>

          {/* Trust Symbols & Accreditation Badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm font-bold text-slate-800 bg-white/40 border border-white/60 p-4 rounded-2xl backdrop-blur-md shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-600 shrink-0" size={18} />
              <span>NABL & ISO Compliant Partners</span>
            </div>
            <div className="h-4 w-px bg-white/60 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <Building2 className="text-[#c85694] shrink-0" size={18} />
              <span>Priority Admission Desk</span>
            </div>
            <div className="h-4 w-px bg-white/60 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <HeartPulse className="text-blue-600 shrink-0" size={18} />
              <span>Advanced Clinical Care Sync</span>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* FIRST SET OF LOGOS: Hospital & Scanning (Slider 1)    */}
        {/* ==================================================== */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-300/40">
            <Stethoscope className="text-[#c85694]" size={24} />
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-wide">
              Hospital Admissions & Advanced Imaging
            </h3>
            <span className="text-xs text-slate-600 font-bold uppercase tracking-wider ml-auto bg-white/60 px-3 py-1 rounded-full border border-white shadow-sm">
              CT • MRI • PET • NM • Admissions
            </span>
          </div>

          {/* Carousel Slider Container */}
          <div className="relative w-full overflow-hidden py-6 rounded-3xl bg-white/30 border border-white/60 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.02),inset_0_2px_10px_rgba(255,255,255,0.6)] marquee-masked">
            <div className="animate-marquee flex items-center gap-8 py-2">
              {/* Render original list */}
              {constantPartners.map((partner, i) => (
                <div 
                  key={`orig-1-${i}`}
                  className="flex-shrink-0 w-52 h-28 p-6 rounded-2xl bg-white/65 border border-white/80 flex items-center justify-center hover:bg-white/90 hover:border-white shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(191,217,254,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    title={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale-[15%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate list once for seamless infinite loop */}
              {constantPartners.map((partner, i) => (
                <div 
                  key={`dup-1-${i}`}
                  className="flex-shrink-0 w-52 h-28 p-6 rounded-2xl bg-white/65 border border-white/80 flex items-center justify-center hover:bg-white/90 hover:border-white shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(191,217,254,0.3)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    title={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale-[15%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* SECOND SET OF LOGOS: Cardiac, NGS & Pathology (Slider 2) */}
        {/* ==================================================== */}
        <div>
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-300/40">
            <Microscope className="text-emerald-600" size={24} />
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-wide">
              Cardiac Care, Genomics & Pathology
            </h3>
            <span className="text-xs text-slate-600 font-bold uppercase tracking-wider ml-auto bg-white/60 px-3 py-1 rounded-full border border-white shadow-sm">
              Cardiac • NGS • Pathology
            </span>
          </div>

          {/* Carousel Slider Container (Runs in reverse direction) */}
          <div className="relative w-full overflow-hidden py-6 rounded-3xl bg-white/30 border border-white/60 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.02),inset_0_2px_10px_rgba(255,255,255,0.6)] marquee-masked">
            <div className="animate-marquee-reverse flex items-center gap-8 py-2">
              {/* Render original list */}
              {slidingPartners.map((partner, i) => (
                <div 
                  key={`orig-2-${i}`}
                  className="flex-shrink-0 w-52 h-28 p-6 rounded-2xl bg-white/65 border border-white/80 flex items-center justify-center hover:bg-white/90 hover:border-white shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(223,137,181,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    title={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale-[15%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate list once for seamless infinite loop */}
              {slidingPartners.map((partner, i) => (
                <div 
                  key={`dup-2-${i}`}
                  className="flex-shrink-0 w-52 h-28 p-6 rounded-2xl bg-white/65 border border-white/80 flex items-center justify-center hover:bg-white/90 hover:border-white shadow-[0_8px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(223,137,181,0.25)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer group"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    title={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale-[15%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Self-contained CSS Marquee Animations & Edge Fading Mask */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee-reverse 35s linear infinite;
        }
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
        .marquee-masked {
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
      `}} />
    </section>
  );
}
