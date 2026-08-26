// Service Pricing Configuration for Henotic Diagnostics PSEO Platform
// All prices in INR (₹) with realistic market comparisons showing 30-50% savings

export interface ServicePricing {
  serviceSlug: string;
  serviceName: string;
  henoticPrice: number;
  marketPrice: number;
  savings: number; // percentage
  currency: string;
  category: string;
}

export const SERVICE_PRICING: ServicePricing[] = [
  // ────────────────────────────────────
  // MRI SERVICES (10)
  // ────────────────────────────────────
  { serviceSlug: 'mri-scan', serviceName: 'MRI Scan', henoticPrice: 4500, marketPrice: 9000, savings: 50, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'mri-brain', serviceName: 'MRI Brain', henoticPrice: 4500, marketPrice: 8500, savings: 47, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'mri-spine', serviceName: 'MRI Spine (Single Region)', henoticPrice: 4500, marketPrice: 8500, savings: 47, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'mri-knee', serviceName: 'MRI Knee', henoticPrice: 4500, marketPrice: 8000, savings: 44, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'mri-shoulder', serviceName: 'MRI Shoulder', henoticPrice: 4500, marketPrice: 8500, savings: 47, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'whole-spine-mri', serviceName: 'Whole Spine MRI', henoticPrice: 9000, marketPrice: 16000, savings: 44, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'whole-body-mri', serviceName: 'Whole Body MRI', henoticPrice: 18000, marketPrice: 32000, savings: 44, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'contrast-mri', serviceName: 'MRI with Contrast', henoticPrice: 7000, marketPrice: 13000, savings: 46, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'mri-mrcp', serviceName: 'MRCP Scan', henoticPrice: 6500, marketPrice: 12000, savings: 46, currency: 'INR', category: 'MRI' },
  { serviceSlug: 'cardiac-mri', serviceName: 'Cardiac MRI', henoticPrice: 9500, marketPrice: 18000, savings: 47, currency: 'INR', category: 'MRI' },

  // ────────────────────────────────────
  // CT SCAN SERVICES (8)
  // ────────────────────────────────────
  { serviceSlug: 'ct-scan', serviceName: 'CT Scan', henoticPrice: 2500, marketPrice: 5000, savings: 50, currency: 'INR', category: 'CT Scan' },
  { serviceSlug: 'ct-brain', serviceName: 'CT Brain', henoticPrice: 2000, marketPrice: 4000, savings: 50, currency: 'INR', category: 'CT Scan' },
  { serviceSlug: 'hrct-chest', serviceName: 'HRCT Chest', henoticPrice: 2500, marketPrice: 4500, savings: 44, currency: 'INR', category: 'CT Scan' },
  { serviceSlug: 'ct-abdomen-pelvis', serviceName: 'CT Abdomen & Pelvis', henoticPrice: 3500, marketPrice: 6500, savings: 46, currency: 'INR', category: 'CT Scan' },
  { serviceSlug: 'coronary-ct-angiography', serviceName: 'CT Coronary Angiography', henoticPrice: 8000, marketPrice: 15000, savings: 47, currency: 'INR', category: 'CT Scan' },
  { serviceSlug: 'ct-pulmonary-angiography', serviceName: 'CT Pulmonary Angiography', henoticPrice: 5500, marketPrice: 10000, savings: 45, currency: 'INR', category: 'CT Scan' },
  { serviceSlug: 'contrast-ct-scan', serviceName: 'CT Scan with Contrast', henoticPrice: 4000, marketPrice: 7500, savings: 47, currency: 'INR', category: 'CT Scan' },
  { serviceSlug: 'whole-body-ct-scan', serviceName: 'Whole Body CT Scan', henoticPrice: 8500, marketPrice: 15000, savings: 43, currency: 'INR', category: 'CT Scan' },

  // ────────────────────────────────────
  // PET CT & NUCLEAR MEDICINE (6)
  // ────────────────────────────────────
  { serviceSlug: 'pet-ct', serviceName: 'PET CT Scan', henoticPrice: 12000, marketPrice: 22000, savings: 45, currency: 'INR', category: 'PET CT & Nuclear Medicine' },
  { serviceSlug: 'whole-body-pet-ct', serviceName: 'Whole Body PET CT', henoticPrice: 12000, marketPrice: 25000, savings: 52, currency: 'INR', category: 'PET CT & Nuclear Medicine' },
  { serviceSlug: 'fdg-pet-ct', serviceName: 'FDG PET CT', henoticPrice: 12500, marketPrice: 23000, savings: 46, currency: 'INR', category: 'PET CT & Nuclear Medicine' },
  { serviceSlug: 'bone-scan', serviceName: 'Bone Scintigraphy / Bone Scan', henoticPrice: 4500, marketPrice: 8000, savings: 44, currency: 'INR', category: 'PET CT & Nuclear Medicine' },
  { serviceSlug: 'thyroid-scan', serviceName: 'Thyroid Scintigraphy', henoticPrice: 2500, marketPrice: 4500, savings: 44, currency: 'INR', category: 'PET CT & Nuclear Medicine' },
  { serviceSlug: 'renal-scan', serviceName: 'Renal DTPA / EC Scan', henoticPrice: 3000, marketPrice: 5500, savings: 45, currency: 'INR', category: 'PET CT & Nuclear Medicine' },

  // ────────────────────────────────────
  // ULTRASOUND & SONOGRAPHY (8)
  // ────────────────────────────────────
  { serviceSlug: 'ultrasound', serviceName: 'Ultrasound (Single Part)', henoticPrice: 800, marketPrice: 1500, savings: 47, currency: 'INR', category: 'Ultrasound' },
  { serviceSlug: 'abdominal-ultrasound', serviceName: 'Abdominal Ultrasound', henoticPrice: 800, marketPrice: 1500, savings: 47, currency: 'INR', category: 'Ultrasound' },
  { serviceSlug: 'whole-abdomen-ultrasound', serviceName: 'Whole Abdomen Ultrasound', henoticPrice: 900, marketPrice: 1800, savings: 50, currency: 'INR', category: 'Ultrasound' },
  { serviceSlug: 'pelvic-ultrasound', serviceName: 'Pelvic Ultrasound', henoticPrice: 800, marketPrice: 1500, savings: 47, currency: 'INR', category: 'Ultrasound' },
  { serviceSlug: 'thyroid-ultrasound', serviceName: 'Thyroid Ultrasound', henoticPrice: 800, marketPrice: 1400, savings: 43, currency: 'INR', category: 'Ultrasound' },
  { serviceSlug: 'breast-ultrasound', serviceName: 'Breast Ultrasound', henoticPrice: 900, marketPrice: 1600, savings: 44, currency: 'INR', category: 'Ultrasound' },
  { serviceSlug: 'transvaginal-ultrasound', serviceName: 'Transvaginal Ultrasound', henoticPrice: 900, marketPrice: 1600, savings: 44, currency: 'INR', category: 'Ultrasound' },
  { serviceSlug: 'musculoskeletal-ultrasound', serviceName: 'Musculoskeletal Ultrasound', henoticPrice: 1000, marketPrice: 1800, savings: 44, currency: 'INR', category: 'Ultrasound' },

  // ────────────────────────────────────
  // PREGNANCY & FETAL SCANS (6)
  // ────────────────────────────────────
  { serviceSlug: 'pregnancy-sonography', serviceName: 'Pregnancy Sonography', henoticPrice: 1000, marketPrice: 2000, savings: 50, currency: 'INR', category: 'Pregnancy & Fetal' },
  { serviceSlug: 'nt-scan', serviceName: 'NT Scan (Nuchal Translucency)', henoticPrice: 1500, marketPrice: 2800, savings: 46, currency: 'INR', category: 'Pregnancy & Fetal' },
  { serviceSlug: 'anomaly-scan', serviceName: 'Anomaly Scan (Level 2)', henoticPrice: 4500, marketPrice: 5500, savings: 18, currency: 'INR', category: 'Pregnancy & Fetal' },
  { serviceSlug: 'fetal-echocardiography', serviceName: 'Fetal Echocardiography', henoticPrice: 2500, marketPrice: 4500, savings: 44, currency: 'INR', category: 'Pregnancy & Fetal' },
  { serviceSlug: 'growth-scan', serviceName: 'Fetal Growth Scan', henoticPrice: 1000, marketPrice: 1800, savings: 44, currency: 'INR', category: 'Pregnancy & Fetal' },
  { serviceSlug: 'fetal-doppler', serviceName: 'Fetal Doppler Study', henoticPrice: 1200, marketPrice: 2200, savings: 45, currency: 'INR', category: 'Pregnancy & Fetal' },

  // ────────────────────────────────────
  // BLOOD TESTS & PATHOLOGY (8)
  // ────────────────────────────────────
  { serviceSlug: 'cbc-test', serviceName: 'CBC (Complete Blood Count)', henoticPrice: 250, marketPrice: 500, savings: 50, currency: 'INR', category: 'Blood Tests & Pathology' },
  { serviceSlug: 'lipid-profile', serviceName: 'Lipid Profile', henoticPrice: 350, marketPrice: 650, savings: 46, currency: 'INR', category: 'Blood Tests & Pathology' },
  { serviceSlug: 'thyroid-test', serviceName: 'Thyroid Profile (T3, T4, TSH)', henoticPrice: 400, marketPrice: 750, savings: 47, currency: 'INR', category: 'Blood Tests & Pathology' },
  { serviceSlug: 'liver-function-test', serviceName: 'Liver Function Test (LFT)', henoticPrice: 350, marketPrice: 650, savings: 46, currency: 'INR', category: 'Blood Tests & Pathology' },
  { serviceSlug: 'kidney-function-test', serviceName: 'Kidney Function Test (KFT/RFT)', henoticPrice: 400, marketPrice: 700, savings: 43, currency: 'INR', category: 'Blood Tests & Pathology' },
  { serviceSlug: 'hba1c-test', serviceName: 'HbA1c (Glycated Hemoglobin)', henoticPrice: 350, marketPrice: 600, savings: 42, currency: 'INR', category: 'Blood Tests & Pathology' },
  { serviceSlug: 'vitamin-d-test', serviceName: 'Vitamin D Test (25-OH)', henoticPrice: 600, marketPrice: 1100, savings: 45, currency: 'INR', category: 'Blood Tests & Pathology' },
  { serviceSlug: 'vitamin-b12-test', serviceName: 'Vitamin B12 Test', henoticPrice: 550, marketPrice: 1000, savings: 45, currency: 'INR', category: 'Blood Tests & Pathology' },

  // ────────────────────────────────────
  // CARDIOLOGY DIAGNOSTICS (5)
  // ────────────────────────────────────
  { serviceSlug: 'ecg', serviceName: 'ECG (Electrocardiogram)', henoticPrice: 200, marketPrice: 400, savings: 50, currency: 'INR', category: 'Cardiology' },
  { serviceSlug: '2d-echo', serviceName: '2D Echocardiography', henoticPrice: 1500, marketPrice: 3000, savings: 50, currency: 'INR', category: 'Cardiology' },
  { serviceSlug: 'tmt-test', serviceName: 'TMT (Treadmill Stress Test)', henoticPrice: 1000, marketPrice: 2000, savings: 50, currency: 'INR', category: 'Cardiology' },
  { serviceSlug: 'stress-echo', serviceName: 'Stress Echocardiography', henoticPrice: 3500, marketPrice: 6000, savings: 42, currency: 'INR', category: 'Cardiology' },
  { serviceSlug: 'holter-monitoring', serviceName: 'Holter Monitoring (24-hour)', henoticPrice: 1500, marketPrice: 2800, savings: 46, currency: 'INR', category: 'Cardiology' },

  // ────────────────────────────────────
  // WOMEN'S IMAGING & BREAST (3)
  // ────────────────────────────────────
  { serviceSlug: 'mammography', serviceName: 'Digital Mammography', henoticPrice: 1200, marketPrice: 2500, savings: 52, currency: 'INR', category: 'Women\'s Imaging' },
  { serviceSlug: '3d-mammography', serviceName: '3D Mammography (Tomosynthesis)', henoticPrice: 2500, marketPrice: 4500, savings: 44, currency: 'INR', category: 'Women\'s Imaging' },
  { serviceSlug: 'follicular-study', serviceName: 'Follicular Study / Monitoring', henoticPrice: 600, marketPrice: 1200, savings: 50, currency: 'INR', category: 'Women\'s Imaging' },

  // ────────────────────────────────────
  // DOPPLER STUDIES (2)
  // ────────────────────────────────────
  { serviceSlug: 'color-doppler', serviceName: 'Color Doppler (Single Part)', henoticPrice: 1200, marketPrice: 2200, savings: 45, currency: 'INR', category: 'Doppler Studies' },
  { serviceSlug: 'carotid-doppler', serviceName: 'Carotid Artery Doppler', henoticPrice: 1500, marketPrice: 2800, savings: 46, currency: 'INR', category: 'Doppler Studies' },

  // ────────────────────────────────────
  // DEXA & BONE HEALTH (1)
  // ────────────────────────────────────
  { serviceSlug: 'dexa-bone-scan', serviceName: 'DEXA Bone Density Scan', henoticPrice: 1200, marketPrice: 2200, savings: 45, currency: 'INR', category: 'Bone Health' },

  // ────────────────────────────────────
  // FIBROSCAN & LIVER (1)
  // ────────────────────────────────────
  { serviceSlug: 'fibroscan', serviceName: 'Fibroscan (Liver Elastography)', henoticPrice: 2000, marketPrice: 3500, savings: 43, currency: 'INR', category: 'Liver Diagnostics' },

  // ────────────────────────────────────
  // GENETIC TESTING (2)
  // ────────────────────────────────────
  { serviceSlug: 'nipt-test', serviceName: 'NIPT (Non-Invasive Prenatal Test)', henoticPrice: 12000, marketPrice: 22000, savings: 45, currency: 'INR', category: 'Genetic Testing' },
  { serviceSlug: 'karyotype-test', serviceName: 'Karyotype Analysis', henoticPrice: 3500, marketPrice: 6000, savings: 42, currency: 'INR', category: 'Genetic Testing' },
];

// ────────────────────────────────────
// Utility Functions
// ────────────────────────────────────

/** Look up pricing for a specific service by slug */
export function getPricingForService(slug: string): ServicePricing | undefined {
  return SERVICE_PRICING.find(p => p.serviceSlug === slug);
}

/** Get all services in a pricing category */
export function getPricingByCategory(category: string): ServicePricing[] {
  return SERVICE_PRICING.filter(p => p.category === category);
}

/** Get all unique pricing categories */
export function getPricingCategories(): string[] {
  return [...new Set(SERVICE_PRICING.map(p => p.category))];
}

/** Format price in INR with ₹ symbol and commas */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/** Calculate absolute savings amount */
export function getSavingsAmount(pricing: ServicePricing): number {
  return pricing.marketPrice - pricing.henoticPrice;
}
