import {
  getLocationBySlug,
  CITY_MICRO_NEIGHBORHOODS,
  REAL_LOCATION_REVIEWS,
  REGION_NAMES,
} from '@/config/locations';
import { getPricingForService } from '@/config/pricing';
import { isHomeCollectionService } from './location-faqs';
import {
  getCoveredSectorsForLocation,
  getCanonicalServiceSlug,
  type CoveredSectorInfo,
} from './indexing-policy';
import {
  KHARGHAR_HUB,
  getDistanceFromHubKm,
  getEstimatedTravelSummary,
} from './geo-utils';

/**
 * Deterministic 32-bit FNV-1a hash used to vary copy deterministically per location/region
 * without runtime randomness or hydration drift.
 */
export function stableHash(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

const COMPASS_DIRECTIONS = [
  'north',
  'north-east',
  'east',
  'south-east',
  'south',
  'south-west',
  'west',
  'north-west',
] as const;

/**
 * Computes an 8-point cardinal/intercardinal compass bearing from one coordinate pair to another.
 */
export function computeCompassBearing(
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLng = toRad(toLng - fromLng);
  const lat1 = toRad(fromLat);
  const lat2 = toRad(toLat);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  const brng = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  const idx = Math.round(brng / 45) % 8;
  return COMPASS_DIRECTIONS[idx];
}

export interface ServiceSpecs {
  modalityLabel: string;
  fastingAndPrep: string;
  reportTat: string;
  equipment: string;
  procedureDuration: string;
  clinicalBrief: string;
}

/**
 * Generates concise (~150–180 word) service-specific clinical specs and preparation summary
 * intentionally distinct from L1 WordPress encyclopedia copy to prevent L1/L2/L3 duplication.
 */
export function resolveServiceSpecs(
  serviceSlug: string,
  serviceName: string,
  variantKey: string = serviceSlug
): ServiceSpecs {
  const s = serviceSlug.toLowerCase();
  const variant = stableHash(`${variantKey}:${s}`) % 5;

  if (s.includes('mri') || s.includes('mrcp') || s.includes('mr-')) {
    const briefs = [
      `When clinicians prescribe a ${serviceName}, they rely on magnetic field gradients rather than X-rays to examine subtle soft-tissue contrast, neural pathways, joint cartilage, and vascular structures. Before entering the 3.0 Tesla suite, technicians screen for cardiac pacemakers, cochlear implants, aneurysm clips, or metallic fragments and supply cotton examination gowns. Plain acquisitions need no meal restriction, whereas contrast-enhanced protocols require a four-to-six-hour fast plus recent serum creatinine results. During imaging, structured cushions stabilize the target anatomy while multi-planar T1, T2, and diffusion sequences capture millimeter-thin slices inside our wide-bore gantry.`,
      `Physicians order ${serviceName} whenever radiation-free, high-definition internal tissue mapping is needed for spine, brain, musculoskeletal, or pelvic complaints. Our 3.0 Tesla system pairs a wide patient aperture with acoustic noise reduction to keep anxious or claustrophobic visitors relaxed across twenty to thirty-five minutes of scanning. Only IV gadolinium contrast orders call for pre-scan fasting and kidney clearance values; routine non-contrast examinations allow normal medication and light meals. Digital DICOM stacks undergo senior MD radiologist sign-off with structured diagnostic impressions formatted for rapid orthopedic, neurological, or surgical treatment planning.`,
      `Diagnostic clarity on ${serviceName} depends on motion-free magnetic acquisition and high coil signal-to-noise ratios. After metal-safety clearance at check-in, patients rest comfortably on the padded cradle while phased-array receiver coils capture sequential cross-sectional views without ionizing radiation. Keep regular prescribed tablets on schedule; pause solid food for four hours only when contrast enhancement is specified on your doctor requisition. Once capture finishes, two-way radiologist review converts raw slices into shareable cloud links, printable plates, and concise WhatsApp PDF summaries suited for follow-up outpatient consultations.`,
      `Ordered frequently for ligament injuries, disc herniations, neuro-vascular narrowing, and soft-tissue lesions, ${serviceName} distinguishes fluid, inflammation, and nerve compression with sub-millimeter precision. Walk-in safety verification covers dental hardware, surgical prostheses, and pregnancy precautions prior to positioning inside the 3.0T bore. Fasting applies strictly to contrast or abdominal-MRCP studies for four to six hours; plain examinations permit normal hydration beforehand. Certified MR technologists monitor breathing cues over a live intercom and deliver finalized, NABL-aligned radiologist interpretations the same day.`,
      `High-field ${serviceName} eliminates X-ray exposure by combining uniform 3.0 Tesla magnetization with tailored radiofrequency pulse sequences suited to your clinical indication. Preparation stays straightforward: remove watches, jewelry, and magnetic cards, bring any prior ultrasound or surgical discharge records, and observe a brief fast solely if contrast dye or MRCP imaging is requested. Automated calibration plus quiet-coil engineering shortens table duration while protecting slice sharpness. Final signed findings reach patients and referring doctors via encrypted WhatsApp and email.`,
    ];
    return {
      modalityLabel: '3.0 Tesla Wide-Bore MRI',
      fastingAndPrep: 'No fasting for plain MRI; 4–6 hrs fast + creatinine for contrast',
      reportTat: 'DICOM in 2 hrs · MD Radiologist report in 6–12 hrs',
      equipment: 'Siemens / GE 3.0T High-Field Wide-Bore MRI',
      procedureDuration: '20–35 mins',
      clinicalBrief: briefs[variant],
    };
  }

  if (s.includes('ct') || s.includes('hrct')) {
    const briefs = [
      `Sub-millimeter ${serviceName} reconstructs 128 detector rows of axial, coronal, and sagittal anatomy within seconds, making it indispensable for trauma triage, lung parenchyma evaluation, vascular angiography, sinus mapping, and renal stone localization. Smart ALARA tube-current modulation lowers radiation dose automatically to match patient body habitus. Non-contrast studies require zero fasting, whereas iodinated IV contrast examinations need four to six hours without solid food plus a recent serum creatinine report. Breath-hold prompts last ten seconds on the carbon-fiber table before radiologists review thin-slice reconstructions.`,
      `Modern multi-detector ${serviceName} delivers fast cross-sectional imaging when physicians need crisp bone architecture, pulmonary resolution, or urgent internal evaluation. At intake, staff confirm allergy history and check serum creatinine before contrast administration; plain scans proceed immediately in loose metal-free attire. High-speed helical gantry rotation minimizes breath-hold strain for elderly or breathless visitors, completing active acquisition in under half a minute. Final workstation post-processing includes 3D multi-planar views reviewed by MD radiologists for same-day specialist follow-up.`,
      `Clinicians select ${serviceName} for rapid, quantitative visualization of cranial, thoracic, abdominal, or arterial structures where speed and spatial crispness decide clinical next steps. Iterative dose-reduction software preserves fine anatomical detail at markedly lower radiation exposure than conventional single-slice units. Stay well hydrated on arrival; fast four to six hours and share metformin or contrast-sensitivity notes solely when intravenous contrast is ordered. Provisional emergency impressions release within an hour, followed by signed full-study reports on WhatsApp.`,
      `Engineered around 128-slice isotropic acquisition, ${serviceName} captures overlapping volumetric data cleanly in a single short breath-hold to eliminate motion blur. Preparation is minimal: remove metallic pins or belts over the region of interest and keep a four-hour fast only if your prescription specifies CECT contrast dye or coronary angiography. Experienced CT technologists verify requisition parameters with supervising radiologists before starting the brief table sweep, ensuring diagnostic film sets and clear digital reports reach you promptly.`,
      `Precision ${serviceName} bridges acute emergency triage and detailed outpatient surgical planning through thin-slice helical imaging and automated tube modulation. Whether screening lung airways, mapping kidney calculi, or visualizing vascular branches, scanning wraps up in minutes after brief registration. Plain protocols welcome normal meals, while contrast studies add kidney-function screening and four-to-six-hour fasting for intravenous safety. Signed MD interpretations and high-resolution digital plates release digitally the same day.`,
    ];
    return {
      modalityLabel: '128-Slice Low-Dose MDCT',
      fastingAndPrep: 'No fasting for plain CT; 4–6 hrs fast + creatinine for contrast',
      reportTat: 'Urgent review 60 mins · Full report in 4–6 hrs',
      equipment: '128-Slice Iterative Dose-Reduction CT',
      procedureDuration: '5–15 mins',
      clinicalBrief: briefs[variant],
    };
  }

  if (s.includes('pet') || s.includes('nuclear') || s.includes('spect') || s.includes('dtpa') || s.includes('dopa') || s.includes('dota') || s.includes('fapi') || s.includes('mag3') || s.includes('bone-scan') || s.includes('thyroid-scan')) {
    const briefs = [
      `Hybrid molecular ${serviceName} combines functional radiotracer metabolism with anatomical CT localization to stage tumors, measure chemotherapy response, detect occult recurrence, or map organ tracer clearance accurately. Strict preparation matters for crisp tracer uptake: follow a low-carbohydrate, high-protein menu the day prior, avoid vigorous exertion for 24 hours, and maintain six hours of complete fasting aside from plain water. Diabetic patients receive tailored insulin timing after finger-stick glucose checks at reception before quiet uptake resting and whole-body gantry acquisition.`,
      `Nuclear and hybrid ${serviceName} visualizes biochemical cellular activity earlier than purely structural scans, helping oncologists, neurologists, and nephrologists evaluate lesions, thyroid nodules, bone turnover, or renal drainage. Expect roughly two to three hours total visit time covering blood sugar verification, sterile micro-dose radiotracer injection, relaxed silent uptake in a private bay, and fifteen to twenty minutes on the Time-of-Flight scanner. Six-hour water-only fasting keeps blood insulin steady for clean tracer biodistribution.`,
      `Physicians rely on ${serviceName} for whole-body metabolic staging, focal lesion characterization, and functional scintigraphy with short-lived medical isotopes that clear naturally. On the eve of your slot, skip sugary snacks, refined starches, and strenuous workouts; arrive after a six-hour fast wearing comfortable wire-free clothing with prior biopsy, surgery, and chemotherapy summaries. Nuclear medicine physicians review every quantitative SUV measurement and multi-slice fusion image before issuing comprehensive digital reports.`,
      `Time-of-Flight digital ${serviceName} sharpens lesion-to-background contrast while reducing administered tracer activity and table scan duration. Before injection, staff record capillary glucose, review kidney values if diagnostic CT contrast is paired, and seat you calmly during uptake equilibration so skeletal muscles stay relaxed. Bring your specialist prescription, ID, and prior imaging CDs so our nuclear medicine faculty can provide comparative serial response reporting for your next oncology or specialist review.`,
      `Designed for pinpoint molecular sensitivity, ${serviceName} tracks radiotracer physiology alongside diagnostic multi-slice CT in a single comfortable session. A strict six-hour plain-water fast and carb-restricted pre-scan meal prevent competing tracer uptake in normal tissues. After silent resting in an shielded uptake suite, smooth gantry scanning completes in twenty minutes, with short-half-life tracers decaying rapidly afterward. Signed specialist findings release digitally within 12 to 24 hours.`,
    ];
    return {
      modalityLabel: 'Time-of-Flight Digital PET-CT / Nuclear Suite',
      fastingAndPrep: 'Strict 6-hr plain-water fast; low-carb diet 24 hrs prior',
      reportTat: 'Same-day provisional · Final report in 12–24 hrs',
      equipment: 'High-Sensitivity TOF Digital PET-CT & Gamma Suite',
      procedureDuration: '2–3 hrs total visit',
      clinicalBrief: briefs[variant],
    };
  }

  if (s.includes('pregnancy') || s.includes('fetal') || s.includes('anomaly') || s.includes('nt-scan') || s.includes('dating-scan') || s.includes('growth-scan') || s.includes('viability') || s.includes('trimester') || s.includes('bpp') || s.includes('biophysical') || s.includes('cervical-length')) {
    const briefs = [
      `Performed under strict PCPNDT compliance and FMF fetal medicine benchmarks, ${serviceName} uses gentle, radiation-free acoustic waves and HD-Live probes to track gestational age, fetal biometry, structural organ development, placental blood flow, and amniotic volume. Remember to carry your gynecologist prescription and original government photo ID at registration for Form F verification. Early first-trimester scans need moderate bladder fullness from plain water, while second- and third-trimester examinations require no fasting and welcome a light snack beforehand.`,
      `Obstetricians prescribe ${serviceName} across key pregnancy milestones to confirm cardiac activity, measure nuchal translucency, audit fetal anatomy, or monitor third-trimester growth velocity and Doppler indices. Zero ionizing radiation ensures complete safety for mother and baby at every stage. Bring your physician prescription and original Aadhaar or passport for mandatory PCPNDT documentation at reception. After brief warm acoustic gel application, high-definition curved transducers display live measurements and clear sonography printouts within thirty to forty-five minutes.`,
      `Every ${serviceName} session follows Fetal Medicine Foundation imaging views so obstetricians receive reliable BPD, HC, AC, femur length, and placental resistance curves. Unlike X-ray or CT, ultrasound beams carry no radiation risk and work smoothly alongside normal meals. Carry your gynecologist referral note and valid photo ID for compulsory statutory paperwork before entering the suite. Warm gel, wide viewing monitors, and rapid consultant sign-off let expecting families leave with signed printed and WhatsApp digital reports promptly.`,
      `High-resolution ${serviceName} combines gray-scale 2D biometry, color Doppler velocimetry, and optional 4D surface views to assess fetal wellbeing with compassionate clarity. Fasting is unnecessary—eating normally often keeps baby active for cleaner visualization—though early pregnancy scans under twelve weeks benefit from drinking water beforehand. Registered radiologists complete statutory Form F verification with your doctor requisition and original ID, walk through key clinical parameters gently, and release signed reports shortly after.`,
      `Targeted antenatal ${serviceName} equips your maternity specialist with reproducible fetal growth percentiles, umbilical artery waveforms, and cervical or biophysical scoring tailored to your week of gestation. Safety remains paramount: radiation-free sound waves adhere to strict ALARA thermal limits throughout pregnancy. Arrive fifteen minutes early with your original government ID and signed OB/GYN prescription so our team can complete PCPNDT formalities swiftly and deliver thorough digital and hard-copy findings.`,
    ];
    return {
      modalityLabel: 'FMF Fetal Medicine & 4D Sonography',
      fastingAndPrep: 'No fasting; carry original ID + Gynecologist Rx (PCPNDT)',
      reportTat: 'Printed + WhatsApp report in 30–45 mins',
      equipment: 'GE Voluson E10 / Philips EPIQ 4D Ultrasound',
      procedureDuration: '15–30 mins',
      clinicalBrief: briefs[variant],
    };
  }

  if (s.includes('ultrasound') || s.includes('sonography') || s.includes('usg') || s.includes('doppler') || s.includes('follicular') || s.includes('mammography') || s.includes('tomosynthesis') || s.includes('fibroscan') || s.includes('elastography')) {
    const briefs = [
      `Radiation-free ${serviceName} uses multi-frequency broadband sound waves, color Doppler flow mapping, or low-dose digital imaging to inspect organs, vessels, soft tissues, or liver elasticity dynamically in real time. Preparation varies gently by target area: upper-abdominal scans work best after six to eight hours overnight fasting so bowel gas stays minimal and the gallbladder remains distended, whereas pelvic or KUB kidney-bladder studies call for drinking one liter of water beforehand. Thyroid, scrotal, breast, or limb Doppler scans require zero fasting.`,
      `Clinicians order ${serviceName} as an accurate, comfortable first-line evaluation of abdominal organs, arterial/venous blood velocity, thyroid or breast nodules, musculoskeletal tendons, or hepatic stiffness without ionizing CT radiation. Wear convenient two-piece clothing for effortless acoustic transducer placement and follow scan-specific preparation: six hours fasting for hepatobiliary views or a comfortably full bladder for pelvic and KUB scans. Consultant radiologists review dynamic waveforms live and sign concise printed and digital reports within minutes.`,
      `Real-time ${serviceName} captures parenchymal echogenicity, vascular resistive indices, and dynamic motion on high-definition matrix probes tailored to superficial or deep body windows. Walk-in comfort is high and radiation dose is zero for acoustic studies. If your prescription covers gallbladder or whole-abdomen screening, fast six hours prior; for KUB or pelvic examinations, drink three to four glasses of water forty-five minutes early. Immediate verbal clarification pairs with quick PDF reporting directly to your phone.`,
      `Diagnostic ${serviceName} bridges fast specialist triage and follow-up monitoring through crisp gray-scale resolution, elastography stiffness quantification, or sensitive spectral Doppler curves. Keep regular daily medications on track unless instructed otherwise, and match prep to the organ scanned—empty stomach for abdomen/liver stiffness, full bladder for pelvic/urinary windows, and bare clean skin without deodorant or lotion for mammography/breast imaging. Reports and film prints typically finalize within thirty to forty-five minutes.`,
      `Performed by experienced MD radiologists on modern digital platforms, ${serviceName} delivers quantitative flow, structural size, and tissue texture metrics cleanly in fifteen to twenty minutes. Preparation stays simple: hydrate well with water before KUB or pelvic studies, observe a six-to-eight-hour fast before gallbladder or hepatobiliary assessments, or walk right in for thyroid, breast, soft-tissue, and extremity vascular checks. Same-hour digital WhatsApp reports eliminate extra waiting trips.`,
    ];
    return {
      modalityLabel: 'High-Resolution Ultrasound / Doppler / Specialty Imaging',
      fastingAndPrep: 'Abdomen: 6–8 hrs fast; KUB/Pelvic: full bladder; Small-parts: none',
      reportTat: 'Printed + digital WhatsApp report in 20–45 mins',
      equipment: 'GE Voluson / Philips EPIQ / Digital Breast & Elastography Suite',
      procedureDuration: '15–25 mins',
      clinicalBrief: briefs[variant],
    };
  }

  if (s.includes('echo') || s.includes('ecg') || s.includes('tmt') || s.includes('holter') || s.includes('cardiac') || s.includes('bp-monitoring')) {
    const briefs = [
      `Non-invasive cardiac ${serviceName} evaluates ventricular ejection fraction, valve motion, myocardial strain, coronary ischemia under exertion, or 24-hour ambulatory electrical rhythms and blood pressure trends. Wear comfortable two-piece attire and avoid caffeine, tobacco, or heavy meals for two hours ahead of your slot; for TMT exercise stress tests, bring supportive walking sneakers. Continue routine prescriptions unless your cardiologist explicitly pauses beta-blockers beforehand. Senior cardiology specialists verify waveforms and issue signed evaluations promptly.`,
      `Heart specialists recommend ${serviceName} to assess chest discomfort, palpitations, hypertension target-organ load, breathlessness, or pre-operative surgical fitness without invasive catheterization or ionizing radiation. Arrive in loose athletic clothing (button-front tops make electrode hookups effortless for ECG and Holter monitoring) and avoid oily chest lotions so adhesive leads track cleanly. Resting echocardiography and 12-lead ECGs finish inside fifteen minutes, while ambulatory monitors record uninterrupted home routines before cardiologist review.`,
      `Accurate cardiovascular profiling with ${serviceName} relies on crisp acoustic windows, calibrated treadmill Bruce protocols, or multi-lead digital rhythm capture reviewed directly by clinical cardiologists. Skip coffee, energy drinks, and heavy lunches for two to three hours beforehand, and carry prior ECG strips or discharge notes for serial comparison. Do not stop prescribed blood-pressure or cardiac tablets on your own without physician guidance. Resting test reports finalize within an hour cleanly on WhatsApp and paper.`,
      `Whether tracking valve gradients on color 2D Echo, provoking exertion ECG changes during TMT, or logging silent arrhythmias across a multi-day Holter patch, ${serviceName} gives physicians objective functional heart metrics safely. Setup takes just minutes using hypoallergenic skin leads and dedicated acoustic gel, followed by calm cardiologist interpretation. Remember comfortable walking shoes for treadmill sessions and a loose shirt for ambulatory strap attachment, ensuring reliable traces without skin irritation or artifact.`,
      `Engineered around Philips EPIQ cardiac ultrasound and digital stress-Holter telemetry, ${serviceName} monitors left-ventricular systolic strength, diastolic relaxation, and beat-by-beat rhythm stability seamlessly. Prepare by wearing separate upper/lower garments, abstaining from tea or coffee two hours prior, and bringing recent lipid or cardiac medication lists. Our cardiology desk prioritizes same-day digital PDF sign-off so your physician can adjust therapy or clear surgical dates without delay.`,
    ];
    return {
      modalityLabel: 'Non-Invasive Cardiology Telemetry & Echo',
      fastingAndPrep: 'Light meal/no caffeine 2 hrs prior; wear loose two-piece attire',
      reportTat: 'Cardiologist-signed report in 1–2 hrs (24h post-return for Holter)',
      equipment: 'Philips EPIQ Cardiac Ultrasound & Digital Stress/Holter Suite',
      procedureDuration: '15–40 mins',
      clinicalBrief: briefs[variant],
    };
  }

  if (isHomeCollectionService(s)) {
    const briefs = [
      `Every ${serviceName} sample undergoes NABL (ISO 15189) quality-controlled analysis using automated clinical chemistry, immunoassay, or molecular sequencing analyzers calibrated daily against multi-level controls. Barcoded sterile single-use BD Vacutainers prevent sample mix-ups from doorstep collection straight to laboratory accessioning. Fasting assays such as lipid profiles, glucose, or iron panels work best after ten to twelve hours overnight fasting with plain water permitted; non-fasting tests (CBC, HbA1c, vitamins, genetics) collect anytime cleanly from home.`,
      `Physicians prescribe ${serviceName} to screen metabolic markers, endocrine balances, organ enzymes, nutritional deficiencies, or inherited genetic variants accurately from blood, urine, or swab samples. Certified phlebotomists perform gentle home collection inside temperature-monitored bio-safe carriers so patients never need fasting morning travel to the lab. Observe an eight-to-twelve-hour plain-water fast only if your panel includes lipid or fasting glucose components, and inform our technician of thyroid pills or blood thinners beforehand.`,
      `Processed on high-throughput Roche Cobas, Beckman Coulter, or NGS genomic platforms, ${serviceName} pairs barcode-linked venous phlebotomy with dual MD Pathologist verification before reporting. Plain hydration makes venous draw smoother while staying consistent with fasting guidelines when lipid or metabolic tests are included; walk-in or home collection for routine HbA1c, CBC, infection serology, and prenatal NIPT runs around the clock. Encrypted PDF reports reach WhatsApp and email promptly.`,
      `Clinical reliability in ${serviceName} starts at pre-analytical sample handling: cold-chain transport temperature logs, sealed vacutainer draw order, and rapid centrifugation prior to automated reagent analysis. Schedule early-morning home pickup for overnight fasting profiles, or pick any convenient daytime slot for non-fasting biomarkers and DNA screening. Share active prescriptions—especially biotin, anticoagulants, or morning levothyroxine—during booking so laboratory interpretation notes reflect true physiological baselines accurately.`,
      `Designed for patient convenience under strict NABL bio-safety governance, ${serviceName} brings sterilized doorstep phlebotomy and barcode-tracked assay validation directly to households without extra home-visit hassle. After quick sample draw with micro-bore needles, insulated courier pouches move tubes straight to central automated racks for internal QC verification and pathologist sign-off. Routine biochemistry releases within four to six hours on WhatsApp; specialized genetic sequencing follows clear published turnaround timelines.`,
    ];
    return {
      modalityLabel: 'NABL Automated Pathology / Molecular Lab',
      fastingAndPrep: '8–12 hrs plain-water fast if lipid/sugar included; otherwise anytime',
      reportTat: 'Routine labs 4–6 hrs · Specialized/Genetic 2–7 days',
      equipment: 'Roche Cobas / Beckman Coulter & Illumina Sequencing',
      procedureDuration: '5–10 mins doorstep draw',
      clinicalBrief: briefs[variant],
    };
  }

  const briefs = [
    `Conducted under stringent NABL quality assurance guidelines, ${serviceName} provides clinicians with objective physiological, morphological, or laboratory metrics tailored to your prescription. Walk-in preparation stays straightforward: hydrate normally, wear comfortable loose clothing, and bring prior medical records along with your doctor referral note for streamlined triage. Following structured signal or specimen acquisition on calibrated diagnostic analyzers, qualified medical specialists verify findings and release clear digital PDF and printable reports without unnecessary waiting.`,
    `Physicians request ${serviceName} whenever targeted diagnostic measurement can clarify recurring symptoms, stage baseline organ performance, or track ongoing therapeutic response accurately. At registration, our care coordinators verify pre-test instructions, confirm any medication timing, and capture barcode-linked test records before guided acquisition. Certified clinical technologists maintain patient comfort throughout, and senior medical consultants cross-check every curve or parameter ahead of same-day digital WhatsApp delivery.`,
    `Focused ${serviceName} testing helps bridge outpatient symptom evaluation and confident clinical management without long hospital queues. Arrive with your physician prescription, medication summary, and recent baseline test reports so specialist reviewers can correlate longitudinal changes immediately. Unless fasting is noted for specific biochemical or functional sub-protocols, normal water intake is welcomed prior to arrival. Digital reporting reaches your phone swiftly for sharing with your treating doctor.`,
    `Delivered through standardized clinical protocols and calibrated instrumentation, ${serviceName} emphasizes reproducible accuracy, patient comfort, and concise diagnostic turnaround. Pre-appointment guidance from our 24/7 clinical desk clarifies clothing, hydration, or medication timing specific to your order before you visit. Upon completion, dual-check clinical validation ensures legible graphical curves, clear reference ranges, and direct digital PDF access alongside printed hard copies when needed.`,
    `With structured quality governance across registration, data acquisition, and specialist reporting, ${serviceName} equips referring physicians with clear diagnostic insight right when treatment decisions matter. Check any test-specific prep notes over a quick helpline call beforehand, carry old comparative studies for baseline context, and expect transparent pricing paired with rapid digital report release via WhatsApp and email.`,
  ];
  return {
    modalityLabel: 'NABL Accredited Clinical Diagnostics',
    fastingAndPrep: 'Bring Rx & prior reports; normal hydration unless advised',
    reportTat: 'Same-day verified digital report via WhatsApp & Email',
    equipment: 'Calibrated Clinical Diagnostic Systems',
    procedureDuration: '15–30 mins',
    clinicalBrief: briefs[variant],
  };
}

export interface LocalLogisticsContext {
  variantIndex: number;
  isLocationLevel: boolean;
  canonicalService: string;
  serviceName: string;
  locationName: string;
  regionName: string;
  cityName: string;
  pincode: string;
  distanceKm: number | null;
  distanceLabel: string;
  compassBearing: string;
  estimatedTransitLabel: string;
  travelSummary: string;
  nearestPartnerHub: string;
  homeCollectionTurnaround: string;
  supportsHomeCollection: boolean;
  microNeighborhoods: string[];
  coveredSectors: CoveredSectorInfo[];
  nearbyLocations: Array<{ slug: string; name: string; distanceKm: number | null; href: string }>;
  localReview: { ratingValue: string; reviewCount: string } | null;
  heroSubtitle: string;
  fulfillmentNarrative: string;
  sidebarTitle: string;
  sidebarBullets: string[];
  sidebarFooter: string;
}

export interface BuildLocalLogisticsParams {
  serviceSlug: string;
  serviceName: string;
  regionSlug: string;
  regionName?: string;
  locationSlug?: string;
  locationName?: string;
}

function estimateTransitLabel(distanceKm: number | null, isLocation: boolean): string {
  if (!isLocation || distanceKm === null) return '20–45 mins across the regional corridor';
  if (distanceKm <= 3) return '8–15 mins drive/auto from neighborhood';
  if (distanceKm <= 10) return '15–25 mins via Sion–Panvel Expy';
  if (distanceKm <= 25) return '25–45 mins via Expressway / Palm Beach Rd';
  if (distanceKm <= 55) return '45–75 mins via highway or rail';
  return 'Planned outstation trip or home collection';
}

/**
 * Builds deterministic, genuinely localized logistics, sector coverage, transit, and varied UX copy
 * for L2 regional hubs and L3 neighborhood pages so sibling pages stay <45% shingle overlap.
 */
export function buildLocalLogistics({
  serviceSlug,
  serviceName,
  regionSlug,
  regionName: regionNameInput,
  locationSlug,
  locationName: locationNameInput,
}: BuildLocalLogisticsParams): LocalLogisticsContext {
  const canonicalService = getCanonicalServiceSlug(serviceSlug);
  const region = regionSlug.toLowerCase();
  const regionName = regionNameInput || REGION_NAMES[region] || regionSlug;
  const locLower = locationSlug?.toLowerCase();
  const isLocationLevel = Boolean(locLower);

  const locItem = locLower ? getLocationBySlug(locLower, region) : undefined;
  const locationName = locItem?.name || locationNameInput || regionName;
  const cityName = locItem?.city || regionName;
  const pincode = locItem?.pincode || '410210';
  const distanceKm = locLower ? getDistanceFromHubKm(locLower, region) : null;
  const distanceLabel = distanceKm !== null ? `${distanceKm.toFixed(1)} km` : 'regional network';
  const compassBearing =
    locItem && distanceKm !== null
      ? computeCompassBearing(
          KHARGHAR_HUB.latitude,
          KHARGHAR_HUB.longitude,
          locItem.latitude,
          locItem.longitude
        )
      : 'regional';
  const travelSummary =
    distanceKm !== null
      ? getEstimatedTravelSummary(distanceKm, region)
      : `Priority scheduling across ${regionName} with streamlined access to our Sector 15, Kharghar center.`;

  const supportsHomeCollection = isHomeCollectionService(serviceSlug);
  const homeCollectionTurnaround = locItem?.homeCollectionTurnaround || '30–60 mins';
  const nearestPartnerHub = locItem?.nearestPartnerHub || KHARGHAR_HUB.name;

  const coveredSectors = locLower ? getCoveredSectorsForLocation(region, locLower) : [];
  const rawMicros = locLower ? CITY_MICRO_NEIGHBORHOODS[locLower] || [] : [];
  const microNeighborhoods =
    rawMicros.length > 0
      ? rawMicros.slice(0, 12)
      : locLower
        ? [locationName, `${locationName} Station`, `Central ${locationName}`, `PIN ${pincode}`]
        : [regionName, 'Sector 15 Kharghar Hub', 'Same-Day Digital Reports'];

  const localReview = locLower && REAL_LOCATION_REVIEWS[locLower] ? REAL_LOCATION_REVIEWS[locLower] : null;
  const seed = `${locLower || region}:${canonicalService}`;
  const v = stableHash(seed) % 5;

  const sectorNote =
    coveredSectors.length > 0
      ? ` Covers ${coveredSectors.slice(0, 6).map((s) => s.label).join(', ')} (PIN ${pincode}).`
      : '';

  const pricing = getPricingForService(serviceSlug);
  const priceText = pricing ? `from ₹${pricing.henoticPrice.toLocaleString('en-IN')}` : 'at transparent rates';

  const heroSubtitlesLoc = [
    `${serviceName} for ${locationName} (${regionName}, PIN ${pincode}) — ${distanceLabel} ${compassBearing} of our Sector 15, Kharghar flagship (${priceText}).${sectorNote}`,
    `Schedule NABL-accredited ${serviceName} serving PIN ${pincode} in ${locationName}. Located ${distanceLabel} from Sector 15, Kharghar with ${supportsHomeCollection ? `${homeCollectionTurnaround} home pickup` : 'priority center slots'}.`,
    `Serving ${locationName}, ${regionName} (${pincode}): book ${serviceName} ${priceText} with ${supportsHomeCollection ? '24/7 doorstep sample collection' : `quick ${distanceLabel} transit to Kharghar Hub`} & WhatsApp PDFs.`,
    `Trusted ${serviceName} around ${locationName} (PIN ${pincode}), positioned ${distanceLabel} from Kharghar Sector 15. Fast digital reports & NABL quality standards.${sectorNote}`,
    `${locationName} (${pincode}) ${serviceName} desk — transparent pricing ${priceText}, verified medical sign-off, and ${supportsHomeCollection ? `${homeCollectionTurnaround} phlebotomist visits` : 'scheduled zero-wait imaging'}.`,
  ];

  const heroSubtitlesReg = [
    `Explore ${serviceName} access across ${regionName} (${priceText}): choose a neighborhood below or book priority slots via our Sector 15, Kharghar center.`,
    `Comprehensive ${serviceName} coverage spanning ${regionName} — transparent rates ${priceText}, NABL/AERB compliance, and rapid digital WhatsApp reports.`,
    `Coordinating ${serviceName} across ${regionName}: browse local hubs below for neighborhood timing, preparation checklists, and instant booking.`,
    `Patients across ${regionName} can book ${serviceName} ${priceText} with verified MD reporting and convenient ${supportsHomeCollection ? 'doorstep lab collection' : 'Kharghar flagship imaging slots'}.`,
    `Serving families throughout ${regionName} with ${serviceName} — calibrated equipment, same-day digital PDF delivery, and priority slot confirmation.`,
  ];

  const heroSubtitle = isLocationLevel ? heroSubtitlesLoc[v] : heroSubtitlesReg[v];

  const sectorClause =
    coveredSectors.length > 0
      ? ` This hub covers all adjacent sub-sectors including ${coveredSectors.map((s) => `${s.label} (${s.pincode || pincode})`).join(', ')}.`
      : '';
  const landmarkClause =
    microNeighborhoods.length > 1
      ? ` Key pickup and transit points include ${microNeighborhoods.slice(0, 4).join(', ')}.`
      : '';

  const transitText = estimateTransitLabel(distanceKm, isLocationLevel);

  const fulfillmentLoc = supportsHomeCollection
    ? [
        `Residents across ${locationName} (PIN ${pincode}, ${distanceLabel} ${compassBearing} of Sector 15 Kharghar) receive 24/7 doorstep phlebotomy within ${homeCollectionTurnaround}. Barcoded samples travel inside insulated carriers straight to our Sector 15 lab (${KHARGHAR_HUB.streetAddress}).${sectorClause}${landmarkClause}`,
        `Home sample collection operates round-the-clock for ${locationName} (${pincode}), reaching households near ${microNeighborhoods.slice(0, 3).join(', ')} in ${homeCollectionTurnaround}. Sealed tubes sync straight into automated racks at our Sector 15, Kharghar lab ${distanceLabel} away.${sectorClause}`,
        `Book morning fasting or anytime ${serviceName} pickup right from your ${locationName} residence (PIN ${pincode}). Trained phlebotomists reach your block in ${homeCollectionTurnaround} and transport chilled samples to Sector 15, Kharghar (~${transitText}).${sectorClause}${landmarkClause}`,
        `Operating ${distanceLabel} ${compassBearing} from our Kharghar flagship, dedicated phlebotomy riders serve PIN ${pincode} across ${locationName} with ${homeCollectionTurnaround} arrival windows. Walk-in testing is equally welcomed at Sector 15, Kharghar (${transitText}).${sectorClause}`,
        `For ${locationName} families holding PIN ${pincode}, ${serviceName} sample pickup eliminates morning lab queues—riders cover ${microNeighborhoods.slice(0, 3).join(', ')} in ${homeCollectionTurnaround} and route specimens via ${nearestPartnerHub} to Sector 15, Kharghar.${sectorClause}`,
      ][v]
    : [
        `Because ${serviceName} relies on fixed clinical scanners, examinations take place in-center at our flagship facility in Sector 15, Kharghar (${KHARGHAR_HUB.streetAddress}, ${KHARGHAR_HUB.postalCode}) — located ${distanceLabel} ${compassBearing} of ${locationName} (PIN ${pincode}), typically ${transitText}. ${travelSummary}${sectorClause}`,
        `Patients visiting from ${locationName} (${pincode}) reach our Sector 15, Kharghar imaging suite (${distanceLabel} away, ${compassBearing} bearing) in approximately ${transitText}. Prior slot confirmation guarantees prompt scan entry before reports release digitally on WhatsApp.${sectorClause}${landmarkClause}`,
        `All ${serviceName} acquisitions for ${locationName} (PIN ${pincode}) patients are completed at Sector 15, Kharghar near D Mart Road (${distanceLabel} from ${microNeighborhoods[0] || locationName}). ${travelSummary} Digital films and MD findings release electronically without second visits.${sectorClause}`,
        `Coordinated from our Sector 15, Kharghar flagship center ${distanceLabel} away, reserved imaging slots minimize waiting room time for visitors arriving from ${locationName} (PIN ${pincode}) and nearby ${microNeighborhoods.slice(0, 2).join(' / ')}. Estimated travel: ${transitText}.${sectorClause}`,
        `Serving PIN ${pincode} across ${locationName} from our stationary imaging hub in Sector 15, Kharghar (${distanceLabel} ${compassBearing} route; ~${transitText}). ${travelSummary} Once acquisition completes, verified radiologist reports transfer directly via WhatsApp.${sectorClause}`,
      ][v];

  const fulfillmentReg = [
    `Regional ${serviceName} appointments across ${regionName} are coordinated through our 24/7 booking desk at Sector 15, Kharghar (${KHARGHAR_HUB.streetAddress}). ${supportsHomeCollection ? `Doorstep sample collection operates across major ${regionName} residential belts with rapid cold-chain transit.` : `Patients travel smoothly via suburban rail, expressways, or Atal Setu with pre-allocated imaging slots.`}`,
    `Across ${regionName}, Henotic Diagnostics links neighborhood collection logistics and priority scan scheduling directly with our NABL-certified Sector 15, Kharghar flagship. ${supportsHomeCollection ? 'Morning and evening phlebotomist slots cover residential sectors across the region.' : 'Confirmed appointment windows eliminate outpatient queue delays.'}`,
    `Whether visiting from central business nodes or residential suburbs in ${regionName}, patients receive standardized ${serviceName} protocols, transparent upfront fees, and WhatsApp digital reports from our Sector 15, Kharghar medical team.`,
    `Coordinating ${serviceName} throughout ${regionName}: ${supportsHomeCollection ? 'scheduled phlebotomists reach covered PIN codes promptly for home blood or urine pickup.' : 'reserved machine slots at Sector 15, Kharghar ensure smooth in-center imaging upon arrival.'} Signed specialist reports deliver digitally same day.`,
    `Patients in ${regionName} can confirm ${serviceName} slots 24/7 by phone or online booking, with transparent rates ${priceText}, verified NABL quality governance, and fast digital PDF report delivery straight to their device.`,
  ][v];

  const sidebarVariantsLoc = [
    {
      title: `${locationName} Priority Care (${pincode})`,
      bullets: [
        `Pre-confirmed slot for PIN ${pincode} residents`,
        `Signed digital PDF sent via WhatsApp & Email`,
        `NABL ISO 15189 calibrated clinical protocols`,
        supportsHomeCollection ? `${homeCollectionTurnaround} home pickup across ${locationName}` : `Just ${distanceLabel} to Sector 15, Kharghar Hub`,
      ],
      footer: `Dedicated desk for ${locationName} (${pincode}) visitors.`,
    },
    {
      title: `Booking from ${locationName}, ${regionName}`,
      bullets: [
        `Zero waiting queue with scheduled arrival window`,
        `Same-day consultant review & digital reports`,
        `Transparent rates ${priceText} with savings`,
        supportsHomeCollection ? `Doorstep phlebotomy serving ${microNeighborhoods[0] || locationName}` : `Direct access from ${microNeighborhoods[0] || locationName} (${distanceLabel})`,
      ],
      footer: `Express confirmation for PIN ${pincode}.`,
    },
    {
      title: `${serviceName} Desk — PIN ${pincode}`,
      bullets: [
        `Confirmed timing before leaving ${locationName}`,
        `MD Radiologist / Pathologist authenticated output`,
        `Full pre-test prep call from patient support`,
        supportsHomeCollection ? `Cold-chain collection in ${homeCollectionTurnaround}` : `Kharghar Sector 15 center ~${transitText}`,
      ],
      footer: `Round-the-clock helpline supporting ${locationName}.`,
    },
    {
      title: `Patient Benefits in ${locationName}`,
      bullets: [
        `Streamlined reception for PIN ${pincode} bookings`,
        `Encrypted WhatsApp links without revisit travel`,
        `Upfront fee disclosure before test scheduling`,
        supportsHomeCollection ? `Morning & evening home slots in ${locationName}` : `${distanceLabel} corridor to Millennium Empire Hub`,
      ],
      footer: `24/7 booking support for ${locationName} families.`,
    },
    {
      title: `Schedule Near ${locationName}`,
      bullets: [
        `Immediate appointment slot confirmation online`,
        `Clinical report clarity with free desk guidance`,
        `Strict NABL, AERB & PCPNDT safety standards`,
        supportsHomeCollection ? `Trained technician arrival within ${homeCollectionTurnaround}` : `Clear directions from ${locationName} (${distanceLabel})`,
      ],
      footer: `Active coverage across PIN ${pincode} & nearby areas.`,
    },
  ];

  const sidebar = isLocationLevel
    ? sidebarVariantsLoc[v]
    : {
        title: `${regionName} Priority Desk`,
        bullets: [
          `Reserved ${serviceName} slots across ${regionName}`,
          `WhatsApp PDF report delivery on completion`,
          `Upfront pricing ${priceText} with no hidden fees`,
          `NABL & ISO calibrated clinical supervision`,
        ],
        footer: `Dedicated booking support for ${regionName} patients.`,
      };

  return {
    variantIndex: v,
    isLocationLevel,
    canonicalService,
    serviceName,
    locationName,
    regionName,
    cityName,
    pincode,
    distanceKm,
    distanceLabel,
    compassBearing,
    estimatedTransitLabel: transitText,
    travelSummary,
    nearestPartnerHub,
    homeCollectionTurnaround,
    supportsHomeCollection,
    microNeighborhoods,
    coveredSectors,
    nearbyLocations: [],
    localReview,
    heroSubtitle,
    fulfillmentNarrative: isLocationLevel ? fulfillmentLoc : fulfillmentReg,
    sidebarTitle: sidebar.title,
    sidebarBullets: sidebar.bullets,
    sidebarFooter: sidebar.footer,
  };
}
