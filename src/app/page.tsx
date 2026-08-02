import dynamic from 'next/dynamic';
import HeroBlock from "@/components/blocks/HeroBlock";
import FAQSchema from '@/components/seo/FAQSchema';

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

/**
 * Server-side FAQ data for SSR JSON-LD schema.
 * This ensures FAQ structured data reaches non-JS crawlers (GPTBot, ClaudeBot, etc.)
 * even though the visual HomeFAQSection accordion is a client component.
 */
const homeFaqs = [
  { question: "What diagnostic services does Henotic Diagnostics offer?", answer: "We offer 250+ diagnostic tests including MRI, CT scan, PET-CT, ultrasound, blood tests, 2D Echo, ECG, mammography, DEXA bone scan, and comprehensive health checkup packages." },
  { question: "Where is Henotic Diagnostics located?", answer: "Our main center is at Second Floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd, Sector 15, Kharghar, Panvel, Maharashtra 410210." },
  { question: "What are the operating hours?", answer: "We are open 24 hours a day, 7 days a week, including Sundays and public holidays." },
  { question: "Is Henotic Diagnostics NABL accredited?", answer: "Yes, we are NABL accredited, AERB certified, PCPNDT registered, and ISO certified, ensuring the highest standards of diagnostic accuracy." },
  { question: "How can I book a diagnostic test?", answer: "You can book via WhatsApp at +91 88793 27184, by calling us directly, or through our online booking portal on the website." },
  { question: "How quickly are reports delivered?", answer: "Most reports are available same-day. Blood test reports are typically ready within 4-6 hours, and imaging reports within 24 hours." },
  { question: "What advanced imaging equipment do you have?", answer: "We use a 3.0 Tesla MRI Scanner, 128-Slice CT Scanner, Digital PET-CT, 4D Ultrasound, and fully automated pathology systems." },
  { question: "Do you offer home sample collection?", answer: "Yes, we provide home sample collection services for blood tests and pathology within Mumbai and Navi Mumbai areas." },
];

export const metadata = {
  title: "Henotic Diagnostics | Premier Diagnostic Center in Mumbai",
  description: "Book highly accurate, NABL-accredited imaging and pathology tests with same-day reports. Find your nearest center in Mumbai & Navi Mumbai.",
  alternates: { canonical: 'https://www.henoticdiagnostics.com' },
};

export default function HomePage() {
  return (
    <main className="w-full flex flex-col bg-white overflow-hidden mt-[80px]">
      <HeroBlock variant="home" />

      {/* 🤖 SSR Answer Block — Extractable summary for AI Overviews & LLM citations */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 mb-4">About Henotic Diagnostics</h2>
        <p className="text-lg text-slate-700 leading-relaxed font-medium">
          Henotic Diagnostics is a NABL-accredited medical diagnostic and imaging center in Kharghar, Navi Mumbai. 
          Founded in 2012, it offers 250+ diagnostic tests including 3.0 Tesla MRI, 128-slice CT scan, PET-CT, 
          4D ultrasound, pathology, cardiac diagnostics, and genetic testing. The center operates 24 hours a day, 
          7 days a week, and delivers same-day digital reports. Rated 4.9/5 with over 1,030 Google reviews.
        </p>
      </section>

      {/* 🤖 Server-rendered FAQ Schema — ensures JSON-LD is in SSR HTML for AI crawlers */}
      <FAQSchema faqs={homeFaqs} />
      
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