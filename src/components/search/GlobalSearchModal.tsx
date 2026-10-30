'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  MapPin,
  Activity,
  Orbit,
  Droplets,
  Heart,
  Baby,
  Stethoscope,
  Scale,
  ShoppingBag,
  UserCheck,
  ArrowRight,
  Flame,
  Clock,
  Sparkles,
  Command
} from 'lucide-react';
import { services } from '@/config/services';
import { CONDITIONS } from '@/config/conditions';
import { COMPARISONS } from '@/config/comparisons';
import { DOCTORS } from '@/config/doctors';
import { GMC_PRODUCTS } from '@/config/gmc-products';
import { LOCATION_DATABASE } from '@/config/locations';
import { formatSlug } from '@/lib/utils';

export interface GlobalSearchResult {
  type: 'service' | 'location' | 'condition' | 'comparison' | 'doctor' | 'product' | 'page';
  title: string;
  subtitle: string;
  url: string;
  badge: string;
  icon: any;
  score: number;
}

const POPULAR_SEARCH_CHIPS = [
  { label: '⚡ 3T MRI Scan', query: 'mri' },
  { label: '🔬 128 CT Scan', query: 'ct scan' },
  { label: '🩸 Blood Tests', query: 'blood test' },
  { label: '🩺 Full Body Checkup', query: 'full body' },
  { label: '👶 4D Ultrasound', query: 'ultrasound' },
  { label: '❤️ 2D Echo', query: '2d echo' },
  { label: '🏷️ Pricing & Cost', query: 'pricing' },
];

