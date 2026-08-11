"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, Search, ChevronDown, Activity, Orbit, Droplet, Heart, Baby, 
  Stethoscope, Scale, ShoppingBag, UserCheck, Sparkles, Filter, Check, ArrowRight
} from "lucide-react";
import { REGION_LOCATIONS, REGION_NAMES } from "@/config/locations";
import { services } from "@/config/services";
import { CONDITIONS } from "@/config/conditions";
import { COMPARISONS } from "@/config/comparisons";
import { DOCTORS } from "@/config/doctors";
import { GMC_PRODUCTS } from "@/config/gmc-products";
import { SERVICE_CATEGORIES } from "@/config/categories";
import { formatSlug } from "@/lib/utils";

// Interface for search results covering all sitemap categories
export interface SitemapSearchResult {
  type: "service" | "location" | "condition" | "comparison" | "doctor" | "product";
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  icon: any;
}

// Location representation
interface SearchableLocation {
  city: string;
  region: string;
  displayName: string;
  regionName: string;
}

const ALL_LOCATIONS: SearchableLocation[] = Object.entries(REGION_LOCATIONS).flatMap(
  ([region, cities]) =>
    cities.map((city) => ({
      city,
      region,
      displayName: formatSlug(city),
      regionName: REGION_NAMES[region] || formatSlug(region)
    }))
);

// Popular location shortcuts
const POPULAR_LOCATIONS = [
  { city: "kharghar", region: "navi-mumbai" },
  { city: "panvel", region: "navi-mumbai" },
  { city: "vashi", region: "navi-mumbai" },
  { city: "andheri", region: "western-suburbs" },
  { city: "thane-west", region: "thane" },
  { city: "pune-city", region: "pune" }
];

