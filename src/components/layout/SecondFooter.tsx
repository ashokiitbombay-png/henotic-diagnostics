"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, MapPin, Activity } from "lucide-react";

// Helper for conditional classNames
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

// --- DYNAMIC LOCATION MATRIX ---
const REGIONS = {
  "South Mumbai": ["colaba", "cuffe-parade", "fort", "churchgate", "marine-lines", "nariman-point", "worli", "parel", "lower-parel", "mahalaxmi", "byculla", "dadar"],
  "Central Mumbai": ["sion", "kurla", "chembur", "ghatkopar", "vikhroli", "kanjurmarg", "bhandup", "mulund"],
  "Western Suburbs": ["bandra", "khar", "santacruz", "vile-parle", "andheri", "jogeshwari", "goregaon", "malad", "kandivali", "borivali", "dahisar"],
  "Eastern Suburbs": ["kurla-east", "chembur-east", "ghatkopar-east", "vikhroli-east", "mulund-east"],
  "Navi Mumbai": ["vashi", "sanpada", "juinagar", "nerul", "seawoods", "cbd-belapur", "kharghar", "kamothe", "kalamboli", "panvel", "new-panvel", "taloja", "ghansoli", "kopar-khairane", "airoli", "turbhe"]
};

// --- DYNAMIC SERVICE MATRIX ---
const SERVICE_CATEGORIES = {
  "Health Screening": ["diagnostic-center", "medical-imaging-center", "radiology-center", "pathology-lab", "health-checkup", "full-body-check-up", "executive-health-checkup", "preventive-health-checkup", "cancer-screening"],
  "Pathology & Labs": ["blood-test", "lab-test", "home-blood-collection", "cbc-test", "lipid-profile", "thyroid-test", "liver-function-test", "kidney-function-test", "diabetes-test", "vitamin-d-test", "covid-test", "dengue-test"],
  "Ultrasound & Sonography": ["ultrasound", "sonography", "usg-scan", "abdominal-ultrasound", "pelvic-ultrasound", "kidney-ultrasound", "prostate-ultrasound", "thyroid-ultrasound", "breast-ultrasound", "guided-biopsy"],
  "Pregnancy & Fetal": ["pregnancy-sonography", "obstetric-ultrasound", "early-pregnancy-scan", "nt-scan", "anomaly-scan", "target-scan", "growth-scan", "fetal-echo", "fetal-doppler", "high-risk-pregnancy-scan"],
  "Doppler Studies": ["color-doppler", "doppler-scan", "pregnancy-doppler", "arterial-doppler", "venous-doppler", "carotid-doppler", "renal-doppler", "dvt-doppler"],
  "Women's Health": ["mammography", "digital-mammography", "3d-mammography", "sonomammography", "breast-screening", "follicular-study", "fertility-scan", "hsg-test"],
  "MRI Services": ["mri-scan", "mri-brain", "mri-spine", "whole-spine-mri", "mri-joint", "pelvis-mri", "abdominal-mri", "cardiac-mri", "mri-mrcp", "whole-body-mri"],
  "CT Scan Services": ["ct-scan", "hrct-scan", "hrct-chest", "ct-brain", "ct-angiography", "ct-coronary-angiography", "whole-body-ct-scan", "low-dose-ct"],
  "PET CT & Nuclear": ["pet-scan", "pet-ct", "whole-body-pet-scan", "fdg-pet-ct", "bone-scan", "thyroid-scan", "renal-scan", "myocardial-perfusion-scan"],
  "Cardiology Diagnostics": ["ecg", "2d-echo", "stress-echo", "tmt-test", "holter-monitoring", "ambulatory-bp-monitoring", "angiography", "angioplasty"],
  "Liver & Bones": ["fibroscan", "liver-fibroscan", "liver-elastography", "dexa-bone-scan", "bone-density-test"],
  "Genetics": ["prenatal-test", "nipt-test", "karyotype-test", "dna-test"]
};

// Format region name to URL slug (e.g., "Navi Mumbai" -> "navi-mumbai")
const getRegionSlug = (regionCategory: string) => {
  return regionCategory.toLowerCase().replace(/ /g, "-");
};

// Format slug to readable text (e.g., "mri-scan" -> "Mri Scan")
const formatText = (slug: string) => {
  return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
};

export default function SecondFooter() {
  const [openRegion, setOpenRegion] = useState<string | null>("Navi Mumbai");

  return (
    <footer 
      className="text-white py-16 font-sans relative"
      style={{
        background: "linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)",
        transform: "translateZ(0)"
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-widest mb-3 drop-shadow-md">
            Global Service Directory
          </h2>
          <div className="w-32 h-1.5 bg-white mx-auto rounded-full opacity-50"></div>
          <p className="mt-4 text-white/80 font-bold max-w-2xl mx-auto">
            Find premium diagnostic services near you. Select a region below to explore our state-of-the-art facilities across Mumbai and Navi Mumbai.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(REGIONS).map((region) => (
            <button
              key={region}
              onClick={() => setOpenRegion(openRegion === region ? null : region)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-widest transition-all border shadow-sm",
                openRegion === region 
                  ? "bg-white text-[#813985] border-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] scale-105" 
                  : "bg-white/10 text-white border-white/30 hover:bg-white/20"
              )}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Dynamic Accordion Matrix */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-6 md:p-10 shadow-2xl">
          {openRegion && (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-8 border-b border-white/20 pb-4">
                <MapPin className="text-white" size={24} />
                <h3 className="text-2xl font-black text-white">{openRegion} Locations</h3>
              </div>

              <div className="grid gap-4">
                {REGIONS[openRegion as keyof typeof REGIONS].map((location) => (
                  <details 
                    key={location} 
                    className="group border-2 border-white/20 bg-white/5 rounded-2xl overflow-hidden transition-all hover:bg-white/10 open:bg-slate-900/60 open:border-[#52cffe]"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer select-none outline-none">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#52cffe] group-open:animate-pulse"></div>
                        <span className="text-base font-black text-white uppercase tracking-wider group-hover:text-[#52cffe] transition-colors">
                          {formatText(location)}
                        </span>
                      </div>
                      <ChevronDown size={20} className="text-white/70 group-open:rotate-180 group-open:text-[#52cffe] transition-transform" />
                    </summary>

                    {/* Service Grid Inside Location */}
                    <div className="p-6 sm:p-8 pt-0 border-t border-white/10 mt-2">
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-6">
                          {Object.entries(SERVICE_CATEGORIES).map(([category, services]) => (
                            <div key={category}>
                              <h4 className="text-[11px] font-black text-[#52cffe] uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-white/10 pb-2">
                                <Activity size={12} /> {category}
                              </h4>
                              <ul className="space-y-2">
                                {services.map((service) => (
                                  <li key={service}>
                                    <Link 
                                      href={`/services/${service}/${getRegionSlug(openRegion)}/${location}`}
                                      className="block text-xs font-bold text-white/70 hover:text-white transition-colors hover:translate-x-1.5 duration-200"
                                    >
                                      {formatText(service)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                       </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </footer>
  );
}