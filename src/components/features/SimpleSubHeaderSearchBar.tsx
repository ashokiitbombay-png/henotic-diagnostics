"use client";
import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  MapPin, Search, ChevronDown, Activity, Orbit, Droplets, Heart, Baby, 
  Stethoscope, Scale, ShoppingBag, UserCheck, Sparkles, X, ArrowRight,
  Crosshair, ShieldCheck, CheckCircle2, Flame, Navigation, Clock, Zap, Check
} from "lucide-react";
import { LOCATION_DATABASE, LocationItem, REGION_LOCATIONS, REGION_NAMES } from "@/config/locations";
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
  ["Ambulance Services", 380, 400],
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

// Popular location shortcuts for fast 1-tap selection
const POPULAR_LOCATIONS = [
  { city: "kharghar", region: "navi-mumbai", displayName: "Kharghar", regionName: "Navi Mumbai", pincode: "410210" },
  { city: "panvel", region: "navi-mumbai", displayName: "Panvel", regionName: "Navi Mumbai", pincode: "410206" },
  { city: "vashi", region: "navi-mumbai", displayName: "Vashi", regionName: "Navi Mumbai", pincode: "400703" },
  { city: "nerul", region: "navi-mumbai", displayName: "Nerul", regionName: "Navi Mumbai", pincode: "400706" },
  { city: "colaba", region: "south-mumbai", displayName: "Colaba", regionName: "South Mumbai", pincode: "400005" },
  { city: "bandra", region: "western-suburbs", displayName: "Bandra", regionName: "Western Suburbs", pincode: "400050" },
  { city: "andheri", region: "western-suburbs", displayName: "Andheri", regionName: "Western Suburbs", pincode: "400058" },
  { city: "thane-west", region: "thane", displayName: "Thane West", regionName: "Thane", pincode: "400601" },
  { city: "pune-city", region: "pune", displayName: "Pune City", regionName: "Pune", pincode: "411001" },
];

