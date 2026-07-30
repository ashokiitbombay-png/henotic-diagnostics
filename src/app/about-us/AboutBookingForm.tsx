"use client";

import React, { useState } from "react";

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

export default function AboutBookingForm() {
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

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .booking-gradient-bg { background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1); }
      `}} />
      <section id="appointment-portal" className="pt-16 pb-24 md:pt-24 md:pb-32 booking-gradient-bg relative border-y border-slate-200">
        <div className="absolute inset-0 bg-[url('/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
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
                  <button type="submit" className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-extrabold text-white text-lg transition-all ${progressPercentage === 100 ? 'bg-[#16a34a] hover:bg-[#20b958] shadow-lg transform hover:-translate-y-1' : 'bg-[#16a34a]/60 cursor-not-allowed'}`} disabled={progressPercentage < 100}>
                    Confirm Now Via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
