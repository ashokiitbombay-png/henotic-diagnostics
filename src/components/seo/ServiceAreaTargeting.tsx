import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  FileCheck2,
  Navigation,
  PhoneCall,
  CheckCircle,
  Building,
  Sparkles
} from 'lucide-react';
import { getLocationBySlug, CITY_MICRO_NEIGHBORHOODS } from '@/config/locations';

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
  location
}: ServiceAreaTargetingProps) {
  const loc = getLocationBySlug(location, region);
  const locationName = loc ? loc.name : formatText(location);
  const serviceName = formatText(service);
  const cityName = loc ? loc.city : formatText(region);
  const pincode = loc ? loc.pincode : '410210';
  const turnaround = loc ? loc.homeCollectionTurnaround : '30–60 mins';
  const nearestHub = loc ? loc.nearestPartnerHub : 'Henotic Diagnostics Central Hub';
  const lat = loc ? loc.latitude : 19.033;
  const lng = loc ? loc.longitude : 73.067;

  // Retrieve micro-neighborhoods or fallback
  const microList = (CITY_MICRO_NEIGHBORHOODS[location] && CITY_MICRO_NEIGHBORHOODS[location].length > 0)
    ? CITY_MICRO_NEIGHBORHOODS[location]
    : [locationName, `${locationName} Station`, `Central ${locationName}`, `Main Market`];

  const mapDirectionUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <section className="py-12 px-4 md:px-8" aria-label={`Service area coverage for ${locationName}`}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50/40 rounded-[2.5rem] border border-blue-100 shadow-xl overflow-hidden p-6 md:p-12 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Row */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-black uppercase tracking-wider mb-3">
                <MapPin size={14} className="text-blue-600" />
                Hyper-Local Service Coverage
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {serviceName} in {locationName}, PIN {pincode}
              </h3>
              <p className="text-sm md:text-base text-slate-600 font-medium mt-1">
                Official diagnostic service-area for <strong className="text-slate-800">{locationName}</strong> and adjoining micro-neighbourhoods in {cityName}.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={mapDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition shadow-sm"
              >
                <Navigation size={14} className="text-blue-600" />
                GPS: {lat.toFixed(4)}°N, {lng.toFixed(4)}°E
              </a>

              <a
                href="tel:+918879327184"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
              >
                <PhoneCall size={14} />
                Call Center Support
              </a>
            </div>
          </div>

          {/* 3 Value Proposition Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 relative z-10">
            {/* Pillar 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                24/7 Home Sample Collection
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Certified phlebotomists arrive at your doorstep in <strong className="text-slate-800">{locationName}</strong> within <strong>{turnaround}</strong>. Strict cold-chain sample preservation guaranteed.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle size={14} /> Zero convenience fee for checkups
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <FileCheck2 size={24} />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Same-Day Verified Reports
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get NABL & AERB verified digital reports for your <strong>{serviceName}</strong> delivered directly to your WhatsApp and email within 6–12 hours.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                <CheckCircle size={14} /> MD Radiologist & Pathologist signed
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
                <Building size={24} />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Partner Scan Center
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Serving {locationName}: <strong className="text-slate-800">{nearestHub}</strong>. Equipped with 3.0T MRI, 128-Slice CT, 4D Ultrasound, and digital mammography.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-violet-700">
                <ShieldCheck size={14} /> 100% NABL Accredited Partner
              </div>
            </div>
          </div>

          {/* Micro-Neighbourhood Coverage Tag Cloud */}
          <div className="relative z-10 pt-6 border-t border-slate-200/80">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-amber-500" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Micro-Neighbourhoods, Sectors & Landmarks Covered Near PIN {pincode}:
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {microList.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs font-semibold text-slate-600 shadow-2xs hover:border-blue-400 hover:text-blue-600 transition"
                >
                  <MapPin size={11} className="text-slate-400" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Directory Navigation Shortcut */}
          <div className="relative z-10 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3">
            <span>
              Looking for diagnostics in another part of {cityName}? Browse all areas in our{' '}
              <Link href="/locations" className="text-blue-600 font-bold hover:underline">
                Geographical Directory
              </Link>.
            </span>
            <Link
              href="#booking"
              className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:text-blue-800 transition"
            >
              Book {serviceName} in {locationName} &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
