import type { HealthCheckupTrustContent } from './types';

/**
 * Static fallback for the Payload global `health-checkup-trust`.
 * Shared E-E-A-T content rendered on every health checkup authority page.
 */

export const EXACT_SPECTRUM_CSS =
  'linear-gradient(90deg, #e7569b 0%, #d85ba8 10%, #6c6cf6 28%, #bb60b9 52%, #9f68c8 76%, #8f64cf 100%)';

export const LAB_PHONE_DISPLAY = '8879327184';
export const LAB_PHONE_TEL = 'tel:+918879327184';
export const LAB_WHATSAPP_NUMBER = '918879327184';

const CDN = 'https://cdn.henoticdiagnostics.com';

export const STATIC_TRUST_CONTENT: HealthCheckupTrustContent = {
  googleRating: {
    rating: 4.9,
    reviewCount: 1062,
    profileUrl: 'https://share.google/RAAFJ2ACO6qnsqpDR',
    mapsUrl: 'https://maps.app.goo.gl/CZexFwm1wLPbsgKP7',
  },
  infrastructure: [
    { title: 'Main Diagnostic Facility', subtitle: 'Millennium Empire Business Park, Kharghar', image: `${CDN}/Front%20Office/henotic-diagnostics-main-building.webp`, tag: 'Flagship Center' },
    { title: 'Executive Entrance & Board', subtitle: 'Sector 15, Direct Access Road', image: `${CDN}/Front%20Office/henotic-diagnostics-name-plate.webp`, tag: 'Easy Access' },
    { title: 'Patient Reception Desk', subtitle: 'Digital registration & barcoding kiosk', image: `${CDN}/Trust%20Signal/reception-desk-henotic-diagnostics_hero.webp`, tag: 'Zero Wait Desk' },
    { title: 'Comfortable Waiting Lounge', subtitle: 'Sanitized climate-controlled recovery space', image: `${CDN}/Trust%20Signal/henotic-diagnostics-reception-waiting-area_hero.webp`, tag: 'Patient Comfort' },
    { title: 'Automated Pathology Suite', subtitle: 'Fully automated biochemistry & hematology analyzer', image: `${CDN}/Laboratory/pathology-lab-near-me-henotic-diagnostics-kharghar.webp`, tag: 'High Precision' },
    { title: 'Clinical Diagnostics Lab', subtitle: 'NABL & ISO compliant sample processing line', image: `${CDN}/Laboratory/henotic-diagnostics.webp`, tag: 'Sterile Workstations' },
  ],
  doctors: [
    {
      name: 'Dr. Amulya Patil',
      degrees: 'MBBS, MD/MS, DNB – Pathology',
      registration: '2010/01/0129 Maharashtra Medical Council, 2010',
      bio: 'Dedicated medical professional specialising in Pathology, committed to accuracy, quality, and reliability in diagnostic services. With an academic association with reputed medical institutions such as MGM and Dr D. Y. Patil, Dr Patil emphasises precision in laboratory diagnosis and a patient-focused approach.',
      focus: ['Diagnostic Pathology', 'Laboratory Medicine', 'Quality Assurance'],
      image: `${CDN}/Leadership/dr.amulya-patil.webp`,
    },
    {
      name: 'Dr. Prathibha Patil',
      degrees: 'MBBS, MD/MS, DNB – Pathology',
      registration: '61719 Maharashtra Medical Council, 1989',
      bio: 'Dedicated medical professional specialising in Pathology, with a focus on accurate diagnostics, laboratory excellence, and quality-driven healthcare. Commitment to reliable diagnostic practices with institutional associations including MGM Hospitals, Apollo, and Medicover.',
      focus: ['Diagnostic Pathology', 'Clinical Hematology', 'Quality Assurance'],
      image: `${CDN}/Leadership/dr-pratibha-patil-radiologist.webp`,
    },
  ],
  certificates: [
    {
      id: 'nabl',
      name: 'NABL Certified',
      authority: 'National Accreditation Board for Testing and Calibration Laboratories',
      logo: `${CDN}/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp`,
      certImage: `${CDN}/Certificates/Certificates_henotic-diagnostics-nabl-certified.webp`,
      desc: 'Strict ISO 15189 compliance for medical laboratories ensuring reproducible, precise clinical tests.',
    },
    {
      id: 'cap',
      name: 'CAP Accredited Standards',
      authority: 'College of American Pathologists Guidelines',
      logo: `${CDN}/Accreditation%20Logos/cap-accredidation-logo.webp`,
      certImage: `${CDN}/Certificates/Certificates_henotic-diagnostics-cap-certified.webp`,
      desc: 'International quality benchmark upholding clinical laboratory safety and rigorous quality controls.',
    },
    {
      id: 'iso',
      name: 'ISO Certified Quality',
      authority: 'International Organization for Standardization',
      logo: `${CDN}/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp`,
      certImage: `${CDN}/Certificates/Certificates_henotic-diagnostics-iso-certified.webp`,
      desc: 'Standardized operational procedures from phlebotomy collection to digital report dissemination.',
    },
  ],
  awards: [
    {
      id: 'india-excellence',
      title: 'India Excellence Awards',
      category: 'National Recognition',
      year: '2023',
      organization: 'ET Now & Industry Leaders Forum',
      description: 'Honored with the Outstanding Achievement Award in Healthcare Diagnostics for uncompromising clinical accuracy and rapid diagnostic turnarounds.',
      image: `${CDN}/Awards/India%20Excellence-henotic-diagnostics-certified.webp`,
      badgeLabel: 'Excellence',
      accentGlow: '#e7569b',
    },
    {
      id: 'asia-today',
      title: 'Asia Today Award',
      category: 'International Honor',
      year: '2022',
      organization: 'Asia Today Research & Media',
      description: 'Proudly presented the Grand Trophy for Best Diagnostic Center in Central Region, marking exceptional regional service standards.',
      image: `${CDN}/Awards/asiatoday-henotic-diagnostics-certified.webp`,
      badgeLabel: 'Continental',
      accentGlow: '#6c6cf6',
    },
    {
      id: 'corona-puraskar',
      title: 'Corona Purashkar',
      category: 'Frontline Healthcare Citation',
      year: '2021',
      organization: 'National Medical Council & Red Cross',
      description: 'Commended for relentless 24/7 RT-PCR sample handling, frontline mobile medical support, and emergency pandemic service delivery.',
      image: `${CDN}/Awards/corona-purshkar-henotic-diagnostics-certified.webp`,
      badgeLabel: 'COVID Hero',
      accentGlow: '#bb60b9',
    },
    {
      id: 'sbi-award',
      title: 'SBI Appreciation Award',
      category: 'Corporate Excellence',
      year: '2022',
      organization: 'State Bank of India Corporate Wellness',
      description: 'Certificate of Appreciation for maintaining premier healthcare screening drives and corporate welfare partnerships across state branches.',
      image: `${CDN}/Awards/sbi-award-henotic-diagnostics-certified.webp`,
      badgeLabel: 'Corporate Trust',
      accentGlow: '#9f68c8',
    },
    {
      id: 'six-sigma',
      title: 'Six Sigma Quality Award',
      category: 'Clinical Standard of Care',
      year: '2023',
      organization: 'Healthcare Quality & Six Sigma Council',
      description: 'Recognized for near-zero diagnostic deviation, strict adherence to ISO 15189 compliance, and premier sample archival pipelines.',
      image: `${CDN}/Awards/six-sigma-henotic-diagnostics-certified.webp`,
      badgeLabel: 'Quality Assurance',
      accentGlow: '#8f64cf',
    },
  ],
  testimonials: [
    { id: 1, name: 'Priya Sharma', service: 'Full Body Health Checkup', quote: 'I booked a full body checkup at Henotic Diagnostics for a routine health screening. The booking process was simple, the staff was courteous, and the overall experience was smooth. It was a convenient way to stay on top of my health.', image: `${CDN}/Testimonials/henotic-diagnostics-full-body-checkup-testimonial-priya-sharma.webp`, rating: 5 },
    { id: 2, name: 'Rahul Mehta', service: 'Comprehensive Health Checkup', quote: 'I was looking for a convenient place for my regular health checkup and chose Henotic Diagnostics. The staff explained the process clearly, and I appreciated the organized service and professional approach.', image: `${CDN}/Testimonials/henotic-diagnostics-comprehensive-health-checkup-testimonial-rahul-mehta.webp`, rating: 5 },
    { id: 3, name: 'Sneha Patil', service: 'Full Body Checkup', quote: 'My experience at Henotic Diagnostics was pleasant from start to finish. The team was polite and helpful, and the sample collection process was handled professionally. I would consider them again for routine health tests.', image: `${CDN}/Testimonials/henotic-diagnostics-full-body-health-checkup-testimonial-sneha-patil.webp`, rating: 5 },
    { id: 4, name: 'Amit Deshmukh', service: 'Preventive Health Checkup', quote: 'I believe regular health screening is important, so I booked a preventive checkup at Henotic Diagnostics. The process was straightforward, and the team made the visit comfortable. A convenient option for people with busy schedules.', image: `${CDN}/Testimonials/henotic-diagnostics-preventive-health-checkup-testimonial-amit-deshmukh.webp`, rating: 5 },
    { id: 5, name: 'Neha Kulkarni', service: 'Complete Body Health Checkup', quote: 'I wanted to get my routine health tests done without unnecessary hassle. Henotic Diagnostics offered a convenient experience, and the staff guided me through the process. I liked the professional and welcoming environment.', image: `${CDN}/Testimonials/henotic-diagnostics-complete-body-checkup-testimonial-neha-kulkarni.webp`, rating: 5 },
    { id: 6, name: 'Suresh Iyer', service: 'Annual Full Body Checkup', quote: 'I booked an annual health checkup to make preventive healthcare part of my routine. The experience at Henotic Diagnostics was well organised, and the team was helpful throughout my visit. Regular screening is a useful step.', image: `${CDN}/Testimonials/henotic-diagnostics-annual-health-checkup-testimonial-suresh-iyer.webp`, rating: 5 },
  ],
};
