import React from 'react';
import { MapPin } from 'lucide-react';
import { getLocationBySlug } from '@/config/locations';
import { isHomeCollectionService } from '@/lib/seo/location-faqs';
import { KHARGHAR_HUB, getDistanceFromHubKm } from '@/lib/seo/geo-utils';

const formatSlug = (slug: string) =>
  slug?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') || '';

export default function LocalSEOMastery({
  service,
  region,
  location,
}: {
  service: string;
  region: string;
  location: string;
}) {
  const loc = getLocationBySlug(location, region);
  const serviceName = formatSlug(service);
  const locationName = loc?.name || formatSlug(location);
  const regionName = loc?.regionName || formatSlug(region);
  const pincode = loc?.pincode || '410210';
  const distanceKm = getDistanceFromHubKm(location, region);
  const supportsHomeCollection = isHomeCollectionService(service);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 sm:py-12">
      <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-8 rounded-[2rem] shadow-sm border border-white">
        <h3 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-2">
          <MapPin className="text-[#EC6EAD]" /> Precision {serviceName} Serving {locationName} (PIN {pincode})
        </h3>
        <p className="text-slate-600 leading-relaxed font-medium">
          Patients across <strong>{locationName}</strong> ({regionName}, PIN {pincode}) receive
          NABL-accredited <strong>{serviceName}</strong> coordinated from our Sector 15, Kharghar
          diagnostic hub ({KHARGHAR_HUB.streetAddress},{' '}
          {distanceKm !== null ? `${distanceKm.toFixed(1)} km from ${locationName}` : regionName}).{' '}
          {supportsHomeCollection
            ? `Home sample collection is available within ${loc?.homeCollectionTurnaround || '30–60 mins'} with barcoded cold-chain transport and same-day digital WhatsApp reporting.`
            : `All imaging scans are conducted in-center at Sector 15, Kharghar by certified technologists with MD Radiologist signature and digital WhatsApp report delivery.`}
        </p>
      </div>
    </div>
  );
}
