export interface TestCategory {
  name: string;
  count: number;
  tests: string[];
}

export interface ArchTheme {
  archBg: string;
  accentBorder: string;
  badgeBg: string;
  gradientBottom: string;
  pillColor: string;
  glow: string;
  lineColor: string;
}

export interface HealthPackage {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  target: ('Men' | 'Women' | 'Seniors')[];
  totalTests: number;
  mrp: number;
  offerPrice: number;
  discount: string;
  imageUrl: string;
  archTheme: ArchTheme;
  popular?: boolean;
  highlights: string[];
  notes: string[];
  categories: TestCategory[];
}

export interface InfrastructureItem {
  title: string;
  subtitle: string;
  image: string;
  tag: string;
}

export interface DoctorData {
  name: string;
  degrees: string;
  registration: string;
  bio: string;
  focus: string[];
  image: string;
}

export interface CertificateData {
  id: string;
  name: string;
  authority: string;
  logo: string;
  certImage: string;
  desc: string;
}

export interface AwardData {
  id: string;
  title: string;
  category: string;
  year: string;
  organization: string;
  description: string;
  image: string;
  badgeLabel: string;
  accentGlow: string;
}

export interface TestimonialData {
  id: number;
  name: string;
  service: string;
  quote: string;
  image: string;
  rating: number;
}

// Exact multi-stop color progression for awards
export const EXACT_SPECTRUM_CSS =
  "linear-gradient(90deg, #e7569b 0%, #d85ba8 10%, #6c6cf6 28%, #bb60b9 52%, #9f68c8 76%, #8f64cf 100%)";

export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/RAAFJ2ACO6qnsqpDR";
export const GOOGLE_MAPS_SHORT_URL = "https://maps.app.goo.gl/CZexFwm1wLPbsgKP7";

export const HEALTH_CHECKUP_SLUGS = new Set([
  'health-checkup',
  'full-body-check-up',
  'full-body-checkup',
  'master-health-checkup',
  'executive-health-checkup',
  'executive-health-screening',
  'preventive-health-checkup',
  'preventive-health-screening',
  'annual-health-checkup',
  'corporate-health-checkup',
  'employee-health-checkup',
  'pre-employment-health-checkup',
  'wellness-screening',
  'health-screening',
  'women-health-checkup',
  'women-health-screening',
  'men-health-checkup',
  'men-health-screening',
  'senior-citizen-health-checkup',
  'senior-health-checkup',
  'family-health-checkup',
  'heart-health-checkup',
  'cardiac-health-checkup',
  'diabetes-health-checkup',
  'diabetes-health-screening',
  'cancer-screening',
  'cancer-screening-package',
]);

export function isHealthCheckupService(slug: string): boolean {
  return HEALTH_CHECKUP_SLUGS.has(slug);
}

export type HighlightCategory = 
  | 'cancer' 
  | 'diabetes' 
  | 'cardiac' 
  | 'women' 
  | 'men' 
  | 'seniors' 
  | 'executive' 
  | 'general';

export function getHealthPackagesSEO(
  serviceSlug: string,
  regionName?: string,
  locationName?: string
) {
  let topic = 'Preventive & Full Body Health Checkup';
  let defaultFilter: 'ALL' | 'Men' | 'Women' | 'Seniors' = 'ALL';
  let highlightCategory: HighlightCategory = 'general';

  if (serviceSlug.includes('cancer')) {
    topic = 'Cancer Screening & Tumour Marker';
    highlightCategory = 'cancer';
  } else if (serviceSlug.includes('diabet')) {
    topic = 'Diabetes Health Checkup & Metabolic';
    highlightCategory = 'diabetes';
  } else if (serviceSlug.includes('heart') || serviceSlug.includes('cardiac')) {
    topic = 'Cardiac & Heart Health Checkup';
    highlightCategory = 'cardiac';
  } else if (serviceSlug.includes('women')) {
    topic = serviceSlug.includes('screening')
      ? 'Women Health Screening'
      : 'Women Health Checkup';
    defaultFilter = 'Women';
    highlightCategory = 'women';
  } else if (serviceSlug.includes('men')) {
    topic = serviceSlug.includes('screening')
      ? 'Men Health Screening'
      : 'Men Health Checkup';
    defaultFilter = 'Men';
    highlightCategory = 'men';
  } else if (serviceSlug.includes('senior')) {
    topic = 'Senior Citizen Health Checkup';
    defaultFilter = 'Seniors';
    highlightCategory = 'seniors';
  } else if (serviceSlug.includes('corporate')) {
    topic = 'Corporate Health Checkup';
    highlightCategory = 'executive';
  } else if (serviceSlug.includes('pre-employment')) {
    topic = 'Pre-Employment Health Checkup';
    highlightCategory = 'executive';
  } else if (serviceSlug.includes('employee')) {
    topic = 'Employee Health Checkup';
    highlightCategory = 'executive';
  } else if (serviceSlug.includes('executive')) {
    topic = serviceSlug.includes('screening')
      ? 'Executive Health Screening'
      : 'Executive Health Checkup';
    highlightCategory = 'executive';
  } else if (serviceSlug.includes('master')) {
    topic = 'Master Health Checkup';
    highlightCategory = 'general';
  } else if (serviceSlug.includes('preventive')) {
    topic = serviceSlug.includes('screening')
      ? 'Preventive Health Screening'
      : 'Preventive Health Checkup';
    highlightCategory = 'general';
  } else if (serviceSlug.includes('annual')) {
    topic = 'Annual Health Checkup';
    highlightCategory = 'general';
  } else if (serviceSlug.includes('wellness')) {
    topic = 'Wellness Health Screening';
    highlightCategory = 'general';
  } else if (serviceSlug.includes('family')) {
    topic = 'Family Health Checkup';
    highlightCategory = 'general';
  } else if (serviceSlug.includes('full-body')) {
    topic = 'Full Body Checkup';
    highlightCategory = 'general';
  } else if (serviceSlug === 'health-screening') {
    topic = 'Comprehensive Health Screening';
    highlightCategory = 'general';
  }

  let locationSuffix = '';
  if (locationName && regionName) {
    locationSuffix = ` in ${locationName}, ${regionName}`;
  } else if (regionName) {
    locationSuffix = ` in ${regionName}`;
  } else if (locationName) {
    locationSuffix = ` in ${locationName}`;
  }

  const badge = `${topic} • Certified Laboratory Rate Cards`;
  const heading = `${topic} Packages${locationSuffix}`;
  const subtitle = locationSuffix
    ? `Transparent special package pricing with up to 63% off${locationSuffix}. NABL-aligned pathology, complete organ profiles, zero hidden charges, and certified 24/7 home blood sample pickup.`
    : `Transparent special package pricing with up to 63% off. NABL-aligned pathology, complete organ profiles, zero hidden charges, and certified 24/7 home blood sample pickup.`;

  return { badge, heading, subtitle, topic, locationSuffix, defaultFilter, highlightCategory };
}

