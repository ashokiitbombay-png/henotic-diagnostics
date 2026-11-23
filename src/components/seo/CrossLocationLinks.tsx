import React from 'react';
import Link from 'next/link';
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
    6
  );

  if (nearestSiblings.length === 0) return null;

  const canonicalService = getCanonicalServiceSlug(service);
  const serviceName = formatText(canonicalService);
  const regionDisplayName = REGION_NAMES[region] || formatText(region);

  return (
    <section className="py-8 sm:py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-5 sm:p-8">
          <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight mb-2">
            Also Serving Nearby Areas in {regionDisplayName}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6">
            Explore nearest <strong className="text-slate-700">{serviceName}</strong> coverage pages coordinated via our Sector 15, Kharghar flagship center
          </p>

          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
            {nearestSiblings.map((loc) => (
              <Link
                key={loc.slug}
                href={loc.href}
                prefetch={false}
                className="cll-tile"
              >
                <span>
                  {loc.name}
                  {loc.distanceKm !== null && (
                    <small className="block text-[11px] font-medium text-slate-500">
                      {loc.distanceKm.toFixed(1)} km away
                    </small>
                  )}
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 font-medium leading-relaxed">
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
