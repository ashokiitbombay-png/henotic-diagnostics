"use client";
import React, { useState, useMemo } from 'react';
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
import HealthPackagesSchema from './HealthPackagesSchema';

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
  };

  return (
    <div 
      className={`min-h-screen text-gray-900 font-sans antialiased selection:bg-purple-200 rounded-3xl my-8 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #e3f0fc 0%, #edf3fd 25%, #f4effb 60%, #fbe4f3 100%)',
      }}
    >
      <HealthPackagesSchema 
        serviceSlug={serviceSlug}
        heading={seo.heading}
        regionName={regionName}
        locationName={locationName}
      />

      {/* Content Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 sm:space-y-20">

        {/* Section Intro & Filter Pills */}
        <section className="text-center pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-purple-200 shadow-sm text-xs font-semibold text-purple-900 mb-4 tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>{seo.badge}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight">
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
        <section aria-label="Health Checkup Rate Cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 lg:gap-8 pt-2">
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
    </div>
  );
}
