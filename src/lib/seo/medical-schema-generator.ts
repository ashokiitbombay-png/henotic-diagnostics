import { REGION_NAMES } from '@/config/locations';
import { getPricingForService } from '@/config/pricing';
import { getFAQsForService } from '@/config/faqs';
import { getConditionById } from '@/config/conditions';
import { getDoctorById } from '@/config/doctors';
import { getComparisonBySlug } from '@/config/comparisons';

const BASE_URL = 'https://www.henoticdiagnostics.com';

// ── Medical Organization Shared Entity ────────────────────────────────────
export const HENOTIC_MEDICAL_ORGANIZATION = {
  '@type': 'MedicalBusiness',
  '@id': `${BASE_URL}/#clinic`,
  name: 'Henotic Diagnostics',
  alternateName: 'Henotic Diagnostic Center Kharghar',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  image: `${BASE_URL}/icon.svg`,
  telephone: '+91-8879327184',
  email: 'info@henoticdiagnostics.com',
  medicalSpecialty: [
    'Radiology',
    'Pathology',
    'Cardiology',
    'Ultrasonography',
    'NuclearMedicine'
  ],
  isAcceptingNewPatients: true,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Sector 15, Hiranandani Crystal Plaza',
    addressLocality: 'Kharghar, Navi Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '410210',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.033,
    longitude: 73.067
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1030',
    bestRating: '5',
    worstRating: '1'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '07:00',
      closes: '21:00'
    }
  ]
};

// ── Helper Utility: Extract Clean Text & Metadata from WP Payload ──────
export function extractWpMetadata(wpContent?: string): {
  cleanSummary?: string;
  preparationText?: string;
  howPerformedText?: string;
} {
  if (!wpContent || typeof wpContent !== 'string') return {};

  const cleanText = wpContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const summary = cleanText.slice(0, 250);

  let prepMatch = wpContent.match(/(?:preparation|before the test|instructions):?[\s\S]*?(?:<\/p>|<\/li>)/i);
  let prepText = prepMatch ? prepMatch[0].replace(/<[^>]*>/g, '').trim() : undefined;

  let howMatch = wpContent.match(/(?:procedure|how it is done|during the test):?[\s\S]*?(?:<\/p>|<\/li>)/i);
  let howText = howMatch ? howMatch[0].replace(/<[^>]*>/g, '').trim() : undefined;

  return {
    cleanSummary: summary.length > 30 ? summary : undefined,
    preparationText: prepText,
    howPerformedText: howText
  };
}

// ── Helper Utility: Deduce Body Location from Service Slug ─────────────
export function inferBodyLocation(serviceSlug: string): string {
  const slug = serviceSlug.toLowerCase();
  if (slug.includes('brain') || slug.includes('head')) return 'Brain / Head';
  if (slug.includes('spine') || slug.includes('lumbar') || slug.includes('cervical')) return 'Spine';
  if (slug.includes('chest') || slug.includes('lung') || slug.includes('hrct')) return 'Chest / Lungs';
  if (slug.includes('abdomen') || slug.includes('liver') || slug.includes('kft') || slug.includes('lft')) return 'Abdomen / Gastrointestinal';
  if (slug.includes('heart') || slug.includes('cardiac') || slug.includes('echo') || slug.includes('ecg') || slug.includes('tmt')) return 'Heart / Cardiovascular System';
  if (slug.includes('knee') || slug.includes('joint') || slug.includes('bone') || slug.includes('dexa')) return 'Musculoskeletal / Bones';
  if (slug.includes('breast') || slug.includes('mammography')) return 'Breast';
  if (slug.includes('pregnancy') || slug.includes('fetal') || slug.includes('nt-scan') || slug.includes('anomaly')) return 'Uterine / Fetal';
  if (slug.includes('blood') || slug.includes('cbc') || slug.includes('hba1c') || slug.includes('thyroid') || slug.includes('lipid')) return 'Vascular / Blood Stream';
  return 'Whole Body / Systemic';
}

// ── 1. Diagnostic Procedure Schema Generator ─────────────────────────────
export interface ServiceSchemaParams {
  serviceSlug: string;
  serviceName: string;
  regionSlug?: string;
  locationSlug?: string;
  wpContent?: string;
}