export function getSortedPackagesForCategory(category: HighlightCategory): HealthPackage[] {
  const cancerIds = ['card-16', 'card-17', 'card-2', 'card-7', 'card-8', 'card-11'];
  const diabetesIds = ['card-9', 'card-1', 'card-10', 'card-4', 'card-15'];
  const cardiacIds = ['card-6', 'card-2', 'card-3', 'card-9', 'card-10', 'card-4'];
  const executiveIds = ['card-1', 'card-11', 'card-2', 'card-3', 'card-4', 'card-6'];
  const womenIds = ['card-3', 'card-7', 'card-13', 'card-14', 'card-16'];
  const menIds = ['card-2', 'card-8', 'card-17', 'card-4', 'card-10'];
  const seniorIds = ['card-5', 'card-4', 'card-6', 'card-1', 'card-10'];

  let priorityIds: string[] = [];
  if (category === 'cancer') priorityIds = cancerIds;
  else if (category === 'diabetes') priorityIds = diabetesIds;
  else if (category === 'cardiac') priorityIds = cardiacIds;
  else if (category === 'executive') priorityIds = executiveIds;
  else if (category === 'women') priorityIds = womenIds;
  else if (category === 'men') priorityIds = menIds;
  else if (category === 'seniors') priorityIds = seniorIds;

  if (priorityIds.length === 0) return HEALTH_PACKAGES;

  const prioritySet = new Set(priorityIds);
  const prioritized = priorityIds
    .map(id => HEALTH_PACKAGES.find(p => p.id === id))
    .filter((p) => Boolean(p));
  const remaining = HEALTH_PACKAGES.filter(p => !prioritySet.has(p.id));

  return [...prioritized, ...remaining];
}

