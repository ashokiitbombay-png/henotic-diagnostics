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
import CertificateViewer from "@/components/ui/CertificateViewer";
import { CERTIFICATE_MAP } from "@/config/certificates";
import { triggerGCRSurvey } from "@/components/monitoring/GoogleCustomerReviews";

const formatSlug = (slug: string) => {
  const acronyms = ["mri", "ct", "pet", "nt", "usg", "ecg", "cbc", "lft", "kft", "hba1c", "dexa", "bmd", "tmt", "bpp", "fnac", "dtpa", "mag3", "gfr", "vdrl", "hiv", "hpv", "std", "sti", "tavr", "cbd", "hrct", "mrcp", "pns", "nipt", "nips", "nippt", "dna", "ngs", "rna", "fapi", "dota", "dopa", "psma", "als", "bls", "icu"];
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
  "Diagnostic Services": [
    "diagnostic-center", "medical-imaging-center", "radiology-center", "pathology-lab", "diagnostic-lab", 
    "diagnostic-services", "medical-diagnostics", "diagnostic-imaging", "medical-imaging", "radiology-services"
  ],
  "Health Checkups & Screening": [
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
  "Breast Imaging": [
    "mammography", "digital-mammography", "3d-mammography", "sonomammography", "breast-imaging", 
    "breast-screening", "breast-cancer-screening", "breast-diagnostics", "digital-breast-tomosynthesis", 
    "3d-breast-imaging"
  ],
  "Women's Health & Fertility": [
    "follicular-study", "fertility-scan", "fertility-assessment", "fertility-monitoring", 
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
    "lung-perfusion-scan", "gastric-emptying-study", "hepatobiliary-scan",
    "fapi-pet-ct", "fapi-pet-scan", "dota-pet-ct", "dota-pet-scan", "dopa-scan", "dopa-pet-ct", "psma-pet-scan"
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
  ],
  "Genomic Sequencing": [
    "whole-exome-sequencing", "whole-genome-sequencing", "clinical-exome-sequencing", "targeted-gene-panel",
    "next-generation-sequencing", "trio-whole-exome-sequencing", "rna-sequencing", "transcriptome-sequencing",
    "exome-plus-sequencing", "mitochondrial-genome-sequencing", "long-read-genome-sequencing",
    "copy-number-variation-analysis", "chromosomal-microarray", "whole-transcriptome-sequencing",
    "metagenomic-sequencing", "16s-rrna-sequencing", "cell-free-dna-sequencing", "liquid-biopsy-ngs",
    "somatic-tumor-sequencing", "germline-sequencing"
  ],
  "Microbiome Testing": [
    "gut-microbiome-test", "gut-health-test", "stool-microbiome-analysis", "16s-rrna-sequencing",
    "metagenomic-sequencing", "gut-dysbiosis-test", "gut-flora-analysis", "microbiome-dna-sequencing"
  ],
  "Urology Diagnostics": [
    "uroflowmetry", "urodynamic-study", "complete-urodynamic-study", "video-urodynamic-study",
    "cystometry", "pressure-flow-study", "post-void-residual-urine", "urethral-pressure-profile",
    "leak-point-pressure-test", "pelvic-floor-electromyography"
  ],
  "Ambulance Services": [
    "emergency-ambulance", "24x7-ambulance-service", "ambulance-booking", "icu-ambulance",
    "als-ambulance", "bls-ambulance", "ventilator-ambulance", "cardiac-ambulance", "oxygen-ambulance",
    "neonatal-ambulance", "pediatric-ambulance", "patient-transport-ambulance",
    "hospital-transfer-ambulance", "long-distance-ambulance", "wheelchair-ambulance",
    "stretcher-ambulance", "air-ambulance", "event-medical-ambulance", "dead-body-ambulance",
    "mortuary-ambulance", "freezer-box-service"
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
  const [activeCert, setActiveCert] = useState<{ url: string; title: string } | null>(null);
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

        // 🌟 Trigger Google Customer Reviews opt-in survey
        // This enables store rating collection in Merchant Center (ID: 5502255117)
        triggerGCRSurvey({
          orderId: res.appointmentId || `HENO-${Date.now()}`,
          email: `${formData.mobile}@henotic.in`, // Fallback email from phone
          estimatedDeliveryDate: formData.date || new Date(Date.now() + 86400000).toISOString().split('T')[0],
        });
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

  /* ─── SELECT FIELD SHARED CLASSES ─── */
  const selectClasses = "w-full pl-12 sm:pl-14 pr-10 py-4 sm:py-[18px] rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 text-slate-900 font-semibold outline-none transition-all duration-200 appearance-none cursor-pointer text-base";

  return (
    <>
    {/* ═══════════════════════════════════════════════════════════════ */}
    {/* EDGE-TO-EDGE PREMIUM GRADIENT SECTION                         */}
    {/* ═══════════════════════════════════════════════════════════════ */}
    <section className="w-full m-0 p-0 relative overflow-hidden block">

      {/* ── PRIMARY GRADIENT BACKGROUND: Indigo → Violet → Pink ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500"></div>

      {/* ── DECORATIVE ANIMATED ORBS ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-400/30 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute top-1/2 right-[-10%] w-64 h-64 sm:w-80 sm:h-80 bg-pink-400/25 rounded-full blur-[60px] animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-15%] left-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-violet-300/20 rounded-full blur-[70px] animate-[pulse_4s_ease-in-out_infinite]"></div>
      </div>

      {/* ── SUBTLE NOISE TEXTURE ── */}
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}></div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 w-full px-0 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="w-full max-w-5xl mx-auto">

          {/* ══════════════════════════════════════════════════════ */}
          {/* FROSTED GLASS FORM CARD                               */}
          {/* ══════════════════════════════════════════════════════ */}
          <div className="rounded-none sm:rounded-3xl bg-white/[0.12] backdrop-blur-2xl border-0 sm:border border-white/20 shadow-2xl shadow-black/10 overflow-hidden">

            {/* ── INNER WHITE CARD ── */}
            <div className="bg-white/95 backdrop-blur-xl rounded-none sm:rounded-3xl m-0 sm:m-[3px]">

              {/* ── TOP HERO BANNER (gradient strip) ── */}
              <div className="bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 px-4 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 text-center relative overflow-hidden">
                {/* Subtle white overlay dots */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white/90 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] mb-4 sm:mb-5 border border-white/20">
                    <ShieldCheck size={14} className="text-amber-300" /> Official Booking Portal
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4 tracking-tight leading-tight">
                    Excellence in <span className="text-amber-200">Diagnostics</span>
                  </h2>
                  <p className="text-white/80 font-semibold text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                    12+ Years of precision. NABL Accredited. Trusted by leading specialists.
                  </p>

                  {/* Trust Badges Row */}
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-5 sm:mt-6">
                    {[
                      { icon: Award, label: "AERB Accredited" },
                      { icon: FileCheck, label: "PCPNDT Registered" },
                      { icon: Activity, label: "3T MRI & 128-Slice CT" },
                      { icon: Clock, label: "Same Day Reports" },
                      { icon: MapPin, label: "Home Collection" },
                    ].map(({ icon: BadgeIcon, label }) => (
                      <span key={label} className="bg-white/15 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-white/90 border border-white/15 whitespace-nowrap">
                        <BadgeIcon size={13} className="text-amber-300 shrink-0" />{label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── FORM BODY ── */}
              <div className="px-4 sm:px-8 md:px-10 py-6 sm:py-8 md:py-10">

                {/* ── PROGRESS BAR ── */}
                <div className="mb-6 sm:mb-8 bg-slate-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-end mb-2.5 sm:mb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Secure Appointment</h3>
                      <p className="text-xs sm:text-sm font-medium text-slate-500">Complete details for priority confirmation.</p>
                    </div>
                    <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500">
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200/60 h-2.5 sm:h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* ── BOOKING FORM ── */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 w-full">
                  
                  {/* Trust Signals Bar */}
                  <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 bg-gradient-to-r from-indigo-50 via-violet-50 to-pink-50 py-3 px-4 rounded-xl sm:rounded-2xl border border-indigo-100/60">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wide">
                      <Lock size={13} className="text-indigo-500" /> 256-Bit Secure
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-violet-300"></div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wide">
                      <HeartPulse size={13} className="text-pink-500" /> Priority Care
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-violet-300"></div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black text-slate-700 uppercase tracking-wide">
                      <ShieldCheck size={13} className="text-violet-500" /> No Hidden Fees
                    </div>
                  </div>

                  {/* Name + Mobile Row: Vertical on mobile, horizontal on desktop */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
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

                  {/* Test Select */}
                  <div className="relative group w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none z-10">
                      <Activity className="text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200" size={20} />
                    </div>
                    <select aria-label="Select Test Category" name="test" value={formData.test} onChange={handleChange} required className={selectClasses}>
                      <option value="" disabled className="text-slate-400">Select Test Name</option>
                      {SERVICES.map((category, idx) => (
                        <optgroup key={idx} label={category.category} className="font-bold text-slate-900 bg-slate-50">
                          {category.items.map((test, i) => (
                            <option key={i} value={test} className="font-medium text-slate-700 bg-white">{test}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  {/* Center Select */}
                  <div className="relative group w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none z-10">
                      <MapPin className="text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200" size={20} />
                    </div>
                    <select aria-label="Select Nearest Center" name="center" value={formData.center} onChange={handleChange} required className={selectClasses}>
                      <option value="" disabled className="text-slate-400">Select Nearest Center</option>
                      {LOCATIONS.map((region, idx) => (
                        <optgroup key={idx} label={region.region} className="font-bold text-slate-900 bg-slate-50">
                          {region.cities.map((city, i) => (
                            <option key={i} value={`${city}, ${region.region}`} className="font-medium text-slate-700 bg-white">{city}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  {/* Date + Time Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
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
                        <div className="w-full pl-4 sm:pl-5 pr-5 py-4 sm:py-[18px] rounded-xl sm:rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-sm text-slate-400 font-semibold text-base select-none animate-pulse">
                          Loading available slots...
                        </div>
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <div className="flex flex-col gap-4 sm:gap-5 w-full">
                        <div className="relative group w-full">
                          <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none z-10">
                            <Clock className="text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200" size={20} />
                          </div>
                          <select 
                            aria-label="Select Appointment Slot"
                            name="slotId" 
                            value={formData.slotId} 
                            onChange={handleChange} 
                            required 
                            className={selectClasses}
                          >
                            <option value="" disabled>Select Time Slot</option>
                            {availableSlots.map(slot => (
                              <option key={slot.id} value={slot.id}>
                                {slot.time}
                              </option>
                            ))}
                            <option value="custom">Choose Custom Time...</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-4 sm:pr-5 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
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

                  {/* ── PREMIUM WHATSAPP SUBMIT BUTTON ── */}
                  <button 
                    type="submit" 
                    className="w-full mt-4 sm:mt-6 py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl transform transition-all duration-300 flex items-center justify-center gap-2.5 sm:gap-3 text-base sm:text-lg md:text-xl font-black text-white bg-gradient-to-r from-[#25D366] to-[#1DA851] shadow-[0_12px_30px_-6px_rgba(37,211,102,0.5)] hover:shadow-[0_18px_40px_-6px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-emerald-400/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 drop-shadow-md">
                      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.13 6.742 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.336 22.594c-.39 1.1-1.932 2.012-3.182 2.278-.856.18-1.974.324-5.738-1.234-4.816-1.994-7.912-6.878-8.152-7.196-.232-.318-1.934-2.578-1.934-4.916s1.224-3.486 1.658-3.964c.434-.478.95-.598 1.266-.598.316 0 .63.004.906.016.29.014.68-.11 1.064.812.39.94 1.328 3.242 1.444 3.478.116.236.194.512.038.83-.156.318-.234.516-.468.796-.234.278-.492.622-.702.834-.234.236-.478.492-.206.964.274.472 1.216 2.006 2.61 3.25 1.792 1.6 3.304 2.096 3.774 2.33.47.234.746.196 1.02-.118.274-.316 1.178-1.374 1.492-1.846.316-.472.63-.39 1.064-.234.434.156 2.748 1.296 3.218 1.532.47.236.784.354.9.55.116.194.116 1.138-.274 2.236z"/>
                    </svg>
                    Confirm Appointment via WhatsApp
                  </button>
                </form>

                {/* ══════════════════════════════════════════════════ */}
                {/* ACCREDITATIONS — PREMIUM DARK GLASS               */}
                {/* ══════════════════════════════════════════════════ */}
                <div className="mt-8 sm:mt-10 rounded-2xl sm:rounded-3xl overflow-hidden relative">
                  {/* Dark gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"></div>
                  {/* Subtle dot pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                  
                  <div className="relative z-10 p-6 sm:p-8">
                    <h4 className="text-center text-white/90 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-5 sm:mb-6 flex items-center justify-center gap-2">
                      <CheckCircle2 size={15} className="text-amber-400" /> Accredited by National Bodies
                    </h4>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                      {ACCREDITATIONS.map((acc, index) => {
                        const certUrl = CERTIFICATE_MAP[acc.title.toUpperCase()] || CERTIFICATE_MAP[acc.title];
                        return (
                          <button 
                            key={index} 
                            type="button"
                            onClick={() => certUrl && setActiveCert({ url: certUrl, title: `${acc.title} Certificate — Henotic Diagnostics` })}
                            className={`flex flex-col items-center group ${certUrl ? 'cursor-pointer' : 'cursor-default'}`}
                            aria-label={certUrl ? `View ${acc.title} certificate` : acc.title}
                            title={certUrl ? `Click to view ${acc.title} Certificate` : acc.title}
                          >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/95 rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-2.5 md:p-3 mb-2 sm:mb-3 shadow-lg shadow-black/20 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-violet-500/20 group-active:scale-95 border border-white/50">
                              <Image width={56} height={56} src={acc.img} alt={acc.title} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[9px] sm:text-[10px] md:text-xs font-black text-slate-400 tracking-wider uppercase group-hover:text-white transition-colors">{acc.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    {/* Certificate Viewer Lightbox */}
    {activeCert && (
      <CertificateViewer
        src={activeCert.url}
        alt={activeCert.title}
        onClose={() => setActiveCert(null)}
      />
    )}
    </>
  );
}