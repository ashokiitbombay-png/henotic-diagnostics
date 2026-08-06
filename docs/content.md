# Henotic Diagnostics Content Architecture & Brand Guidelines

## 1. Brand Voice, Tone & Messaging Philosophy

Henotic Diagnostics serves as a trusted medical bridge connecting patients with premier NABL-accredited diagnostic and imaging centers across Mumbai, Navi Mumbai, Thane, and surrounding sub-regions.

### Core Persona & Tone Principles
- **Clinical Authority & Precision**: Content must convey medical accuracy, NABL accreditation standards, and radiological integrity. Avoid sensationalism or non-verified medical claims.
- **Empathy & Reassurance**: Patients seeking diagnostic tests often experience anxiety. Content must be compassionate, clear, and reassuring.
- **Price Transparency & Efficiency**: Clear upfront messaging regarding discounts (up to 50% off corporate rates), zero hidden charges, and instant appointment booking.
- **Hyper-Local Relevance**: Content must reference familiar local landmarks (e.g. Near Kharghar Station, Opp. Inorbit Vashi, Near Hiranandani Estate Thane) to instill local trust.

---

## 2. Page Content Audit & Matrix Requirements

### A. Homepage (`/`)
- **Hero Title**: Premier NABL-Accredited Diagnostic Booking Portal in Mumbai & Navi Mumbai.
- **Key Content Sections**: Category Grid (14 Modalities), Partner Diagnostic Centers Locator, Instant Search Bar, Why Choose Henotic Trust Badges, Patient Reviews, FAQ Accordion.
- **Tone**: Welcoming, authoritative, action-oriented.

### B. Programmatic SEO (PSEO) Service Matrix (`/services/...`)
- **Level 1 (`/services/[service]`)**: Complete clinical description of test, preparation instructions (fasting rules, contrast guidelines), turn-around time (TAT), and price range.
- **Level 2 (`/services/[service]/[region]`)**: Regional center locator, region-specific pricing, parking/transit info.
- **Level 3 (`/services/[service]/[region]/[location]`)**: Micro-location specific landing page with exact partner center addresses, landmark directions, and immediate WhatsApp dispatch link.

### C. Standalone Booking Portal (`/booking-system/`)
- **Headline**: Henotic Diagnostics | Online Diagnostic Booking Portal.
- **Key Modules**: 400+ diagnostic test search, 20 partner center selector, patient details form, 3D live WhatsApp preview dispatcher, VIP digital printable voucher generator, booking audit log.
- **Tone**: Streamlined, professional, instant.

### D. Medical Conditions Matrix (`/conditions/[condition]`)
- **Purpose**: Educational diagnostic guides for symptoms (Back Pain, Knee Pain, Abdominal Pain, etc.).
- **Content Structure**: Overview of condition ➔ Recommended Scans/Tests ➔ When to consult a doctor ➔ Instant booking widget.

### E. Diagnostic Comparisons (`/compare/[slug]`)
- **Purpose**: Comparative guide for similar imaging modalities (e.g. `mri-vs-ct-scan`, `pet-ct-vs-ct-scan`, `ct-scan-vs-x-ray`).
- **Content Structure**: Radiation exposure comparison, soft tissue vs bone resolution, duration, cost comparison table, clinical recommendations.

### F. Doctor & Specialist Profiles (`/doctors/[slug]`)
- **Purpose**: Radiologist and pathologist credentials, experience, sub-specializations, affiliated diagnostic centers.

### G. Headless WordPress Blog (`/blog` & `/blog/[slug]`)
- **Purpose**: Patient education articles, health screening guides, medical technology updates.
- **Content Integrity**: Fallback CDN images (`blog-image-helper.ts`) ensure zero broken images or empty gradient boxes.

---

## 3. Comprehensive Diagnostic Service Catalog Mapping (14 Categories)

Below is the complete mapping of all 400+ diagnostic services across 14 parent categories:

