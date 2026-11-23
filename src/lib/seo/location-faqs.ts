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

function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

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

function getModalityPrepHint(serviceSlug: string): string {
  const s = serviceSlug.toLowerCase();
  if (s.includes('mri') || s.includes('mrcp')) {
    return 'Plain MRI requires no fasting; only contrast-enhanced or MRCP protocols require a 4–6 hour fast plus a serum creatinine check and metal-safety clearance.';
  }
  if (s.includes('ct') || s.includes('hrct')) {
    return 'Non-contrast CT scans need zero fasting. Contrast CT orders ask for 4–6 hours without solid food and recent serum creatinine values.';
  }
  if (s.includes('pet') || s.includes('nuclear') || s.includes('spect')) {
    return 'Observe a strict 6-hour plain-water fast and low-carbohydrate diet for 24 hours before arrival, plus sugar verification at reception.';
  }
  if (s.includes('pregnancy') || s.includes('fetal') || s.includes('anomaly') || s.includes('nt-scan')) {
    return 'Fasting is unnecessary; carry your gynecologist prescription and original government photo ID for statutory PCPNDT Form F verification.';
  }
  if (s.includes('ultrasound') || s.includes('sonography') || s.includes('doppler') || s.includes('fibroscan')) {
    return 'Upper-abdomen scans require 6–8 hours fasting, KUB/pelvic scans require a comfortably full bladder, and small-parts Doppler needs no prep.';
  }
  if (s.includes('echo') || s.includes('ecg') || s.includes('tmt') || s.includes('holter')) {
    return 'Wear loose two-piece clothing, avoid caffeine and heavy meals for 2 hours prior, and wear supportive sneakers if a treadmill test is ordered.';
  }
  if (isHomeCollectionService(s)) {
    return 'Lipid, fasting glucose, and insulin panels require 8–12 hours overnight plain-water fasting; non-fasting blood tests and genetic kits can be drawn anytime.';
  }
  return 'Stay normally hydrated, wear comfortable clothing, and carry your physician referral prescription along with any relevant past reports.';
}

export interface BuildLocationFAQsParams {
  serviceName: string;
  serviceSlug: string;
  locationName: string;
  regionName: string;
  price?: number;
  locationSlug?: string;
  regionSlug?: string;
  pincode?: string;
  distanceKm?: number | null;
  turnaround?: string;
  microNeighborhoods?: string[];
  coveredSectors?: string[];
}

/**
 * Shared generator used by both <LocationFAQ /> (visible UI) and MedicalPseoSchema (FAQPage JSON-LD)
 * so structured data stays 100% aligned with visible on-page answers while varying sibling copy.
 */