// Comprehensive list of 17 health checkup packages
export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'card-1',
    code: 'CHP-85',
    title: 'Comprehensive Profile',
    subtitle: 'Full Body Check-Up with Vitamin D & B12',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 85,
    mrp: 6495,
    offerPrice: 2500,
    discount: '62% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/advanced-health-profile-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#EDE9FE]', // Lavender
      accentBorder: 'border-purple-200',
      badgeBg: 'bg-purple-100 text-purple-800',
      gradientBottom: 'from-purple-500/10 via-indigo-50/50 to-transparent',
      pillColor: 'bg-purple-600 text-white',
      glow: 'shadow-purple-500/20',
      lineColor: 'rgba(147, 51, 234, 0.35)'
    },
    popular: true,
    highlights: ['Vit D & B12 Covered', '85 Vital Parameters', 'Ideal Baseline Test'],
    notes: [
      '8–12 Hrs Fasting Needed',
      'Reports Available Within 8–12 Hrs',
      'Home Visits Available – 24/7'
    ],
    categories: [
      { name: 'Diabetic Profile', count: 3, tests: ['Sugar, Fasting', 'HbA1C', 'Average Glucose (eAG)'] },
      { name: 'Thyroid Profile', count: 3, tests: ['Total T3', 'Total T4', 'TSH'] },
      { name: 'Kidney Profile', count: 7, tests: ['Blood Urea Nitrogen (BUN)', 'Serum Creatinine', 'BUN/Creat Ratio', 'Serum Calcium', 'Urea', 'Uric Acid', 'eGFR'] },
      { name: 'Iron Studies', count: 3, tests: ['Serum Iron', 'TIBC', 'Transferrin Saturation'] },
      { name: 'Liver Function Tests (LFT)', count: 11, tests: ['SGPT', 'SGOT', 'Albumin (ALB)', 'Alkaline Phosphatase', 'Bilirubin Direct', 'Bilirubin Indirect', 'Bilirubin Total', 'Gamma GT', 'Globulin (GLB)', 'Total Protein', 'ALB/GLB Ratio'] },
      { name: 'Vitamin Profile', count: 2, tests: ['Vitamin D', 'Vitamin B12'] },
      { name: 'Complete Blood Count (CBC)', count: 28, tests: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'PCV/Hematocrit', 'MCV', 'MCH', 'MCHC', 'RDW-CV', 'RDW-SD', 'Neutrophils', 'Lymphocytes', 'Monocytes', 'Eosinophils', 'Basophils', 'Absolute Neutrophils', 'Absolute Lymphocytes', 'Absolute Monocytes', 'Absolute Eosinophils', 'Absolute Basophils', 'Immature Granulocytes', 'MPV', 'PDW', 'PCT', 'P-LCR', 'P-LCC', 'ESR', 'Peripheral Smear'] },
      { name: 'Complete Urine Analysis', count: 18, tests: ['Color', 'Appearance', 'Specific Gravity', 'pH', 'Protein/Albumin', 'Glucose/Sugar', 'Ketone Bodies', 'Bilirubin', 'Urobilinogen', 'Bile Pigments', 'Bile Salts', 'RBCs', 'Pus Cells (Leukocytes)', 'Epithelial Cells', 'Casts', 'Crystals', 'Bacteria', 'Mucus Threads'] },
      { name: 'Lipid (Cholesterol) Profile', count: 8, tests: ['LDL-Cholesterol', 'HDL-Cholesterol', 'Total Cholesterol', 'Non-HDL Cholesterol', 'Triglycerides', 'VLDL Cholesterol', 'LDL/HDL Ratio', 'Cholesterol/HDL Ratio'] }
    ]
  },
  {
    id: 'card-2',
    code: 'M-ADV-99',
    title: 'Men Advanced',
    subtitle: 'Full Body Medical Check Up with Cardiac & PSA',
    target: ['Men'],
    totalTests: 99,
    mrp: 10309,
    offerPrice: 3800,
    discount: '63% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/executive-health-checkup-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#DCFCE7]', // Sage Green
      accentBorder: 'border-emerald-200',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      gradientBottom: 'from-emerald-500/10 via-teal-50/50 to-transparent',
      pillColor: 'bg-emerald-600 text-white',
      glow: 'shadow-emerald-500/20',
      lineColor: 'rgba(16, 185, 129, 0.35)'
    },
    popular: false,
    highlights: ['Includes Cancer Marker (PSA)', 'Advanced Cardiac Markers', 'Electrolytes & Pancreatic'],
    notes: [
      '8–12 Hrs Fasting Needed',
      'Reports Available Within 8–12 Hrs',
      'Home Visits Available – 24/7'
    ],
    categories: [
      { name: 'Diabetic Profile', count: 3, tests: ['Sugar, Fasting', 'HbA1C', 'Average Glucose (eAG)'] },
      { name: 'Thyroid Profile', count: 3, tests: ['Total T3', 'Total T4', 'TSH'] },
      { name: 'Kidney Profile', count: 7, tests: ['BUN', 'Serum Creatinine', 'BUN/Creat Ratio', 'Calcium', 'Urea', 'Uric Acid', 'eGFR'] },
      { name: 'Iron Studies', count: 3, tests: ['Serum Iron', 'TIBC', 'Transferrin Saturation'] },
      { name: 'CBC – Complete Blood Count', count: 28, tests: ['Full Hemogram with 28 detailed cell parameters & ESR'] },
      { name: 'Liver Function Tests (LFT)', count: 11, tests: ['SGPT', 'SGOT', 'Albumin', 'Alkaline Phosphatase', 'Bilirubin Direct', 'Bilirubin Indirect', 'Bilirubin Total', 'Gamma GT', 'Globulin', 'Total Protein', 'ALB/GLB Ratio'] },
      { name: 'Cholesterol Profile', count: 8, tests: ['LDL', 'HDL', 'Total Cholesterol', 'Non-HDL', 'Triglycerides', 'VLDL', 'LDL/HDL Ratio', 'Cholesterol/HDL Ratio'] },
      { name: 'Cardiac Profile', count: 6, tests: ['Apo B : Apo A1 Ratio', 'Apolipoprotein (A1)', 'Apolipoprotein (B)', 'Homocysteine', 'hs-CRP', 'Lipoprotein (a)'] },
      { name: 'Electrolyte Profile', count: 3, tests: ['Chloride', 'Potassium', 'Sodium'] },
      { name: 'Vitamin Profile', count: 2, tests: ['Vitamin D', 'Vitamin B12'] },
      { name: 'Pancreatic Profile', count: 2, tests: ['Amylase', 'Lipase'] },
      { name: 'Cancer Marker', count: 1, tests: ['Prostate Specific Antigen (PSA)'] },
      { name: 'Complete Urine Analysis', count: 18, tests: ['18 Routine and Microscopic Urine Examination Parameters'] }
    ]
  },
  {
    id: 'card-3',
    code: 'W-ADV-98',
    title: 'Women Advanced',
    subtitle: 'Full Body Screening with Hormone & Arthritis',
    target: ['Women'],
    totalTests: 98,
    mrp: 8755,
    offerPrice: 3800,
    discount: '57% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/women-routine-health-screening-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#FEF3C7]', // Pale Beige
      accentBorder: 'border-amber-200',
      badgeBg: 'bg-amber-100 text-amber-800',
      gradientBottom: 'from-amber-500/10 via-orange-50/50 to-transparent',
      pillColor: 'bg-amber-600 text-white',
      glow: 'shadow-amber-500/20',
      lineColor: 'rgba(217, 119, 6, 0.35)'
    },
    popular: true,
    highlights: ['Female Hormone / Infertility Panel', 'Anti-CCP Arthritis Marker', 'Folic Acid + Vit D & B12'],
    notes: [
      '8–12 Hrs Fasting Needed',
      'Reports Available Within 8–12 Hrs',
      'Home Visits Available – 24/7'
    ],
    categories: [
      { name: 'Diabetic Profile', count: 3, tests: ['Sugar, Fasting', 'HbA1C', 'Average Glucose (eAG)'] },
      { name: 'Thyroid Profile', count: 3, tests: ['Total T3', 'Total T4', 'TSH'] },
      { name: 'Kidney Profile', count: 7, tests: ['BUN', 'Serum Creatinine', 'BUN/Creat Ratio', 'Calcium', 'Urea', 'Uric Acid', 'eGFR'] },
      { name: 'Iron Studies', count: 3, tests: ['Serum Iron', 'TIBC', 'Transferrin Saturation'] },
      { name: 'Liver Function Tests (LFT)', count: 11, tests: ['SGPT', 'SGOT', 'Albumin', 'Alkaline Phosphatase', 'Bilirubin Direct', 'Bilirubin Indirect', 'Bilirubin Total', 'Gamma GT', 'Globulin', 'Total Protein', 'A/G Ratio'] },
      { name: 'Cholesterol Profile', count: 8, tests: ['LDL', 'HDL', 'Total Cholesterol', 'Non-HDL', 'Triglycerides', 'VLDL', 'LDL/HDL Ratio', 'Cholesterol/HDL Ratio'] },
      { name: 'Cardiac Profile', count: 6, tests: ['Apo B : Apo A1 Ratio', 'Apolipoprotein (A1)', 'Apolipoprotein (B)', 'Homocysteine', 'hs-CRP', 'Lipoprotein (a)'] },
      { name: 'Female Infertility & Hormone Profile', count: 5, tests: ['Follicle Stimulating Hormone (FSH)', 'Luteinizing Hormone (LH)', 'Prolactin', 'TSH', 'Estradiol (E2)'] },
      { name: 'Vitamin Profile', count: 3, tests: ['Vitamin D', 'Vitamin B12', 'Folic Acid'] },
      { name: 'Arthritis Test', count: 1, tests: ['Anti-Cyclic Citrullinated Peptide (Anti-CCP)'] },
      { name: 'CBC – Complete Blood Count', count: 28, tests: ['28 Detailed Cellular Parameters & Differential Count'] },
      { name: 'Complete Urine Analysis', count: 18, tests: ['18 Macroscopic & Microscopic Renal Biomarkers'] }
    ]
  },
  {
    id: 'card-4',
    code: 'WEL-100',
    title: 'Wellness – 1.6',
    subtitle: 'Comprehensive Whole Body Wellness Matrix',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 100,
    mrp: 8750,
    offerPrice: 3800,
    discount: '57% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/complete-body-checkup-navi-mumbai-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#E0E7FF]', // Light Blue-Lavender
      accentBorder: 'border-blue-200',
      badgeBg: 'bg-blue-100 text-blue-800',
      gradientBottom: 'from-blue-500/10 via-sky-50/50 to-transparent',
      pillColor: 'bg-blue-600 text-white',
      glow: 'shadow-blue-500/20',
      lineColor: 'rgba(59, 130, 246, 0.35)'
    },
    popular: false,
    highlights: ['Growth Hormone (Testosterone)', 'Dual Arthritis (Anti-CCP & ANA)', 'Ferritin + Complete Iron'],
    notes: ['8–12 Hrs Fasting Needed', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Diabetic Profile', count: 3, tests: ['Sugar, Fasting', 'HbA1C', 'Average Glucose (eAG)'] },
      { name: 'Thyroid Profile', count: 3, tests: ['Total T3', 'Total T4', 'TSH'] },
      { name: 'Kidney Profile', count: 7, tests: ['BUN', 'Serum Creatinine', 'BUN/Creat Ratio', 'Calcium', 'Urea', 'Uric Acid', 'eGFR'] },
      { name: 'Iron Deficiency Profile', count: 4, tests: ['Serum Iron', 'TIBC', 'Transferrin Saturation', 'Ferritin'] },
      { name: 'CBC – Complete Blood Count', count: 28, tests: ['Comprehensive 28 parameter hemogram series'] },
      { name: 'Liver Function Tests (LFT)', count: 11, tests: ['SGPT', 'SGOT', 'Albumin', 'Alkaline Phosphatase', 'Bilirubin Direct', 'Bilirubin Indirect', 'Bilirubin Total', 'Gamma GT', 'Globulin', 'Total Protein', 'ALB/GLB Ratio'] },
      { name: 'Cholesterol Profile', count: 8, tests: ['LDL', 'HDL', 'Total Cholesterol', 'Non-HDL', 'Triglycerides', 'VLDL', 'LDL/HDL Ratio', 'Cholesterol/HDL Ratio'] },
      { name: 'Complete Urine Analysis', count: 18, tests: ['18 Detailed Chemical & Microscopy Parameters'] },
      { name: 'Cardiac Profile', count: 6, tests: ['Apo B : Apo A1 Ratio', 'Apolipoprotein (A1)', 'Apolipoprotein (B)', 'Homocysteine', 'hs-CRP', 'Lipoprotein (a)'] },
      { name: 'Electrolyte Profile', count: 3, tests: ['Chloride', 'Potassium', 'Sodium'] },
      { name: 'Vitamin Profile', count: 3, tests: ['Vitamin D', 'Vitamin B12', 'Folic Acid'] },
      { name: 'Arthritis Profile', count: 2, tests: ['Anti-CCP', 'Anti Nuclear Antibodies (ANA)'] },
      { name: 'Growth Hormones', count: 1, tests: ['Testosterone Levels'] },
      { name: 'Pancreatic Profile', count: 2, tests: ['Amylase', 'Lipase'] }
    ]
  },
  {
    id: 'card-5',
    code: 'SNR-100',
    title: 'Seniors Saver',
    subtitle: 'Tailored for Elders Age > 55–65 Years',
    target: ['Seniors', 'Men', 'Women'],
    totalTests: 100,
    mrp: 8750,
    offerPrice: 3800,
    discount: '57% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/seniors-whole-body-health-profile-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#FCE7F3]', // Blush Pink
      accentBorder: 'border-pink-200',
      badgeBg: 'bg-pink-100 text-pink-800',
      gradientBottom: 'from-pink-500/10 via-rose-50/50 to-transparent',
      pillColor: 'bg-pink-600 text-white',
      glow: 'shadow-pink-500/20',
      lineColor: 'rgba(236, 72, 153, 0.35)'
    },
    popular: false,
    highlights: ['Specialized Geriatric Screening', 'ANA + Anti-CCP Joint Health', 'Cardiac Risk & Electrolytes'],
    notes: ['8–12 Hrs Fasting Needed', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Diabetic Profile', count: 3, tests: ['Sugar, Fasting', 'HbA1C', 'Average Glucose (eAG)'] },
      { name: 'Thyroid Profile', count: 3, tests: ['Total T3', 'Total T4', 'TSH'] },
      { name: 'Kidney Profile', count: 7, tests: ['BUN', 'Serum Creatinine', 'BUN/Creat Ratio', 'Calcium', 'Urea', 'Uric Acid', 'eGFR'] },
      { name: 'Iron Deficiency Profile', count: 4, tests: ['Serum Iron', 'TIBC', 'Transferrin Saturation', 'Ferritin'] },
      { name: 'CBC – Complete Blood Count', count: 28, tests: ['28 Hemogram blood count elements'] },
      { name: 'Liver Function Tests (LFT)', count: 11, tests: ['SGPT', 'SGOT', 'Albumin', 'Alkaline Phosphatase', 'Bilirubin Direct', 'Bilirubin Indirect', 'Bilirubin Total', 'Gamma GT', 'Globulin', 'Total Protein', 'ALB/GLB Ratio'] },
      { name: 'Cholesterol Profile', count: 8, tests: ['LDL', 'HDL', 'Total Cholesterol', 'Non-HDL', 'Triglycerides', 'VLDL', 'LDL/HDL Ratio', 'Cholesterol/HDL Ratio'] },
      { name: 'Complete Urine Analysis', count: 18, tests: ['Complete chemical, physical & microscopy metrics'] },
      { name: 'Cardiac Profile', count: 6, tests: ['Apo B : Apo A1 Ratio', 'Apolipoprotein (A1)', 'Apolipoprotein (B)', 'Homocysteine', 'hs-CRP', 'Lipoprotein (a)'] },
      { name: 'Electrolyte Profile', count: 3, tests: ['Chloride', 'Potassium', 'Sodium'] },
      { name: 'Vitamin Profile', count: 3, tests: ['Vitamin D', 'Vitamin B12', 'Folic Acid'] },
      { name: 'Arthritis Profile', count: 2, tests: ['Anti-CCP', 'Anti Nuclear Antibodies (ANA)'] },
      { name: 'Growth & Vital Hormones', count: 1, tests: ['Testosterone Levels'] },
      { name: 'Pancreatic Profile', count: 2, tests: ['Amylase', 'Lipase'] }
    ]
  },
  {
    id: 'card-6',
    code: 'PREM-RAD',
    title: 'Premium Profile',
    subtitle: 'Pathology + Cardiology (ECG) + Radiology (USG/2D Echo)',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 89,
    mrp: 12500,
    offerPrice: 9999,
    discount: '20% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/comprehensive-health-checkup-kharghar-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#CFFAFE]', // Pale Cyan
      accentBorder: 'border-cyan-200',
      badgeBg: 'bg-cyan-100 text-cyan-800',
      gradientBottom: 'from-cyan-500/10 via-teal-50/50 to-transparent',
      pillColor: 'bg-cyan-600 text-white',
      glow: 'shadow-cyan-500/20',
      lineColor: 'rgba(6, 182, 212, 0.35)'
    },
    popular: true,
    highlights: ['2D Echo & ECG Included', 'USG Whole Abdomen & Chest X-Ray', 'Full 85 Pathology Battery'],
    notes: [
      '8–12 Hrs Fasting Needed',
      'Radiology at Diagnostic Center',
      'Home Visits Available – 24/7 for Blood/Urine'
    ],
    categories: [
      { name: 'Cardiology (Clinical)', count: 2, tests: ['Electrocardiography (ECG)', 'X-Ray, Chest'] },
      { name: 'Radiology (Imaging)', count: 2, tests: ['USG – Whole Abdomen', '2D Echocardiography'] },
      { name: 'Pathology — CBC Complete Hemogram', count: 28, tests: ['28 parameters including ESR and Platelet indices'] },
      { name: 'Diabetes & Metabolism', count: 2, tests: ['Sugar, Fasting', 'HbA1C (Whole Blood)'] },
      { name: 'Kidney Profile', count: 7, tests: ['Serum Creatinine', 'BUN', 'Urea', 'Uric Acid', 'Calcium', 'eGFR', 'BUN/Creat Ratio'] },
      { name: 'Lipid Profile', count: 8, tests: ['Total', 'HDL', 'LDL', 'VLDL', 'Triglycerides & Ratios'] },
      { name: 'Liver Function Test', count: 11, tests: ['SGOT', 'SGPT', 'Bilirubin Total/Direct/Indirect', 'Alkaline Phosphatase', 'Total Protein', 'Albumin', 'Globulin', 'A/G Ratio', 'GGTP'] },
      { name: 'Thyroid Profile', count: 3, tests: ['T3', 'T4', 'TSH'] },
      { name: 'Urine Complete Analysis', count: 18, tests: ['18 Routine and Microscopic Indicators'] },
      { name: 'Iron & Bone Metabolism', count: 5, tests: ['Serum Iron', 'TIBC', 'Transferrin Saturation', '25 OH Vitamin D', 'Calcium'] }
    ]
  },
  {
    id: 'card-7',
    code: 'FIT-LADY',
    title: 'Fit Lady Package',
    subtitle: 'Tailored for Women 25, 35 & 65 Years',
    target: ['Women'],
    totalTests: 47,
    mrp: 4500,
    offerPrice: 2650,
    discount: '41% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/women-health-checkup-packages-in-pune-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#FCE7F3]', // Soft Rose
      accentBorder: 'border-pink-300',
      badgeBg: 'bg-pink-100 text-pink-800',
      gradientBottom: 'from-pink-500/10 via-rose-50/50 to-transparent',
      pillColor: 'bg-pink-600 text-white',
      glow: 'shadow-pink-500/20',
      lineColor: 'rgba(244, 114, 182, 0.4)'
    },
    popular: true,
    highlights: ['Includes Ovarian CA125 Marker', 'Rheumatoid Factor (RF)', 'Complete CBC-28 & Urine'],
    notes: ['8–12 Hrs Fasting Needed', 'Reports Available within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Ovarian & Bone Health', count: 3, tests: ['CA125 (Tumour Marker)', 'Calcium', 'Phosphorus'] },
      { name: 'Renal & Joint Health', count: 3, tests: ['Serum Creatinine', 'Uric Acid', 'Rheumatoid Factor (RF)'] },
      { name: 'Liver Enzymes', count: 2, tests: ['SGOT (AST)', 'SGPT (ALT)'] },
      { name: 'Metabolic & Thyroid', count: 2, tests: ['Sugar (Glucose) Fasting', 'TSH (Thyroid Stimulating Hormone)'] },
      { name: 'CBC – Complete Hemogram', count: 28, tests: ['28 Complete Blood Count cell indices & Platelets'] },
      { name: 'Lipid & Urine Panels', count: 9, tests: ['Lipid Profile (8 parameters)', 'Urine Complete Analysis'] }
    ]
  },
  {
    id: 'card-8',
    code: 'FIT-MAN',
    title: 'Fit Man Package',
    subtitle: 'Tailored for Men 25, 35 & 65 Years',
    target: ['Men'],
    totalTests: 46,
    mrp: 4500,
    offerPrice: 2650,
    discount: '41% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/fit-man-whole-body-health-checkup-mumbai-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#E0F2FE]', // Sky Blue
      accentBorder: 'border-sky-300',
      badgeBg: 'bg-sky-100 text-sky-800',
      gradientBottom: 'from-sky-500/10 via-blue-50/50 to-transparent',
      pillColor: 'bg-sky-600 text-white',
      glow: 'shadow-sky-500/20',
      lineColor: 'rgba(56, 189, 248, 0.4)'
    },
    popular: false,
    highlights: ['Includes PSA-Total Prostate Marker', 'Rheumatoid Factor (RF)', 'Full CBC-28 Hemogram'],
    notes: ['8–12 Hrs Fasting Needed', 'Reports Available within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Prostate & Renal Screening', count: 3, tests: ['Prostate Specific Antigen (PSA)-Total', 'Serum Creatinine', 'Uric Acid'] },
      { name: 'Bone & Joints', count: 2, tests: ['Calcium', 'Rheumatoid Factor (RF)'] },
      { name: 'Liver Enzymes', count: 2, tests: ['SGOT (AST)', 'SGPT (ALT)'] },
      { name: 'Metabolic & Blood', count: 2, tests: ['Sugar (Glucose) Fasting', 'Urine Complete Analysis'] },
      { name: 'Lipid & Hemogram', count: 36, tests: ['Lipid Profile (8 parameters)', 'CBC Complete Hemogram (28 parameters)'] }
    ]
  },
  {
    id: 'card-9',
    code: 'HD-WEL-15.4',
    title: 'HD Wellness 15.4',
    subtitle: 'Advanced Insulin & Inflammation Matrix',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 72,
    mrp: 4500,
    offerPrice: 3800,
    discount: '16% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/full-body-health-checkup-package-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#EDE9FE]', // Lavender
      accentBorder: 'border-purple-300',
      badgeBg: 'bg-purple-100 text-purple-800',
      gradientBottom: 'from-purple-500/10 via-indigo-50/50 to-transparent',
      pillColor: 'bg-purple-600 text-white',
      glow: 'shadow-purple-500/20',
      lineColor: 'rgba(168, 85, 247, 0.4)'
    },
    popular: true,
    highlights: ['Insulin Fasting & Microalbumin', 'hs-CRP Cardiac Risk', 'Vit D, B12 & Complete Iron'],
    notes: ['8–12 Hrs Fasting Needed', 'Reports Available within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Metabolic & Insulin', count: 3, tests: ['Insulin Fasting', 'HbA1C (Whole Blood)', 'Microalbumin'] },
      { name: 'Inflammation & Cardiac', count: 1, tests: ['High Sensitivity C-Reactive Protein (hs-CRP)'] },
      { name: 'Vitamin & Iron Profiles', count: 5, tests: ['25 OH Vitamin D', 'Vitamin B12', 'Serum Iron', 'TIBC', 'Transferrin Saturation'] },
      { name: 'Core Organ Profiles', count: 26, tests: ['Thyroid (T3, T4, TSH)', 'Kidney Profile', 'LFT (Liver Function)', 'Lipid Profile'] },
      { name: 'CBC Hemogram', count: 28, tests: ['28 Complete Blood Count parameters & ESR'] }
    ]
  },
  {
    id: 'card-10',
    code: 'HD-WEL-1.7',
    title: 'HD Wellness 1.7',
    subtitle: 'Whole Body + Toxic Elements & Cardiac Marker',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 95,
    mrp: 5500,
    offerPrice: 4500,
    discount: '18% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/comprehensive-full-body-checkup-in-navi-mumbai-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#FEF9C3]', // Light Cream Yellow
      accentBorder: 'border-yellow-300',
      badgeBg: 'bg-yellow-100 text-yellow-800',
      gradientBottom: 'from-yellow-500/10 via-amber-50/50 to-transparent',
      pillColor: 'bg-amber-600 text-white',
      glow: 'shadow-yellow-500/20',
      lineColor: 'rgba(234, 179, 8, 0.45)'
    },
    popular: false,
    highlights: ['Blood Toxic Elements Profile', 'Specific 6 Cardiac Parameters', 'Testosterone & Pancreatic'],
    notes: ['8–12 Hrs Fasting Needed', 'Reports within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Specialized Markers', count: 3, tests: ['Testosterone', 'Blood Toxic Element Profile', 'GD Wellness Arthritis Profile'] },
      { name: 'Specific Cardiac Risk', count: 6, tests: ['Apo B : Apo A1 Ratio', 'Apolipoprotein A1', 'Apolipoprotein B', 'Homocysteine', 'hs-CRP', 'Lipoprotein (a)'] },
      { name: 'Electrolytes & Pancreatic', count: 5, tests: ['Serum Electrolytes (Na, K, Cl)', 'Amylase', 'Lipase'] },
      { name: 'Vitamins & Iron', count: 6, tests: ['GD Wellness Vitamin Profile (3)', 'Iron Studies (Iron, TIBC, Transferrin)'] },
      { name: 'System Profiles & CBC', count: 54, tests: ['HbA1C', 'TFT (T3, T4, TSH)', 'LFT', 'KFT', 'Lipid Profile', 'CBC 28 Hemogram'] }
    ]
  },
  {
    id: 'card-11',
    code: 'HD-WEL-3.2',
    title: 'HD Wellness 3.2',
    subtitle: 'Ultra Executive Screening with Geno-Serum & 14 LFT',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 110,
    mrp: 6500,
    offerPrice: 4800,
    discount: '26% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/comprehensive-profile-full-body-checkup-cost-in-pune-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#E0E7FF]', // Periwinkle Blue
      accentBorder: 'border-indigo-300',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      gradientBottom: 'from-indigo-500/10 via-purple-50/50 to-transparent',
      pillColor: 'bg-indigo-600 text-white',
      glow: 'shadow-indigo-500/20',
      lineColor: 'rgba(99, 102, 241, 0.45)'
    },
    popular: true,
    highlights: ['TMS Geno-Serum Included', '14 Liver Parameters & 7 Cardiac', '5 Pancreatic & 4 Iron Markers'],
    notes: ['8–12 Hrs Fasting Needed', 'Reports within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Genomic & Hormones', count: 2, tests: ['TMS Geno-Serum', 'Testosterone Levels'] },
      { name: 'Cardiac & Toxic Profiles', count: 8, tests: ['GD Wellness Cardiac Risk (7 parameters)', 'Blood Toxic Element Profile'] },
      { name: 'Liver & Pancreas Panels', count: 19, tests: ['GD Wellness Liver Profile (14 parameters)', 'Pancreatic Profile (5 parameters)'] },
      { name: 'Iron, Vitamins & Arthritis', count: 9, tests: ['GD Wellness Iron Deficiency Profile (4)', 'GD Wellness Vitamin Profile (3)', 'GD Wellness Arthritis Profile'] },
      { name: 'Comprehensive Baseline', count: 50, tests: ['Serum Electrolytes', 'Lipid Profile', 'TFT (T3, T4, TSH)', 'HbA1C', 'Kidney Profile', 'CBC 28 Parameters'] }
    ]
  },
  {
    id: 'card-12',
    code: 'FEVER-PNL',
    title: 'Monsoon Fever Panel',
    subtitle: 'Rapid Infectious Disease & Vector Screening',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 35,
    mrp: 3800,
    offerPrice: 2800,
    discount: '26% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/fever-profile.webp',
    archTheme: {
      archBg: 'bg-[#FFEDD5]', // Soft Orange
      accentBorder: 'border-orange-300',
      badgeBg: 'bg-orange-100 text-orange-800',
      gradientBottom: 'from-orange-500/10 via-amber-50/50 to-transparent',
      pillColor: 'bg-orange-600 text-white',
      glow: 'shadow-orange-500/20',
      lineColor: 'rgba(249, 115, 22, 0.4)'
    },
    popular: true,
    highlights: ['Triple Dengue (NS1, IgG, IgM)', 'Malaria Parasite & Widal Typhoid', 'Complete CBC & CRP'],
    notes: ['Fasting Not Mandatory', 'Urgent Reports within 4–6 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Vector-Borne Tests', count: 4, tests: ['Dengue NS1 Antigen – Rapid', 'Dengue IgG Antibody', 'Dengue IgM Antibody', 'Malarial Parasite (Smear/Antigen)'] },
      { name: 'Enteric & Bacterial Tests', count: 2, tests: ['Widal Slide Test', 'Salmonella Typhi Antibodies'] },
      { name: 'Infection Severity & Blood', count: 29, tests: ['C-Reactive Protein (CRP Quantitative)', 'CBC Complete Blood Count (28 parameters with Platelet Count)'] }
    ]
  },
  {
    id: 'card-13',
    code: 'PCOD-CARE',
    title: 'PCOD Profile',
    subtitle: 'Endocrine & Insulin Resistance Panel for Women',
    target: ['Women'],
    totalTests: 8,
    mrp: 4500,
    offerPrice: 3200,
    discount: '29% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/women-pcod-affordable-full-body-checkup-mumbai-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#FDF2F8]', // Soft Fuchsia
      accentBorder: 'border-pink-300',
      badgeBg: 'bg-pink-100 text-pink-800',
      gradientBottom: 'from-pink-500/10 via-rose-50/50 to-transparent',
      pillColor: 'bg-pink-600 text-white',
      glow: 'shadow-pink-500/20',
      lineColor: 'rgba(236, 72, 153, 0.4)'
    },
    popular: false,
    highlights: ['Dual Insulin (Fasting & PP)', 'FSH, LH & Prolactin Ratio', 'Testosterone Levels'],
    notes: ['8–12 Hrs Fasting for 1st sample, 2nd sample 2 hrs post meal', 'Reports within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Gonadal & Pituitary Hormones', count: 4, tests: ['Follicle Stimulating Hormone (FSH)', 'Luteinizing Hormone (LH)', 'Prolactin', 'Testosterone Total'] },
      { name: 'Insulin Resistance Index', count: 2, tests: ['Insulin Fasting', 'Insulin Post Prandial (PP)'] },
      { name: 'Blood Sugar Monitoring', count: 2, tests: ['Sugar (Glucose) Fasting', 'Sugar (Glucose) Post Prandial'] }
    ]
  },
  {
    id: 'card-14',
    code: 'HD-WOMEN-BSC',
    title: 'HD Women Basic',
    subtitle: 'Essential Vital Check for Women 25, 35 & 65 Years',
    target: ['Women'],
    totalTests: 76,
    mrp: 4200,
    offerPrice: 2650,
    discount: '37% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/women-executive-health-checkup-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#F3E8FF]', // Soft Purple
      accentBorder: 'border-purple-300',
      badgeBg: 'bg-purple-100 text-purple-800',
      gradientBottom: 'from-purple-500/10 via-fuchsia-50/50 to-transparent',
      pillColor: 'bg-purple-600 text-white',
      glow: 'shadow-purple-500/20',
      lineColor: 'rgba(192, 132, 252, 0.4)'
    },
    popular: false,
    highlights: ['Estradiol + FSH, LH & Prolactin', 'Complete Iron & 3 Vitamins', 'HbA1C, LFT, KFT & Lipids'],
    notes: ['8–12 Hrs Fasting Needed', 'Reports within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Female Hormones', count: 4, tests: ['Estradiol', 'FSH', 'LH', 'Prolactin'] },
      { name: 'Vitamins & Iron', count: 6, tests: ['GD Wellness Vitamin Profile (3)', 'Iron Studies (Iron, TIBC, Transferrin Saturation)'] },
      { name: 'Organ Profiles', count: 30, tests: ['Thyroid TFT (T3, T4, TSH)', 'HbA1C', 'Kidney Profile', 'Liver Function (LFT)', 'Lipid Profile'] },
      { name: 'Hemogram', count: 28, tests: ['Complete Hemogram CBC (28 parameters)'] }
    ]
  },
  {
    id: 'card-15',
    code: 'OBES-BSC',
    title: 'Obesity Basic Package',
    subtitle: 'Metabolic & Cardiovascular Weight Management',
    target: ['Men', 'Women', 'Seniors'],
    totalTests: 22,
    mrp: 2650,
    offerPrice: 1650,
    discount: '38% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/obase-man-full-body-checkup-in-navi-mumbai-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#CCFBF1]', // Pale Teal
      accentBorder: 'border-teal-300',
      badgeBg: 'bg-teal-100 text-teal-800',
      gradientBottom: 'from-teal-500/10 via-emerald-50/50 to-transparent',
      pillColor: 'bg-teal-600 text-white',
      glow: 'shadow-teal-500/20',
      lineColor: 'rgba(20, 184, 166, 0.4)'
    },
    popular: false,
    highlights: ['Serum Electrolytes & Uric Acid', 'Total Cholesterol & Triglycerides', 'Thyroid Profile (T3, T4, TSH)'],
    notes: ['8–12 Hrs Fasting Needed', 'Reports within 8–12 Hrs', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Lipids & Metabolism', count: 3, tests: ['Total Cholesterol', 'Triglycerides', 'Sugar (Glucose) Fasting'] },
      { name: 'Renal & Uric Acid', count: 2, tests: ['Serum Creatinine', 'Uric Acid'] },
      { name: 'Electrolytes & Thyroid', count: 6, tests: ['Serum Electrolyte Profile (Na, K, Cl)', 'Thyroid Profile - Total T3, T4, TSH (TFT)'] },
      { name: 'Urine Analysis', count: 18, tests: ['18 Routine and Microscopic Urine Examination Parameters'] }
    ]
  },
  {
    id: 'card-16',
    code: 'TUMOR-F',
    title: 'Tumour Panel (Female)',
    subtitle: 'Comprehensive 6 Biomarker Cancer Screening for Women',
    target: ['Women'],
    totalTests: 6,
    mrp: 5800,
    offerPrice: 4500,
    discount: '22% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/women-tumour-panel-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#FCE7F3]', // Blush Pink
      accentBorder: 'border-pink-300',
      badgeBg: 'bg-pink-100 text-pink-800',
      gradientBottom: 'from-pink-500/10 via-rose-50/50 to-transparent',
      pillColor: 'bg-pink-600 text-white',
      glow: 'shadow-pink-500/20',
      lineColor: 'rgba(236, 72, 153, 0.4)'
    },
    popular: true,
    highlights: ['Ovarian CA125 & Breast CA15.3', 'GI CA19.9 & Colorectal CEA', 'AFP Liver & Beta HCG'],
    notes: ['Fasting Not Mandatory', 'Certified Pathologist Verification', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Reproductive & Breast Tumour Markers', count: 3, tests: ['CA125 (Ovarian Cancer Marker)', 'CA15.3 (Breast Cancer Marker)', 'Beta HCG (Gestational & Germ Cell Marker)'] },
      { name: 'Gastrointestinal & Hepatic Markers', count: 3, tests: ['Alpha Feto Protein (AFP - Liver)', 'CA 19.9 (Pancreatic & Colorectal)', 'Carcino Embryonic Antigen (CEA - Gastrointestinal)'] }
    ]
  },
  {
    id: 'card-17',
    code: 'TUMOR-M',
    title: 'Tumour Panel (Male)',
    subtitle: 'Comprehensive 5 Biomarker Cancer Screening for Men',
    target: ['Men'],
    totalTests: 5,
    mrp: 5800,
    offerPrice: 3500,
    discount: '40% OFF',
    imageUrl: 'https://storage.googleapis.com/wp-media-henoticbucket/health-checkup/men-tumour-panel-henotic-diagnostics.webp',
    archTheme: {
      archBg: 'bg-[#E0E7FF]', // Lavender Blue
      accentBorder: 'border-indigo-300',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      gradientBottom: 'from-indigo-500/10 via-blue-50/50 to-transparent',
      pillColor: 'bg-indigo-600 text-white',
      glow: 'shadow-indigo-500/20',
      lineColor: 'rgba(99, 102, 241, 0.4)'
    },
    popular: false,
    highlights: ['Free PSA / Total PSA Ratio', 'Pancreatic CA 19.9 & Colorectal CEA', 'Hepatic AFP & Beta HCG'],
    notes: ['Fasting Not Mandatory', 'Certified Pathologist Verification', 'Home Visits Available – 24/7'],
    categories: [
      { name: 'Prostate & Testicular Oncology', count: 2, tests: ['Free PSA / Total PSA Ratio', 'Beta HCG (Testicular & Germ Cell Marker)'] },
      { name: 'Hepatic & Gastrointestinal Oncology', count: 3, tests: ['Alpha Feto Protein (AFP - Liver)', 'CA 19.9 (Pancreatic & Gastrointestinal)', 'Carcino Embryonic Antigen (CEA - Colorectal)'] }
    ]
  }
];

