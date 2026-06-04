import HeroMedical from "@/components/home/HeroMedical";
import PremiumRateCards from "@/components/home/PremiumRateCards";
import ServiceLines from "@/components/home/ServiceLines";
import MedicalTechnology from "@/components/home/MedicalTechnology";
import FacilityShowcase from "@/components/home/FacilityShowcase";
import DoctorsTrustSignals from "@/components/home/DoctorsTrustSignals";
import CorporateVideo from "@/components/home/CorporateVideo";
import Accreditations from "@/components/home/Accreditations";
import GoogleReviews from "@/components/home/GoogleReviews";

export default function HomePage() {
  return (
    <main className="w-full flex flex-col bg-white overflow-hidden">
      <HeroMedical />
      <PremiumRateCards />
      <ServiceLines />
      <MedicalTechnology />
      <FacilityShowcase />
      <DoctorsTrustSignals />
      
      {/* 🌟 New Premium Trust Signal Section Included Here! */}
      <GoogleReviews />
      
      <CorporateVideo />
      <Accreditations />
    </main>
  );
}