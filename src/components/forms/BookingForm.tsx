"use client";

import React, { useState, useEffect } from "react";
import { User, Phone, MapPin, Activity, Calendar, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

// ==========================================
// DATA MAPS (Locations & Services)
// ==========================================
const LOCATIONS = {
  "South Mumbai": ["colaba", "cuffe-parade", "fort", "churchgate", "marine-lines", "nariman-point", "worli", "parel", "lower-parel", "mahalaxmi", "byculla", "dadar"],
  "Central Mumbai": ["sion", "kurla", "chembur", "ghatkopar", "vikhroli", "kanjurmarg", "bhandup", "mulund"],
  "Western Suburbs": ["bandra", "khar", "santacruz", "vile-parle", "andheri", "jogeshwari", "goregaon", "malad", "kandivali", "borivali", "dahisar"],
  "Eastern Suburbs": ["kurla-east", "chembur-east", "ghatkopar-east", "vikhroli-east", "mulund-east"],
  "Navi Mumbai": ["vashi", "sanpada", "juinagar", "nerul", "seawoods", "cbd-belapur", "kharghar", "kamothe", "kalamboli", "panvel", "new-panvel", "taloja", "ghansoli", "kopar-khairane", "airoli", "turbhe"]
};

const SERVICES = {
  "Health Screening": ["diagnostic-center", "full-body-check-up", "preventive-health-checkup", "women-health-checkup", "men-health-checkup", "senior-citizen-health-checkup"],
  "Pathology & Lab Tests": ["blood-test", "home-blood-collection", "cbc-test", "lipid-profile", "thyroid-profile", "liver-function-test", "kidney-function-test", "diabetes-test", "vitamin-d-test", "vitamin-b12-test"],
  "Ultrasound & Sonography": ["ultrasound", "abdomen-pelvis-ultrasound", "kidney-ultrasound", "thyroid-ultrasound", "breast-ultrasound", "transvaginal-ultrasound"],
  "Pregnancy & Fetal Medicine": ["pregnancy-sonography", "nt-scan", "anomaly-scan", "growth-scan", "fetal-doppler", "fetal-echocardiography"],
  "Doppler Studies": ["color-doppler", "arterial-doppler", "venous-doppler", "carotid-doppler", "lower-limb-doppler"],
  "Women's Health": ["mammography", "3d-mammography", "sonomammography", "follicular-study", "hsg-test"],
  "MRI Services": ["mri-scan", "brain-mri", "spine-mri", "knee-mri", "pelvis-mri", "whole-body-mri", "contrast-mri"],
  "CT Scan Services": ["ct-scan", "hrct-chest", "brain-ct-scan", "abdomen-ct-scan", "ct-angiography", "coronary-ct-angiography"],
  "Cardiology": ["ecg", "2d-echo", "stress-test", "holter-monitoring", "angiography"],
  "Specialized Scans": ["pet-scan", "whole-body-pet-ct", "dexa-bone-scan", "fibroscan", "genetic-test"]
};

const TRUST_LOGOS = [
  { name: 'NABL', src: 'https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b027e422-nabl-certified-henotic-diagnostics.webp' },
  { name: 'ISO', src: 'https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b04115be-iso-certified-henotic-diagnostics.webp' },
  { name: 'AERB', src: 'https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b3a1aaeb-aerb-certified-henotic-diagnostics.webp' },
  { name: 'PCPNDT', src: 'https://storage.googleapis.com/wp-media-henoticbucket/2026/01/3a45d45f-pcpndt-certified-henotic-diagnostics.webp' },
  { name: 'NABH', src: 'https://storage.googleapis.com/wp-media-henoticbucket/2026/01/fb54c3da-nabh-certified-henotic-diagnostics.webp' }
];

// Helper to format slugs back to readable text
const formatText = (text: string) => text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export default function BookingForm() {
  const [formData, setFormData] = useState({ name: "", mobile: "", test: "", center: "", date: "", time: "" });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== "").length;
    setProgress(Math.round((filledFields / fields.length) * 100));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, mobile, test, center, date, time } = formData;
    
    const message = `*New Appointment Request*%0A%0A*Patient Name:* ${name}%0A*Mobile Number:* ${mobile}%0A*Selected Test:* ${formatText(test)}%0A*Preferred Center:* ${formatText(center)}%0A*Date:* ${date}%0A*Time:* ${time}%0A%0A_Please confirm my booking._`;
    
    window.open(`https://wa.me/9108879327184?text=${message}`, '_blank');
  };

  return (
    <div id="booking" className="w-full max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] bg-white border border-slate-100">
      
      {/* HEADER SECTION */}
      <div className="p-8 md:p-12 text-center" style={{ backgroundImage: "linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)" }}>
        <h2 className="text-sm md:text-base font-extrabold uppercase tracking-widest text-white/90 mb-2">Official Booking Portal</h2>
        <h3 className="text-3xl md:text-5xl font-black text-white mb-6 drop-shadow-md">Excellence in Diagnostics</h3>
        
        <div className="flex flex-wrap justify-center gap-3 text-sm font-bold text-white/95">
          <span className="flex items-center gap-1 bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-md"><ShieldCheck size={16} /> 12+ Years Precision</span>
          <span className="flex items-center gap-1 bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-md"><CheckCircle2 size={16} /> 3T MRI & 128-Slice CT</span>
          <span className="flex items-center gap-1 bg-black/10 px-3 py-1.5 rounded-full backdrop-blur-md"><Activity size={16} /> Same Day Reports</span>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="p-8 md:p-12">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-2xl font-extrabold text-slate-800">Secure Appointment</h4>
            <span className="text-[#d16ba5] font-black text-xl">{progress}% Filled</span>
          </div>
          <p className="text-slate-500 font-medium mb-4">Fill the details below for priority confirmation.</p>
          
          {/* Progress Bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progress}%`,
                backgroundImage: "linear-gradient(to right, #69bff8, #d16ba5)"
              }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">Patient Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#79b3f4] focus:border-transparent transition-all outline-none font-medium text-slate-800" />
              </div>
            </div>

            {/* Mobile */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone size={18} />
                </div>
                <input required type="tel" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#79b3f4] focus:border-transparent transition-all outline-none font-medium text-slate-800" />
              </div>
            </div>

            {/* Test Selection */}
            <div className="relative md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Test / Service</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Activity size={18} />
                </div>
                <select required name="test" value={formData.test} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#79b3f4] focus:border-transparent transition-all outline-none font-medium text-slate-800 appearance-none">
                  <option value="" disabled>Select the required test...</option>
                  {Object.entries(SERVICES).map(([category, items]) => (
                    <optgroup key={category} label={category}>
                      {items.map(item => <option key={item} value={item}>{formatText(item)}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Center Selection */}
            <div className="relative md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nearest Center</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <MapPin size={18} />
                </div>
                <select required name="center" value={formData.center} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#79b3f4] focus:border-transparent transition-all outline-none font-medium text-slate-800 appearance-none">
                  <option value="" disabled>Select your nearest neighborhood...</option>
                  {Object.entries(LOCATIONS).map(([region, cities]) => (
                    <optgroup key={region} label={region}>
                      {cities.map(city => <option key={city} value={city}>{formatText(city)}</option>)}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={18} />
                </div>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#79b3f4] focus:border-transparent transition-all outline-none font-medium text-slate-800" />
              </div>
            </div>

            {/* Time */}
            <div className="relative">
              <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Clock size={18} />
                </div>
                <input required type="time" name="time" value={formData.time} onChange={handleChange} className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#79b3f4] focus:border-transparent transition-all outline-none font-medium text-slate-800" />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={progress < 100}
              className={`w-full flex items-center justify-center gap-3 py-4 md:py-5 rounded-2xl text-white font-extrabold text-lg md:text-xl transition-all duration-300 shadow-xl ${progress === 100 ? 'hover:scale-[1.02] active:scale-[0.98]' : 'opacity-70 cursor-not-allowed'}`}
              style={{ 
                backgroundImage: progress === 100 
                  ? "linear-gradient(to right, #25D366, #128C7E)" 
                  : "linear-gradient(to right, #94a3b8, #cbd5e1)" 
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.004-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              Confirm Appointment Now
            </button>
            <p className="text-center text-slate-500 text-sm mt-3 font-medium">Clicking this will redirect you to WhatsApp for instant confirmation.</p>
          </div>
        </form>
      </div>

      {/* TRUST SIGNALS SECTION */}
      <div className="py-8 px-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700">
        <h4 className="text-center text-white/80 text-sm font-extrabold uppercase tracking-widest mb-6">Accredited & Certified by National Bodies</h4>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
          {TRUST_LOGOS.map((logo) => (
            <div key={logo.name} className="bg-white p-2 rounded-xl shadow-inner w-20 md:w-24 transform hover:scale-110 transition-transform duration-300">
              <img src={logo.src} alt={`${logo.name} Certified Lab`} className="w-full h-auto object-contain mix-blend-multiply" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}