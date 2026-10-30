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
    pincode: "410210",
  });

  // Query & Open States
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [activeRegionTab, setActiveRegionTab] = useState("all");
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  // Keyboard navigation index
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

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
        setIsLocationOpen(false);
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
        setIsLocationOpen(false);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsLocationOpen(false);
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
  // 📍 LOCATION FILTERING (All 350+ Locations + PIN Codes + Regions)
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
          score: score + 15,
        });
      }
    });

    // 2. High-Authority Products (GMC 17 Packages)
    GMC_PRODUCTS.forEach((prod) => {
      const score = computeScore(prod.title, [prod.category, prod.description]);
      if (score > 0) {
        results.push({
          type: "product",
          title: prod.title,
          subtitle: `₹${prod.price.toLocaleString("en-IN")} • Save ${Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% • NABL Accredited`,
          url: `/gmc/${prod.slug}`,
          badge: "Package",
          icon: ShoppingBag,
          score: score + 12,
        });
      }
    });

    // 3. Medical Specialists / Doctors (12 Profiles)
    DOCTORS.forEach((doc) => {
      const score = computeScore(doc.name, [doc.designation, doc.credentials, ...doc.specializations]);
      if (score > 0) {
        results.push({
          type: "doctor",
          title: doc.name,
          subtitle: `${doc.designation} • ${doc.experience}`,
          url: `/doctors/${doc.id}`,
          badge: "Doctor",
          icon: UserCheck,
          score: score + 8,
        });
      }
    });

    // 4. Clinical Conditions (30 Conditions)
    CONDITIONS.forEach((cond) => {
      const score = computeScore(cond.title, [cond.description, ...(cond.symptoms || [])]);
      if (score > 0) {
        results.push({
          type: "condition",
          title: cond.title,
          subtitle: `Recommended diagnostic scans & symptom analysis`,
          url: `/conditions/${cond.id}`,
          badge: "Condition",
          icon: Stethoscope,
          score: score + 5,
        });
      }
    });

    // 5. Diagnostic Scan Comparisons (12 Comparisons)
    COMPARISONS.forEach((comp) => {
      const score = computeScore(comp.title, [comp.serviceA.name, comp.serviceB.name]);
      if (score > 0) {
        results.push({
          type: "comparison",
          title: comp.title,
          subtitle: `Clinical comparison: radiation, duration & indications`,
          url: `/compare/${comp.slug}`,
          badge: "Compare",
          icon: Scale,
          score: score + 4,
        });
      }
    });

    // 6. Geographic Localities & PIN Codes (Search within location index)
    LOCATION_DATABASE.forEach((loc) => {
      const score = computeScore(loc.name, [loc.pincode, loc.city, loc.regionName]);
      if (score > 40) {
        results.push({
          type: "location",
          title: `${loc.name} Center Hub`,
          subtitle: `PIN ${loc.pincode} • ${loc.regionName} (Home Collection Available)`,
          url: `/services/mri-scan/${loc.region}/${loc.slug}`,
          badge: "Location",
          icon: MapPin,
          score: score - 5,
        });
      }
    });

    // 7. Core Site Architecture Pages
    CORE_PAGES.forEach((page) => {
      const score = computeScore(page.title);
      if (score > 0) {
        results.push({
          type: "page",
          title: page.title,
          subtitle: `Henotic Diagnostics official page`,
          url: page.url,
          badge: page.badge,
          icon: ArrowRight,
          score: score - 10,
        });
      }
    });

    // Sort descending by relevance score, limit to top 10
    return results.sort((a, b) => b.score - a.score).slice(0, 10);
  }, [searchQuery, selectedLocation]);

  // Navigate to Selected Item
  const handleSelectResult = useCallback((url: string) => {
    setIsSearchOpen(false);
    setIsLocationOpen(false);
    router.push(url);
  }, [router]);

  // Keyboard Navigation inside Search Results
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchOpen) return;

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
      } else if (searchQuery.trim()) {
        router.push(`/services/mri-scan/${selectedLocation.region}/${selectedLocation.city}`);
      }
    }
  };

  // Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSelectResult(searchResults[0].url);
    } else if (searchQuery.trim()) {
      router.push(`/services/mri-scan/${selectedLocation.region}/${selectedLocation.city}`);
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
          {/* 📍 SEGMENT 1: TACTILE LOCATION SELECTOR (LEFT)                   */}
          {/* =============================================================== */}
          <div className="relative shrink-0">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => {
                setIsLocationOpen(!isLocationOpen);
                setIsSearchOpen(false);
              }}
              className={`
                flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1.5 text-left
                rounded-xl transition-all duration-200 cursor-pointer group
                hover:bg-slate-100/70 select-none
                max-w-[130px] sm:max-w-[220px] md:max-w-[260px]
              `}
              title={`Active diagnostic center: ${selectedLocation.displayName} (${selectedLocation.regionName})`}
            >
              {/* Clean MapPin Outline Icon (Matching Screenshot) */}
              <MapPin 
                size={18} 
                className="text-slate-500 shrink-0 group-hover:text-blue-600 transition-colors" 
              />

              {/* Location Text (Kharghar bold, Navi Mumbai subtle) */}
              <span className="text-xs sm:text-sm font-black text-slate-800 truncate leading-none group-hover:text-blue-900 transition-colors">
                {selectedLocation.displayName}
                <span className="hidden sm:inline text-xs text-slate-500 font-semibold ml-1">
                  ({selectedLocation.regionName})
                </span>
              </span>

              {/* Subtle Rotating Chevron */}
              <ChevronDown 
                size={14} 
                className={`text-slate-400 shrink-0 transition-transform duration-300 ease-out group-hover:text-slate-600 ${isLocationOpen ? "rotate-180 text-blue-600" : ""}`} 
              />
            </button>

            {/* ============================================================= */}
            {/* 📍 3D LOCATION AUTOCOMPLETE MODAL / DROPDOWN                  */}
            {/* ============================================================= */}
            {isLocationOpen && (
              <div 
                suppressHydrationWarning 
                className={`
                  absolute top-[125%] left-0 w-full sm:w-[420px] md:w-[460px] max-w-[calc(100vw-32px)]
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
                    <p className="text-[10px] text-slate-500 font-medium">350+ Micro-neighbourhoods &amp; PIN Codes Covered</p>
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
                setIsLocationOpen(false);
                setIsSearchOpen(true);
              }}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                setIsLocationOpen(false);
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
                            className="flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-slate-100/90 transition-all cursor-pointer group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                              <IconComp size={15} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                                {item.title}
                              </span>
                              <span className="text-[10px] text-slate-500 font-medium block truncate">
                                {item.subtitle}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── CASE B: WHEN USER TYPES QUERY -> SHOW REAL-TIME SCORED RESULTS ── */}
                {searchQuery.trim() && (
                  <div>
                    <div className="px-2 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
                      <span>Matching Diagnostic Inquiries</span>
                      <span>{searchResults.length} Results</span>
                    </div>

                    {searchResults.length === 0 ? (
                      <div className="p-6 text-center text-slate-500">
                        <Search size={24} className="mx-auto mb-2 text-slate-300" />
                        <p className="text-xs font-bold">No exact diagnostic matches found</p>
                        <p className="text-[11px] text-slate-400 mt-1">Try searching for &quot;MRI&quot;, &quot;CT&quot;, &quot;Blood Test&quot;, or &quot;Doctor&quot;</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {searchResults.map((result, idx) => {
                          const IconComp = result.icon || Activity;
                          const isHighlighted = idx === selectedIndex;

                          return (
                            <button
                              key={`${result.type}-${result.url}-${idx}`}
                              type="button"
                              onClick={() => handleSelectResult(result.url)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-3 transition-all cursor-pointer group ${
                                isHighlighted
                                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 shadow-xs"
                                  : "hover:bg-slate-50 border border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                  isHighlighted
                                    ? "bg-blue-600 text-white shadow-xs"
                                    : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600"
                                }`}>
                                  <IconComp size={15} />
                                </div>
                                <div className="min-w-0">
                                  <span className="text-xs font-black text-slate-800 group-hover:text-blue-600 transition-colors block truncate">
                                    {result.title}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-medium block truncate">
                                    {result.subtitle}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 uppercase">
                                  {result.badge}
                                </span>
                                <ArrowRight size={13} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                              </div>
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
