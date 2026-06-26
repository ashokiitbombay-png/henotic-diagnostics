"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { User, Phone, Activity, MapPin, Calendar, Clock, ShieldCheck, Award, FileCheck, CheckCircle2, Lock, HeartPulse } from "lucide-react";

import { services } from "@/config/services";
import { REGION_LOCATIONS, REGION_NAMES } from "@/config/locations";
import { validateBooking } from "@/lib/validations/bookingSchema";
import { submitBookingAction } from "@/actions/booking";
import { trackLeadSubmission } from "@/lib/analytics/tracking";
import Input from "@/components/ui/Input";
import { getSlotsForDate } from "@/actions/slots";

const formatSlug = (slug: string) => {
  const acronyms = ["mri", "ct", "pet", "nt", "usg", "ecg", "cbc", "lft", "kft", "hba1c", "dexa", "bmd", "tmt", "bpp", "fnac", "dtpa", "mag3", "gfr", "vdrl", "hiv", "hpv", "std", "sti", "tavr", "cbd", "hrct", "mrcp", "pns", "nipt", "nips", "nippt", "dna"];
  return slug.split('-').map(word => {
    const lower = word.toLowerCase();
    if (acronyms.includes(lower)) {
      if (lower === 'hba1c') return 'HbA1c';
      return word.toUpperCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

// --- STRUCTURED LOCATION DATA GENERATED DYNAMICALLY ---
const LOCATIONS = Object.entries(REGION_LOCATIONS).map(([regionSlug, cities]) => ({
  region: REGION_NAMES[regionSlug] || formatSlug(regionSlug),
  cities: cities.map((c) => {
    if (c === "cbd-belapur") return "CBD Belapur";
    if (c.endsWith("-east")) return formatSlug(c.replace("-east", "")) + " East";
    return formatSlug(c);
  })
}));

// --- SLUGS CATEGORY MAP FOR DYNAMIC GROUPING ---
const CATEGORY_SLUGS: Record<string, string[]> = {
  "Diagnostic Center & Health Screening": [
    "diagnostic-center", "medical-imaging-center", "radiology-center", "pathology-lab", "diagnostic-lab", 
    "diagnostic-services", "medical-diagnostics", "diagnostic-imaging", "medical-imaging", "radiology-services", 
    "health-checkup", "full-body-check-up", "master-health-checkup", "executive-health-checkup", "executive-health-screening", 
    "preventive-health-checkup", "preventive-health-screening", "annual-health-checkup", "corporate-health-checkup", 
    "employee-health-checkup", "pre-employment-health-checkup", "wellness-screening", "health-screening", 
    "women-health-checkup", "women-health-screening", "men-health-checkup", "men-health-screening", 
    "senior-citizen-health-checkup", "senior-health-checkup", "family-health-checkup", "heart-health-checkup", 
    "cardiac-health-checkup", "diabetes-health-checkup", "diabetes-health-screening", "cancer-screening", 
    "cancer-screening-package"
  ],
  "Pathology & Lab Tests": [
    "blood-test", "lab-test", "pathology-test", "home-blood-collection", "cbc-test", "lipid-profile", 
    "thyroid-test", "thyroid-profile", "liver-function-test", "kidney-function-test", "diabetes-test", 
    "hba1c-test", "vitamin-d-test", "vitamin-b12-test", "iron-profile", "urine-test", "stool-test", 
    "hormone-test", "allergy-test", "tumor-marker-test", "infection-test", "covid-test", "dengue-test", 
    "malaria-test", "typhoid-test"
  ],
  "Ultrasound & Sonography": [
    "ultrasound", "sonography", "usg-scan", "abdominal-ultrasound", "pelvic-ultrasound", "abdomen-pelvis-ultrasound", 
    "whole-abdomen-ultrasound", "whole-abdomen-sonography", "upper-abdomen-sonography", "lower-abdomen-sonography", 
    "kidney-ultrasound", "kub-ultrasound", "prostate-ultrasound", "scrotal-ultrasound", "testicular-ultrasound", 
    "groin-ultrasound", "inguinal-ultrasound", "thyroid-ultrasound", "breast-ultrasound", "neck-ultrasound", 
    "neck-sonography", "parotid-ultrasound", "salivary-gland-ultrasound", "axilla-ultrasound", "soft-tissue-ultrasound", 
    "musculoskeletal-ultrasound", "vascular-ultrasound", "small-parts-ultrasound", "transvaginal-ultrasound", 
    "transrectal-ultrasound", "guided-ultrasound", "guided-fnac", "guided-biopsy", "ultrasound-guided-procedure"
  ],
  "Pregnancy & Fetal Medicine": [
    "pregnancy-sonography", "obstetric-ultrasound", "early-pregnancy-scan", "pregnancy-dating-scan", 
    "dating-scan", "viability-scan", "first-trimester-scan", "second-trimester-scan", "third-trimester-scan", 
    "nt-scan", "anomaly-scan", "target-scan", "targeted-anomaly-scan", "level-2-scan", "growth-scan", 
    "fetal-growth-scan", "fetal-wellbeing-scan", "fetal-weight-estimation", "cervical-length-scan", 
    "fetal-doppler", "fetal-doppler-study", "fetal-echocardiography", "fetal-echo", "fetal-bpp", 
    "biophysical-profile", "bpp-scan", "high-risk-pregnancy-scan", "multiple-pregnancy-scan", 
    "twin-pregnancy-scan", "antenatal-scan", "fetal-medicine-scan"
  ],
  "Doppler Studies": [
    "color-doppler", "doppler-scan", "pregnancy-doppler", "obstetric-doppler", "arterial-doppler", 
    "venous-doppler", "vascular-doppler", "vascular-color-doppler", "carotid-doppler", "carotid-artery-doppler", 
    "renal-doppler", "uterine-artery-doppler", "uterine-doppler", "umbilical-artery-doppler", 
    "middle-cerebral-artery-doppler", "lower-limb-doppler", "upper-limb-doppler", "peripheral-arterial-doppler", 
    "venous-insufficiency-scan", "deep-vein-thrombosis-scan", "dvt-doppler"
  ],
  "Women's Health & Breast Imaging": [
    "mammography", "digital-mammography", "3d-mammography", "sonomammography", "breast-imaging", 
    "breast-screening", "breast-cancer-screening", "breast-diagnostics", "digital-breast-tomosynthesis", 
    "3d-breast-imaging", "follicular-study", "fertility-scan", "fertility-assessment", "fertility-monitoring", 
    "ovulation-study", "ovulation-monitoring", "reproductive-health-screening", "gynecology-ultrasound", 
    "pelvic-scan-for-fertility", "hsg-test", "ssg-test"
  ],
  "MRI Services": [
    "mri-scan", "mri-brain", "brain-mri", "mri-spine", "spine-mri", "cervical-spine-mri", 
    "lumbar-spine-mri", "whole-spine-mri", "mri-neck", "mri-shoulder", "shoulder-mri", "mri-elbow", 
    "mri-wrist", "mri-hand", "mri-hip", "mri-thigh", "mri-knee", "knee-mri", "mri-ankle", "mri-foot", 
    "mri-joint", "pelvis-mri", "abdominal-mri", "mri-whole-abdomen", "breast-mri", "cardiac-mri", 
    "mri-pituitary", "mri-orbit", "mri-face", "mri-paranasal-sinus", "mri-prostate", "mri-enterography", 
    "mri-mrcp", "mrcp-scan", "mr-angiography", "mri-angiography", "whole-body-mri", "contrast-mri", 
    "mri-brain-screening"
  ],
  "CT Scan Services": [
    "ct-scan", "hrct-scan", "hrct-chest", "ct-brain", "brain-ct-scan", "ct-neck", "ct-face", 
    "ct-orbit", "ct-pns", "ct-temporal-bone", "ct-spine", "chest-ct-scan", "abdomen-ct-scan", 
    "ct-abdomen-pelvis", "ct-kub", "cardiac-ct-scan", "ct-angiography", "coronary-ct-angiography", 
    "ct-coronary-angiography", "ct-pulmonary-angiography", "ct-enterography", "ct-colonography", 
    "ct-urology", "ct-guided-biopsy", "ct-guided-fnac", "whole-body-ct-scan", "contrast-ct-scan", 
    "low-dose-ct", "lung-cancer-screening-ct"
  ],
  "PET CT & Nuclear Medicine": [
    "pet-scan", "pet-ct", "whole-body-pet-ct", "whole-body-pet-scan", "fdg-pet-ct", "oncology-pet-ct", 
    "cardiac-pet-ct", "neurology-pet-ct", "cancer-pet-scan", "pet-cancer-screening", "spect-scan", 
    "nuclear-medicine", "dtpa-scan", "ec-scan", "renal-scan", "renal-function-scan", "ec-renal-scan", 
    "mag3-scan", "bone-scan", "bone-scintigraphy", "thyroid-scan", "thyroid-scintigraphy", 
    "thyroid-uptake-scan", "parathyroid-scan", "gfr-test", "myocardial-perfusion-scan", 
    "lung-perfusion-scan", "gastric-emptying-study", "hepatobiliary-scan"
  ],
  "Bone Health & DEXA": [
    "dexa-bone-scan", "bone-density-test", "bmd-test", "osteoporosis-screening"
  ],
  "Cardiology Diagnostics": [
    "ecg", "ecg-test", "electrocardiogram", "2d-echo", "2d-echo-test", "echo-test", "echocardiography", 
    "color-echo", "stress-echo", "dobutamine-stress-echo", "tmt-test", "stress-test", "holter-monitoring", 
    "24-hour-holter", "48-hour-holter", "72-hour-holter", "ambulatory-ecg", "ambulatory-bp-monitoring", 
    "bp-monitoring", "24-hour-bp-monitoring", "heart-screening", "cardiac-screening", 
    "cardiac-risk-assessment", "cardiac-evaluation"
  ],
  "Cardiac Interventions": [
    "angiography", "coronary-angiography", "angioplasty", "tavr", "cardiac-catheterization"
  ],
  "Fibroscan & Liver Diagnostics": [
    "fibroscan", "fibroscan-test", "liver-fibroscan", "liver-elastography", "hepatic-elastography", 
    "fatty-liver-assessment", "fatty-liver-screening", "fatty-liver-scan", "liver-health-assessment", 
    "liver-screening", "liver-fibrosis-assessment", "liver-stiffness-test", "cirrhosis-screening", 
    "chronic-liver-disease-screening"
  ],
  "Genetic Testing & Molecular Diagnostics": [
    "prenatal-test", "prenatal-genetic-testing", "nipt-test", "nips-test", "nippt", "karyotype-test", 
    "chromosomal-analysis", "chromosomal-testing", "chromosome-analysis", "genetic-test", 
    "genetic-screening", "genetic-counselling", "genetic-counselling-service", "carrier-screening", 
    "carrier-testing", "dna-test", "dna-analysis", "paternity-test", "relationship-dna-test", 
    "molecular-diagnostics", "cytogenetics", "fertility-genetic-test", "fertility-genetic-screening", 
    "reproductive-genetics", "fetal-genetic-testing"
  ]
};

// --- STRUCTURED SERVICES DATA GENERATED DYNAMICALLY ---
const SERVICES = Object.entries(CATEGORY_SLUGS).map(([category, slugs]) => ({
  category,
  items: slugs.filter(s => services.includes(s)).map(formatSlug)
}));

const ACCREDITATIONS = [
  { title: "NABL", img: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/b027e422-nabl-certified-henotic-diagnostics.webp"},
  { title: "ISO", img: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/b04115be-iso-certified-henotic-diagnostics.webp" },
  { title: "AERB", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/b3a1aaeb-aerb-certified-henotic-diagnostics.webp" },
  { title: "PCPNDT", img: "https://storage.googleapis.com/wp-media-henoticbucket/2026/01/3a45d45f-pcpndt-certified-henotic-diagnostics.webp" },
  { title: "NABH", img: "https://storage.googleapis.com/wp-media-henoticbucket/Miscellaneous%20Section%20Images/fb54c3da-nabh-certified-henotic-diagnostics.webp" }
];

export default function BookingForm() {
  const [formData, setFormData] = useState({ name: "", mobile: "", test: "", center: "", date: "", time: "", slotId: "" });
  const [progress, setProgress] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [availableSlots, setAvailableSlots] = useState<{ id: string; time: string; available: boolean }[]>([]);
  const [utmData, setUtmData] = useState({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: ""
  });

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const source = params.get("utm_source") || sessionStorage.getItem("utm_source") || "";
      const medium = params.get("utm_medium") || sessionStorage.getItem("utm_medium") || "";
      const campaign = params.get("utm_campaign") || sessionStorage.getItem("utm_campaign") || "";
      const term = params.get("utm_term") || sessionStorage.getItem("utm_term") || "";
      const content = params.get("utm_content") || sessionStorage.getItem("utm_content") || "";

      if (params.get("utm_source")) sessionStorage.setItem("utm_source", params.get("utm_source")!);
      if (params.get("utm_medium")) sessionStorage.setItem("utm_medium", params.get("utm_medium")!);
      if (params.get("utm_campaign")) sessionStorage.setItem("utm_campaign", params.get("utm_campaign")!);
      if (params.get("utm_term")) sessionStorage.setItem("utm_term", params.get("utm_term")!);
      if (params.get("utm_content")) sessionStorage.setItem("utm_content", params.get("utm_content")!);

      setUtmData({
        utmSource: source,
        utmMedium: medium,
        utmCampaign: campaign,
        utmTerm: term,
        utmContent: content
      });
    } catch (e) {
      console.warn("Failed to parse or save UTM params:", e);
    }
  }, []);

  useEffect(() => {
    let filled = 0;
    if (formData.name.trim() !== "") filled += 20;
    if (formData.mobile.trim() !== "" && formData.mobile.length >= 10) filled += 20;
    if (formData.test !== "") filled += 20;
    if (formData.center !== "") filled += 20;
    if (formData.date !== "" && (formData.slotId !== "" || formData.time !== "")) filled += 20;
    setProgress(filled);
  }, [formData]);

  const fetchSlots = (date: string, center: string, test: string) => {
    if (!date || !center || !test) return;
    startTransition(async () => {
      try {
        const response = await getSlotsForDate(date, center, test);
        if (response.success && response.slots) {
          setAvailableSlots(response.slots);
          setFormData(prev => ({
            ...prev,
            slotId: response.slots!.some(s => s.id === prev.slotId) ? prev.slotId : ""
          }));
        } else {
          setAvailableSlots([]);
        }
      } catch (err) {
        console.error("Failed fetching CRM slots:", err);
        setAvailableSlots([]);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "date" || name === "center" || name === "test") {
      const updatedDate = name === "date" ? value : formData.date;
      const updatedCenter = name === "center" ? value : formData.center;
      const updatedTest = name === "test" ? value : formData.test;
      fetchSlots(updatedDate, updatedCenter, updatedTest);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const selectedSlotTime = formData.slotId === "custom" 
      ? formData.time 
      : (availableSlots.find(s => s.id === formData.slotId)?.time || formData.time || "");

    // 1. Run Shared Validation
    const validation = validateBooking({
      name: formData.name,
      phone: formData.mobile,
      service: formData.test,
      location: formData.center,
      date: formData.date,
      time: selectedSlotTime
    });

    if (!validation.success) {
      alert(Object.values(validation.errors || {}).join("\n"));
      return;
    }

    // 🚀 GOOGLE ADS CONVERSION TRACKING
    trackLeadSubmission(formData.test, formData.center);

    // 2. Trigger Server Action asynchronously (runs in background to write to CRM)
    submitBookingAction({
      name: formData.name,
      phone: formData.mobile,
      service: formData.test,
      location: formData.center,
      date: formData.date,
      time: selectedSlotTime,
      slotId: formData.slotId === "custom" ? "custom_slot" : formData.slotId,
      ...utmData
    })
    .then((res) => {
      if (res.success && res.crmBooked) {
        console.log(`✅ [CRM BOOKING SUCCESS] Appointment created in CRM. ID: ${res.appointmentId}`);
      } else {
        console.warn(`⚠️ [CRM BOOKING FALLBACK] CRM fallback response:`, res.message);
      }
    })
    .catch(err => {
      console.error("❌ Error triggering server action:", err);
    });

    // 3. ALWAYS open client-side WhatsApp message link for manual agent monitoring
    const message = `*NEW PRIORITY BOOKING*%0A%0A*Patient Details:*%0A👤 Name: ${formData.name}%0A📱 Mobile: ${formData.mobile}%0A%0A*Test Details:*%0A🏥 Center: ${formData.center}%0A🔬 Test: ${formData.test}%0A📅 Date: ${formData.date || "Not Specified"}%0A⏰ Time: ${selectedSlotTime || "Not Specified"}%0A%0A_Sent via Official Henotic Diagnostics Portal_`;
    window.open(`https://wa.me/918879327184?text=${message}`, '_blank');
  };

  return (
    // 🌟 ZERO VERTICAL GAPS: m-0 p-0 block display
    // LAYER 1 BACKGROUND: Full edge-to-edge section gradient
    <section 
      className="w-full m-0 p-0 relative overflow-hidden block"
      style={{ backgroundImage: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)" }}
    >
      {/* Dynamic Background Overlays for Depth */}
      <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-[0.2]"></div>
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>

      {/* Internal Container: 100% width, edge-to-edge on mobile */}
      <div className="w-full mx-auto px-0 sm:px-6 md:px-8 py-8 sm:py-16 md:py-24 relative z-10 max-w-7xl">
        
        {/* LAYER 2 BACKGROUND: Shadow Container wrapper */}
        <div className="rounded-none sm:rounded-[2.5rem] p-0 sm:p-[6px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] w-full"
             style={{ backgroundImage: "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)" }}>
             
          {/* LAYER 3 BACKGROUND: Inner Form Box */}
          <div className="rounded-none sm:rounded-[2.2rem] p-6 sm:p-12 w-full shadow-inner relative overflow-hidden"
               style={{ backgroundImage: "linear-gradient(to top, #df89b5 0%, #bfd9fe 100%)" }}>
            
            {/* Soft inner glass overlay to ensure text is readable over the gradient */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>

            <div className="relative z-10">
              {/* TOP HEADER & TRUST SIGNALS */}
              <div className="text-center mb-10 mt-4 sm:mt-0">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 border border-white/60 text-slate-800 text-xs font-black uppercase tracking-widest mb-6 shadow-sm backdrop-blur-md">
                  <ShieldCheck size={18} className="text-[#d57eeb]" /> Official Booking Portal
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight drop-shadow-sm">
                  Excellence in <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(120deg, #d57eeb, #f68084)" }}>Diagnostics</span>
                </h2>
                <p className="text-slate-800 font-bold mb-6 md:text-lg drop-shadow-sm">12+ Years of precision. NABL Accredited. Trusted by leading specialists.</p>
                
                <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm font-extrabold text-slate-700">
                  <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-white"><Award size={16} className="text-[#f68084]"/> AERB Accredited</span>
                  <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-white"><FileCheck size={16} className="text-[#d57eeb]"/> PCPNDT Registered</span>
                  <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-white"><Activity size={16} className="text-[#a6c0fe]"/> 3T MRI & 128-Slice CT</span>
                  <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-white"><Clock size={16} className="text-[#fccb90]"/> Same Day Reports</span>
                  <span className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-white"><MapPin size={16} className="text-[#df89b5]"/> Home Collection</span>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="mb-10 bg-white/70 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-white shadow-sm">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Secure Appointment</h3>
                    <p className="text-sm font-bold text-slate-600">Complete details for priority confirmation.</p>
                  </div>
                  <span className="text-3xl font-black text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(120deg, #f68084, #d57eeb)" }}>
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-white/50 h-4 rounded-full overflow-hidden shadow-inner border border-white">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(246,128,132,0.6)]"
                    style={{ 
                      width: `${progress}%`,
                      backgroundImage: "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)"
                    }}
                  ></div>
                </div>
              </div>

              {/* HIGH END BOOKING FORM */}
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                
                {/* 🌟 NEW INTERNAL TRUST SIGNALS 🌟 */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 bg-white/40 backdrop-blur-md py-3 px-4 rounded-2xl border border-white shadow-sm mb-6">
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
                    <Lock size={16} className="text-[#d57eeb]" /> 256-Bit Secure
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-400/50"></div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
                    <HeartPulse size={16} className="text-[#f68084]" /> Priority Care
                  </div>
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-400/50"></div>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-800 uppercase tracking-wide">
                    <ShieldCheck size={16} className="text-[#a6c0fe]" /> No Hidden Fees
                  </div>
                </div>

                {/* Form Fields - White frosted glass for readability */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <Input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Patient Name" 
                    icon={User} 
                  />
                  <Input 
                    type="tel" 
                    name="mobile" 
                    value={formData.mobile} 
                    onChange={handleChange} 
                    required 
                    placeholder="Mobile Number" 
                    icon={Phone} 
                  />
                </div>

                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Activity className="text-slate-500 group-focus-within:text-[#d57eeb] transition-colors" size={22} />
                  </div>
                  <select aria-label="Select Test Category" name="test" value={formData.test} onChange={handleChange} required className="w-full pl-14 pr-5 py-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm focus:ring-4 focus:ring-[#d57eeb]/40 text-slate-900 font-bold outline-none transition-all appearance-none cursor-pointer text-lg">
                    <option value="" disabled className="text-slate-500">Select Test Name</option>
                    {SERVICES.map((category, idx) => (
                      <optgroup key={idx} label={category.category} className="font-bold text-slate-900 bg-slate-100">
                        {category.items.map((test, i) => (
                          <option key={i} value={test} className="font-medium text-slate-700 bg-white">{test}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <span className="text-slate-500">▼</span>
                  </div>
                </div>

                <div className="relative group w-full">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <MapPin className="text-slate-500 group-focus-within:text-[#d57eeb] transition-colors" size={22} />
                  </div>
                  <select aria-label="Select Nearest Center" name="center" value={formData.center} onChange={handleChange} required className="w-full pl-14 pr-5 py-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm focus:ring-4 focus:ring-[#d57eeb]/40 text-slate-900 font-bold outline-none transition-all appearance-none cursor-pointer text-lg">
                    <option value="" disabled className="text-slate-500">Select Nearest Center</option>
                    {LOCATIONS.map((region, idx) => (
                      <optgroup key={idx} label={region.region} className="font-bold text-slate-900 bg-slate-100">
                        {region.cities.map((city, i) => (
                          <option key={i} value={`${city}, ${region.region}`} className="font-medium text-slate-700 bg-white">{city}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <span className="text-slate-500">▼</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <Input 
                    aria-label="Select Date" 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={handleChange} 
                    required 
                    icon={Calendar} 
                    className="cursor-pointer"
                  />
                  
                  {isPending ? (
                    <div className="relative group w-full">
                      <div className="w-full pl-5 pr-5 py-[22px] rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm text-slate-500 font-bold text-lg select-none animate-pulse">
                        Loading available slots...
                      </div>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="flex flex-col gap-6 w-full">
                      <div className="relative group w-full">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <Clock className="text-slate-500 group-focus-within:text-[#d57eeb] transition-colors" size={22} />
                        </div>
                        <select 
                          aria-label="Select Appointment Slot"
                          name="slotId" 
                          value={formData.slotId} 
                          onChange={handleChange} 
                          required 
                          className="w-full pl-14 pr-10 py-5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white shadow-sm focus:ring-4 focus:ring-[#d57eeb]/40 text-slate-900 font-bold outline-none transition-all appearance-none cursor-pointer text-lg"
                        >
                          <option value="" disabled>Select Time Slot</option>
                          {availableSlots.map(slot => (
                            <option key={slot.id} value={slot.id}>
                              {slot.time}
                            </option>
                          ))}
                          <option value="custom">Choose Custom Time...</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                          <span className="text-slate-500">▼</span>
                        </div>
                      </div>

                      {formData.slotId === "custom" && (
                        <Input 
                          aria-label="Select Custom Time" 
                          type="time" 
                          name="time" 
                          value={formData.time} 
                          onChange={handleChange} 
                          required 
                          icon={Clock} 
                          className="cursor-pointer"
                        />
                      )}
                    </div>
                  ) : (
                    <Input 
                      aria-label="Select Time" 
                      type="time" 
                      name="time" 
                      value={formData.time} 
                      onChange={handleChange} 
                      required 
                      icon={Clock} 
                      className="cursor-pointer"
                    />
                  )}
                </div>

                {/* PREMIUM WHATSAPP SUBMIT BUTTON */}
                <button 
                  type="submit" 
                  className="w-full mt-6 py-5 px-6 rounded-2xl transform transition-all duration-300 flex items-center justify-center gap-3 text-lg md:text-xl font-black text-white bg-gradient-to-r from-[#25D366] to-[#1DA851] shadow-[0_20px_40px_-10px_rgba(37,211,102,0.6)] hover:shadow-[0_25px_50px_-10px_rgba(37,211,102,0.8)] hover:-translate-y-1 cursor-pointer border border-white/40"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="https://storage.googleapis.com/wp-media-henoticbucket/SVG%20files%20/whatsapp.svg" 
                    alt="WhatsApp" 
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain drop-shadow-md" 
                  />
                  Confirm Appointment via WhatsApp
                </button>
              </form>

              {/* ACCREDITATIONS GRID - DARK GLASS */}
              <div 
                className="mt-12 rounded-3xl p-8 border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)] relative overflow-hidden w-full"
                style={{ background: "linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.9) 100%)", backdropFilter: "blur(12px)" }}
              >
                <div className="absolute inset-0 bg-[url('/patterns/cubes.png')] opacity-[0.1] pointer-events-none"></div>
                
                <h4 className="relative z-10 text-center text-white text-sm font-black uppercase tracking-[0.2em] mb-6 flex items-center justify-center gap-2 drop-shadow-sm">
                  <CheckCircle2 size={18} className="text-[#fccb90]" /> Accredited by National Bodies
                </h4>
                <div className="relative z-10 flex flex-wrap justify-center gap-4 sm:gap-8">
                  {ACCREDITATIONS.map((acc, index) => (
                    <div key={index} className="flex flex-col items-center group">
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center p-2.5 sm:p-3 mb-3 shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_15px_35px_rgba(246,128,132,0.4)] border border-white">
                        <Image width={56} height={56} src={acc.img} alt={acc.title} className="w-full h-full object-contain drop-shadow-sm" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-black text-slate-200 tracking-wider uppercase group-hover:text-white transition-colors">{acc.title}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}