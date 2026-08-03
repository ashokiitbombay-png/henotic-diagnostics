export const services = [
  // DIAGNOSTIC CENTER & HEALTH SCREENING
  "diagnostic-center", "medical-imaging-center", "radiology-center", "pathology-lab", "diagnostic-lab", "diagnostic-services", "medical-diagnostics", "diagnostic-imaging", "medical-imaging", "radiology-services", "health-checkup", "full-body-check-up", "master-health-checkup", "executive-health-checkup", "executive-health-screening", "preventive-health-checkup", "preventive-health-screening", "annual-health-checkup", "corporate-health-checkup", "employee-health-checkup", "pre-employment-health-checkup", "wellness-screening", "health-screening", "women-health-checkup", "women-health-screening", "men-health-checkup", "men-health-screening", "senior-citizen-health-checkup", "senior-health-checkup", "family-health-checkup", "heart-health-checkup", "cardiac-health-checkup", "diabetes-health-checkup", "diabetes-health-screening", "cancer-screening", "cancer-screening-package",
  // PATHOLOGY & LAB TESTS
  "blood-test", "lab-test", "pathology-test", "home-blood-collection", "cbc-test", "lipid-profile", "thyroid-test", "thyroid-profile", "liver-function-test", "kidney-function-test", "diabetes-test", "hba1c-test", "vitamin-d-test", "vitamin-b12-test", "iron-profile", "urine-test", "stool-test", "hormone-test", "allergy-test", "tumor-marker-test", "infection-test", "covid-test", "dengue-test", "malaria-test", "typhoid-test",
  // ULTRASOUND & SONOGRAPHY
  "ultrasound", "sonography", "usg-scan", "abdominal-ultrasound", "pelvic-ultrasound", "abdomen-pelvis-ultrasound", "whole-abdomen-ultrasound", "whole-abdomen-sonography", "upper-abdomen-sonography", "lower-abdomen-sonography", "kidney-ultrasound", "kub-ultrasound", "prostate-ultrasound", "scrotal-ultrasound", "testicular-ultrasound", "groin-ultrasound", "inguinal-ultrasound", "thyroid-ultrasound", "breast-ultrasound", "neck-ultrasound", "neck-sonography", "parotid-ultrasound", "salivary-gland-ultrasound", "axilla-ultrasound", "soft-tissue-ultrasound", "musculoskeletal-ultrasound", "vascular-ultrasound", "small-parts-ultrasound", "transvaginal-ultrasound", "transrectal-ultrasound", "guided-ultrasound", "guided-fnac", "guided-biopsy", "ultrasound-guided-procedure",
  // PREGNANCY & FETAL MEDICINE
  "pregnancy-sonography", "obstetric-ultrasound", "early-pregnancy-scan", "pregnancy-dating-scan", "dating-scan", "viability-scan", "first-trimester-scan", "second-trimester-scan", "third-trimester-scan", "nt-scan", "anomaly-scan", "target-scan", "targeted-anomaly-scan", "level-2-scan", "growth-scan", "fetal-growth-scan", "fetal-wellbeing-scan", "fetal-weight-estimation", "cervical-length-scan", "fetal-doppler", "fetal-doppler-study", "fetal-echocardiography", "fetal-echo", "fetal-bpp", "biophysical-profile", "bpp-scan", "high-risk-pregnancy-scan", "multiple-pregnancy-scan", "twin-pregnancy-scan", "antenatal-scan", "fetal-medicine-scan",
  // DOPPLER STUDIES
  "color-doppler", "doppler-scan", "pregnancy-doppler", "obstetric-doppler", "arterial-doppler", "venous-doppler", "vascular-doppler", "vascular-color-doppler", "carotid-doppler", "carotid-artery-doppler", "renal-doppler", "uterine-artery-doppler", "uterine-doppler", "umbilical-artery-doppler", "middle-cerebral-artery-doppler", "lower-limb-doppler", "upper-limb-doppler", "peripheral-arterial-doppler", "venous-insufficiency-scan", "deep-vein-thrombosis-scan", "dvt-doppler",
  // WOMEN'S HEALTH & BREAST IMAGING
  "mammography", "digital-mammography", "3d-mammography", "sonomammography", "breast-imaging", "breast-screening", "breast-cancer-screening", "breast-diagnostics", "digital-breast-tomosynthesis", "3d-breast-imaging", "follicular-study", "fertility-scan", "fertility-assessment", "fertility-monitoring", "ovulation-study", "ovulation-monitoring", "reproductive-health-screening", "gynecology-ultrasound", "pelvic-scan-for-fertility", "hsg-test", "ssg-test",
  // MRI SERVICES
  "mri-scan", "mri-brain", "brain-mri", "mri-spine", "spine-mri", "cervical-spine-mri", "lumbar-spine-mri", "whole-spine-mri", "mri-neck", "mri-shoulder", "shoulder-mri", "mri-elbow", "mri-wrist", "mri-hand", "mri-hip", "mri-thigh", "mri-knee", "knee-mri", "mri-ankle", "mri-foot", "mri-joint", "pelvis-mri", "abdominal-mri", "mri-whole-abdomen", "breast-mri", "cardiac-mri", "mri-pituitary", "mri-orbit", "mri-face", "mri-paranasal-sinus", "mri-prostate", "mri-enterography", "mri-mrcp", "mrcp-scan", "mr-angiography", "mri-angiography", "whole-body-mri", "contrast-mri", "mri-brain-screening",
  // CT SCAN SERVICES
  "ct-scan", "hrct-scan", "hrct-chest", "ct-brain", "brain-ct-scan", "ct-neck", "ct-face", "ct-orbit", "ct-pns", "ct-temporal-bone", "ct-spine", "chest-ct-scan", "abdomen-ct-scan", "ct-abdomen-pelvis", "ct-kub", "cardiac-ct-scan", "ct-angiography", "coronary-ct-angiography", "ct-coronary-angiography", "ct-pulmonary-angiography", "ct-enterography", "ct-colonography", "ct-urology", "ct-guided-biopsy", "ct-guided-fnac", "whole-body-ct-scan", "contrast-ct-scan", "low-dose-ct", "lung-cancer-screening-ct",
  // PET CT & NUCLEAR MEDICINE
  "pet-scan", "pet-ct", "whole-body-pet-ct", "whole-body-pet-scan", "fdg-pet-ct", "oncology-pet-ct", "cardiac-pet-ct", "neurology-pet-ct", "cancer-pet-scan", "pet-cancer-screening", "spect-scan", "nuclear-medicine", "dtpa-scan", "ec-scan", "renal-scan", "renal-function-scan", "ec-renal-scan", "mag3-scan", "bone-scan", "bone-scintigraphy", "thyroid-scan", "thyroid-scintigraphy", "thyroid-uptake-scan", "parathyroid-scan", "gfr-test", "myocardial-perfusion-scan", "lung-perfusion-scan", "gastric-emptying-study", "hepatobiliary-scan", "fapi-pet-ct", "fapi-pet-scan", "dota-pet-ct", "dota-pet-scan", "dopa-scan", "dopa-pet-ct", "psma-pet-scan",
  // BONE HEALTH & DEXA
  "dexa-bone-scan", "bone-density-test", "bmd-test", "osteoporosis-screening",
  // CARDIOLOGY DIAGNOSTICS
  "ecg", "ecg-test", "electrocardiogram", "2d-echo", "2d-echo-test", "echo-test", "echocardiography", "color-echo", "stress-echo", "dobutamine-stress-echo", "tmt-test", "stress-test", "holter-monitoring", "24-hour-holter", "48-hour-holter", "72-hour-holter", "ambulatory-ecg", "ambulatory-bp-monitoring", "bp-monitoring", "24-hour-bp-monitoring", "heart-screening", "cardiac-screening", "cardiac-risk-assessment", "cardiac-evaluation",
  // CARDIAC INTERVENTIONS
  "angiography", "coronary-angiography", "angioplasty", "tavr", "cardiac-catheterization",
  // FIBROSCAN & LIVER DIAGNOSTICS
  "fibroscan", "fibroscan-test", "liver-fibroscan", "liver-elastography", "hepatic-elastography", "fatty-liver-assessment", "fatty-liver-screening", "fatty-liver-scan", "liver-health-assessment", "liver-screening", "liver-fibrosis-assessment", "liver-stiffness-test", "cirrhosis-screening", "chronic-liver-disease-screening",
  // GENETIC TESTING
  "prenatal-test", "prenatal-genetic-testing", "nipt-test", "nips-test", "nippt", "karyotype-test", "chromosomal-analysis", "chromosomal-testing", "chromosome-analysis", "genetic-test", "genetic-screening", "genetic-counselling", "genetic-counselling-service", "carrier-screening", "carrier-testing", "dna-test", "dna-analysis", "paternity-test", "relationship-dna-test", "molecular-diagnostics", "cytogenetics", "fertility-genetic-test", "fertility-genetic-screening", "reproductive-genetics", "fetal-genetic-testing",
  // GENOMIC SEQUENCING
  "whole-exome-sequencing", "whole-genome-sequencing", "clinical-exome-sequencing", "targeted-gene-panel", "next-generation-sequencing", "trio-whole-exome-sequencing", "rna-sequencing", "transcriptome-sequencing", "exome-plus-sequencing", "mitochondrial-genome-sequencing", "long-read-genome-sequencing", "copy-number-variation-analysis", "chromosomal-microarray", "whole-transcriptome-sequencing", "metagenomic-sequencing", "16s-rrna-sequencing", "cell-free-dna-sequencing", "liquid-biopsy-ngs", "somatic-tumor-sequencing", "germline-sequencing",
  // MICROBIOME TESTING
  "gut-microbiome-test", "gut-health-test", "stool-microbiome-analysis", "gut-dysbiosis-test", "gut-flora-analysis", "microbiome-dna-sequencing",
  // UROLOGY
  "uroflowmetry", "urodynamic-study", "complete-urodynamic-study", "video-urodynamic-study", "cystometry", "pressure-flow-study", "post-void-residual-urine", "urethral-pressure-profile", "leak-point-pressure-test", "pelvic-floor-electromyography",
  // AMBULANCE SERVICES
  "emergency-ambulance", "24x7-ambulance-service", "ambulance-booking", "icu-ambulance", "als-ambulance", "bls-ambulance", "ventilator-ambulance", "cardiac-ambulance", "oxygen-ambulance", "neonatal-ambulance", "pediatric-ambulance", "patient-transport-ambulance", "hospital-transfer-ambulance", "long-distance-ambulance", "wheelchair-ambulance", "stretcher-ambulance", "air-ambulance", "event-medical-ambulance", "dead-body-ambulance", "mortuary-ambulance", "freezer-box-service"
];