// Infrastructure Showcase Data
export const INFRASTRUCTURE_LIST: InfrastructureItem[] = [
  {
    title: 'Main Diagnostic Facility',
    subtitle: 'Millennium Empire Business Park, Kharghar',
    image: 'https://cdn.henoticdiagnostics.com/Front%20Office/henotic-diagnostics-main-building.webp',
    tag: 'Flagship Center'
  },
  {
    title: 'Executive Entrance & Board',
    subtitle: 'Sector 15, Direct Access Road',
    image: 'https://cdn.henoticdiagnostics.com/Front%20Office/henotic-diagnostics-name-plate.webp',
    tag: 'Easy Access'
  },
  {
    title: 'Patient Reception Desk',
    subtitle: 'Digital registration & barcoding kiosk',
    image: 'https://cdn.henoticdiagnostics.com/Trust%20Signal/reception-desk-henotic-diagnostics_hero.webp',
    tag: 'Zero Wait Desk'
  },
  {
    title: 'Comfortable Waiting Lounge',
    subtitle: 'Sanitized climate-controlled recovery space',
    image: 'https://cdn.henoticdiagnostics.com/Trust%20Signal/henotic-diagnostics-reception-waiting-area_hero.webp',
    tag: 'Patient Comfort'
  },
  {
    title: 'Automated Pathology Suite',
    subtitle: 'Fully automated biochemistry & hematology analyzer',
    image: 'https://cdn.henoticdiagnostics.com/Laboratory/pathology-lab-near-me-henotic-diagnostics-kharghar.webp',
    tag: 'High Precision'
  },
  {
    title: 'Clinical Diagnostics Lab',
    subtitle: 'NABL & ISO compliant sample processing line',
    image: 'https://cdn.henoticdiagnostics.com/Laboratory/henotic-diagnostics.webp',
    tag: 'Sterile Workstations'
  }
];

