import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { REGION_NAMES } from '@/config/locations';
import {
  getCanonicalServiceSlug,
  getNearestIndexableLocations,
} from '@/lib/seo/indexing-policy';

interface CrossLocationLinksProps {
  service: string;
  region: string;
  currentLocation: string;
}

const formatText = (text: string) =>
  text
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export default function CrossLocationLinks({
  service,
  region,
  currentLocation,
}: CrossLocationLinksProps) {
  const nearestSiblings = getNearestIndexableLocations(
    service,
    region,
    currentLocation,
    8
  );

  // Return null if zero indexable sibling L3 pages exist (e.g. Tier 3 Pune or Tier 2/1B niche pages)
  if (nearestSiblings.length === 0) return null;

  const canonicalService = getCanonicalServiceSlug(service);
  const serviceName = formatText(canonicalService);
  const regionDisplayName = REGION_NAMES[region] || formatText(region);

  return (
    <section className="py-8 sm:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 shadow-sm p-4 sm:p-8 md:p-10">
          <div className="flex items-start sm:items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EC6EAD]/15 to-[#3494E6]/15 flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-[#E55D87]" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              Also Serving Nearby Areas in {regionDisplayName}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium sm:ml-12 mb-5 sm:mb-8">
            Explore nearest <span className="text-slate-700 font-bold">{serviceName}</span> coverage
            pages coordinated via our Sector 15, Kharghar flagship center
          </p>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {nearestSiblings.map((loc) => (
              <Link
                key={loc.slug}
                href={loc.href}
                prefetch={false}
                className="group relative px-3.5 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 hover:text-[#3494E6] hover:border-[#3494E6]/40 hover:bg-[#3494E6]/5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-2 min-w-0"
              >
                <div className="min-w-0 flex-1">
                  <span className="block leading-snug break-words">{loc.name}</span>
                  {loc.distanceKm !== null && (
                    <span className="block text-[11px] font-medium text-slate-500">
                      {loc.distanceKm.toFixed(1)} km away
                    </span>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className="text-slate-400 group-hover:text-[#3494E6] group-hover:translate-x-0.5 transition-all shrink-0 text-sm"
                >
                  →
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100/80 text-xs text-slate-500 font-medium leading-relaxed">
            Henotic Diagnostics offers NABL-accredited{' '}
            <strong className="text-slate-600">{serviceName}</strong> services for{' '}
            <strong className="text-slate-600">{regionDisplayName}</strong> — including{' '}
            {nearestSiblings.slice(0, 4).map((loc) => loc.name).join(', ')} — with
            in-center imaging at Sector 15, Kharghar, doorstep home blood collection where applicable,
            and same-day digital report delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
