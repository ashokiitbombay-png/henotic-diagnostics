# Model Context & Data Schemas

## 1. Domain Configuration Catalogs

### A. Diagnostic Tests Catalog (`src/config/services.ts`)
Contains 400+ diagnostic modalities categorized into 14 core medical parent categories:
1. **MRI Scans** (Brain, Spine, Joints, Abdomen, Cardiac, Angiography)
2. **CT Scans** (Brain, HRCT Chest, Abdomen, Angiography, Calcium Scoring)
3. **PET-CT Scans** (Whole Body FDG, PSMA Prostate, Brain DOTA)
4. **Ultrasound (USG)** (Abdomen, Pelvis, Small Parts)
5. **Color Doppler** (Carotid, Arterial, Venous, Renal)
6. **Pathology & Blood Tests** (CBC, Lipid, HbA1c, Thyroid, Comprehensive Packages)
7. **Cardiology & ECG** (2D Echo, Stress Test, Holter Monitoring)
8. **Mammography** (Digital 3D Tomosynthesis)
9. **Fetal Medicine** (NT Scan, Anomaly Scan, Growth Scan)
10. **Genetics & Genomics** (Karyotyping, NIPT, NGS Panels)
11. **Microbiome & Specialty** (Gut Health, Allergy Panels)
12. **Urology & Urodynamics** (Uroflowmetry)
13. **X-Ray & Digital Radiology** (Chest, Bone, Dental OPG)
14. **Ambulance & Emergency Support**

---

### B. Geographic Location Matrix (`src/config/locations.ts` & `cities.ts`)
Organized across regions and micro-locations:
- **Regions**: `navi-mumbai`, `western-suburbs`, `central-suburbs`, `south-mumbai`, `thane`.
- **Micro-Locations**: `kharghar`, `vashi`, `panvel`, `nerul`, `belapur`, `andheri`, `borivali`, `bandra`, `ghatkopar`, `mulund`, `thane-west`, etc.

---

### C. Conditions, Doctors & Comparisons
- **Medical Conditions** (`src/config/conditions.ts`): Back Pain, Knee Pain, Joint Pain, Cardiac Risk, Abdominal Pain, etc.
- **Doctors & Radiologists** (`src/config/doctors.ts`): Specialist profiles, credentials, NABL affiliations.
- **Comparisons Matrix** (`src/config/comparisons.ts`): Test comparisons (e.g. `mri-vs-ct-scan`, `pet-ct-vs-ct-scan`).

---

## 2. PSEO Matrix Routing Schema

```
/services/[service]
  └── /services/[service]/[region]
        └── /services/[service]/[region]/[location]
```

- **Level 1**: Primary Service Page (e.g., `/services/mri-scan`)
- **Level 2**: Regional Service Page (e.g., `/services/mri-scan/navi-mumbai`)
- **Level 3**: Micro-Location Service Page (e.g., `/services/mri-scan/navi-mumbai/kharghar`)

---

## 3. Streaming Sitemap Architecture Schema

- **Master Sitemap Index**: `public/sitemap.xml`
- **Sitemap Chunks**:
  - `public/sitemaps/sitemap-1.xml` (10,000 URLs)
  - `public/sitemaps/sitemap-2.xml` (10,000 URLs)
  - `public/sitemaps/sitemap-3.xml` (10,000 URLs)
  - `public/sitemaps/sitemap-4.xml` (10,000 URLs)
  - `public/sitemaps/sitemap-5.xml` (~5,084 URLs)
- **Generator Script**: `scripts/generate-sitemaps.ts`

---

## 4. Headless WordPress GraphQL Schema

- **GraphQL Endpoint**: WPGraphQL endpoint configured in `src/lib/apollo-client.ts`.
- **Primary Operations**:
  - `GetPosts`: Retrieves paginated blog posts with featured images, titles, dates, excerpts, and category nodes.
  - `GetPostBySlug`: Retrieves single blog post content and SEO metadata.
- **Fallback Handler**: `src/lib/blog-image-helper.ts` (`getBlogImageUrl`). Replaces null/invalid images with GCS CDN curated medical imagery.
