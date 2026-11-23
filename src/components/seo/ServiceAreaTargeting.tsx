import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  ShieldCheck,
  Truck,
  FileCheck2,
  Navigation,
  PhoneCall,
  CheckCircle,
  Building,
  Sparkles,
} from 'lucide-react';
import { getLocationBySlug, CITY_MICRO_NEIGHBORHOODS } from '@/config/locations';
import { isHomeCollectionService } from '@/lib/seo/location-faqs';
import {
  KHARGHAR_HUB,
  getDistanceFromHubKm,
  getEstimatedTravelSummary,
} from '@/lib/seo/geo-utils';

interface ServiceAreaTargetingProps {
  service: string;
  region: string;
  location: string;
}

const formatText = (text: string) =>
  text
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export default function ServiceAreaTargeting({
  service,
  region,
  location,
}: ServiceAreaTargetingProps) {
  const loc = getLocationBySlug(location, region);
  const locationName = loc ? loc.name : formatText(location);
  const serviceName = formatText(service);
  const cityName = loc ? loc.city : formatText(region);
  const pincode = loc ? loc.pincode : '410210';
  const turnaround = loc ? loc.homeCollectionTurnaround : '30–60 mins';
  const lat = loc ? loc.latitude : KHARGHAR_HUB.latitude;
  const lng = loc ? loc.longitude : KHARGHAR_HUB.longitude;

  const distanceKm = getDistanceFromHubKm(location, region);
  const distanceLabel = distanceKm !== null ? `${distanceKm.toFixed(1)} km` : 'nearby';
  const travelSummary = getEstimatedTravelSummary(distanceKm ?? 5, region);
  const supportsHomeCollection = isHomeCollectionService(service);

  const microList =
    CITY_MICRO_NEIGHBORHOODS[location] && CITY_MICRO_NEIGHBORHOODS[location].length > 0
      ? CITY_MICRO_NEIGHBORHOODS[location].slice(0, 12)
      : [locationName, `${locationName} Station`, `Central ${locationName}`, `PIN ${pincode}`];

  // Directs patients from their locality's coordinates -> actual Kharghar flagship hub
  const mapDirectionUrl = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${KHARGHAR_HUB.latitude},${KHARGHAR_HUB.longitude}`;

  return (
    <section className="py-8 sm:py-12 px-4 md:px-8" aria-label={`Service area coverage for ${locationName}`}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50/40 rounded-[2.5rem] border border-blue-100 shadow-xl overflow-hidden p-5 sm:p-8 md:p-12 relative">
          {/* Header Row */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-black uppercase tracking-wider mb-3">
                <MapPin size={14} className="text-blue-600" />
                Catchment &amp; Service Delivery — PIN {pincode}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {serviceName} Serving {locationName}, PIN {pincode}
              </h3>
              <p className="text-sm md:text-base text-slate-600 font-medium mt-1">
                {supportsHomeCollection
                  ? `24/7 doorstep sample collection in ${locationName} (${cityName}) processed at our NABL-accredited Sector 15, Kharghar lab (${distanceLabel} from ${locationName}).`
                  : `In-center ${serviceName} performed at our Sector 15, Kharghar flagship center — ${distanceLabel} from ${locationName}, ${cityName}.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={mapDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition shadow-sm"
              >
                <Navigation size={14} className="text-blue-600" />
                Directions to Kharghar Hub ({distanceLabel})
              </a>

              <a
                href="tel:+918879327184"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
              >
                <PhoneCall size={14} />
                Call 088793 27184
              </a>
            </div>
          </div>

          {/* 3 Honest Delivery Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 relative z-10">
            {/* Pillar 1 */}
            <div className="bg-white/90 rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                {supportsHomeCollection ? <Truck size={24} /> : <Building size={24} />}
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                {supportsHomeCollection
                  ? `Home Sample Collection in ${locationName}`
                  : 'In-Center Scan at Sector 15, Kharghar'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {supportsHomeCollection
                  ? `Certified phlebotomists reach your doorstep in ${locationName} within ${turnaround} with cold-chain barcoded vacutainers.`
                  : `All ${serviceName} imaging is performed exclusively on our AERB/PCPNDT-registered scanners in Sector 15, Kharghar (${distanceLabel} away).`}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle size={14} />
                {supportsHomeCollection ? `PIN ${pincode} home pickup active` : 'Zero waiting with prior slot'}
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/90 rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <FileCheck2 size={24} />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Same-Day Verified Digital Reports
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive NABL &amp; AERB verified digital reports for your <strong>{serviceName}</strong> directly via WhatsApp and email without revisiting the center.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                <CheckCircle size={14} /> MD Radiologist &amp; Pathologist signed
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/90 rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
                <Navigation size={24} />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Hub Access ({distanceLabel} from {locationName})
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {travelSummary} Flagship address: {KHARGHAR_HUB.streetAddress}, {KHARGHAR_HUB.addressLocality} {KHARGHAR_HUB.postalCode}.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-violet-700">
                <ShieldCheck size={14} /> Open 24 Hours · 365 Days
              </div>
            </div>
          </div>

          {/* Micro-Neighbourhood Coverage Cloud (lean markup, zero per-pill SVGs) */}
          <div className="relative z-10 pt-6 border-t border-slate-200/80">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-amber-500" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Micro-Neighbourhoods &amp; Landmarks Covered Near PIN {pincode}:
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {microList.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Directory Shortcut */}
          <div className="relative z-10 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3">
            <span>
              Explore all covered PIN codes in our{' '}
              <Link href="/locations" className="text-blue-600 font-bold hover:underline">
                Geographical Directory
              </Link>.
            </span>
            <Link
              href="#booking"
              className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:text-blue-800 transition"
            >
              Book {serviceName} for {locationName} Patients &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