```
Category 1: Diagnostic Center & Health Screening Packages
  ├── General: diagnostic-center, medical-imaging-center, radiology-center, pathology-lab
  ├── Health Checkups: full-body-check-up, master-health-checkup, executive-health-screening
  └── Specialized Packages: women-health-checkup, senior-citizen-health-checkup, cardiac-health-checkup

Category 2: Pathology & Blood Tests
  ├── Routine Blood Work: cbc-test, lipid-profile, thyroid-profile, liver-function-test, kidney-function-test
  ├── Diabetes & Metabolic: hba1c-test, vitamin-d-test, vitamin-b12-test, iron-profile
  └── Specialized Pathology: tumor-marker-test, hormone-test, allergy-test, home-blood-collection

Category 3: Ultrasound (USG) & Sonography
  ├── Abdomen & Organ: abdominal-ultrasound, pelvic-ultrasound, whole-abdomen-ultrasound, kub-ultrasound
  ├── Small Parts: thyroid-ultrasound, breast-ultrasound, scrotal-ultrasound, parotid-ultrasound
  └── Procedures: usg-guided-fnac, usg-guided-biopsy, musculoskeletal-ultrasound

Category 4: Pregnancy & Fetal Medicine
  ├── Routine Trimester Scans: early-pregnancy-scan, dating-scan, viability-scan, 1st/2nd/3rd trimester scans
  ├── Advanced Fetal Scans: nt-scan, anomaly-scan (level-2), targeted-anomaly-scan, fetal-growth-scan
  └── Specialty Fetal: fetal-doppler, fetal-echocardiography, fetal-bpp, high-risk-pregnancy-scan

Category 5: Color Doppler Studies
  ├── Vascular Doppler: arterial-doppler, venous-doppler, dvt-doppler, carotid-artery-doppler
  ├── Organ & Limb: renal-doppler, lower-limb-doppler, upper-limb-doppler, peripheral-arterial-doppler
  └── Obstetric Doppler: pregnancy-doppler, uterine-artery-doppler, umbilical-artery-doppler

Category 6: Women's Health & Breast Imaging
  ├── Mammography: digital-mammography, 3d-mammography, digital-breast-tomosynthesis, sonomammography
  └── Reproductive & Fertility: follicular-study, fertility-scan, ovulation-monitoring, pelvic-scan, hsg-test

Category 7: MRI Services (Magnetic Resonance Imaging)
  ├── Brain & Neuro: mri-brain, brain-mri, mri-pituitary, mri-orbit, mr-angiography
  ├── Musculoskeletal & Spine: mri-spine, cervical-spine-mri, lumbar-spine-mri, knee-mri, shoulder-mri, hip-mri
  └── Body & Contrast: abdominal-mri, pelvic-mri, breast-mri, cardiac-mri, mrcp-scan, whole-body-mri

Category 8: CT Scan Services (Computed Tomography)
  ├── High-Resolution & Neuro: hrct-chest, ct-brain, ct-pns, ct-temporal-bone, ct-spine
  ├── Body & Angiography: chest-ct-scan, ct-abdomen-pelvis, ct-kub, coronary-ct-angiography
  └── Interventional & Low Dose: ct-guided-biopsy, low-dose-ct, lung-cancer-screening-ct

Category 9: PET-CT & Nuclear Medicine
  ├── PET-CT Imaging: whole-body-pet-ct, fdg-pet-ct, psma-pet-scan, dota-pet-ct, fapi-pet-ct, dopa-pet-ct
  └── Nuclear Scintigraphy: bone-scan, renal-scan (dtpa/ec/mag3), thyroid-scan, myocardial-perfusion-scan

Category 10: Bone Health & DEXA
  └── Bone Mineral Density: dexa-bone-scan, bone-density-test, bmd-test, osteoporosis-screening

Category 11: Cardiology Diagnostics & Interventions
  ├── Non-Invasive: ecg, 2d-echo, color-echo, stress-echo, tmt-test, holter-monitoring (24h/48h/72h), abpm
  └── Interventional: coronary-angiography, angioplasty, cardiac-catheterization

Category 12: Fibroscan & Liver Diagnostics
  └── Liver Elastography: fibroscan-test, liver-fibroscan, liver-elastography, fatty-liver-screening

Category 13: Genetic Testing & Genomic Sequencing
  ├── Cytogenetics & Prenatal: nipt-test, karyotype-test, carrier-screening, chromosomal-microarray
  └── Genomic Sequencing: whole-exome-sequencing, whole-genome-sequencing, next-generation-sequencing (ngs)

Category 14: Microbiome, Urology & Emergency Transport
  ├── Gut Microbiome: gut-health-test, stool-microbiome-analysis, gut-dysbiosis-test
  ├── Urology: uroflowmetry, urodynamic-study, cystometry, post-void-residual-urine
  └── Ambulance Services: emergency-ambulance, icu-ambulance, als-ambulance, bls-ambulance, wheelchair-ambulance
```

