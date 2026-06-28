import React from 'react';
import Image from 'next/image';
import { Network, Shield, MapPin } from 'lucide-react';

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
    <section className="relative overflow-hidden">

      {/* ═══ PREMIUM HEADER WITH GRADIENT BACKGROUND ═══ */}
      <div
        className="relative py-20 md:py-24 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #312e81 60%, #1e1b4b 100%)" }}
      >
        {/* Decorative Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/15 filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 filter blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-purple-500/8 filter blur-[150px] pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white/90 border border-white/15 bg-white/10 backdrop-blur-md shadow-lg">
              <Network size={16} className="text-blue-400" /> Licensed Partner Networks
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white text-center max-w-5xl mx-auto mb-8 tracking-tight leading-[1.1]">
            Trusted Licensed{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Partner Networks
            </span>
          </h2>

          {/* Description */}
          <p className="text-blue-100/80 font-medium text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed mb-10">
            Beyond our in-house facility in Kharghar, Henotic Diagnostics provides a seamless online
            platform to book advanced medical imaging and specialized tests. Through our curated network
            of licensed and accredited partner centers across Mumbai and Navi Mumbai, you gain convenient
            access to world-class MRI, CT, PET scans, cardiac evaluations, and prenatal diagnostics.
            We ensure every partner facility meets the highest standards of accuracy, safety, and patient care.
          </p>

          {/* Trust Highlights */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { icon: Shield, text: "Accredited Partners" },
              { icon: MapPin, text: "Mumbai & Navi Mumbai" },
              { icon: Network, text: "14+ Partner Centers" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <item.icon size={16} className="text-indigo-400" />
                <span className="text-white/80 text-xs sm:text-sm font-bold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ LOGO GRID ON CLEAN WHITE BACKGROUND ═══ */}
      <div className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">

          {/* Row 1: Hospital Admissions & Advanced Imaging */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 items-center justify-items-center">
            {constantPartners.map((partner, i) => (
              <div
                key={`row1-${i}`}
                className="w-full max-w-[150px] aspect-[3/2] flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-[0_10px_30px_-8px_rgba(99,102,241,0.15)] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  width={150}
                  height={100}
                  className="max-w-full max-h-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Row 2: Pathology, Cardiac & Genomics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 items-center justify-items-center">
            {slidingPartners.map((partner, i) => (
              <div
                key={`row2-${i}`}
                className="w-full max-w-[150px] aspect-[3/2] flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-[0_10px_30px_-8px_rgba(99,102,241,0.15)] hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  width={150}
                  height={100}
                  className="max-w-full max-h-full object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
