"use client";

import React, { useState, useEffect } from 'react';
import GoogleReviews from "@/components/features/reviews/GoogleReviews";
import { MapPin, Phone, Clock, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';

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
    window.open(`https://wa.me/9108879327184?text=${message}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans overflow-hidden mt-[80px]">
      
      {/* Header Section */}
      <div className="pt-20 pb-12 text-center px-4 md:px-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        <h1 className="text-4xl font-black text-slate-900 sm:text-6xl drop-shadow-sm tracking-tight mb-6 relative z-10">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Touch</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 font-medium relative z-10">
          At Henotic Diagnostics, we are committed to delivering accurate, accessible, and patient-focused healthcare services.
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-24 px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Section 1: Introduction & Front Office (Deep 3D Image) */}
        <section className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden lg:flex lg:items-stretch border border-slate-100 relative">
          <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 text-[#E55D87] text-sm font-extrabold uppercase tracking-widest mb-6 w-max border border-pink-100">
              <ShieldCheck size={16} /> Patient-First Approach
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Comprehensive Care</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
              Whether you need advanced imaging, preventive health checkups, blood tests, women’s health diagnostics, or cardiac evaluations, our experienced team is here to support your healthcare journey with precision and care.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-[#4568dc]" size={20}/> State-of-the-art Infrastructure</li>
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-[#4568dc]" size={20}/> Highly Trained Medical Staff</li>
              <li className="flex items-center gap-3 text-slate-700 font-bold"><CheckCircle2 className="text-[#4568dc]" size={20}/> NABL & ISO Certified Lab</li>
            </ul>
          </div>
          
          <div className="lg:w-1/2 relative p-6 lg:p-10 flex items-center justify-center bg-slate-50/50">
            {/* Deep 3D Frame Effect */}
            <div className="relative w-full h-[350px] lg:h-full min-h-[400px] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border-[8px] border-white group transform transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_40px_70px_-15px_rgba(0,0,0,0.5)]">
              <img decoding="async" 
                src="https://storage.googleapis.com/wp-media-henoticbucket/Front%20Office/henotic-diagnostics-name-plate.webp" 
                alt="Henotic Diagnostics Front Office" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </section>

        {/* Section 2: Deep 3D Location & Waiting Area */}
        <section className="py-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Visit Our Center</h2>
             <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Experience a hygienic, patient-centric environment designed for your comfort and peace of mind.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            
            {/* 3D Waiting Area Image Container */}
            <div className="relative group w-full h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform hover:-translate-y-4 transition-all duration-700 ease-out border-[8px] border-white">
              <img decoding="async" 
                src="https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-waiting-area.webp" 
                alt="Henotic Diagnostics Reception and Waiting Area" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              fetchPriority="high" />
              {/* Floating Info Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="bg-blue-100 p-2 rounded-full text-blue-600"><Clock size={20}/></div>
                   <div>
                     <p className="text-xs font-bold text-slate-500 uppercase">Wait Time</p>
                     <p className="text-slate-900 font-black">Less than 15 Mins</p>
                   </div>
                 </div>
              </div>
            </div>

            {/* 3D Google Maps Container */}
            <div className="relative group w-full h-[400px] sm:h-[450px] rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] transform hover:-translate-y-4 transition-all duration-700 ease-out border-[8px] border-white">
              <iframe 
                src="https://maps.google.com/maps?q=Henotic%20Diagnostics,%20Kharghar&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen
                loading="lazy" 
                title="Henotic Diagnostics Location"
              ></iframe>
              {/* Floating Address Badge */}
              <div className="absolute top-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-start gap-3 pointer-events-none">
                 <div className="bg-pink-100 p-2 rounded-full text-[#E55D87] shrink-0 mt-1"><MapPin size={20}/></div>
                 <div>
                   <p className="text-slate-900 font-black text-sm">Navi Mumbai Headquarters</p>
                   <p className="text-xs font-bold text-slate-500 mt-1 leading-relaxed">Shop 1-4, Ground Floor, Near Railway Station.</p>
                 </div>
              </div>
            </div>
            
          </div>
        </section>

        {/* --- PREMIUM BOOKING FORM SECTION --- */}
        <section className="py-8" id="booking">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="px-4">
              <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-blue-100 text-[#4568dc] font-extrabold text-xs tracking-widest uppercase mb-6 shadow-sm border border-blue-200">
                <ShieldCheck size={16} /> Official Booking Portal
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Excellence in <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4568dc] to-[#b06ab3]">Diagnostics</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
                <strong className="text-slate-900">12+ Years</strong> of precision. NABL Accredited. <br/>
                Trusted by leading specialists across Mumbai.
              </p>
              
              <div className="flex flex-col gap-4 mt-10">
                <a href="tel:08879327184" className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-lg border border-slate-100 hover:border-[#4568dc] transition-colors w-max group">
                  <div className="bg-blue-50 p-3 rounded-full text-[#4568dc] group-hover:scale-110 transition-transform"><Phone size={24}/></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Emergency & Booking</p>
                    <p className="text-xl font-black text-slate-900">08879327184</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Form */}
            <div 
              className="rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(176,106,179,0.4)] relative overflow-hidden transition-transform duration-500 hover:-translate-y-2 border-4 border-white"
              style={{ backgroundImage: 'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)' }}
            >
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-3xl font-extrabold text-white drop-shadow-md">Secure Appointment</h3>
                  <span className="text-white/90 font-black text-xl">{progress}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-black/10 rounded-full mb-8 overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-white transition-all duration-500 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>

                <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient Name" required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold placeholder-slate-400 transition-all outline-none" />
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold placeholder-slate-400 transition-all outline-none" />
                  </div>

                  <select name="test" value={formData.test} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none appearance-none">
                    <option value="" disabled>Select Test Name</option>
                    <option value="MRI Scan">MRI Scan</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="Sonography / Ultrasound">Sonography / Ultrasound</option>
                    <option value="Blood Test / Pathology">Blood Test / Pathology</option>
                    <option value="Health Checkup Package">Health Checkup Package</option>
                  </select>

                  <select name="center" value={formData.center} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none appearance-none">
                    <option value="" disabled>Select Nearest Center</option>
                    <option value="Kharghar Center">Kharghar Center</option>
                    <option value="Panvel Center">Panvel Center</option>
                    <option value="Navi Mumbai (Main)">Navi Mumbai (Main)</option>
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none" />
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border-0 focus:ring-4 focus:ring-white/50 text-slate-800 shadow-inner font-bold transition-all outline-none" />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full mt-8 bg-gradient-to-r from-[#25D366] to-[#1DA851] hover:from-[#1DA851] hover:to-[#128C7E] text-white font-black py-5 px-6 rounded-2xl shadow-[0_15px_30px_-5px_rgba(37,211,102,0.4)] transform transition-all hover:-translate-y-1 flex items-center justify-center gap-3 text-lg md:text-xl border border-[#25D366]/50"
                  >
                    <MessageCircle size={24} className="fill-current" /> Confirm via WhatsApp
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