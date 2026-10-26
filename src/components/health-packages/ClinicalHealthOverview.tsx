import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Clock, 
  HeartPulse, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Stethoscope, 
  FileText, 
  Phone, 
  Calendar 
} from 'lucide-react';
import Link from 'next/link';

interface ClinicalHealthOverviewProps {
  serviceSlug: string;
  formattedService: string;
  regionName?: string;
  locationName?: string;
}

export default function ClinicalHealthOverview({
  serviceSlug,
  formattedService,
  regionName,
  locationName,
}: ClinicalHealthOverviewProps) {
  const isFullBody = serviceSlug.includes('full-body') || serviceSlug.includes('master');
  const isWomen = serviceSlug.includes('women');
  const isMen = serviceSlug.includes('men');
  const isSenior = serviceSlug.includes('senior');
  const isCancer = serviceSlug.includes('cancer');
  const isDiabetes = serviceSlug.includes('diabet');
  const isCardiac = serviceSlug.includes('heart') || serviceSlug.includes('cardiac');
  const isCorporate = serviceSlug.includes('corporate') || serviceSlug.includes('employee') || serviceSlug.includes('employment') || serviceSlug.includes('executive');

  const locText = locationName && regionName 
    ? `in ${locationName}, ${regionName}` 
    : regionName 
    ? `in ${regionName}` 
    : 'in Mumbai & Navi Mumbai';

  return (
    <article className="space-y-10 text-slate-700 leading-relaxed font-normal">
      {/* 1. Clinical Overview Intro */}
      <section>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-100">
          <Stethoscope className="w-3.5 h-3.5 text-purple-600" />
          Clinical Diagnostic Guidelines
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">
          Clinical Significance of {formattedService} {locText}
        </h2>
        <p className="text-base text-slate-600 mb-4">
          Routine preventive diagnostic testing plays a decisive role in detecting asymptomatic pathological changes before clinical symptoms manifest. At Henotic Diagnostics, our {formattedService} protocols adhere strictly to <strong>NABL (ISO 15189)</strong> and <strong>CAP</strong> international quality benchmarks, combining multi-system biomarker analysis with certified pathologist oversight.
        </p>
        <p className="text-sm text-slate-600">
          Whether evaluating cardiovascular risk markers, metabolic regulation, endocrine balance, or organ functional capacity, our comprehensive testing batteries ensure accurate, reproducible clinical data to guide patient care and preventive medical interventions.
        </p>
      </section>

      {/* 2. Key Biomarkers & Organ Profiles Evaluated */}
      <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
        <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          Core Physiological Biomarkers Evaluated
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Depending on your selected {formattedService} package, our diagnostic analyzers perform calibrated evaluation across primary physiological axes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              Metabolic & Glycemic Profile
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fasting Blood Sugar, HbA1c (Glycosylated Hemoglobin), Estimated Average Glucose (eAG), and Fasting Insulin to detect pre-diabetes and metabolic syndrome.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              Lipid & Cardiovascular Risk
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Total Cholesterol, HDL, LDL, VLDL, Triglycerides, Atherogenic Ratios, High-Sensitivity CRP (hs-CRP), Homocysteine, and Apolipoproteins (A1 & B).
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              Hepatic & Renal Functional Capacity
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete LFT (SGOT, SGPT, Bilirubin Total/Direct/Indirect, Alkaline Phosphatase, Total Protein, Albumin) and KFT (Serum Creatinine, BUN, Urea, Uric Acid, eGFR).
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              Complete Hemogram & Micronutrients
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              28-parameter CBC series with ESR, Platelet Indices, 25-OH Vitamin D, Active Vitamin B12, Folic Acid, and Complete Iron Profile (Iron, TIBC, Transferrin).
            </p>
          </div>

          {(isWomen || isFullBody) && (
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-600" />
                Female Endocrine & Tumour Biomarkers
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estradiol, FSH, LH, Prolactin, CA125 Ovarian Tumour Marker, and Anti-CCP Rheumatoid Arthritis screening.
              </p>
            </div>
          )}

          {(isMen || isFullBody) && (
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
              <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                Men’s Health & Prostate Biomarkers
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Total & Free PSA (Prostate Specific Antigen), Serum Testosterone, Cardiac Enzymes, and Pancreatic Amylase/Lipase.
              </p>
            </div>
          )}

          {isCancer && (
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm md:col-span-2">
              <h4 className="font-bold text-sm text-slate-900 mb-1.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                Multi-Organ Oncology Biomarker Panel
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quantitative estimation of CA125 (Ovarian), CA15.3 (Breast), CA19.9 (Pancreatic/Colorectal), CEA (Carcinoembryonic Antigen), AFP (Alpha-Fetoprotein - Liver), and Beta HCG.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Patient Preparation Guidelines */}
      <section className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Patient Preparation & Fasting Protocols
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          To ensure strict analytical accuracy and prevent physiological variations in biochemical test values, patients are advised to observe the following preparation checklist:
        </p>

        <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Fasting Duration:</strong> Maintain 8 to 12 hours of overnight fasting prior to sample draw. Avoid all caloric intake, tea, coffee, and milk.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Hydration:</strong> Drinking plain, unflavored water is encouraged and does not interfere with test parameters. Hydration facilitates smooth venous collection.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Medications:</strong> Regular morning hypertension or thyroid prescriptions may be taken with water unless specifically instructed otherwise by your treating physician.</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Alcohol & Strenuous Exercise:</strong> Abstain from alcohol consumption and intense physical exertion for 24 hours prior to blood testing to avoid transient elevations in liver enzymes and muscle markers.</span>
          </li>
        </ul>
      </section>

      {/* 4. Quality Assurance & Home Collection */}
      <section className="bg-gradient-to-br from-purple-50 via-slate-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
        <h3 className="text-xl font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-purple-700" />
          NABL ISO 15189 Quality Governance & 24/7 Home Pickup
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
          Henotic Diagnostics maintains state-of-the-art automated diagnostic laboratory suites equipped with closed-system vacutainer barcoding, bidirectional LIS integration, and temperature-controlled cold-chain specimen transfer. Each diagnostic profile is reviewed and signed by our senior consulting pathologists:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-3 bg-white rounded-xl border border-purple-100 text-xs text-slate-700">
            <strong>Dr. Amulya Patil</strong> — MBBS, MD/MS, DNB (Pathology), MMC 2010/01/0129
          </div>
          <div className="p-3 bg-white rounded-xl border border-purple-100 text-xs text-slate-700">
            <strong>Dr. Prathibha Patil</strong> — MBBS, MD/MS, DNB (Pathology), MMC 61719
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Our mobile phlebotomy team provides hygienic, <strong>24/7 doorstep blood and urine sample collection</strong> across Kharghar, Panvel, Vashi, Belapur, Seawoods, Nerul, and all regions of Mumbai & Navi Mumbai. Verified digital smart PDF reports are dispatched directly to WhatsApp within <strong>8 to 12 hours</strong> of collection.
        </p>
      </section>
    </article>
  );
}
