"use client";

import React, { useState, useEffect } from "react";
import { User, Phone, Activity, MapPin, Calendar, Clock, MessageCircle, ShieldCheck, Award, FileCheck, CheckCircle2 } from "lucide-react";

// --- STRUCTURED DATA SETS ---
const LOCATIONS = [
  { region: "Navi Mumbai", cities: ["Vashi", "Sanpada", "Juinagar", "Nerul", "Seawoods", "CBD Belapur", "Kharghar", "Kamothe", "Kalamboli", "Panvel", "New Panvel", "Taloja", "Ghansoli", "Kopar Khairane", "Airoli", "Turbhe"] },
  { region: "South Mumbai", cities: ["Colaba", "Cuffe Parade", "Fort", "Churchgate", "Marine Lines", "Nariman Point", "Worli", "Parel", "Lower Parel", "Mahalaxmi", "Byculla", "Dadar"] },
  { region: "Central Mumbai", cities: ["Sion", "Kurla", "Chembur", "Ghatkopar", "Vikhroli", "Kanjurmarg", "Bhandup", "Mulund"] },
  { region: "Western Suburbs", cities: ["Bandra", "Khar", "Santacruz", "Vile Parle", "Andheri", "Jogeshwari", "Goregaon", "Malad", "Kandivali", "Borivali", "Dahisar"] },
  { region: "Eastern Suburbs", cities: ["Kurla East", "Chembur East", "Ghatkopar East", "Vikhroli East", "Mulund East"] }
];

const SERVICES = [
  { category: "Diagnostic Center & Health Screening", items: ["Diagnostic Center", "Medical Imaging Center", "Radiology Center", "Pathology Lab", "Diagnostic Services", "Health Checkup", "Full Body Check Up", "Master Health Checkup", "Preventive Health Checkup", "Cancer Screening"] },
  { category: "Pathology & Lab Tests", items: ["Blood Test", "Home Blood Collection", "CBC Test", "Lipid Profile", "Thyroid Test", "Liver Function Test", "Kidney Function Test", "Diabetes Test", "Vitamin D Test", "Covid Test", "Dengue Test"] },
  { category: "Ultrasound & Sonography", items: ["Ultrasound", "Sonography", "USG Scan", "Abdominal Ultrasound", "Pelvic Ultrasound", "Kidney Ultrasound", "Prostate Ultrasound", "Thyroid Ultrasound", "Breast Ultrasound", "Guided Biopsy"] },
  { category: "Pregnancy & Fetal Medicine", items: ["Pregnancy Sonography", "Obstetric Ultrasound", "Early Pregnancy Scan", "Dating Scan", "NT Scan", "Anomaly Scan", "Target Scan", "Level 2 Scan", "Growth Scan", "Fetal Echo", "High Risk Pregnancy Scan"] },
  { category: "Doppler Studies", items: ["Color Doppler", "Pregnancy Doppler", "Arterial Doppler", "Venous Doppler", "Carotid Doppler", "Renal Doppler", "DVT Doppler"] },
  { category: "Women's Health & Breast Imaging", items: ["Mammography", "Digital Mammography", "3D Mammography", "Sonomammography", "Follicular Study", "Fertility Scan", "HSG Test"] },
  { category: "MRI Services", items: ["MRI Scan", "MRI Brain", "MRI Spine", "Cervical Spine MRI", "MRI Joint", "Pelvis MRI", "Abdominal MRI", "Cardiac MRI", "MRI MRCP", "Whole Body MRI"] },
  { category: "CT Scan Services", items: ["CT Scan", "HRCT Scan", "HRCT Chest", "CT Brain", "CT Angiography", "CT Coronary Angiography", "Whole Body CT Scan", "Low Dose CT"] },
  { category: "PET CT & Nuclear Medicine", items: ["PET Scan", "PET CT", "Whole Body PET Scan", "FDG PET CT", "Bone Scan", "Thyroid Scan", "Renal Scan"] },
  { category: "Cardiology & Liver Diagnostics", items: ["ECG", "2D Echo", "Stress Echo", "TMT Test", "Holter Monitoring", "Angiography", "Fibroscan", "Liver Elastography"] },
  { category: "Genetic Testing", items: ["Prenatal Genetic Testing", "NIPT Test", "Karyotype Test", "DNA Test"] }
];

