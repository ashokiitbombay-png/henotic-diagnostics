"use client";

import React, { useState, useEffect } from 'react';
import GoogleReviews from "@/components/features/reviews/GoogleReviews";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', mobile: '', test: '', center: '', date: '', time: '' });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalFields = 6;
    let filledFields = 0;
    if (formData.name.trim() !== '') filledFields++;
    if (formData.mobile.trim() !== '') filledFields++;
    if (formData.test.trim() !== '') filledFields++;
    if (formData.center.trim() !== '') filledFields++;
    if (formData.date.trim() !== '') filledFields++;
    if (formData.time.trim() !== '') filledFields++;
    setProgress(Math.round((filledFields / totalFields) * 100));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `Hello Henotic Diagnostics, I would like to confirm my appointment:%0A- Name: *${formData.name}*%0A- Mobile: *${formData.mobile}*%0A- Test: *${formData.test}*%0A- Center: *${formData.center}*%0A- Date: *${formData.date}*%0A- Time: *${formData.time}*`;
    window.open(`https://wa.me/918879327184?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans overflow-hidden mt-[80px]">
      
      {/* Header Section */}
      <div className="pt-20 pb-12 text-center px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-blue-950 sm:text-6xl drop-shadow-sm tracking-tight mb-6">
          Contact Us
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 font-medium">
          At Henotic Diagnostics, we are committed to delivering accurate, accessible, and patient-focused healthcare services.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-24 px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: Introduction & MRI */}
        <section className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden lg:flex lg:items-center border border-slate-100 transform transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] hover:-translate-y-2 group">
          <div className="lg:w-1/2 p-10 lg:p-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Comprehensive Care</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Whether you need advanced imaging, preventive health checkups, blood tests, women’s health diagnostics, or cardiac evaluations, our experienced team is here to support your healthcare journey with precision and care.
            </p>
          </div>
          <div className="lg:w-1/2 h-80 lg:h-auto relative overflow-hidden">
            <img 
              src="https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/henotic-diagnostics-mri-scan-panvel.webp" 
              alt="Henotic Diagnostics MRI Scan in Panvel" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </section>

        {/* Section 2: Deep 3D Location & Waiting Area */}
        <section className="py-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Visit Our Center</h2>
             <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Experience a hygienic, patient-centric environment designed for your comfort and peace of mind.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* 3D Image Container */}
            <div className="relative group w-full h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,_0,_0,_0.1)] hover:shadow-[0_40px_80px_rgba(0,_0,_0,_0.15)] transform hover:-translate-y-3 transition-all duration-500 ease-out border-[6px] border-white">
              <img 
                src="https://storage.googleapis.com/wp-media-henoticbucket/MRI%20SCAN/henotic-diagnostics-waiting-area.webp" 
                alt="Waiting Area" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            {/* 3D Google Maps Container */}
            <div className="relative w-full h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,_0,_0,_0.1)] hover:shadow-[0_40px_80px_rgba(0,_0,_0,_0.15)] transform hover:-translate-y-3 transition-all duration-500 ease-out border-[6px] border-white ring-1 ring-slate-100">
              <iframe 
                src="https://maps.google.com/maps?q=Henotic%20Diagnostics,%20Kharghar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0 grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                allowFullScreen
                loading="lazy" 
                title="Henotic Diagnostics Location"
              ></iframe>
            </div>
          </div>
        </section>

        {/* --- PREMIUM BOOKING FORM SECTION --- */}
        <section className="py-16" id="booking">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="px-4">
              <span className="inline-block py-2 px-5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs tracking-widest uppercase mb-6 shadow-sm border border-blue-200">
                Official Booking Portal
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                Excellence in <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">Diagnostics</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                <strong className="text-slate-800">12+ Years</strong> of precision. NABL Accredited. <br/>
                Trusted by leading specialists across Mumbai.
              </p>
            </div>

            {/* Right Side: Interactive Form */}
            <div 
              className="rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 border border-white"
              style={{ backgroundImage: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' }}
            >
              <div className="relative z-10">
                <h3 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md">Secure Appointment</h3>
                <p className="text-white/90 text-lg mb-8 font-medium">Fill the details below for priority confirmation.</p>

                <form className="space-y-5" onSubmit={handleWhatsAppSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient Name" required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-sm font-medium transition-all" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-sm font-medium transition-all" />
                  </div>

                  <select name="test" value={formData.test} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-sm font-medium transition-all">
                    <option value="" disabled>Select Test Name</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="Sonography / Ultrasound">Sonography / Ultrasound</option>
                    <option value="Blood Test / Pathology">Blood Test / Pathology</option>
                    <option value="Health Checkup Package">Health Checkup Package</option>
                  </select>

                  <select name="center" value={formData.center} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-sm font-medium transition-all">
                    <option value="" disabled>Select Nearest Center</option>
                    <option value="Kharghar Center">Kharghar Center</option>
                    <option value="Panvel Center">Panvel Center</option>
                    <option value="Navi Mumbai (Main)">Navi Mumbai (Main)</option>
                  </select>

                  <div className="grid grid-cols-2 gap-5">
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-sm font-medium transition-all" />
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-sm font-medium transition-all" />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-6 bg-[#25D366] hover:bg-[#1DA851] text-white font-extrabold py-5 px-6 rounded-2xl shadow-[0_10px_20px_rgba(37,211,102,0.3)] transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 text-lg md:text-xl"
                  >
                    Confirm Appointment Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      {/* 🌟 FINAL SECTION: 3D GOOGLE REVIEWS WIDGET ADDED HERE */}
      <GoogleReviews />

    </main>
  );
}