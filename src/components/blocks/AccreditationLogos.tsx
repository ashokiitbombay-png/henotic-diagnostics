"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Shield } from "lucide-react";
import CertificateViewer from "@/components/ui/CertificateViewer";
import { CERTIFICATE_MAP } from "@/config/certificates";

interface AccreditationBadge {
  title: string;
  img: string;
}

interface AccreditationLogosProps {
  badges: AccreditationBadge[];
  /** Visual mode — 'hero' for dark bg, 'light' for light bg */
  variant?: "hero" | "light";
}

/**
 * 🏅 Interactive Accreditation Logo Badges
 * Clicking any logo opens its full certificate in the CertificateViewer lightbox.
 * Reusable across ServiceHero, HeroBlock, Footer, etc.
 */
export default function AccreditationLogos({ badges, variant = "hero" }: AccreditationLogosProps) {
  const [activeCert, setActiveCert] = useState<{ url: string; title: string } | null>(null);

  const handleLogoClick = (badge: AccreditationBadge) => {
    const certUrl = CERTIFICATE_MAP[badge.title.toUpperCase()] || CERTIFICATE_MAP[badge.title];
    if (certUrl) {
      setActiveCert({ url: certUrl, title: `${badge.title} Certificate — Henotic Diagnostics` });
    }
  };

  const isHero = variant === "hero";

  return (
    <>
      <div className={isHero ? "" : "flex flex-col items-start"}>
        {/* Label */}
        <div className="flex items-center gap-3 mb-2">
          <Shield size={16} className={isHero ? "text-blue-300" : "text-blue-500"} />
          <span className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] ${
            isHero ? "text-blue-200" : "text-blue-600"
          }`}>
            Accredited by National Bodies
          </span>
        </div>

        {/* Logo Grid */}
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          {badges.map((badge) => {
            const hasCert = !!CERTIFICATE_MAP[badge.title.toUpperCase()] || !!CERTIFICATE_MAP[badge.title];
            return (
              <button
                key={badge.title}
                type="button"
                onClick={() => handleLogoClick(badge)}
                className={`flex flex-col items-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl transition-all ${
                  hasCert ? "" : "cursor-default"
                }`}
                aria-label={`View ${badge.title} certificate`}
                title={hasCert ? `Click to view ${badge.title} Certificate` : badge.title}
              >
                <div className={`w-14 h-14 sm:w-[72px] sm:h-[72px] ${
                  isHero ? "bg-white" : "bg-white border border-slate-200"
                } rounded-full flex items-center justify-center p-1 sm:p-1.5 mb-1.5 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-110 group-active:scale-95 relative ${
                  isHero 
                    ? "shadow-[0_20px_40px_-8px_rgba(0,0,0,0.6),_0_0_0_3px_rgba(255,255,255,0.9),_inset_0_-4px_8px_rgba(0,0,0,0.12),_inset_0_4px_6px_rgba(255,255,255,1),_0_8px_16px_rgba(0,0,0,0.3)]"
                    : "shadow-[0_8px_24px_rgba(0,0,0,0.08),_0_0_0_2px_rgba(59,130,246,0.1)]"
                } ${hasCert ? "group-hover:shadow-[0_20px_40px_-8px_rgba(59,130,246,0.4),_0_0_0_3px_rgba(59,130,246,0.5)]" : ""}`}>
                  <Image 
                    width={64} 
                    height={64} 
                    src={badge.img} 
                    alt={`${badge.title} Certified Henotic Diagnostics`} 
                    className="w-full h-full object-contain drop-shadow-sm" 
                  />
                  {/* Glass sheen overlay */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-white/70 pointer-events-none" />
                  {/* Zoom indicator on hover */}
                  {hasCert && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><circle cx="10" cy="10" r="6"/><line x1="14.5" y1="14.5" x2="20" y2="20"/></svg>
                    </div>
                  )}
                </div>
                <span className={`text-[9px] sm:text-[11px] font-black tracking-wider uppercase ${
                  isHero 
                    ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] bg-slate-900/50 border border-white/10 backdrop-blur-sm" 
                    : "text-slate-700 bg-slate-100 border border-slate-200"
                } px-2 py-0.5 rounded-md`}>
                  {badge.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Certificate Lightbox */}
      {activeCert && (
        <CertificateViewer
          src={activeCert.url}
          alt={activeCert.title}
          onClose={() => setActiveCert(null)}
        />
      )}
    </>
  );
}
