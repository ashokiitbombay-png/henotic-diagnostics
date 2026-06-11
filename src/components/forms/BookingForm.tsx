"use client";

import React, { useState, useEffect } from "react";
import { User, Phone, Activity, MapPin, Calendar, Clock, ShieldCheck, Award, FileCheck, CheckCircle2 } from "lucide-react";

// --- STRUCTURED LOCATION DATA ---
const LOCATIONS = [
  { region: "South Mumbai", cities: ["Colaba", "Cuffe Parade", "Fort", "Churchgate", "Marine Lines", "Nariman Point", "Worli", "Parel", "Lower Parel", "Mahalaxmi", "Byculla", "Dadar"] },
  { region: "Central Mumbai", cities: ["Sion", "Kurla", "Chembur", "Ghatkopar", "Vikhroli", "Kanjurmarg", "Bhandup", "Mulund"] },
  { region: "Western Suburbs", cities: ["Bandra", "Khar", "Santacruz", "Vile Parle", "Andheri", "Jogeshwari", "Goregaon", "Malad", "Kandivali", "Borivali", "Dahisar"] },
  { region: "Eastern Suburbs", cities: ["Kurla East", "Chembur East", "Ghatkopar East", "Vikhroli East", "Mulund East"] },
  { region: "Navi Mumbai", cities: ["Vashi", "Sanpada", "Juinagar", "Nerul", "Seawoods", "CBD Belapur", "Kharghar", "Kamothe", "Kalamboli", "Panvel", "New Panvel", "Taloja", "Ghansoli", "Kopar Khairane", "Airoli", "Turbhe"] }
];