export default function EdgeToEdgeSearchBar() {
  const router = useRouter();

  // Selected Location (Default: Kharghar, Navi Mumbai)
  const [selectedLocation, setSelectedLocation] = useState<SearchableLocation>({
    city: "kharghar",
    region: "navi-mumbai",
    displayName: "Kharghar",
    regionName: "Navi Mumbai"
  });

  const [locationQuery, setLocationQuery] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter Locations
  const filteredLocations = ALL_LOCATIONS.filter((loc) =>
    loc.displayName.toLowerCase().includes(locationQuery.toLowerCase()) ||
    loc.regionName.toLowerCase().includes(locationQuery.toLowerCase()) ||
    loc.city.toLowerCase().includes(locationQuery.toLowerCase())
  ).slice(0, 10);

  // Build Comprehensive Sitemap Search Index across ALL site entities
  const getSitemapResults = (): SitemapSearchResult[] => {
    if (!searchQuery.trim()) {
      // Default top suggestions when query is empty
      return [
        { type: "service", title: "MRI Scan (3.0 Tesla)", subtitle: `Available in ${selectedLocation.displayName}`, url: `/services/mri-scan/${selectedLocation.region}/${selectedLocation.city}`, badge: "Diagnostic Imaging", icon: Orbit },
        { type: "service", title: "CT Scan (128-Slice)", subtitle: `Available in ${selectedLocation.displayName}`, url: `/services/ct-scan/${selectedLocation.region}/${selectedLocation.city}`, badge: "Radiology", icon: Orbit },
        { type: "service", title: "Full Body Checkup", subtitle: "Pathology & Health Screening", url: `/services/full-body-check-up/${selectedLocation.region}/${selectedLocation.city}`, badge: "Checkup Package", icon: Droplet },
        { type: "service", title: "Blood Test / Home Collection", subtitle: "Same-Day Digital Reports", url: `/services/blood-test/${selectedLocation.region}/${selectedLocation.city}`, badge: "Pathology", icon: Droplet },
        { type: "service", title: "2D Echo & ECG Test", subtitle: "Cardiology Diagnostic", url: `/services/2d-echo/${selectedLocation.region}/${selectedLocation.city}`, badge: "Cardiology", icon: Heart },
        { type: "service", title: "Pregnancy Sonography & Anomaly Scan", subtitle: "PCPNDT Certified Fetal Medicine", url: `/services/pregnancy-sonography/${selectedLocation.region}/${selectedLocation.city}`, badge: "Fetal Medicine", icon: Baby },
        { type: "comparison", title: "3T MRI vs 1.5T MRI", subtitle: "Diagnostic Accuracy Comparison", url: "/compare/3t-mri-vs-15t-mri", badge: "Scan Comparison", icon: Scale },
        { type: "condition", title: "Back Pain & Spine Imaging", subtitle: "Recommended: Spine MRI", url: "/conditions/back-pain", badge: "Condition Guide", icon: Stethoscope }
      ];
    }

    const query = searchQuery.toLowerCase().trim();
    const results: SitemapSearchResult[] = [];

    // 1. Diagnostic Services & Scans (services.ts)
    services.forEach((slug) => {
      const name = formatSlug(slug);
      if (slug.includes(query) || name.toLowerCase().includes(query)) {
        results.push({
          type: "service",
          title: name,
          subtitle: `Book test in ${selectedLocation.displayName}, ${selectedLocation.regionName}`,
          url: `/services/${slug}/${selectedLocation.region}/${selectedLocation.city}`,
          badge: "Diagnostic Service",
          icon: Orbit
        });
      }
    });

    // 2. Medical Conditions (conditions.ts)
    CONDITIONS.forEach((cond) => {
      if (cond.title.toLowerCase().includes(query) || cond.id.includes(query) || cond.description.toLowerCase().includes(query)) {
        results.push({
          type: "condition",
          title: cond.title,
          subtitle: `Symptoms & Recommended Diagnostics (${cond.bodySystem})`,
          url: `/conditions/${cond.id}`,
          badge: "Medical Condition",
          icon: Stethoscope
        });
      }
    });

    // 3. Scan & Test Comparisons (comparisons.ts)
    COMPARISONS.forEach((comp) => {
      if (comp.title.toLowerCase().includes(query) || comp.slug.includes(query)) {
        results.push({
          type: "comparison",
          title: comp.title,
          subtitle: comp.metaDescription || "Diagnostic procedure comparison",
          url: `/compare/${comp.slug}`,
          badge: "Scan Comparison",
          icon: Scale
        });
      }
    });

    // 4. Doctors & Specialists (doctors.ts)
    DOCTORS.forEach((doc) => {
      if (doc.name.toLowerCase().includes(query) || doc.specialty.toLowerCase().includes(query)) {
        results.push({
          type: "doctor",
          title: doc.name,
          subtitle: `${doc.specialty} — ${doc.qualification}`,
          url: `/doctors/${doc.id}`,
          badge: "Specialist Doctor",
          icon: UserCheck
        });
      }
    });

    // 5. Diagnostic Products (gmc-products.ts)
    GMC_PRODUCTS.forEach((prod) => {
      if (prod.title.toLowerCase().includes(query) || prod.slug.includes(query)) {
        results.push({
          type: "product",
          title: prod.title,
          subtitle: prod.description || "Healthcare diagnostic package",
          url: `/gmc/${prod.slug}`,
          badge: "Package / Product",
          icon: ShoppingBag
        });
      }
    });

    // Apply category filter if active
    if (selectedCategoryFilter !== "All") {
      return results.filter(r => r.badge.toLowerCase().includes(selectedCategoryFilter.toLowerCase()) || r.type === selectedCategoryFilter.toLowerCase()).slice(0, 12);
    }

    return results.slice(0, 12);
  };

  const sitemapResults = getSitemapResults();

  const handleSelectResult = (url: string) => {
    setIsSearchOpen(false);
    setIsLocationOpen(false);
    router.push(url);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sitemapResults.length > 0) {
      handleSelectResult(sitemapResults[0].url);
    } else {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-blue-900/50 shadow-2xl py-3 px-4 md:px-8 relative z-40">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 🌟 EDGE-TO-EDGE SEARCH BAR CONTAINER                                      */}
        {/* ========================================================================= */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-full p-1.5 border border-white/20 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] flex flex-col lg:flex-row items-stretch gap-1.5 transition-all duration-300 hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.4)]"
        >
          {/* 📍 LOCATION SELECTOR SEGMENT (LEFT) */}
          <div className="relative flex-1 lg:max-w-[280px]">
            <div
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsSearchOpen(false);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl lg:rounded-full hover:bg-slate-100/90 transition-colors cursor-pointer border border-slate-100 lg:border-none"
            >
              <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 shadow-inner">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col text-left overflow-hidden flex-grow">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500">Location</span>
                <span className="text-xs font-bold text-slate-900 truncate">
                  {selectedLocation.displayName}, <span className="text-slate-500 font-medium">{selectedLocation.regionName}</span>
                </span>
              </div>
              <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`} />
            </div>

            {/* Location Autocomplete Dropdown */}
            {isLocationOpen && (
              <div className="absolute top-[115%] left-0 w-full md:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search 109 cities or areas..."
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                    autoFocus
                  />
                </div>

                {!locationQuery && (
                  <div className="mb-2 px-1">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5">Top Cities</span>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_LOCATIONS.map((pop) => (
                        <button
                          key={pop.city}
                          type="button"
                          onClick={() => {
                            setSelectedLocation({
                              city: pop.city,
                              region: pop.region,
                              displayName: formatSlug(pop.city),
                              regionName: REGION_NAMES[pop.region] || formatSlug(pop.region)
                            });
                            setIsLocationOpen(false);
                          }}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-colors ${
                            selectedLocation.city === pop.city ? "bg-pink-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {formatSlug(pop.city)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="max-h-56 overflow-y-auto scrollbar-thin">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-1 block my-1">
                    {locationQuery ? "Matching Cities" : "All Neighborhoods"}
                  </span>
                  {filteredLocations.map((loc) => (
                    <button
                      key={`${loc.region}-${loc.city}`}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                        setLocationQuery("");
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedLocation.city === loc.city ? "bg-pink-50 text-pink-700 font-bold" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>{loc.displayName}</span>
                      <span className="text-[10px] text-slate-500 font-medium px-2 py-0.5 bg-slate-100 rounded-md">{loc.regionName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Divider line */}
          <div className="hidden lg:block w-[1px] bg-slate-200 my-1"></div>

          {/* 🔍 MAIN SEARCH INPUT SEGMENT (MIDDLE - FULL EDGE TO EDGE WIDTH) */}
          <div className="relative flex-grow flex items-center">
            <div className="relative w-full flex items-center">
              <Search className="absolute left-3.5 text-slate-400 pointer-events-none" size={18} />
              <input
                type="text"
                placeholder="Search 37,000+ pages: Scans, Blood Tests, Back Pain, 3T MRI vs CT, Doctors..."
                value={searchQuery}
                onFocus={() => {
                  setIsSearchOpen(true);
                  setIsLocationOpen(false);
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-transparent outline-none font-semibold text-slate-900 text-xs md:text-sm placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>

            {/* Sitemap Category Dropdown */}
            {isSearchOpen && (
              <div className="absolute top-[125%] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800">
                
                {/* Header bar with total page count */}
                <div className="flex items-center justify-between px-3 py-1.5 mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100/60">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-900 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-amber-500 animate-pulse" /> Complete Sitemap Search ({selectedLocation.displayName})
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200">
                    37,000+ Pages
                  </span>
                </div>

                {/* Category Filters inside Dropdown */}
                <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100 overflow-x-auto scrollbar-hide">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest shrink-0 mr-1 flex items-center gap-1">
                    <Filter size={11} /> Filter:
                  </span>
                  {["All", "Diagnostic Service", "Medical Condition", "Scan Comparison", "Specialist Doctor", "Package / Product"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(cat)}
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg shrink-0 transition-all ${
                        selectedCategoryFilter === cat ? "bg-blue-600 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Results list */}
                {sitemapResults.length === 0 ? (
                  <div className="p-6 text-center text-xs font-semibold text-slate-500">
                    No matching sitemap results found for "{searchQuery}". Press Enter to browse all diagnostic services directory.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {sitemapResults.map((item, idx) => {
                      const IconComponent = item.icon || Orbit;
                      return (
                        <button
                          key={`${item.url}-${idx}`}
                          type="button"
                          onClick={() => handleSelectResult(item.url)}
                          className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all flex items-center justify-between group border border-transparent hover:border-blue-100"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 transition-colors shadow-inner">
                              <IconComponent size={16} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs md:text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors block truncate">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium block truncate">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-800 px-2 py-1 rounded-md transition-colors shrink-0 ml-2">
                            {item.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 🔎 GRADIENT ACTION BUTTON (RIGHT) */}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-extrabold px-6 py-2.5 rounded-xl lg:rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg shrink-0 cursor-pointer text-xs md:text-sm"
          >
            <Search size={16} strokeWidth={2.5} />
            <span className="font-bold">Search</span>
          </button>
        </form>

        {/* 🌟 SITEMAP QUICK-NAV CATEGORY PILLS BAR 🌟 */}
        <div className="mt-2.5 flex items-center justify-between gap-2 overflow-x-auto scrollbar-hide py-1 text-[11px] font-bold text-slate-300">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-amber-400 font-extrabold flex items-center gap-1">
              <Sparkles size={12} /> Explore Sitemap:
            </span>
            <a href="/services/mri-scan" className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              🧲 3T MRI
            </a>
            <a href="/services/ct-scan" className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              🔬 128-Slice CT
            </a>
            <a href="/services/blood-test" className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              🧪 Blood Tests
            </a>
            <a href="/services/ultrasound" className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              📡 4D Sonography
            </a>
            <a href="/services/2d-echo" className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              ❤️ 2D Echo
            </a>
            <a href="/conditions" className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              🩺 Conditions
            </a>
            <a href="/compare/3t-mri-vs-15t-mri" className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              ⚖️ Comparisons
            </a>
            <a href="/sitemap" className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30 transition-colors">
              🗺️ Full Sitemap (37k+ Pages)
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
