import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Clock, 
  Award, 
  CheckCircle2, 
  Stethoscope, 
  FileText, 
  AlertTriangle,
  Zap,
  MapPin,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/config/categories';

interface ClinicalServiceOverviewProps {
  serviceSlug: string;
  formattedService: string;
  regionName?: string;
  locationName?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CLINICAL MODALITY PROFILES & GUIDELINES
// ─────────────────────────────────────────────────────────────────────────────

interface ModalityProfile {
  categoryTitle: string;
  overview: string;
  indications: string[];
  preparation: string[];
  procedureSteps: string[];
  equipment: string;
  turnaroundTime: string;
  safetyProfile: string;
}

function resolveModalityProfile(slug: string, serviceName: string, locName: string): ModalityProfile {
  const lower = slug.toLowerCase();

  // 1. MRI Scans
  if (lower.includes('mri') || lower.includes('mrcp') || lower.includes('mr-')) {
    return {
      categoryTitle: "Magnetic Resonance Imaging (3.0 Tesla MRI)",
      overview: `A ${serviceName} provides non-invasive, ultra-high-resolution cross-sectional visualization of soft tissues, nerves, vascular architecture, and musculoskeletal anatomy. Utilizing powerful magnetic fields and radiofrequency pulses without ionizing radiation, this examination delivers definitive diagnostic differentiation for neurological, orthopedic, oncological, and abdominal conditions.`,
      indications: [
        `Evaluation of persistent localized pain, numbness, motor deficits, or suspected nerve root compression`,
        `Detection and staging of soft tissue lesions, tumors, inflammatory processes, or ischemic stroke`,
        `Assessment of ligamentous integrity, cartilage degeneration, meniscus tears, or joint pathology`,
        `Pre-operative surgical planning and post-therapeutic response monitoring`
      ],
      preparation: [
        `No fasting is required for non-contrast plain MRI. Fast for 4 to 6 hours if intravenous contrast is prescribed.`,
        `Remove all metallic accessories including jewelry, hairpins, watches, hearing aids, and dental prosthetics.`,
        `Notify our radiologist if you have cardiac pacemakers, cochlear implants, surgical clips, or neurostimulators.`,
        `Comfortable, metallic-free hospital examination gown is provided prior to entering the scanner suite.`
      ],
      procedureSteps: [
        `Patient registration and pre-scan safety screening questionnaire verification.`,
        `Comfortable positioning on the motorized scanner couch with customized surface coils.`,
        `Multi-planar sequential radiofrequency acquisitions (T1, T2, FLAIR, DWI, and specialized sequences).`,
        `Immediate post-scan discharge with radiologist verification of motion-free diagnostic clarity.`
      ],
      equipment: "Siemens / GE 3.0 Tesla High-Field MRI Scanner (Wide Bore for Claustrophobia-Free Comfort)",
      turnaroundTime: `Digital high-resolution DICOM images available within 2 hours; verified radiologist report delivered within 6 to 12 hours.`,
      safetyProfile: "Zero ionizing radiation. Safe for repeated imaging and pediatric evaluation under clinical guidance."
    };
  }

  // 2. CT & HRCT Scans
  if (lower.includes('ct') || lower.includes('hrct') || lower.includes('computed-tomography')) {
    return {
      categoryTitle: "Advanced 128-Slice High-Resolution Computed Tomography (CT)",
      overview: `A ${serviceName} captures volumetric, sub-millimeter axial slices of internal organs, osseous structures, and vasculature. Utilizing advanced 128-slice multi-detector technology with iterative dose-reduction algorithms (ASiR / AIDR 3D), this procedure yields rapid, life-saving diagnostic insights with minimal radiation exposure.`,
      indications: [
        `Rapid assessment of acute trauma, occult bone fractures, internal hemorrhage, or organ lacerations`,
        `Detailed pulmonary parenchymal evaluation, interstitial lung disease (ILD), and bronchial airway analysis`,
        `Evaluation of abdominal pain, acute appendicitis, diverticulitis, renal calculi, or mesenteric ischemia`,
        `Oncological staging, tumor volumetric measurements, and lymph node assessment`
      ],
      preparation: [
        `For plain non-contrast CT, fasting is usually not required. Maintain adequate hydration.`,
        `For IV Contrast-Enhanced CT (CECT), maintain 4 to 6 hours fasting and present recent serum creatinine levels.`,
        `Inform our clinical staff of any history of allergic reactions to iodinated contrast media or asthma.`,
        `Wear loose, comfortable clothing devoid of metallic buttons or zippers over the target anatomical region.`
      ],
      procedureSteps: [
        `Rapid clinical intake and IV cannula placement if contrast administration is scheduled.`,
        `Precise laser-guided patient positioning on the low-attenuation carbon fiber CT gantry.`,
        `High-speed helical data acquisition completed in just 10 to 30 seconds with automated breathing instructions.`,
        `Multi-planar reconstruction (MPR) into 3D coronal, sagittal, and volumetric vascular models.`
      ],
      equipment: "128-Slice Ultra-Fast MDCT with Smart Dose Modulation and Sub-Millimeter Isotropic Resolution",
      turnaroundTime: "Emergency provisional review available within 60 minutes; comprehensive report within 4 to 6 hours.",
      safetyProfile: "Optimized low-dose protocols adhering to the ALARA (As Low As Reasonably Achievable) radiation safety principle."
    };
  }

  // 3. PET-CT & Nuclear Medicine
  if (lower.includes('pet') || lower.includes('nuclear') || lower.includes('spect') || lower.includes('scan-whole-body')) {
    return {
      categoryTitle: "Molecular PET-CT & Nuclear Diagnostic Imaging",
      overview: `A ${serviceName} integrates molecular metabolic activity (via FDG radiotracer uptake) with precise anatomical localization on high-resolution CT. This hybrid diagnostic modality stands as the gold standard in oncology for cancer staging, therapy monitoring, recurrence detection, and occult inflammation mapping.`,
      indications: [
        `Whole-body oncology staging, metastasis detection, and evaluation of solitary pulmonary nodules`,
        `Therapeutic response monitoring post-chemotherapy, immunotherapy, or targeted radiotherapy`,
        `Differentiating benign scarring or radiation necrosis from active recurrent neoplastic tissue`,
        `Localizing unexplained Pyrexia of Unknown Origin (PUO) or chronic inflammatory vasculitis`
      ],
      preparation: [
        `Strict 6-hour fasting prior to appointment. Only plain unflavored water is permitted.`,
        `Maintain a low-carbohydrate, high-protein diet for 24 hours prior to scan. Avoid sugar and intense physical exercise.`,
        `Diabetic patients receive individualized insulin adjustment protocols; blood glucose must be stabilized below 180 mg/dL.`,
        `Plan for approximately 2 to 3 hours total suite time for radiotracer distribution and uptake.`
      ],
      procedureSteps: [
        `Pre-injection fasting blood sugar verification and vital sign recording.`,
        `Intravenous administration of radiotracer (e.g. 18F-FDG) followed by 60 minutes quiet relaxation in a private uptake room.`,
        `Seamless whole-body volumetric scan on our combined high-sensitivity PET-CT gantry (15-20 minutes).`,
        `Immediate post-scan clinical review by senior nuclear medicine physicians.`
      ],
      equipment: "High-Sensitivity Time-of-Flight (TOF) Digital PET-CT Scanner with Diagnostic 128-Slice CT",
      turnaroundTime: "Same-day provisional findings; finalized multi-disciplinary nuclear oncology report within 12 to 24 hours.",
      safetyProfile: "Short half-life radioisotopes ensure minimal radiation burden; rapid natural excretion via renal clearance."
    };
  }

  // 4. Ultrasound & Sonography
  if (lower.includes('ultrasound') || lower.includes('sonography') || lower.includes('usg')) {
    return {
      categoryTitle: "High-Resolution Diagnostic Sonography & 4D Ultrasound",
      overview: `A ${serviceName} provides dynamic, real-time visualization of superficial and deep organ parenchyma, acoustic impedance interfaces, and vascular hemodynamics. Using acoustic sound waves completely free of radiation, it offers safe, comfortable, and repeatable evaluation for abdominal, pelvic, musculoskeletal, and soft-tissue conditions.`,
      indications: [
        `Investigation of acute or recurrent abdominal pain, dyspepsia, distension, or suspected gallstones`,
        `Comprehensive evaluation of renal parenchyma, calculi, hydronephrosis, and urinary bladder dynamics`,
        `Assessment of thyroid nodules, neck swellings, breast lesions, and superficial soft tissue masses`,
        `Musculoskeletal tendon tears, joint effusions, and guided interventional FNAC/biopsy procedures`
      ],
      preparation: [
        `For Abdominal Sonography: Strict 6 to 8 hours overnight fasting ensures adequate gallbladder distension and minimal bowel gas.`,
        `For Pelvic / KUB Sonography: Consume 1 liter of water 1 hour prior to the scan; maintain a comfortably full urinary bladder.`,
        `For Thyroid, Scrotal, or Musculoskeletal scans: No dietary restrictions or fasting is necessary.`,
        `Wear comfortable, two-piece clothing allowing easy access to the anatomical area of examination.`
      ],
      procedureSteps: [
        `Patient positioned comfortably on the examination table; warm, hypoallergenic acoustic gel is applied.`,
        `High-frequency multi-frequency broadband transducer swept across standardized anatomical acoustic windows.`,
        `Real-time measurements of organ dimensions, vascular Doppler flow velocities, and parenchymal echogenicity.`,
        `Immediate wipe-down and verbal explanation of findings by our consultant radiologist.`
      ],
      equipment: "GE Voluson / Philips Elite Diagnostic Ultrasound Platform with Advanced Matrix Transducers",
      turnaroundTime: "Instant verbal consultation post-procedure; signed printed & digital report delivered in 15 to 30 minutes.",
      safetyProfile: "100% radiation-free. Completely safe for all age groups, pregnancy, and recurring monitoring."
    };
  }

  // 5. Pregnancy & Fetal Medicine
  if (lower.includes('pregnancy') || lower.includes('fetal') || lower.includes('anomaly') || lower.includes('nt-scan') || lower.includes('dating-scan') || lower.includes('growth-scan')) {
    return {
      categoryTitle: "Specialized Fetal Medicine & Antenatal Sonography",
      overview: `A ${serviceName} is a clinical cornerstone of comprehensive obstetric care. Combining high-frequency acoustic beamforming, 3D/4D surface rendering, and color Doppler velocimetry, it provides crucial surveillance of fetal biometry, organogenesis, placental perfusion, and amniotic fluid dynamics under strict FMF (Fetal Medicine Foundation) and PCPNDT guidelines.`,
      indications: [
        `Accurate gestational age dating, crown-rump length (CRL) validation, and viability confirmation`,
        `First-trimester genetic screening via Nuchal Translucency (NT) and Nasal Bone evaluation`,
        `Detailed Level-II fetal anatomical survey assessing cardiac, cranial, spinal, and visceral integrity`,
        `Third-trimester fetal growth tracking, estimated fetal weight (EFW), and biophysical profile (BPP)`
      ],
      preparation: [
        `Valid medical prescription from a registered gynecologist / obstetrician is mandatory under PCPNDT regulations.`,
        `Photo ID verification (Aadhaar Card / Passport) required at the time of appointment registration.`,
        `For scans prior to 12 weeks: Consume water 45 minutes prior for a moderately full bladder.`,
        `For scans beyond 14 weeks: Normal bladder; fasting is not required. Light snacking prior can stimulate fetal movement.`
      ],
      procedureSteps: [
        `Registration, mandatory Form F compliance documentation, and clinical history review.`,
        `Maternal abdomen examination using specialized curved convex and 3D/4D matrix probes.`,
        `Systematic biometric parameter documentation (BPD, HC, AC, FL) against global growth percentiles.`,
        `Detailed organ-by-organ anatomical review with optional live monitor visualization for expecting parents.`
      ],
      equipment: "GE Voluson E10 / Philips EPIQ Fetal Medicine Ultrasound Suite with HD-Live 4D Technology",
      turnaroundTime: "Comprehensive annotated fetal report and photographic printouts provided within 30 to 45 minutes.",
      safetyProfile: "Follows strict ALARA acoustic thermal/mechanical index limits; safe and non-invasive throughout pregnancy."
    };
  }

  // 6. Pathology & Clinical Blood Testing
  if (lower.includes('test') || lower.includes('blood') || lower.includes('cbc') || lower.includes('profile') || lower.includes('pathology') || lower.includes('thyroid') || lower.includes('lipid')) {
    return {
      categoryTitle: "Automated Clinical Pathology & Molecular Lab Testing",
      overview: `A ${serviceName} provides objective, quantitative biochemical, hematological, or immunological assessment of cellular markers and metabolic substrates. Operating under NABL (ISO 15189) clinical guidelines, our computerized analyzers deliver gold-standard precision to uncover subclinical conditions, monitor chronic illnesses, and guide targeted therapies.`,
      indications: [
        `Routine annual health screening and proactive identification of metabolic or hormonal imbalances`,
        `Investigation of unexplained fatigue, weakness, weight changes, recurrent fevers, or systemic inflammation`,
        `Monitoring response to ongoing pharmacology (statins, thyroid replacement, antidiabetics, anti-hypertensives)`,
        `Pre-operative health fitness clearance and baseline organ functional assessment`
      ],
      preparation: [
        `For Fasting Panels (Lipid, Blood Sugar, Fasting Insulin, Thyroid): Maintain 10 to 12 hours overnight fasting.`,
        `Drinking plain water is encouraged during fasting to ensure optimal hydration and comfortable venous access.`,
        `For non-fasting routine panels (CBC, HbA1c, Vitamin D, Renal Profile): Walk-in anytime without fasting restrictions.`,
        `Inform the phlebotomist of any routine medications, blood thinners, or dietary supplements consumed.`
      ],
      procedureSteps: [
        `Identity verification and barcode accessioning of sterile, single-use vacuum collection tubes (BD Vacutainer).`,
        `Gentle phlebotomy performed by certified senior phlebotomists using micro-bore needles for minimal discomfort.`,
        `Automated temperature-controlled centrifugation and dual-channel automated analyzer accessioning.`,
        `Multi-level internal quality control (IQC) validation and sign-off by MD Pathologists.`
      ],
      equipment: "Fully Automated High-Throughput Clinical Chemistry & Immunoassay Analyzers (Roche Cobas / Beckman Coulter)",
      turnaroundTime: "Standard parameters reported within 4 to 6 hours; specialized endocrine/molecular assays within 12 to 24 hours.",
      safetyProfile: "Sterile single-use vacutainer technology with 100% bio-hazard safety protocols."
    };
  }

  // 7. Cardiology Diagnostics (ECG, 2D Echo, TMT, Holter)
  if (lower.includes('echo') || lower.includes('ecg') || lower.includes('tmt') || lower.includes('cardiac') || lower.includes('holter')) {
    return {
      categoryTitle: "Non-Invasive Cardiovascular Diagnostic Suite",
      overview: `A ${serviceName} assesses myocardial contractility, hemodynamic valve competence, cardiac electrical conduction, or functional ischemic exercise tolerance. Conducted under the supervision of accredited cardiologists, this examination delivers definitive insights into structural heart health, coronary reserve, and arrhythmia patterns.`,
      indications: [
        `Investigation of chest discomfort, exertional breathlessness, palpitations, or syncopal episodes`,
        `Screening for hypertensive heart disease, left ventricular hypertrophy (LVH), and valvular stenosis/regurgitation`,
        `Evaluation of myocardial recovery post-infarction, coronary stenting, or cardiac surgical intervention`,
        `Pre-participation athletic cardiovascular screening and pre-operative cardiac risk stratification`
      ],
      preparation: [
        `Wear comfortable two-piece sports attire and supportive footwear (especially for Treadmill Stress Tests / TMT).`,
        `Avoid heavy meals and caffeinated beverages for 2 to 3 hours prior to cardiac evaluations.`,
        `Consult your physician regarding whether to pause beta-blockers or calcium channel blockers on the morning of testing.`,
        `Bring previous ECG tracings, cardiac summaries, and a complete prescription history for baseline comparison.`
      ],
      procedureSteps: [
        `Resting baseline blood pressure, heart rate, and 12-lead standard electrocardiogram acquisition.`,
        `Application of specialized acoustic transducer / monitoring electrodes across precordial acoustic windows.`,
        `Multi-stage hemodynamic recording during rest and, if applicable, calibrated treadmill Bruce protocol exertion.`,
        `Immediate post-procedure evaluation, rhythm interpretation, and counseling by attending cardiologists.`
      ],
      equipment: "Philips EPIQ Cardiovascular Ultrasound Platform with Automated Strain Imaging & Full Digital Stress Systems",
      turnaroundTime: "Preliminary findings discussed immediately post-test; verified cardiologist report delivered in 1 hour.",
      safetyProfile: "Completely safe, non-invasive diagnostic modality with continuous automated vital monitoring."
    };
  }

  // 8. General Diagnostic Service Default (Catches all remaining specialized tests)
  return {
    categoryTitle: "Specialized Clinical Diagnostic Evaluation",
    overview: `A ${serviceName} is a targeted diagnostic procedure engineered to evaluate physiological function, tissue morphology, or biochemical indicators within the human body. Supported by Henotic Diagnostics' NABL-certified laboratory standards, this test delivers decisive evidence-based clinical intelligence to referring physicians and patients.`,
    indications: [
      `Clinical confirmation of symptomatic presentations or abnormal screening findings`,
      `Targeted organ or system-specific functional assessment with high diagnostic specificity`,
      `Monitoring chronic medical conditions, therapeutic efficacy, and post-treatment recovery`,
      `Preventive baseline health monitoring adhering to Indian and international clinical guidelines`
    ],
    preparation: [
      `Maintain normal hydration unless specifically directed otherwise by your treating doctor.`,
      `Bring your physician's clinical prescription and relevant past medical reports to your appointment.`,
      `Wear comfortable, loose clothing suited for specialized clinical evaluation or sample acquisition.`,
      `Our patient care desk is available 24/7 to answer specific dietary or medication instructions prior to testing.`
    ],
    procedureSteps: [
      `Prompt patient reception, barcode identity verification, and medical history documentation.`,
      `Precision diagnostic acquisition or sample processing under stringent NABL quality assurance protocols.`,
      `Automated computational data analysis, multi-point calibration, and internal reference validation.`,
      `Dual-tier clinical review and final report authorization by consultant medical specialists.`
    ],
    equipment: "Next-Generation NABL-Accredited Diagnostic Analyzers and Medical Imaging Systems",
    turnaroundTime: "Same-day verified report delivery; immediate digital access via WhatsApp and online portal.",
    safetyProfile: "Adheres to rigorous patient safety, infection control, and diagnostic radiation guidelines."
  };
}

export default function ClinicalServiceOverview({
  serviceSlug,
  formattedService,
  regionName,
  locationName,
}: ClinicalServiceOverviewProps) {
  const locDisplay = locationName || "Mumbai & Navi Mumbai";
  const regionDisplay = regionName ? `, ${regionName}` : "";
  const fullLocText = `${locDisplay}${regionDisplay}`;
  
  const profile = resolveModalityProfile(serviceSlug, formattedService, locDisplay);

  return (
    <article className="space-y-10 text-slate-700 leading-relaxed font-normal">
      {/* ── 1. CLINICAL OVERVIEW & MEDICAL SIGNIFICANCE ── */}
      <section>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100 shadow-xs">
          <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
          {profile.categoryTitle}
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Clinical Significance of {formattedService} in {locDisplay}
        </h2>
        
        <p className="text-base text-slate-700 leading-relaxed mb-4">
          {profile.overview}
        </p>
        
        <p className="text-sm text-slate-600 leading-relaxed">
          At Henotic Diagnostics, every <strong>{formattedService}</strong> examination is conducted under strict compliance with <strong>NABL (ISO 15189)</strong>, <strong>AERB</strong>, and <strong>PCPNDT</strong> quality benchmarks. Combining advanced medical technology with experienced MD radiologist and pathologist verification, we guarantee reproducible accuracy, compassionate care, and rapid turnaround for patients across {fullLocText}.
        </p>
      </section>

      {/* ── 2. CLINICAL INDICATIONS & REASONS FOR TESTING ── */}
      <section className="bg-slate-50/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              When Do Doctors Prescribe a {formattedService}?
            </h3>
            <p className="text-xs text-slate-500 font-medium">Common Clinical Indications & Diagnostic Pathways</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Physicians and medical specialists in {locDisplay} typically order a {formattedService} under the following clinical circumstances:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {profile.indications.map((ind, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200/70 shadow-xs flex items-start gap-3 hover:border-blue-300 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                {ind}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. PREPARATION & FASTING PROTOCOLS ── */}
      <section className="bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Patient Preparation & Fasting Guidelines
            </h3>
            <p className="text-xs text-slate-500 font-medium">Important Instructions Before Your Appointment</p>
          </div>
        </div>

        <div className="space-y-3">
          {profile.preparation.map((prep, i) => (
            <div key={i} className="bg-white/95 p-3.5 rounded-xl border border-indigo-100/80 shadow-xs flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                {prep}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. STEP-BY-STEP PROCEDURE WALKTHROUGH ── */}
      <section>
        <h3 className="text-xl font-black text-slate-900 mb-2 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          How the {formattedService} Procedure Works
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          From the moment you arrive at our center serving {locDisplay}, our accredited staff ensures a seamless, comfortable journey:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {profile.procedureSteps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#4568dc] block mb-1">
                  Step 0{idx + 1}
                </span>
                <p className="text-xs font-bold text-slate-800 leading-relaxed">
                  {step}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. TECHNOLOGY SPECIFICATIONS & TURNAROUND TIME ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hardware / Analyzer */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <Award className="w-6 h-6 text-purple-600 mb-2" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Diagnostic Standard</h4>
          <p className="text-xs font-bold text-slate-800 leading-relaxed">
            {profile.equipment}
          </p>
        </div>

        {/* Turnaround Time */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <Clock className="w-6 h-6 text-emerald-600 mb-2" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Turnaround Time in {locDisplay}</h4>
          <p className="text-xs font-bold text-slate-800 leading-relaxed">
            {profile.turnaroundTime}
          </p>
        </div>

        {/* Safety Profile */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-blue-600 mb-2" />
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">Safety Assurance</h4>
          <p className="text-xs font-bold text-slate-800 leading-relaxed">
            {profile.safetyProfile}
          </p>
        </div>
      </section>

      {/* ── 6. LOCAL APPOINTMENT & SAME-DAY REPORTING ── */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-pink-300 block mb-1">
              Priority Booking for {locDisplay} Residents
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Need Accurate {formattedService} Near You?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Skip waiting lines with priority appointment scheduling. Digital reports delivered securely straight to your WhatsApp and registered email.
            </p>
          </div>

          <a
            href="#booking"
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#E55D87] to-[#b06ab3] hover:from-pink-600 hover:to-purple-600 text-white font-black text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Calendar size={16} />
            Book {formattedService}
          </a>
        </div>
      </section>
    </article>
  );
}
