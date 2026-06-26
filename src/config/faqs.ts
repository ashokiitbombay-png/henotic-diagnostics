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
    servicePattern: 'ct-scan|ct-brain|hrct|ct-abdomen|ct-angiography|ct-pulmonary|ct-kub|ct-spine|ct-neck|ct-pns|ct-colonography|ct-enterography|ct-urology|ct-guided|whole-body-ct|contrast-ct|low-dose-ct|lung-cancer-screening|chest-ct|ct-temporal|ct-face|ct-orbit',
    faqs: [
      {
        question: 'What is the cost of {service} at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} starts from ₹2,000-2,500 for plain scans, which is 40-50% lower than market rates of ₹4,000-6,000. Contrast-enhanced CT scans and specialized studies like CT angiography may have different pricing. We offer transparent, upfront pricing with no hidden fees. Call us or WhatsApp for the exact cost based on your doctor\'s prescription.'
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
        answer: 'An {service} at Henotic Diagnostics {location} is priced from just ₹800, compared to the market rate of ₹1,200-2,000 — saving you up to 50%. Specialized ultrasounds (whole abdomen, Doppler, guided procedures) may have different pricing. All our ultrasounds are performed by experienced sonologists using high-resolution equipment. Contact us for exact pricing based on your requirement.'
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
        answer: 'The cost of {service} at Henotic Diagnostics {location} starts from ₹1,000 for basic pregnancy scans and goes up to ₹2,500 for advanced scans like fetal echocardiography — all priced 40-50% lower than hospital rates. Our fetal medicine specialist ensures thorough evaluation at every scan. Contact us for exact pricing based on your gestational stage and clinical requirement.'
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
    servicePattern: 'ecg|electrocardiogram|2d-echo|echo-test|echocardiography|color-echo|stress-echo|dobutamine|tmt-test|stress-test|holter|ambulatory-ecg|ambulatory-bp|bp-monitoring|heart-screening|cardiac-screening|cardiac-risk|cardiac-evaluation|heart-health|cardiac-health',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} is very affordable: ECG starts at ₹200, 2D Echo at ₹1,500, TMT at ₹1,000, and Holter Monitoring at ₹1,500 — all priced 40-50% lower than hospital rates. All cardiac tests are interpreted by qualified cardiologists. Call us for exact pricing or ask about our cardiac health checkup package for comprehensive evaluation.'
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

  // ─── PET CT (5 FAQs) ──────────────
  {
    servicePattern: 'pet-scan|pet-ct|pet-cancer|fdg-pet|oncology-pet|cardiac-pet|neurology-pet',
    faqs: [
      {
        question: 'How much does a {service} cost at Henotic Diagnostics {location}?',
        answer: 'The cost of {service} at Henotic Diagnostics {location} starts from ₹12,000, compared to the market rate of ₹18,000-25,000 at most hospitals — saving you 40-50%. This includes the FDG radiotracer, the scan, and the specialist interpretation. Our PET CT scans are reported by nuclear medicine physicians with 15+ years of experience. Contact us for exact pricing and available appointment slots.'
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
        answer: 'The cost of {service} at Henotic Diagnostics {location} is just ₹1,200, compared to the market rate of ₹2,000-3,000 at hospitals. This includes scanning of the lumbar spine and hip (the two most critical sites for osteoporosis assessment), detailed T-score and Z-score reporting, and interpretation by our specialist. No hidden charges — transparent pricing guaranteed.'
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
        answer: 'The cost of {service} at Henotic Diagnostics {location} is just ₹2,000, compared to ₹3,000-5,000 at most hospitals — saving you over 40%. This includes the full liver stiffness measurement (LSM) and controlled attenuation parameter (CAP) score for fatty liver grading. The scan is performed by a trained hepatologist or radiologist for accurate interpretation.'
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
