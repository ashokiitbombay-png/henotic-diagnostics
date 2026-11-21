'use client';

import { useState } from 'react';
import { Dna } from 'lucide-react';
import type { NiptAwardItem, NiptCertificateItem, NiptPageData, NiptPanel } from '@/config/nipt-test';
import { formatNiptINR } from '@/config/nipt-test';
import NiptHeroCard from './NiptHeroCard';
import NiptPanelCard from './NiptPanelCard';
import NiptComparisonTable from './NiptComparisonTable';
import NiptProcessAndPrep from './NiptProcessAndPrep';
import NiptResultsAndReport from './NiptResultsAndReport';
import NiptAuthorityContent from './NiptAuthorityContent';
import NiptInfrastructureSlider from './NiptInfrastructureSlider';
import NiptDoctorsSection from './NiptDoctorsSection';
import NiptCertificatesSection from './NiptCertificatesSection';
import NiptAwardsCoverflow from './NiptAwardsCoverflow';
import NiptTestimonialsSlider from './NiptTestimonialsSlider';
import NiptFaqAndLocationHub from './NiptFaqAndLocationHub';
import NiptPanelDrawer from './NiptPanelDrawer';
import NiptBookingModal from './NiptBookingModal';
import { NiptAwardModal, NiptCertificateModal, NiptSampleReportModal } from './NiptModals';

interface NiptInteractiveSuiteProps {
  data: NiptPageData;
}

/**
 * Client orchestrator for the full NIPT Test authority experience:
 * Conversion hero card, 3D pop-out NIPT panel rate cards, comparison matrix,
 * prerequisites & 8-step workflow, embedded sample PDF viewer, clinical sections,
 * NGS lab slider, doctors, accreditations, awards, Google reviews, FAQs, and modals.
 */
export default function NiptInteractiveSuite({ data }: NiptInteractiveSuiteProps) {
  const { page, panels, trust, locationContext } = data;
  const defaultPanel = panels.find((p) => p.popular) ?? panels[0];
  const minPrice = panels.length ? Math.min(...panels.map((p) => p.offerPrice)) : 10000;

  const [activeDrawerPanel, setActiveDrawerPanel] = useState<NiptPanel | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPanelForBooking, setSelectedPanelForBooking] = useState<NiptPanel | null>(defaultPanel ?? null);
  const [selectedCert, setSelectedCert] = useState<NiptCertificateItem | null>(null);
  const [selectedAward, setSelectedAward] = useState<NiptAwardItem | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const handleOpenBooking = (panel?: NiptPanel) => {
    setSelectedPanelForBooking(panel ?? defaultPanel ?? null);
    setIsBookingOpen(true);
  };

  const areaHeadingSuffix = locationContext?.locationName
    ? ` in ${locationContext.locationName}`
    : locationContext?.regionName
    ? ` in ${locationContext.regionName}`
    : '';

  return (
    <div className="space-y-10 sm:space-y-16">
      {/* 1. Conversion & AEO Quick Summary Card */}
      <NiptHeroCard
        page={page}
        panels={panels}
        trust={trust}
        locationContext={locationContext}
        onOpenBooking={handleOpenBooking}
      />

      {/* 2. 3D Pop-Out NIPT Rate Cards Showcase (Matched to Health Checkup & Home Page Proportions) */}
      <section
        id="nipt-panels"
        aria-labelledby="nipt-rate-cards-heading"
        className="scroll-mt-28 text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-purple-200 shadow-sm text-xs font-semibold text-purple-900 mb-3 tracking-wide uppercase">
          <Dna className="w-3.5 h-3.5 text-purple-600" aria-hidden="true" />
          <span>Choose Your Prenatal Screening Tier</span>
        </div>

        <h2 id="nipt-rate-cards-heading" className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          {page.keyword} Panels &amp; Prices{areaHeadingSuffix}
        </h2>
        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Transparent prenatal cfDNA screening from{' '}
          <span className="font-semibold text-purple-700">₹{formatNiptINR(minPrice)}</span> — zero fetal risk, NABL &amp; MD Genetics verified reporting, and free 24/7 home blood pickup.
        </p>

        <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-8 sm:pt-10 items-stretch">
          {panels.map((panel) => (
            <NiptPanelCard
              key={panel.id}
              panel={panel}
              locationName={locationContext?.locationName || locationContext?.regionName}
              onOpenDrawer={setActiveDrawerPanel}
              onOpenBooking={handleOpenBooking}
            />
          ))}
        </div>
      </section>

      {/* 3. Side-by-Side Comparison Matrix */}
      <NiptComparisonTable />

      {/* 4. Prerequisites, Sample Collection, Instructions & 8-Step Process */}
      <section id="nipt-prerequisites-process" aria-labelledby="nipt-process-heading" className="space-y-12">
        <NiptProcessAndPrep defaultPanel={defaultPanel} onOpenBooking={handleOpenBooking} />
        <NiptResultsAndReport
          defaultPanel={defaultPanel}
          locationContext={locationContext}
          onOpenSampleModal={() => setIsSampleModalOpen(true)}
          onOpenBooking={handleOpenBooking}
        />
      </section>

      {/* 5. Keyword-Tailored Authority Sections & Who Should Book */}
      <NiptAuthorityContent page={page} locationContext={locationContext} />

      {/* 6. Molecular & Genetic Lab Infrastructure Slider */}
      <NiptInfrastructureSlider items={trust.infrastructure} />

      {/* 7. Reporting Doctors (Molecular Genetics & Pathology) */}
      <NiptDoctorsSection doctors={trust.doctors} />

      {/* 8. Certificates & Accreditations */}
      <NiptCertificatesSection certificates={trust.certificates} onSelectCert={setSelectedCert} />

      {/* 9. 3D Coverflow Awards */}
      <NiptAwardsCoverflow
        awards={trust.awards}
        onSelectAward={setSelectedAward}
        modalOpen={selectedAward !== null}
      />

      {/* 10. Verified Google Reviews & Testimonials */}
      <NiptTestimonialsSlider testimonials={trust.testimonials} googleRating={trust.googleRating} />

      {/* 11. AEO/GEO Clinical FAQ Accordion & Local Clinic Conversion Hub */}
      <NiptFaqAndLocationHub
        keyword={page.keyword}
        faqs={page.faqs}
        defaultPanel={defaultPanel}
        locationContext={locationContext}
        onOpenBooking={handleOpenBooking}
      />

      {/* Modals & Drawers */}
      <NiptPanelDrawer
        panel={activeDrawerPanel}
        onClose={() => setActiveDrawerPanel(null)}
        onBook={(panel) => handleOpenBooking(panel)}
      />

      <NiptBookingModal
        open={isBookingOpen}
        panels={panels}
        initialPanel={selectedPanelForBooking}
        pageKeyword={page.keyword}
        locationContext={locationContext}
        onClose={() => setIsBookingOpen(false)}
      />

      <NiptCertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      <NiptAwardModal award={selectedAward} onClose={() => setSelectedAward(null)} />
      <NiptSampleReportModal open={isSampleModalOpen} onClose={() => setIsSampleModalOpen(false)} />
    </div>
  );
}