const ACCREDITATIONS = [
  { title: "NABL", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b027e422-nabl-certified-henotic-diagnostics.webp" },
  { title: "ISO", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b04115be-iso-certified-henotic-diagnostics.webp" },
  { title: "AERB", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b3a1aaeb-aerb-certified-henotic-diagnostics.webp" },
  { title: "PCPNDT", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/3a45d45f-pcpndt-certified-henotic-diagnostics.webp" },
  { title: "NABH", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/fb54c3da-nabh-certified-henotic-diagnostics.webp" }
];

export default function BookingForm() {
  const [formData, setFormData] = useState({ name: "", mobile: "", test: "", center: "", date: "", time: "" });
  const [progress, setProgress] = useState(0);

  // Dynamic Progress Bar Calculation
  useEffect(() => {
    let filled = 0;
    if (formData.name.trim() !== "") filled += 20;
    if (formData.mobile.trim() !== "" && formData.mobile.length >= 10) filled += 20;
    if (formData.test !== "") filled += 20;
    if (formData.center !== "") filled += 20;
    if (formData.date !== "" && formData.time !== "") filled += 20;
    setProgress(filled);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `*NEW PRIORITY BOOKING*%0A%0A*Patient Details:*%0A👤 Name: ${formData.name}%0A📱 Mobile: ${formData.mobile}%0A%0A*Test Details:*%0A🏥 Center: ${formData.center}%0A🔬 Test: ${formData.test}%0A📅 Date: ${formData.date}%0A⏰ Time: ${formData.time}%0A%0A_Sent via Official Henotic Diagnostics Portal_`;
    window.open(`https://wa.me/9108879327184?text=${message}`, '_blank');
  };

  return (
    <div 
      className="w-full rounded-[2.5rem] p-1.5 shadow-2xl relative overflow-hidden"
      style={{
        // 🌟 NEW PREMIUM GRADIENT BACKGROUND 🌟
        background: "linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)"
      }}
    >
      {/* GLASSMORPHISM INNER CONTAINER */}
      <div className="bg-white/95 backdrop-blur-3xl rounded-[2.3rem] p-6 sm:p-10 w-full relative z-10 border border-white/60 shadow-inner">
        
        {/* TOP HEADER & TRUST SIGNALS */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9795f0]/10 border border-[#9795f0]/30 text-[#9795f0] text-xs font-black uppercase tracking-widest mb-4">
            <ShieldCheck size={16} /> Official Booking Portal
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
            Excellence in <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #9795f0, #fbc8d4)" }}>Diagnostics</span>
          </h2>
          <p className="text-slate-600 font-bold mb-4">12+ Years of precision. NABL Accredited. Trusted by leading specialists in Mumbai.</p>
          
          <div className="flex flex-wrap justify-center gap-3 text-xs font-extrabold text-slate-700">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><Award size={14} className="text-[#9795f0]"/> AERB Accredited Lab</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><FileCheck size={14} className="text-[#fbc8d4]"/> PCPNDT Registered</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><Activity size={14} className="text-[#9795f0]"/> 3T MRI & 128-Slice CT</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><Clock size={14} className="text-[#fbc8d4]"/> Same Day Reports</span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><MapPin size={14} className="text-[#9795f0]"/> Home Collection</span>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="text-lg font-black text-slate-800">Secure Appointment</h3>
              <p className="text-xs font-bold text-slate-500">Fill the details below for priority confirmation.</p>
            </div>
            <span className="text-2xl font-black text-[#9795f0]">{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ 
                width: `${progress}%`,
                // Matching the progress bar to the new theme
                background: "linear-gradient(to right, #fbc8d4, #9795f0)"
              }}
            ></div>
          </div>
        </div>

        {/* BOOKING FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Patient Name" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#9795f0] focus:ring-4 focus:ring-[#9795f0]/20 text-slate-800 font-bold outline-none transition-all" />
            </div>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile Number" className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#9795f0] focus:ring-4 focus:ring-[#9795f0]/20 text-slate-800 font-bold outline-none transition-all" />
            </div>
          </div>

          <div className="relative">
            <Activity className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select name="test" value={formData.test} onChange={handleChange} required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#9795f0] focus:ring-4 focus:ring-[#9795f0]/20 text-slate-800 font-bold outline-none transition-all appearance-none cursor-pointer">
              <option value="" disabled>Select Test Name</option>
              {SERVICES.map((category, idx) => (
                <optgroup key={idx} label={category.category}>
                  {category.items.map((test, i) => (
                    <option key={i} value={test}>{test}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <select name="center" value={formData.center} onChange={handleChange} required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#9795f0] focus:ring-4 focus:ring-[#9795f0]/20 text-slate-800 font-bold outline-none transition-all appearance-none cursor-pointer">
              <option value="" disabled>Select Nearest Center</option>
              {LOCATIONS.map((region, idx) => (
                <optgroup key={idx} label={region.region}>
                  {region.cities.map((city, i) => (
                    <option key={i} value={`${city}, ${region.region}`}>{city}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#9795f0] focus:ring-4 focus:ring-[#9795f0]/20 text-slate-800 font-bold outline-none transition-all cursor-pointer" />
            </div>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-[#9795f0] focus:ring-4 focus:ring-[#9795f0]/20 text-slate-800 font-bold outline-none transition-all cursor-pointer" />
            </div>
          </div>

          {/* PREMIUM WHATSAPP SUBMIT BUTTON */}
          <button 
            type="submit" 
            disabled={progress < 100}
            className={`w-full mt-4 py-5 px-6 rounded-2xl shadow-[0_15px_30px_-5px_rgba(37,211,102,0.4)] transform transition-all duration-300 flex items-center justify-center gap-3 text-lg font-black text-white ${progress === 100 ? 'bg-[#25D366] hover:bg-[#1DA851] hover:scale-[1.02] cursor-pointer' : 'bg-slate-300 opacity-70 cursor-not-allowed'}`}
          >
            <MessageCircle size={28} className="fill-current" /> 
            {progress === 100 ? "Confirm Appointment Now Via WhatsApp" : `Complete Form to Book (${progress}%)`}
          </button>
        </form>

        {/* ACCREDITATIONS FOOTER BANNER */}
        <div className="mt-10 rounded-[2rem] p-6 border-2 border-white/20 shadow-inner" style={{ background: "linear-gradient(to right, #1e293b, #0f172a, #1e293b)" }}>
          <h4 className="text-center text-slate-300 text-xs font-black uppercase tracking-[0.2em] mb-5 flex items-center justify-center gap-2">
            <CheckCircle2 size={16} className="text-[#9795f0]" /> Accredited by National Bodies
          </h4>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {ACCREDITATIONS.map((acc, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-2.5 mb-2 shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(151,149,240,0.4)]">
                  <img decoding="async" src={acc.img} alt={acc.title} className="w-full h-full object-contain" fetchPriority="high" />
                </div>
                <span className="text-[10px] font-black text-slate-300 tracking-wider uppercase">{acc.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}