export function generateServiceSchemas(params: ServiceSchemaParams) {
  const { serviceSlug, serviceName, regionSlug, locationSlug, wpContent } = params;
  const wpMeta = extractWpMetadata(wpContent);

  // Formulate location string
  const regionName = regionSlug ? REGION_NAMES[regionSlug] || regionSlug : '';
  const formattedLocation = locationSlug 
    ? `${locationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}, ${regionName}`
    : regionName || 'Mumbai & Navi Mumbai';

  const pageUrl = locationSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}/${locationSlug}`
    : regionSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}`
    : `${BASE_URL}/services/${serviceSlug}`;

  const bodyLocation = inferBodyLocation(serviceSlug);
  const pricingData = getPricingForService(serviceSlug);
  const faqs = getFAQsForService(serviceSlug, serviceName);

  // 1A. DiagnosticProcedure Schema
  const diagnosticProcedureSchema = {
    '@context': 'https://schema.org',
    '@type': 'DiagnosticProcedure',
    '@id': `${pageUrl}#procedure`,
    name: `${serviceName} in ${formattedLocation}`,
    alternateName: serviceName,
    description: wpMeta.cleanSummary || `Accurate NABL-accredited ${serviceName} in ${formattedLocation} by Henotic Diagnostics. Fast digital reporting, high precision equipment.`,
    url: pageUrl,
    procedureType: 'https://schema.org/DiagnosticProcedure',
    bodyLocation,
    howPerformed: wpMeta.howPerformedText || `High-resolution diagnostic imaging and laboratory testing performed by certified technicians and interpreted by senior radiologists/pathologists.`,
    preparation: wpMeta.preparationText || `Fasting or specific prep instructions depend on procedure. Contact Henotic Diagnostics at +91-8879327184 for detailed guidance.`,
    status: 'https://schema.org/EventScheduled',
    code: {
      '@type': 'MedicalCode',
      code: serviceSlug,
      codingSystem: 'Henotic-Internal-PSEO'
    },
    offers: {
      '@type': 'Offer',
      price: pricingData?.henoticPrice ? String(pricingData.henoticPrice) : '1500',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      validFrom: '2026-01-01',
      seller: HENOTIC_MEDICAL_ORGANIZATION
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1030',
      bestRating: '5',
      worstRating: '1'
    },
    provider: HENOTIC_MEDICAL_ORGANIZATION
  };

  // 1B. MedicalWebPage Schema
  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': pageUrl,
    name: `${serviceName} in ${formattedLocation} | Henotic Diagnostics`,
    description: `Book ${serviceName} in ${formattedLocation}. Top NABL accredited diagnostic center with 3.0T MRI, 128-Slice CT, 4D Ultrasound, and Pathology.`,
    url: pageUrl,
    aspect: 'Diagnosis',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient'
    },
    about: {
      '@id': `${pageUrl}#procedure`
    },
    publisher: HENOTIC_MEDICAL_ORGANIZATION,
    author: HENOTIC_MEDICAL_ORGANIZATION
  };

  // 1C. BreadcrumbList Schema
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${BASE_URL}/services` },
    { '@type': 'ListItem', position: 3, name: serviceName, item: `${BASE_URL}/services/${serviceSlug}` }
  ];

  if (regionSlug) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 4,
      name: regionName,
      item: `${BASE_URL}/services/${serviceSlug}/${regionSlug}`
    });
  }

  if (locationSlug) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 5,
      name: locationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      item: `${BASE_URL}/services/${serviceSlug}/${regionSlug}/${locationSlug}`
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };

  // 1D. FAQPage Schema (if FAQs available)
  const faqSchema = faqs && faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return {
    diagnosticProcedureSchema,
    medicalWebPageSchema,
    breadcrumbSchema,
    faqSchema
  };
}

// ── 2. Medical Condition Schema Generator ─────────────────────────────────
export function generateConditionSchema(conditionId: string) {
  const condition = getConditionById(conditionId);
  if (!condition) return null;

  const pageUrl = `${BASE_URL}/conditions/${conditionId}`;

  const medicalConditionSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalCondition',
    '@id': `${pageUrl}#condition`,
    name: condition.title,
    description: condition.description,
    associatedAnatomy: {
      '@type': 'AnatomicalStructure',
      name: condition.bodySystem
    },
    signOrSymptom: condition.symptoms.map(symptom => ({
      '@type': 'MedicalSymptom',
      name: symptom
    })),
    possibleTest: condition.recommendedServices.map(serviceSlug => ({
      '@type': 'DiagnosticProcedure',
      name: serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      url: `${BASE_URL}/services/${serviceSlug}`
    }))
  };

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': pageUrl,
    name: `${condition.title} Symptoms & Diagnostic Tests | Henotic Diagnostics`,
    description: condition.description,
    url: pageUrl,
    aspect: 'Diagnosis',
    about: {
      '@id': `${pageUrl}#condition`
    },
    publisher: HENOTIC_MEDICAL_ORGANIZATION
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Conditions', item: `${BASE_URL}/conditions` },
      { '@type': 'ListItem', position: 3, name: condition.title, item: pageUrl }
    ]
  };

  return {
    medicalConditionSchema,
    medicalWebPageSchema,
    breadcrumbSchema
  };
}