// Reporting Pathologists
export const DOCTORS_DATA: DoctorData[] = [
  {
    name: 'Dr. Amulya Patil',
    degrees: 'MBBS, MD/MS, DNB – Pathology',
    registration: '2010/01/0129 Maharashtra Medical Council, 2010',
    bio: 'Dedicated medical professional specialising in Pathology, committed to accuracy, quality, and reliability in diagnostic services. With an academic association with reputed medical institutions such as MGM and Dr D. Y. Patil, Dr Patil emphasises precision in laboratory diagnosis and a patient-focused approach.',
    focus: ['Diagnostic Pathology', 'Laboratory Medicine', 'Quality Assurance'],
    image: 'https://cdn.henoticdiagnostics.com/Leadership/dr.amulya-patil.webp'
  },
  {
    name: 'Dr. Prathibha Patil',
    degrees: 'MBBS, MD/MS, DNB – Pathology',
    registration: '61719 Maharashtra Medical Council, 1989',
    bio: 'Dedicated medical professional specialising in Pathology, with a focus on accurate diagnostics, laboratory excellence, and quality-driven healthcare. Commitment to reliable diagnostic practices with institutional associations including MGM Hospitals, Apollo, and Medicover.',
    focus: ['Diagnostic Pathology', 'Clinical Hematology', 'Quality Assurance'],
    image: 'https://cdn.henoticdiagnostics.com/Leadership/dr-pratibha-patil-radiologist.webp'
  }
];

