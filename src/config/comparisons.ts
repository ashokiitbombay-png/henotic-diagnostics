// ═══════════════════════════════════════════════════════════════════════════════
// 🔬 SERVICE COMPARISONS — SEO-driven "X vs Y" diagnostic test comparisons
// Targets high-volume queries: "MRI vs CT scan", "PET-CT vs CT scan", etc.
// ═══════════════════════════════════════════════════════════════════════════════

export interface ComparisonCriterion {
  label: string;
  serviceA: string;
  serviceB: string;
}

export interface ServiceComparison {
  slug: string;
  serviceA: { name: string; slug: string };
  serviceB: { name: string; slug: string };
  title: string;
  metaDescription: string;
  overview: string;
  criteria: ComparisonCriterion[];
  whenToChooseA: string[];
  whenToChooseB: string[];
  verdict: string;
  faqs: Array<{ question: string; answer: string }>;
  relatedComparisons: string[]; // slugs of related comparisons
}

export const COMPARISONS: ServiceComparison[] = [
  // ─────────────────────────────────────────────
  // 1. MRI vs CT Scan
  // ─────────────────────────────────────────────
  {
    slug: "mri-vs-ct-scan",
    serviceA: { name: "MRI Scan", slug: "mri-scan" },
    serviceB: { name: "CT Scan", slug: "ct-scan" },
    title: "MRI vs CT Scan — Which Imaging Test Should You Choose?",
    metaDescription:
      "MRI vs CT Scan: Compare radiation, cost, accuracy & duration. Learn when MRI is better than CT scan and which diagnostic imaging test is right for you.",
    overview:
      "MRI (Magnetic Resonance Imaging) and CT (Computed Tomography) scans are both advanced diagnostic imaging techniques, but they work on fundamentally different principles. MRI uses powerful magnetic fields and radio waves to produce highly detailed images of soft tissues, while CT scans use X-ray beams rotated around the body to create cross-sectional images. Understanding their differences helps patients and physicians choose the right modality for accurate diagnosis.",
    criteria: [
      { label: "Technology", serviceA: "Magnetic fields & radio waves", serviceB: "X-ray beams (ionizing radiation)" },
      { label: "Radiation Exposure", serviceA: "None — completely radiation-free", serviceB: "Low-dose ionizing radiation (1–10 mSv)" },
      { label: "Scan Duration", serviceA: "30–60 minutes", serviceB: "5–15 minutes" },
      { label: "Cost Range", serviceA: "₹5,000 – ₹18,000", serviceB: "₹2,000 – ₹8,000" },
      { label: "Best For", serviceA: "Soft tissues — brain, spine, joints, ligaments", serviceB: "Bones, lungs, chest, abdomen, emergency trauma" },
      { label: "Image Detail", serviceA: "Superior soft-tissue contrast", serviceB: "Excellent bone & lung detail" },
      { label: "Pain Level", serviceA: "Painless (loud noise, enclosed space)", serviceB: "Painless (quick & open)" },
      { label: "Contrast Agent", serviceA: "Gadolinium-based (very low allergy risk)", serviceB: "Iodine-based (moderate allergy risk)" },
    ],
    whenToChooseA: [
      "Evaluating brain, spinal cord, or neurological conditions",
      "Assessing ligament tears, meniscus injuries, or joint disorders",
      "When radiation exposure must be avoided (children, pregnant women)",
      "Detecting soft-tissue tumors or cancer staging",
    ],
    whenToChooseB: [
      "Emergency trauma assessment — fractures, internal bleeding",
      "Chest & lung evaluation — pneumonia, pulmonary embolism",
      "Abdominal pain requiring rapid imaging",
      "Patients with metallic implants or pacemakers (MRI-incompatible)",
    ],
    verdict:
      "Choose MRI for detailed soft-tissue evaluation (brain, spine, joints) without radiation. Choose CT for rapid emergency imaging, bone fractures, and lung conditions. Your doctor will recommend the best option based on the clinical scenario.",
    faqs: [
      { question: "Is MRI better than CT scan?", answer: "Neither is universally 'better.' MRI excels at soft-tissue imaging (brain, spine, joints) without radiation, while CT is faster and superior for bones, lungs, and emergency situations. The right choice depends on what your doctor needs to diagnose." },
      { question: "What is the difference between MRI and CT scan?", answer: "MRI uses magnetic fields to image soft tissues with no radiation, taking 30–60 minutes. CT uses X-rays to image bones and organs quickly in 5–15 minutes. MRI offers better soft-tissue contrast; CT is faster and better for bones and emergencies." },
      { question: "Is MRI scan harmful?", answer: "MRI is considered very safe as it uses no ionizing radiation. The main precautions are for patients with metallic implants, pacemakers, or severe claustrophobia. The magnetic field and radio waves used have no known harmful effects." },
      { question: "Which is more expensive — MRI or CT?", answer: "MRI is generally more expensive (₹5,000–₹18,000) compared to CT scans (₹2,000–₹8,000) due to the complex technology and longer scan times involved." },
    ],
    relatedComparisons: ["ct-scan-vs-x-ray", "mri-vs-pet-ct", "mri-brain-vs-ct-brain", "hrct-vs-ct-scan"],
  },

  // ─────────────────────────────────────────────
  // 2. PET-CT vs CT Scan
  // ─────────────────────────────────────────────
  {
    slug: "pet-ct-vs-ct-scan",
    serviceA: { name: "PET-CT Scan", slug: "pet-ct" },
    serviceB: { name: "CT Scan", slug: "ct-scan" },
    title: "PET-CT vs CT Scan — Understanding the Key Differences",
    metaDescription:
      "PET-CT vs CT Scan: Compare technology, accuracy for cancer detection, cost & radiation. Learn when PET-CT is needed over a standard CT scan.",
    overview:
      "PET-CT combines Positron Emission Tomography (PET) with CT scanning to provide both metabolic and anatomical information in a single examination. While a standard CT scan shows the structure of organs and tissues, PET-CT reveals how tissues are functioning at a cellular level — making it the gold standard for cancer detection, staging, and treatment monitoring.",
    criteria: [
      { label: "Technology", serviceA: "Radiotracer (FDG) + CT combined imaging", serviceB: "X-ray beams for structural imaging" },
      { label: "Radiation Exposure", serviceA: "Moderate (radiotracer + CT component)", serviceB: "Low-dose ionizing radiation" },
      { label: "Scan Duration", serviceA: "45–90 minutes (includes tracer uptake)", serviceB: "5–15 minutes" },
      { label: "Cost Range", serviceA: "₹15,000 – ₹30,000", serviceB: "₹2,000 – ₹8,000" },
      { label: "Best For", serviceA: "Cancer detection, staging & recurrence monitoring", serviceB: "Structural anatomy — bones, organs, lungs" },
      { label: "Accuracy for Cancer", serviceA: "Detects metabolically active tumors early", serviceB: "Shows mass/lesion but cannot confirm malignancy" },
      { label: "Pain Level", serviceA: "Painless (IV injection for tracer)", serviceB: "Painless" },
      { label: "Preparation", serviceA: "4–6 hours fasting, no strenuous exercise 24h before", serviceB: "Minimal — may require fasting for contrast" },
    ],
    whenToChooseA: [
      "Cancer diagnosis, staging, or monitoring treatment response",
      "Detecting metastases (cancer spread) throughout the body",
      "Evaluating unexplained lymph node enlargement",
      "Differentiating benign from malignant lesions",
    ],
    whenToChooseB: [
      "Initial evaluation of structural abnormalities",
      "Emergency imaging — trauma, acute abdomen, stroke",
      "Lung and chest conditions (pneumonia, PE)",
      "Routine follow-up for non-oncological conditions",
    ],
    verdict:
      "PET-CT is the gold standard for oncology — cancer detection, staging, and treatment monitoring. A standard CT scan is sufficient for structural evaluations, emergencies, and non-cancer conditions. Your oncologist will advise if PET-CT is clinically indicated.",
    faqs: [
      { question: "Is PET-CT better than CT scan for cancer?", answer: "Yes, PET-CT is significantly better for cancer detection because it shows metabolic activity (how cells use glucose), allowing detection of cancers before structural changes appear on CT. It can identify cancers as small as 7–8mm and detect metastatic spread." },
      { question: "Why is PET-CT so expensive?", answer: "PET-CT costs more due to the radioactive tracer (FDG) that must be freshly manufactured in a cyclotron, the specialized dual-scanner equipment, and the longer scan and interpretation time required by nuclear medicine specialists." },
      { question: "Can CT scan detect cancer?", answer: "CT can detect masses, lumps, and structural abnormalities that may suggest cancer, but it cannot confirm whether a lesion is malignant. PET-CT adds metabolic data to help differentiate benign from malignant growths." },
    ],
    relatedComparisons: ["mri-vs-ct-scan", "mri-vs-pet-ct", "ct-scan-vs-x-ray"],
  },

  // ─────────────────────────────────────────────
  // 3. CT Scan vs X-Ray
  // ─────────────────────────────────────────────
  {
    slug: "ct-scan-vs-x-ray",
    serviceA: { name: "CT Scan", slug: "ct-scan" },
    serviceB: { name: "X-Ray", slug: "diagnostic-imaging" },
    title: "CT Scan vs X-Ray — When Do You Need a CT Over an X-Ray?",
    metaDescription:
      "CT Scan vs X-Ray: Compare cost, radiation, detail & clinical use. Understand when a CT scan is necessary instead of a simple X-ray.",
    overview:
      "Both CT scans and X-rays use ionizing radiation to create images, but they differ vastly in detail and diagnostic capability. An X-ray produces a flat 2D image — ideal for quick bone and chest evaluations. A CT scan takes multiple X-ray slices and reconstructs them into detailed 3D cross-sectional images, revealing internal organs, blood vessels, and soft tissues that a plain X-ray cannot visualize.",
    criteria: [
      { label: "Technology", serviceA: "Multiple rotational X-ray beams → 3D cross-sections", serviceB: "Single X-ray beam → flat 2D image" },
      { label: "Radiation Exposure", serviceA: "Moderate (1–10 mSv depending on area)", serviceB: "Very low (0.01–0.1 mSv)" },
      { label: "Scan Duration", serviceA: "5–15 minutes", serviceB: "Few seconds" },
      { label: "Cost Range", serviceA: "₹2,000 – ₹8,000", serviceB: "₹200 – ₹800" },
      { label: "Best For", serviceA: "Detailed internal organ, soft-tissue & 3D bone imaging", serviceB: "Simple fractures, chest screening, dental evaluation" },
      { label: "Image Detail", serviceA: "High — cross-sectional slices with 3D reconstruction", serviceB: "Basic — 2D flat projection" },
      { label: "Pain Level", serviceA: "Painless", serviceB: "Painless" },
      { label: "Availability", serviceA: "Available at diagnostic centers & hospitals", serviceB: "Available everywhere, including small clinics" },
    ],
    whenToChooseA: [
      "Complex fractures or internal injuries from trauma",
      "Abdominal or pelvic pain requiring organ evaluation",
      "Suspected blood clots, tumors, or internal bleeding",
      "When X-ray findings are inconclusive and need further detail",
    ],
    whenToChooseB: [
      "Simple bone fractures or dislocations",
      "Routine chest screening for infections (pneumonia, TB)",
      "Dental evaluations and jaw imaging",
      "First-line screening before advanced imaging",
    ],
    verdict:
      "Start with an X-ray for simple fractures and routine chest evaluations — it's fast, affordable, and low-radiation. Upgrade to a CT scan when detailed cross-sectional imaging is needed for complex fractures, organ pathology, or when X-ray results are inconclusive.",
    faqs: [
      { question: "Is CT scan better than X-ray?", answer: "CT provides far more detail than X-ray — it can visualize internal organs, blood vessels, and soft tissues in 3D. However, for simple fractures and routine chest screening, an X-ray is usually sufficient and involves much less radiation." },
      { question: "How much more radiation does a CT scan have?", answer: "A CT scan delivers roughly 100–1,000 times more radiation than a single X-ray, depending on the body area scanned. Modern low-dose CT protocols have significantly reduced this gap while maintaining diagnostic quality." },
      { question: "Can an X-ray miss a fracture?", answer: "Yes, X-rays can miss hairline fractures, stress fractures, and fractures in complex bone structures. If clinical suspicion remains high despite a normal X-ray, a CT scan or MRI is recommended for confirmation." },
    ],
    relatedComparisons: ["mri-vs-ct-scan", "hrct-vs-ct-scan", "dexa-scan-vs-x-ray"],
  },

  // ─────────────────────────────────────────────
  // 4. MRI vs PET-CT
  // ─────────────────────────────────────────────
  {
    slug: "mri-vs-pet-ct",
    serviceA: { name: "MRI Scan", slug: "mri-scan" },
    serviceB: { name: "PET-CT Scan", slug: "pet-ct" },
    title: "MRI vs PET-CT — Which Is Better for Your Diagnosis?",
    metaDescription:
      "MRI vs PET-CT: Compare radiation, cancer detection, soft-tissue detail & cost. Learn when MRI is preferred over PET-CT and vice versa.",
    overview:
      "MRI and PET-CT serve complementary roles in diagnostic medicine. MRI provides exceptional anatomical detail of soft tissues without radiation, making it ideal for neurological, musculoskeletal, and certain abdominal conditions. PET-CT combines metabolic and structural imaging to detect cancer at the cellular level. In many oncology protocols, both are used together for comprehensive evaluation.",
    criteria: [
      { label: "Technology", serviceA: "Magnetic fields & radio waves", serviceB: "Radioactive tracer (FDG) + CT imaging" },
      { label: "Radiation Exposure", serviceA: "None", serviceB: "Moderate (radiotracer + CT component)" },
      { label: "Scan Duration", serviceA: "30–60 minutes", serviceB: "45–90 minutes (includes uptake time)" },
      { label: "Cost Range", serviceA: "₹5,000 – ₹18,000", serviceB: "₹15,000 – ₹30,000" },
      { label: "Best For", serviceA: "Anatomical soft-tissue detail — brain, spine, joints", serviceB: "Metabolic activity — cancer detection & staging" },
      { label: "Cancer Detection", serviceA: "Shows tumor size, location & invasion", serviceB: "Detects metabolically active cancer cells body-wide" },
      { label: "Pain Level", serviceA: "Painless (enclosed, noisy)", serviceB: "Painless (IV tracer injection)" },
      { label: "Repeat Frequency", serviceA: "Safe to repeat — no cumulative radiation", serviceB: "Limited by cumulative radiation exposure" },
    ],
    whenToChooseA: [
      "Neurological conditions — brain tumors, MS, stroke evaluation",
      "Musculoskeletal injuries — ligaments, cartilage, disc problems",
      "When radiation must be avoided (pediatric, pregnancy-adjacent)",
      "Detailed soft-tissue characterization of a known lesion",
    ],
    whenToChooseB: [
      "Whole-body cancer screening and staging",
      "Monitoring chemotherapy or radiation treatment response",
      "Searching for unknown primary tumor or metastatic spread",
      "Differentiating scar tissue from cancer recurrence",
    ],
    verdict:
      "MRI is the first choice for soft-tissue anatomical imaging, especially brain, spine, and musculoskeletal conditions. PET-CT is indispensable for cancer staging, treatment monitoring, and whole-body oncological evaluation. In complex cancer cases, both modalities may be used together.",
    faqs: [
      { question: "Can MRI replace PET-CT for cancer?", answer: "For specific cancers (brain, liver, pelvic), whole-body MRI with diffusion-weighted imaging can be an alternative. However, PET-CT remains the gold standard for most oncological staging and treatment response assessment." },
      { question: "Which is safer — MRI or PET-CT?", answer: "MRI is safer from a radiation standpoint as it uses no ionizing radiation. PET-CT involves moderate radiation from both the radiotracer and the CT component. For repeated monitoring, MRI may be preferred when clinically appropriate." },
    ],
    relatedComparisons: ["mri-vs-ct-scan", "pet-ct-vs-ct-scan", "mri-brain-vs-ct-brain"],
  },

  // ─────────────────────────────────────────────
  // 5. Ultrasound vs CT Scan
  // ─────────────────────────────────────────────
  {
    slug: "ultrasound-vs-ct-scan",
    serviceA: { name: "Ultrasound", slug: "ultrasound" },
    serviceB: { name: "CT Scan", slug: "ct-scan" },
    title: "Ultrasound vs CT Scan — Which Imaging Modality Do You Need?",
    metaDescription:
      "Ultrasound vs CT Scan: Compare safety, radiation, cost & diagnostic accuracy. Understand when ultrasound is sufficient and when CT scan is required.",
    overview:
      "Ultrasound and CT scans are both widely used diagnostic tools, but they serve different clinical purposes. Ultrasound uses high-frequency sound waves to create real-time images — it's radiation-free, portable, and ideal for soft organs and pregnancy. CT scans provide detailed cross-sectional X-ray images best suited for complex anatomy, trauma, and conditions requiring bone or lung evaluation.",
    criteria: [
      { label: "Technology", serviceA: "High-frequency sound waves (no radiation)", serviceB: "Rotational X-ray beams (ionizing radiation)" },
      { label: "Radiation Exposure", serviceA: "None — completely safe, even in pregnancy", serviceB: "Low-to-moderate ionizing radiation" },
      { label: "Scan Duration", serviceA: "15–30 minutes", serviceB: "5–15 minutes" },
      { label: "Cost Range", serviceA: "₹800 – ₹3,000", serviceB: "₹2,000 – ₹8,000" },
      { label: "Best For", serviceA: "Abdomen, pelvis, pregnancy, thyroid, soft organs", serviceB: "Chest, lungs, bones, trauma, complex anatomy" },
      { label: "Image Detail", serviceA: "Good for soft tissues, real-time & dynamic", serviceB: "Excellent cross-sectional 3D detail" },
      { label: "Pain Level", serviceA: "Painless, non-invasive", serviceB: "Painless" },
      { label: "Portability", serviceA: "Portable — can be done at bedside", serviceB: "Requires dedicated CT suite" },
    ],
    whenToChooseA: [
      "Pregnancy monitoring and fetal assessment",
      "Abdominal organ evaluation — liver, kidneys, gallbladder",
      "Thyroid nodules, breast lumps, or superficial masses",
      "Pediatric imaging where radiation must be avoided",
    ],
    whenToChooseB: [
      "Chest and lung conditions — pneumonia, PE, lung nodules",
      "Trauma with suspected fractures or internal bleeding",
      "Kidney stones requiring precise size and location",
      "When ultrasound findings are inconclusive",
    ],
    verdict:
      "Ultrasound is the safest and most cost-effective first-line imaging tool for abdominal, pelvic, and pregnancy evaluations. CT scan is necessary for chest, lung, bone, and emergency trauma imaging where cross-sectional detail is critical.",
    faqs: [
      { question: "Is ultrasound as good as CT scan?", answer: "For soft-tissue organs (liver, kidneys, gallbladder, uterus), ultrasound provides excellent diagnostic information and is often the first choice. However, for lungs, bones, and complex anatomy, CT is far superior and provides more detailed cross-sectional imaging." },
      { question: "Why do doctors order CT after ultrasound?", answer: "If an ultrasound finding is inconclusive, partially obscured by gas/bone, or reveals something needing further characterization, a CT scan provides additional cross-sectional detail to confirm the diagnosis and guide treatment." },
    ],
    relatedComparisons: ["mri-vs-ct-scan", "ct-scan-vs-x-ray", "color-doppler-vs-ultrasound"],
  },

  // ─────────────────────────────────────────────
  // 6. 2D Echo vs ECG
  // ─────────────────────────────────────────────
  {
    slug: "2d-echo-vs-ecg",
    serviceA: { name: "2D Echocardiography", slug: "2d-echo" },
    serviceB: { name: "ECG (Electrocardiogram)", slug: "ecg" },
    title: "2D Echo vs ECG — Which Heart Test Do You Need?",
    metaDescription:
      "2D Echo vs ECG: Compare what each cardiac test reveals, cost, duration & accuracy. Learn when an ECG is enough and when a 2D Echo is essential.",
    overview:
      "2D Echo (Echocardiography) and ECG (Electrocardiogram) are the two most common cardiac diagnostic tests, but they evaluate entirely different aspects of heart health. An ECG records the electrical activity of the heart to detect rhythm abnormalities, while a 2D Echo uses ultrasound to visualize the heart's structure, chambers, valves, and pumping function in real time.",
    criteria: [
      { label: "Technology", serviceA: "Ultrasound imaging of heart structure", serviceB: "Electrical signal recording via skin electrodes" },
      { label: "What It Shows", serviceA: "Heart chambers, valves, wall motion, ejection fraction", serviceB: "Heart rhythm, rate, electrical conduction patterns" },
      { label: "Scan Duration", serviceA: "20–40 minutes", serviceB: "5–10 minutes" },
      { label: "Cost Range", serviceA: "₹1,500 – ₹3,500", serviceB: "₹200 – ₹500" },
      { label: "Best For", serviceA: "Structural heart disease — valve problems, heart failure", serviceB: "Arrhythmias, heart attack detection, rhythm disorders" },
      { label: "Radiation", serviceA: "None", serviceB: "None" },
      { label: "Pain Level", serviceA: "Painless (gel + probe on chest)", serviceB: "Painless (electrodes on skin)" },
      { label: "Reporting", serviceA: "Real-time with detailed cardiologist interpretation", serviceB: "Instant printout, interpreted in minutes" },
    ],
    whenToChooseA: [
      "Evaluating heart valve function (murmurs, regurgitation, stenosis)",
      "Assessing heart failure and ejection fraction (pumping strength)",
      "Detecting pericardial effusion (fluid around heart)",
      "Congenital heart disease evaluation in children and adults",
    ],
    whenToChooseB: [
      "Screening for irregular heartbeat or palpitations",
      "Chest pain evaluation — detecting heart attack patterns",
      "Pre-surgery or pre-employment cardiac screening",
      "Monitoring effect of cardiac medications",
    ],
    verdict:
      "ECG is the quick, affordable first-line test for heart rhythm and electrical problems. 2D Echo provides the complete structural picture — valve function, chamber size, and pumping efficiency. For comprehensive cardiac evaluation, most cardiologists recommend both tests together.",
    faqs: [
      { question: "Is 2D Echo better than ECG?", answer: "They test different things. ECG detects electrical issues (arrhythmias, heart attacks), while 2D Echo shows structural problems (valve disease, heart failure). Neither replaces the other — they're complementary tests." },
      { question: "Do I need both ECG and 2D Echo?", answer: "Often, yes. A cardiologist typically starts with an ECG for rhythm assessment and orders a 2D Echo when structural evaluation is needed. For a complete cardiac check-up, both are recommended." },
      { question: "Can ECG detect heart failure?", answer: "ECG can show indirect signs of heart failure (chamber enlargement, strain patterns), but a 2D Echo directly measures ejection fraction and is the definitive test for diagnosing and grading heart failure severity." },
    ],
    relatedComparisons: ["mri-vs-ct-scan", "color-doppler-vs-ultrasound"],
  },

  // ─────────────────────────────────────────────
  // 7. HRCT vs CT Scan
  // ─────────────────────────────────────────────
  {
    slug: "hrct-vs-ct-scan",
    serviceA: { name: "HRCT Scan", slug: "hrct-scan" },
    serviceB: { name: "CT Scan", slug: "ct-scan" },
    title: "HRCT vs CT Scan — What's the Difference?",
    metaDescription:
      "HRCT vs CT Scan: Compare resolution, lung imaging accuracy & clinical use. Learn why HRCT is preferred for lung diseases over standard CT scan.",
    overview:
      "HRCT (High-Resolution Computed Tomography) is a specialized form of CT scanning optimized for lung imaging. While a standard CT scan uses thicker slices (5–10mm) for general body imaging, HRCT uses ultra-thin slices (1–2mm) with special reconstruction algorithms to provide extraordinarily detailed images of lung tissue, airways, and interstitial spaces. It is the gold standard for diagnosing interstitial lung diseases, COVID-19 lung involvement, and pulmonary fibrosis.",
    criteria: [
      { label: "Technology", serviceA: "Ultra-thin 1–2mm slices with bone algorithm", serviceB: "Standard 5–10mm slices, general reconstruction" },
      { label: "Radiation Exposure", serviceA: "Similar to standard CT (optimized protocols)", serviceB: "Low-to-moderate ionizing radiation" },
      { label: "Scan Duration", serviceA: "5–10 minutes", serviceB: "5–15 minutes" },
      { label: "Cost Range", serviceA: "₹2,500 – ₹5,000", serviceB: "₹2,000 – ₹8,000" },
      { label: "Best For", serviceA: "Lung parenchyma, ILD, fibrosis, COVID assessment", serviceB: "General body imaging — abdomen, brain, bones" },
      { label: "Resolution", serviceA: "Ultra-high resolution for lung detail", serviceB: "Standard resolution for general anatomy" },
      { label: "Pain Level", serviceA: "Painless", serviceB: "Painless" },
      { label: "Contrast Use", serviceA: "Usually without contrast", serviceB: "With or without contrast" },
    ],
    whenToChooseA: [
      "Suspected interstitial lung disease (ILD) or pulmonary fibrosis",
      "Post-COVID lung assessment and recovery monitoring",
      "Chronic cough with normal X-ray requiring detailed lung evaluation",
      "Bronchiectasis, emphysema, or diffuse lung disease workup",
    ],
    whenToChooseB: [
      "General abdominal, brain, or musculoskeletal evaluation",
      "Trauma and emergency imaging",
      "Cancer staging involving multiple body regions",
      "Kidney stones, appendicitis, or vascular evaluation",
    ],
    verdict:
      "HRCT is the specialized lung scan — choose it for interstitial lung disease, post-COVID assessment, and any condition requiring detailed lung parenchyma evaluation. Standard CT is better for general body imaging, abdomen, brain, and emergency use.",
    faqs: [
      { question: "Is HRCT the same as CT scan?", answer: "HRCT is a specialized type of CT scan optimized specifically for lung imaging. It uses thinner slices (1–2mm vs 5–10mm) and special algorithms to provide much finer detail of lung tissue than a standard CT scan." },
      { question: "When is HRCT needed instead of X-ray?", answer: "HRCT is needed when an X-ray shows suspicious findings, when clinical symptoms suggest lung disease but X-ray is normal, or for specific conditions like ILD, pulmonary fibrosis, and post-COVID lung assessment." },
    ],
    relatedComparisons: ["mri-vs-ct-scan", "ct-scan-vs-x-ray", "pet-ct-vs-ct-scan"],
  },

  // ─────────────────────────────────────────────
  // 8. Mammography vs Breast Ultrasound
  // ─────────────────────────────────────────────
  {
    slug: "mammography-vs-breast-ultrasound",
    serviceA: { name: "Mammography", slug: "mammography" },
    serviceB: { name: "Breast Ultrasound", slug: "breast-ultrasound" },
    title: "Mammography vs Breast Ultrasound — Which Breast Screening Is Right?",
    metaDescription:
      "Mammography vs Breast Ultrasound: Compare accuracy for cancer detection, radiation, cost & suitability. Learn which breast imaging test you need.",
    overview:
      "Mammography and breast ultrasound are both essential breast imaging tools but serve different purposes. Mammography uses low-dose X-rays and is the gold standard screening tool for breast cancer in women over 40, capable of detecting microcalcifications that ultrasound cannot see. Breast ultrasound uses sound waves and is particularly valuable for evaluating palpable lumps, dense breast tissue, and distinguishing solid masses from fluid-filled cysts.",
    criteria: [
      { label: "Technology", serviceA: "Low-dose X-ray compression imaging", serviceB: "High-frequency sound waves" },
      { label: "Radiation Exposure", serviceA: "Very low (0.4 mSv per exam)", serviceB: "None — completely radiation-free" },
      { label: "Scan Duration", serviceA: "15–20 minutes", serviceB: "15–30 minutes" },
      { label: "Cost Range", serviceA: "₹1,500 – ₹3,500", serviceB: "₹1,000 – ₹2,500" },
      { label: "Best For", serviceA: "Screening — detects microcalcifications & architectural distortion", serviceB: "Evaluating palpable lumps & dense breast tissue" },
      { label: "Sensitivity in Dense Breasts", serviceA: "Reduced sensitivity in very dense tissue", serviceB: "Superior — sound waves penetrate dense tissue well" },
      { label: "Pain Level", serviceA: "Mild discomfort from breast compression", serviceB: "Painless" },
      { label: "Age Suitability", serviceA: "Recommended from age 40+ for screening", serviceB: "All ages, including young women" },
    ],
    whenToChooseA: [
      "Annual breast cancer screening for women aged 40+",
      "Detecting early-stage breast cancer (microcalcifications)",
      "Baseline breast evaluation for high-risk women",
      "Following established screening guidelines (ACR, WHO)",
    ],
    whenToChooseB: [
      "Evaluating a palpable breast lump felt during self-exam",
      "Young women (under 40) with breast symptoms",
      "Women with very dense breast tissue (as supplement to mammography)",
      "Pregnancy or breastfeeding when radiation must be avoided",
    ],
    verdict:
      "Mammography remains the gold standard for breast cancer screening in women over 40 due to its ability to detect microcalcifications. Breast ultrasound is ideal for evaluating lumps, young women, and dense breast tissue. For comprehensive breast health, many radiologists recommend both.",
    faqs: [
      { question: "Can ultrasound replace mammography for breast cancer screening?", answer: "No. Ultrasound cannot detect microcalcifications — an important early sign of breast cancer. Mammography remains the primary screening tool. Ultrasound is used as a complementary test, especially for dense breast tissue." },
      { question: "Which is more painful — mammography or breast ultrasound?", answer: "Breast ultrasound is painless. Mammography involves brief breast compression that can cause mild discomfort, but modern digital mammography machines have improved comfort significantly." },
    ],
    relatedComparisons: ["ultrasound-vs-ct-scan", "color-doppler-vs-ultrasound"],
  },

  // ─────────────────────────────────────────────
  // 9. Color Doppler vs Ultrasound
  // ─────────────────────────────────────────────
  {
    slug: "color-doppler-vs-ultrasound",
    serviceA: { name: "Color Doppler", slug: "color-doppler" },
    serviceB: { name: "Ultrasound", slug: "ultrasound" },
    title: "Color Doppler vs Ultrasound — What's the Difference?",
    metaDescription:
      "Color Doppler vs Ultrasound: Compare technology, blood flow visualization, clinical use & cost. Learn when a Doppler study is needed over regular ultrasound.",
    overview:
      "A regular ultrasound (B-mode) creates grayscale images of organs and tissues using reflected sound waves. Color Doppler adds a layer of blood flow information by detecting the direction and velocity of blood movement within vessels — displayed as color overlays on the ultrasound image. Essentially, Color Doppler is an enhanced ultrasound that combines structural imaging with functional blood flow assessment.",
    criteria: [
      { label: "Technology", serviceA: "Ultrasound + blood flow velocity mapping (color overlay)", serviceB: "Standard B-mode grayscale sound wave imaging" },
      { label: "What It Shows", serviceA: "Blood flow direction, velocity, and vessel patency", serviceB: "Organ structure, size, texture, and masses" },
      { label: "Scan Duration", serviceA: "20–45 minutes", serviceB: "15–30 minutes" },
      { label: "Cost Range", serviceA: "₹1,500 – ₹4,000", serviceB: "₹800 – ₹3,000" },
      { label: "Best For", serviceA: "Vascular assessment — DVT, carotid stenosis, varicose veins", serviceB: "Abdominal organs, pregnancy, thyroid, breast" },
      { label: "Radiation", serviceA: "None", serviceB: "None" },
      { label: "Pain Level", serviceA: "Painless", serviceB: "Painless" },
      { label: "Clinical Applications", serviceA: "Vascular, cardiac, obstetric Doppler", serviceB: "General organ imaging across all body regions" },
    ],
    whenToChooseA: [
      "Suspected deep vein thrombosis (DVT) or varicose veins",
      "Carotid artery assessment for stroke risk",
      "Pregnancy — assessing placental blood flow and fetal Doppler",
      "Evaluating blood supply to organs (renal, hepatic vasculature)",
    ],
    whenToChooseB: [
      "General abdominal organ evaluation (liver, kidneys, gallbladder)",
      "Pregnancy dating, growth scans, and anomaly screening",
      "Thyroid nodule or breast lump characterization",
      "Guiding biopsies and interventional procedures",
    ],
    verdict:
      "Regular ultrasound is the first-line imaging for organ evaluation and pregnancy monitoring. Color Doppler is needed when blood flow assessment is clinically important — vascular conditions, DVT screening, stroke risk evaluation, and obstetric Doppler studies.",
    faqs: [
      { question: "Is Color Doppler the same as ultrasound?", answer: "Color Doppler is a specialized mode within ultrasound technology. It uses the same sound wave principle but adds blood flow velocity and direction mapping displayed as color on the screen. Think of it as ultrasound + blood flow assessment in one exam." },
      { question: "When does a doctor order Doppler instead of ultrasound?", answer: "Doctors order Color Doppler when they need to assess blood vessel health — suspected blood clots (DVT), narrowed arteries, varicose veins, placental blood flow in high-risk pregnancy, or blood supply to specific organs." },
    ],
    relatedComparisons: ["ultrasound-vs-ct-scan", "2d-echo-vs-ecg", "mammography-vs-breast-ultrasound"],
  },

  // ─────────────────────────────────────────────
  // 10. MRI Brain vs CT Brain
  // ─────────────────────────────────────────────
  {
    slug: "mri-brain-vs-ct-brain",
    serviceA: { name: "MRI Brain", slug: "mri-brain" },
    serviceB: { name: "CT Brain", slug: "ct-brain" },
    title: "MRI Brain vs CT Brain — Which Brain Scan Do You Need?",
    metaDescription:
      "MRI Brain vs CT Brain: Compare detail, speed, radiation & cost for neurological diagnosis. Learn when CT brain is enough and when MRI brain is essential.",
    overview:
      "MRI Brain and CT Brain are both used to evaluate neurological conditions, but each excels in different clinical scenarios. CT Brain is the emergency go-to — fast, widely available, and excellent at detecting acute bleeding, skull fractures, and large strokes. MRI Brain provides far superior soft-tissue contrast, detecting subtle lesions, tumors, white matter diseases, and early-stage strokes that CT may miss.",
    criteria: [
      { label: "Technology", serviceA: "Magnetic fields — superior soft-tissue contrast", serviceB: "X-ray beams — fast structural imaging" },
      { label: "Radiation Exposure", serviceA: "None", serviceB: "Low (1–2 mSv)" },
      { label: "Scan Duration", serviceA: "30–45 minutes", serviceB: "5–10 minutes" },
      { label: "Cost Range", serviceA: "₹5,000 – ₹12,000", serviceB: "₹2,000 – ₹5,000" },
      { label: "Best For", serviceA: "Tumors, MS, demyelination, subtle lesions, posterior fossa", serviceB: "Acute hemorrhage, skull fractures, emergency stroke" },
      { label: "Detail Level", serviceA: "Exceptional — detects lesions < 3mm", serviceB: "Good for acute bleeding and bone injury" },
      { label: "Pain Level", serviceA: "Painless (noisy, enclosed 30+ min)", serviceB: "Painless (quick, open)" },
      { label: "Emergency Use", serviceA: "Not first-line (slower scan)", serviceB: "Gold standard for acute neurological emergencies" },
    ],
    whenToChooseA: [
      "Suspected brain tumor or space-occupying lesion",
      "Multiple sclerosis (MS) diagnosis and monitoring",
      "Chronic headaches with neurological symptoms",
      "Posterior fossa evaluation (cerebellum, brainstem)",
    ],
    whenToChooseB: [
      "Acute head injury or trauma — ruling out bleeding",
      "Sudden severe headache (thunderclap) — ruling out hemorrhage",
      "Emergency stroke evaluation (initial assessment)",
      "Patients with MRI contraindications (pacemakers, metallic implants)",
    ],
    verdict:
      "CT Brain is the emergency standard — fast, effective, and ideal for detecting acute hemorrhage and fractures. MRI Brain is superior for non-emergency neurological evaluation — tumors, MS, chronic headaches, and any condition requiring fine soft-tissue detail. In many cases, an emergency CT is followed by an MRI for comprehensive assessment.",
    faqs: [
      { question: "Is MRI brain better than CT brain?", answer: "For detailed soft-tissue evaluation (tumors, MS, demyelination), MRI is significantly superior. For acute emergencies (bleeding, fractures), CT is faster and more immediately informative. They serve different clinical needs." },
      { question: "Can CT brain detect tumors?", answer: "CT can detect large brain tumors, especially with contrast enhancement. However, MRI is far more sensitive for detecting small tumors, tumor margins, and distinguishing tumor types, making it the preferred modality for suspected brain tumors." },
    ],
    relatedComparisons: ["mri-vs-ct-scan", "mri-vs-pet-ct", "ct-scan-vs-x-ray"],
  },

  // ─────────────────────────────────────────────
  // 11. DEXA Scan vs X-Ray
  // ─────────────────────────────────────────────
  {
    slug: "dexa-scan-vs-x-ray",
    serviceA: { name: "DEXA Scan", slug: "dexa-bone-scan" },
    serviceB: { name: "X-Ray", slug: "diagnostic-imaging" },
    title: "DEXA Scan vs X-Ray — Which Is Better for Bone Health?",
    metaDescription:
      "DEXA Scan vs X-Ray: Compare bone density measurement, radiation & accuracy. Learn why DEXA is essential for osteoporosis screening and how it differs from X-ray.",
    overview:
      "DEXA (Dual-Energy X-ray Absorptiometry) and standard X-rays both involve X-ray technology but serve very different purposes in bone health assessment. A standard X-ray shows bone structure and can detect fractures, but it cannot reliably measure bone density until 30–40% of bone mass is already lost. DEXA is specifically designed to measure bone mineral density (BMD) with precision, detecting osteoporosis years before fractures occur.",
    criteria: [
      { label: "Technology", serviceA: "Dual-energy X-ray for bone density quantification", serviceB: "Standard X-ray for structural bone imaging" },
      { label: "What It Measures", serviceA: "Bone mineral density (g/cm²) — T-score & Z-score", serviceB: "Bone structure, fractures, alignment" },
      { label: "Radiation Exposure", serviceA: "Extremely low (0.001 mSv — less than a day's natural exposure)", serviceB: "Very low (0.01–0.1 mSv)" },
      { label: "Scan Duration", serviceA: "10–20 minutes", serviceB: "Few seconds per image" },
      { label: "Cost Range", serviceA: "₹1,500 – ₹3,000", serviceB: "₹200 – ₹800" },
      { label: "Best For", serviceA: "Osteoporosis screening & fracture risk prediction", serviceB: "Detecting fractures, deformities, arthritis" },
      { label: "Pain Level", serviceA: "Painless, non-invasive", serviceB: "Painless" },
      { label: "Early Detection", serviceA: "Detects bone loss as low as 1–2%", serviceB: "Only shows bone loss after 30–40% is lost" },
    ],
    whenToChooseA: [
      "Women aged 65+ or men aged 70+ for osteoporosis screening",
      "Post-menopausal women with risk factors for osteoporosis",
      "Monitoring osteoporosis treatment effectiveness over time",
      "Patients on long-term steroids or medications affecting bone health",
    ],
    whenToChooseB: [
      "Suspected bone fracture from injury or fall",
      "Evaluating joint alignment, arthritis, or deformity",
      "Spinal curvature assessment (scoliosis)",
      "Quick screening after acute trauma",
    ],
    verdict:
      "DEXA is the only reliable way to measure bone density and diagnose osteoporosis — X-rays cannot detect early bone loss. Use X-ray for fractures and structural assessment. For bone health screening, especially post-menopausal women and seniors, DEXA is the essential test.",
    faqs: [
      { question: "Can X-ray detect osteoporosis?", answer: "X-rays are very insensitive for osteoporosis — they only show bone loss after 30–40% of bone density is already gone. By that point, the condition is advanced. DEXA scan can detect bone loss as low as 1–2%, enabling early intervention." },
      { question: "How often should I get a DEXA scan?", answer: "For screening purposes, DEXA is recommended every 2 years for women over 65 and men over 70. Those on osteoporosis treatment may need annual DEXA scans to monitor treatment response." },
    ],
    relatedComparisons: ["ct-scan-vs-x-ray", "mri-vs-ct-scan"],
  },

  // ─────────────────────────────────────────────
  // 12. FibroScan vs Liver Biopsy
  // ─────────────────────────────────────────────
  {
    slug: "fibroscan-vs-liver-biopsy",
    serviceA: { name: "FibroScan", slug: "fibroscan" },
    serviceB: { name: "Liver Biopsy", slug: "liver-screening" },
    title: "FibroScan vs Liver Biopsy — Which Liver Test Is Better?",
    metaDescription:
      "FibroScan vs Liver Biopsy: Compare accuracy, invasiveness, pain & cost. Learn why FibroScan is replacing liver biopsy for fibrosis and fatty liver assessment.",
    overview:
      "FibroScan (Transient Elastography) and liver biopsy are both used to assess liver fibrosis and disease severity, but they differ dramatically in invasiveness and patient experience. Liver biopsy has traditionally been the gold standard — a needle is inserted to extract a tissue sample for microscopic analysis. FibroScan is a revolutionary non-invasive alternative that uses ultrasound-based shear wave technology to measure liver stiffness, correlating directly with fibrosis stage.",
    criteria: [
      { label: "Technology", serviceA: "Ultrasound-based transient elastography", serviceB: "Percutaneous needle extraction of liver tissue" },
      { label: "Invasiveness", serviceA: "Completely non-invasive — probe on skin", serviceB: "Invasive — needle insertion under local anesthesia" },
      { label: "Scan Duration", serviceA: "5–10 minutes", serviceB: "15–30 minutes (plus recovery)" },
      { label: "Cost Range", serviceA: "₹2,500 – ₹4,500", serviceB: "₹8,000 – ₹20,000" },
      { label: "Best For", serviceA: "Fibrosis staging, fatty liver grading, serial monitoring", serviceB: "Complex liver diseases requiring histological diagnosis" },
      { label: "Pain Level", serviceA: "Painless", serviceB: "Moderate pain, requires local anesthesia" },
      { label: "Risk of Complications", serviceA: "None", serviceB: "Bleeding, infection, pneumothorax (rare but serious)" },
      { label: "Repeatability", serviceA: "Easily repeatable for monitoring over time", serviceB: "Not suitable for frequent repetition" },
    ],
    whenToChooseA: [
      "Non-alcoholic fatty liver disease (NAFLD/NASH) assessment",
      "Chronic hepatitis B or C fibrosis staging",
      "Serial monitoring of liver disease progression or treatment response",
      "Screening patients with risk factors for liver fibrosis",
    ],
    whenToChooseB: [
      "Diagnosing autoimmune hepatitis or primary biliary cholangitis",
      "Unexplained liver enzyme elevation needing histological diagnosis",
      "When FibroScan results are indeterminate or discordant with clinical findings",
      "Evaluating liver transplant rejection",
    ],
    verdict:
      "FibroScan has largely replaced liver biopsy as the first-line assessment for liver fibrosis and fatty liver disease. It's painless, risk-free, and easily repeatable. Liver biopsy is still necessary for specific conditions requiring microscopic tissue analysis, but its use has decreased significantly.",
    faqs: [
      { question: "Is FibroScan as accurate as liver biopsy?", answer: "FibroScan has >85% accuracy for diagnosing significant fibrosis and >90% for cirrhosis, making it a reliable alternative for most patients. Biopsy provides more detailed histological information but samples only a tiny portion (1/50,000th) of the liver." },
      { question: "Can FibroScan detect fatty liver?", answer: "Yes. Modern FibroScan devices include CAP (Controlled Attenuation Parameter), which accurately measures liver fat content (steatosis) alongside liver stiffness (fibrosis) in a single painless exam." },
      { question: "How often should FibroScan be repeated?", answer: "For monitoring chronic liver conditions, FibroScan is typically repeated every 6–12 months. For patients on treatment, more frequent monitoring may be recommended by the hepatologist." },
    ],
    relatedComparisons: ["ultrasound-vs-ct-scan", "color-doppler-vs-ultrasound"],
  },
];

/** Helper: find a comparison by slug */
export function getComparisonBySlug(slug: string): ServiceComparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}

/** Helper: get related comparisons for a given slug */
export function getRelatedComparisons(slug: string): ServiceComparison[] {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return [];
  return comparison.relatedComparisons
    .map((s) => getComparisonBySlug(s))
    .filter((c): c is ServiceComparison => c !== undefined);
}