// Region Filter Tabs for Location Drawer
const REGION_TABS = [
  { label: "All Areas (350+)", value: "all" },
  { label: "Navi Mumbai", value: "navi-mumbai" },
  { label: "South Mumbai", value: "south-mumbai" },
  { label: "Western Suburbs", value: "western-suburbs" },
  { label: "Central Suburbs", value: "central-suburbs" },
  { label: "Thane", value: "thane" },
  { label: "Pune", value: "pune" },
];

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
    pincode: "410210"
  });

  // Location Drawer State
  const [locationQuery, setLocationQuery] = useState("");
  const [activeRegionTab, setActiveRegionTab] = useState("all");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  // Medical Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSearchFilter, setActiveSearchFilter] = useState<string>("all");

  const containerRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Hydration sync
  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
        setIsLocationOpen(false);
      }
      if (e.key === "Escape") {
        setIsLocationOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus location input when opened
  useEffect(() => {
    if (isLocationOpen && locationInputRef.current) {
      setTimeout(() => locationInputRef.current?.focus(), 80);
    }
  }, [isLocationOpen]);

  // Click outside listener
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

  // ═══════════════════════════════════════════════════════════════════════════
  // 📍 GPS CURRENT LOCATION AUTO-DETECTION
  // ═══════════════════════════════════════════════════════════════════════════
  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationMessage("Geolocation is not supported by your browser");
      setTimeout(() => setLocationMessage(null), 3000);
      return;
    }

    setIsDetectingLocation(true);
    setLocationMessage("Locating nearest diagnostic center...");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
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
          setLocationMessage(`Located: ${closestLocation.name} (${closestLocation.pincode})`);
          setTimeout(() => {
            setIsDetectingLocation(false);
            setLocationMessage(null);
            setIsLocationOpen(false);
          }, 1000);
        } else {
          setIsDetectingLocation(false);
          setLocationMessage("No nearby center found; defaulted to Kharghar");
          setTimeout(() => setLocationMessage(null), 2500);
        }
      },
      () => {
        setIsDetectingLocation(false);
        setLocationMessage("Location permission denied. Please select your city manually.");
        setTimeout(() => setLocationMessage(null), 3000);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // 📍 LOCATION FILTERING (All 353 Locations + PIN Codes + Regions)
  // ═══════════════════════════════════════════════════════════════════════════
  const filteredLocations = useMemo(() => {
    const q = locationQuery.trim().toLowerCase();
    let pool = LOCATION_DATABASE;

    if (activeRegionTab !== "all") {
      pool = pool.filter((loc) => loc.region === activeRegionTab);
    }

    if (!q) {
      return pool.slice(0, 18);
    }

    // Filter by PIN code, micro-neighbourhood, city or region
    return pool.filter((loc) => 
      loc.pincode.includes(q) ||
      loc.name.toLowerCase().includes(q) ||
      loc.city.toLowerCase().includes(q) ||
      loc.regionName.toLowerCase().includes(q) ||
      loc.formattedAddress.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [locationQuery, activeRegionTab]);

  // ═══════════════════════════════════════════════════════════════════════════
  // 🔍 COMPREHENSIVE SEARCH SCORING ENGINE (Services + Products + Doctors)
  // ═══════════════════════════════════════════════════════════════════════════
  const searchResults = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return [];

    const tokens = rawQuery.split(/\s+/).filter(Boolean);
    const results: SitemapSearchResult[] = [];

    const matchScore = (target: string): number => {
      const lower = target.toLowerCase();
      let score = 0;
      for (const token of tokens) {
        if (lower === token) score += 12;
        else if (lower.startsWith(token)) score += 6;
        else if (lower.includes(token)) score += 2;
        else return 0;
      }
      return score;
    };

    // 1. Core Pages
    CORE_PAGES.forEach((page) => {
      const score = matchScore(page.title);
      if (score > 0) {
        results.push({
          type: "page",
          title: page.title,
          subtitle: "Henotic Diagnostics Hub",
          url: page.url,
          badge: page.badge,
          icon: ArrowRight,
          score: score + 15
        });
      }
    });

    // 2. All 401 Diagnostic Services (Mapped to active location)
    services.forEach((slug) => {
      const name = formatSlug(slug);
      const score = Math.max(matchScore(name), matchScore(slug));
      if (score > 0) {
        const category = SERVICE_CATEGORY_MAP[slug] || "Diagnostic Service";
        const IconComponent = CATEGORY_ICONS[category] || Orbit;
        results.push({
          type: "service",
          title: name,
          subtitle: `Available in ${selectedLocation.displayName} (PIN ${selectedLocation.pincode})`,
          url: `/services/${slug}/${selectedLocation.region}/${selectedLocation.city}`,
          badge: category,
          icon: IconComponent,
          score: score + 25
        });
      }
    });

    // 3. GMC Products (Health checkup packages with prices)
    GMC_PRODUCTS.forEach((product) => {
      const prodText = `${product.title} ${product.description} ${product.category}`;
      const score = Math.max(matchScore(product.title), matchScore(prodText));
      if (score > 0) {
        results.push({
          type: "product",
          title: product.title,
          subtitle: `₹${product.price.toLocaleString()} (MRP ₹${product.mrp.toLocaleString()}) • Same Day Report`,
          url: `/products/${product.slug}`,
          badge: product.category,
          icon: ShoppingBag,
          score: score + 22
        });
      }
    });

    // 4. Specialist Doctors & Radiologists
    DOCTORS.forEach((doc) => {
      const doctorText = `${doc.name} ${doc.designation} ${doc.credentials} ${doc.specializations.join(" ")}`;
      const score = Math.max(matchScore(doc.name), matchScore(doctorText));
      if (score > 0 || tokens.some(t => "doctor".includes(t) || "dr".includes(t) || "radiologist".includes(t))) {
        results.push({
          type: "doctor",
          title: doc.name,
          subtitle: `${doc.designation} (${doc.credentials})`,
          url: `/doctors/${doc.id}`,
          badge: "Specialist",
          icon: UserCheck,
          score: (score > 0 ? score : 3) + 18
        });
      }
    });

    // 5. Medical Conditions & Symptoms
    CONDITIONS.forEach((cond) => {
      const condText = `${cond.title} ${cond.description} ${cond.symptoms.join(" ")}`;
      const score = Math.max(matchScore(cond.title), matchScore(condText));
      if (score > 0) {
        results.push({
          type: "condition",
          title: cond.title,
          subtitle: `Symptoms & Diagnostics (${cond.bodySystem})`,
          url: `/conditions/${cond.id}`,
          badge: "Condition",
          icon: Stethoscope,
          score: score + 10
        });
      }
    });

    // 6. Scan Comparisons
    COMPARISONS.forEach((comp) => {
      const compText = `${comp.title} ${comp.metaDescription}`;
      const score = Math.max(matchScore(comp.title), matchScore(compText));
      if (score > 0) {
        results.push({
          type: "comparison",
          title: comp.title,
          subtitle: comp.metaDescription || "Diagnostic test comparison",
          url: `/compare/${comp.slug}`,
          badge: "Comparison",
          icon: Scale,
          score: score + 8
        });
      }
    });

    // 7. Location Hubs (from 353 locations)
    LOCATION_DATABASE.forEach((loc) => {
      const locText = `${loc.name} ${loc.regionName} ${loc.pincode} ${loc.city}`;
      const score = matchScore(locText);
      if (score > 0) {
        results.push({
          type: "location",
          title: `Diagnostic Center in ${loc.name}`,
          subtitle: `Serving PIN ${loc.pincode} • ${loc.regionName}`,
          url: `/services/diagnostic-center/${loc.region}/${loc.slug}`,
          badge: `PIN ${loc.pincode}`,
          icon: MapPin,
          score: score + 12
        });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, 16);
  }, [searchQuery, selectedLocation]);

  // Navigate handler
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
      router.push(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div 
      suppressHydrationWarning 
      className="w-full relative z-40 px-3 sm:px-6 md:px-8 py-3.5 sm:py-5 transition-all"
    >
      {/* 🌟 3D VOLUMETRIC BACKDROP GLOW (Soft atmospheric light behind glass) */}
      <div 
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-16 bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 blur-2xl rounded-full pointer-events-none -z-10"
      />

      <div ref={containerRef} className="max-w-5xl mx-auto">
        
        {/* ================================================================= */}
        {/* 🌟 DEEP 3D NEO-GLASS SEARCH CONSOLE                             */}
        {/* ================================================================= */}
        <form
          onSubmit={handleFormSubmit}
          suppressHydrationWarning
          className={`
            relative flex flex-col lg:flex-row items-stretch gap-2 lg:gap-0 p-2 sm:p-2.5
            rounded-2xl sm:rounded-3xl
            bg-white/90 backdrop-blur-2xl
            border border-white/95
            transition-all duration-300 ease-out
            shadow-[0_22px_45px_-12px_rgba(25,18,50,0.18),0_10px_20px_-6px_rgba(25,18,50,0.10),0_2px_4px_rgba(25,18,50,0.05),inset_0_2px_0_rgba(255,255,255,1),inset_0_-2px_3px_rgba(0,0,0,0.04)]
            hover:shadow-[0_28px_60px_-12px_rgba(25,18,50,0.24),0_14px_28px_-6px_rgba(25,18,50,0.14),inset_0_2px_0_rgba(255,255,255,1)]
            hover:-translate-y-0.5
            focus-within:border-blue-400/60
            focus-within:shadow-[0_30px_70px_-10px_rgba(69,104,220,0.28),0_12px_24px_-4px_rgba(176,106,179,0.2),inset_0_2px_0_rgba(255,255,255,1)]
            focus-within:ring-2 focus-within:ring-[#4568dc]/30
          `}
        >
          {/* =============================================================== */}
          {/* 📍 3D SEGMENT 1: TACTILE LOCATION SELECTOR PILL                 */}
          {/* =============================================================== */}
          <div className="relative lg:w-[310px] shrink-0">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsSearchOpen(false);
              }}
              className={`
                w-full flex items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:py-3 text-left
                rounded-xl sm:rounded-2xl
                bg-gradient-to-b from-white/90 to-slate-50/70 hover:from-white hover:to-slate-100/90
                border border-slate-200/70 hover:border-slate-300
                shadow-[0_2px_6px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]
                active:scale-[0.99] transition-all duration-200 cursor-pointer group
              `}
            >
              {/* 3D GPS Icon Badge */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#E55D87] to-[#b06ab3] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(229,93,135,0.4),inset_0_1px_0_rgba(255,255,255,0.5)] shrink-0 group-hover:scale-105 transition-transform">
                <MapPin size={18} className="drop-shadow-xs" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse" />
              </div>

              {/* Text Hierarchy */}
              <div className="flex flex-col min-w-0 flex-grow text-left leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#E55D87]">
                    Location
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 px-1.5 py-0.2 bg-slate-100/90 rounded border border-slate-200/50">
                    PIN {selectedLocation.pincode}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-extrabold text-slate-800 truncate mt-0.5 group-hover:text-blue-900 transition-colors">
                  {selectedLocation.displayName}
                  <span className="text-xs text-slate-500 font-semibold ml-1.5">
                    ({selectedLocation.regionName})
                  </span>
                </span>
              </div>

              {/* 3D Rotating Chevron */}
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-pink-50 group-hover:text-pink-600 transition-colors">
                <ChevronDown 
                  size={14} 
                  className={`transition-transform duration-300 ease-out ${isLocationOpen ? "rotate-180 text-pink-600" : ""}`} 
                />
              </div>
            </button>

            {/* ============================================================= */}
            {/* 📍 3D LOCATION AUTOCOMPLETE MODAL / DROPDOWN                  */}
            {/* ============================================================= */}
            {isLocationOpen && (
              <div 
                suppressHydrationWarning 
                className={`
                  absolute top-[115%] left-0 w-full sm:w-[420px] md:w-[460px] max-w-[calc(100vw-32px)]
                  bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl
                  border border-white/90
                  shadow-[0_28px_60px_-12px_rgba(20,15,45,0.28),0_12px_24px_-6px_rgba(20,15,45,0.14),inset_0_1.5px_0_rgba(255,255,255,1)]
                  p-3.5 sm:p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800
                `}
              >
                {/* Header with Title & GPS Auto-Detect Button */}
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Navigation size={14} className="text-[#4568dc]" />
                      Select Diagnostic Center Hub
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium">350+ Micro-neighbourhoods & PIN Codes Covered</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={isDetectingLocation}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#4568dc] text-[11px] font-black border border-blue-200/60 shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Crosshair size={13} className={isDetectingLocation ? "animate-spin text-pink-500" : ""} />
                    <span>{isDetectingLocation ? "Detecting..." : "Use GPS"}</span>
                  </button>
                </div>

                {/* Status Message (if detecting or error) */}
                {locationMessage && (
                  <div className="mb-2.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-[11px] font-bold border border-blue-200/60 flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 size={13} className="text-blue-600 shrink-0" />
                    <span>{locationMessage}</span>
                  </div>
                )}

                {/* Search Input for Areas or PIN */}
                <div className="relative mb-2.5">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    ref={locationInputRef}
                    type="text"
                    placeholder="Search by locality, sector, or 6-digit PIN..."
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    suppressHydrationWarning
                    className="w-full pl-9 pr-8 py-2 text-base sm:text-xs font-bold text-slate-800 bg-slate-50/90 border border-slate-200 rounded-xl outline-none focus:border-[#4568dc] focus:bg-white focus:ring-2 focus:ring-[#4568dc]/20 transition-all placeholder:text-slate-400 placeholder:font-normal"
                  />
                  {locationQuery && (
                    <button
                      type="button"
                      onClick={() => setLocationQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>

                {/* Region Filter Tabs (scrollable horizontally) */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 scrollbar-none">
                  {REGION_TABS.map((tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveRegionTab(tab.value)}
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg shrink-0 transition-all cursor-pointer ${
                        activeRegionTab === tab.value
                          ? "bg-gradient-to-r from-[#4568dc] to-[#b06ab3] text-white shadow-xs"
                          : "bg-slate-100/90 text-slate-600 hover:bg-slate-200/90"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Fast Popular Chips (when query is empty) */}
                {!locationQuery && (
                  <div className="mb-2.5 px-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">
                      Popular Hubs
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_LOCATIONS.map((pop) => {
                        const isSelected = selectedLocation.city === pop.city;
                        return (
                          <button
                            key={pop.city}
                            type="button"
                            onClick={() => {
                              setSelectedLocation(pop);
                              setIsLocationOpen(false);
                            }}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                              isSelected
                                ? "bg-gradient-to-r from-[#E55D87] to-[#b06ab3] text-white shadow-xs"
                                : "bg-slate-100 hover:bg-slate-200/80 text-slate-700"
                            }`}
                          >
                            <span>{pop.displayName}</span>
                            <span className={`text-[9px] px-1 rounded ${isSelected ? "bg-white/20 text-white" : "bg-white text-slate-500"}`}>
                              {pop.pincode}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Scrollable Locations List */}
                <div className="max-h-56 overflow-y-auto scrollbar-thin pr-1 space-y-1">
                  <div className="px-1 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>{locationQuery ? "Matching Localities" : "Serving Areas"}</span>
                    <span className="text-[9px] font-semibold text-slate-500">{filteredLocations.length} Locations</span>
                  </div>

                  {filteredLocations.map((loc) => {
                    const isSelected = selectedLocation.city === loc.slug;
                    return (
                      <button
                        key={`${loc.region}-${loc.slug}-${loc.id}`}
                        type="button"
                        onClick={() => {
                          setSelectedLocation({
                            city: loc.slug,
                            region: loc.region,
                            displayName: loc.name,
                            regionName: loc.regionName,
                            pincode: loc.pincode
                          });
                          setIsLocationOpen(false);
                          setLocationQuery("");
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer group ${
                          isSelected
                            ? "bg-pink-50/90 text-pink-700 font-extrabold border border-pink-200/60"
                            : "hover:bg-slate-100/80 text-slate-700 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <MapPin size={13} className={isSelected ? "text-pink-600 shrink-0" : "text-slate-400 group-hover:text-slate-600 shrink-0"} />
                          <div className="min-w-0">
                            <span className="font-extrabold text-slate-800 group-hover:text-[#4568dc] transition-colors block truncate">
                              {loc.name}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium block truncate">
                              {loc.regionName} {loc.hasHomeCollection ? "• Home Collection Available" : ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-[10px] font-mono font-bold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200/70 shadow-xs">
                            {loc.pincode}
                          </span>
                          {isSelected && <Check size={14} className="text-pink-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* =============================================================== */}
          {/* 🌟 3D ETCHED GLASS DIVIDER (Desktop Only)                       */}
          {/* =============================================================== */}
          <div 
            aria-hidden="true"
            className="hidden lg:block w-[1.5px] h-10 self-center mx-2 bg-gradient-to-b from-transparent via-slate-300 to-transparent shadow-[1px_0_0_rgba(255,255,255,0.9)]" 
          />

          {/* =============================================================== */}
          {/* 🔍 3D SEGMENT 2: LIVE MEDICAL INTENT SEARCH BAR                 */}
          {/* =============================================================== */}
          <div className="relative flex-grow flex items-center min-w-0">
            <div className="relative w-full flex items-center px-3 sm:px-4 py-2 sm:py-2.5">
              
              {/* 3D Magnifying Lens Badge */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 text-[#4568dc] flex items-center justify-center border border-indigo-100/80 shadow-xs shrink-0 mr-2.5">
                <Search size={17} className="drop-shadow-xs" />
              </div>

              {/* Main Input Field */}
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search MRI, CT Scan, blood test, doctors, locations..."
                value={searchQuery}
                onFocus={() => {
                  setIsLocationOpen(false);
                  setIsSearchOpen(true);
                }}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  setIsLocationOpen(false);
                  setIsSearchOpen(true);
                }}
                suppressHydrationWarning
                className="w-full text-slate-800 placeholder-slate-400 text-base sm:text-sm md:text-base font-bold outline-none bg-transparent"
              />

              {/* Clear (X) Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center p-1 mr-2 transition-colors cursor-pointer shrink-0"
                >
                  <X size={13} />
                </button>
              )}

              {/* Keyboard Shortcut Hint (Desktop) */}
              <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-slate-500 bg-slate-100/90 border border-slate-200/80 px-2 py-0.5 rounded-md shrink-0 shadow-xs mr-2">
                ⌘K
              </span>

              {/* =========================================================== */}
              {/* 🚀 3D SEGMENT 3: GRADIENT SEARCH & BOOK ACTION BUTTON       */}
              {/* =========================================================== */}
              <button
                type="submit"
                className={`
                  relative shrink-0 flex items-center justify-center gap-1.5 sm:gap-2
                  px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl
                  text-white font-black text-xs sm:text-sm tracking-wide
                  bg-gradient-to-r from-[#4568dc] via-[#7d4bbb] to-[#b06ab3]
                  shadow-[0_8px_20px_-3px_rgba(176,106,179,0.5),0_3px_6px_rgba(69,104,220,0.3),inset_0_1px_1px_rgba(255,255,255,0.45)]
                  hover:shadow-[0_12px_26px_-2px_rgba(176,106,179,0.65),inset_0_1px_1px_rgba(255,255,255,0.6)]
                  hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98]
                  transition-all duration-200 cursor-pointer overflow-hidden group
                `}
              >
                {/* 3D Sheen Reflection Layer */}
                <div 
                  aria-hidden="true"
                  className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" 
                />
                <Search size={15} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>

            {/* ============================================================= */}
            {/* 🔍 3D MEDICAL AUTOCOMPLETE MODAL / DROPDOWN                  */}
            {/* ============================================================= */}
            {isSearchOpen && (
              <div 
                suppressHydrationWarning 
                className={`
                  absolute top-[115%] left-0 right-0
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

                    {/* Quick Category Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3 px-1">
                      {[
                        { label: "⚡ 3T MRI", slug: "mri-scan" },
                        { label: "🔬 128 CT Scan", slug: "ct-scan" },
                        { label: "🩸 Blood Tests", slug: "blood-test" },
                        { label: "🩺 Full Body Checkup", slug: "full-body-check-up" },
                        { label: "👶 4D Ultrasound", slug: "ultrasound" },
                        { label: "❤️ 2D Echo", slug: "2d-echo" },
                        { label: "🎗️ PET-CT Scan", slug: "pet-scan" },
                      ].map((chip) => (
                        <button
                          key={chip.slug}
                          type="button"
                          onClick={() => handleSelectResult(`/services/${chip.slug}/${selectedLocation.region}/${selectedLocation.city}`)}
                          className="text-[11px] font-extrabold px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 text-slate-700 hover:text-blue-700 border border-slate-200/70 hover:border-blue-200 transition-all cursor-pointer shadow-xs"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>

                    {/* Trending Grid Items */}
                    <div className="grid sm:grid-cols-2 gap-1.5">
                      {TRENDING_SEARCHES.map((item) => {
                        const IconComp = item.icon || Activity;
                        return (
                          <button
                            key={item.slug}
                            type="button"
                            onClick={() => handleSelectResult(`/services/${item.slug}/${selectedLocation.region}/${selectedLocation.city}`)}
                            className="text-left p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 border border-transparent hover:border-blue-100 transition-all flex items-center justify-between group cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-xl bg-blue-50 group-hover:bg-[#4568dc] text-[#4568dc] group-hover:text-white flex items-center justify-center shrink-0 shadow-xs transition-colors">
                                <IconComp size={16} />
                              </div>
                              <div className="min-w-0">
                                <span className="text-xs font-black text-slate-800 group-hover:text-[#4568dc] block truncate transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium block truncate">
                                  {item.subtitle}
                                </span>
                              </div>
                            </div>
                            <span className="text-[9px] font-black uppercase text-slate-500 bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-800 px-2 py-0.5 rounded-md shrink-0 ml-1">
                              {item.category}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── CASE B: WHEN PATIENT TYPES A QUERY -> LIVE SEARCH RESULTS ── */}
                {searchQuery.trim().length > 0 && (
                  <div>
                    {/* Header */}
                    <div className="px-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={13} className="text-amber-500" />
                        Matches for &ldquo;{searchQuery}&rdquo;
                      </span>
                      <span className="text-[10px] font-bold text-[#4568dc] bg-blue-50 px-2 py-0.5 rounded-full">
                        {searchResults.length} {searchResults.length === 1 ? "Result" : "Results"}
                      </span>
                    </div>

                    {/* No matches */}
                    {searchResults.length === 0 ? (
                      <div className="p-6 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2 shadow-inner">
                          <Search size={20} />
                        </div>
                        <h4 className="text-sm font-black text-slate-800 mb-1">
                          No direct matches for &ldquo;{searchQuery}&rdquo;
                        </h4>
                        <p className="text-xs text-slate-500 max-w-sm mx-auto mb-3">
                          Press Enter to browse all 400+ diagnostic tests, scans, and packages in our complete directory.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleSelectResult(`/services?search=${encodeURIComponent(searchQuery)}`)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#4568dc] to-[#b06ab3] text-white text-xs font-black shadow-md hover:shadow-lg transition-all"
                        >
                          Browse Full Services Directory →
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {searchResults.map((item, idx) => {
                          const IconComponent = item.icon || Orbit;
                          return (
                            <button
                              key={`${item.url}-${idx}`}
                              type="button"
                              onClick={() => handleSelectResult(item.url)}
                              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50/90 hover:to-indigo-50/90 border border-transparent hover:border-blue-100/80 transition-all flex items-center justify-between group cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-8 h-8 rounded-xl bg-blue-50 group-hover:bg-[#4568dc] text-[#4568dc] group-hover:text-white flex items-center justify-center shrink-0 shadow-xs transition-colors">
                                  <IconComponent size={16} />
                                </div>
                                <div className="min-w-0">
                                  <span className="text-xs sm:text-sm font-extrabold text-slate-800 group-hover:text-blue-700 block truncate transition-colors">
                                    {item.title}
                                  </span>
                                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium block truncate">
                                    {item.subtitle}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-800 px-2.5 py-1 rounded-lg shrink-0 ml-2 shadow-xs transition-colors">
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
            )}
          </div>
        </form>

      </div>
    </div>
  );
}