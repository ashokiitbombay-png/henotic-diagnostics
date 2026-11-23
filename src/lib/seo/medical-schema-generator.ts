import { REGION_NAMES, getLocationBySlug, REAL_LOCATION_REVIEWS } from '@/config/locations';
import { getPricingForService } from '@/config/pricing';
import { getFAQsForService } from '@/config/faqs';
import { getConditionById } from '@/config/conditions';
import { DOCTORS, getDoctorById, getDoctorsForService } from '@/config/doctors';
import { getComparisonBySlug } from '@/config/comparisons';
import { getHeroImageForService } from '@/config/services';
import { buildLocationFAQs } from '@/lib/seo/location-faqs';
import { buildConditionFAQs } from '@/lib/seo/aeo-helpers';

const BASE_URL = 'https://www.henoticdiagnostics.com';
export const SCHEMA_LAST_REVIEWED = '2026-11-22';

const CLINIC_REF = { '@id': `${BASE_URL}/#clinic` };
const ORG_REF = { '@id': `${BASE_URL}/#organization` };

function buildReviewedBy(serviceSlug?: string) {
  const doc = (serviceSlug ? getDoctorsForService(serviceSlug)[0] : undefined) || DOCTORS[0];
  return {
    '@type': 'Physician',
    '@id': `${BASE_URL}/doctors/${doc.id}#doctor`,
    name: doc.name,
    jobTitle: doc.designation,
    description: doc.credentials,
    url: `${BASE_URL}/doctors/${doc.id}`,
    worksFor: ORG_REF,
  };
}

// ── Medical Organization Shared Entity ────────────────────────────────────
// Aligned 1:1 with root MedicalClinicSchema (#clinic, DiagnosticLab, 24/7)
export const HENOTIC_MEDICAL_ORGANIZATION = {
  '@type': 'DiagnosticLab',
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
    streetAddress: 'Second floor, Millennium Empire, Business Park, Plot No 47, D Mart Rd',
    addressLocality: 'Sector 15, Kharghar, Navi Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '410210',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.0445195,
    longitude: 73.0787376
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
      opens: '00:00',
      closes: '23:59'
    }
  ]
};

