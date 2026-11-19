import type {
  NiptComparisonRow,
  NiptFaqItem,
  NiptPanel,
  NiptPrerequisite,
  NiptProcessStep,
  NiptReportHighlight,
  NiptResultGuide,
  NiptSampleSpec,
} from './types';

export const NIPT_EXACT_SPECTRUM_CSS =
  'linear-gradient(90deg, #6c6cf6 0%, #9f68c8 35%, #e7569b 70%, #f59e0b 100%)';

export const NIPT_PHONE_DISPLAY = '08879327184';
export const NIPT_PHONE_HREF = 'tel:08879327184';
export const NIPT_WHATSAPP_NUMBER = '918879327184';
export const NIPT_GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/6J463EV2yW53ExF19';
export const NIPT_GOOGLE_PROFILE_URL = 'https://share.google/IcBtvtVjwozCBFMPp';

export const NIPT_HERO_SERP_IMAGE =
  'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/hero-image-nipt-test-trisomy-21-screening.webp';

export const NIPT_HERO_BANNER_IMAGE =
  'https://cdn.henoticdiagnostics.com/Hero%20Image/nipt-test-henotic-diagnostics_cta.webp';

export const NIPT_SAMPLE_REPORT_PDF_URL =
  'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/nipt-pdf-medical-reports.pdf';

export const GOOGLE_WORDMARK_LOGO =
  'https://storage.googleapis.com/wp-media-henoticbucket/Google%20Trust%20Symbols/Google-name.webp';

export const GOOGLE_G_BADGE =
  'https://storage.googleapis.com/wp-media-henoticbucket/Google%20Trust%20Symbols/google-g-logo.webp';