// Accreditations & Certificates
export const CERTIFICATES_DATA: CertificateData[] = [
  {
    id: 'nabl',
    name: 'NABL Certified',
    authority: 'National Accreditation Board for Testing and Calibration Laboratories',
    logo: 'https://cdn.henoticdiagnostics.com/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp',
    certImage: 'https://cdn.henoticdiagnostics.com/Certificates/Certificates_henotic-diagnostics-nabl-certified.webp',
    desc: 'Strict ISO 15189 compliance for medical laboratories ensuring reproducible, precise clinical tests.'
  },
  {
    id: 'cap',
    name: 'CAP Accredited Standards',
    authority: 'College of American Pathologists Guidelines',
    logo: 'https://cdn.henoticdiagnostics.com/Accreditation%20Logos/cap-accredidation-logo.webp',
    certImage: 'https://cdn.henoticdiagnostics.com/Certificates/Certificates_henotic-diagnostics-cap-certified.webp',
    desc: 'International quality benchmark upholding clinical laboratory safety and rigorous quality controls.'
  },
  {
    id: 'iso',
    name: 'ISO Certified Quality',
    authority: 'International Organization for Standardization',
    logo: 'https://cdn.henoticdiagnostics.com/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp',
    certImage: 'https://cdn.henoticdiagnostics.com/Certificates/Certificates_henotic-diagnostics-iso-certified.webp',
    desc: 'Standardized operational procedures from phlebotomy collection to digital report dissemination.'
  }
];

