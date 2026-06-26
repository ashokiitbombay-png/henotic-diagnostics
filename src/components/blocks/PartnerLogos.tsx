import React from 'react';
import Image from 'next/image';
import { Network } from 'lucide-react';

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
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Licensed Partner Networks Badge */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-slate-700 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Network size={14} className="text-blue-600" /> Licensed Partner Networks
          </span>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 text-center max-w-4xl mx-auto mb-6 tracking-tight leading-tight">
          Why Choose Henotic Diagnostics for Your Medical Imaging & Diagnostic Needs
        </h2>

        {/* Section Description */}
        <p className="text-slate-600 font-medium text-base md:text-lg text-center max-w-4xl mx-auto leading-relaxed mb-16">
          Hospitals and clinicians trust Henotic Diagnostics to provide reliable, high-accuracy patient care. Leading healthcare institutions rely on our services for precise diagnostics, advanced imaging, and comprehensive pathology testing, ensuring the highest standards of healthcare for their patients. Our trusted reputation for accurate MRI, CT, PET-CT, and pathology results guarantees unparalleled care and precision in the medical diagnostics field.
        </p>

        {/* Grid Container for Partner Logos */}
        <div className="space-y-12">
          {/* Row 1: Hospital Admissions & Advanced Imaging */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
            {constantPartners.map((partner, i) => (
              <div 
                key={`row1-${i}`}
                className="w-full max-w-[150px] aspect-[3/2] flex items-center justify-center p-3 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  title={partner.name}
                  width={150}
                  height={100}
                  className="max-w-full max-h-full object-contain filter grayscale-0 opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* Row 2: Pathology, Cardiac & Genomics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
            {slidingPartners.map((partner, i) => (
              <div 
                key={`row2-${i}`}
                className="w-full max-w-[150px] aspect-[3/2] flex items-center justify-center p-3 rounded-xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Image 
                  src={partner.logo} 
                  alt={partner.name}
                  title={partner.name}
                  width={150}
                  height={100}
                  className="max-w-full max-h-full object-contain filter grayscale-0 opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