export const STATIC_NIPT_PANELS: NiptPanel[] = [
  {
    id: 'nipt-basic',
    code: 'NIPT-BASIC',
    badgeNumber: '1',
    topPillLabel: 'ESSENTIAL',
    discountBadge: '20% OFF',
    tags: ['10+ WEEKS', 'MATERNAL BLOOD', 'NO FASTING'],
    testsCountNumber: '3',
    testsCountUnit: 'Tests',
    shortTag: 'Essential Trisomy Screen',
    title: 'NIPT Basic Screening Panel',
    subtitle:
      'Targeted cell-free fetal DNA screening for the three most common chromosomal trisomies from 10 weeks of pregnancy.',
    imageUrl:
      'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/nipt-test-for-pregnancy.webp',
    imageAlt:
      'NIPT Basic Screening Panel for Pregnancy Trisomy 21, 18, 13 at Henotic Diagnostics',
    imageWidth: 800,
    imageHeight: 600,
    totalTestsLabel: '3',
    totalTestsCount: '3 Tests',
    tat: '7-10 Days Turnaround',
    mrp: 12500,
    offerPrice: 10000,
    savings: 2500,
    sampleType: 'Maternal Blood (cfDNA)',
    gestation: '10+ Weeks Onwards',
    popular: false,
    ribbonText: 'Foundational Care',
    colHeaders: ['Parameter', 'Condition'],
    archTheme: {
      archBg: 'bg-gradient-to-b from-[#c4b5fd] via-[#ddd6fe] to-[#f3e8ff]',
      accentBorder: 'border-violet-400/80',
      glow: 'bg-violet-500/45',
      lineColor: '#7c3aed',
      gradientBelowImage: 'from-white via-violet-100/75 to-transparent',
      cardHeaderTint: 'bg-gradient-to-b from-violet-100/70 via-purple-50/40 to-white',
      badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
      tagStyle: 'bg-violet-50/90 text-violet-900 border border-violet-200/70',
      cardRing: 'ring-1 ring-violet-200/90 hover:ring-violet-300',
      ctaGradient:
        'from-violet-600 via-purple-600 to-indigo-700 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-800',
      ctaShadow:
        'shadow-[0_12px_28px_-6px_rgba(109,40,217,0.50)] hover:shadow-[0_18px_34px_-6px_rgba(109,40,217,0.62)]',
    },
    parameters: [
      { param: 'Trisomy 21', detail: 'Down Syndrome' },
      { param: 'Trisomy 18', detail: 'Edwards Syndrome' },
      { param: 'Trisomy 13', detail: 'Patau Syndrome' },
    ],
  },
  {
    id: 'nipt-comprehensive',
    code: 'NIPT-COMP',
    badgeNumber: '2',
    topPillLabel: 'POPULAR',
    discountBadge: '19% OFF',
    tags: ['10+ WEEKS', 'GENOME-WIDE', 'NO FASTING'],
    testsCountNumber: '9',
    testsCountUnit: 'Categories',
    shortTag: 'Genome-Wide Screening',
    title: 'Comprehensive NIPT Test Panel',
    subtitle:
      'Expanded whole-genome cell-free DNA screening covering common trisomies, sex chromosome aneuploidies, microdeletions, rare autosomal trisomies, and CNVs.',
    imageUrl:
      'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/nipt-test-trisomy-18-screening.webp',
    imageAlt:
      'Comprehensive NIPT Test Panel Genome-Wide Chromosomal & Trisomy 18 Screening',
    imageWidth: 800,
    imageHeight: 600,
    totalTestsLabel: '9 Categories',
    totalTestsCount: '9 Screening Categories',
    tat: '7-10 Days Turnaround',
    mrp: 15500,
    offerPrice: 12500,
    savings: 3000,
    sampleType: 'Maternal Blood (cfDNA)',
    gestation: '10+ Weeks Onwards',
    popular: true,
    ribbonText: 'Most Comprehensive',
    colHeaders: ['Parameter', 'Screening Category'],
    archTheme: {
      archBg: 'bg-gradient-to-b from-[#6ee7b7] via-[#a7f3d0] to-[#ecfdf5]',
      accentBorder: 'border-emerald-400/85',
      glow: 'bg-teal-400/50',
      lineColor: '#0d9488',
      gradientBelowImage: 'from-white via-emerald-100/75 to-transparent',
      cardHeaderTint: 'bg-gradient-to-b from-emerald-100/70 via-teal-50/40 to-white',
      badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
      tagStyle: 'bg-emerald-50/90 text-emerald-900 border border-emerald-200/70',
      cardRing: 'ring-2 ring-emerald-300/90 hover:ring-emerald-400',
      ctaGradient:
        'from-emerald-600 via-teal-600 to-cyan-700 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-800',
      ctaShadow:
        'shadow-[0_12px_28px_-6px_rgba(13,148,136,0.50)] hover:shadow-[0_18px_34px_-6px_rgba(13,148,136,0.62)]',
    },
    parameters: [
      { param: 'Trisomy 21, 18, 13', detail: 'Common trisomies' },
      { param: 'X and Y abnormalities', detail: 'Sex chromosome aneuploidies' },
      { param: '22q11.2 deletion', detail: 'Microdeletion' },
      { param: 'Selected microdeletions', detail: 'Chromosomal deletions' },
      { param: 'Rare autosomal trisomies', detail: 'Chromosomes 1–22, selected' },
      { param: 'Segmental deletions', detail: 'Selected chromosome regions' },
      { param: 'Segmental duplications', detail: 'Selected chromosome regions' },
      { param: 'Genome-wide CNVs', detail: 'Copy number variations' },
      { param: 'Triploidy', detail: 'Selected SNP-based platforms' },
    ],
  },
  {
    id: 'nipt-advanced',
    code: 'NIPT-ADV',
    badgeNumber: '3',
    topPillLabel: 'ADVANCED',
    discountBadge: '19% OFF',
    tags: ['10+ WEEKS', 'MICRODELETIONS', 'NO FASTING'],
    testsCountNumber: 'Core + 8',
    testsCountUnit: 'Syndromes',
    shortTag: 'Targeted Microdeletion Plus',
    title: 'Advanced NIPT Test Panel',
    subtitle:
      'Includes Basic and Comprehensive parameters, plus selected additional conditions:',
    imageUrl:
      'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/nipt-test-trisomy-21-screening.webp',
    imageAlt:
      'Advanced NIPT Test Panel Microdeletions & Trisomy 21 Screening at Henotic Diagnostics',
    imageWidth: 800,
    imageHeight: 600,
    totalTestsLabel: 'Basic + Comp + 8',
    totalTestsCount: 'Basic + Comprehensive + 8 Microdeletions',
    tat: '7-10 Days Turnaround',
    mrp: 18500,
    offerPrice: 15000,
    savings: 3500,
    sampleType: 'Maternal Blood (cfDNA)',
    gestation: '10+ Weeks Onwards',
    popular: false,
    ribbonText: 'Targeted Syndromes',
    colHeaders: ['Parameter', 'Condition'],
    archTheme: {
      archBg: 'bg-gradient-to-b from-[#f9a8d4] via-[#fbcfe8] to-[#fdf2f8]',
      accentBorder: 'border-pink-400/80',
      glow: 'bg-pink-500/45',
      lineColor: '#db2777',
      gradientBelowImage: 'from-white via-pink-100/75 to-transparent',
      cardHeaderTint: 'bg-gradient-to-b from-pink-100/70 via-rose-50/40 to-white',
      badgeBg: 'bg-pink-100 text-pink-900 border-pink-200',
      tagStyle: 'bg-pink-50/90 text-pink-900 border border-pink-200/70',
      cardRing: 'ring-1 ring-pink-200/90 hover:ring-pink-300',
      ctaGradient:
        'from-rose-600 via-pink-600 to-purple-700 hover:from-rose-700 hover:via-pink-700 hover:to-purple-800',
      ctaShadow:
        'shadow-[0_12px_28px_-6px_rgba(219,39,119,0.50)] hover:shadow-[0_18px_34px_-6px_rgba(219,39,119,0.62)]',
    },
    parameters: [
      { param: '22q11.2 deletion', detail: 'DiGeorge Syndrome' },
      { param: '1p36 deletion', detail: '1p36 Deletion Syndrome' },
      { param: '5p deletion', detail: 'Cri-du-chat Syndrome' },
      { param: '4p deletion', detail: 'Wolf-Hirschhorn Syndrome' },
      { param: '15q11-q13 deletion', detail: 'Prader-Willi / Angelman region' },
      { param: '11q deletion', detail: 'Jacobsen Syndrome' },
      { param: '17p11.2 deletion', detail: 'Smith-Magenis Syndrome' },
      { param: '7q11.23 deletion', detail: 'Williams Syndrome' },
    ],
  },
];