// Awards Coverflow Data
export const AWARDS_DATA: AwardData[] = [
  {
    id: "india-excellence",
    title: "India Excellence Awards",
    category: "National Recognition",
    year: "2023",
    organization: "ET Now & Industry Leaders Forum",
    description: "Honored with the Outstanding Achievement Award in Healthcare Diagnostics for uncompromising clinical accuracy and rapid diagnostic turnarounds.",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/Awards/India%20Excellence-henotic-diagnostics-certified.webp",
    badgeLabel: "Excellence",
    accentGlow: "#e7569b"
  },
  {
    id: "asia-today",
    title: "Asia Today Award",
    category: "International Honor",
    year: "2022",
    organization: "Asia Today Research & Media",
    description: "Proudly presented the Grand Trophy for Best Diagnostic Center in Central Region, marking exceptional regional service standards.",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/Awards/asiatoday-henotic-diagnostics-certified.webp",
    badgeLabel: "Continental",
    accentGlow: "#6c6cf6"
  },
  {
    id: "corona-puraskar",
    title: "Corona Purashkar",
    category: "Frontline Healthcare Citation",
    year: "2021",
    organization: "National Medical Council & Red Cross",
    description: "Commended for relentless 24/7 RT-PCR sample handling, frontline mobile medical support, and emergency pandemic service delivery.",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/Awards/corona-purshkar-henotic-diagnostics-certified.webp",
    badgeLabel: "COVID Hero",
    accentGlow: "#bb60b9"
  },
  {
    id: "sbi-award",
    title: "SBI Appreciation Award",
    category: "Corporate Excellence",
    year: "2022",
    organization: "State Bank of India Corporate Wellness",
    description: "Certificate of Appreciation for maintaining premier healthcare screening drives and corporate welfare partnerships across state branches.",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/Awards/sbi-award-henotic-diagnostics-certified.webp",
    badgeLabel: "Corporate Trust",
    accentGlow: "#9f68c8"
  },
  {
    id: "six-sigma",
    title: "Six Sigma Quality Award",
    category: "Clinical Standard of Care",
    year: "2023",
    organization: "Healthcare Quality & Six Sigma Council",
    description: "Recognized for near-zero diagnostic deviation, strict adherence to ISO 15189 compliance, and premier sample archival pipelines.",
    image: "https://storage.googleapis.com/wp-media-henoticbucket/Awards/six-sigma-henotic-diagnostics-certified.webp",
    badgeLabel: "Quality Assurance",
    accentGlow: "#8f64cf"
  }
];