// ── Helper Utility: Extract Clean Text & Metadata from WP Payload ──────
export function extractWpMetadata(wpContent?: string): {
  cleanSummary?: string;
  howPerformedText?: string;
} {
  if (!wpContent || typeof wpContent !== 'string') return {};

  const sanitizedHtml = wpContent
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, ' ')
    .replace(/<meta\b[^>]*\/?>/gi, ' ');

  const decodeEntities = (input: string) =>
    input
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&#8217;|&rsquo;|&#39;/gi, "'")
      .replace(/&lsquo;/gi, "'")
      .replace(/&quot;/gi, '"')
      .replace(/&ndash;|&mdash;/gi, '-');

  const cleanText = decodeEntities(sanitizedHtml.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
  const summary = cleanText.slice(0, 250).trim();

  const howMatch = sanitizedHtml.match(/(?:procedure|how it is done|during the test):?[\s\S]*?(?:<\/p>|<\/li>)/i);
  const howText = howMatch
    ? decodeEntities(howMatch[0].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
    : undefined;

  return {
    cleanSummary: summary.length > 30 ? summary : undefined,
    howPerformedText: howText && howText.length > 10 ? howText : undefined,
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
  const locationNameOnly = locationSlug
    ? locationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : '';
  const formattedLocation = locationNameOnly
    ? `${locationNameOnly}, ${regionName}`
    : regionName || 'Mumbai & Navi Mumbai';

  const pageUrl = locationSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}/${locationSlug}`
    : regionSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}`
    : `${BASE_URL}/services/${serviceSlug}`;

  const bodyLocation = inferBodyLocation(serviceSlug);
  const pricingData = getPricingForService(serviceSlug);
  const serviceFaqs = getFAQsForService(serviceSlug, serviceName, locationNameOnly || undefined);
  const combinedFaqs = locationSlug
    ? [
        ...serviceFaqs,
        ...buildLocationFAQs({
          serviceName,
          serviceSlug,
          locationName: locationNameOnly,
          regionName: regionName || 'Navi Mumbai',
          price: pricingData?.henoticPrice,
        }),
      ]
    : serviceFaqs;

  const seenFaqQuestions = new Set<string>();
  const faqs = combinedFaqs.filter((item) => {
    const key = item.question.trim().toLowerCase();
    if (seenFaqQuestions.has(key)) return false;
    seenFaqQuestions.add(key);
    return true;
  });

  // 1A. DiagnosticProcedure Schema
  const diagnosticProcedureSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'DiagnosticProcedure',
    '@id': `${pageUrl}#procedure`,
    name: `${serviceName} in ${formattedLocation}`,
    alternateName: serviceName,
    description: wpMeta.cleanSummary || `Accurate NABL-accredited ${serviceName} in ${formattedLocation} by Henotic Diagnostics. Fast digital reporting, high precision equipment.`,
    url: pageUrl,
    image: getHeroImageForService(serviceSlug),
    bodyLocation,
    howPerformed: wpMeta.howPerformedText || `High-resolution diagnostic imaging and laboratory testing performed by certified technicians and interpreted by senior radiologists/pathologists.`,
    ...(pricingData?.henoticPrice ? {
      offers: {
        '@type': 'Offer',
        price: String(pricingData.henoticPrice),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: pageUrl,
        validFrom: '2026-01-01',
        seller: CLINIC_REF
      }
    } : {}),
    provider: CLINIC_REF
  };

  // 1B. MedicalWebPage Schema — with primaryImageOfPage & E-E-A-T reviewer metadata
  const heroImageUrl = getHeroImageForService(serviceSlug);
  const reviewedBy = buildReviewedBy(serviceSlug);
  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': pageUrl,
    name: `${serviceName} in ${formattedLocation} | Henotic Diagnostics`,
    description: `Book ${serviceName} in ${formattedLocation}. Top NABL accredited diagnostic center with 3.0T MRI, 128-Slice CT, 4D Ultrasound, and Pathology.`,
    url: pageUrl,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: heroImageUrl,
      contentUrl: heroImageUrl,
      caption: `${serviceName} at Henotic Diagnostics, ${formattedLocation}`,
      width: 1200,
      height: 630
    },
    image: [heroImageUrl],
    dateModified: SCHEMA_LAST_REVIEWED,
    lastReviewed: SCHEMA_LAST_REVIEWED,
    reviewedBy,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#quick-answer'],
    },
    aspect: 'Diagnosis',
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patient'
    },
    about: {
      '@id': `${pageUrl}#procedure`
    },
    publisher: ORG_REF,
    author: ORG_REF
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

  const condHeroImage = condition.recommendedServices?.[0]
    ? getHeroImageForService(condition.recommendedServices[0])
    : 'https://cdn.henoticdiagnostics.com/Hero%20Image/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp';

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': pageUrl,
    name: `${condition.title} Symptoms & Diagnostic Tests | Henotic Diagnostics`,
    description: condition.description,
    url: pageUrl,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: condHeroImage,
      contentUrl: condHeroImage,
      caption: `${condition.title} Symptoms & Diagnostic Tests`,
      width: 1200,
      height: 630
    },
    image: [condHeroImage],
    dateModified: SCHEMA_LAST_REVIEWED,
    lastReviewed: SCHEMA_LAST_REVIEWED,
    reviewedBy: buildReviewedBy(condition.recommendedServices?.[0]),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#quick-answer'],
    },
    aspect: 'Diagnosis',
    about: {
      '@id': `${pageUrl}#condition`
    },
    publisher: ORG_REF
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

  const conditionFaqs = buildConditionFAQs(condition);
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: conditionFaqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return {
    medicalConditionSchema,
    medicalWebPageSchema,
    breadcrumbSchema,
    faqSchema,
  };
}

// ── 3. Doctor Profile Schema Generator ────────────────────────────────────
export function generateDoctorSchema(doctorId: string) {
  const doctor = getDoctorById(doctorId);
  if (!doctor) return null;

  const pageUrl = `${BASE_URL}/doctors/${doctorId}`;
  const docHeroImage = doctor.imageUrl || 'https://cdn.henoticdiagnostics.com/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp';

  const physicianSchema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    '@id': `${pageUrl}#doctor`,
    name: doctor.name,
    image: docHeroImage,
    description: doctor.bio,
    medicalSpecialty: doctor.specializations,
    alumniOf: doctor.education,
    memberOf: doctor.memberships,
    worksFor: ORG_REF,
    hospitalAffiliation: CLINIC_REF
  };

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': pageUrl,
    name: `${doctor.name} - ${doctor.designation} | Henotic Diagnostics`,
    description: doctor.bio,
    url: pageUrl,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: docHeroImage,
      contentUrl: docHeroImage,
      caption: `${doctor.name} - ${doctor.designation}`,
      width: 1200,
      height: 630
    },
    image: [docHeroImage],
    dateModified: SCHEMA_LAST_REVIEWED,
    lastReviewed: SCHEMA_LAST_REVIEWED,
    about: { '@id': `${pageUrl}#doctor` },
    publisher: ORG_REF
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
    medicalWebPageSchema,
    breadcrumbSchema
  };
}

