import React from "react";
import Link from "next/link";
import { MapPin, Activity, ShieldCheck, ChevronRight } from "lucide-react";

/**
 * 🌐 Regional Diagnostic Hubs & Service Directory
 * Server-rendered, high-equity internal linking hub.
 * Replaces the heavy 1,600-link client accordion with an optimized, accessible directory.
 */
const REGIONAL_HUBS = [
  { name: "Navi Mumbai Hub", href: "/city/navi-mumbai", sub: "Kharghar, Panvel, Vashi, Nerul & Belapur" },
  { name: "Mumbai Central & Suburbs", href: "/city/mumbai", sub: "Bandra, Andheri, Chembur, Kurla & Borivali" },
  { name: "Thane & Kalyan-Dombivli", href: "/city/thane", sub: "Thane West, Ghodbunder, Kalyan & Dombivli" },
  { name: "Pune & PCMC Network", href: "/city/pune", sub: "Kothrud, Wakad, Baner, Hinjawadi & Pimpri" },
  { name: "Panvel & Raigad Region", href: "/city/panvel", sub: "New Panvel, Khandeshwar, Kamothe & Taloja" },
];

const CORE_MODALITIES = [
  { name: "3.0T MRI Scan", href: "/services/mri-scan" },
  { name: "128-Slice CT Scan", href: "/services/ct-scan" },
  { name: "Whole Body PET-CT", href: "/services/pet-scan" },
  { name: "Ultrasound & Sonography", href: "/services/ultrasound" },
  { name: "Pathology Blood Tests", href: "/services/blood-test" },
  { name: "Full Body Checkup", href: "/services/full-body-check-up" },
  { name: "Digital Mammography", href: "/services/mammography" },
  { name: "2D Echocardiography", href: "/services/2d-echo" },
  { name: "HRCT Chest Scan", href: "/services/hrct-scan" },
  { name: "DEXA Bone Mineral Scan", href: "/services/dexa-bone-scan" },
  { name: "Pregnancy Sonography", href: "/services/pregnancy-sonography" },
  { name: "Master Health Checkup", href: "/services/master-health-checkup" },
];

const QUICK_NAV = [
  { name: "350+ Service Locations", href: "/locations" },
  { name: "Diagnostic Price Transparency", href: "/pricing" },
  { name: "Medical Faculty & Radiologists", href: "/doctors" },
  { name: "Test Comparison Matrix", href: "/compare" },
  { name: "Health Checkup Packages", href: "/services/health-checkup" },
  { name: "All 340+ Diagnostic Services", href: "/services" },
];

export default function SecondFooter() {
  return (
    <section 
      aria-label="Regional Diagnostic Network"
      className="text-white py-12 md:py-16 font-sans relative border-t border-white/10"
      style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #4338ca 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck size={14} /> NABL Accredited Regional Diagnostic Network
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Accredited Centers & Diagnostic Services Across Mumbai & Pune
          </h2>
          <p className="mt-2 text-white/80 text-sm md:text-base font-medium max-w-2xl mx-auto">
            Explore our state-of-the-art diagnostic facilities, NABL-accredited pathology, and advanced imaging centers.
          </p>
        </div>

        {/* 3-Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Regional Hubs */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/15">
              <MapPin className="text-amber-300" size={20} />
              <h3 className="text-lg font-black text-white">City & Regional Hubs</h3>
            </div>
            <ul className="space-y-3">
              {REGIONAL_HUBS.map((hub) => (
                <li key={hub.name}>
                  <Link
                    href={hub.href}
                    prefetch={false}
                    className="group block p-2.5 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white group-hover:text-amber-300 transition-colors text-sm">
                        {hub.name}
                      </span>
                      <ChevronRight size={14} className="text-white/50 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-white/70 mt-0.5">{hub.sub}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Key Diagnostic Modalities */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/15">
              <Activity className="text-sky-300" size={20} />
              <h3 className="text-lg font-black text-white">Top Diagnostic Modalities</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CORE_MODALITIES.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  prefetch={false}
                  className="p-2 rounded-lg text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/15">
              <ShieldCheck className="text-emerald-300" size={20} />
              <h3 className="text-lg font-black text-white">Direct Access</h3>
            </div>
            <ul className="space-y-2.5">
              {QUICK_NAV.map((nav) => (
                <li key={nav.name}>
                  <Link
                    href={nav.href}
                    prefetch={false}
                    className="flex items-center justify-between p-2 rounded-lg text-xs font-bold text-white/80 hover:text-white hover:bg-white/10 transition-colors group"
                  >
                    <span>{nav.name}</span>
                    <ChevronRight size={14} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