// Testimonials
export const TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    name: "Priya Sharma",
    service: "Full Body Health Checkup",
    quote: "I booked a full body checkup at Henotic Diagnostics for a routine health screening. The booking process was simple, the staff was courteous, and the overall experience was smooth. It was a convenient way to stay on top of my health.",
    image: "https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-full-body-checkup-testimonial-priya-sharma.webp",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Mehta",
    service: "Comprehensive Health Checkup",
    quote: "I was looking for a convenient place for my regular health checkup and chose Henotic Diagnostics. The staff explained the process clearly, and I appreciated the organized service and professional approach.",
    image: "https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-comprehensive-health-checkup-testimonial-rahul-mehta.webp",
    rating: 5,
  },
  {
    id: 3,
    name: "Sneha Patil",
    service: "Full Body Checkup",
    quote: "My experience at Henotic Diagnostics was pleasant from start to finish. The team was polite and helpful, and the sample collection process was handled professionally. I would consider them again for routine health tests.",
    image: "https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-full-body-health-checkup-testimonial-sneha-patil.webp",
    rating: 5,
  },
  {
    id: 4,
    name: "Amit Deshmukh",
    service: "Preventive Health Checkup",
    quote: "I believe regular health screening is important, so I booked a preventive checkup at Henotic Diagnostics. The process was straightforward, and the team made the visit comfortable. A convenient option for people with busy schedules.",
    image: "https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-preventive-health-checkup-testimonial-amit-deshmukh.webp",
    rating: 5,
  },
  {
    id: 5,
    name: "Neha Kulkarni",
    service: "Complete Body Health Checkup",
    quote: "I wanted to get my routine health tests done without unnecessary hassle. Henotic Diagnostics offered a convenient experience, and the staff guided me through the process. I liked the professional and welcoming environment.",
    image: "https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-complete-body-checkup-testimonial-neha-kulkarni.webp",
    rating: 5,
  },
  {
    id: 6,
    name: "Suresh Iyer",
    service: "Annual Full Body Checkup",
    quote: "I booked an annual health checkup to make preventive healthcare part of my routine. The experience at Henotic Diagnostics was well organised, and the team was helpful throughout my visit. Regular screening is a useful step.",
    image: "https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-annual-health-checkup-testimonial-suresh-iyer.webp",
    rating: 5,
  },
];
