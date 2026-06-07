"use client";

import React, { useState } from "react";
import GoogleReviews from "@/components/features/reviews/GoogleReviews";

// Raw Data processing for dropdowns
const rawCities = [
  "colaba", "cuffe-parade", "fort", "churchgate", "marine-lines", "nariman-point", "worli", "parel", "lower-parel", "mahalaxmi", "byculla", "dadar",
  "sion", "kurla", "chembur", "ghatkopar", "vikhroli", "kanjurmarg", "bhandup", "mulund",
  "bandra", "khar", "santacruz", "vile-parle", "andheri", "jogeshwari", "goregaon", "malad", "kandivali", "borivali", "dahisar",
  "kurla-east", "chembur-east", "ghatkopar-east", "vikhroli-east", "mulund-east",
  "vashi", "sanpada", "juinagar", "nerul", "seawoods", "cbd-belapur", "kharghar", "kamothe", "kalamboli", "panvel", "new-panvel", "taloja", "ghansoli", "kopar-khairane", "airoli", "turbhe"
];

const rawTests = [
  "blood-tests", "full-body-check-up", "health-checkup", "sonography", "ultrasound", "ct-scan", "mri-scan", "pet-scan", "spect-scan", "dtpa-scan", "dexa-bone-scan", "2d-echo", "2d-echo-test", "tmt-test", "stress-test", "holter-monitoring", "angiography", "angioplasty", "TAVR", "pregnancy-sonography", "obstetric-ultrasound", "anomaly-scan", "nt-scan", "color-doppler", "liver-fibroscan", "liver-elastography", "mammography", "follicular-study", "prenatal-test", "nipt-test", "nips-test", "nippt"
];

const formatSlug = (slug: string) => slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
const cities = rawCities.map(formatSlug);
const tests = rawTests.map(formatSlug);

export default function AboutUsPage() {
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

  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  const toggleFaq = (index: string) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const [formData, setFormData] = useState({
    name: "", mobile: "", test: "", center: "", date: "", time: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filledFields = Object.values(formData).filter(value => value.trim() !== "").length;
  const progressPercentage = Math.round((filledFields / 6) * 100);

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filledFields < 6) {
      alert("Please fill all the fields before confirming.");
      return;
    }
    const message = `*Secure Appointment Request*%0A%0A*Name:* ${formData.name}%0A*Mobile:* ${formData.mobile}%0A*Test:* ${formData.test}%0A*Center:* ${formData.center}%0A*Date:* ${formData.date}%0A*Time:* ${formData.time}%0A%0A_Please confirm my priority booking._`;
    window.open(`https://wa.me/918879327184?text=${message}`, '_blank');
  };

  const techImages = [
    "https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/henotic-diagnostics-mri-scan-belapur.webp",
    "https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-waiting-area.webp",
    "https://storage.googleapis.com/wp-media-henoticbucket/CT%20SCAN/henotic-diagnostics-ct-scan-kharghar.webp",
    "https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-main-building.webp",
  ];

  return (
    <div className="w-full font-sans overflow-x-hidden mt-[80px]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; width: max-content; animation: marquee 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
        .deep-shadow { box-shadow: 0 20px 40px -10px rgba(0,0,0,0.2), 0 10px 20px -5px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5); }
        .deep-shadow-hover:hover { box-shadow: 0 30px 60px -15px rgba(0,0,0,0.3), 0 15px 25px -5px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6); transform: translateY(-8px) scale(1.02); }
        .booking-gradient-bg { background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1); }
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
              <img width="800" height="800" src="https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/henotic-diagnostics-mri-scan-panvel.webp" alt="Henotic Diagnostics MRI Scan" className="relative rounded-[2.5rem] shadow-2xl object-cover h-[350px] md:h-[450px] lg:h-[500px] w-full border-[6px] border-white transition-transform hover:scale-[1.02] duration-500 z-10" fetchPriority="high" decoding="sync" />
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
                <img width="800" height="800" src={src} className="w-full h-56 md:h-80 object-cover rounded-3xl deep-shadow border-4 border-white" alt="Technology" fetchPriority="high" decoding="sync" />
              </div>
            ))}
            {techImages.map((src, index) => (
              <div key={`dup-${index}`} className="w-[80vw] sm:w-[320px] md:w-[350px] lg:w-[400px] flex-shrink-0 px-3 md:px-4">
                <img width="800" height="800" src={src} className="w-full h-56 md:h-80 object-cover rounded-3xl deep-shadow border-4 border-white" alt="Technology" fetchPriority="high" decoding="sync" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📅 Premium Official Booking Portal */}
      <section id="appointment-portal" className="pt-16 pb-24 md:pt-24 md:pb-32 booking-gradient-bg relative border-y border-slate-200">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-12 bg-white/40 backdrop-blur-2xl border border-white rounded-[3rem] shadow-2xl overflow-hidden">
            <div className="lg:col-span-2 p-8 md:p-12 text-white h-full flex flex-col justify-center bg-blue-950/80">
              <span className="bg-white/20 text-white border border-white/40 text-xs md:text-sm font-bold px-4 py-1.5 rounded-full inline-block mb-4 md:mb-6 tracking-widest w-max shadow-inner">OFFICIAL BOOKING PORTAL</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 leading-tight drop-shadow-md">Excellence in Diagnostics</h2>
              <p className="text-base md:text-lg text-white/90 mb-6 md:mb-8 font-medium"><strong>12+ Years</strong> of precision. NABL Accredited. Trusted by leading specialists in Mumbai.</p>
              <ul className="space-y-4 md:space-y-5 text-base md:text-lg font-bold">
                <li className="flex items-center gap-3 md:gap-4"><span className="bg-white/20 p-2 rounded-full">🏆</span> AERB Accredited Lab</li>
                <li className="flex items-center gap-3 md:gap-4"><span className="bg-white/20 p-2 rounded-full">📜</span> PCPNDT Registered</li>
                <li className="flex items-center gap-3 md:gap-4"><span className="bg-white/20 p-2 rounded-full">🖥️</span> 3T MRI & 128-Slice CT</li>
              </ul>
            </div>
            <div className="lg:col-span-3 p-8 md:p-12 bg-white/90 backdrop-blur-xl h-full flex flex-col justify-center">
              <div className="mb-6 md:mb-8 border-b border-slate-200 pb-4">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">Secure Appointment</h3>
              </div>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1">Patient Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#E55D87] outline-none transition bg-white shadow-sm font-medium" required />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1">Mobile Number</label>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#E55D87] outline-none transition bg-white shadow-sm font-medium" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1">Test Name</label>
                    <select aria-label="Select Test Category" name="test" value={formData.test} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#E55D87] outline-none transition bg-white shadow-sm font-medium" required>
                      <option value="">Select Required Test...</option>
                      {tests.map((test, idx) => <option key={idx} value={test}>{test}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs md:text-sm font-bold text-slate-700 mb-1">Select Center</label>
                    <select aria-label="Select Nearest Center" name="center" value={formData.center} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-[#E55D87] outline-none transition bg-white shadow-sm font-medium" required>
                      <option value="">Choose location...</option>
                      {cities.map((city, idx) => <option key={idx} value={city}>{city}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-extrabold text-white text-lg transition-all ${progressPercentage === 100 ? 'bg-[#25D366] hover:bg-[#20b958] shadow-lg transform hover:-translate-y-1' : 'bg-[#25D366]/60 cursor-not-allowed'}`} disabled={progressPercentage < 100}>
                    Confirm Now Via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 🌟 FINAL SECTION: 3D GOOGLE REVIEWS WIDGET ADDED HERE */}
      <GoogleReviews />

    </div>
  );
}