import React from 'react';
import Link from 'next/link';
import { buildLocalLogistics } from '@/lib/seo/local-content-builder';
import { KHARGHAR_HUB } from '@/lib/seo/geo-utils';

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
  const serviceName = formatText(service);
  const logistics = buildLocalLogistics({
    serviceSlug: service,
    serviceName,
    regionSlug: region,
    locationSlug: location,
  });

  const {
    variantIndex: v,
    locationName,
    cityName,
    regionName,
    pincode,
    distanceLabel,
    compassBearing,
    estimatedTransitLabel,
    travelSummary,
    homeCollectionTurnaround,
    supportsHomeCollection,
    microNeighborhoods,
  } = logistics;

  const locLatLongUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${KHARGHAR_HUB.name} from ${locationName} ${pincode}`)}`;

  const badgeLabels = [
    `Local Service Map · PIN ${pincode}`,
    `${locationName} Coverage · ${pincode}`,
    `Service Network · ${regionName} (${pincode})`,
    `PIN ${pincode} Access Corridor`,
    `Area Support · ${locationName}`,
  ];

  const headerSubtitles = supportsHomeCollection
    ? [
        `Home phlebotomy across ${locationName} (${pincode}) synced with our Sector 15, Kharghar automated lab (${distanceLabel} ${compassBearing}).`,
        `Scheduled sample pickup for PIN ${pincode} households in ${locationName}, routed straight to Kharghar Sector 15 (${estimatedTransitLabel}).`,
        `24/7 doorstep draw serving ${locationName}, ${cityName} with direct lab accessioning at Millennium Empire, Kharghar.`,
        `Door-to-lab sample logistics covering ${microNeighborhoods[0] || locationName} (PIN ${pincode}) just ${distanceLabel} from Kharghar.`,
        `Convenient home visit slots across ${locationName} (${regionName}) coordinated with our NABL flagship in Sector 15, Kharghar.`,
      ]
    : [
        `In-center ${serviceName} completed at Sector 15, Kharghar — positioned ${distanceLabel} ${compassBearing} from ${locationName} (PIN ${pincode}).`,
        `Imaging appointments for ${locationName} (${pincode}) run on calibrated equipment in Kharghar Sector 15 (${estimatedTransitLabel}).`,
        `Fixed clinical scanners in Millennium Empire, Kharghar serve ${locationName}, ${cityName} visitors arriving with confirmed slots.`,
        `Reserve zero-wait scan windows at Sector 15, Kharghar (${distanceLabel} from ${microNeighborhoods[0] || locationName}, PIN ${pincode}).`,
        `Stationary diagnostic imaging in Kharghar supporting ${locationName} (${pincode}) residents with digital report release.`,
      ];

  const card1Desc = supportsHomeCollection
    ? [
        `Phlebotomy technicians reach ${locationName} addresses in ${homeCollectionTurnaround} using sealed sterile vacutainers.`,
        `Doorstep blood and specimen visits across PIN ${pincode} run daily with arrival windows around ${homeCollectionTurnaround}.`,
        `Insulated cold-chain carriers protect every ${locationName} sample collected within ${homeCollectionTurnaround} of scheduled time.`,
        `Avoid fasting commutes near ${microNeighborhoods[0] || locationName}: trained collectors reach you inside ${homeCollectionTurnaround}.`,
        `Rapid rider dispatch across ${locationName} (${pincode}) completes sterile draws comfortably at home in minutes.`,
      ][v]
    : [
        `${serviceName} runs exclusively on stationary AERB/PCPNDT-licensed scanners in Sector 15, Kharghar (${distanceLabel} from ${locationName}).`,
        `High-field imaging requires dedicated shielding at our Kharghar center—${distanceLabel} ${compassBearing} of PIN ${pincode}.`,
        `Visitors traveling from ${locationName} complete scans cleanly on calibrated Kharghar flagship systems without wait delays.`,
        `Dedicated scan slots at Millennium Empire, Sector 15 keep visit durations brief for commuters arriving from PIN ${pincode}.`,
        `Certified imaging technologists at our Kharghar hub accommodate ${locationName} patients roughly ${estimatedTransitLabel} away.`,
      ][v];

  const card2Title = [
    `Digital PDFs for ${locationName}`,
    `Fast Results Across PIN ${pincode}`,
    `Verified Clinical Sign-Off`,
    `WhatsApp & Portal Delivery`,
    `Same-Day ${serviceName} Reporting`,
  ][v];

  const card2Desc = [
    `Signed reports for ${serviceName} deliver electronically to ${locationName} patients via WhatsApp without center return trips.`,
    `MD Radiologist and Pathologist review finalizes digital PDFs rapidly for PIN ${pincode} households.`,
    `Access legible findings and printable lab sheets securely on WhatsApp and email right after consultant verification.`,
    `Structured NABL and AERB digital reporting helps ${locationName} doctors begin follow-up care the same day.`,
    `Encrypted report downloads arrive straight to your mobile so ${locationName} visitors never commute twice for films.`,
  ][v];

  const card3Desc = [
    `${travelSummary} Center address: ${KHARGHAR_HUB.streetAddress}, ${KHARGHAR_HUB.addressLocality} ${KHARGHAR_HUB.postalCode}.`,
    `Route from PIN ${pincode}: ${estimatedTransitLabel}. Visit ${KHARGHAR_HUB.streetAddress}, Kharghar.`,
    `Direction corridor (${compassBearing} from ${locationName}): ${travelSummary}`,
    `Located at ${KHARGHAR_HUB.streetAddress}, ${KHARGHAR_HUB.postalCode} — ${distanceLabel} from ${microNeighborhoods[0] || locationName}.`,
    `Open continuously for ${regionName} patients arriving from ${locationName} (${pincode}); ${travelSummary}`,
  ][v];

  return (
    <section className="py-8 sm:py-10 px-4 md:px-8" aria-label={`Service area coverage for ${locationName}`}>
      <div className="max-w-7xl mx-auto">
        <div className="sat-box">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-block px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase tracking-wider mb-3">
                {badgeLabels[v]}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                {serviceName} Coverage in {locationName} ({pincode})
              </h3>
              <p className="text-sm md:text-base text-slate-600 font-medium mt-1">
                {headerSubtitles[v]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a href={locLatLongUrl} target="_blank" rel="noopener noreferrer" className="sat-cta">
                Route to Kharghar ({distanceLabel})
              </a>

              <a href="tel:+918879327184" className="sat-cta-pri">
                Call 088793 27184
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-7">
            <div className="sat-card">
              <h4 className="text-base font-bold text-slate-900 mb-1.5">
                {supportsHomeCollection
                  ? `Home Sample Visit (${locationName})`
                  : `In-Center Scan — Kharghar (${distanceLabel})`}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{card1Desc}</p>
              <div className="mt-3 text-xs font-semibold text-emerald-700">
                ✓ {supportsHomeCollection ? `Active in PIN ${pincode}` : `Reserved slot from ${locationName}`}
              </div>
            </div>

            <div className="sat-card">
              <h4 className="text-base font-bold text-slate-900 mb-1.5">{card2Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{card2Desc}</p>
              <div className="mt-3 text-xs font-semibold text-blue-700">
                ✓ MD Specialist Reviewed
              </div>
            </div>

            <div className="sat-card">
              <h4 className="text-base font-bold text-slate-900 mb-1.5">
                Hub Transit ({distanceLabel} {compassBearing})
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{card3Desc}</p>
              <div className="mt-3 text-xs font-semibold text-violet-700">
                ✓ 24/7 Clinical Assistance
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-200">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2.5">
              Nearby {locationName} Landmarks &amp; Residential Belts (PIN {pincode}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {microNeighborhoods.slice(0, 8).map((tag, idx) => (
                <span key={idx} className="sat-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-3">
            <span>
              Browse full Mumbai &amp; Navi Mumbai coverage in our{' '}
              <Link href="/locations" className="text-blue-600 font-bold hover:underline">
                Location Directory
              </Link>.
            </span>
            <Link href="#booking" className="text-blue-600 font-bold hover:text-blue-800 transition">
              Confirm {serviceName} Slot for {locationName} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