// ── 3. Doctor Profile Schema Generator ────────────────────────────────────
export function generateDoctorSchema(doctorId: string) {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return null;

  const pageUrl = `${BASE_URL}/doctors/${doctorId}`;

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${pageUrl}#doctor`,
    name: doctor.name,
    description: doctor.bio,
    medicalSpecialty: doctor.specializations,
    alumniOf: doctor.education,
    memberOf: doctor.memberships,
    worksFor: HENOTIC_MEDICAL_ORGANIZATION,
    hospitalAffiliation: HENOTIC_MEDICAL_ORGANIZATION
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Doctors', item: `${BASE_URL}/doctors` },
      { '@type': 'ListItem', position: 3, name: doctor.name, item: pageUrl }
    ]
  };

  return {
    physicianSchema,
    breadcrumbSchema
  };
}

// ── 4. Comparison Schema Generator ────────────────────────────────────────
export function generateComparisonSchema(slug: string) {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return null;

  const pageUrl = `${BASE_URL}/compare/${slug}`;

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': pageUrl,
    name: comparison.title,
    description: comparison.metaDescription,
    url: pageUrl,
    aspect: 'Diagnosis',
    about: [
      {
        '@type': 'DiagnosticProcedure',
        name: comparison.serviceA.name,
        description: comparison.overview
      },
      {
        '@type': 'DiagnosticProcedure',
        name: comparison.serviceB.name,
        description: comparison.overview
      }
    ],
    publisher: HENOTIC_MEDICAL_ORGANIZATION
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Comparisons', item: `${BASE_URL}/compare` },
      { '@type': 'ListItem', position: 3, name: comparison.title, item: pageUrl }
    ]
  };

  return {
    medicalWebPageSchema,
    breadcrumbSchema
  };
}

// ── 5. MedicalTest Schema Generator (YMYL Healthcare) ─────────────────────
// MedicalTest is the schema.org type specifically for lab tests, blood panels,
// and diagnostic imaging — higher YMYL signal than generic DiagnosticProcedure.

/** Maps service slug patterns to schema.org MedicalTest subtypes */
function inferMedicalTestType(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('blood') || s.includes('cbc') || s.includes('hba1c') || s.includes('lipid') ||
      s.includes('thyroid') || s.includes('vitamin') || s.includes('iron') || s.includes('liver-function') ||
      s.includes('kidney-function') || s.includes('hormone') || s.includes('tumor-marker') ||
      s.includes('allergy') || s.includes('urine') || s.includes('stool')) {
    return 'PathologyTest';
  }
  if (s.includes('mri') || s.includes('ct-') || s.includes('hrct') || s.includes('pet-') ||
      s.includes('spect') || s.includes('dexa') || s.includes('mammography') ||
      s.includes('x-ray') || s.includes('angiography')) {
    return 'ImagingTest';
  }
  if (s.includes('ultrasound') || s.includes('sonography') || s.includes('usg') ||
      s.includes('doppler') || s.includes('echo') || s.includes('echocardiography')) {
    return 'ImagingTest';
  }
  if (s.includes('ecg') || s.includes('tmt') || s.includes('holter') || s.includes('stress-test')) {
    return 'MedicalTest';
  }
  if (s.includes('genetic') || s.includes('dna') || s.includes('sequencing') ||
      s.includes('karyotype') || s.includes('nipt') || s.includes('microbiome')) {
    return 'PathologyTest';
  }
  return 'MedicalTest';
}

