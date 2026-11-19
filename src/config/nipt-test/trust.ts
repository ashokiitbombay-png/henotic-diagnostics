import type { NiptTrustContent } from './types';
import { NIPT_GOOGLE_MAPS_URL, NIPT_GOOGLE_PROFILE_URL } from './panels';

/**
 * Shared E-E-A-T authority trust signals for NIPT screening pages.
 * Used as static fallback when Payload global `nipt-trust` is unavailable or unconfigured.
 */
export const STATIC_NIPT_TRUST_CONTENT: NiptTrustContent = {
  googleRating: {
    rating: 4.9,
    reviewCount: 1100,
    profileUrl: NIPT_GOOGLE_PROFILE_URL,
    mapsUrl: NIPT_GOOGLE_MAPS_URL,
  },
  infrastructure: [
    {
      title: 'Henotic Diagnostics Main Facility',
      subtitle: 'Millennium Empire Business Park, Sector 15, Kharghar',
      tag: 'Main Building',
      image:
        'https://cdn.henoticdiagnostics.com/Front%20Office/henotic-diagnostics-main-building.webp',
    },
    {
      title: 'Next-Generation Gene Sequencing Wing',
      subtitle: 'Dedicated Molecular & Prenatal Screening Division',
      tag: 'NGS Facility',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/next-generation-gene-sequencing-laboratory-henotic-diagnostics.webp',
    },
    {
      title: 'Molecular Genetic Reception Desk',
      subtitle: 'Streamlined Prenatal Registration & Consent Assistance',
      tag: 'Reception Area',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/reception-molecular-genetic-testing-laboratory-henotic-diagnostics.webp',
    },
    {
      title: 'Expectant Mother Comfort Lounge',
      subtitle: 'Hygienic, Calm & Sanitized Patient Waiting Area',
      tag: 'Waiting Area',
      image:
        'https://cdn.henoticdiagnostics.com/Trust%20Signal/henotic-diagnostics-reception-waiting-area_hero.webp',
    },
    {
      title: 'Genetic Sequencing Testing Bay',
      subtitle: 'High-Precision Cell-Free DNA Processing Workflow',
      tag: 'Sequencing Lab',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/genetic-sequencing-testing-henotic-diagnostics.webp',
    },
    {
      title: 'Automated NGS Testing Laboratory',
      subtitle: 'Strict ISO & CAP-Aligned Quality Control Pipelines',
      tag: 'NGS Working Area',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/NIPT/ngs-testing-laboratory-henotic-diagnostics.webp',
    },
  ],
  doctors: [
    {
      name: 'Dr. Amulya Patil',
      degrees: 'MBBS, MD/MS, DNB – Pathology',
      registration: '2010/01/0129 Maharashtra Medical Council, 2010',
      bio: 'Dr. Amulya Patil is a dedicated medical professional specialising in Pathology, committed to accuracy, quality, and reliability in diagnostic services. With an academic association with reputed medical institutions such as MGM and Dr D. Y. Patil, Dr Patil emphasises precision in laboratory diagnosis and a patient-focused approach to healthcare.',
      image: 'https://cdn.henoticdiagnostics.com/Leadership/dr.amulya-patil.webp',
      focus: ['Diagnostic Pathology', 'Laboratory Medicine', 'Quality Assurance'],
    },
    {
      name: 'Dr. Prathibha Patil',
      degrees: 'MBBS, MD/MS, DNB – Molecular Genetics',
      registration: '61719 Maharashtra Medical Council, 1989',
      bio: 'Dr. Prathibha Patil is a dedicated medical professional specialising in Molecular Genetics, with a focus on accurate diagnostics, laboratory excellence, and quality-driven healthcare. Her profile highlights a commitment to reliable diagnostic practices and supporting clinicians in informed patient care, with institutional associations including MGM Hospitals, Apollo, and Medicover, subject to verification of specific affiliations.',
      image:
        'https://cdn.henoticdiagnostics.com/Leadership/dr-pratibha-patil-radiologist.webp',
      focus: [
        'Molecular Genetics',
        'Diagnostic Pathology',
        'Laboratory Medicine',
        'Quality Assurance',
      ],
    },
  ],
  certificates: [
    {
      id: 'nabl',
      name: 'NABL Certified',
      authority: 'National Accreditation Board for Testing and Calibration Laboratories',
      logo: 'https://cdn.henoticdiagnostics.com/Accreditation%20Logos/NABL-henotic-diagnsotics-kharghar.webp',
      certImage:
        'https://cdn.henoticdiagnostics.com/Certificates/Certificates_henotic-diagnostics-nabl-certified.webp',
      desc: 'Strict ISO 15189 compliance for medical laboratories ensuring reproducible, precise clinical tests.',
    },
    {
      id: 'cap',
      name: 'CAP Accredited Standards',
      authority: 'College of American Pathologists Guidelines',
      logo: 'https://cdn.henoticdiagnostics.com/Accreditation%20Logos/cap-accredidation-logo.webp',
      certImage:
        'https://cdn.henoticdiagnostics.com/Certificates/Certificates_henotic-diagnostics-cap-certified.webp',
      desc: 'International quality benchmark upholding clinical laboratory safety and rigorous quality controls.',
    },
    {
      id: 'iso',
      name: 'ISO Certified Quality',
      authority: 'International Organization for Standardization',
      logo: 'https://cdn.henoticdiagnostics.com/Accreditation%20Logos/iso-certification-for-henotic-diagnsotics-kharghar.webp',
      certImage:
        'https://cdn.henoticdiagnostics.com/Certificates/Certificates_henotic-diagnostics-iso-certified.webp',
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
      description:
        'Honored with the Outstanding Achievement Award in Healthcare Diagnostics for uncompromising clinical accuracy and rapid diagnostic turnarounds.',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/Awards/India%20Excellence-henotic-diagnostics-certified.webp',
      badgeLabel: 'Excellence',
      accentGlow: '#e7569b',
    },
    {
      id: 'asia-today',
      title: 'Asia Today Award',
      category: 'International Honor',
      year: '2022',
      organization: 'Asia Today Research & Media',
      description:
        'Proudly presented the Grand Trophy for Best Diagnostic Center in Central Region, marking exceptional regional service standards.',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/Awards/asiatoday-henotic-diagnostics-certified.webp',
      badgeLabel: 'Continental',
      accentGlow: '#6c6cf6',
    },
    {
      id: 'corona-puraskar',
      title: 'Corona Purashkar',
      category: 'Frontline Healthcare Citation',
      year: '2021',
      organization: 'National Medical Council & Red Cross',
      description:
        'Commended for relentless 24/7 RT-PCR sample handling, frontline mobile medical support, and emergency pandemic service delivery.',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/Awards/corona-purshkar-henotic-diagnostics-certified.webp',
      badgeLabel: 'COVID Hero',
      accentGlow: '#bb60b9',
    },
    {
      id: 'sbi-award',
      title: 'SBI Appreciation Award',
      category: 'Corporate Excellence',
      year: '2022',
      organization: 'State Bank of India Corporate Wellness',
      description:
        'Certificate of Appreciation for maintaining premier healthcare screening drives and corporate welfare partnerships across state branches.',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/Awards/sbi-award-henotic-diagnostics-certified.webp',
      badgeLabel: 'Corporate Trust',
      accentGlow: '#9f68c8',
    },
    {
      id: 'six-sigma',
      title: 'Six Sigma Quality Award',
      category: 'Clinical Standard of Care',
      year: '2023',
      organization: 'Healthcare Quality & Six Sigma Council',
      description:
        'Recognized for near-zero diagnostic deviation, strict adherence to ISO 15189 compliance, and premier sample archival pipelines.',
      image:
        'https://storage.googleapis.com/wp-media-henoticbucket/Awards/six-sigma-henotic-diagnostics-certified.webp',
      badgeLabel: 'Quality Assurance',
      accentGlow: '#8f64cf',
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Priya Sharma',
      service: 'NIPT Basic Screening Panel',
      quote:
        'My obstetrician advised an NIPT test at 11 weeks for early trisomy screening. Henotic Diagnostics arranged smooth home maternal blood collection in a specialised cfDNA tube, no fasting was required, and we received our clear report within 8 days.',
      image:
        'https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-full-body-checkup-testimonial-priya-sharma.webp',
      rating: 5,
    },
    {
      id: 2,
      name: 'Rahul Mehta',
      service: 'Comprehensive NIPT Test Panel',
      quote:
        'We booked the Comprehensive NIPT Test Panel for my wife during her first trimester. The genetic desk explained the parameters, ultrasound requirement, and turnaround time transparently, making the entire prenatal screening process reassuring.',
      image:
        'https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-comprehensive-health-checkup-testimonial-rahul-mehta.webp',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sneha Patil',
      service: 'Advanced NIPT Test Panel',
      quote:
        'Visiting the Kharghar facility for my 12-week Advanced NIPT screening was very comfortable. The expectant mother lounge was calm and hygienic, consent formalities were well guided, and the phlebotomist was extremely gentle.',
      image:
        'https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-full-body-health-checkup-testimonial-sneha-patil.webp',
      rating: 5,
    },
    {
      id: 4,
      name: 'Amit Deshmukh',
      service: 'NIPT Home Blood Collection',
      quote:
        "Because we wanted my wife to avoid travel during early pregnancy, we opted for Henotic Diagnostics' home sample pickup in Navi Mumbai. Punctual collection, proper sample labelling, and timely genetic report delivery made it completely stress-free.",
      image:
        'https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-preventive-health-checkup-testimonial-amit-deshmukh.webp',
      rating: 5,
    },
    {
      id: 5,
      name: 'Neha Kulkarni',
      service: 'Prenatal cfDNA Screening',
      quote:
        "I had several questions about the difference between the NIPT Basic and Comprehensive panels before booking. The team explained each panel's coverage patiently, coordinated smoothly with my gynaecologist's prescription, and delivered results right on schedule.",
      image:
        'https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-complete-body-checkup-testimonial-neha-kulkarni.webp',
      rating: 5,
    },
    {
      id: 6,
      name: 'Suresh Iyer',
      service: '10+ Weeks NIPT Screening',
      quote:
        'After our first-trimester ultrasound scan, our doctor recommended non-invasive prenatal cfDNA testing. Henotic Diagnostics handled everything professionally from gestational verification to MD Molecular Genetics verified reporting.',
      image:
        'https://cdn.henoticdiagnostics.com/Testimonials/henotic-diagnostics-annual-health-checkup-testimonial-suresh-iyer.webp',
      rating: 5,
    },
  ],
};
