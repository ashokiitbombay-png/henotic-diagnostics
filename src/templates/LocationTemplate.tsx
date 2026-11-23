import React from "react";
import LocalClinicalBrief from "@/components/clinical/LocalClinicalBrief";
import CrossLocationLinks from "@/components/seo/CrossLocationLinks";
import ServiceAreaTargeting from "@/components/seo/ServiceAreaTargeting";
import RelatedServices from "@/components/seo/RelatedServices";
import PeopleAlsoSearchFor from "@/components/seo/PeopleAlsoSearchFor";
import PricingTable from "@/components/blocks/PricingTable";
import LocationFAQ from "@/components/seo/LocationFAQ";
import { getPricingForService } from "@/config/pricing";
import ServiceHero from '@/components/blocks/ServiceHero';
import HealthPackagesSection from '@/components/health-packages/HealthPackagesSection';
import HealthPackagesSchema from '@/components/health-packages/HealthPackagesSchema';
import { isHealthCheckupService } from '@/config/health-packages';
import MedicalPseoSchema from "@/components/seo/MedicalPseoSchema";
import { buildLocalLogistics } from "@/lib/seo/local-content-builder";
import ClientBookingForm from "@/components/forms/ClientBookingForm";

interface LocationTemplateProps {
  service: string;
  region: string;
  location: string;
  content?: string;
  formattedService: string;
  formattedLocation: string;
  formattedRegion: string;
}

export default function LocationTemplate({
  service,
  region,
  location,
  formattedService,
  formattedLocation,
  formattedRegion
}: LocationTemplateProps) {
  const pricing = getPricingForService(service);
  const logistics = buildLocalLogistics({
    serviceSlug: service,
    serviceName: formattedService,
    regionSlug: region,
    regionName: formattedRegion,
    locationSlug: location,
    locationName: formattedLocation,
  });

  const isHealth = isHealthCheckupService(service);
  const bookingIntro = [
    `Lock a confirmed ${formattedService} slot for ${logistics.locationName} (PIN ${logistics.pincode}) with priority desk callback.`,
    `Submit your preferred timing below—our coordinator confirms fee details and directions or home pickup for ${logistics.locationName}.`,
    `Reserve instant ${formattedService} availability near ${logistics.locationName} with zero hidden booking charges.`,
    `Quick online registration for PIN ${logistics.pincode} visitors: enter contact details for immediate slot assignment.`,
    `Complete the appointment request below to schedule ${formattedService} for ${logistics.locationName}, ${logistics.regionName}.`,
  ][logistics.variantIndex];

  return (
    <div className="min-h-screen bg-slate-50 font-sans mt-[80px] pb-24">
      <MedicalPseoSchema
        type="service"
        serviceSlug={service}
        serviceName={formattedService}
        regionSlug={region}
        locationSlug={location}
      />

      <ServiceHero
        service={service}
        region={region}
        location={location}
        subtitle={logistics.heroSubtitle}
        hideBreadcrumbSchema
      />

      {isHealth && (
        <>
          <HealthPackagesSchema
            serviceSlug={service}
            heading={`${formattedService} Packages`}
            regionName={formattedRegion}
            locationName={formattedLocation}
            regionSlug={region}
            locationSlug={location}
          />
          <HealthPackagesSection
            key={service}
            serviceSlug={service}
            serviceName={formattedService}
            regionName={formattedRegion}
            locationName={formattedLocation}
          />
        </>
      )}

      <section className="max-w-7xl mx-auto px-0 sm:px-4 md:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 sm:gap-8">
          <div className="lt-card">
            <div className="mb-5 pb-4 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-500">
                {logistics.locationName} ({logistics.pincode}) Clinical Summary
              </span>
            </div>

            <LocalClinicalBrief
              mode="location"
              serviceSlug={service}
              formattedService={formattedService}
              regionSlug={region}
              regionName={formattedRegion}
              locationSlug={location}
              locationName={formattedLocation}
            />
          </div>

          <aside className="lg:col-span-1">
            <div className="lt-side">
              <h3 className="text-2xl font-black mb-5 text-slate-900">
                {logistics.sidebarTitle}
              </h3>

              <ul className="space-y-3.5 mb-7">
                {logistics.sidebarBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 font-bold text-sm text-white/95">
                    <span aria-hidden="true">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className="block w-full bg-white text-blue-600 text-center font-black text-base py-3.5 rounded-2xl shadow-lg hover:scale-[1.02] transition-all"
              >
                Book {formattedService} Slot
              </a>
              <p className="text-center text-white/85 text-xs mt-3.5 font-bold">
                {logistics.sidebarFooter}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {!isHealth && (
        <PricingTable serviceSlug={service} serviceName={formattedService} locationName={formattedLocation} />
      )}

      <LocationFAQ
        serviceName={formattedService}
        serviceSlug={service}
        locationName={logistics.locationName}
        regionName={logistics.regionName}
        price={pricing?.henoticPrice}
        locationSlug={location}
        regionSlug={region}
        pincode={logistics.pincode}
        distanceKm={logistics.distanceKm}
        turnaround={logistics.homeCollectionTurnaround}
        microNeighborhoods={logistics.microNeighborhoods}
        coveredSectors={logistics.coveredSectors.map((s) => `${s.label} (${s.pincode || logistics.pincode})`)}
      />

      <CrossLocationLinks service={service} region={region} currentLocation={location} />
      <ServiceAreaTargeting service={service} region={region} location={location} />
      <PeopleAlsoSearchFor currentServiceSlug={service} />
      <RelatedServices currentService={service} region={region} location={location} />

      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-14" id="booking">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#7a1f5c] text-xs font-extrabold uppercase tracking-widest mb-4">
            Instant Slot Request
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Schedule {formattedService} — {logistics.locationName}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-3 max-w-2xl mx-auto">
            {bookingIntro}
          </p>
        </div>

        <ClientBookingForm />
      </section>
    </div>
  );
}