// ── 4. Comparison Schema Generator ────────────────────────────────────────
export function generateComparisonSchema(slug: string) {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return null;

  const pageUrl = `${BASE_URL}/compare/${slug}`;
  const compHeroImage = getHeroImageForService(comparison.serviceA.slug);

  const medicalWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': pageUrl,
    name: comparison.title,
    description: comparison.metaDescription,
    url: pageUrl,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: compHeroImage,
      contentUrl: compHeroImage,
      caption: comparison.title,
      width: 1200,
      height: 630
    },
    image: [compHeroImage],
    dateModified: SCHEMA_LAST_REVIEWED,
    lastReviewed: SCHEMA_LAST_REVIEWED,
    reviewedBy: buildReviewedBy(comparison.serviceA.slug),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#quick-answer'],
    },
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
    publisher: ORG_REF
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

  let faqSchema = null;
  if (comparison.faqs && comparison.faqs.length > 0) {
    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: comparison.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  return {
    medicalWebPageSchema,
    breadcrumbSchema,
    faqSchema
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
      s.includes('karyotype') || s.includes('nipt') || s.includes('nips') ||
      s.includes('nip-t') || s.includes('npt-test') || s.includes('non-invasive-prenatal') ||
      s.includes('down-syndrome') || s.includes('microbiome')) {
    return 'PathologyTest';
  }
  return 'MedicalTest';
}

/** Infers what medical device/instrument is used for the test */
function inferUsedToDiagnose(slug: string): string {
  const s = slug.toLowerCase();
  if (s.includes('nipt') || s.includes('nips') || s.includes('nip-t') || s.includes('npt-test') || s.includes('non-invasive-prenatal') || s.includes('down-syndrome') || s.includes('genetic') || s.includes('sequencing')) {
    return 'Next-Generation Sequencing (NGS) & SNP-Based Cell-Free DNA Platform';
  }
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
    image: getHeroImageForService(serviceSlug),
    bodyLocation,
    usedToDiagnose: {
      '@type': 'MedicalCondition',
      name: `Conditions requiring ${serviceName}`
    },
    normalRange: 'Results interpreted by senior specialists — normal ranges provided in report',
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
    ...(pricingData?.henoticPrice ? {
      offers: {
        '@type': 'Offer',
        price: String(pricingData.henoticPrice),
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2027-12-31',
        url: pageUrl,
        seller: CLINIC_REF
      }
    } : {}),
    provider: CLINIC_REF
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
  const loc = getLocationBySlug(locationSlug, regionSlug);
  const locationName = loc ? loc.name : locationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const pageUrl = serviceSlug
    ? `${BASE_URL}/services/${serviceSlug}/${regionSlug}/${locationSlug}`
    : `${BASE_URL}/services`;

  // Only emit real, verified reviews from configuration; never generate synthetic ratings
  const realReview = REAL_LOCATION_REVIEWS[locationSlug];

  // Google-compliant MedicalClinic/DiagnosticLab anchored to real Sector 15 Kharghar hub
  // with GeoCircle areaServed centered on the target neighborhood (never implying fake branch addresses).
  const areaServed: Record<string, unknown>[] = [];
  if (loc) {
    areaServed.push({
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
      geoRadius: '5000',
    });
  }
  areaServed.push({
    '@type': 'AdministrativeArea',
    name: loc ? `${loc.name} (${loc.pincode})` : locationName,
    ...(loc?.pincode ? { postalCode: loc.pincode } : {}),
  });

  const medicalClinicSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${BASE_URL}/#clinic`,
    name: 'Henotic Diagnostics',
    alternateName: `Henotic Diagnostics serving ${locationName}, ${regionName}`,
    description: serviceName
      ? `Book ${serviceName} at Henotic Diagnostics (Sector 15, Kharghar) serving ${locationName}, ${regionName}. NABL-accredited center with 24/7 availability and same-day digital reports.`
      : `NABL-accredited diagnostic center in Sector 15, Kharghar serving ${locationName}, ${regionName}.`,
    url: pageUrl,
    image: serviceSlug ? getHeroImageForService(serviceSlug) : `${BASE_URL}/icon.svg`,
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
    address: HENOTIC_MEDICAL_ORGANIZATION.address,
    geo: HENOTIC_MEDICAL_ORGANIZATION.geo,
    areaServed,
    openingHoursSpecification: HENOTIC_MEDICAL_ORGANIZATION.openingHoursSpecification,
    ...(realReview ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: realReview.ratingValue,
        reviewCount: realReview.reviewCount,
        bestRating: '5',
        worstRating: '1'
      }
    } : {}),
    availableService: serviceSlug ? {
      '@type': 'MedicalTest',
      name: serviceName || serviceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      url: `${BASE_URL}/services/${serviceSlug}`
    } : undefined,
    parentOrganization: ORG_REF
  };

  return medicalClinicSchema;
}