---

## 4. Geographic Region & Micro-Location Mapping

```
Region 1: Navi Mumbai
  ├── Nodes: Kharghar, Vashi, Panvel, Nerul, Belapur, Seawoods, Kamothe, Kalamboli, Ghansoli, Airoli

Region 2: Western Suburbs (Mumbai)
  ├── Nodes: Andheri (East/West), Borivali, Bandra, Goregaon, Malad, Kandivali, Santacruz, Vile Parle

Region 3: Central Suburbs (Mumbai)
  ├── Nodes: Ghatkopar, Mulund, Kurla, Chembur, Vidyavihar, Bhandup, Kanjurmarg, Sion

Region 4: South Mumbai
  ├── Nodes: Dadar, Worli, Lower Parel, Byculla, Colaba, Marine Lines, Girgaon

Region 5: Thane & Beyond
  ├── Nodes: Thane West, Thane East, Ghodbunder Road, Majiwada, Vartak Nagar, Dombivli, Kalyan
```

---

## 5. Call-to-Action (CTA) Standards & Conventions

| Action Context | Primary CTA Button Text | Iconography | Action Target |
| :--- | :--- | :--- | :--- |
| **Instant WhatsApp Booking** | `Book via WhatsApp (Get 50% Off)` | `fa-brands fa-whatsapp` | WhatsApp Deep Link |
| **Phone Booking / Helpline** | `Call 08879327184 Now` | `fa-solid fa-phone` | `tel:08879327184` |
| **Center Directions** | `View Google Maps Location` | `fa-solid fa-location-dot` | Google Maps URL |
| **Report Download** | `Download Patient Report (OTP)` | `fa-solid fa-file-pdf` | `/reports` |
| **Digital Pass Print** | `Print VIP Priority Pass` | `fa-solid fa-print` | Modal Print Trigger |

---

## 6. Medical Compliance & Statutory Disclaimers

### Statutory Compliance Standards
1. **NABL Accreditation**: All partner laboratories operate under strict ISO 15189 NABL quality guidelines.
2. **PCPNDT Act Compliance**: Henotic Diagnostics strictly prohibits gender determination tests for prenatal ultrasound scans in full compliance with the Pre-Conception and Pre-Natal Diagnostic Techniques Act, 1994.
3. **AERB Compliance**: All X-Ray, CT Scan, and PET-CT equipment operate under Atomic Energy Regulatory Board (AERB) safety standards with low-radiation protocols.
4. **Medical Disclaimer Notice**:
   > *"The information provided on this platform is for educational and booking convenience purposes only and does not substitute professional medical advice, diagnosis, or treatment. Always consult a qualified physician."*

---

## 7. SEO Content Standards & JSON-LD Schema Maps

### Mandatory Schema Implementations per Page Type
- **Homepage & Location Pages**: `MedicalClinic` & `DiagnosticLab` schemas with geographical geo-coordinates, address, opening hours, and phone numbers.
- **Service Pages**: `MedicalTest` & `MedicalProcedure` schemas with procedure type, preparation rules, and price specification.
- **Doctor Pages**: `Physician` & `Person` schemas with credentials and affiliations.
- **Blog Posts**: `BlogPosting` & `Article` schemas with author, publisher logo, and datePublished.
- **All Pages**: `BreadcrumbList` schema for seamless hierarchical navigation indexing.