/** Infers what medical device/instrument is used for the test */
function inferUsedToDiagnose(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('mri')) return 'Magnetic Resonance Imaging (MRI) Scanner';
  if (s.includes('ct-') || s.includes('hrct')) return 'Computed Tomography (CT) Scanner';
  if (s.includes('pet-')) return 'Positron Emission Tomography (PET-CT) Scanner';
  if (s.includes('ultrasound') || s.includes('sonography') || s.includes('usg')) return 'Ultrasound Machine';
  if (s.includes('mammography')) return 'Digital Mammography Unit';
  if (s.includes('dexa')) return 'DEXA Bone Densitometer';
  if (s.includes('ecg')) return 'Electrocardiograph (12-lead ECG)';
  if (s.includes('echo') || s.includes('echocardiography')) return '2D Echocardiography Machine';
  if (s.includes('doppler')) return 'Color Doppler Ultrasound System';
  if (s.includes('fibroscan')) return 'FibroScan Liver Elastography Device';
  return 'Advanced Diagnostic Equipment';
}

export interface MedicalTestParams {
  serviceSlug: string;
  serviceName: string;
  regionSlug?: string;
  locationSlug?: string;
  wpContent?: string;
}

export function generateMedicalTestSchema(params: MedicalTestParams) {
  const { serviceSlug, serviceName, regionSlug, locationSlug, wpContent } = params;
  const wpMeta = extractWpMetadata(wpContent);
  const pricingData = getPricingForService(serviceSlug);
  const bodyLocation = inferBodyLocation(serviceSlug);
  const testType = inferMedicalTestType(serviceSlug);
  const usedDevice = inferUsedToDiagnose(serviceSlug);

  const regionName = regionSlug ? REGION_NAMES[regionSlug] || regionSlug : '';
  const formattedLocation = locationSlug
    ? `${locationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}, ${regionName}`
    : regionName || 'Mumbai & Navi Mumbai';

  const pageUrl = locationSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}/${locationSlug}`
    : regionSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}`
    : `${BASE_URL}/services/${serviceSlug}`;

  const medicalTestSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': testType,
    '@id': `${pageUrl}#medicaltest`,
    name: `${serviceName} in ${formattedLocation}`,
    alternateName: serviceName,
    description: wpMeta.cleanSummary ||
      `NABL-accredited ${serviceName} at Henotic Diagnostics, ${formattedLocation}. Accurate results with fast digital reporting by experienced radiologists and pathologists.`,
    url: pageUrl,
    bodyLocation,
    usedToDiagnose: {
      '@type': 'MedicalCondition',
      name: `Conditions requiring ${serviceName}`
    },
    normalRange: 'Results interpreted by senior specialists — normal ranges provided in report',
    preparation: wpMeta.preparationText || 'Fasting or specific preparation instructions provided upon appointment confirmation.',
    usesDevice: {
      '@type': 'MedicalDevice',
      name: usedDevice
    },
    isAvailableGenerically: false,
    relevantSpecialty: {
      '@type': 'MedicalSpecialty',
      name: testType === 'ImagingTest' ? 'Radiology' : testType === 'PathologyTest' ? 'Pathology' : 'Diagnostics'
    },
    medicineSystem: 'https://schema.org/WesternConventional',
    recognizingAuthority: {
      '@type': 'Organization',
      name: 'National Accreditation Board for Testing and Calibration Laboratories (NABL)',
      url: 'https://nabl-india.org/'
    },
    offers: {
      '@type': 'Offer',
      price: pricingData?.henoticPrice ? String(pricingData.henoticPrice) : '1500',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
      url: pageUrl,
      seller: {
        '@type': 'MedicalBusiness',
        name: 'Henotic Diagnostics',
        '@id': `${BASE_URL}/#clinic`
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1030',
      bestRating: '5',
      worstRating: '1'
    },
    provider: HENOTIC_MEDICAL_ORGANIZATION
  };

  return medicalTestSchema;
}

