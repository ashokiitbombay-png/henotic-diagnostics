"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { 
  HEALTH_PACKAGES, 
  HealthPackage, 
  getHealthPackagesSEO,
  getSortedPackagesForCategory
} from '@/config/health-packages';
import PackageCard from './PackageCard';
import PackageDrawer from './PackageDrawer';
import BookingModal from './BookingModal';
import InfrastructureSlider from './InfrastructureSlider';
import PathologistsSection from './PathologistsSection';
import AccreditationsSection from './AccreditationsSection';
import AwardsCoverflow from './AwardsCoverflow';
import TestimonialsSlider from './TestimonialsSlider';

interface HealthPackagesSectionProps {
  serviceSlug?: string;
  serviceName?: string;
  regionName?: string;
  locationName?: string;
  className?: string;
}

export default function HealthPackagesSection({
  serviceSlug = 'health-checkup',
  serviceName,
  regionName,
  locationName,
  className = '',
}: HealthPackagesSectionProps) {
  const seo = useMemo(() => {
    return getHealthPackagesSEO(serviceSlug, regionName, locationName);
  }, [serviceSlug, regionName, locationName]);

  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'Men' | 'Women' | 'Seniors'>(
    seo.defaultFilter || 'ALL'
  );
  const [activeDrawerPackage, setActiveDrawerPackage] = useState<HealthPackage | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<HealthPackage>(HEALTH_PACKAGES[0]);

  useEffect(() => {
    setSelectedFilter(seo.defaultFilter || 'ALL');
  }, [seo.defaultFilter]);

  const basePackages = useMemo(() => {
    return getSortedPackagesForCategory(seo.highlightCategory);
  }, [seo.highlightCategory]);

  const filteredPackages = useMemo(() => {
    if (selectedFilter === 'ALL') return basePackages;
    return basePackages.filter(pkg => pkg.target.includes(selectedFilter));
  }, [selectedFilter, basePackages]);

  const handleOpenDrawer = (pkg: HealthPackage) => {
    setActiveDrawerPackage(pkg);
  };

  const handleCloseDrawer = () => {
    setActiveDrawerPackage(null);
  };

  const handleOpenBooking = (pkg: HealthPackage) => {
    setSelectedPackageForBooking(pkg);
    setIsAppointmentModalOpen(true);
  };  return (
    <section 
      id="health-packages"
      className={`w-full relative overflow-hidden py-12 sm:py-16 md:py-20 text-gray-900 font-sans antialiased selection:bg-purple-200 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #e3f0fc 0%, #edf3fd 25%, #f4effb 60%, #fbe4f3 100%)',
      }}
    >
      {/* Ambient background glow like home page */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#fbc2eb]/30 to-transparent pointer-events-none" />

      {/* Content Body Container */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16 md:space-y-20">

        {/* Section Intro & Filter Pills */}
        <section className="text-center pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200 shadow-sm text-xs font-semibold text-purple-900 mb-4 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span suppressHydrationWarning>{seo.badge}</span>
          </div>
          
          <h2 suppressHydrationWarning className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight">
            {seo.heading}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {seo.subtitle}
          </p>

          {/* Filter Pills */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'ALL', label: `All Checkups (${HEALTH_PACKAGES.length})` },
              { id: 'Men', label: "Men's Health" },
              { id: 'Women', label: "Women's Health" },
              { id: 'Seniors', label: 'Senior Citizens (55+)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id as 'ALL' | 'Men' | 'Women' | 'Seniors')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  selectedFilter === tab.id
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-[1.02]'
                    : 'bg-white/80 backdrop-blur-sm text-gray-600 border-white/60 hover:bg-white hover:text-gray-900 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* 17-Card Grid with 3D Pop-Out Visuals & Medical Curved Lines */}
        <section aria-label="Health Checkup Rate Cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 pt-2">
          {filteredPackages.map((pkg, idx) => (
            <PackageCard 
              key={pkg.id}
              pkg={pkg}
              idx={idx}
              onOpenDrawer={handleOpenDrawer}
              onOpenBooking={handleOpenBooking}
              locationName={locationName || regionName}
            />
          ))}
        </section>

        {/* Laboratory Infrastructure Moving Slider */}
        <InfrastructureSlider />

        {/* Reporting Pathologists */}
        <PathologistsSection />

        {/* Accreditations & Quality Certifications */}
        <AccreditationsSection />

        {/* 3D Coverflow Awards Carousel */}
        <AwardsCoverflow />

        {/* Patient Testimonials Section */}
        <TestimonialsSlider />

      </div>

      {/* DETAILED TEST PROFILE DRAWER */}
      <PackageDrawer 
        pkg={activeDrawerPackage}
        onClose={handleCloseDrawer}
        onOpenBooking={handleOpenBooking}
      />

      {/* APPOINTMENT BOOKING MODAL WITH WHATSAPP DISPATCH */}
      <BookingModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        selectedPackage={selectedPackageForBooking}
        onSelectPackage={setSelectedPackageForBooking}
        locationName={locationName}
        regionName={regionName}
      />
    </section>
  );
}
