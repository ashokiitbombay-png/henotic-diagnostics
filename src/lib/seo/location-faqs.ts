import { getCategoryForService } from '@/config/categories';

export interface LocationFAQItem {
  question: string;
  answer: string;
}

const HOME_COLLECTION_CATEGORY_IDS = new Set([
  'pathology',
  'health-checkups',
  'genetics',
  'genomic-sequencing',
  'microbiome',
]);

const HOME_COLLECTION_SLUG_RE =
  /blood|cbc|lipid|thyroid|liver-function|kidney-function|hba1c|vitamin|iron|hormone|allergy|urine|stool|nipt|nips|checkup|check-up|panel|profile|dna|sugar|glucose|creatinine|crp|esr|ferritin/i;

/**
 * Determines whether a diagnostic service supports doorstep home sample collection
 * across pathology, preventive checkups, genetics/NIPT, genomics, and microbiome tests.
 */
export function isHomeCollectionService(serviceSlug: string): boolean {
  if (!serviceSlug) return false;
  const cat = getCategoryForService(serviceSlug);
  if (cat && HOME_COLLECTION_CATEGORY_IDS.has(cat.id)) {
    return true;
  }
  return HOME_COLLECTION_SLUG_RE.test(serviceSlug);
}

function formatPriceINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export interface BuildLocationFAQsParams {
  serviceName: string;
  serviceSlug: string;
  locationName: string;
  regionName: string;
  price?: number;
}

/**
 * Shared generator used by both <LocationFAQ /> (visible UI) and MedicalPseoSchema (FAQPage JSON-LD)
 * so structured data stays 100% aligned with visible on-page answers.
 */
export function buildLocationFAQs({
  serviceName,
  serviceSlug,
  locationName,
  regionName,
  price,
}: BuildLocationFAQsParams): LocationFAQItem[] {
  const supportsHomeCollection = isHomeCollectionService(serviceSlug);
  const priceDisplay = price ? formatPriceINR(price) : 'competitive rates';

  const faqs: LocationFAQItem[] = [
    {
      question: `Is ${serviceName} available in ${locationName}?`,
      answer: `Yes, Henotic Diagnostics offers ${serviceName} services near ${locationName}, ${regionName}. Our NABL-accredited centre provides accurate diagnostics with state-of-the-art equipment and experienced specialists. Book your appointment today for priority service.`,
    },
    {
      question: `What is the cost of ${serviceName} in ${locationName}?`,
      answer: `The cost of ${serviceName} at Henotic Diagnostics starts from ${priceDisplay}. We offer up to 50% savings compared to market rates in ${locationName}, with no compromise on quality. Contact us at +91 8879327184 for the latest pricing.`,
    },
    {
      question: `How to book ${serviceName} in ${locationName}?`,
      answer: `You can book ${serviceName} near ${locationName} by calling +91 8879327184 or booking online through our website. We offer instant confirmation, zero waiting time with prior booking, and WhatsApp report delivery for your convenience.`,
    },
    {
      question: `Are reports available same day for ${serviceName} in ${locationName}?`,
      answer: `Yes, most ${serviceName} reports at Henotic Diagnostics are available within 24 hours, with many delivered same day. Reports are shared digitally via WhatsApp and email, so patients in ${locationName} can access results quickly without revisiting the centre.`,
    },
  ];

  if (supportsHomeCollection) {
    faqs.push({
      question: `Is home sample collection available in ${locationName}?`,
      answer: `Yes, Henotic Diagnostics provides home sample collection services in and around ${locationName}, ${regionName}. Our trained phlebotomists visit your doorstep at your preferred time. Call +91 8879327184 to schedule a home collection for ${serviceName}.`,
    });
  }

  return faqs;
}
