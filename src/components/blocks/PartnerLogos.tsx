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

const allPartners = [...constantPartners, ...slidingPartners];

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
              {/* Badge */}
              <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-white/90 border border-white/20 bg-white/10 backdrop-blur-md shadow-lg mb-6">
                <Network size={16} className="text-white" /> Licensed Partner Networks
              </span>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white text-center max-w-5xl mx-auto mb-6 tracking-tight leading-[1.1] drop-shadow-lg">
                Trusted Licensed Partner Networks
              </h2>

              {/* Description */}
              <p className="text-white/85 font-medium text-base sm:text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed mb-8">
                Beyond our in-house facility in Kharghar, Henotic Diagnostics provides a seamless online
                platform to book advanced medical imaging and specialized tests. Through our curated network
                of licensed and accredited partner centers across Mumbai and Navi Mumbai, you gain convenient
                access to world-class MRI, CT, PET scans, cardiac evaluations, and prenatal diagnostics.
                We ensure every partner facility meets the highest standards of accuracy, safety, and patient care.
              </p>

              {/* Trust Highlights */}
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

            {/* ── PARTNER LOGOS GRID — WHITE BACKGROUND ── */}
            <div className="bg-white rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.8)]">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 sm:gap-5 md:gap-6 items-center justify-items-center">
                {allPartners.map((partner, i) => (
                  <div
                    key={i}
                    className="w-full max-w-[140px] aspect-[3/2] flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-[0_10px_30px_-8px_rgba(99,102,241,0.2)] hover:scale-105 transition-all duration-300 cursor-pointer group"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      title={partner.name}
                      width={140}
                      height={90}
                      className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:drop-shadow-md"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
