import React from 'react';
import { buildLocationFAQs } from '@/lib/seo/location-faqs';

interface LocationFAQProps {
  serviceName: string;
  serviceSlug: string;
  locationName: string;
  regionName: string;
  price?: number;
  locationSlug?: string;
  regionSlug?: string;
  pincode?: string;
  distanceKm?: number | null;
  turnaround?: string;
  microNeighborhoods?: string[];
  coveredSectors?: string[];
}

/**
 * Location-Specific Programmatic FAQs (Server Component with native <details>/<summary>).
 */
export default function LocationFAQ({
  serviceName,
  serviceSlug,
  locationName,
  regionName,
  price,
  locationSlug,
  regionSlug,
  pincode,
  distanceKm,
  turnaround,
  microNeighborhoods,
  coveredSectors,
}: LocationFAQProps) {
  const faqs = buildLocationFAQs({
    serviceName,
    serviceSlug,
    locationName,
    regionName,
    price,
    locationSlug,
    regionSlug,
    pincode,
    distanceKm,
    turnaround,
    microNeighborhoods,
    coveredSectors,
  });

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-extrabold uppercase tracking-widest mb-4">
            Local FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            {serviceName} in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">
              {locationName}
            </span>
          </h2>
          <p className="text-slate-500 font-medium mt-3 max-w-xl mx-auto">
            Pricing, preparation, transit, and digital reporting guidance for {locationName} ({pincode ? `PIN ${pincode}` : regionName}).
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} open={index === 0} className="pfaq-item">
              <summary>{faq.question}</summary>
              <div className="pfaq-ans">{faq.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
