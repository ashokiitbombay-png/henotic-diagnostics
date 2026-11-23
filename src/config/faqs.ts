// FAQ Configuration for Henotic Diagnostics PSEO Platform
// Includes universal FAQs, category-specific templates with {service} and {location} placeholders

export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceFAQTemplate {
  servicePattern: string; // regex-like pattern to match service slugs
  faqs: FAQ[];
}

// ────────────────────────────────────
// UNIVERSAL FAQs (apply to all services)
// ────────────────────────────────────

export const UNIVERSAL_FAQS: FAQ[] = [
  {
    question: 'How do I book a {service} appointment at Henotic Diagnostics {location}?',
    answer: 'You can book your {service} appointment at our {location} center through multiple convenient channels: call us directly at 088793 27184, send a WhatsApp message for instant booking, or use the online booking form on our website. Walk-in appointments are also welcome based on slot availability. We recommend advance booking to ensure zero wait times.'
  },
  {
    question: 'Does Henotic Diagnostics {location} accept insurance or TPA for {service}?',
    answer: 'Yes, Henotic Diagnostics {location} is empanelled with all major insurance companies and TPAs (Third Party Administrators) including Star Health, ICICI Lombard, New India Assurance, HDFC Ergo, Max Bupa, Bajaj Allianz, and many more. We offer cashless processing for {service} where applicable. Please carry your insurance card and a valid ID for seamless processing.'
  },
  {
    question: 'How quickly will I receive my {service} reports?',
    answer: 'At Henotic Diagnostics {location}, most {service} reports are delivered within 2-6 hours for routine tests. Critical and urgent reports are expedited on a priority basis. All reports are delivered digitally via WhatsApp, email, and our secure online patient portal. Hard copies are also available at the center upon request. You will receive an SMS/WhatsApp notification the moment your report is ready.'
  },
  {
    question: 'What are the operating hours for {service} at the {location} center?',
    answer: 'Henotic Diagnostics {location} operates 24 hours a day, 7 days a week, including Sundays and public holidays. This means you can schedule your {service} at a time that is most convenient for you — early morning, late evening, or even overnight for emergency requirements. Our radiology and pathology departments maintain round-the-clock availability.'
  },
  {
    question: 'Is Henotic Diagnostics {location} NABL accredited and certified?',
    answer: 'Yes, Henotic Diagnostics {location} is fully accredited by NABL (National Accreditation Board for Testing and Calibration Laboratories) and ISO 9001:2015 certified. Our radiology equipment also complies with AERB (Atomic Energy Regulatory Board) safety standards. These accreditations ensure that every {service} performed at our facility meets the highest national and international quality benchmarks for accuracy, safety, and reliability.'
  }
];

// ────────────────────────────────────
// CATEGORY-SPECIFIC FAQ TEMPLATES
// ────────────────────────────────────