export const MIN_NIPT_PANEL_PRICE = Math.min(...STATIC_NIPT_PANELS.map((p) => p.offerPrice));

export const NIPT_COMPARISON_ROWS: NiptComparisonRow[] = [
  { parameter: 'Trisomy 21 (Down Syndrome)', basic: 'included', advanced: 'included', comprehensive: 'included' },
  { parameter: 'Trisomy 18 (Edwards Syndrome)', basic: 'included', advanced: 'included', comprehensive: 'included' },
  { parameter: 'Trisomy 13 (Patau Syndrome)', basic: 'included', advanced: 'included', comprehensive: 'included' },
  { parameter: 'Turner Syndrome (45,X)', basic: 'excluded', advanced: 'included', comprehensive: 'included' },
  { parameter: 'Klinefelter Syndrome (47,XXY)', basic: 'excluded', advanced: 'included', comprehensive: 'included' },
  { parameter: 'Triple X (47,XXX)', basic: 'excluded', advanced: 'included', comprehensive: 'included' },
  { parameter: 'Jacobs Syndrome (47,XYY)', basic: 'excluded', advanced: 'included', comprehensive: 'included' },
  { parameter: 'Microdeletions', basic: 'excluded', advanced: 'Selected', comprehensive: 'Selected' },
  { parameter: 'Rare Autosomal Trisomies', basic: 'excluded', advanced: 'Platform-dependent', comprehensive: 'Selected' },
  { parameter: 'Segmental CNVs', basic: 'excluded', advanced: 'Platform-dependent', comprehensive: 'Platform-dependent' },
  { parameter: 'Genome-wide CNVs', basic: 'excluded', advanced: 'excluded', comprehensive: 'Platform-dependent' },
  { parameter: 'Triploidy', basic: 'excluded', advanced: 'Platform-dependent', comprehensive: 'SNP-based platform' },
];

