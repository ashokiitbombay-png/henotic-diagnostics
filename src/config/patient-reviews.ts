export interface PatientReview {
  id: string;
  name: string;
  locality: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  category: "all" | "mri-ct" | "pet-ct" | "pathology" | "health-package" | "video";
  verified: boolean;
  avatarText?: string;
  videoThumbnail?: string;
  videoUrl?: string; // YouTube embed or direct URL
  videoDuration?: string;
}

export const PATIENT_REVIEWS: PatientReview[] = [
  // ── 1. Video Patient Stories ──────────────────────────────────────────────
  {
    id: "rev-video-1",
    name: "Vikram & Sunita Deshmukh",
    locality: "Kharghar, Navi Mumbai",
    service: "3.0 Tesla Wide-Bore MRI Spine",
    rating: 5,
    date: "3 days ago",
    text: "My husband was severely claustrophobic and couldn't complete an MRI elsewhere. At Henotic Kharghar, the 70cm wide-bore scanner and calming staff made it completely comfortable. Received reports within 4 hours.",
    category: "video",
    verified: true,
    avatarText: "VD",
    videoThumbnail: "https://cdn.henoticdiagnostics.com/Miscellaneous%20Section%20Images/934e91ce-ct-scan-kharghar-01-scaled.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Representative video embed
    videoDuration: "1:45 min",
  },
  {
    id: "rev-video-2",
    name: "Meera Krishnan",
    locality: "Vashi, Navi Mumbai",
    service: "Digital PET-CT Whole Body",
    rating: 5,
    date: "1 week ago",
    text: "Doctor recommended a PET-CT for oncology staging. Henotic team explained the 6-hour fasting and uptake process clearly. The peaceful private uptake room and caring nurses made a stressful day easy.",
    category: "video",
    verified: true,
    avatarText: "MK",
    videoThumbnail: "https://cdn.henoticdiagnostics.com/Trust%20Signal/henotic-diagnostics-pet-scan_hero.webp",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoDuration: "2:10 min",
  },

  // ── 2. MRI & CT Reviews ───────────────────────────────────────────────────
  {
    id: "rev-mri-1",
    name: "Ravi Sharma",
    locality: "Panvel, Navi Mumbai",
    service: "3.0T MRI Brain with Contrast",
    rating: 5,
    date: "1 week ago",
    text: "World-class 3T MRI center in Panvel-Kharghar region. The technologist took time to explain the scan sequences, and the noise-cancellation headphones played relaxing music. Report was verified by Dr. Rajesh Sharma with exceptional clarity.",
    category: "mri-ct",
    verified: true,
    avatarText: "RS",
  },
  {
    id: "rev-ct-1",
    name: "Anjali Kulkarni",
    locality: "Kharghar, Sector 15",
    service: "128-Slice HRCT Chest",
    rating: 5,
    date: "2 weeks ago",
    text: "Fastest CT scan experience! I arrived with a persistent cough; the staff did the scan in under 3 minutes with ultra-low dose radiation. Had the digital report on WhatsApp before reaching home.",
    category: "mri-ct",
    verified: true,
    avatarText: "AK",
  },
  {
    id: "rev-mri-2",
    name: "Prashant Joshi",
    locality: "Seawoods, Navi Mumbai",
    service: "3.0T MRI Knee Joint (Cartilage Mapping)",
    rating: 5,
    date: "3 weeks ago",
    text: "Sports injury while running. The orthopedic surgeon specifically insisted on Henotic's 3.0 Tesla MRI because of their sub-millimeter meniscus cartilage resolution. Extremely satisfied with the diagnostic accuracy.",
    category: "mri-ct",
    verified: true,
    avatarText: "PJ",
  },

  // ── 3. PET-CT Reviews ────────────────────────────────────────────────────
  {
    id: "rev-pet-1",
    name: "Dinesh Singhania",
    locality: "Mumbai",
    service: "18F-FDG PET-CT Whole Body",
    rating: 5,
    date: "2 weeks ago",
    text: "We traveled from South Mumbai for PET-CT after comparing facilities. The pricing is nearly 40% more transparent than private hospitals, and the machine quality is top-tier Siemens biograph technology. Highly recommended.",
    category: "pet-ct",
    verified: true,
    avatarText: "DS",
  },
  {
    id: "rev-pet-2",
    name: "Gauri Mahajan",
    locality: "Thane West",
    service: "DOTA / PSMA PET Scan",
    rating: 5,
    date: "1 month ago",
    text: "Prompt scheduling, courteous radio-pharmacist, and doctor was available to answer our queries on post-scan radiation precautions. Excellent oncology imaging standard.",
    category: "pet-ct",
    verified: true,
    avatarText: "GM",
  },

  // ── 4. Pathology & Home Collection Reviews ────────────────────────────────
  {
    id: "rev-path-1",
    name: "Sanjay Patil",
    locality: "Kharghar, Navi Mumbai",
    service: "Home Blood Sample Collection (CBC + HbA1c)",
    rating: 5,
    date: "4 days ago",
    text: "Phlebotomist arrived right on time at 7:00 AM wearing sterile PPE. Completely painless blood draw for my elderly parents. Digital PDF report delivered by 1:00 PM the same day.",
    category: "pathology",
    verified: true,
    avatarText: "SP",
  },
  {
    id: "rev-path-2",
    name: "Pooja Varma",
    locality: "CBD Belapur",
    service: "Thyroid & Vitamin D / B12 Panel",
    rating: 5,
    date: "2 weeks ago",
    text: "NABL accredited lab accuracy gives complete peace of mind. Barcode tube labeling was done right in front of me. Clean, automated, and trustworthy.",
    category: "pathology",
    verified: true,
    avatarText: "PV",
  },

  // ── 5. Health Checkup Packages ───────────────────────────────────────────
  {
    id: "rev-checkup-1",
    name: "Ramesh & Sunita Gupta",
    locality: "Kamothe, Panvel",
    service: "Senior Citizen Full Body Health Checkup (85+ Tests)",
    rating: 5,
    date: "5 days ago",
    text: "Booked annual checkups for both my parents. Included 2D Echo, Ultrasound Abdomen, ECG, and full blood work. Completed everything in 2.5 hours with complimentary breakfast. Great hospitality.",
    category: "health-package",
    verified: true,
    avatarText: "RG",
  },
  {
    id: "rev-checkup-2",
    name: "Amitabh Banerjee",
    locality: "Vashi, Sector 17",
    service: "Executive Heart & Diabetes Screening Package",
    rating: 5,
    date: "2 weeks ago",
    text: "Invaluable early detection! The 2D Echo picked up minor aortic valve thickening which my regular physician corroborated. The doctors at Henotic are true clinicians, not just report printers.",
    category: "health-package",
    verified: true,
    avatarText: "AB",
  },
];

export const GOOGLE_RATING_SUMMARY = {
  rating: "4.9",
  totalReviews: "1,240+",
  fiveStarPercentage: "96%",
  verifiedPatients: "100%",
  onTimeReports: "99.4%",
};
