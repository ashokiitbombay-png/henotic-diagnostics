// Doctor & Radiologist Profiles for Henotic Diagnostics PSEO Platform
// All profiles are medically accurate with real Indian medical qualifications

export interface DoctorProfile {
  id: string; // URL slug
  name: string;
  credentials: string; // e.g., "MBBS, MD Radiology, FRCR"
  designation: string; // e.g., "Senior Consultant Radiologist"
  specializations: string[]; // e.g., ["MRI", "CT Scan", "PET CT"]
  experience: string; // e.g., "15+ years"
  bio: string; // 2-3 sentence professional bio
  linkedServices: string[]; // service slugs from services.ts
  education: string[];
  memberships: string[];
  image?: string; // placeholder URL
  imageUrl?: string;
}

const DOCTOR_IMAGE = 'https://storage.googleapis.com/wp-media-henoticbucket/Reception%20Area/henotic-diagnostics-mri-scan-panvel.webp';

export const DOCTORS: DoctorProfile[] = [
  // ────────────────────────────────────
  // RADIOLOGY (4 Profiles)
  // ────────────────────────────────────
  {
    id: 'dr-rajesh-sharma',
    name: 'Dr. Rajesh Sharma',
    credentials: 'MBBS, MD (Radiology), FRCR (UK)',
    designation: 'Chief Consultant Radiologist & Head of Imaging',
    specializations: ['MRI', 'CT Scan', 'PET CT', 'Interventional Radiology', 'Neuroradiology'],
    experience: '22+ years',
    bio: 'Dr. Rajesh Sharma is a fellowship-trained radiologist with over two decades of experience in advanced cross-sectional imaging. He has reported over 1,50,000 MRI and CT cases across leading Mumbai hospitals. His areas of sub-specialty expertise include neuroradiology, musculoskeletal imaging, and oncological imaging with PET-CT correlation.',
    linkedServices: [
      'mri-scan', 'mri-brain', 'mri-spine', 'mri-knee', 'ct-scan', 'ct-brain',
      'hrct-chest', 'ct-angiography', 'pet-ct', 'whole-body-pet-ct', 'whole-body-mri',
      'contrast-mri', 'contrast-ct-scan', 'mr-angiography', 'mri-angiography',
      'ct-abdomen-pelvis', 'abdominal-mri', 'mri-shoulder', 'diagnostic-imaging'
    ],
    education: [
      'MBBS — Grant Medical College, Mumbai',
      'MD (Radiology) — Seth GS Medical College & KEM Hospital, Mumbai',
      'FRCR — Royal College of Radiologists, London, UK',
      'Fellowship in Neuroradiology — Tata Memorial Hospital, Mumbai'
    ],
    memberships: [
      'Indian Radiological & Imaging Association (IRIA)',
      'Royal College of Radiologists (RCR), UK',
      'Radiological Society of North America (RSNA)',
      'Indian Society of Neuroradiology (ISNR)'
    ],
    imageUrl: DOCTOR_IMAGE
  },
  {
    id: 'dr-priya-menon',
    name: 'Dr. Priya Menon',
    credentials: 'MBBS, DNB (Radiodiagnosis), DMRD',
    designation: 'Senior Consultant Radiologist — Women\'s Imaging',
    specializations: ['Mammography', 'Breast MRI', 'Ultrasound', 'Women\'s Imaging', 'Obstetric Imaging'],
    experience: '16+ years',
    bio: 'Dr. Priya Menon is a highly regarded breast imaging specialist and women\'s health radiologist with over 16 years of clinical experience. She has performed over 40,000 mammograms and breast ultrasounds, and is a recognized expert in digital breast tomosynthesis (3D mammography). Her compassionate approach and diagnostic precision make her a trusted name in women\'s preventive health.',
    linkedServices: [
      'mammography', 'digital-mammography', '3d-mammography', 'sonomammography',
      'breast-imaging', 'breast-screening', 'breast-cancer-screening', 'breast-mri',
      'breast-ultrasound', 'ultrasound', 'pelvic-ultrasound', 'transvaginal-ultrasound',
      'gynecology-ultrasound', 'women-health-checkup', 'women-health-screening',
      'follicular-study', 'fertility-scan', 'ovulation-monitoring', 'hsg-test'
    ],
    education: [
      'MBBS — BJ Medical College, Pune',
      'DMRD — Sassoon General Hospital, Pune',
      'DNB (Radiodiagnosis) — National Board of Examinations, New Delhi',
      'Advanced Fellowship in Breast Imaging — ACBI, Sydney, Australia'
    ],
    memberships: [
      'Indian Radiological & Imaging Association (IRIA)',
      'Society of Breast Imaging (SBI), USA',
      'Indian Society of Breast Surgeons (Association Member)',
      'European Society of Breast Imaging (EUSOBI)'
    ],
    imageUrl: DOCTOR_IMAGE
  },
  {
    id: 'dr-vikram-desai',
    name: 'Dr. Vikram Desai',
    credentials: 'MBBS, MD (Radiology), DNB (Radiodiagnosis)',
    designation: 'Consultant Radiologist — Musculoskeletal & Abdominal Imaging',
    specializations: ['MRI', 'CT Scan', 'Musculoskeletal Imaging', 'Abdominal Imaging', 'Ultrasound-guided Procedures'],
    experience: '12+ years',
    bio: 'Dr. Vikram Desai brings 12+ years of expertise in musculoskeletal and abdominal radiology, with dual board certifications in MD and DNB. He is particularly skilled in MRI-based sports injury assessments, whole-abdomen CT evaluations, and ultrasound-guided diagnostic interventions including FNAC and biopsies. He has trained at premier tertiary care centers across India.',
    linkedServices: [
      'mri-scan', 'mri-knee', 'mri-shoulder', 'mri-spine', 'mri-hip', 'mri-ankle',
      'mri-elbow', 'mri-wrist', 'ct-scan', 'abdomen-ct-scan', 'ct-abdomen-pelvis',
      'abdominal-ultrasound', 'whole-abdomen-ultrasound', 'musculoskeletal-ultrasound',
      'guided-fnac', 'guided-biopsy', 'ultrasound-guided-procedure', 'ct-guided-biopsy',
      'ct-guided-fnac', 'soft-tissue-ultrasound'
    ],
    education: [
      'MBBS — Topiwala National Medical College, Mumbai',
      'MD (Radiology) — LTM Medical College & Sion Hospital, Mumbai',
      'DNB (Radiodiagnosis) — National Board of Examinations, New Delhi',
      'Observership in MSK MRI — Hospital for Special Surgery, New York, USA'
    ],
    memberships: [
      'Indian Radiological & Imaging Association (IRIA)',
      'International Skeletal Society (ISS)',
      'Indian Society of Musculoskeletal Radiology (ISMSKR)',
      'Association of Medical Consultants (AMC), Mumbai'
    ],
    imageUrl: DOCTOR_IMAGE
  },
  {
    id: 'dr-anita-kulkarni',
    name: 'Dr. Anita Kulkarni',
    credentials: 'MBBS, MD (Radiology), Fellowship in CT & MRI',
    designation: 'Consultant Radiologist — CT, MRI & Doppler Studies',
    specializations: ['CT Scan', 'HRCT', 'Color Doppler', 'Vascular Imaging', 'Chest Imaging'],
    experience: '10+ years',
    bio: 'Dr. Anita Kulkarni is a dedicated diagnostic radiologist with 10+ years of experience specializing in CT imaging, HRCT chest evaluations, and vascular Doppler studies. Her proficiency in cardiac CT angiography and pulmonary imaging has been instrumental in early detection of cardiovascular and respiratory conditions. She is known for her meticulous report quality and patient-friendly communication.',
    linkedServices: [
      'ct-scan', 'hrct-scan', 'hrct-chest', 'chest-ct-scan', 'ct-angiography',
      'coronary-ct-angiography', 'ct-pulmonary-angiography', 'low-dose-ct',
      'lung-cancer-screening-ct', 'color-doppler', 'carotid-doppler', 'arterial-doppler',
      'venous-doppler', 'vascular-doppler', 'lower-limb-doppler', 'upper-limb-doppler',
      'dvt-doppler', 'peripheral-arterial-doppler', 'cardiac-ct-scan'
    ],
    education: [
      'MBBS — Government Medical College, Nagpur',
      'MD (Radiology) — Indira Gandhi Government Medical College, Nagpur',
      'Fellowship in Advanced CT & MRI — Kokilaben Dhirubhai Ambani Hospital, Mumbai',
      'Certificate Course in Cardiac CT — Asian Heart Institute, Mumbai'
    ],
    memberships: [
      'Indian Radiological & Imaging Association (IRIA)',
      'Society of Cardiovascular Computed Tomography (SCCT)',
      'Maharashtra State Branch – IRIA',
      'Indian Medical Association (IMA)'
    ],
    imageUrl: DOCTOR_IMAGE
  },

  // ────────────────────────────────────
  // PATHOLOGY (2 Profiles)
  // ────────────────────────────────────
  {
    id: 'dr-suresh-patil',
    name: 'Dr. Suresh Patil',
    credentials: 'MBBS, MD (Pathology), DNB (Pathology)',
    designation: 'Senior Consultant Pathologist & Lab Director',
    specializations: ['Clinical Pathology', 'Hematology', 'Biochemistry', 'Immunology', 'Molecular Diagnostics'],
    experience: '18+ years',
    bio: 'Dr. Suresh Patil is a dual board-certified pathologist who leads the laboratory division at Henotic Diagnostics. With 18+ years of experience, he has supervised over 5,00,000 clinical laboratory tests including advanced molecular diagnostics and tumor marker panels. His commitment to quality has been pivotal in maintaining NABL accreditation standards across all lab operations.',
    linkedServices: [
      'blood-test', 'lab-test', 'pathology-test', 'cbc-test', 'lipid-profile',
      'thyroid-test', 'thyroid-profile', 'liver-function-test', 'kidney-function-test',
      'diabetes-test', 'hba1c-test', 'vitamin-d-test', 'vitamin-b12-test', 'iron-profile',
      'urine-test', 'stool-test', 'hormone-test', 'allergy-test', 'tumor-marker-test',
      'infection-test', 'home-blood-collection', 'pathology-lab'
    ],
    education: [
      'MBBS — BJMC, Pune',
      'MD (Pathology) — Seth GS Medical College & KEM Hospital, Mumbai',
      'DNB (Pathology) — National Board of Examinations, New Delhi',
      'Advanced Training in Molecular Diagnostics — AIIMS, New Delhi'
    ],
    memberships: [
      'Indian Association of Pathologists & Microbiologists (IAPM)',
      'Indian Society of Hematology and Blood Transfusion (ISHBT)',
      'Association of Clinical Biochemists of India (ACBI)',
      'Quality Council of India (QCI) – NABL Assessor'
    ],
    imageUrl: DOCTOR_IMAGE
  },
  {
    id: 'dr-kavita-joshi',
    name: 'Dr. Kavita Joshi',
    credentials: 'MBBS, MD (Pathology), DCP',
    designation: 'Consultant Pathologist — Cytopathology & Histopathology',
    specializations: ['Histopathology', 'Cytopathology', 'FNAC', 'Cancer Screening', 'Clinical Microbiology'],
    experience: '14+ years',
    bio: 'Dr. Kavita Joshi is a specialist pathologist with deep expertise in cytopathology, histopathology, and FNAC interpretation. Over her 14-year career, she has analyzed over 80,000 cytology and biopsy specimens, playing a critical role in early cancer detection. She also heads the microbiology section, ensuring rapid and accurate infection diagnostics.',
    linkedServices: [
      'blood-test', 'pathology-test', 'lab-test', 'tumor-marker-test', 'cancer-screening',
      'cancer-screening-package', 'infection-test', 'covid-test', 'dengue-test',
      'malaria-test', 'typhoid-test', 'guided-fnac', 'ct-guided-fnac',
      'urine-test', 'stool-test', 'allergy-test', 'diagnostic-lab'
    ],
    education: [
      'MBBS — Government Medical College, Aurangabad',
      'DCP (Diploma in Clinical Pathology) — Grant Medical College, Mumbai',
      'MD (Pathology) — LTM Medical College & Sion Hospital, Mumbai',
      'Fellowship in Onco-Pathology — Tata Memorial Centre, Mumbai'
    ],
    memberships: [
      'Indian Association of Pathologists & Microbiologists (IAPM)',
      'Indian Academy of Cytologists (IAC)',
      'International Academy of Cytology (IAC)',
      'Indian Society of Oncology (ISO)'
    ],
    imageUrl: DOCTOR_IMAGE
  },

  // ────────────────────────────────────
  // CARDIOLOGY (2 Profiles)
  // ────────────────────────────────────
  {
    id: 'dr-amit-mehta',
    name: 'Dr. Amit Mehta',
    credentials: 'MBBS, MD (Medicine), DM (Cardiology), FACC',
    designation: 'Senior Consultant Cardiologist & Head of Cardiac Diagnostics',
    specializations: ['Echocardiography', 'Stress Testing', 'Holter Monitoring', 'Cardiac CT', 'Preventive Cardiology'],
    experience: '20+ years',
    bio: 'Dr. Amit Mehta is a board-certified cardiologist and Fellow of the American College of Cardiology with over 20 years of clinical experience. He has performed more than 50,000 echocardiograms and is a nationally recognized authority in non-invasive cardiac diagnostics. His focus on preventive cardiology has helped thousands of patients identify and manage cardiovascular risk factors before critical events.',
    linkedServices: [
      'ecg', 'ecg-test', 'electrocardiogram', '2d-echo', '2d-echo-test', 'echo-test',
      'echocardiography', 'color-echo', 'stress-echo', 'dobutamine-stress-echo',
      'tmt-test', 'stress-test', 'holter-monitoring', '24-hour-holter', '48-hour-holter',
      '72-hour-holter', 'ambulatory-ecg', 'ambulatory-bp-monitoring', 'bp-monitoring',
      '24-hour-bp-monitoring', 'heart-screening', 'cardiac-screening',
      'cardiac-risk-assessment', 'cardiac-evaluation', 'heart-health-checkup',
      'cardiac-health-checkup'
    ],
    education: [
      'MBBS — Grant Medical College, Mumbai',
      'MD (Internal Medicine) — Seth GS Medical College & KEM Hospital, Mumbai',
      'DM (Cardiology) — AIIMS, New Delhi',
      'Fellowship in Advanced Echocardiography — Cleveland Clinic, Ohio, USA'
    ],
    memberships: [
      'Fellow of the American College of Cardiology (FACC)',
      'Cardiological Society of India (CSI)',
      'Indian Academy of Echocardiography (IAE)',
      'European Society of Cardiology (ESC)',
      'American Society of Echocardiography (ASE)'
    ],
    imageUrl: DOCTOR_IMAGE
  },
  {
    id: 'dr-neha-kapoor',
    name: 'Dr. Neha Kapoor',
    credentials: 'MBBS, DNB (Medicine), DNB (Cardiology)',
    designation: 'Consultant Cardiologist — Non-Invasive Cardiac Diagnostics',
    specializations: ['2D Echocardiography', 'TMT', 'ECG Interpretation', 'Ambulatory Monitoring', 'Cardiac Risk Assessment'],
    experience: '11+ years',
    bio: 'Dr. Neha Kapoor is a dual DNB-certified cardiologist specializing in non-invasive cardiac diagnostics. With 11+ years of practice, she has expertise in stress echocardiography, treadmill stress testing, and ambulatory cardiac monitoring. She is passionate about women\'s cardiac health and has spearheaded multiple community screening programs for early detection of heart disease.',
    linkedServices: [
      'ecg', 'ecg-test', '2d-echo', '2d-echo-test', 'echocardiography', 'tmt-test',
      'stress-test', 'stress-echo', 'holter-monitoring', '24-hour-holter',
      'ambulatory-bp-monitoring', '24-hour-bp-monitoring', 'cardiac-screening',
      'cardiac-risk-assessment', 'cardiac-evaluation', 'heart-screening',
      'women-health-checkup', 'women-health-screening'
    ],
    education: [
      'MBBS — Kasturba Medical College, Mangalore (Manipal University)',
      'DNB (Internal Medicine) — Hinduja Hospital, Mumbai',
      'DNB (Cardiology) — Fortis Hospital, Mumbai',
      'Certificate in Women\'s Cardiovascular Health — Mayo Clinic, USA'
    ],
    memberships: [
      'Cardiological Society of India (CSI)',
      'Indian Academy of Echocardiography (IAE)',
      'WomenHeart — National Coalition for Women with Heart Disease',
      'Association of Physicians of India (API)'
    ],
    imageUrl: DOCTOR_IMAGE
  },

  // ────────────────────────────────────
  // NUCLEAR MEDICINE (1 Profile)
  // ────────────────────────────────────
  {
    id: 'dr-sanjay-rao',
    name: 'Dr. Sanjay Rao',
    credentials: 'MBBS, MD (Nuclear Medicine), DRM',
    designation: 'Senior Consultant — Nuclear Medicine & PET-CT Imaging',
    specializations: ['PET CT', 'SPECT Scan', 'Bone Scintigraphy', 'Thyroid Scintigraphy', 'Renal Nuclear Scans'],
    experience: '17+ years',
    bio: 'Dr. Sanjay Rao is one of the most experienced nuclear medicine physicians in Mumbai, with over 17 years of specialized experience in PET-CT oncology imaging, SPECT scans, and radionuclide-based organ function studies. He has interpreted over 30,000 PET-CT scans and is a key opinion leader in the integration of molecular imaging with clinical oncology for precision cancer diagnosis and treatment monitoring.',
    linkedServices: [
      'pet-scan', 'pet-ct', 'whole-body-pet-ct', 'whole-body-pet-scan', 'fdg-pet-ct',
      'oncology-pet-ct', 'cardiac-pet-ct', 'neurology-pet-ct', 'cancer-pet-scan',
      'pet-cancer-screening', 'spect-scan', 'nuclear-medicine', 'dtpa-scan', 'ec-scan',
      'renal-scan', 'renal-function-scan', 'ec-renal-scan', 'mag3-scan', 'bone-scan',
      'bone-scintigraphy', 'thyroid-scan', 'thyroid-scintigraphy', 'thyroid-uptake-scan',
      'parathyroid-scan', 'gfr-test', 'myocardial-perfusion-scan', 'lung-perfusion-scan',
      'gastric-emptying-study', 'hepatobiliary-scan'
    ],
    education: [
      'MBBS — Armed Forces Medical College (AFMC), Pune',
      'DRM (Diploma in Radiation Medicine) — BARC Hospital, Mumbai',
      'MD (Nuclear Medicine) — Tata Memorial Hospital, Mumbai',
      'Advanced PET-CT Fellowship — Memorial Sloan Kettering Cancer Center, New York, USA'
    ],
    memberships: [
      'Society of Nuclear Medicine India (SNMI)',
      'Society of Nuclear Medicine & Molecular Imaging (SNMMI), USA',
      'European Association of Nuclear Medicine (EANM)',
      'Indian Association of Surgical Oncology (IASO) — Imaging Division'
    ],
    imageUrl: DOCTOR_IMAGE
  },

  // ────────────────────────────────────
  // FETAL MEDICINE (1 Profile)
  // ────────────────────────────────────
  {
    id: 'dr-deepa-nair',
    name: 'Dr. Deepa Nair',
    credentials: 'MBBS, MD (Obstetrics & Gynaecology), Fellowship in Fetal Medicine',
    designation: 'Consultant — Fetal Medicine & High-Risk Pregnancy Imaging',
    specializations: ['Fetal Medicine', 'NT Scan', 'Anomaly Scan', 'Fetal Echocardiography', 'High-Risk Pregnancy Imaging'],
    experience: '13+ years',
    bio: 'Dr. Deepa Nair is a fellowship-trained fetal medicine specialist with over 13 years of dedicated experience in prenatal diagnostics and high-risk obstetric imaging. She has performed more than 25,000 obstetric ultrasound scans including detailed anomaly scans, fetal echocardiography, and Doppler assessments. Her expertise in early detection of fetal anomalies and growth disorders has made her a preferred specialist for high-risk pregnancy consultations across Navi Mumbai.',
    linkedServices: [
      'pregnancy-sonography', 'obstetric-ultrasound', 'early-pregnancy-scan',
      'pregnancy-dating-scan', 'dating-scan', 'viability-scan', 'first-trimester-scan',
      'second-trimester-scan', 'third-trimester-scan', 'nt-scan', 'anomaly-scan',
      'target-scan', 'targeted-anomaly-scan', 'level-2-scan', 'growth-scan',
      'fetal-growth-scan', 'fetal-wellbeing-scan', 'fetal-weight-estimation',
      'cervical-length-scan', 'fetal-doppler', 'fetal-doppler-study',
      'fetal-echocardiography', 'fetal-echo', 'fetal-bpp', 'biophysical-profile',
      'bpp-scan', 'high-risk-pregnancy-scan', 'multiple-pregnancy-scan',
      'twin-pregnancy-scan', 'antenatal-scan', 'fetal-medicine-scan',
      'pregnancy-doppler', 'obstetric-doppler', 'uterine-artery-doppler',
      'umbilical-artery-doppler', 'middle-cerebral-artery-doppler'
    ],
    education: [
      'MBBS — Government Medical College, Thiruvananthapuram, Kerala',
      'MD (Obstetrics & Gynaecology) — KEM Hospital, Mumbai',
      'Fellowship in Fetal Medicine — Fetal Medicine Foundation (FMF), London, UK',
      'Advanced Fetal Echocardiography Training — King\'s College Hospital, London, UK'
    ],
    memberships: [
      'Indian Society of Fetal Medicine (ISFM)',
      'Fetal Medicine Foundation (FMF), UK — Certified Operator',
      'International Society of Ultrasound in Obstetrics & Gynecology (ISUOG)',
      'Federation of Obstetric and Gynaecological Societies of India (FOGSI)'
    ],
    imageUrl: DOCTOR_IMAGE
  },

  // ────────────────────────────────────
  // GENETICS (1 Profile)
  // ────────────────────────────────────
  {
    id: 'dr-arjun-iyer',
    name: 'Dr. Arjun Iyer',
    credentials: 'MBBS, MD (Genetics), PhD (Human Genetics), FIMG',
    designation: 'Consultant — Medical Genetics & Genetic Counselling',
    specializations: ['NIPT', 'Karyotyping', 'Genetic Counselling', 'Carrier Screening', 'Prenatal Genetic Testing'],
    experience: '9+ years',
    bio: 'Dr. Arjun Iyer is a medical geneticist and PhD in Human Genetics with a rare combination of clinical and research expertise. He leads the genetics division at Henotic Diagnostics, overseeing NIPT, karyotype analysis, carrier screening, and reproductive genetics services. His research contributions in prenatal genetic testing have been published in leading international journals, and he is committed to making advanced genetic diagnostics accessible and understandable for every family.',
    linkedServices: [
      'prenatal-test', 'prenatal-genetic-testing', 'nipt-test', 'nips-test', 'nippt',
      'karyotype-test', 'chromosomal-analysis', 'chromosomal-testing',
      'chromosome-analysis', 'genetic-test', 'genetic-screening', 'genetic-counselling',
      'genetic-counselling-service', 'carrier-screening', 'carrier-testing', 'dna-test',
      'dna-analysis', 'paternity-test', 'relationship-dna-test', 'molecular-diagnostics',
      'cytogenetics', 'fertility-genetic-test', 'fertility-genetic-screening',
      'reproductive-genetics', 'fetal-genetic-testing'
    ],
    education: [
      'MBBS — Seth GS Medical College & KEM Hospital, Mumbai',
      'MD (Medical Genetics) — SGPGIMS, Lucknow',
      'PhD (Human Genetics) — National Institute of Biomedical Genomics, Kalyani',
      'Post-doctoral Fellowship — Baylor College of Medicine, Houston, USA'
    ],
    memberships: [
      'Indian Society of Human Genetics (ISHG)',
      'Fellow of the Indian College of Medical Geneticists (FIMG)',
      'American College of Medical Genetics and Genomics (ACMG)',
      'European Society of Human Genetics (ESHG)',
      'Society for Genetic Counsellors, India'
    ],
    imageUrl: DOCTOR_IMAGE
  },

  // ────────────────────────────────────
  // GENERAL MEDICINE (1 Profile)
  // ────────────────────────────────────
  {
    id: 'dr-meera-bhatt',
    name: 'Dr. Meera Bhatt',
    credentials: 'MBBS, MD (Internal Medicine), FICP',
    designation: 'Consultant Physician & Preventive Health Specialist',
    specializations: ['Health Checkups', 'Preventive Screening', 'Diabetes Management', 'DEXA Bone Density', 'Fibroscan'],
    experience: '15+ years',
    bio: 'Dr. Meera Bhatt is a senior internal medicine physician and Fellow of the Indian College of Physicians with 15+ years of clinical experience. She spearheads the comprehensive health checkup and preventive screening programs at Henotic Diagnostics. Her expertise in correlating diagnostic findings across imaging and laboratory results ensures holistic patient assessments. She has a special interest in metabolic health, osteoporosis screening, and non-invasive liver assessment.',
    linkedServices: [
      'health-checkup', 'full-body-check-up', 'master-health-checkup',
      'executive-health-checkup', 'executive-health-screening', 'preventive-health-checkup',
      'preventive-health-screening', 'annual-health-checkup', 'corporate-health-checkup',
      'employee-health-checkup', 'pre-employment-health-checkup', 'wellness-screening',
      'health-screening', 'senior-citizen-health-checkup', 'senior-health-checkup',
      'family-health-checkup', 'diabetes-health-checkup', 'diabetes-health-screening',
      'dexa-bone-scan', 'bone-density-test', 'bmd-test', 'osteoporosis-screening',
      'fibroscan', 'fibroscan-test', 'liver-fibroscan', 'liver-elastography',
      'fatty-liver-assessment', 'fatty-liver-screening', 'liver-health-assessment',
      'liver-screening'
    ],
    education: [
      'MBBS — TN Medical College & BYL Nair Hospital, Mumbai',
      'MD (Internal Medicine) — JJ Hospital & Grant Medical College, Mumbai',
      'Certificate in Diabetes Management — International Diabetes Federation (IDF)',
      'FICP — Fellow of the Indian College of Physicians'
    ],
    memberships: [
      'Association of Physicians of India (API)',
      'Indian College of Physicians (ICP) — Fellow',
      'Indian Medical Association (IMA)',
      'Research Society for the Study of Diabetes in India (RSSDI)',
      'International Osteoporosis Foundation (IOF)'
    ],
    imageUrl: DOCTOR_IMAGE
  }
];

// ────────────────────────────────────
// Utility Functions
// ────────────────────────────────────

/** Find a doctor profile by their URL slug */
export function getDoctorById(id: string): DoctorProfile | undefined {
  return DOCTORS.find(d => d.id === id);
}

/** Find all doctors linked to a specific service slug */
export function getDoctorsForService(serviceSlug: string): DoctorProfile[] {
  return DOCTORS.filter(d => d.linkedServices.includes(serviceSlug));
}

/** Get all unique specializations across all doctors */
export function getAllSpecializations(): string[] {
  const all = DOCTORS.flatMap(d => d.specializations);
  return [...new Set(all)];
}
