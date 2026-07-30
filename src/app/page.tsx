import dynamic from 'next/dynamic';
import HeroBlock from "@/components/blocks/HeroBlock";

// 🚀 Lazy-load ALL below-fold components for faster LCP & reduced JS bundle
const HomeBookingSection = dynamic(() => import("@/components/blocks/HomeBookingSection"));
const RateCards = dynamic(() => import("@/components/blocks/RateCards"));
const ServiceLines = dynamic(() => import("@/components/blocks/ServiceLines"));
const MedicalTechnology = dynamic(() => import("@/components/blocks/MedicalTechnology"));
const FacilityShowcase = dynamic(() => import("@/components/blocks/FacilityShowcase"));
const DoctorsTrustSignals = dynamic(() => import("@/components/blocks/DoctorsTrustSignals"));
const CorporateVideo = dynamic(() => import("@/components/blocks/CorporateVideo"));
const Accreditations = dynamic(() => import("@/components/blocks/Accreditations"));
const GoogleReviews = dynamic(() => import('@/components/features/reviews/GoogleReviews'));
const PartnerLogos = dynamic(() => import("@/components/blocks/PartnerLogos"));
const HomeFAQSection = dynamic(() => import("@/components/blocks/HomeFAQSection"));

export const metadata = {
  title: "Henotic Diagnostics | Premier Diagnostic Center in Mumbai",
  description: "Book highly accurate, NABL-accredited imaging and pathology tests with same-day reports. Find your nearest center in Mumbai & Navi Mumbai.",
  alternates: { canonical: 'https://www.henoticdiagnostics.com' },
};

export default function HomePage() {
  return (
    <main className="w-full flex flex-col bg-white overflow-hidden mt-[80px]">
      <HeroBlock variant="home" />
      
      {/* 🌟 New Premium Booking Section Injected Here! */}
      <HomeBookingSection />
      
      <RateCards variant="premium" />
      <ServiceLines />
      <MedicalTechnology />
      <FacilityShowcase />
      <DoctorsTrustSignals />
      
      {/* 🌟 Premium Trust Signal Section Included Here! */}
      <GoogleReviews />
      
      <PartnerLogos />
      
      <CorporateVideo />
      <Accreditations />
      <HomeFAQSection />
    </main>
  );
}