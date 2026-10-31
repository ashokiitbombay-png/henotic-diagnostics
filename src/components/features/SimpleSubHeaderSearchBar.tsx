"use client";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, Activity, Orbit, Droplets, Heart, Baby, 
  Stethoscope, Scale, ShoppingBag, UserCheck, Sparkles, X, ArrowRight,
  Crosshair, ShieldCheck, CheckCircle2, Flame, Clock, Zap
} from "lucide-react";
import { LOCATION_DATABASE, LocationItem } from "@/config/locations";
import { services } from "@/config/services";
import { CONDITIONS } from "@/config/conditions";
import { COMPARISONS } from "@/config/comparisons";
import { DOCTORS } from "@/config/doctors";
import { GMC_PRODUCTS } from "@/config/gmc-products";
import { formatSlug } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SitemapSearchResult {
  type: "service" | "location" | "condition" | "comparison" | "doctor" | "product" | "page";
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  icon: any;
  score: number;
}

export interface ActiveLocation {
  city: string;
  region: string;
  displayName: string;
  regionName: string;
  pincode: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC / POPULAR CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const CORE_PAGES = [
  { title: "Home", url: "/", badge: "Page" },
  { title: "Diagnostic Pricing & Cost Estimator", url: "/pricing", badge: "Pricing" },
  { title: "About Us", url: "/about-us", badge: "Page" },
  { title: "Leadership Team", url: "/leadership", badge: "Page" },
  { title: "Contact", url: "/contact", badge: "Page" },
  { title: "Services Directory", url: "/services", badge: "Directory" },
  { title: "Geographical Directory (350+ Areas)", url: "/locations", badge: "Directory" },
  { title: "City Hubs", url: "/city", badge: "Directory" },
  { title: "Doctors", url: "/doctors", badge: "Directory" },
  { title: "Conditions", url: "/conditions", badge: "Directory" },
  { title: "Blog", url: "/blog", badge: "Page" },
];

const CATEGORY_RANGES: [string, number, number][] = [
  ["Diagnostic Center", 0, 9],
  ["Health Checkup", 10, 35],
  ["Pathology & Lab", 36, 60],
  ["Ultrasound", 61, 94],
  ["Pregnancy & Fetal", 95, 125],
  ["Doppler Studies", 126, 146],
  ["Breast Imaging", 147, 156],
  ["Women's Health", 157, 167],
  ["MRI Services", 168, 206],
  ["CT Scan", 207, 235],
  ["PET-CT & Nuclear", 236, 271],
  ["Bone & DEXA", 272, 275],
  ["Cardiology", 276, 304],
  ["Liver & Fibroscan", 305, 318],
  ["Genetic Testing", 319, 343],
  ["Genomic Sequencing", 344, 363],
  ["Microbiome Testing", 364, 369],
  ["Urology", 370, 379],
];

const SERVICE_CATEGORY_MAP: Record<string, string> = {};
services.forEach((slug, idx) => {
  const range = CATEGORY_RANGES.find(([, start, end]) => idx >= start && idx <= end);
  SERVICE_CATEGORY_MAP[slug] = range ? range[0] : "Service";
});

// Category to Icon Map
const CATEGORY_ICONS: Record<string, any> = {
  "MRI Services": Orbit,
  "CT Scan": Orbit,
  "PET-CT & Nuclear": Orbit,
  "Diagnostic Center": ShieldCheck,
  "Health Checkup": Activity,
  "Pathology & Lab": Droplets,
  "Ultrasound": Activity,
  "Pregnancy & Fetal": Baby,
  "Doppler Studies": Activity,
  "Cardiology": Heart,
  "Specialist Doctor": UserCheck,
  "Medical Condition": Stethoscope,
  "Scan Comparison": Scale,
  "Product": ShoppingBag,
};

// Trending High-Intent Diagnostics
const TRENDING_SEARCHES = [
  { title: "3.0 Tesla MRI Scan", subtitle: "Brain, Spine & Joint Imaging", slug: "mri-scan", category: "MRI Services", icon: Orbit },
  { title: "128-Slice HRCT Chest", subtitle: "Ultra-low dose chest scan", slug: "hrct-chest", category: "CT Scan", icon: Orbit },
  { title: "Whole Body PET-CT", subtitle: "Advanced cancer screening", slug: "pet-scan", category: "PET-CT & Nuclear", icon: Orbit },
  { title: "Pregnancy Anomaly Scan", subtitle: "Level-2 Fetal Ultrasound", slug: "anomaly-scan", category: "Pregnancy & Fetal", icon: Baby },
  { title: "Full Body Health Checkup", subtitle: "85+ vital biomarkers", slug: "full-body-check-up", category: "Health Checkup", icon: Activity },
  { title: "Complete Blood Count (CBC)", subtitle: "Same day lab report", slug: "cbc-test", category: "Pathology & Lab", icon: Droplets },
  { title: "2D Echocardiography", subtitle: "Cardiologist evaluated", slug: "2d-echo", category: "Cardiology", icon: Heart },
  { title: "Thyroid & Lipid Profile", subtitle: "Fasting blood panel", slug: "thyroid-test", category: "Pathology & Lab", icon: Droplets },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function SimpleSubHeaderSearchBar() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Active Selected Location (Default: Kharghar, Navi Mumbai 410210)
  const [selectedLocation, setSelectedLocation] = useState<ActiveLocation>({
    city: "kharghar",
    region: "navi-mumbai",
    displayName: "Kharghar",
    regionName: "Navi Mumbai",
    pincode: "410210",
  });

  // Query & Open States
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  // Keyboard navigation index
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Hydration safety: restore saved location from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("henotic_active_location");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.city && parsed?.region) {
          setSelectedLocation(parsed);
        }
      }
    } catch {
      // fallback to default Kharghar
    }
  }, []);

  // Save selected location to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem("henotic_active_location", JSON.stringify(selectedLocation));
    } catch {
      // ignore
    }
  }, [selectedLocation, mounted]);

  // Global click-outside listener to dismiss modals
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener (Cmd/Ctrl + K to focus search)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // 📍 GPS GEOLOCATION DETECTOR (Finds nearest center from coordinates)
  // ═══════════════════════════════════════════════════════════════════════════
  const handleDetectLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationMessage("Geolocation is not supported by your browser.");
      setTimeout(() => setLocationMessage(null), 3000);
      return;
    }

    setIsDetectingLocation(true);
    setLocationMessage("Acquiring GPS coordinates...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let closestLocation: LocationItem | null = null;
        let minDistance = Infinity;

        for (const loc of LOCATION_DATABASE) {
          if (loc.latitude && loc.longitude) {
            const dLat = loc.latitude - latitude;
            const dLon = loc.longitude - longitude;
            const dist = dLat * dLat + dLon * dLon;
            if (dist < minDistance) {
              minDistance = dist;
              closestLocation = loc;
            }
          }
        }

        if (closestLocation) {
          setSelectedLocation({
            city: closestLocation.slug,
            region: closestLocation.region,
            displayName: closestLocation.name,
            regionName: closestLocation.regionName,
            pincode: closestLocation.pincode
          });
          setIsGpsActive(true);
          setLocationMessage(`Located: ${closestLocation.name} (${closestLocation.pincode})`);
          setTimeout(() => {
            setIsDetectingLocation(false);
            setLocationMessage(null);
          }, 2000);
        } else {
          setIsDetectingLocation(false);
          setIsGpsActive(false);
          setLocationMessage("No nearby center found; defaulted to Kharghar");
          setTimeout(() => setLocationMessage(null), 2500);
        }
      },
      () => {
        setIsDetectingLocation(false);
        setIsGpsActive(false);
        setLocationMessage("Location permission denied. Defaulted to Kharghar center.");
        setTimeout(() => setLocationMessage(null), 3000);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔍 COMPREHENSIVE SEARCH SCORING ENGINE (Services + Products + Doctors)
  // ═══════════════════════════════════════════════════════════════════════════
  const searchResults = useMemo<SitemapSearchResult[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 1) return [];

    const results: SitemapSearchResult[] = [];

    // Helper: Compute Match Score
    const computeScore = (title: string, keywords: string[] = []): number => {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle === q) return 100;
      if (lowerTitle.startsWith(q)) return 80;
      if (lowerTitle.includes(` ${q}`)) return 70;
      if (lowerTitle.includes(q)) return 50;
      for (const kw of keywords) {
        const lowerKw = kw.toLowerCase();
        if (lowerKw === q) return 60;
        if (lowerKw.includes(q)) return 40;
      }
      return 0;
    };

    // 1. Core Services Search (Ranked High)
    services.forEach((slug) => {
      const formatted = formatSlug(slug);
      const category = SERVICE_CATEGORY_MAP[slug] || "Diagnostic Service";
      const score = computeScore(formatted, [category, slug.replace(/-/g, " ")]);
      if (score > 0) {
        results.push({
          type: "service",
          title: formatted,
          subtitle: `${category} • Available in ${selectedLocation.displayName}`,
          url: `/services/${slug}/${selectedLocation.region}/${selectedLocation.city}`,
          badge: category,
          icon: CATEGORY_ICONS[category] || Activity,
          score: score + 10,
        });
      }
    });

    // 2. Doctors Directory
    DOCTORS.forEach((doc) => {
      const score = computeScore(doc.name, [doc.designation, doc.credentials, ...doc.specializations]);
      if (score > 0) {
        results.push({
          type: "doctor",
          title: doc.name,
          subtitle: `${doc.designation} (${doc.credentials})`,
          url: `/doctors/${doc.id}`,
          badge: "Specialist Doctor",
          icon: UserCheck,
          score: score + 5,
        });
      }
    });

    // 3. Clinical Conditions
    CONDITIONS.forEach((cond) => {
      const score = computeScore(cond.title, [cond.description, cond.id]);
      if (score > 0) {
        results.push({
          type: "condition",
          title: cond.title,
          subtitle: `Recommended diagnostic tests & scan indications`,
          url: `/conditions/${cond.id}`,
          badge: "Condition",
          icon: Stethoscope,
          score,
        });
      }
    });

    // 4. Test Comparisons
    COMPARISONS.forEach((comp) => {
      const score = computeScore(comp.title, [comp.serviceA.name, comp.serviceB.name, comp.slug]);
      if (score > 0) {
        results.push({
          type: "comparison",
          title: comp.title,
          subtitle: `${comp.serviceA.name} vs ${comp.serviceB.name}`,
          url: `/compare/${comp.slug}`,
          badge: "Scan Comparison",
          icon: Scale,
          score,
        });
      }
    });

    // 5. GMC High-Authority Products
    GMC_PRODUCTS.forEach((prod) => {
      const score = computeScore(prod.title, [prod.brand, prod.availability]);
      if (score > 0) {
        results.push({
          type: "product",
          title: prod.title,
          subtitle: `Price: ₹${prod.price} • Same-Day Report`,
          url: `/gmc/${prod.slug}`,
          badge: "Diagnostic Test",
          icon: ShoppingBag,
          score: score + 2,
        });
      }
    });

    // 6. Core Pages
    CORE_PAGES.forEach((page) => {
      const score = computeScore(page.title, [page.badge]);
      if (score > 0) {
        results.push({
          type: "page",
          title: page.title,
          subtitle: `Official Henotic Diagnostics portal page`,
          url: page.url,
          badge: page.badge,
          icon: ShieldCheck,
          score: score - 5,
        });
      }
    });

    // Sort by descending score
    return results.sort((a, b) => b.score - a.score).slice(0, 15);
  }, [searchQuery, selectedLocation]);

  // Handle Result Navigation
  const handleSelectResult = (url: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(url);
  };

  // Keyboard Navigation inside search results
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchOpen || searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        handleSelectResult(searchResults[selectedIndex].url);
      } else if (searchResults.length > 0) {
        handleSelectResult(searchResults[0].url);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSelectResult(searchResults[0].url);
    } else if (searchQuery.trim()) {
      router.push(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div 
      role="search"
      aria-label="Diagnostic search console"
      className="w-full relative z-40 px-3 sm:px-6 md:px-8 pt-5 sm:pt-7 pb-2 sm:pb-3"
    >
      {/* 🌟 3D VOLUMETRIC BACKDROP GLOW (Soft atmospheric light behind glass) */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-14 bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 blur-2xl rounded-full pointer-events-none -z-10"
      />

      <div ref={containerRef} className="max-w-5xl mx-auto">
        
        {/* ================================================================= */}
        {/* 🌟 UNIFIED 3D SINGLE-PILL CONSOLE (EXACT MATCH TO DESIGN MOCKUP)  */}
        {/* ================================================================= */}
        <form
          onSubmit={handleFormSubmit}
          suppressHydrationWarning
          className={`
            relative flex flex-row items-center w-full
            px-3 sm:px-4 py-2 sm:py-2.5
            rounded-2xl sm:rounded-3xl
            bg-white/95 backdrop-blur-2xl
            border border-slate-200/90
            transition-all duration-300 ease-out
            shadow-[0_16px_36px_-6px_rgba(20,15,45,0.14),0_6px_16px_-4px_rgba(20,15,45,0.08),inset_0_1.5px_0_rgba(255,255,255,1),inset_0_-1.5px_2px_rgba(0,0,0,0.02)]
            hover:shadow-[0_22px_45px_-8px_rgba(20,15,45,0.18),0_8px_20px_-4px_rgba(20,15,45,0.10),inset_0_1.5px_0_rgba(255,255,255,1)]
            hover:-translate-y-0.5
            focus-within:border-blue-400/80
            focus-within:shadow-[0_24px_50px_-8px_rgba(69,104,220,0.22),0_10px_20px_-4px_rgba(176,106,179,0.15),inset_0_2px_0_rgba(255,255,255,1)]
            focus-within:ring-2 focus-within:ring-[#4568dc]/25
          `}
        >
          {/* =============================================================== */}
          {/* 📍 SEGMENT 1: USE GPS LOCATION OPTION (LEFT - NO POPUP BAR)     */}
          {/* =============================================================== */}
          <div className="relative shrink-0">
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className={`
                flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-left
                rounded-xl transition-all duration-200 cursor-pointer group
                bg-blue-50/70 hover:bg-blue-100/90 active:scale-95 select-none
                border border-blue-200/60
                ${isDetectingLocation ? "opacity-75 cursor-wait" : ""}
              `}
              title="Click to detect nearest diagnostic center via GPS"
            >
              <Crosshair 
                size={16} 
                className={`text-blue-600 shrink-0 transition-transform duration-300 ${
                  isDetectingLocation ? "animate-spin text-pink-500" : "group-hover:rotate-45"
                }`} 
              />

              <span className="text-xs sm:text-sm font-bold text-blue-950 whitespace-nowrap leading-none">
                {isDetectingLocation ? "Detecting GPS..." : (isGpsActive ? selectedLocation.displayName : "Use GPS")}
              </span>

              {isGpsActive && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded border border-emerald-300/60 hidden sm:inline-block">
                  GPS Active
                </span>
              )}
            </button>

            {/* Status Tooltip / Toast when detecting or updated */}
            {locationMessage && (
              <div 
                role="status"
                className="absolute top-[125%] left-0 z-50 px-3 py-2 bg-slate-900/95 backdrop-blur-xl text-white text-xs font-bold rounded-xl shadow-xl border border-white/10 flex items-center gap-2 whitespace-nowrap animate-in fade-in slide-in-from-top-1 duration-200"
              >
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                <span>{locationMessage}</span>
              </div>
            )}
          </div>

          {/* =============================================================== */}
          {/* 🌟 3D CRISP VERTICAL DIVIDER (SEPARATING LOCATION & SEARCH)      */}
          {/* =============================================================== */}
          <div 
            aria-hidden="true"
            className="w-[1px] h-6 sm:h-7 bg-slate-200/90 mx-2 sm:mx-3 shrink-0 self-center" 
          />

          {/* =============================================================== */}
          {/* 🔍 SEGMENT 2: LIVE MEDICAL INTENT SEARCH BAR (RIGHT)             */}
          {/* =============================================================== */}
          <div className="relative flex-grow flex items-center min-w-0">
            {/* Search Icon (Clean Outline Matching Screenshot) */}
            <Search 
              size={18} 
              className="text-slate-400 shrink-0 mr-2 sm:mr-3 pointer-events-none" 
            />

            {/* Main Input Field */}
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search MRI, CT Scan, blood test, doctors, locations..."
              value={searchQuery}
              onFocus={() => {
                setIsSearchOpen(true);
              }}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                setIsSearchOpen(true);
              }}
              onKeyDown={handleSearchKeyDown}
              suppressHydrationWarning
              className="w-full text-slate-800 placeholder-slate-400 text-xs sm:text-sm md:text-base font-semibold outline-none bg-transparent truncate"
            />

            {/* Clear (X) Button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  searchInputRef.current?.focus();
                }}
                className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center p-0.5 mr-1.5 transition-colors cursor-pointer shrink-0"
                title="Clear search"
              >
                <X size={12} />
              </button>
            )}

            {/* Keyboard Shortcut Hint (Desktop) */}
            <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-100/90 border border-slate-200/70 px-1.5 py-0.5 rounded-md shrink-0 shadow-xs mr-1 select-none">
              ⌘K
            </span>

            {/* ============================================================= */}
            {/* 🔍 3D MEDICAL AUTOCOMPLETE MODAL / DROPDOWN                  */}
            {/* ============================================================= */}
            {isSearchOpen && (
              <div 
                suppressHydrationWarning 
                className={`
                  absolute top-[140%] -left-12 sm:left-0 right-0
                  bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl
                  border border-white/90
                  shadow-[0_30px_70px_-15px_rgba(20,15,45,0.3),0_12px_24px_-6px_rgba(20,15,45,0.15),inset_0_1.5px_0_rgba(255,255,255,1)]
                  p-3 sm:p-4 z-50 max-h-[460px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800
                `}
              >
                {/* ── CASE A: WHEN SEARCH QUERY IS EMPTY -> SHOW TRENDING & CATEGORIES ── */}
                {!searchQuery.trim() && (
                  <div>
                    {/* Header with Active Location Context */}
                    <div className="flex items-center justify-between px-2 pb-2.5 mb-2.5 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Flame size={15} className="text-rose-500" />
                        <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                          Trending Diagnostics in {selectedLocation.displayName}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        250+ Scans • 24/7 Available
                      </span>
                    </div>

                    {/* Trending Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {TRENDING_SEARCHES.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => handleSelectResult(`/services/${item.slug}/${selectedLocation.region}/${selectedLocation.city}`)}
                            className="flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-100/80 transition-colors group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-black text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate">
                                {item.subtitle}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Quick Category Chips */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      <span className="text-[10px] font-black uppercase text-slate-400 mr-1 shrink-0">Categories:</span>
                      {[
                        { name: "MRI Scan (3.0T)", slug: "mri-scan" },
                        { name: "128-Slice CT", slug: "ct-scan" },
                        { name: "PET-CT Scan", slug: "pet-scan" },
                        { name: "Blood Tests", slug: "blood-test" },
                        { name: "Health Checkups", slug: "health-checkup" },
                        { name: "Pregnancy USG", slug: "pregnancy-sonography" },
                      ].map((cat) => (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() => handleSelectResult(`/services/${cat.slug}/${selectedLocation.region}/${selectedLocation.city}`)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[10px] font-bold shrink-0 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white transition-all cursor-pointer"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── CASE B: WHEN USER TYPES -> SHOW SCORING SEARCH RESULTS ── */}
                {searchQuery.trim() && (
                  <div>
                    {searchResults.length > 0 ? (
                      <div className="space-y-1">
                        <div className="px-2 pb-1.5 mb-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                          <span>Diagnostic Results ({searchResults.length})</span>
                          <span>Press Enter to select</span>
                        </div>

                        {searchResults.map((item, idx) => {
                          const Icon = item.icon;
                          const isHighlighted = idx === selectedIndex;
                          return (
                            <button
                              key={`${item.type}-${item.url}-${idx}`}
                              type="button"
                              onClick={() => handleSelectResult(item.url)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`
                                w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer group
                                ${isHighlighted ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 shadow-xs" : "hover:bg-slate-50 border border-transparent"}
                              `}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className={`
                                  w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors
                                  ${isHighlighted ? "bg-[#4568dc] text-white" : "bg-slate-100 text-slate-600 group-hover:bg-[#4568dc] group-hover:text-white"}
                                `}>
                                  <Icon size={17} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs sm:text-sm font-black text-slate-900 truncate group-hover:text-[#4568dc] transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-[10px] sm:text-xs text-slate-500 truncate font-medium">
                                    {item.subtitle}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 shadow-xs hidden sm:inline-block">
                                  {item.badge}
                                </span>
                                <ArrowRight size={14} className={`text-slate-400 transition-transform ${isHighlighted ? "translate-x-1 text-[#4568dc]" : "group-hover:text-[#4568dc]"}`} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* No Results State */
                      <div className="py-8 text-center px-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-3 shadow-inner">
                          <Search size={22} />
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mb-1">
                          No diagnostic match for &ldquo;{searchQuery}&rdquo;
                        </h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                          Search for tests like <strong className="text-slate-700">MRI Brain, CT Chest, CBC, Thyroid, 2D Echo</strong>, or explore our full medical catalog.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            router.push(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
                        >
                          Browse All 250+ Services
                        </button>
                      </div>
                    )}
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