// ─────────────────────────────────────────────────────────────────────────────
// 🖼️ SERVICE HERO IMAGES — Dynamic hero backgrounds per service category
// ─────────────────────────────────────────────────────────────────────────────

const HERO = "https://storage.googleapis.com/wp-media-henoticbucket/Hero%20Image";

/** Direct slug → image mapping (highest priority) */
const DIRECT_HERO_MAP: Record<string, string> = {
  // 🫀 CARDIOLOGY — 2D Echo
  "2d-echo": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "2d-echo-test": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "echo-test": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "echocardiography": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "color-echo": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "stress-echo": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "dobutamine-stress-echo": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "ecg": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "ecg-test": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "electrocardiogram": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "tmt-test": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "stress-test": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "heart-screening": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "cardiac-screening": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "cardiac-risk-assessment": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "cardiac-evaluation": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "heart-health-checkup": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "cardiac-health-checkup": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "angiography": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "coronary-angiography": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "angioplasty": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "tavr": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  "cardiac-catheterization": `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`,
  // 🫀 HOLTER MONITORING
  "holter-monitoring": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  "24-hour-holter": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  "48-hour-holter": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  "72-hour-holter": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  "ambulatory-ecg": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  "ambulatory-bp-monitoring": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  "bp-monitoring": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  "24-hour-bp-monitoring": `${HERO}/holter-monitoring-henotic-diagnostics_cta.webp`,
  // 🧠 BRAIN MRI
  "mri-brain": `${HERO}/brain-mri-henotic-diagnostics_cta.webp`,
  "brain-mri": `${HERO}/brain-mri-henotic-diagnostics_cta.webp`,
  "mri-brain-screening": `${HERO}/brain-mri-henotic-diagnostics_cta.webp`,
  // 🧲 MRI SCAN (all other MRI)
  "mri-scan": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-spine": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "spine-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "cervical-spine-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "lumbar-spine-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "whole-spine-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-neck": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-shoulder": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "shoulder-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-elbow": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-wrist": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-hand": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-hip": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-thigh": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-knee": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "knee-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-ankle": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-foot": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-joint": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "pelvis-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "abdominal-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-whole-abdomen": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "breast-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "cardiac-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-pituitary": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-orbit": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-face": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-paranasal-sinus": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-prostate": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-enterography": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-mrcp": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mrcp-scan": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mr-angiography": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "mri-angiography": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "whole-body-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  "contrast-mri": `${HERO}/mri-scan-henotic-diagnostics_cta.webp`,
  // 🩻 CT BRAIN
  "ct-brain": `${HERO}/ct-brain-henotic-diagnostics_cta.webp`,
  "brain-ct-scan": `${HERO}/ct-brain-henotic-diagnostics_cta.webp`,
  // 🩻 CT SCAN (all other CT)
  "ct-scan": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "hrct-scan": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "hrct-chest": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-neck": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-face": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-orbit": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-pns": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-temporal-bone": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-spine": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "chest-ct-scan": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "abdomen-ct-scan": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-abdomen-pelvis": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-kub": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "cardiac-ct-scan": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-angiography": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "coronary-ct-angiography": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-coronary-angiography": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-pulmonary-angiography": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-enterography": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-colonography": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-urology": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-guided-biopsy": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "ct-guided-fnac": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "whole-body-ct-scan": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "contrast-ct-scan": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "low-dose-ct": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "lung-cancer-screening-ct": `${HERO}/ct-scan-henotic-diagnostics_cta.webp`,
  "dexa-bone-scan": `${HERO}/bone-density-test-henotic-diagnostics_cta.webp`,
  "bone-density-test": `${HERO}/bone-density-test-henotic-diagnostics_cta.webp`,
  "bmd-test": `${HERO}/bmd-test-henotic-diagnostics_cta.webp`,
  "osteoporosis-screening": `${HERO}/osteoporosis-screening-henotic-diagnostics_cta.webp`,
  // ☢️ PET CT & NUCLEAR MEDICINE
  "pet-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "pet-ct": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "whole-body-pet-ct": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "whole-body-pet-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "fdg-pet-ct": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "oncology-pet-ct": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "cardiac-pet-ct": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "neurology-pet-ct": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "cancer-pet-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "pet-cancer-screening": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "spect-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "nuclear-medicine": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "dtpa-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "ec-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "renal-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "renal-function-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "ec-renal-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "mag3-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "bone-scan": `${HERO}/bone-scan-henotic-diagnostics.webp`,
  "bone-scintigraphy": `${HERO}/bone-scan-henotic-diagnostics.webp`,
  "thyroid-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "thyroid-scintigraphy": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "thyroid-uptake-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "parathyroid-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "gfr-test": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "myocardial-perfusion-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "lung-perfusion-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "gastric-emptying-study": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "hepatobiliary-scan": `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`,
  "psma-pet-scan": `${HERO}/psma-pet-scan-henotic-diagnostics_cta.webp`,
  "dopa-pet-scan": `${HERO}/dopa-pet-scan-henotic-diagnostics_cta.webp`,
  // 🔬 ULTRASOUND
  "ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "usg-scan": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "abdominal-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "pelvic-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "abdomen-pelvis-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "whole-abdomen-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "whole-abdomen-sonography": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "upper-abdomen-sonography": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "lower-abdomen-sonography": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "kidney-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "kub-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "prostate-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "scrotal-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "testicular-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "groin-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "inguinal-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "thyroid-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "breast-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "neck-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "neck-sonography": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "parotid-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "salivary-gland-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "axilla-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "soft-tissue-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "musculoskeletal-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "vascular-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "small-parts-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "transvaginal-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "transrectal-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "guided-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "guided-fnac": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "guided-biopsy": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "ultrasound-guided-procedure": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  "obstetric-ultrasound": `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`,
  // 🤰 SONOGRAPHY & PREGNANCY
  "sonography": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "pregnancy-sonography": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "early-pregnancy-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "pregnancy-dating-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "dating-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "viability-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "first-trimester-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "second-trimester-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "third-trimester-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "nt-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "anomaly-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "target-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "targeted-anomaly-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "level-2-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "growth-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fetal-growth-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fetal-wellbeing-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fetal-weight-estimation": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "cervical-length-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fetal-bpp": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "biophysical-profile": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "bpp-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "high-risk-pregnancy-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "multiple-pregnancy-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "twin-pregnancy-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "antenatal-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fetal-medicine-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "follicular-study": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fertility-scan": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fertility-assessment": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "fertility-monitoring": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "ovulation-study": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "ovulation-monitoring": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "reproductive-health-screening": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "gynecology-ultrasound": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "pelvic-scan-for-fertility": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "hsg-test": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  "ssg-test": `${HERO}/sonography-henotic-diagnostics_cta.webp`,
  // 👶 FETAL ECHO
  "fetal-echocardiography": `${HERO}/fetal-2d-echo-henotic-diagnostics_cta.webp`,
  "fetal-echo": `${HERO}/fetal-2d-echo-henotic-diagnostics_cta.webp`,
  "fetal-doppler": `${HERO}/fetal-2d-echo-henotic-diagnostics_cta.webp`,
  "fetal-doppler-study": `${HERO}/fetal-2d-echo-henotic-diagnostics_cta.webp`,
  // 🔴 DOPPLER
  "color-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "doppler-scan": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "pregnancy-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "obstetric-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "arterial-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "venous-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "vascular-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "vascular-color-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "carotid-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "carotid-artery-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "renal-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "uterine-artery-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "uterine-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "umbilical-artery-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "middle-cerebral-artery-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "lower-limb-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "upper-limb-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "peripheral-arterial-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "venous-insufficiency-scan": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "deep-vein-thrombosis-scan": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  "dvt-doppler": `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`,
  // 🩺 MAMMOGRAPHY & BREAST
  "mammography": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "digital-mammography": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "3d-mammography": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "sonomammography": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "breast-imaging": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "breast-screening": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "breast-cancer-screening": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "breast-diagnostics": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "digital-breast-tomosynthesis": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  "3d-breast-imaging": `${HERO}/mammography-henotic-diagnostics_cta.webp`,
  // 🫁 FIBROSCAN & LIVER
  "fibroscan": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "fibroscan-test": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "liver-fibroscan": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "liver-elastography": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "hepatic-elastography": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "fatty-liver-assessment": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "fatty-liver-screening": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "fatty-liver-scan": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "liver-health-assessment": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "liver-screening": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "liver-fibrosis-assessment": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "liver-stiffness-test": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "cirrhosis-screening": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  "chronic-liver-disease-screening": `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`,
  // 🧬 GENETIC / NIPT
  "nipt-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "nips-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "nippt": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "prenatal-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "prenatal-genetic-testing": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "karyotype-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "chromosomal-analysis": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "chromosomal-testing": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "chromosome-analysis": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "genetic-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "genetic-screening": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "genetic-counselling": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "genetic-counselling-service": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "carrier-screening": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "carrier-testing": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "dna-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "dna-analysis": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "paternity-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "relationship-dna-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "molecular-diagnostics": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "cytogenetics": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "fertility-genetic-test": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "fertility-genetic-screening": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "reproductive-genetics": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  "fetal-genetic-testing": `${HERO}/nipt-test-henotic-diagnostics_cta.webp`,
  // 🔬 PATHOLOGY & LAB
  "pathology-lab": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "pathology-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "blood-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "lab-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "home-blood-collection": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "cbc-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "lipid-profile": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "thyroid-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "thyroid-profile": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "liver-function-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "kidney-function-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "diabetes-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "hba1c-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "vitamin-d-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "vitamin-b12-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "iron-profile": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "urine-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "stool-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "hormone-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "allergy-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "tumor-marker-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "infection-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "covid-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "dengue-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "malaria-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
  "typhoid-test": `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`,
};

