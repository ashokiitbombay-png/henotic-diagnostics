import HeroBlock from "@/components/blocks/HeroBlock";
import HomeBookingSection from "@/components/blocks/HomeBookingSection";
import RateCards from "@/components/blocks/RateCards";
import ServiceLines from "@/components/blocks/ServiceLines";
import MedicalTechnology from "@/components/blocks/MedicalTechnology";
import FacilityShowcase from "@/components/blocks/FacilityShowcase";
import DoctorsTrustSignals from "@/components/blocks/DoctorsTrustSignals";
import CorporateVideo from "@/components/blocks/CorporateVideo";
import Accreditations from "@/components/blocks/Accreditations";
import GoogleReviews from '@/components/features/reviews/GoogleReviews';
import PartnerLogos from "@/components/blocks/PartnerLogos";

export const metadata = {
  title: "Henotic Diagnostics | Premier Diagnostic Center in Mumbai",
  description: "Book highly accurate, NABL-accredited imaging and pathology tests with same-day reports. Find your nearest center in Mumbai & Navi Mumbai.",
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
    </main>
  );
}