export function buildLocationFAQs({
  serviceName,
  serviceSlug,
  locationName,
  regionName,
  price,
  locationSlug,
  pincode,
  distanceKm,
  turnaround,
  microNeighborhoods = [],
  coveredSectors = [],
}: BuildLocationFAQsParams): LocationFAQItem[] {
  const supportsHomeCollection = isHomeCollectionService(serviceSlug);
  const priceDisplay = price ? formatPriceINR(price) : 'competitive center rates';
  const pinText = pincode || '410210';
  const distText =
    distanceKm !== undefined && distanceKm !== null
      ? `${distanceKm.toFixed(1)} km`
      : 'short transit';
  const etaText = turnaround || '30–60 mins';
  const landmarkSlice =
    microNeighborhoods.slice(0, 3).join(', ') || `${locationName} main corridor`;
  const sectorSuffix =
    coveredSectors.length > 0
      ? ` Covered sub-sectors also include ${coveredSectors.slice(0, 5).join(', ')}.`
      : '';
  const prepHint = getModalityPrepHint(serviceSlug);
  const v = hashString(`${locationSlug || locationName}:${serviceSlug}`) % 5;

  const q1 = [
    `Is ${serviceName} available for patients living in ${locationName}?`,
    `Where can I book ${serviceName} near ${locationName} (PIN ${pinText})?`,
    `Does Henotic Diagnostics provide ${serviceName} for ${locationName} residents?`,
    `How close is ${serviceName} access from ${locationName} in ${regionName}?`,
    `Can ${locationName} families schedule ${serviceName} with Henotic Diagnostics?`,
  ][v];

  const a1 = [
    `Yes. Residents of ${locationName} (${regionName}, PIN ${pinText}) access NABL-accredited ${serviceName} coordinated through our Sector 15, Kharghar flagship center—${distText} away via Sion–Panvel Expressway.${sectorSuffix}`,
    `Patients in ${locationName} (${pinText}) book verified ${serviceName} through our Sector 15, Kharghar diagnostic hub just ${distText} away, covering nearby ${landmarkSlice} under strict ISO 15189 protocols.${sectorSuffix}`,
    `Henotic Diagnostics actively serves ${locationName} and surrounding ${landmarkSlice} from Sector 15, Kharghar (${distText} from ${locationName}), providing calibrated ${serviceName} slots daily.${sectorSuffix}`,
    `For PIN ${pinText} around ${locationName}, ${regionName}, certified ${serviceName} appointments operate 24/7 via our Kharghar Sector 15 center (${distText} corridor) with priority booking.${sectorSuffix}`,
    `Households throughout ${locationName} (${pinText}) schedule accurate ${serviceName} with our MD-supervised diagnostic center in Sector 15, Kharghar—located ${distText} from ${landmarkSlice}.${sectorSuffix}`,
  ][v];

  const q2 = [
    `How much does ${serviceName} cost for ${locationName} patients?`,
    `What are the ${serviceName} charges near ${locationName} (PIN ${pinText})?`,
    `What is the price of ${serviceName} when booking from ${locationName}?`,
    `Are there discounted ${serviceName} rates for ${locationName}, ${regionName}?`,
    `What fee should ${locationName} patients expect for ${serviceName}?`,
  ][v];

  const a2 = [
    `${serviceName} pricing starts ${price ? `at ${priceDisplay}` : 'at transparent package rates'} for ${locationName} (PIN ${pinText}) bookings—offering substantial savings over typical ${regionName} private hospital charges with zero hidden consumables.`,
    `Booking ${serviceName} from ${locationName} starts from ${priceDisplay}, giving PIN ${pinText} families upfront NABL-accredited transparency plus significant savings versus corporate ${regionName} clinics.`,
    `Patients visiting from ${locationName} (${regionName}) pay starting from ${priceDisplay} for ${serviceName}. All standard digital films and specialist verification remain included; call +91 8879327184 for complex contrast or panel variations.`,
    `Starting at ${priceDisplay} for ${locationName} residents near ${landmarkSlice}, our transparent fee structure avoids unexpected surcharges while maintaining NABL and AERB clinical quality.`,
    `Our ${serviceName} tariff begins from ${priceDisplay} for ${locationName} (PIN ${pinText}), saving patients up to 50% compared to multi-specialty hospital outpatient rates in ${regionName}.`,
  ][v];

  const q3 = [
    `What preparation or fasting is required before ${serviceName} in ${locationName}?`,
    `Do I need to fast ahead of my ${serviceName} slot from ${locationName}?`,
    `How should ${locationName} patients prepare prior to ${serviceName}?`,
    `Are special instructions needed before booking ${serviceName} near ${locationName}?`,
    `What pre-test precautions apply to ${serviceName} in ${locationName}?`,
  ][v];

  const a3 = [
    `Before traveling or scheduling collection from ${locationName} (${pinText}), follow protocol guidance: ${prepHint}`,
    `Preparation for ${locationName} patients depends on your exact prescription: ${prepHint}`,
    `To avoid rescheduling your ${locationName} appointment, note this checklist: ${prepHint}`,
    `Our clinical desk briefs ${locationName} callers in advance—specifically: ${prepHint}`,
    `For clean diagnostic precision at your ${locationName} visit or sample pickup: ${prepHint}`,
  ][v];

  const q4 = supportsHomeCollection
    ? [
        `Does doorstep sample collection operate in ${locationName} for ${serviceName}?`,
        `Can a phlebotomist visit my home in PIN ${pinText} (${locationName})?`,
        `How quickly do home pickup riders reach ${locationName} for ${serviceName}?`,
        `Is early-morning fasting home collection available around ${locationName}?`,
        `Are covered zones near ${landmarkSlice} eligible for home pickup?`,
      ][v]
    : [
        `How do patients travel from ${locationName} to Sector 15, Kharghar for ${serviceName}?`,
        `Is ${serviceName} performed at home or in-center for ${locationName} residents?`,
        `Which landmarks around ${locationName} (PIN ${pinText}) connect easily to your lab?`,
        `What is the transit route from ${locationName} for an imaging ${serviceName}?`,
        `Where do ${locationName} patients go in person for ${serviceName}?`,
      ][v];

  const a4 = supportsHomeCollection
    ? [
        `Yes. Certified phlebotomists reach ${locationName} (PIN ${pinText}, including ${landmarkSlice}) within ${etaText} around the clock, using barcoded sterile vacutainers and temperature-controlled transport.${sectorSuffix}`,
        `Home collection is active 24/7 across PIN ${pinText} in ${locationName}, with typical rider arrival in ${etaText} near ${landmarkSlice} and chilled cold-chain transit straight to our automated analyzer suite.${sectorSuffix}`,
        `Morning fasting and daytime doorstep visits cover ${locationName} and ${landmarkSlice} inside ${etaText}. Schedule online or by phone so a trained phlebotomist collects sealed tubes at home.${sectorSuffix}`,
        `Residents holding PIN ${pinText} across ${locationName} skip morning lab commutes—phlebotomy teams cover ${landmarkSlice} within ${etaText} and route specimens straight for automated verification.${sectorSuffix}`,
        `Doorstep ${serviceName} pickup runs daily in ${locationName} (${regionName}) in ${etaText}, serving ${landmarkSlice} with zero extra collection hassle and barcoded sample tracking.${sectorSuffix}`,
      ][v]
    : [
        `Because ${serviceName} requires stationary clinical scanners, scans take place at Millennium Empire, Sector 15, Kharghar—${distText} from ${locationName} (PIN ${pinText}) via highway or Harbour Line rail.${sectorSuffix}`,
        `Patients from ${locationName} and ${landmarkSlice} visit our fixed imaging suite in Sector 15, Kharghar (${distText} corridor) rather than mobile units, guaranteeing calibrated diagnostic resolution and prior slot seating.${sectorSuffix}`,
        `Traveling from PIN ${pinText} around ${locationName} takes a direct ${distText} route to D Mart Road, Sector 15, Kharghar (Millennium Empire Business Park), supported by landmark transit near Kharghar Station.${sectorSuffix}`,
        `All imaging acquisitions for ${locationName} visitors occur in-center at Sector 15, Kharghar (${distText} away). Reserved time slots help commuters arriving from ${landmarkSlice} finish scans without waiting delays.${sectorSuffix}`,
        `Serving ${locationName} (${regionName}, PIN ${pinText}) out of our Sector 15, Kharghar facility ${distText} away, providing wide-bore imaging suites, accessible parking, and immediate post-scan dispatch.${sectorSuffix}`,
      ][v];

  const q5 = [
    `How soon do ${locationName} patients receive ${serviceName} reports?`,
    `When are digital PDF reports delivered for ${serviceName} in ${locationName}?`,
    `Can I get WhatsApp ${serviceName} reports without returning from ${locationName}?`,
    `What is the report turnaround for ${serviceName} near PIN ${pinText}?`,
    `Do doctors review ${serviceName} results before sending them to ${locationName}?`,
  ][v];

  const a5 = [
    `Most ${serviceName} reports finalize same day—verified digitally by MD radiologists or pathologists and sent directly via encrypted WhatsApp and email so ${locationName} families avoid extra travel.`,
    `Signed reports typically publish within hours of testing in ${locationName} (specialized molecular assays may take longer), delivered securely on WhatsApp and email alongside printed copies when requested.`,
    `You do not need a return trip from ${locationName} (PIN ${pinText}) just for paperwork: digital PDFs and high-resolution DICOM links arrive on WhatsApp promptly upon consultant sign-off.`,
    `Same-day digital reporting covers most ${serviceName} orders from ${locationName}, backed by dual quality validation and clear printable PDF attachments for your referring physician.`,
    `After clinical sign-off by MD specialists, encrypted WhatsApp PDFs and patient portal summaries reach ${locationName} households swiftly without waiting room pickups.`,
  ][v];

  const q6 = [
    `How can I book a priority ${serviceName} slot from ${locationName}?`,
    `What is the fastest way to schedule ${serviceName} in ${regionName}?`,
    `Do I need a prior appointment for ${serviceName} near ${locationName}?`,
    `Can I call a 24/7 helpline to arrange ${serviceName} in ${locationName}?`,
    `How do I lock my preferred timing for ${serviceName} (PIN ${pinText})?`,
  ][v];

  const a6 = [
    `Call +91 8879327184 anytime (24/7) or submit the priority form on this page with your PIN ${pinText} details to receive instant confirmation and pre-test instructions for ${locationName}.`,
    `Walk-ins are welcome, yet booking ahead online or calling +91 8879327184 secures zero-wait seating for ${locationName} visitors or timely doorstep rider dispatch.`,
    `Tap Book Your Slot Now or call +91 8879327184—our ${regionName} coordinator confirms available timings around ${locationName}, shares fee clarity, and texts Kharghar directions or rider ETAs.`,
    `Instant slot reservation takes under a minute online or via +91 8879327184, allowing ${locationName} (${pinText}) residents to lock morning fasting pickups or express scanner hours.`,
    `Reach our 24/7 coordination desk at +91 8879327184 or complete the quick appointment form below to reserve your ${serviceName} timing for ${locationName}.`,
  ][v];

  return [
    { question: q1, answer: a1 },
    { question: q2, answer: a2 },
    { question: q3, answer: a3 },
    { question: q4, answer: a4 },
    { question: q5, answer: a5 },
    { question: q6, answer: a6 },
  ];
}