export const NIPT_PREREQUISITES: NiptPrerequisite[] = [
  { req: 'Recommended Gestational Age', detail: 'Generally from 10 weeks of pregnancy onwards' },
  { req: 'Sample Type', detail: 'Maternal peripheral blood' },
  { req: 'Sample Collection', detail: 'Blood collected from the pregnant woman' },
  { req: 'Fasting Requirement', detail: 'Fasting is generally not required' },
  { req: 'Pregnancy Details', detail: 'Gestational age and expected delivery date' },
  { req: 'Ultrasound Report', detail: 'Recent pregnancy ultrasound report recommended' },
  { req: 'Patient Details', detail: 'Name, age and relevant pregnancy history' },
  { req: 'Pregnancy Type', detail: 'Singleton or twin pregnancy' },
  { req: 'Medical History', detail: 'Previous pregnancy history and relevant genetic conditions' },
  { req: 'Consent', detail: 'Informed consent before testing' },
  { req: 'Medication', detail: 'Inform the laboratory about current medications and relevant medical history' },
];

export const NIPT_PROCESS_STEPS: NiptProcessStep[] = [
  {
    step: 'Step 1',
    title: 'Doctor Consultation',
    desc: 'Consult your obstetrician or gynaecologist to understand the suitability of NIPT screening.',
    iconName: 'Stethoscope',
  },
  {
    step: 'Step 2',
    title: 'Pregnancy Assessment',
    desc: 'Confirm gestational age, pregnancy type and relevant ultrasound findings.',
    iconName: 'Baby',
  },
  {
    step: 'Step 3',
    title: 'Blood Sample Collection',
    desc: "A blood sample is collected from the mother's arm using an appropriate collection tube.",
    iconName: 'Droplets',
  },
  {
    step: 'Step 4',
    title: 'Sample Transportation',
    desc: 'The blood sample is labelled, processed and transported to the designated genetic testing laboratory under specified conditions.',
    iconName: 'ShieldCheck',
  },
  {
    step: 'Step 5',
    title: 'Cell-Free DNA Analysis',
    desc: "Cell-free DNA (cfDNA) present in maternal blood is analysed using the laboratory's validated NIPT technology, such as Next-Generation Sequencing (NGS) or SNP-based analysis.",
    iconName: 'Dna',
  },
  {
    step: 'Step 6',
    title: 'Chromosomal Screening',
    desc: 'The laboratory evaluates the selected chromosomal conditions according to the chosen NIPT panel.',
    iconName: 'Microscope',
  },
  {
    step: 'Step 7',
    title: 'Report Generation',
    desc: 'Results are reviewed and a report is issued with the screening findings, fetal fraction (where applicable) and risk assessment.',
    iconName: 'FileText',
  },
  {
    step: 'Step 8',
    title: 'Doctor Consultation',
    desc: 'The report should be discussed with the treating obstetrician or genetic counsellor for appropriate interpretation and follow-up.',
    iconName: 'HeartHandshake',
  },
];

export const NIPT_SAMPLE_SPECS: NiptSampleSpec[] = [
  { param: 'Sample', detail: 'Maternal blood' },
  { param: 'Sample Volume', detail: 'As specified by the testing laboratory' },
  { param: 'Collection Tube', detail: 'Validated cfDNA collection tube' },
  { param: 'Collection Method', detail: 'Venous blood collection' },
  { param: 'Fasting', detail: 'Not required in most cases' },
  { param: 'Sample Processing', detail: 'As per laboratory protocol' },
  { param: 'Fetal Fraction', detail: 'Evaluated as part of testing, where supported' },
];

export const NIPT_PRE_TEST_INSTRUCTIONS: string[] = [
  'Carry your recent pregnancy ultrasound report, if available.',
  'Provide accurate gestational age and pregnancy details.',
  'Inform the doctor about twin pregnancy, IVF conception or a history of organ or bone marrow transplantation.',
  'Inform the laboratory about any previous chromosome screening results.',
  "Follow the laboratory's sample collection and transportation instructions.",
  'Understand that NIPT is a screening test and cannot confirm or exclude every genetic condition.',
];

