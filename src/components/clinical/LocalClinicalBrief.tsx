import React from 'react';
import Link from 'next/link';
import {
  buildLocalLogistics,
  resolveServiceSpecs,
} from '@/lib/seo/local-content-builder';
import { KHARGHAR_HUB } from '@/lib/seo/geo-utils';
import { getPricingForService } from '@/config/pricing';

interface LocalClinicalBriefProps {
  mode: 'region' | 'location';
  serviceSlug: string;
  formattedService: string;
  regionSlug: string;
  regionName: string;
  locationSlug?: string;
  locationName?: string;
}

function formatINR(num: number): string {
  const str = Math.abs(num).toString();
  if (str.length <= 3) return str;
  const lastThree = str.slice(-3);
  const remaining = str.slice(0, -3);
  return remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
}

/**
 * Lean, high-signal Server Component replacing verbatim L1 WordPress dumps on L2/L3 pages.
 */
export default function LocalClinicalBrief({
  mode,
  serviceSlug,
  formattedService,
  regionSlug,
  regionName,
  locationSlug,
  locationName,
}: LocalClinicalBriefProps) {
  const logistics = buildLocalLogistics({
    serviceSlug,
    serviceName: formattedService,
    regionSlug,
    regionName,
    locationSlug,
    locationName,
  });

  const variantKey = locationSlug || regionSlug;
  const specs = resolveServiceSpecs(serviceSlug, formattedService, variantKey);
  const pricing = getPricingForService(serviceSlug);
  const targetPlace =
    mode === 'location' ? `${logistics.locationName} (PIN ${logistics.pincode})` : regionName;

  const headingVariants = [
    `${formattedService} Protocol & Local Care in ${targetPlace}`,
    `Clinical Summary & Appointment Logistics — ${formattedService}, ${targetPlace}`,
    `${formattedService} Overview for ${targetPlace} Patients`,
    `Diagnostic Specifications & ${targetPlace} Access for ${formattedService}`,
    `Preparing for ${formattedService} Around ${targetPlace}`,
  ];

  const guideCtaLabels = [
    `Read the full ${formattedService} clinical guide, indications & medical protocol`,
    `Explore complete ${formattedService} diagnostic indications & full guide`,
    `View full clinical overview & detailed preparation for ${formattedService}`,
    `Open complete ${formattedService} medical reference & scan guide`,
    `See full procedure details & clinical checklist for ${formattedService}`,
  ];

  return (
    <article className="space-y-6 text-slate-700 leading-relaxed">
      <section>
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-3 border border-blue-100">
          {specs.modalityLabel}
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
          {headingVariants[logistics.variantIndex]}
        </h2>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4">
          {specs.clinicalBrief}
        </p>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Need full diagnostic indications, reference parameters, or condition checklists?
          </p>
          <Link
            href={`/services/${logistics.canonicalService}`}
            className="text-xs sm:text-sm font-extrabold text-blue-700 hover:text-blue-900 underline underline-offset-4 shrink-0"
          >
            {guideCtaLabels[logistics.variantIndex]} →
          </Link>
        </div>
      </section>

      <section aria-label={`${formattedService} specifications`}>
        <h3 className="text-base sm:text-lg font-black text-slate-900 mb-3">
          Key {formattedService} Specifications ({mode === 'location' ? logistics.locationName : regionName})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="lcb-spec">
            <div className="lcb-k text-purple-700">
              Equipment &amp; Method
            </div>
            <p className="lcb-v">{specs.equipment}</p>
            <p className="text-[11px] text-slate-500 mt-1">Typical session: {specs.procedureDuration}</p>
          </div>

          <div className="lcb-spec">
            <div className="lcb-k text-indigo-700">
              Fasting &amp; Preparation
            </div>
            <p className="lcb-v">{specs.fastingAndPrep}</p>
          </div>

          <div className="lcb-spec">
            <div className="lcb-k text-emerald-700">
              Report Turnaround (TAT)
            </div>
            <p className="lcb-v">{specs.reportTat}</p>
          </div>

          <div className="lcb-spec">
            <div className="lcb-k text-blue-700">
              Accredited Standard &amp; Fee
            </div>
            <p className="lcb-v">
              {pricing
                ? `Starting ₹${formatINR(pricing.henoticPrice)} (save ${pricing.savings}% vs ₹${formatINR(pricing.marketPrice)} avg)`
                : 'NABL ISO 15189 verified reporting with transparent upfront charges'}
            </p>
          </div>
        </div>
      </section>

      <section className="lcb-box-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-black text-slate-900">
            {logistics.supportsHomeCollection
              ? `Doorstep Collection & Lab Processing — ${targetPlace}`
              : `Center Directions & Scan Access from ${targetPlace}`}
          </h3>
          {mode === 'location' && (
            <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-white border border-blue-200 text-blue-800">
              {logistics.distanceLabel} · PIN {logistics.pincode}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {logistics.fulfillmentNarrative}
        </p>

        <div className="text-xs text-slate-600 font-medium pt-2 border-t border-slate-200 flex flex-wrap gap-x-5 gap-y-1">
          <span>
            <strong className="text-slate-800">Processing Hub:</strong> {KHARGHAR_HUB.addressLocality} ({KHARGHAR_HUB.postalCode})
          </span>
          {mode === 'location' && (
            <span>
              <strong className="text-slate-800">Nearest Pickup / Care Desk:</strong> {logistics.nearestPartnerHub}
            </span>
          )}
        </div>
      </section>

      {logistics.coveredSectors.length > 0 && (
        <section className="lcb-box-g">
          <h3 className="text-sm sm:text-base font-black text-slate-900 mb-2">
            Covered Sectors &amp; PIN Codes in {logistics.locationName}
          </h3>
          <p className="text-xs text-slate-600 mb-3">
            This {logistics.locationName} directory hub coordinates {formattedService} bookings across all local nodes and sector PIN codes below:
          </p>
          <div className="flex flex-wrap gap-2">
            {logistics.coveredSectors.map((sector) => (
              <span key={sector.slug} className="lcb-sec">
                {logistics.locationName} {sector.label} ({sector.pincode || logistics.pincode})
              </span>
            ))}
          </div>
        </section>
      )}

      {logistics.localReview && (
        <section className="lcb-box-a">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              ★ Verified {logistics.locationName} Patient Rating: {logistics.localReview.ratingValue} / 5.0
            </p>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Based on {logistics.localReview.reviewCount} Google reviews from patients in {logistics.locationName} (PIN {logistics.pincode}).
            </p>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white border border-amber-200 text-amber-900 shrink-0">
            NABL · ISO Verified
          </span>
        </section>
      )}
    </article>
  );
}