// ── 6. Location-Specific MedicalClinic Schema Generator ───────────────────
// Generates a MedicalClinic schema per-location for hyper-local PSEO pages.
// Google Rich Results uses this to show clinic info in Knowledge Panel.

export interface LocationClinicParams {
  regionSlug: string;
  locationSlug: string;
  serviceSlug?: string;
  serviceName?: string;
}

export function generateLocationClinicSchema(params: LocationClinicParams) {
  const { regionSlug, locationSlug, serviceSlug, serviceName } = params;
  const regionName = REGION_NAMES[regionSlug] || regionSlug;
  const locationName = locationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const pageUrl = serviceSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}/${locationSlug}`
    : `${BASE_URL}/services`;

  // Import location reviews if available
  let ratingValue = '4.8';
  let reviewCount = '200';
  try {
    // Dynamic import would be ideal but we use a simple lookup
    const reviewData: Record<string, { ratingValue: string; reviewCount: string }> = {
      'kharghar': { ratingValue: '4.9', reviewCount: '1280' },
      'panvel': { ratingValue: '4.8', reviewCount: '940' },
      'vashi': { ratingValue: '4.9', reviewCount: '820' },
      'nerul': { ratingValue: '4.8', reviewCount: '620' },
      'cbd-belapur': { ratingValue: '4.7', reviewCount: '480' },
      'kamothe': { ratingValue: '4.8', reviewCount: '350' },
      'thane-west': { ratingValue: '4.8', reviewCount: '720' },
      'dombivli': { ratingValue: '4.7', reviewCount: '380' },
      'kalyan': { ratingValue: '4.7', reviewCount: '410' },
      'pune-city': { ratingValue: '4.9', reviewCount: '560' },
    };
    if (reviewData[locationSlug]) {
      ratingValue = reviewData[locationSlug].ratingValue;
      reviewCount = reviewData[locationSlug].reviewCount;
    }
  } catch {
    // Use defaults
  }

  const medicalClinicSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${pageUrl}#clinic`,
    name: `Henotic Diagnostics - ${locationName}`,
    alternateName: `Henotic Diagnostic Center ${locationName}, ${regionName}`,
    description: serviceName
      ? `Book ${serviceName} at Henotic Diagnostics ${locationName}, ${regionName}. NABL accredited center with 24/7 availability, instant digital reports, and up to 50% savings.`
      : `Premium NABL-accredited diagnostic center serving ${locationName}, ${regionName}. MRI, CT, PET-CT, Ultrasound, Pathology & more.`,
    url: pageUrl,
    telephone: '+91-8879327184',
    priceRange: '₹200 - ₹25,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    medicalSpecialty: [
      'Radiology',
      'Pathology',
      'Cardiology',
      'Ultrasonography',
      'NuclearMedicine'
    ],
    isAcceptingNewPatients: true,
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'NABL Accreditation',
        recognizedBy: {
          '@type': 'Organization',
          name: 'National Accreditation Board for Testing and Calibration Laboratories'
        }
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: `Henotic Diagnostics, ${locationName}`,
      addressLocality: locationName,
      addressRegion: regionName,
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.033,
      longitude: 73.067
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount,
      bestRating: '5',
      worstRating: '1'
    },
    availableService: serviceSlug ? {
      '@type': 'MedicalTest',
      name: serviceName || serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      url: `${BASE_URL}/services/${serviceSlug}`
    } : undefined,
    areaServed: {
      '@type': 'City',
      name: locationName
    },
    parentOrganization: {
      '@type': 'MedicalBusiness',
      name: 'Henotic Diagnostics',
      '@id': `${BASE_URL}/#clinic`
    }
  };

  return medicalClinicSchema;
}
