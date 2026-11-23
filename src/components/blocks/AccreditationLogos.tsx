"use client";
import React, { useState } from "react";
import CertificateViewer from "@/components/ui/CertificateViewer";
import { CERTIFICATE_MAP } from "@/config/certificates";

export interface AccreditationBadge {
  title: string;
  img: string;
}

export const DEFAULT_ACCREDITATIONS: AccreditationBadge[] = [
  {
    title: "NABL",
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp",
  },
  {
    title: "ISO",
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp",
  },
  {
    title: "AERB",
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/Atomic_Energy_Regulatory_Board_Henotic-Diagnostics-LOGO.svg%20(1).webp",
  },
  {
    title: "PCPNDT",
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/pcpndt-certified-henotic-diagnsotics-kharghar.webp",
  },
  {
    title: "NABH",
    img: "https://cdn.henoticdiagnostics.com/Accreditation%20Logos/nabh-henotic-diagnsotics-kharghar.webp",
  },
];

interface AccreditationLogosProps {
  badges?: AccreditationBadge[];
  /** Visual mode — 'hero' for dark bg, 'light' for light bg */
  variant?: "hero" | "light";
}

/**
 * Interactive Accreditation Logo Badges.
 * Clicking any logo opens its full certificate in the CertificateViewer lightbox.
 */
export default function AccreditationLogos({
  badges = DEFAULT_ACCREDITATIONS,
  variant = "hero",
}: AccreditationLogosProps) {
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
        <div className="mb-2">
          <span
            className={`text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] ${
              isHero ? "text-blue-200" : "text-blue-600"
            }`}
          >
            Accredited by National Bodies
          </span>
        </div>

        <div className="flex gap-3 sm:gap-4 flex-wrap">
          {badges.map((badge) => {
            const hasCert = !!CERTIFICATE_MAP[badge.title.toUpperCase()] || !!CERTIFICATE_MAP[badge.title];
            return (
              <button
                key={badge.title}
                type="button"
                onClick={() => handleLogoClick(badge)}
                className={`flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl ${
                  hasCert ? "cursor-pointer" : "cursor-default"
                }`}
                aria-label={`View ${badge.title} certificate`}
                title={hasCert ? `Click to view ${badge.title} Certificate` : badge.title}
              >
                <div className="accred-ring">
                  <img
                    width={64}
                    height={64}
                    src={badge.img}
                    alt={`${badge.title} Certified Henotic Diagnostics`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className={isHero ? "accred-lbl" : "accred-lbl-lt"}>
                  {badge.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
