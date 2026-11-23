import { isHomeCollectionService } from '@/lib/seo/location-faqs';

export interface AeoFAQItem {
  question: string;
  answer: string;
}

/**
 * Normalizes whitespace and trims text cleanly on a word boundary so metadata
 * titles (<=60 chars) and descriptions (<=155 chars) avoid mid-word SERP truncation.
 */
export function truncateMeta(text: string, maxLen: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean || clean.length <= maxLen) return clean;
  if (maxLen <= 3) return clean.slice(0, maxLen);

  const budget = maxLen - 3;
  const sliced = clean.slice(0, budget + 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const cutoff = lastSpace >= Math.floor(budget * 0.6) ? sliced.slice(0, lastSpace) : clean.slice(0, budget);
  return `${cutoff.replace(/[\s,;:\-|]+$/, '')}...`;
}

function formatSlugTitle(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export interface ConditionAeoInput {
  title: string;
  bodySystem: string;
  symptoms: string[];
  recommendedServices: string[];
  urgencyLevel: string;
}

export function buildConditionFAQs(cond: ConditionAeoInput): AeoFAQItem[] {
  const testsList = cond.recommendedServices.slice(0, 4).map(formatSlugTitle).join(', ');
  const topSymptoms = cond.symptoms.slice(0, 3).join(', ');
  const urgencyNote =
    cond.urgencyLevel === 'urgent'
      ? 'Prompt medical evaluation and same-day diagnostic imaging or blood work are recommended when acute or red-flag symptoms are present.'
      : cond.urgencyLevel === 'moderate'
        ? 'Timely evaluation is advised if symptoms persist beyond a few days, progressively worsen, or interfere with daily routine.'
        : 'Routine diagnostic screening helps confirm the underlying cause early and guides preventive management.';

  return [
    {
      question: `Which diagnostic tests are recommended for ${cond.title}?`,
      answer: `For ${cond.title} (${cond.bodySystem}), clinicians commonly evaluate patients using ${testsList || 'targeted imaging and pathology panels'}. Our MD Radiologists and Pathologists at Henotic Diagnostics match test selection to your clinical symptoms and doctor's prescription.`,
    },
    {
      question: `When should I get tested for ${cond.title} symptoms?`,
      answer: `You should consider diagnostic evaluation if you experience ${topSymptoms || 'persistent symptoms'}. ${urgencyNote}`,
    },
    {
      question: `How quickly are ${cond.title} test reports ready?`,
      answer: `Routine pathology blood panels are typically delivered digitally within 4–6 hours, while 3.0T MRI, 128-slice CT, and ultrasound reports signed by MD specialists are shared via WhatsApp and online portals within 24 hours.`,
    },
    {
      question: `Can I book home sample collection or same-day imaging for ${cond.title}?`,
      answer: `Yes. Henotic Diagnostics operates 24/7 in Kharghar, Navi Mumbai and provides doorstep blood sample collection across Navi Mumbai, Mumbai, Thane, Pune, and Raigad alongside priority same-day imaging slots.`,
    },
  ];
}

export interface CityAeoInput {
  name: string;
  slug: string;
  highlights?: string[];
}

export function buildCityFAQs(
  city: CityAeoInput,
  totalServices: number,
  totalLocations: number
): AeoFAQItem[] {
  return [
    {
      question: `What diagnostic tests are available in ${city.name} at Henotic Diagnostics?`,
      answer: `Patients in ${city.name} have access to ${totalServices}+ NABL-accredited investigations, including 3.0 Tesla MRI, 128-Slice CT scans, Digital PET-CT, 4D Ultrasound, 2D Echo, ECG, NIPT prenatal testing, and full-body preventive blood checkups.`,
    },
    {
      question: `Does Henotic Diagnostics offer home blood sample collection in ${city.name}?`,
      answer: `Yes, we cover ${totalLocations} neighborhoods across ${city.name} with trained phlebotomists providing 24/7 doorstep sample collection for blood tests, health packages, and prenatal cfDNA panels.`,
    },
    {
      question: `How much do diagnostic scans and blood tests cost in ${city.name}?`,
      answer: `Blood tests in ${city.name} start from ₹250 (CBC), preventive full-body packages from ₹1,650, Ultrasound from ₹1,800, 3.0T MRI and CT scans from ₹4,500, and PET-CT from ₹14,500 — offering 30–50% direct savings compared to hospital rates.`,
    },
    {
      question: `How fast are reports delivered for patients in ${city.name}?`,
      answer: `With 99.4% on-time delivery, routine pathology reports arrive within 4–6 hours and specialist-signed radiology scan reports are delivered via WhatsApp and email within 24 hours.`,
    },
  ];
}

export interface CategoryAeoInput {
  id: string;
  title: string;
  services: string[];
}

export function buildCategoryFAQs(cat: CategoryAeoInput): AeoFAQItem[] {
  const sampleTests = cat.services.slice(0, 4).map(formatSlugTitle).join(', ');
  const supportsHomePickup = cat.services.some((slug) => isHomeCollectionService(slug));

  return [
    {
      question: `Which tests are covered under ${cat.title} at Henotic Diagnostics?`,
      answer: `Our ${cat.title} department covers ${cat.services.length} specialized diagnostic investigations, including ${sampleTests}, performed on NABL-accredited systems with MD Radiologist and Pathologist sign-off.`,
    },
    {
      question: `How long does it take to receive ${cat.title} reports?`,
      answer: `Most ${cat.title} investigations provide same-day digital report delivery via WhatsApp and email. Urgent clinical cases are prioritized, with specialist-verified findings ready within hours.`,
    },
    {
      question: supportsHomePickup
        ? `Is home sample collection available for ${cat.title} tests?`
        : `Are Henotic Diagnostics ${cat.title} facilities NABL & AERB certified?`,
      answer: supportsHomePickup
        ? `Yes, eligible pathology, health checkup, and blood-based tests in ${cat.title} include 24/7 doorstep phlebotomy collection across Navi Mumbai, Mumbai, Thane, Pune, and Raigad at transparent rates.`
        : `Yes, Henotic Diagnostics maintains NABL (ISO 15189), AERB, PCPNDT, and ISO certifications across imaging and clinical workflows, ensuring high accuracy with 30–50% savings vs corporate hospital rates.`,
    },
  ];
}
