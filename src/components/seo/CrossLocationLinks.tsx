import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { REGION_LOCATIONS, REGION_NAMES } from '@/config/locations';

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
  const locations = REGION_LOCATIONS[region] || [];
  const siblings = locations.filter((loc) => loc !== currentLocation);

  if (siblings.length === 0) return null;

  const serviceName = formatText(service);
  const regionDisplayName = REGION_NAMES[region] || formatText(region);

  return (
    <section className="py-8 sm:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Container with Glassmorphism ── */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-slate-200/80 shadow-sm p-4 sm:p-8 md:p-10">
          {/* ── Header ── */}
          <div className="flex items-start sm:items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EC6EAD]/15 to-[#3494E6]/15 flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-[#E55D87]" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              Also Available In {regionDisplayName}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 font-medium sm:ml-12 mb-5 sm:mb-8">
            Get <span className="text-slate-700 font-bold">{serviceName}</span> at
            other Henotic Diagnostics centers near you
          </p>

          {/* ── Location Links Grid ── */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {siblings.map((loc) => (
              <Link
                key={loc}
                href={`/services/${service}/${region}/${loc}`}
                prefetch={false}
                className="group relative px-3 py-3 bg-white border border-slate-200/90 rounded-2xl text-xs sm:text-sm font-bold text-slate-800 hover:text-[#3494E6] hover:border-[#3494E6]/40 hover:bg-[#3494E6]/5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-2 min-w-0"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <MapPin
                    size={14}
                    className="text-[#E55D87] group-hover:text-[#3494E6] shrink-0 transition-colors"
                    aria-hidden="true"
                  />
                  <span className="leading-snug break-words">{formatText(loc)}</span>
                </div>
                <ArrowRight
                  size={13}
                  className="text-slate-400 group-hover:text-[#3494E6] group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>

          {/* ── Subtle SEO Footer Text ── */}
          <p className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100/80 text-xs text-slate-500 font-medium leading-relaxed">
            Henotic Diagnostics offers affordable{' '}
            <strong className="text-slate-600">{serviceName}</strong> services across{' '}
            <strong className="text-slate-600">{regionDisplayName}</strong> — including{' '}
            {siblings
              .slice(0, 5)
              .map((loc) => formatText(loc))
              .join(', ')}
            {siblings.length > 5 && `, and ${siblings.length - 5} more locations`}.
            All centers feature NABL-accredited labs, AERB-certified equipment, and
            same-day digital report delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
