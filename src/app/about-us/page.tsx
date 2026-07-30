import React from "react";
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import FAQSchema from '@/components/seo/FAQSchema';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import GoogleReviews from "@/components/features/reviews/GoogleReviews";

const AboutBookingForm = dynamic(() => import('./AboutBookingForm'), { ssr: true });
const AboutFaqAccordion = dynamic(() => import('./AboutFaqAccordion'), { ssr: true });

export const metadata: Metadata = {
  title: 'About Henotic Diagnostics | Trusted Diagnostic Center in Navi Mumbai',
  description: 'Learn about Henotic Diagnostics — a NABL-accredited diagnostic imaging center in Kharghar, Navi Mumbai. 12+ years of trusted service with 3.0T MRI, 128-slice CT, and 1030+ Google reviews.',
  alternates: { canonical: 'https://www.henoticdiagnostics.com/about-us' },
  openGraph: {
    title: 'About Henotic Diagnostics | Trusted Diagnostic Center in Navi Mumbai',
    description: 'Learn about Henotic Diagnostics — a NABL-accredited diagnostic imaging center in Kharghar, Navi Mumbai. 12+ years of trusted service with 3.0T MRI, 128-slice CT, and 1030+ Google reviews.',
    images: [{ url: 'https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-waiting-area.webp', width: 1200, height: 630, alt: 'About Henotic Diagnostics | Trusted Diagnostic Center in Navi Mumbai' }],
  },
};

const faqs = [
  {
    category: "🧪 General Diagnostic Services",
    items: [
      { q: "What services does Henotic Diagnostics offer?", a: "Henotic Diagnostics provides a complete range of diagnostic services including blood tests, full-body health checkups, advanced imaging (MRI, CT, PET scan, ultrasound), cardiac diagnostics, and women’s health screening." },
      { q: "Do you provide both in-house and partner center services?", a: "Yes, we offer in-house diagnostic services at our Kharghar center and also provide seamless booking access to certified partner centers across Mumbai and Navi Mumbai." },
      { q: "How can I book a test?", a: "You can book your test via phone, WhatsApp, or through our online platform for quick and convenient scheduling." },
      { q: "Are your reports accurate and reliable?", a: "Absolutely. All tests are conducted using advanced technology and standardized protocols to ensure high diagnostic accuracy." }
    ]
  },
  {
    category: "🔬 Blood Tests & Health Checkups",
    items: [
      { q: "What types of blood tests are available?", a: "We offer routine blood tests, specialized investigations, hormone tests, diabetes screening, lipid profiles, thyroid tests, and more." },
      { q: "Do I need to fast before a blood test?", a: "Some tests require fasting (8–12 hours), while others do not. Our team will guide you based on your requirements." },
      { q: "What is included in a full-body health checkup?", a: "Full-body checkups include blood tests, organ function tests, and screenings designed to assess overall health." }
    ]
  },
  {
    category: "🖥️ Imaging Services (MRI, CT, PET, Ultrasound)",
    items: [
      { q: "What imaging services do you provide?", a: "We offer ultrasound/sonography, CT scans, MRI scans, PET scans, and DEXA bone density scans." },
      { q: "Is an MRI scan safe?", a: "Yes, MRI is a non-invasive and radiation-free imaging technique, making it safe for most patients." },
      { q: "How long does a CT or MRI scan take?", a: "CT scans typically take 5–10 minutes, while MRI scans may take 20–45 minutes." },
      { q: "Do I need a doctor’s prescription for imaging tests?", a: "Yes, most advanced imaging tests require a valid doctor’s prescription." }
    ]
  }
];

const techImages = [
  "https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/henotic-diagnostics-mri-scan-belapur.webp",
  "https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-waiting-area.webp",
  "https://storage.googleapis.com/wp-media-henoticbucket/CT%20SCAN/henotic-diagnostics-ct-scan-kharghar.webp",
  "https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-main-building.webp",
];

const flatFaqs = faqs.flatMap(cat => cat.items.map(item => ({ question: item.q, answer: item.a })));

export default function AboutUsPage() {
  return (
    <div className="w-full font-sans overflow-x-hidden mt-[80px]">
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "About Us", url: "/about-us" }]} />
      <FAQSchema faqs={flatFaqs} />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        .deep-shadow { box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2), 0 10px 20px -5px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5); }
        .deep-shadow-hover:hover { box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3), 0 15px 25px -5px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6); transform: translateY(-8px) scale(1.02); }
      `}} />

      {/* 🏥 Who We Are Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <span className="bg-blue-900 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">Our Story</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-950 leading-tight tracking-tight">
                🏥 About Henotic Diagnostics
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-blue-800">Who We Are</h2>
              <div className="text-base md:text-lg text-slate-700 leading-relaxed space-y-4 font-medium">
                <p>Henotic Diagnostics is a trusted and licensed medical diagnostic and imaging center located in Kharghar, Navi Mumbai. We are committed to delivering accurate, timely, and affordable diagnostic services through a patient-first approach.</p>
                <p>With a strong foundation in both in-house diagnostics and a technology-enabled booking platform, we provide seamless access to advanced medical testing across Mumbai and Navi Mumbai.</p>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0 group">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-15 transition-transform duration-500 group-hover:rotate-6 blur-lg"></div>
              <img width="36" height="36" src="https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp" alt="Henotic Diagnostics MRI Scan" className="relative rounded-[2.5rem] shadow-2xl object-cover h-[350px] md:h-[450px] lg:h-[500px] w-full border-[6px] border-white transition-transform hover:scale-[1.02] duration-500 z-10" fetchPriority="high" decoding="sync" />
            </div>
          </div>
        </div>
      </section>

      {/* 🏢 Technology & Infrastructure (Responsive Carousel) */}
      <section className="py-16 md:py-24 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-950 mb-4 md:mb-6">🏢 Technology & Infrastructure</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium">Equipped with advanced diagnostic technology and modern infrastructure to ensure precise and efficient results.</p>
        </div>
        <div className="w-full relative h-[300px] md:h-[400px] py-6 md:py-8 overflow-hidden flex items-center">
          <div className="animate-marquee">
            {techImages.map((src, index) => (
              <div key={index} className="w-[80vw] sm:w-[320px] md:w-[350px] lg:w-[400px] flex-shrink-0 px-3 md:px-4">
                <img width="36" height="36" src={src} className="w-full h-56 md:h-80 object-cover rounded-3xl deep-shadow border-4 border-white" alt="Technology" fetchPriority="high" decoding="sync" />
              </div>
            ))}
            {techImages.map((src, index) => (
              <div key={`dup-${index}`} className="w-[80vw] sm:w-[320px] md:w-[350px] lg:w-[400px] flex-shrink-0 px-3 md:px-4">
                <img width="36" height="36" src={src} className="w-full h-56 md:h-80 object-cover rounded-3xl deep-shadow border-4 border-white" alt="Technology" fetchPriority="high" decoding="sync" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AboutBookingForm />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-blue-950 mb-4 md:mb-6 text-center">❓ Frequently Asked Questions</h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium text-center mb-12">Get answers to common questions about our diagnostic services.</p>
          <AboutFaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* 🌟 FINAL SECTION: 3D GOOGLE REVIEWS WIDGET ADDED HERE */}
      <GoogleReviews />

    </div>
  );
}