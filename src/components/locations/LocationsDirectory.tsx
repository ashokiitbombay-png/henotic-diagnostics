'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Building2,
  Navigation,
  CheckCircle,
  Truck,
  ArrowRight,
  Filter,
  Sparkles,
  Stethoscope,
  X
} from 'lucide-react';
import type { LocationItem } from '@/config/locations';

interface LocationsDirectoryProps {
  initialLocations: LocationItem[];
  regionNames: Record<string, string>;
}

// Popular service shortcuts to deep-link into PSEO matrix
const POPULAR_TESTS = [
  { slug: 'mri-scan', label: 'MRI Scan' },
  { slug: 'ct-scan', label: 'CT Scan' },
  { slug: 'full-body-check-up', label: 'Health Checkup' },
  { slug: 'blood-test', label: 'Blood Test' },
  { slug: 'ultrasound', label: 'Ultrasound' }
];

export default function LocationsDirectory({
  initialLocations,
  regionNames
}: LocationsDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // Distinct regions and cities
  const regions = useMemo(() => {
    const list = Object.keys(regionNames).map(slug => ({
      slug,
      name: regionNames[slug]
    }));
    return [{ slug: 'all', name: 'All Zones (350+)' }, ...list];
  }, [regionNames]);

  const cities = useMemo(() => {
    const uniqueCities = Array.from(new Set(initialLocations.map(l => l.city))).sort();
    return ['all', ...uniqueCities];
  }, [initialLocations]);

  // Filtered locations
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return initialLocations.filter(loc => {
      // Region match
      if (selectedRegion !== 'all' && loc.region !== selectedRegion) {
        return false;
      }
      // City match
      if (selectedCity !== 'all' && loc.city !== selectedCity) {
        return false;
      }
      // Search query match (name, pincode, city, region)
      if (!q) return true;
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.pincode.includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.regionName.toLowerCase().includes(q)
      );
    });
  }, [initialLocations, searchQuery, selectedRegion, selectedCity]);

  // Reset to page 1 on filter change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRegionChange = (slug: string) => {
    setSelectedRegion(slug);
    setCurrentPage(1);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedLocations = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  return (
    <div className="w-full">
      {/* ── Search & Filter Controls ─────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-6 md:p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Locality name or 6-digit PIN Code (e.g. Kharghar, 400005, Kothrud)..."
              className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* City Dropdown */}
          <div className="w-full md:w-56">
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full py-3.5 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="all">All Cities ({cities.length - 1})</option>
              {cities.filter(c => c !== 'all').map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Region Pills */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3 text-xs font-black text-slate-400 uppercase tracking-wider">
            <Filter size={14} /> Filter by Zone:
          </div>
          <div className="flex flex-wrap gap-2">
            {regions.map(r => {
              const active = selectedRegion === r.slug;
              return (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => handleRegionChange(r.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Active Filters & Counter Ribbon ────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-2 text-sm">
        <div className="text-slate-600 font-medium">
          Showing <span className="font-bold text-slate-900">{filtered.length}</span> of{' '}
          <span className="font-bold text-slate-900">{initialLocations.length}</span> verified service locations
          {searchQuery && (
            <span className="text-blue-600 ml-1">matching &ldquo;{searchQuery}&rdquo;</span>
          )}
        </div>

        {(searchQuery || selectedRegion !== 'all' || selectedCity !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedCity('all');
              setCurrentPage(1);
            }}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 underline self-start sm:self-auto"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* ── Locations Grid ────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8">
          <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No service locations matched</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            We couldn&apos;t find any location matching &ldquo;{searchQuery}&rdquo;. Try searching by PIN code or selecting another zone.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
              setSelectedCity('all');
            }}
            className="px-5 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow hover:bg-blue-700 transition"
          >
            View All 350+ Locations
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedLocations.map(loc => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${loc.latitude},${loc.longitude}`;

            return (
              <div
                key={`${loc.region}-${loc.slug}-${loc.id}`}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-black">
                      <MapPin size={12} />
                      PIN {loc.pincode}
                    </span>
                    <span className="text-2xs uppercase tracking-wider font-extrabold text-slate-400">
                      {loc.city}
                    </span>
                  </div>

                  {/* Locality Title */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    {loc.name}
                  </h3>

                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {loc.regionName} • {loc.section}
                  </p>

                  {/* Service Availability Info */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                      <Truck size={14} className="flex-shrink-0" />
                      <span>Home Collection within {loc.homeCollectionTurnaround}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <CheckCircle size={14} className="text-blue-500 flex-shrink-0" />
                      <span>Same-Day WhatsApp Report Delivery</span>
                    </div>

                    <div className="flex items-center justify-between text-2xs text-slate-400 pt-1">
                      <span>Coordinates:</span>
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline"
                      >
                        <Navigation size={10} />
                        {loc.latitude.toFixed(4)}°N, {loc.longitude.toFixed(4)}°E
                      </a>
                    </div>
                  </div>
                </div>

                {/* Popular Diagnostics Quick Links */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Available Diagnostic Services:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_TESTS.map(test => (
                      <Link
                        key={test.slug}
                        href={`/services/${test.slug}/${loc.region}/${loc.slug}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-2xs font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                      >
                        {test.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Pagination Controls ───────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
          >
            &larr; Previous
          </button>

          <span className="px-4 py-2 text-xs font-bold text-slate-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
