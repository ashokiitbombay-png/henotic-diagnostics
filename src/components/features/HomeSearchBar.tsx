"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, ChevronDown, Activity, Orbit, Droplets, Heart, Baby, Stethoscope, Sparkles } from "lucide-react";
import { REGION_LOCATIONS, REGION_NAMES } from "@/config/locations";
import { services } from "@/config/services";
import { formatSlug } from "@/lib/utils";

// Grouped Service Data with Categories for rich autocomplete
interface FeaturedService {
  slug: string;
  name: string;
  category: "Imaging" | "Pathology" | "Ultrasound" | "Cardiology" | "Pregnancy";
}

const CATEGORY_MAP: Record<string, "Imaging" | "Pathology" | "Ultrasound" | "Cardiology" | "Pregnancy"> = {
  "mri-scan": "Imaging", "mri-brain": "Imaging", "mri-spine": "Imaging", "mri-knee": "Imaging",
  "ct-scan": "Imaging", "hrct-scan": "Imaging", "hrct-chest": "Imaging", "pet-scan": "Imaging", "whole-body-pet-ct": "Imaging",
  "blood-test": "Pathology", "full-body-check-up": "Pathology", "cbc-test": "Pathology", "lipid-profile": "Pathology", "thyroid-test": "Pathology", "hba1c-test": "Pathology", "vitamin-d-test": "Pathology",
  "ultrasound": "Ultrasound", "sonography": "Ultrasound", "usg-scan": "Ultrasound", "abdominal-ultrasound": "Ultrasound", "color-doppler": "Ultrasound",
  "pregnancy-sonography": "Pregnancy", "nt-scan": "Pregnancy", "anomaly-scan": "Pregnancy", "dating-scan": "Pregnancy", "fetal-doppler": "Pregnancy",
  "2d-echo": "Cardiology", "ecg": "Cardiology", "tmt-test": "Cardiology", "holter-monitoring": "Cardiology"
};

const CATEGORY_ICONS = {
  "Imaging": Orbit,
  "Pathology": Droplets,
  "Ultrasound": Activity,
  "Cardiology": Heart,
  "Pregnancy": Baby
};

// Flatten locations into searchable list
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

// Popular locations for fast selection
const POPULAR_LOCATIONS = [
  { city: "kharghar", region: "navi-mumbai" },
  { city: "panvel", region: "navi-mumbai" },
  { city: "vashi", region: "navi-mumbai" },
  { city: "andheri", region: "western-suburbs" },
  { city: "thane-west", region: "thane" },
  { city: "pune-city", region: "pune" }
];

export default function HomeSearchBar() {
  const router = useRouter();

  // Location State (Default: Kharghar, Navi Mumbai)
  const [selectedLocation, setSelectedLocation] = useState<SearchableLocation>({
    city: "kharghar",
    region: "navi-mumbai",
    displayName: "Kharghar",
    regionName: "Navi Mumbai"
  });

  const [locationQuery, setLocationQuery] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Medical Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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
  ).slice(0, 8);

  // Filter Services & Scans
  const filteredServices = services
    .filter((slug) =>
      slug.toLowerCase().includes(searchQuery.toLowerCase().replace(/\s+/g, "-")) ||
      formatSlug(slug).toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 10);

  // Handle final submission/navigation
  const handleNavigate = (serviceSlug: string) => {
    setIsSearchOpen(false);
    setIsLocationOpen(false);
    const targetUrl = `/services/${serviceSlug}/${selectedLocation.region}/${selectedLocation.city}`;
    router.push(targetUrl);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredServices.length > 0) {
      handleNavigate(filteredServices[0]);
    } else {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto relative z-30">
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-full p-2 border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row items-stretch gap-2 transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)]"
      >
        {/* ========================================================= */}
        {/* 📍 LEFT SEGMENT: LOCATION SELECTOR                         */}
        {/* ========================================================= */}
        <div className="relative flex-1 lg:max-w-[280px]">
          <div
            onClick={() => {
              setIsLocationOpen(!isLocationOpen);
              setIsSearchOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl lg:rounded-full hover:bg-slate-100/80 transition-colors cursor-pointer border border-slate-100 lg:border-none"
          >
            <div className="w-9 h-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 shadow-sm">
              <MapPin size={18} />
            </div>
            <div className="flex flex-col text-left overflow-hidden flex-grow">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500">Location</span>
              <span className="text-sm font-bold text-slate-800 truncate">
                {selectedLocation.displayName}, <span className="text-slate-500 font-medium">{selectedLocation.regionName}</span>
              </span>
            </div>
            <ChevronDown size={16} className={`text-slate-500 transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`} />
          </div>

          {/* Location Autocomplete Dropdown */}
          {isLocationOpen && (
            <div className="absolute top-[115%] left-0 w-full md:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Search city or area..."
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500"
                  autoFocus
                />
              </div>

              {!locationQuery && (
                <div className="mb-2 px-2">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-1.5">Popular Cities</span>
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
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-2 block my-1">
                  {locationQuery ? "Matching Locations" : "All Neighborhoods"}
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

        {/* Divider line for Desktop */}
        <div className="hidden lg:block w-[1px] bg-slate-200 my-2"></div>

        {/* ========================================================= */}
        {/* 🔍 RIGHT SEGMENT: MAIN MEDICAL SEARCH INPUT               */}
        {/* ========================================================= */}
        <div className="relative flex-grow flex items-center">
          <div className="relative w-full flex items-center">
            <Search className="absolute left-4 text-slate-500 pointer-events-none" size={20} />
            <input
              type="text"
              placeholder="Search doctors, clinics, MRI, CT, Blood Test, Anomaly Scan..."
              value={searchQuery}
              onFocus={() => {
                setIsSearchOpen(true);
                setIsLocationOpen(false);
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent outline-none font-semibold text-slate-800 text-sm md:text-base placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          {/* Autocomplete Dropdown for Services */}
          {isSearchOpen && (
            <div className="absolute top-[125%] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between px-3 py-1 mb-2 border-b border-slate-100">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-500" /> Available Diagnostics in {selectedLocation.displayName}
                </span>
                <span className="text-[10px] font-bold text-slate-500">250+ Scans & Tests</span>
              </div>

              {filteredServices.length === 0 ? (
                <div className="p-4 text-center text-xs font-semibold text-slate-500">
                  No direct test matches found for "{searchQuery}". Press Enter to view all available options.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredServices.map((slug) => {
                    const name = formatSlug(slug);
                    const category = CATEGORY_MAP[slug] || "Imaging";
                    const CategoryIcon = CATEGORY_ICONS[category] || Activity;

                    return (
                      <button
                        key={slug}
                        type="button"
                        onClick={() => handleNavigate(slug)}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors">
                            <CategoryIcon size={16} />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors block">{name}</span>
                            <span className="text-[10px] text-slate-500 font-medium">Available in {selectedLocation.displayName}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 group-hover:bg-blue-100 group-hover:text-blue-800 px-2 py-1 rounded-md transition-colors">
                          {category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 🔎 GRADIENT SUBMIT BUTTON                                  */}
        {/* ========================================================= */}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-extrabold px-7 py-3.5 rounded-xl lg:rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg shrink-0 cursor-pointer"
        >
          <Search size={18} strokeWidth={2.5} />
          <span className="lg:hidden text-sm">Search Scans</span>
        </button>
      </form>
    </div>
  );
}
