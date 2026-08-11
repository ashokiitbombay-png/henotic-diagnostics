"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, Search, ChevronDown, Activity, Orbit, Droplets, Heart, Baby, 
  Stethoscope, Scale, ShoppingBag, UserCheck, Sparkles, X, ArrowRight
} from "lucide-react";
import { REGION_LOCATIONS, REGION_NAMES } from "@/config/locations";
import { services } from "@/config/services";
import { CONDITIONS } from "@/config/conditions";
import { COMPARISONS } from "@/config/comparisons";
import { DOCTORS } from "@/config/doctors";
import { GMC_PRODUCTS } from "@/config/gmc-products";
import { formatSlug } from "@/lib/utils";

export interface SitemapSearchResult {
  type: "service" | "location" | "condition" | "comparison" | "doctor" | "product";
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  icon: any;
  score: number;
}

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

const POPULAR_LOCATIONS = [
  { city: "kharghar", region: "navi-mumbai" },
  { city: "panvel", region: "navi-mumbai" },
  { city: "vashi", region: "navi-mumbai" },
  { city: "andheri", region: "western-suburbs" },
  { city: "thane-west", region: "thane" },
  { city: "pune-city", region: "pune" }
];

export default function SimpleSubHeaderSearchBar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Active Location (Default: Kharghar, Navi Mumbai)
  const [selectedLocation, setSelectedLocation] = useState<SearchableLocation>({
    city: "kharghar",
    region: "navi-mumbai",
    displayName: "Kharghar",
    regionName: "Navi Mumbai"
  });

  const [locationQuery, setLocationQuery] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Active Search Query
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Set mounted state after initial hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus location input when location dropdown opens
  useEffect(() => {
    if (isLocationOpen && locationInputRef.current) {
      locationInputRef.current.focus();
    }
  }, [isLocationOpen]);

  // Close dropdowns on outside click
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

  // Live Tokenized Search Algorithm — Triggered ON TYPING
  const getSearchResults = (): SitemapSearchResult[] => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return [];

    const tokens = rawQuery.split(/\s+/).filter(Boolean);
    const results: SitemapSearchResult[] = [];

    const matchScore = (target: string): number => {
      const lower = target.toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (lower === token) score += 10;
        else if (lower.startsWith(token)) score += 5;
        else if (lower.includes(token)) score += 2;
        else return 0;
      }
      return score;
    };

    // 1. Diagnostic Services & Scans
    services.forEach((slug) => {
      const name = formatSlug(slug);
      const score = Math.max(matchScore(name), matchScore(slug));
      if (score > 0) {
        results.push({
          type: "service",
          title: name,
          subtitle: `Book test in ${selectedLocation.displayName}, ${selectedLocation.regionName}`,
          url: `/services/${slug}/${selectedLocation.region}/${selectedLocation.city}`,
          badge: "Diagnostic Service",
          icon: Orbit,
          score: score + 10
        });
      }
    });

    // 2. Doctors & Specialists
    DOCTORS.forEach((doc) => {
      const doctorText = `${doc.name} ${doc.designation} ${doc.credentials} ${doc.specializations.join(" ")}`;
      const score = Math.max(matchScore(doc.name), matchScore(doctorText));
      if (score > 0 || tokens.some(t => "doctor".includes(t) || "dr".includes(t) || "radiologist".includes(t))) {
        results.push({
          type: "doctor",
          title: doc.name,
          subtitle: `${doc.designation} (${doc.credentials})`,
          url: `/doctors/${doc.id}`,
          badge: "Specialist Doctor",
          icon: UserCheck,
          score: (score > 0 ? score : 3) + 15
        });
      }
    });

    // 3. Medical Conditions
    CONDITIONS.forEach((cond) => {
      const condText = `${cond.title} ${cond.description} ${cond.symptoms.join(" ")}`;
      const score = Math.max(matchScore(cond.title), matchScore(condText));
      if (score > 0) {
        results.push({
          type: "condition",
          title: cond.title,
          subtitle: `Symptoms & Diagnostics (${cond.bodySystem})`,
          url: `/conditions/${cond.id}`,
          badge: "Medical Condition",
          icon: Stethoscope,
          score
        });
      }
    });

    // 4. Scan Comparisons
    COMPARISONS.forEach((comp) => {
      const compText = `${comp.title} ${comp.metaDescription}`;
      const score = Math.max(matchScore(comp.title), matchScore(compText));
      if (score > 0) {
        results.push({
          type: "comparison",
          title: comp.title,
          subtitle: comp.metaDescription || "Diagnostic test comparison",
          url: `/compare/${comp.slug}`,
          badge: "Scan Comparison",
          icon: Scale,
          score
        });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 12);
  };

  const searchResults = getSearchResults();

  const handleSelectResult = (url: string) => {
    setIsSearchOpen(false);
    setIsLocationOpen(false);
    router.push(url);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSelectResult(searchResults[0].url);
    } else if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div suppressHydrationWarning className="w-full bg-white border-b border-slate-200/80 py-3 px-4 md:px-8 shadow-xs relative z-40">
      <div ref={containerRef} className="max-w-5xl mx-auto">
        
        {/* ========================================================================= */}
        {/* 🌟 DUAL-BOX SEARCH BAR (CLEAN INTERACTIVE INPUT)                          */}
        {/* ========================================================================= */}
        <form
          onSubmit={handleFormSubmit}
          suppressHydrationWarning
          className="flex flex-col sm:flex-row items-stretch bg-white border border-slate-300 rounded-lg md:rounded-xl overflow-visible shadow-xs hover:border-slate-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all relative"
        >
          {/* 📍 LEFT BOX: LOCATION SELECTOR */}
          <div className="relative sm:w-64 border-b sm:border-b-0 sm:border-r border-slate-200 shrink-0">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsSearchOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <MapPin size={18} className="text-slate-500 shrink-0" />
              <span className="text-sm font-semibold text-slate-800 truncate flex-grow">
                {selectedLocation.displayName}
                <span className="text-xs text-slate-500 font-normal ml-1">({selectedLocation.regionName})</span>
              </span>
              <ChevronDown size={14} className={`text-slate-400 shrink-0 transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Location Autocomplete Dropdown */}
            {isLocationOpen && (
              <div suppressHydrationWarning className="absolute top-[110%] left-0 w-full sm:w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-slate-800">
                <div className="mb-2">
                  <input
                    ref={locationInputRef}
                    type="text"
                    placeholder="Type city or area..."
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    suppressHydrationWarning
                    className="w-full px-3 py-1.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500"
                  />
                </div>

                {!locationQuery && (
                  <div className="mb-2 px-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Popular Cities</span>
                    <div className="flex flex-wrap gap-1">
                      {POPULAR_LOCATIONS.map((pop) => (
                        <button
                          key={pop.city}
                          type="button"
                          suppressHydrationWarning
                          onClick={() => {
                            setSelectedLocation({
                              city: pop.city,
                              region: pop.region,
                              displayName: formatSlug(pop.city),
                              regionName: REGION_NAMES[pop.region] || formatSlug(pop.region)
                            });
                            setIsLocationOpen(false);
                          }}
                          className={`text-xs font-medium px-2 py-0.5 rounded transition-colors ${
                            selectedLocation.city === pop.city ? "bg-blue-600 text-white font-bold" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {formatSlug(pop.city)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="max-h-52 overflow-y-auto scrollbar-thin">
                  {filteredLocations.map((loc) => (
                    <button
                      key={`${loc.region}-${loc.city}`}
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationOpen(false);
                        setLocationQuery("");
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                        selectedLocation.city === loc.city ? "bg-blue-50 text-blue-700 font-bold" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span>{loc.displayName}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{loc.regionName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 🔍 RIGHT BOX: MAIN SEARCH INPUT (LIVE RESULTS ONLY WHEN PATIENT TYPES) */}
          <div className="relative flex-grow flex items-center">
            <div className="relative w-full flex items-center px-4 py-3">
              <Search size={18} className="text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                placeholder="Search doctors, clinics, MRI, CT, blood tests, etc."
                value={searchQuery}
                onFocus={() => {
                  setIsLocationOpen(false);
                  if (searchQuery.trim().length > 0) {
                    setIsSearchOpen(true);
                  }
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setIsLocationOpen(false);
                  if (val.trim().length > 0) {
                    setIsSearchOpen(true);
                  } else {
                    setIsSearchOpen(false);
                  }
                }}
                suppressHydrationWarning
                className="w-full text-slate-800 placeholder-slate-400 text-sm font-medium outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  suppressHydrationWarning
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* LIVE RESULTS DROPDOWN — OPENS ONLY WHEN USER TYPES TEXT */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div suppressHydrationWarning className="absolute top-[110%] left-0 right-0 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150 text-slate-800">
                <div className="px-3 py-1.5 mb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Matching Results for "{searchQuery}"</span>
                  <span className="text-[10px] font-normal text-blue-600">
                    {searchResults.length} {searchResults.length === 1 ? "Result" : "Results"}
                  </span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No direct match found for "{searchQuery}". Press Enter to view all diagnostic services directory.
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {searchResults.map((item, idx) => {
                      const IconComponent = item.icon || Orbit;
                      return (
                        <button
                          key={`${item.url}-${idx}`}
                          type="button"
                          suppressHydrationWarning
                          onClick={() => handleSelectResult(item.url)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50/80 transition-colors flex items-center justify-between group border border-transparent hover:border-blue-100 cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-md bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center shrink-0 transition-colors">
                              <IconComponent size={15} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs md:text-sm font-semibold text-slate-800 group-hover:text-blue-700 block truncate">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-slate-500 font-normal block truncate">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-800 px-2 py-0.5 rounded shrink-0 ml-2">
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
        </form>

      </div>
    </div>
  );
}
