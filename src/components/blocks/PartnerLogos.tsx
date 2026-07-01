"use client";

import React from "react";
import Image from "next/image";
import { Network, Shield, MapPin } from "lucide-react";

const allPartners = [
  { name: "Apollo Hospitals", logo: "/media-cdn/Partners-Logos/apollo-hospitals.webp" },
  { name: "White Lotus International Hospital", logo: "/media-cdn/Partners-Logos/white-lotus-nternational-hospital.webp" },
  { name: "Nuclear Healthcare", logo: "/media-cdn/Partners-Logos/nuclear-healthcare.webp" },
  { name: "MPCT Hospital", logo: "/media-cdn/Partners-Logos/mpct-hospital.webp" },
  { name: "Medicover Hospital", logo: "/media-cdn/Partners-Logos/medicover-hospital.webp" },
  { name: "Agarwal Diagnostics", logo: "/media-cdn/Partners-Logos/agarwal-diagnostics.webp" },
  { name: "WeCare Diagnostics", logo: "/media-cdn/Partners-Logos/wecare-diagnostics.webp" },
  { name: "Polaris Hospitals", logo: "/media-cdn/Partners-Logos/polaris-hopsital.webp" },
  { name: "Neuberg Diagnostics", logo: "/media-cdn/Partners-Logos/neuberg-diagnostics-logo.webp" },
  { name: "NDC Diagnostics", logo: "/media-cdn/Partners-Logos/ndc-diagnostics.webp" },
  { name: "Medcare", logo: "/media-cdn/Partners-Logos/medcare.webp" },
  { name: "Lotus Panvel", logo: "/media-cdn/Partners-Logos/lotus-panvel-ct-mri-scan.webp" },
  { name: "Heart Mate", logo: "/media-cdn/Partners-Logos/heart-mate-logo.webp" },
  { name: "General Diagnostics", logo: "/media-cdn/Partners-Logos/general-diagnostics.webp" },
];

function LogoCard({ partner }: { partner: typeof allPartners[0] }) {
  return (
    <div className="flex-shrink-0 w-[160px] h-[100px] sm:w-[180px] sm:h-[110px] md:w-[200px] md:h-[120px] flex items-center justify-center p-4 sm:p-5 rounded-2xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:border-indigo-200 hover:shadow-[0_12px_35px_-8px_rgba(99,102,241,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group mx-3 sm:mx-4">
      <Image
        src={partner.logo}
        alt={partner.name}
        title={partner.name}
        width={180}
        height={120}
        className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:drop-shadow-lg"
      />
    </div>
  );
}

export default function PartnerLogos() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ═══ SINGLE UNIFIED CONTAINER ═══ */}
        <div
          className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_-15px_rgba(99,102,241,0.3),0_10px_40px_-10px_rgba(219,39,119,0.15)] relative"
          style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 40%, #a855f7 70%, #db2777 100%)" }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 filter blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-white/5 filter blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

          <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16">

            {/* ── TEXT CONTENT AREA ── */}
            <div className="text-center mb-12 md:mb-14">
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white/90 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg mb-6">
                <Network size={16} className="text-white" /> Licensed Partner Networks
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white text-center max-w-5xl mx-auto mb-6 tracking-tight leading-[1.1] drop-shadow-lg">
                Trusted Licensed Partner Networks
              </h2>

              <p className="text-white/85 font-medium text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed mb-8">
                Beyond our in-house facility in Kharghar, Henotic Diagnostics provides a seamless online
                platform to book advanced medical imaging and specialized tests. Through our curated network
                of licensed and accredited partner centers across Mumbai and Navi Mumbai, you gain convenient
                access to world-class MRI, CT, PET scans, cardiac evaluations, and prenatal diagnostics.
                We ensure every partner facility meets the highest standards of accuracy, safety, and patient care.
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
                {[
                  { icon: Shield, text: "Accredited Partners" },
                  { icon: MapPin, text: "Mumbai & Navi Mumbai" },
                  { icon: Network, text: "14+ Partner Centers" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                    <item.icon size={16} className="text-white/80" />
                    <span className="text-white/90 text-xs sm:text-sm font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CONTINUOUS MARQUEE CAROUSEL — WHITE BACKGROUND ── */}
            <div className="bg-white rounded-[2rem] py-8 sm:py-10 md:py-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)] overflow-hidden relative">

              {/* Fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

              {/* Row 1 — scrolls left */}
              <div className="flex animate-marquee-left hover:[animation-play-state:paused]">
                {[...allPartners, ...allPartners, ...allPartners].map((partner, i) => (
                  <LogoCard key={`r1-${i}`} partner={partner} />
                ))}
              </div>

              {/* Row 2 — scrolls right (reverse) */}
              <div className="flex animate-marquee-right mt-5 sm:mt-6 hover:[animation-play-state:paused]">
                {[...allPartners.slice().reverse(), ...allPartners.slice().reverse(), ...allPartners.slice().reverse()].map((partner, i) => (
                  <LogoCard key={`r2-${i}`} partner={partner} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Marquee Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 18s linear infinite;
          will-change: transform;
        }
        .animate-marquee-right {
          animation: marqueeRight 20s linear infinite;
          will-change: transform;
        }
        @media (max-width: 768px) {
          .animate-marquee-left {
            animation: marqueeLeft 8s linear infinite;
          }
          .animate-marquee-right {
            animation: marqueeRight 9s linear infinite;
          }
        }
      `}} />
    </section>
  );
}
