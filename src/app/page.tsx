import HeroMedical from "@/components/home/HeroMedical";
import HomeBookingSection from "@/components/home/HomeBookingSection";
import PremiumRateCards from "@/components/home/PremiumRateCards";
import ServiceLines from "@/components/home/ServiceLines";
import MedicalTechnology from "@/components/home/MedicalTechnology";
import FacilityShowcase from "@/components/home/FacilityShowcase";
import DoctorsTrustSignals from "@/components/home/DoctorsTrustSignals";
import CorporateVideo from "@/components/home/CorporateVideo";
import Accreditations from "@/components/home/Accreditations";
import GoogleReviews from '@/components/features/reviews/GoogleReviews';

export const metadata = {
  title: "Henotic Diagnostics | Premier Diagnostic Center in Mumbai",
  description: "Book highly accurate, NABL-accredited imaging and pathology tests with same-day reports. Find your nearest center in Mumbai & Navi Mumbai.",
};

export default function HomePage() {
  return (
    <main className="w-full flex flex-col bg-white overflow-hidden mt-[80px]">
      <HeroMedical />
      
      {/* 🌟 New Premium Booking Section Injected Here! */}
      <HomeBookingSection />
      
      <PremiumRateCards />
      <ServiceLines />
      <MedicalTechnology />
      <FacilityShowcase />
      <DoctorsTrustSignals />
      
      {/* 🌟 Premium Trust Signal Section Included Here! */}
      <GoogleReviews />
      
      <CorporateVideo />
      <Accreditations />
    </main>
  );
}