/** Default hero image for services without a specific mapping */
const DEFAULT_HERO_IMAGE = `${HERO}/medical-imaging-diagnostics-henotic-diagnostics-hero-image.webp`;

/**
 * Get the hero image URL for a given service slug.
 * Priority: 1) Direct slug match → 2) Keyword fallback → 3) Default
 */
export function getHeroImageForService(slug: string): string {
  if (!slug) return DEFAULT_HERO_IMAGE;
  // 1. Direct match
  if (DIRECT_HERO_MAP[slug]) return DIRECT_HERO_MAP[slug];
  // 2. Keyword-based fallback
  const s = slug.toLowerCase();
  if (s.includes("mri")) return `${HERO}/mri-scan-henotic-diagnostics_cta.webp`;
  if (s.includes("ct-") || s.includes("hrct")) return `${HERO}/ct-scan-henotic-diagnostics_cta.webp`;
  if (s.includes("doppler")) return `${HERO}/venous-doppler-study-henotic-diagnostics_cta.webp`;
  if (s.includes("echo")) return `${HERO}/2d-echo-test-henotic-diagnostics_cta.webp`;
  if (s.includes("pet")) return `${HERO}/pet-ct-scan-henotic-diagnostics_cta.webp`;
  if (s.includes("mammo") || s.includes("breast")) return `${HERO}/mammography-henotic-diagnostics_cta.webp`;
  if (s.includes("fibro") || s.includes("liver")) return `${HERO}/liver-fibroscan-henotic-diagnostics_cta.webp`;
  if (s.includes("sono") || s.includes("pregnan") || s.includes("fetal") || s.includes("trimester"))
    return `${HERO}/sonography-henotic-diagnostics_cta.webp`;
  if (s.includes("ultra") || s.includes("usg")) return `${HERO}/ultrasound-abdomen-henotic-diagnostics_cta.webp`;
  if (s.includes("genetic") || s.includes("nipt") || s.includes("dna") || s.includes("prenatal"))
    return `${HERO}/nipt-test-henotic-diagnostics_cta.webp`;
  if (s.includes("pathol") || s.includes("blood") || s.includes("lab") || s.includes("test"))
    return `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`;
  if (s.includes("checkup") || s.includes("screening") || s.includes("diagnostic") || s.includes("radiology"))
    return `${HERO}/pathology-lab-henotic-diagnostics_cta.webp`;
  // 3. Default
  return DEFAULT_HERO_IMAGE;
}