export const SERVICE_FAQ_TEMPLATES: ServiceFAQTemplate[] = [
  // ─── MRI (6 FAQs) ─────────────────
  {
    servicePattern: 'mri|mrcp|mr-angiography',
    faqs: [
      {
        question: 'How much does an {service} cost at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} starts from just ₹4,500, which is 40-50% lower than the average market price of ₹8,000-12,000. Our pricing is transparent with zero hidden charges. The exact cost may vary depending on the body part being scanned and whether contrast (dye injection) is required. Contact us for an exact quote tailored to your prescription.'
      },
      {
        question: 'What preparation is required before an {service}?',
        answer: 'For most {service} procedures, no special preparation is needed. However, please note: (1) Remove all metallic objects including jewelry, watches, hairpins, and belts before the scan. (2) Inform your doctor if you have any metallic implants, pacemakers, cochlear implants, or metal clips. (3) For contrast MRI, fasting for 4-6 hours is recommended. (4) Wear comfortable, loose-fitting clothing without metal zippers. (5) Bring your doctor\'s prescription and any previous scan reports for comparison.'
      },
      {
        question: 'How long does an {service} take?',
        answer: 'A standard {service} at Henotic Diagnostics {location} typically takes 20-45 minutes depending on the body part and clinical indication. A contrast-enhanced MRI may take an additional 10-15 minutes. Our 1.5 Tesla MRI machine ensures high-quality images in optimal scan time. We recommend arriving 15 minutes before your appointment for registration and preparation.'
      },
      {
        question: 'Is {service} safe? Does it use radiation?',
        answer: 'Yes, {service} is completely safe and uses powerful magnetic fields and radio waves — it does NOT use any ionizing radiation (unlike X-ray or CT). This makes MRI one of the safest diagnostic imaging modalities, suitable for repeated use, pregnant women (in certain trimesters with medical guidance), and children. The only contraindication is for patients with certain metallic implants or pacemakers.'
      },
      {
        question: 'Can I undergo {service} if I am claustrophobic?',
        answer: 'We understand that MRI machines can feel confining. At Henotic Diagnostics {location}, our radiographers are specially trained to help claustrophobic patients with calming techniques and continuous communication throughout the procedure. In some cases, your referring physician may prescribe a mild sedative before the scan. We also allow a companion to stay in the MRI room for moral support.'
      },
      {
        question: 'What is the difference between MRI with and without contrast?',
        answer: 'A non-contrast (plain) MRI uses magnetic fields alone to produce images. A contrast-enhanced MRI involves injecting a gadolinium-based contrast dye through an IV line, which highlights blood vessels, tumors, and areas of inflammation more clearly. Your doctor will specify whether contrast is needed based on the clinical condition. The contrast dye is generally safe and is excreted by the kidneys within 24 hours. A kidney function test (serum creatinine) may be required before contrast administration.'
      }
    ]
  },

  // ─── CT SCAN (6 FAQs) ─────────────
  {
    servicePattern: 'ct-scan|ct-brain|hrct|ct-abdomen|ct-angiography|ct-coronary|ct-pulmonary|ct-kub|ct-spine|ct-neck|ct-pns|ct-colonography|ct-enterography|ct-urology|ct-guided|whole-body-ct|contrast-ct|low-dose-ct|lung-cancer-screening|chest-ct|ct-temporal|ct-face|ct-orbit',
    faqs: [
      {
        question: 'What is the cost of {service} at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} starts from ₹3,500 for plain scans (such as CT Brain) and ₹4,500 for HRCT Chest (vs typical market rates of ₹4,500-6,500), with CT Abdomen & Pelvis at ₹6,500 and specialized CT Angiography from ₹10,500-15,000. We offer transparent, upfront pricing with no hidden fees. Call or WhatsApp 088793 27184 for an exact quote based on your prescription.'
      },
      {
        question: 'What preparation is needed before a {service}?',
        answer: 'Preparation for {service} depends on the type of scan: (1) Plain CT Scan — generally no preparation needed. (2) Contrast CT — fasting for 4-6 hours is required; a kidney function test (serum creatinine) within the last 3 months is mandatory. (3) CT Abdomen — you may be asked to drink oral contrast 1-2 hours before the scan. (4) Inform your doctor about any allergies, especially to iodine-based dyes. (5) Bring your prescription, previous reports, and insurance card.'
      },
      {
        question: 'How long does a {service} take?',
        answer: 'A {service} at Henotic Diagnostics {location} is extremely quick — the actual scan takes only 5-15 minutes depending on the body region. Our advanced 128-slice CT scanner captures high-resolution images in seconds. Including preparation time and contrast injection (if applicable), the entire process typically takes 20-30 minutes. Reports are usually available within 2-4 hours.'
      },
      {
        question: 'Is a {service} safe? What about radiation exposure?',
        answer: 'Modern CT scanners at Henotic Diagnostics use advanced dose-reduction technology (ALARA principle) to minimize radiation exposure while maintaining image quality. A single CT scan uses a very small amount of radiation that is generally considered safe for diagnostic purposes. However, CT scans are not routinely recommended for pregnant women. Our AERB-certified equipment and protocols ensure that radiation doses are kept as low as reasonably achievable.'
      },
      {
        question: 'What is the difference between CT scan and MRI?',
        answer: 'CT scans use X-rays and are excellent for imaging bones, lungs, and acute emergencies (like bleeding or fractures). They are very fast (seconds to minutes). MRI uses magnetic fields and radio waves (no radiation) and provides superior soft tissue detail — ideal for brain, spine, joints, and ligaments. Your doctor will recommend the appropriate modality based on your clinical condition. At Henotic Diagnostics {location}, we offer both with expert radiologist interpretation.'
      },
      {
        question: 'Do I need a doctor\'s prescription for a {service}?',
        answer: 'Yes, a valid doctor\'s prescription or referral is required for a {service} at Henotic Diagnostics {location}. This ensures that the correct scan protocol is used for your clinical condition, the appropriate body part is scanned, and the radiologist can provide a meaningful clinical correlation in the report. If you need a consultation, we can connect you with our in-house physicians.'
      }
    ]
  },

  // ─── ULTRASOUND (6 FAQs) ──────────
  {
    servicePattern: 'ultrasound|sonography|usg|abdomen.*ultrasound|pelvic-ultrasound|thyroid-ultrasound|breast-ultrasound|kidney-ultrasound|kub-ultrasound|prostate-ultrasound|scrotal-ultrasound|neck-ultrasound|soft-tissue-ultrasound|musculoskeletal-ultrasound|small-parts-ultrasound|transvaginal-ultrasound|transrectal-ultrasound|vascular-ultrasound',
    faqs: [
      {
        question: 'How much does an {service} cost at Henotic Diagnostics {location}?',
        answer: 'An {service} at Henotic Diagnostics {location} starts from ₹1,800 for single-part, abdominal, pelvic, and transvaginal scans (vs market rate of ₹2,200-2,500) and ₹2,500 for thyroid or breast ultrasound — saving up to 29%. All ultrasounds are performed by experienced sonologists using high-resolution equipment. Contact us for exact pricing based on your prescription.'
      },
      {
        question: 'What preparation is needed for an {service}?',
        answer: 'Preparation depends on the type of ultrasound: (1) Abdominal Ultrasound — fasting for 6-8 hours (empty stomach preferred for clear images of liver, gallbladder, and pancreas). (2) Pelvic Ultrasound — full bladder is required; drink 4-5 glasses of water 1 hour before the scan and avoid urinating. (3) Transvaginal Ultrasound — an empty bladder is preferred. (4) Thyroid, Breast, and Musculoskeletal Ultrasound — no special preparation. Bring your doctor\'s prescription and previous reports.'
      },
      {
        question: 'Is ultrasound safe? Can it be done during pregnancy?',
        answer: 'Ultrasound is one of the safest diagnostic tools available. It uses high-frequency sound waves (not radiation) to produce images, making it completely safe for patients of all ages, including pregnant women and newborns. Obstetric ultrasound is a standard part of prenatal care. At Henotic Diagnostics {location}, our scans follow all PCPNDT Act guidelines and are performed by registered sonologists.'
      },
      {
        question: 'How long does an {service} take?',
        answer: 'A standard {service} at Henotic Diagnostics {location} takes approximately 15-30 minutes. Whole abdomen ultrasound may take 20-30 minutes for thorough evaluation of all organs. Specialized studies like Doppler ultrasound or guided procedures may take slightly longer. Reports are typically available within 30-60 minutes of completing the scan.'
      },
      {
        question: 'Can ultrasound detect cancer?',
        answer: 'Ultrasound is an excellent screening and initial assessment tool that can detect abnormal masses, cysts, and tumors in organs like the breast, thyroid, liver, kidneys, and ovaries. While it cannot definitively diagnose cancer, it helps identify suspicious lesions that may require further evaluation with biopsy, CT, MRI, or PET CT. At Henotic Diagnostics {location}, our radiologists can guide the next steps based on your ultrasound findings.'
      },
      {
        question: 'What is the difference between USG and sonography?',
        answer: 'USG (Ultrasonography) and sonography refer to the same diagnostic procedure — they are interchangeable terms. Both use high-frequency sound waves to create real-time images of internal organs, blood flow, and soft tissues. Whether your prescription says USG, ultrasound, or sonography, the test performed at Henotic Diagnostics {location} is identical, and is conducted using the same high-resolution equipment.'
      }
    ]
  },

  // ─── NIPT PRENATAL GENETIC SCREENING (6 FAQs) ──
  // Placed before blood-test and pregnancy ultrasound templates so blood-test-nipt & nipt-test-pregnancy match here first.
  {
    servicePattern: 'nipt|nips|nippt|nip-t|npt-test|prenatal-down-syndrome|down-syndrome-prenatal|non-invasive-prenatal',
    faqs: [
      {
        question: 'What is {service} and how safe is it during pregnancy in {location}?',
        answer: 'Non-Invasive Prenatal Testing ({service}) is an advanced cell-free fetal DNA (cfDNA) blood screening test analyzed from a single maternal arm blood draw. Because it does not touch the amniotic sac or placenta, it poses zero procedural risk to your developing baby. Home maternal blood collection is available across {location}.'
      },
      {
        question: 'How much does {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics serving {location}, transparent NIPT packages start at ₹10,000 for the NIPT Basic Screening Panel (MRP ₹12,500, 20% off), ₹12,500 for the Comprehensive NIPT Test Panel (MRP ₹15,500), and ₹15,000 for the Advanced NIPT Test Panel (MRP ₹18,500), with zero hidden home collection charges.'
      },
      {
        question: 'When can I take {service} during pregnancy?',
        answer: '{service} is generally recommended from 10 weeks of pregnancy onwards, once sufficient placental cell-free DNA (fetal fraction) is circulating in maternal peripheral blood. Carry your recent pregnancy ultrasound report to confirm gestational age and singleton or twin pregnancy details.'
      },
      {
        question: 'Is fasting required before {service} blood sample collection?',
        answer: 'No, fasting is generally not required before {service} blood collection. Expectant mothers in {location} can eat and drink normally before their clinic visit or home blood sample pickup.'
      },
      {
        question: 'How long does it take to receive {service} results?',
        answer: 'NIPT Basic, Comprehensive, and Advanced reports have a standard turnaround time (TAT) of 7 to 10 days from maternal blood collection, following Next-Generation Sequencing (NGS) analysis and verification by MD Molecular Genetics and Pathology specialists.'
      },
      {
        question: 'Does a High-Risk {service} result confirm Down syndrome or another chromosomal condition?',
        answer: 'No. NIPT is a high-sensitivity prenatal screening test, not a diagnostic test. A high-risk result indicates an increased probability of conditions such as Trisomy 21 (Down syndrome), Trisomy 18, or Trisomy 13 and should always be followed by genetic counselling and confirmatory diagnostic testing such as Chorionic Villus Sampling (CVS) or Amniocentesis.'
      }
    ]
  },

  // ─── BLOOD TESTS & PATHOLOGY (6 FAQs) ──
  {
    servicePattern: 'blood-test|lab-test|pathology-test|cbc|lipid-profile|thyroid-test|thyroid-profile|liver-function|kidney-function|diabetes-test|hba1c|vitamin-d|vitamin-b12|iron-profile|urine-test|stool-test|hormone-test|allergy-test|tumor-marker|infection-test|covid|dengue|malaria|typhoid|home-blood-collection',
    faqs: [
      {
        question: 'What is the cost of {service} at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} is highly affordable — starting from just ₹250 for basic tests like CBC, with comprehensive profiles priced 40-50% below market rates. We believe accurate diagnostics should be accessible to everyone. Visit our pricing page or call us for exact test-wise pricing. Combo packages and health checkups offer additional discounts.'
      },
      {
        question: 'Do I need to fast before a {service}?',
        answer: 'Fasting requirements depend on the specific test: (1) Fasting Required (10-12 hours) — Lipid Profile, Fasting Blood Sugar, Fasting Insulin, and some metabolic panels. (2) No Fasting Required — CBC, Thyroid Profile (TSH), HbA1c, Vitamin D, Vitamin B12, CRP, urine routine, and most hormone tests. (3) Water is allowed during fasting periods. Your prescription or our team will confirm fasting requirements when you book.'
      },
      {
        question: 'Does Henotic Diagnostics offer home blood collection in {location}?',
        answer: 'Yes! Henotic Diagnostics provides free home blood collection service across {location} and surrounding areas. Our trained phlebotomists visit your home at your preferred time, collect samples under strict cold-chain protocols, and transport them to our NABL-accredited lab. Book home collection by calling 088793 27184 or via WhatsApp. Morning slots (6 AM–10 AM) are ideal for fasting samples.'
      },
      {
        question: 'How quickly will I receive my {service} results?',
        answer: 'At Henotic Diagnostics {location}, most routine blood test reports (CBC, Blood Sugar, Thyroid, Lipid Profile, LFT, KFT) are available within 4-6 hours. Specialized tests like tumor markers, hormones, and vitamin assays are reported within 12-24 hours. Culture and sensitivity reports take 48-72 hours. All reports are delivered instantly via WhatsApp and email, with hard copies available at the center.'
      },
      {
        question: 'How is sample quality ensured for accurate results?',
        answer: 'At Henotic Diagnostics {location}, we follow rigorous pre-analytical, analytical, and post-analytical quality protocols: (1) Vacutainer-based sample collection to prevent contamination. (2) Temperature-controlled transport with cold chain compliance. (3) Automated analyzers with daily internal quality controls (IQC). (4) Participation in External Quality Assurance Schemes (EQAS) — Bio-Rad and CMC Vellore. (5) NABL accreditation ensures every {service} result meets international accuracy standards.'
      },
      {
        question: 'Can I get multiple blood tests done from a single sample?',
        answer: 'Yes, in most cases, multiple tests can be performed from a single blood draw. Our phlebotomists collect blood into different colored vacutainers (tubes) — each tube is designed for specific test categories (serum, EDTA, fluoride, citrate). This means you can get CBC, lipid profile, thyroid profile, liver function, kidney function, and vitamins tested from one visit. Combo health packages are a cost-effective way to get comprehensive testing done together.'
      }
    ]
  },

  // ─── PREGNANCY SCANS (6 FAQs) ─────
  {
    servicePattern: 'pregnancy|obstetric|dating-scan|viability|trimester|nt-scan|anomaly|target-scan|level-2|growth-scan|fetal|cervical-length|bpp|biophysical|antenatal|twin-pregnancy|multiple-pregnancy|high-risk-pregnancy',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, Pregnancy Sonography and Fetal Growth Scans start at ₹2,500 (market avg ₹3,500), NT Scan is ₹3,200, Fetal Doppler is ₹3,500, and Anomaly (Level 2) Scans and Fetal Echocardiography are ₹4,500 (market avg ₹5,500). Our fetal medicine specialist ensures thorough evaluation at every stage.'
      },
      {
        question: 'When should I get each pregnancy scan done?',
        answer: 'The recommended pregnancy scan schedule is: (1) Dating/Viability Scan — 6-8 weeks (confirms pregnancy and heartbeat). (2) NT Scan — 11-14 weeks (screens for Down syndrome risk). (3) Anomaly Scan (Level 2) — 18-22 weeks (detailed structural evaluation of the baby). (4) Growth Scan — 28-32 weeks and 34-36 weeks (monitors fetal growth and amniotic fluid). (5) Fetal Doppler — as advised by doctor for high-risk pregnancies. (6) Fetal Echocardiography — 22-24 weeks (detailed heart evaluation). Your obstetrician will customize this schedule.'
      },
      {
        question: 'Is {service} safe for my baby?',
        answer: 'Yes, {service} is completely safe for both mother and baby. Obstetric ultrasound uses harmless sound waves (not radiation) and has been used safely in prenatal care for over 40 years worldwide. All our scans follow international safety guidelines (ALARA principle for ultrasound) and ISUOG (International Society of Ultrasound in Obstetrics and Gynecology) protocols. Scans are performed by an experienced fetal medicine specialist.'
      },
      {
        question: 'What preparation is needed before a {service}?',
        answer: 'For early pregnancy scans (first trimester, dating scan, NT scan) — a moderately full bladder is recommended for better image quality. Drink 2-3 glasses of water about 30-45 minutes before your appointment. For second and third trimester scans (anomaly scan, growth scan) — no special preparation is required. Wear comfortable, two-piece clothing for easy access to the abdomen. Bring all previous scan reports and your prescription.'
      },
      {
        question: 'What does the anomaly scan (Level 2 scan) check for?',
        answer: 'The anomaly scan (also called the Level 2 or TIFFA scan) is a detailed ultrasound performed between 18-22 weeks of pregnancy. It systematically evaluates: (1) Brain and skull structure. (2) Facial features (lips, palate). (3) Spine integrity. (4) Heart chambers and vessels. (5) Abdominal organs (stomach, kidneys, bladder). (6) Limbs, hands, and feet. (7) Placenta position and amniotic fluid volume. (8) Umbilical cord. At Henotic Diagnostics {location}, this scan is performed by a certified fetal medicine specialist for maximum accuracy.'
      },
      {
        question: 'Does Henotic Diagnostics {location} comply with the PCPNDT Act?',
        answer: 'Absolutely. Henotic Diagnostics {location} strictly complies with the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994, and all its amendments. We are a registered and licensed ultrasound facility. Sex determination of the fetus is a punishable offense and is strictly prohibited at our center. Every prenatal ultrasound is performed by qualified, registered sonologists, and all records are maintained as per government regulations.'
      }
    ]
  },

  // ─── CARDIOLOGY (6 FAQs) ──────────
  {
    servicePattern: 'ecg|electrocardiogram|2d-echo|echo-test|echocardiography|color-echo|stress-echo|dobutamine|tmt-test|stress-test|holter|ambulatory-ecg|ambulatory-bp|bp-monitoring|heart-screening|cardiac-screening|cardiac-risk|cardiac-evaluation|heart-health|cardiac-health|angiography|angioplasty|tavr|cardiac-catheterization',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'Cardiac diagnostics at Henotic Diagnostics {location} are transparently priced: ECG starts at ₹200, TMT (Treadmill Stress Test) at ₹2,800, 2D Echo at ₹3,000, Stress Echo at ₹3,500, and 24-hour Holter Monitoring at ₹6,500 — saving 24-50% compared to hospital rates. All cardiac tests are interpreted by qualified cardiologists.'
      },
      {
        question: 'What is the difference between ECG, 2D Echo, and TMT?',
        answer: 'Each cardiac test serves a different purpose: (1) ECG (Electrocardiogram) — records the heart\'s electrical activity in rest; takes 5 minutes; detects rhythm abnormalities, heart blocks, and ischemic changes. (2) 2D Echocardiography (Echo) — ultrasound of the heart; takes 20-30 minutes; evaluates heart chambers, valves, pumping function (EF%), and structural defects. (3) TMT (Treadmill Test) — ECG recorded while walking on a treadmill; takes 15-20 minutes; evaluates heart performance under stress; screens for coronary artery disease. Your cardiologist will recommend the appropriate test based on symptoms.'
      },
      {
        question: 'What preparation is needed for a {service}?',
        answer: 'Preparation varies by test: (1) ECG — no preparation; avoid applying body lotion on the chest area. (2) 2D Echo — no preparation needed; wear a front-open/loose top. (3) TMT — wear comfortable walking shoes and loose clothing; avoid heavy meals 2 hours before; continue regular medications unless your doctor advises otherwise; do NOT skip heart medications without consulting your doctor. (4) Holter Monitor — wear a button-down shirt for easy attachment; the monitor is worn for 24-72 hours during normal daily activities.'
      },
      {
        question: 'Who should get a cardiac screening done?',
        answer: 'Cardiac screening is recommended for: (1) Anyone aged 40+ years (even without symptoms). (2) Patients with diabetes, high BP, high cholesterol, or obesity. (3) Smokers and those with a family history of heart disease. (4) People experiencing chest pain, breathlessness, palpitations, or dizziness. (5) Athletes and fitness enthusiasts before starting intense exercise programs. (6) Pre-surgery cardiac clearance. At Henotic Diagnostics {location}, we offer comprehensive cardiac health packages combining ECG, 2D Echo, lipid profile, and blood sugar at discounted rates.'
      },
      {
        question: 'How long does a Holter monitoring test take?',
        answer: 'Holter monitoring at Henotic Diagnostics {location} involves wearing a small, portable ECG recorder that continuously records your heart rhythm for 24, 48, or 72 hours (as prescribed by your cardiologist). The device is attached painlessly with adhesive patches on your chest and can be worn during normal daily activities including sleeping, working, and light exercise. Avoid bathing/showering while wearing the device. After the monitoring period, return the device to our center, and the detailed report is prepared by our cardiologist within 24 hours.'
      },
      {
        question: 'Are cardiac tests at Henotic Diagnostics {location} interpreted by cardiologists?',
        answer: 'Yes, all cardiac diagnostic tests at Henotic Diagnostics {location} — including ECG, 2D Echocardiography, TMT, Stress Echo, and Holter Monitoring — are interpreted and reported by qualified cardiologists (DM Cardiology / DNB Cardiology). This ensures clinical accuracy and meaningful correlation with your symptoms. Our cardiologists are available for post-report consultations to explain findings and recommend next steps if needed.'
      }
    ]
  },

  // ─── PET CT & NUCLEAR MEDICINE (5 FAQs) ──
  {
    servicePattern: 'pet-scan|pet-ct|pet-cancer|fdg-pet|oncology-pet|cardiac-pet|neurology-pet|spect|nuclear-medicine|dtpa-scan|ec-scan|ec-renal-scan|renal-scan|renal-function-scan|mag3-scan|^bone-scan$|bone-scintigraphy|thyroid-scan|thyroid-scintigraphy|thyroid-uptake|parathyroid-scan|gfr-test|myocardial-perfusion|lung-perfusion|gastric-emptying|hepatobiliary|fapi|dota|dopa|psma',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, nuclear medicine and SPECT studies (Thyroid, Gastric Emptying, Hepatobiliary, DTPA, Renal, and Bone Scans) start from ₹5,500-10,500, Whole Body FDG PET CT is ₹14,500 (market avg ₹16,500), and specialty tracer scans (PSMA, DOTA, FAPI, DOPA PET CT) are ₹25,500 (market avg ₹30,500). Pricing includes the radiotracer, scan, and nuclear medicine specialist report with zero hidden fees.'
      },
      {
        question: 'What preparation is required before a {service}?',
        answer: 'Preparation for {service} is critical for accurate results: (1) Fast for 6 hours before the scan (water is allowed). (2) Avoid strenuous exercise for 24 hours before the scan. (3) Diabetic patients — blood sugar must be below 200 mg/dL at the time of scan; your doctor may adjust insulin/medication timing. (4) Inform us about any recent surgery, chemotherapy, or radiation therapy (a gap of 4-6 weeks is recommended). (5) Wear comfortable clothing without metal. (6) Bring all previous scan reports, biopsy reports, and your prescription.'
      },
      {
        question: 'How long does a {service} take?',
        answer: 'A {service} at Henotic Diagnostics {location} takes approximately 2-3 hours in total: (1) Registration and blood sugar check — 15 minutes. (2) FDG radiotracer injection — 5 minutes. (3) Resting/uptake period — 60-90 minutes (you rest quietly in a private room while the tracer distributes). (4) Actual PET CT scan — 20-30 minutes. Please plan to be at the center for about 3 hours. Reports are typically available within 24-48 hours.'
      },
      {
        question: 'What cancers can PET CT detect?',
        answer: 'PET CT is one of the most powerful tools for cancer detection, staging, and treatment monitoring. It can detect: (1) Lung cancer. (2) Lymphoma (Hodgkin\'s and Non-Hodgkin\'s). (3) Head and neck cancers. (4) Breast cancer. (5) Colorectal cancer. (6) Esophageal cancer. (7) Melanoma. (8) Cervical and uterine cancer. (9) Thyroid cancer. (10) Unknown primary tumors. PET CT detects cancer based on metabolic activity, often identifying disease before anatomical changes are visible on CT or MRI. It also evaluates treatment response after chemotherapy or radiation.'
      },
      {
        question: 'Is the radiation from {service} harmful?',
        answer: 'The radiation dose from a {service} is relatively small and considered safe for diagnostic purposes. The FDG radiotracer has a very short half-life (about 2 hours) and is naturally eliminated from the body within 6-12 hours. At Henotic Diagnostics {location}, we follow strict AERB guidelines and use optimized protocols to keep radiation doses as low as reasonably achievable (ALARA principle). The diagnostic benefit of PET CT in cancer evaluation far outweighs the minimal radiation risk. We recommend drinking plenty of water after the scan to help flush the tracer.'
      }
    ]
  },

  // ─── DEXA BONE SCAN (4 FAQs) ──────
  {
    servicePattern: 'dexa|bone-density|bmd-test|osteoporosis',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} is ₹4,000, compared to the market rate of ₹6,500 at hospitals — saving 38%. This includes scanning of the lumbar spine and hip (the two most critical sites for osteoporosis assessment), detailed T-score and Z-score reporting, and specialist interpretation with no hidden charges.'
      },
      {
        question: 'Who should get a {service} done?',
        answer: 'A {service} is recommended for: (1) All women aged 50+ years (especially post-menopausal). (2) All men aged 65+ years. (3) Anyone with a history of fractures from minor falls. (4) Patients on long-term steroid or anti-epileptic medications. (5) People with rheumatoid arthritis, thyroid disorders, or low vitamin D. (6) Individuals with a family history of osteoporosis or hip fractures. (7) Those with low body weight or a sedentary lifestyle. Early detection through DEXA can prevent debilitating osteoporotic fractures.'
      },
      {
        question: 'What preparation is required for a {service}?',
        answer: 'A {service} requires minimal preparation: (1) No fasting needed. (2) Wear loose, comfortable clothing without metal buttons, zippers, or buckles. (3) Do not take calcium supplements for 24 hours before the test. (4) Inform the technician if you have had a barium study or contrast CT/MRI in the past 7 days. (5) Remove any metal jewelry or belt before the scan. The scan itself is painless, takes only 10-15 minutes, and uses a very low dose of radiation — less than a chest X-ray.'
      },
      {
        question: 'What do the DEXA T-score results mean?',
        answer: 'Your DEXA scan report includes a T-score that compares your bone density to a healthy young adult: (1) T-score above -1.0 = Normal bone density. (2) T-score between -1.0 and -2.5 = Osteopenia (low bone mass — early warning). (3) T-score below -2.5 = Osteoporosis (significantly reduced bone density — treatment needed). (4) T-score below -2.5 with a fracture history = Severe Osteoporosis. At Henotic Diagnostics {location}, our report includes detailed interpretation and recommendations. Follow-up DEXA is typically recommended every 1-2 years to monitor bone health.'
      }
    ]
  },

  // ─── FIBROSCAN (4 FAQs) ───────────
  {
    servicePattern: 'fibroscan|liver-fibroscan|liver-elastography|hepatic-elastography|fatty-liver|liver-health|liver-screening|liver-fibrosis|liver-stiffness|cirrhosis-screening|chronic-liver',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} is ₹4,500, compared to ₹5,500 at most hospitals — saving 18%. This includes the full liver stiffness measurement (LSM) and controlled attenuation parameter (CAP) score for fatty liver grading, interpreted by experienced specialists.'
      },
      {
        question: 'What preparation is required before a {service}?',
        answer: 'Preparation for {service} is simple: (1) Fast for 3-4 hours before the test (empty stomach gives more accurate readings). (2) Avoid consuming alcohol for at least 48 hours before the scan. (3) Wear comfortable clothing that allows easy access to the right side of your abdomen. (4) Bring previous liver test reports (LFT, ultrasound) for comparison. The test is completely painless and non-invasive — no needles, no radiation.'
      },
      {
        question: 'What does a Fibroscan measure and who needs it?',
        answer: 'Fibroscan measures two key parameters: (1) Liver Stiffness (kPa) — indicates the degree of liver fibrosis (scarring), from F0 (no fibrosis) to F4 (cirrhosis). (2) CAP Score (dB/m) — quantifies the amount of fat in the liver, grading fatty liver from S0 to S3. It is recommended for: patients with fatty liver disease (NAFLD/NASH), chronic hepatitis B or C, alcohol-related liver disease, diabetes with suspected liver involvement, abnormal liver function tests, and patients on hepatotoxic medications. It replaces the need for painful liver biopsy in most cases.'
      },
      {
        question: 'Is Fibroscan better than a liver biopsy?',
        answer: 'For most patients, Fibroscan is an excellent non-invasive alternative to liver biopsy: (1) Painless — no needles, no sedation. (2) No risk — no bleeding, infection, or complications. (3) Results in minutes — instant liver stiffness and fat score. (4) Repeatable — can be done periodically to monitor treatment response. (5) Equally accurate — Fibroscan has been validated in numerous clinical studies and correlates well with biopsy results for staging fibrosis. Liver biopsy is only needed in rare, complex cases where Fibroscan findings are inconclusive or a specific histological diagnosis is required. At Henotic Diagnostics {location}, we use the latest FibroScan® (Echosens) device for maximum accuracy.'
      }
    ]
  },

  // ─── COLOR DOPPLER & VASCULAR STUDIES (4 FAQs) ──
  {
    servicePattern: 'color-doppler|doppler-scan|arterial-doppler|venous-doppler|vascular-doppler|vascular-color-doppler|carotid-doppler|carotid-artery-doppler|renal-doppler|uterine-artery-doppler|uterine-doppler|umbilical-artery-doppler|middle-cerebral-artery-doppler|lower-limb-doppler|upper-limb-doppler|peripheral-arterial-doppler|venous-insufficiency-scan|deep-vein-thrombosis-scan|dvt-doppler',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, Carotid Artery Doppler is priced at ₹1,500 (market avg ₹2,800), Arterial, Venous, Upper Limb, and DVT Color Doppler studies start at ₹2,800 (market avg ₹4,000), and single-part Color Doppler, Renal Artery Doppler, and Lower Limb Doppler are ₹3,000 — saving up to 46% with zero hidden fees.'
      },
      {
        question: 'What preparation is needed before a {service}?',
        answer: 'Most {service} scans (carotid, upper limb, lower limb, arterial, and venous DVT Doppler) require no fasting or special preparation. For a Renal Artery Doppler or Abdominal Doppler, fasting for 6 hours helps reduce bowel gas for clearer visualization. For pregnancy uterine or umbilical Doppler studies, drink 1-2 glasses of water before your appointment and carry your antenatal records.'
      },
      {
        question: 'What conditions does a {service} detect?',
        answer: 'A {service} evaluates live blood flow speed and direction through arteries and veins using radiation-free high-frequency ultrasound. It accurately detects deep vein thrombosis (DVT), varicose vein venous insufficiency, peripheral arterial blockages, carotid plaque narrowing, renal artery stenosis, and feto-placental blood flow resistance.'
      },
      {
        question: 'How long does a {service} take and when are reports ready?',
        answer: 'A {service} typically takes 20-35 minutes depending on whether one or both limbs or multiple vessels are evaluated. Our senior radiologists and sonologists prepare detailed waveform and velocity reports within 1-2 hours, delivered digitally on WhatsApp and email with printed films on request.'
      }
    ]
  },

  // ─── BREAST IMAGING & MAMMOGRAPHY (4 FAQs) ──
  {
    servicePattern: 'mammography|sonomammography|breast-imaging|breast-screening|breast-cancer-screening|breast-diagnostics|digital-breast-tomosynthesis|3d-breast-imaging',
    faqs: [
      {
        question: 'How much does {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, 3D Mammography (Tomosynthesis) and Bilateral Sonomammography (Breast Ultrasound) are priced at ₹2,500 (market avg ₹3,500-4,500), and Digital Mammography is ₹3,000 (market avg ₹4,500) — saving 29-44%. All scans are interpreted by MD radiologists specialized in women\'s imaging.'
      },
      {
        question: 'Are female radiographers available for {service}?',
        answer: 'Yes. At Henotic Diagnostics {location}, {service} examinations are performed by trained female technologists in a private, comfortable suite, ensuring utmost dignity and patient ease throughout the scan.'
      },
      {
        question: 'What is the best time and preparation for {service}?',
        answer: 'For pre-menopausal women, schedule your {service} about one week after your menstrual period ends, when breasts are least tender. On the day of the exam, avoid applying deodorants, antiperspirants, talcum powder, or body lotions under your arms or on your breasts, wear a two-piece outfit, and bring prior mammograms or ultrasound films for comparison.'
      },
      {
        question: 'Does {service} include BI-RADS grading in the report?',
        answer: 'Yes. Every mammography and sonomammography report includes standardized BI-RADS (Breast Imaging-Reporting and Data System) classification along with detailed density notes and clinical follow-up guidance, delivered within 2-6 hours (or same-day for combined tomosynthesis review).'
      }
    ]
  },

  // ─── WOMEN\'S FERTILITY & REPRODUCTIVE IMAGING (4 FAQs) ──
  {
    servicePattern: 'follicular-study|fertility-scan|fertility-assessment|fertility-monitoring|ovulation-study|ovulation-monitoring|reproductive-health-screening|pelvic-scan-for-fertility|hsg-test|ssg-test',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, Follicular Study / Ovulation Monitoring starts at ₹600 per visit (market avg ₹1,200), Pelvic Fertility Ultrasound is ₹1,800 (market avg ₹2,500), SSG (Sonosalpingography) is ₹3,000 (market avg ₹4,500), and HSG (Hysterosalpingography) is ₹3,500 (market avg ₹5,000) — saving 28-50%.'
      },
      {
        question: 'When in my menstrual cycle should I schedule a {service}?',
        answer: 'Cycle timing depends on the investigation: (1) Baseline fertility scans and Antral Follicle Counts (AFC) are typically performed on Day 2 or Day 3 of menstruation. (2) Serial follicular tracking starts around Day 8-10 and repeats every 2-3 days until ovulation. (3) Tubal patency tests like HSG and SSG are best scheduled between Day 7 and Day 11, after bleeding stops and before ovulation.'
      },
      {
        question: 'What is the difference between HSG and SSG tubal patency tests?',
        answer: 'Both HSG (Hysterosalpingography) and SSG (Sonosalpingography) assess fallopian tube patency and uterine cavity shape. HSG uses low-dose fluoroscopic X-ray imaging with water-soluble contrast media, whereas SSG uses painless saline ultrasound without any ionizing radiation. Your fertility specialist or gynecologist will advise whichever suits your clinical workup.'
      },
      {
        question: 'Are fertility scans conducted privately by female sonologists?',
        answer: 'Yes. At Henotic Diagnostics {location}, pelvic fertility scans and serial follicular monitoring are performed in dedicated private suites with female staff and experienced reproductive imaging specialists, with rapid WhatsApp reporting to share immediately with your gynecologist or IVF clinic.'
      }
    ]
  },

  // ─── IMAGE-GUIDED BIOPSY & FNAC (4 FAQs) ──
  {
    servicePattern: 'guided-fnac|guided-biopsy',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, Ultrasound-Guided FNAC is priced at ₹2,500 (market avg ₹4,000, saving 38%), and Image-Guided Core Needle Tissue Biopsy is ₹5,500 (market avg ₹8,500, saving 35%). Charges cover procedural ultrasound/CT guidance and specialist intervention with transparent lab histopathology options.'
      },
      {
        question: 'Is a {service} painful or performed under anesthesia?',
        answer: 'A {service} is a minimally invasive outpatient procedure performed under local anesthesia (for core needle biopsies) or with fine 23G-25G needles (for FNAC), causing minimal brief discomfort similar to a routine injection. Real-time ultrasound or CT guidance ensures pinpoint needle accuracy on the first pass.'
      },
      {
        question: 'What preparation is required before a {service}?',
        answer: 'Before an image-guided biopsy or FNAC: (1) Inform our interventional radiologist if you take blood thinners or antiplatelets (aspirin, clopidogrel, warfarin, apixaban), as they may need temporary physician-approved pause. (2) Coagulation profile (PT/INR, platelet count) is advised prior to core biopsy. (3) Carry all prior ultrasound, CT, MRI, or PET-CT scans.'
      },
      {
        question: 'How long do cytopathology or histopathology results take after {service}?',
        answer: 'Guided FNAC cytology reports are typically ready within 24-48 hours, while Image-Guided Core Biopsy histopathology and immunohistochemistry (IHC) results take 3-5 working days. Digital reports are shared securely via WhatsApp and our online portal.'
      }
    ]
  },

  // ─── GUT MICROBIOME & STOOL SEQUENCING (4 FAQs) ──
  {
    servicePattern: 'gut-microbiome|gut-health-test|stool-microbiome|gut-dysbiosis|gut-flora|microbiome-dna-sequencing',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, Gut Microbiome and Comprehensive Gut Health tests start at ₹6,500 (market avg ₹9,500), Stool Microbiome Analysis is ₹7,500 (market avg ₹11,000), and full 16S/Shotgun Microbiome DNA Sequencing is ₹9,500 (market avg ₹14,000) — saving 32% with doorstep collection kit delivery.'
      },
      {
        question: 'How is the sample collected for {service} in {location}?',
        answer: 'Sample collection for {service} is simple, hygienic, and done from the privacy of your home across {location}. We deliver a sterile DNA-stabilizing stool collection kit to your doorstep and arrange cold-chain pickup back to our molecular genomics laboratory.'
      },
      {
        question: 'What does a {service} report tell me about my digestive health?',
        answer: 'Using next-generation DNA sequencing (16S rRNA or whole shotgun metagenomics), {service} profiles beneficial vs opportunistic gut bacteria, diversity score, dysbiosis index, short-chain fatty acid (SCFA) production potential, and gut inflammation insights to guide targeted probiotic, prebiotic, and dietary plans.'
      },
      {
        question: 'Should I stop probiotics or antibiotics before taking {service}?',
        answer: 'For the most accurate baseline gut flora profile, avoid antibiotics for 2-4 weeks before sample collection if clinically safe (always consult your prescribing doctor first), and pause non-essential probiotic supplements 3-5 days prior. Reports are delivered digitally within 10-14 working days.'
      }
    ]
  },

  // ─── GENETIC TESTING & GENOMIC SEQUENCING (NGS) (5 FAQs) ──
  {
    servicePattern: 'prenatal-test|prenatal-genetic-testing|karyotype-test|chromosomal-analysis|chromosomal-testing|chromosome-analysis|genetic-test|genetic-screening|genetic-counselling|carrier-screening|carrier-testing|dna-test|dna-analysis|paternity-test|relationship-dna-test|molecular-diagnostics|cytogenetics|fertility-genetic|reproductive-genetics|whole-exome-sequencing|whole-genome-sequencing|clinical-exome-sequencing|targeted-gene-panel|next-generation-sequencing|trio-whole-exome|rna-sequencing|transcriptome-sequencing|exome-plus-sequencing|mitochondrial-genome|long-read-genome|copy-number-variation|chromosomal-microarray|whole-transcriptome-sequencing|metagenomic-sequencing|16s-rrna-sequencing|cell-free-dna-sequencing|liquid-biopsy-ngs|somatic-tumor-sequencing|germline-sequencing',
    faqs: [
      {
        question: 'How much does {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, Karyotype Analysis starts at ₹3,500, Genetic Carrier Screening is ₹6,500, Targeted NGS Panels are ₹12,500, Chromosomal Microarray (CMA) is ₹13,500, Clinical Exome Sequencing (CES) is ₹14,500, Whole Exome Sequencing (WES) is ₹19,500, Liquid Biopsy NGS is ₹28,500, and Whole Genome Sequencing (WGS) is ₹45,000 — saving 28-42% below hospital reference rates.'
      },
      {
        question: 'What is the difference between Karyotype, Clinical Exome, and Whole Exome Sequencing?',
        answer: 'Karyotyping examines visible chromosome number and large structural rearrangements (e.g., translocation or Trisomy). Clinical Exome Sequencing (CES) analyzes ~5,000-8,000 genes known to cause inherited human diseases, whereas Whole Exome Sequencing (WES) covers all ~20,000 protein-coding genes for rare, undiagnosed, or complex syndromes. Chromosomal Microarray (CMA) detects sub-microscopic copy number variants (CNVs).'
      },
      {
        question: 'What sample is required and is fasting needed for {service}?',
        answer: 'Most blood-based {service} panels require only a 4-6 mL peripheral EDTA blood draw (or cheek swab for relationship DNA testing). No fasting is needed — you can eat and drink normally, and we provide free doorstep phlebotomy collection across {location}. Tumor somatic panels use FFPE tissue blocks or plasma for ctDNA liquid biopsy.'
      },
      {
        question: 'Do you provide pre- and post-test genetic counselling?',
        answer: 'Yes. All complex cytogenetic, hereditary oncology, reproductive carrier, and NGS sequencing tests include expert report interpretation by MD Molecular Pathologists and access to certified genetic counselling so your family and physician can clearly act on ACMG-classified variants.'
      },
      {
        question: 'What is the turnaround time for {service} reports?',
        answer: 'Targeted PCR and cytogenetic Karyotype reports typically take 7-14 days, Chromosomal Microarray takes 10-14 days, and Clinical Exome, Whole Exome, Whole Genome, or Liquid Biopsy NGS reports are finalized within 2-4 weeks depending on trio analysis and bioinformatics validation.'
      }
    ]
  },

  // ─── UROLOGY & URODYNAMICS (4 FAQs) ──
  {
    servicePattern: 'uroflowmetry|urodynamic-study|complete-urodynamic-study|video-urodynamic-study|cystometry|pressure-flow-study|post-void-residual-urine|urethral-pressure-profile|leak-point-pressure-test|pelvic-floor-electromyography',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'At Henotic Diagnostics {location}, Post-Void Residual Urine (PVR) ultrasound is ₹1,000 (market avg ₹1,600), Uroflowmetry is ₹1,200 (market avg ₹2,000), Cystometry is ₹4,500 (market avg ₹6,500), and Complete Urodynamic Study (UDS) is ₹6,500-7,500 (market avg ₹9,500-11,000) — saving 31-40% with sterile single-use consumables.'
      },
      {
        question: 'What preparation is needed before a {service}?',
        answer: 'For Uroflowmetry and Post-Void Residual Urine (PVR) scans, arrive with a comfortably full bladder (drink 3-4 glasses of water 45-60 minutes prior without straining). For multi-channel Urodynamics or Cystometry, carry a recent negative urine culture report (within 7 days) and your urologist\'s prescription.'
      },
      {
        question: 'Is a {service} painful or invasive?',
        answer: 'Uroflowmetry and PVR ultrasound are 100% non-invasive and painless — you simply urinate naturally into a calibrated flow sensor funnel followed by a quick abdominal ultrasound. Cystometry and full urodynamic studies use ultra-thin sterile catheters lubricated with numbing gel for minimal mild discomfort.'
      },
      {
        question: 'How long does the test take and when are results ready?',
        answer: 'Standalone Uroflowmetry + PVR takes 15-20 minutes, while Complete Urodynamic Studies take 45-60 minutes. Flow curves, detrusor pressure traces, and specialist reports are generated promptly on the same day.'
      }
    ]
  },

  // ─── PREVENTIVE HEALTH CHECKUPS & SCREENING PACKAGES (4 FAQs) ──
  {
    servicePattern: 'health-checkup|full-body-check-up|health-screening|wellness-screening|cancer-screening',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'Preventive {service} plans at Henotic Diagnostics {location} start from affordable baseline panels at ₹999-1,499 up to comprehensive executive, cardiac, senior citizen, women\'s wellness, and diabetes screening packages — bundled at 40-50% savings compared to ordering individual blood and imaging tests separately.'
      },
      {
        question: 'What tests are included in a {service}?',
        answer: 'Packages typically combine Complete Blood Count (CBC), Fasting Blood Sugar & HbA1c, Lipid Profile, Liver Function (LFT), Kidney Function (KFT), Thyroid Profile (T3/T4/TSH), Vitamin D & B12, Urine Routine, and targeted add-ons such as ECG, 2D Echo, Ultrasound Abdomen, or tumor markers based on age and gender.'
      },
      {
        question: 'How should I prepare and can samples be collected at home in {location}?',
        answer: 'Fast for 10-12 hours overnight (plain water allowed) prior to morning sample collection so lipid and fasting glucose readings remain accurate. Free doorstep home sample collection is available across {location} from 6:00 AM daily, with in-center slots for ECG, ultrasound, or imaging add-ons.'
      },
      {
        question: 'How quickly are preventive {service} reports delivered?',
        answer: 'Routine pathology blood and urine panels inside your {service} are verified by MD Pathologists and delivered digitally via WhatsApp, email, and the patient portal within 6-12 hours, with same-day physician guidance on key risk markers.'
      }
    ]
  },

  // ─── DIAGNOSTIC CENTERS, IMAGING & PATHOLOGY HUBS (4 FAQs) ──
  {
    servicePattern: 'diagnostic-center|medical-imaging-center|radiology-center|pathology-lab|diagnostic-lab|diagnostic-services|medical-diagnostics|diagnostic-imaging|medical-imaging|radiology-services',
    faqs: [
      {
        question: 'What tests and scans are available under {service} in {location}?',
        answer: 'Henotic Diagnostics serving {location} brings high-field MRI, 128-slice CT, PET-CT & Nuclear Medicine, 4D/3D Ultrasound & Color Doppler, Digital Mammography, ECG/2D Echo/TMT/Holter, DEXA Bone Scan, Fibroscan, Urodynamics, and NABL-certified Pathology & NGS Genomics under one integrated diagnostic network.'
      },
      {
        question: 'How much can patients save at Henotic Diagnostics {location}?',
        answer: 'Patients save 20-50% across MRI, CT, PET-CT, Ultrasound, and Pathology compared to private hospital tariffs — starting from ₹200 for ECG, ₹250 for CBC, ₹1,800 for Ultrasound, ₹3,500 for CT Brain, ₹4,500 for MRI Scan, and ₹14,500 for Whole Body FDG PET-CT — with cashless TPA/insurance assistance where eligible.'
      },
      {
        question: 'Are your labs and imaging modalities NABL, ISO, and AERB certified?',
        answer: 'Yes. Our diagnostic operations follow NABL and ISO 9001:2015 laboratory quality protocols with Bio-Rad/CMC Vellore EQAS participation, AERB radiation safety compliance, PCPNDT registration for prenatal scans, and 24/7 operation including Sundays and public holidays.'
      },
      {
        question: 'Does Henotic Diagnostics {location} provide free home collection and rapid reports?',
        answer: 'Yes. Doorstep blood, urine, and microbiome sample collection is available across {location} for pathology and genetic tests, with routine blood and ultrasound reports delivered in 2-6 hours directly on WhatsApp, email, and our patient portal.'
      }
    ]
  }
];