export default function GlobalSearchModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeLocation, setActiveLocation] = useState({
    city: 'kharghar',
    region: 'navi-mumbai',
    name: 'Kharghar'
  });

  const inputRef = useRef<HTMLInputElement>(null);

  // Restore saved location from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('henotic_active_location');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.city && parsed?.region) {
          setActiveLocation({
            city: parsed.city,
            region: parsed.region,
            name: parsed.displayName || 'Kharghar'
          });
        }
      }
    } catch {
      // fallback
    }
  }, []);

  // Listen for open-global-search custom event or Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-global-search', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-global-search', handleCustomOpen);
    };
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Scoring engine across services, products, doctors, conditions, and locations
  const searchResults = useMemo<GlobalSearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: GlobalSearchResult[] = [];

    const computeScore = (title: string, keywords: string[] = []): number => {
      const lower = title.toLowerCase();
      if (lower === q) return 100;
      if (lower.startsWith(q)) return 80;
      if (lower.includes(` ${q}`)) return 70;
      if (lower.includes(q)) return 50;
      for (const kw of keywords) {
        const kwLower = kw.toLowerCase();
        if (kwLower === q) return 60;
        if (kwLower.includes(q)) return 40;
      }
      return 0;
    };

    // 1. Core Services (Ranked highest)
    services.forEach((slug) => {
      const title = formatSlug(slug);
      const score = computeScore(title, [slug.replace(/-/g, ' ')]);
      if (score > 0) {
        results.push({
          type: 'service',
          title,
          subtitle: `Diagnostic Scan • Available in ${activeLocation.name}`,
          url: `/services/${slug}/${activeLocation.region}/${activeLocation.city}`,
          badge: 'Service',
          icon: Orbit,
          score: score + 15,
        });
      }
    });

    // 2. GMC High-Authority Products
    GMC_PRODUCTS.forEach((prod) => {
      const score = computeScore(prod.title, [prod.category, prod.description]);
      if (score > 0) {
        results.push({
          type: 'product',
          title: prod.title,
          subtitle: `₹${prod.price.toLocaleString('en-IN')} • Save ${Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}%`,
          url: `/gmc/${prod.slug}`,
          badge: 'Package',
          icon: ShoppingBag,
          score: score + 12,
        });
      }
    });

    // 3. Specialist Doctors
    DOCTORS.forEach((doc) => {
      const score = computeScore(doc.name, [doc.designation, ...doc.specializations]);
      if (score > 0) {
        results.push({
          type: 'doctor',
          title: doc.name,
          subtitle: `${doc.designation} • ${doc.experience}`,
          url: `/doctors/${doc.id}`,
          badge: 'Doctor',
          icon: UserCheck,
          score: score + 8,
        });
      }
    });

    // 4. Clinical Conditions
    CONDITIONS.forEach((cond) => {
      const score = computeScore(cond.title, [cond.description, ...(cond.symptoms || [])]);
      if (score > 0) {
        results.push({
          type: 'condition',
          title: cond.title,
          subtitle: 'Recommended diagnostic imaging & symptoms',
          url: `/conditions/${cond.id}`,
          badge: 'Condition',
          icon: Stethoscope,
          score: score + 5,
        });
      }
    });

    // 5. Test Comparisons
    COMPARISONS.forEach((comp) => {
      const score = computeScore(comp.title, [comp.serviceA.name, comp.serviceB.name]);
      if (score > 0) {
        results.push({
          type: 'comparison',
          title: comp.title,
          subtitle: 'Radiation, accuracy & clinical differences',
          url: `/compare/${comp.slug}`,
          badge: 'Compare',
          icon: Scale,
          score: score + 4,
        });
      }
    });

    // 6. Pricing Hub shortcut
    if ('pricing'.includes(q) || 'cost'.includes(q) || 'rate'.includes(q) || 'discount'.includes(q)) {
      results.push({
        type: 'page',
        title: 'Diagnostic Pricing & Cost Estimator',
        subtitle: 'Compare transparent rates for 100+ scans with 30-50% savings',
        url: '/pricing',
        badge: 'Calculator',
        icon: Sparkles,
        score: 95,
      });
    }

    return results.sort((a, b) => b.score - a.score).slice(0, 8);
  }, [query, activeLocation]);

  const handleSelect = useCallback((url: string) => {
    setIsOpen(false);
    router.push(url);
  }, [router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelect(searchResults[selectedIndex].url);
      } else if (query.trim()) {
        handleSelect(`/services/mri-scan/${activeLocation.region}/${activeLocation.city}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global medical search console"
      className="fixed inset-0 z-[999999] flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.8)] overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200 z-10">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <Search size={20} className="text-slate-400 shrink-0 mr-3 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search scans, blood tests, doctors, pricing..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full text-sm sm:text-base font-bold text-slate-900 placeholder-slate-400 bg-transparent outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 mr-2 cursor-pointer"
            >
              <X size={16} />
            </button>
          )}

          <div className="flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-200">
            <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-xs">
              ESC
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-500 transition cursor-pointer"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Location Context Bar */}
        <div className="px-4 py-2 bg-gradient-to-r from-blue-50/60 to-indigo-50/60 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
            <MapPin size={13} className="text-blue-600" />
            Showing availability in: <strong className="text-slate-900">{activeLocation.name}</strong>
          </span>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              router.push('/locations');
            }}
            className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Change Area
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[380px] overflow-y-auto p-3 scrollbar-thin">
          {!query.trim() ? (
            <div>
              {/* Popular quick searches */}
              <div className="mb-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block px-2 mb-2">
                  Popular Diagnostic Inquiries
                </span>
                <div className="flex flex-wrap gap-1.5 px-2">
                  {POPULAR_SEARCH_CHIPS.map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => {
                        setQuery(chip.query);
                        inputRef.current?.focus();
                      }}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 transition cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct links to key hubs */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <button
                  type="button"
                  onClick={() => handleSelect('/pricing')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      ₹
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 block">
                        Diagnostic Cost Estimator
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Compare prices for 100+ scans with 30-50% savings
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-600 transition" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect('/locations')}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-slate-800 group-hover:text-blue-600 block">
                        350+ Micro-Locations &amp; PIN Codes
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Doorstep blood collection &amp; center locator
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-600 transition" />
                </button>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              <Search size={32} className="mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-bold">No exact medical diagnostic matches found</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Try searching for broader terms like &ldquo;MRI&rdquo;, &ldquo;Blood&rdquo;, or &ldquo;Doctor&rdquo;
              </p>
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
                    onClick={() => handleSelect(result.url)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between gap-3 transition cursor-pointer ${
                      isHighlighted
                        ? 'bg-blue-50 text-blue-900 border border-blue-200/80 shadow-xs'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isHighlighted ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <IconComp size={15} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-black text-slate-900 block truncate">
                          {result.title}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block truncate">
                          {result.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 uppercase border border-slate-200/70">
                        {result.badge}
                      </span>
                      <ArrowRight size={13} className="text-slate-400 group-hover:text-blue-600" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span>Navigate with <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">↑</kbd> <kbd className="px-1 py-0.5 bg-white border rounded text-[10px]">↓</kbd></span>
          <span>Select with <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px]">ENTER</kbd></span>
        </div>
      </div>
    </div>
  );
}