// --- MASTER DIAGNOSTIC CENTER SERVICE DATA ---
const SERVICES = [
  { category: "Diagnostic Center & Health Screening", items: ["Diagnostic Center", "Medical Imaging Center", "Radiology Center", "Pathology Lab", "Diagnostic Lab", "Diagnostic Services", "Medical Diagnostics", "Diagnostic Imaging", "Medical Imaging", "Radiology Services", "Health Checkup", "Full Body Check Up", "Master Health Checkup", "Executive Health Checkup", "Executive Health Screening", "Preventive Health Checkup", "Preventive Health Screening", "Annual Health Checkup", "Corporate Health Checkup", "Employee Health Checkup", "Pre Employment Health Checkup", "Wellness Screening", "Health Screening", "Women Health Checkup", "Women Health Screening", "Men Health Checkup", "Men Health Screening", "Senior Citizen Health Checkup", "Senior Health Checkup", "Family Health Checkup", "Heart Health Checkup", "Cardiac Health Checkup", "Diabetes Health Checkup", "Diabetes Health Screening", "Cancer Screening", "Cancer Screening Package"] },
  { category: "Pathology & Lab Tests", items: ["Blood Test", "Lab Test", "Pathology Test", "Home Blood Collection", "CBC Test", "Lipid Profile", "Thyroid Test", "Thyroid Profile", "Liver Function Test", "Kidney Function Test", "Diabetes Test", "HbA1c Test", "Vitamin D Test", "Vitamin B12 Test", "Iron Profile", "Urine Test", "Stool Test", "Hormone Test", "Allergy Test", "Tumor Marker Test", "Infection Test", "Covid Test", "Dengue Test", "Malaria Test", "Typhoid Test"] },
  { category: "Ultrasound & Sonography", items: ["Ultrasound", "Sonography", "USG Scan", "Abdominal Ultrasound", "Pelvic Ultrasound", "Abdomen Pelvis Ultrasound", "Whole Abdomen Ultrasound", "Whole Abdomen Sonography", "Upper Abdomen Sonography", "Lower Abdomen Sonography", "Kidney Ultrasound", "KUB Ultrasound", "Prostate Ultrasound", "Scrotal Ultrasound", "Testicular Ultrasound", "Groin Ultrasound", "Inguinal Ultrasound", "Thyroid Ultrasound", "Breast Ultrasound", "Neck Ultrasound", "Neck Sonography", "Parotid Ultrasound", "Salivary Gland Ultrasound", "Axilla Ultrasound", "Soft Tissue Ultrasound", "Musculoskeletal Ultrasound", "Vascular Ultrasound", "Small Parts Ultrasound", "Transvaginal Ultrasound", "Transrectal Ultrasound", "Guided Ultrasound", "Guided FNAC", "Guided Biopsy", "Ultrasound Guided Procedure"] },
  { category: "Pregnancy & Fetal Medicine", items: ["Pregnancy Sonography", "Obstetric Ultrasound", "Early Pregnancy Scan", "Pregnancy Dating Scan", "Dating Scan", "Viability Scan", "First Trimester Scan", "Second Trimester Scan", "Third Trimester Scan", "NT Scan", "Anomaly Scan", "Target Scan", "Targeted Anomaly Scan", "Level 2 Scan", "Growth Scan", "Fetal Growth Scan", "Fetal Wellbeing Scan", "Fetal Weight Estimation", "Cervical Length Scan", "Fetal Doppler", "Fetal Doppler Study", "Fetal Echocardiography", "Fetal Echo", "Fetal BPP", "Biophysical Profile", "BPP Scan", "High Risk Pregnancy Scan", "Multiple Pregnancy Scan", "Twin Pregnancy Scan", "Antenatal Scan", "Fetal Medicine Scan"] },
  { category: "Doppler Studies", items: ["Color Doppler", "Doppler Scan", "Pregnancy Doppler", "Obstetric Doppler", "Arterial Doppler", "Venous Doppler", "Vascular Doppler", "Vascular Color Doppler", "Carotid Doppler", "Carotid Artery Doppler", "Renal Doppler", "Uterine Artery Doppler", "Uterine Doppler", "Umbilical Artery Doppler", "Middle Cerebral Artery Doppler", "Lower Limb Doppler", "Upper Limb Doppler", "Peripheral Arterial Doppler", "Venous Insufficiency Scan", "Deep Vein Thrombosis Scan", "DVT Doppler"] },
  { category: "Women's Health & Breast Imaging", items: ["Mammography", "Digital Mammography", "3D Mammography", "Sonomammography", "Breast Imaging", "Breast Screening", "Breast Cancer Screening", "Breast Diagnostics", "Digital Breast Tomosynthesis", "3D Breast Imaging", "Follicular Study", "Fertility Scan", "Fertility Assessment", "Fertility Monitoring", "Ovulation Study", "Ovulation Monitoring", "Reproductive Health Screening", "Gynecology Ultrasound", "Pelvic Scan For Fertility", "HSG Test", "SSG Test"] },
  { category: "MRI Services", items: ["MRI Scan", "MRI Brain", "Brain MRI", "MRI Spine", "Spine MRI", "Cervical Spine MRI", "Lumbar Spine MRI", "Whole Spine MRI", "MRI Neck", "MRI Shoulder", "Shoulder MRI", "MRI Elbow", "MRI Wrist", "MRI Hand", "MRI Hip", "MRI Thigh", "MRI Knee", "Knee MRI", "MRI Ankle", "MRI Foot", "MRI Joint", "Pelvis MRI", "Abdominal MRI", "MRI Whole Abdomen", "Breast MRI", "Cardiac MRI", "MRI Pituitary", "MRI Orbit", "MRI Face", "MRI Paranasal Sinus", "MRI Prostate", "MRI Enterography", "MRI MRCP", "MRCP Scan", "MR Angiography", "MRI Angiography", "Whole Body MRI", "Contrast MRI", "MRI Brain Screening"] },
  { category: "CT Scan Services", items: ["CT Scan", "HRCT Scan", "HRCT Chest", "CT Brain", "Brain CT Scan", "CT Neck", "CT Face", "CT Orbit", "CT PNS", "CT Temporal Bone", "CT Spine", "Chest CT Scan", "Abdomen CT Scan", "CT Abdomen Pelvis", "CT KUB", "Cardiac CT Scan", "CT Angiography", "Coronary CT Angiography", "CT Coronary Angiography", "CT Pulmonary Angiography", "CT Enterography", "CT Colonography", "CT Urology", "CT Guided Biopsy", "CT Guided FNAC", "Whole Body CT Scan", "Contrast CT Scan", "Low Dose CT", "Lung Cancer Screening CT"] },
  { category: "PET CT & Nuclear Medicine", items: ["PET Scan", "PET CT", "Whole Body PET CT", "Whole Body PET Scan", "FDG PET CT", "Oncology PET CT", "Cardiac PET CT", "Neurology PET CT", "Cancer PET Scan", "PET Cancer Screening", "SPECT Scan", "Nuclear Medicine", "DTPA Scan", "EC Scan", "Renal Scan", "Renal Function Scan", "EC Renal Scan", "MAG3 Scan", "Bone Scan", "Bone Scintigraphy", "Thyroid Scan", "Thyroid Scintigraphy", "Thyroid Uptake Scan", "Parathyroid Scan", "GFR Test", "Myocardial Perfusion Scan", "Lung Perfusion Scan", "Gastric Emptying Study", "Hepatobiliary Scan"] },
  { category: "Bone Health & DEXA", items: ["DEXA Bone Scan", "Bone Density Test", "BMD Test", "Osteoporosis Screening"] },
  { category: "Cardiology Diagnostics", items: ["ECG", "ECG Test", "Electrocardiogram", "2D Echo", "2D Echo Test", "Echo Test", "Echocardiography", "Color Echo", "Stress Echo", "Dobutamine Stress Echo", "TMT Test", "Stress Test", "Holter Monitoring", "24 Hour Holter", "48 Hour Holter", "72 Hour Holter", "Ambulatory ECG", "Ambulatory BP Monitoring", "BP Monitoring", "24 Hour BP Monitoring", "Heart Screening", "Cardiac Screening", "Cardiac Risk Assessment", "Cardiac Evaluation"] },
  { category: "Cardiac Interventions", items: ["Angiography", "Coronary Angiography", "Angioplasty", "TAVR", "Cardiac Catheterization"] },
  { category: "Fibroscan & Liver Diagnostics", items: ["Fibroscan", "Fibroscan Test", "Liver Fibroscan", "Liver Elastography", "Hepatic Elastography", "Fatty Liver Assessment", "Fatty Liver Screening", "Fatty Liver Scan", "Liver Health Assessment", "Liver Screening", "Liver Fibrosis Assessment", "Liver Stiffness Test", "Cirrhosis Screening", "Chronic Liver Disease Screening"] },
  { category: "Genetic Testing & Molecular Diagnostics", items: ["Prenatal Test", "Prenatal Genetic Testing", "NIPT Test", "NIPS Test", "NIPPT", "Karyotype Test", "Chromosomal Analysis", "Chromosomal Testing", "Chromosome Analysis", "Genetic Test", "Genetic Screening", "Genetic Counselling", "Genetic Counselling Service", "Carrier Screening", "Carrier Testing", "DNA Test", "DNA Analysis", "Paternity Test", "Relationship DNA Test", "Molecular Diagnostics", "Cytogenetics", "Fertility Genetic Test", "Fertility Genetic Screening", "Reproductive Genetics", "Fetal Genetic Testing"] }
];