// ────────────────────────────────────
// Dynamic FAQ Generator
// ────────────────────────────────────

/**
 * Generates contextual FAQs for a specific service and location.
 * Replaces {service} and {location} placeholders with actual values.
 * Returns universal FAQs + matching category-specific FAQs.
 */
export function getFAQsForService(
  serviceSlug: string,
  serviceName: string,
  locationName?: string
): FAQ[] {
  const location = locationName || 'Navi Mumbai';

  // Helper to replace placeholders in a single FAQ
  const replacePlaceholders = (faq: FAQ): FAQ => ({
    question: faq.question.replace(/\{service\}/g, serviceName).replace(/\{location\}/g, location),
    answer: faq.answer.replace(/\{service\}/g, serviceName).replace(/\{location\}/g, location)
  });

  // Start with universal FAQs
  const contextualFAQs: FAQ[] = UNIVERSAL_FAQS.map(replacePlaceholders);

  // Find matching category templates
  for (const template of SERVICE_FAQ_TEMPLATES) {
    try {
      const regex = new RegExp(template.servicePattern, 'i');
      if (regex.test(serviceSlug)) {
        contextualFAQs.push(...template.faqs.map(replacePlaceholders));
        break; // Use first matching template only to avoid duplicates
      }
    } catch {
      // Skip invalid regex patterns gracefully
      continue;
    }
  }

  return contextualFAQs;
}

/**
 * Returns only the category-specific FAQs (without universal) for a service.
 * Useful when universal FAQs are displayed separately.
 */
export function getCategoryFAQsForService(
  serviceSlug: string,
  serviceName: string,
  locationName?: string
): FAQ[] {
  const location = locationName || 'Navi Mumbai';

  const replacePlaceholders = (faq: FAQ): FAQ => ({
    question: faq.question.replace(/\{service\}/g, serviceName).replace(/\{location\}/g, location),
    answer: faq.answer.replace(/\{service\}/g, serviceName).replace(/\{location\}/g, location)
  });

  for (const template of SERVICE_FAQ_TEMPLATES) {
    try {
      const regex = new RegExp(template.servicePattern, 'i');
      if (regex.test(serviceSlug)) {
        return template.faqs.map(replacePlaceholders);
      }
    } catch {
      continue;
    }
  }

  return [];
}