export const NIPT_RESULTS_GUIDE: NiptResultGuide[] = [
  {
    status: 'Low Risk',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    dotClass: 'bg-emerald-500',
    meaning: 'Reduced likelihood of the screened chromosomal condition',
  },
  {
    status: 'High Risk',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-200',
    dotClass: 'bg-amber-500',
    meaning:
      'Increased likelihood; genetic counselling and confirmatory testing are recommended',
  },
  {
    status: 'No-Call / Inconclusive',
    badgeClass: 'bg-slate-100 text-slate-800 border-slate-200',
    dotClass: 'bg-slate-500',
    meaning:
      'A reliable result could not be generated; repeat testing or further evaluation may be recommended',
  },
];

export const NIPT_REPORT_HIGHLIGHTS: NiptReportHighlight[] = [
  {
    title: '1. Fetal Fraction %',
    desc: 'Confirms enough baby cfDNA was present in maternal blood',
  },
  {
    title: '2. Clear Risk Status',
    desc: 'Easy-to-read Low Risk or High Risk result per condition',
  },
  {
    title: '3. Trisomy & Panel Markers',
    desc: 'Chromosomes 21, 18, 13 & selected microdeletion findings',
  },
  {
    title: '4. MD Doctor Sign-Off',
    desc: 'Verified by Molecular Genetics & Pathology specialists',
  },
];

export const NIPT_CORE_FAQS: NiptFaqItem[] = [
  {
    question: 'What is an NIPT test and how safe is it during pregnancy?',
    answer:
      "Non-Invasive Prenatal Testing (NIPT) is an advanced genetic blood screening test that analyzes cell-free fetal DNA (cfDNA) circulating in a pregnant mother's bloodstream. Because it only requires a standard venous blood draw from the mother's arm, it is completely non-invasive and poses zero procedural risk to the developing baby.",
  },
  {
    question: 'When can I take the NIPT test during pregnancy?',
    answer:
      'NIPT screening is generally recommended from 10 weeks of gestation onwards. At 10 weeks or later, sufficient fetal fraction (cell-free placental DNA) is typically present in maternal peripheral blood to generate reliable chromosomal risk assessments.',
  },
  {
    question: 'What is the difference between NIPT Basic, Advanced, and Comprehensive panels?',
    answer:
      'NIPT Basic screens for the three primary autosomal trisomies: Trisomy 21 (Down syndrome), Trisomy 18 (Edwards syndrome), and Trisomy 13 (Patau syndrome). NIPT Advanced adds sex chromosome aneuploidies and 8 targeted microdeletion syndromes (including DiGeorge, Cri-du-chat, Prader-Willi/Angelman, and Williams syndrome). NIPT Comprehensive provides genome-wide cfDNA screening covering common trisomies, sex chromosomes, microdeletions, rare autosomal trisomies, segmental CNVs, and SNP-based triploidy.',
  },
  {
    question: 'Is fasting required before NIPT blood sample collection?',
    answer:
      'No, fasting is generally not required before NIPT blood collection. Expectant mothers can eat and drink normally prior to their clinic appointment or scheduled home blood sample pickup.',
  },
  {
    question: 'How long does it take to receive NIPT test results at Henotic Diagnostics?',
    answer:
      'NIPT Basic, Advanced, and Comprehensive screening reports have a standard turnaround time (TAT) of 7 to 10 days from sample collection, following rigorous Next-Generation Sequencing (NGS) and Molecular Genetics quality verification.',
  },
  {
    question: 'Does a High-Risk NIPT result confirm a genetic condition?',
    answer:
      'No. NIPT is a high-sensitivity prenatal screening test, not a diagnostic test. A high-risk result indicates an increased probability of a chromosomal condition and should always be followed by genetic counselling and confirmatory diagnostic procedures such as Chorionic Villus Sampling (CVS) or Amniocentesis, as advised by your obstetrician.',
  },
  {
    question: 'What does a sample NIPT report show and how do I read my results?',
    answer:
      'A Henotic Diagnostics NIPT report clearly shows maternal and gestational details, Fetal Fraction percentage (confirming sufficient placental cfDNA in maternal blood), chromosome-wise risk status (Low Risk, High Risk, or No-Call / Inconclusive) for Trisomy 21, Trisomy 18, Trisomy 13 and selected panel conditions, NGS methodology, and sign-off by registered MD Molecular Genetics and Pathology doctors in Kharghar, Navi Mumbai. You can view and download our official sample NIPT PDF report directly in the Understanding NIPT Results section.',
  },
];