const ACCREDITATIONS = [
  { title: "NABL", img: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/b027e422-nabl-certified-henotic-diagnostics.webp"},
  { title: "ISO", img: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/b04115be-iso-certified-henotic-diagnostics.webp" },
  { title: "AERB", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b3a1aaeb-aerb-certified-henotic-diagnostics.webp" },
  { title: "PCPNDT", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/3a45d45f-pcpndt-certified-henotic-diagnostics.webp" },
  { title: "NABH", img: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/fb54c3da-nabh-certified-henotic-diagnostics.webp" }
];

export default function BookingForm() {
  const [formData, setFormData] = useState({ name: "", mobile: "", test: "", center: "", date: "", time: "" });
  const [progress, setProgress] = useState(0);

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
    // 🌟 ZERO VERTICAL GAPS: m-0 p-0 block display to sit flush with adjacent sections 🌟
    // LAYER 3 BACKGROUND: Full edge-to-edge gradient
    <section 
      className="w-full m-0 p-0 relative overflow-hidden block"
      style={{
        background: "linear-gradient(to right, #EC6EAD, #3494E6)"
      }}
    >
      {/* Dynamic Background Overlays for Depth */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.15]"></div>
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent"></div>

      {/* Internal Container: 100% width, no max-width constraints on mobile to be truly edge-to-edge */}
      <div className="w-full mx-auto px-0 sm:px-6 md:px-8 py-8 sm:py-16 md:py-24 relative z-10 max-w-7xl">
        
        {/* LAYER 1 BACKGROUND: Deep 3D Shadow Container */}
        {/* On mobile: no rounded corners so it bleeds to the edge. On desktop: beautifully rounded */}
        <div className="rounded-none sm:rounded-[2.5rem] p-0 sm:p-[4px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] w-full"
             style={{ background: "linear-gradient(90deg, #439CFB, #F187FB)" }}>
             
          {/* Frosted Glass Core: Square on mobile, rounded on desktop */}
          <div className="bg-white/95 backdrop-blur-3xl rounded-none sm:rounded-[2.3rem] p-6 sm:p-12 w-full border-y sm:border border-white/60 shadow-inner">
            
            {/* TOP HEADER & TRUST SIGNALS */}
            <div className="text-center mb-10 mt-4 sm:mt-0">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EC6EAD]/10 to-[#3494E6]/10 border border-[#3494E6]/20 text-[#3494E6] text-xs font-black uppercase tracking-widest mb-6 shadow-sm">
                <ShieldCheck size={18} /> Official Booking Portal
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight drop-shadow-md">
                Excellence in <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(to right, #EC6EAD, #3494E6)" }}>Diagnostics</span>
              </h2>
              <p className="text-slate-600 font-bold mb-6 md:text-lg">12+ Years of precision. NABL Accredited. Trusted by leading specialists.</p>
              
              <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm font-extrabold text-slate-700">
                <span className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-slate-100"><Award size={16} className="text-[#EC6EAD]"/> AERB Accredited Lab</span>
                <span className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-slate-100"><FileCheck size={16} className="text-[#3494E6]"/> PCPNDT Registered</span>
                <span className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-slate-100"><Activity size={16} className="text-[#EC6EAD]"/> 3T MRI & 128-Slice CT</span>
                <span className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-slate-100"><Clock size={16} className="text-[#3494E6]"/> Same Day Reports</span>
                <span className="bg-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-[0_5px_15px_rgba(0,0,0,0.08)] border border-slate-100"><MapPin size={16} className="text-[#EC6EAD]"/> Home Collection</span>
              </div>
            </div>

            {/* PROGRESS BAR WITH 3D EMBOSS */}
            <div className="mb-10 bg-white p-5 md:p-6 rounded-3xl border border-slate-200 shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="text-xl font-black text-slate-800 tracking-tight">Secure Appointment</h3>
                  <p className="text-sm font-bold text-slate-500">Complete details for priority confirmation.</p>
                </div>
                {/* LAYER 2 BACKGROUND: Text Gradient */}
                <span className="text-3xl font-black text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #3C8CDE, #ED73A8)" }}>
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                {/* LAYER 2 BACKGROUND: Progress Fill */}
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(237,115,168,0.5)]"
                  style={{ 
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #3C8CDE, #ED73A8)"
                  }}
                ></div>
              </div>
            </div>

            {/* HIGH END BOOKING FORM */}
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <User className="text-slate-400 group-focus-within:text-[#3494E6] transition-colors" size={22} />
                  </div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Patient Name" className="w-full pl-14 pr-5 py-5 rounded-2xl bg-slate-50 border-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 focus:ring-4 focus:ring-[#3494E6]/30 text-slate-800 font-bold outline-none transition-all text-lg" />
                </div>
                
                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Phone className="text-slate-400 group-focus-within:text-[#3494E6] transition-colors" size={22} />
                  </div>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile Number" className="w-full pl-14 pr-5 py-5 rounded-2xl bg-slate-50 border-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 focus:ring-4 focus:ring-[#3494E6]/30 text-slate-800 font-bold outline-none transition-all text-lg" />
                </div>
              </div>

              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Activity className="text-slate-400 group-focus-within:text-[#3494E6] transition-colors" size={22} />
                </div>
                <select aria-label="Select Test Category" name="test" value={formData.test} onChange={handleChange} required className="w-full pl-14 pr-5 py-5 rounded-2xl bg-slate-50 border-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 focus:ring-4 focus:ring-[#3494E6]/30 text-slate-800 font-bold outline-none transition-all appearance-none cursor-pointer text-lg">
                  <option value="" disabled>Select Test Name</option>
                  {SERVICES.map((category, idx) => (
                    <optgroup key={idx} label={category.category} className="font-bold text-slate-900 bg-slate-100">
                      {category.items.map((test, i) => (
                        <option key={i} value={test} className="font-medium text-slate-700 bg-white">{test}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                  <span className="text-slate-400">▼</span>
                </div>
              </div>

              <div className="relative group w-full">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <MapPin className="text-slate-400 group-focus-within:text-[#3494E6] transition-colors" size={22} />
                </div>
                <select aria-label="Select Nearest Center" name="center" value={formData.center} onChange={handleChange} required className="w-full pl-14 pr-5 py-5 rounded-2xl bg-slate-50 border-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 focus:ring-4 focus:ring-[#3494E6]/30 text-slate-800 font-bold outline-none transition-all appearance-none cursor-pointer text-lg">
                  <option value="" disabled>Select Nearest Center</option>
                  {LOCATIONS.map((region, idx) => (
                    <optgroup key={idx} label={region.region} className="font-bold text-slate-900 bg-slate-100">
                      {region.cities.map((city, i) => (
                        <option key={i} value={`${city}, ${region.region}`} className="font-medium text-slate-700 bg-white">{city}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                  <span className="text-slate-400">▼</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Calendar className="text-slate-400 group-focus-within:text-[#3494E6] transition-colors" size={22} />
                  </div>
                  <input aria-label="Select Date" type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full pl-14 pr-5 py-5 rounded-2xl bg-slate-50 border-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 focus:ring-4 focus:ring-[#3494E6]/30 text-slate-800 font-bold outline-none transition-all cursor-pointer text-lg" />
                </div>
                
                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Clock className="text-slate-400 group-focus-within:text-[#3494E6] transition-colors" size={22} />
                  </div>
                  <input aria-label="Select Time" type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full pl-14 pr-5 py-5 rounded-2xl bg-slate-50 border-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-slate-200 focus:ring-4 focus:ring-[#3494E6]/30 text-slate-800 font-bold outline-none transition-all cursor-pointer text-lg" />
                </div>
              </div>

              {/* PREMIUM WHATSAPP SUBMIT BUTTON */}
              <button 
                type="submit" 
                disabled={progress < 100}
                className={`w-full mt-6 py-5 px-6 rounded-2xl transform transition-all duration-300 flex items-center justify-center gap-3 text-lg md:text-xl font-black text-white ${progress === 100 ? 'bg-gradient-to-r from-[#25D366] to-[#1DA851] shadow-[0_20px_40px_-10px_rgba(37,211,102,0.6)] hover:shadow-[0_25px_50px_-10px_rgba(37,211,102,0.8)] hover:-translate-y-1 cursor-pointer border border-[#25D366]/50' : 'bg-slate-300 shadow-inner opacity-70 cursor-not-allowed'}`}
              >
                {/* CUSTOM WHATSAPP IMAGE ICON */}
                <img 
                  src="https://storage.googleapis.com/wp-media-henoticbucket/2026/01/c65e4696-whatsapp.webp" 
                  alt="WhatsApp" 
                  className={`w-8 h-8 object-contain ${progress === 100 ? 'drop-shadow-md' : 'opacity-50 grayscale'}`} 
                  loading="lazy" 
                  decoding="async" 
                />
                {progress === 100 ? "Confirm Appointment via WhatsApp" : `Complete Form to Book (${progress}%)`}
              </button>
            </form>

            {/* ACCREDITATIONS GRID - NEW DARK GLASSMORPHISM THEME */}
            <div 
              className="mt-12 rounded-3xl p-8 border border-white/10 shadow-inner relative overflow-hidden w-full"
              style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}
            >
              {/* Grid texture overlay inside the accreditation box */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] pointer-events-none"></div>
              
              <h4 className="relative z-10 text-center text-slate-300 text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2 drop-shadow-sm">
                <CheckCircle2 size={18} className="text-[#EC6EAD]" /> Accredited by National Bodies
              </h4>
              <div className="relative z-10 flex flex-wrap justify-center gap-4 sm:gap-8">
                {ACCREDITATIONS.map((acc, index) => (
                  <div key={index} className="flex flex-col items-center group">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center p-2.5 sm:p-3 mb-3 shadow-[0_10px_25px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_15px_35px_rgba(52,148,230,0.4)] border border-slate-200">
                      <img width="100" height="100" src={acc.img} alt={acc.title} className="w-full h-full object-contain drop-shadow-sm" loading="lazy" decoding="async" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-slate-300 tracking-wider uppercase group-hover:text-white transition-colors">{acc.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}