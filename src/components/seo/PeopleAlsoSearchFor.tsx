import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

/**
 * "People Also Search For" — Boosts internal linking for PSEO pages.
 * Displays related service links based on the current service category.
 */

const RELATED_SEARCHES: Record<string, Array<{ label: string; slug: string }>> = {
  mri: [
    { label: 'MRI Brain', slug: 'mri-brain' },
    { label: 'MRI Spine', slug: 'mri-spine' },
    { label: 'MRI Knee', slug: 'mri-knee' },
    { label: 'MRI Shoulder', slug: 'mri-shoulder' },
    { label: 'Whole Body MRI', slug: 'whole-body-mri' },
    { label: 'Cardiac MRI', slug: 'cardiac-mri' },
    { label: 'MRI vs CT Scan', slug: '/compare/mri-vs-ct-scan' },
    { label: 'MRI Cost', slug: 'mri-scan' },
  ],
  ct: [
    { label: 'CT Brain', slug: 'ct-brain' },
    { label: 'HRCT Chest', slug: 'hrct-chest' },
    { label: 'CT Angiography', slug: 'ct-angiography' },
    { label: 'CT Abdomen', slug: 'abdomen-ct-scan' },
    { label: 'Low-Dose CT', slug: 'low-dose-ct' },
    { label: 'CT vs MRI', slug: '/compare/mri-vs-ct-scan' },
    { label: 'Whole Body CT', slug: 'whole-body-ct-scan' },
    { label: 'CT Scan Cost', slug: 'ct-scan' },
  ],
  pet: [
    { label: 'PET-CT Scan', slug: 'pet-ct' },
    { label: 'FDG PET-CT', slug: 'fdg-pet-ct' },
    { label: 'Cancer Screening', slug: 'cancer-screening' },
    { label: 'Oncology PET', slug: 'oncology-pet-ct' },
    { label: 'PET vs CT', slug: '/compare/pet-ct-vs-ct-scan' },
    { label: 'Bone Scan', slug: 'bone-scan' },
    { label: 'Nuclear Medicine', slug: 'nuclear-medicine' },
    { label: 'SPECT Scan', slug: 'spect-scan' },
  ],
  ultrasound: [
    { label: 'Abdominal Ultrasound', slug: 'abdominal-ultrasound' },
    { label: 'Pregnancy Sonography', slug: 'pregnancy-sonography' },
    { label: 'Thyroid Ultrasound', slug: 'thyroid-ultrasound' },
    { label: 'Breast Ultrasound', slug: 'breast-ultrasound' },
    { label: 'Pelvic Ultrasound', slug: 'pelvic-ultrasound' },
    { label: 'Color Doppler', slug: 'color-doppler' },
    { label: 'Anomaly Scan', slug: 'anomaly-scan' },
    { label: 'NT Scan', slug: 'nt-scan' },
  ],
  blood: [
    { label: 'CBC Test', slug: 'cbc-test' },
    { label: 'Thyroid Test', slug: 'thyroid-test' },
    { label: 'Lipid Profile', slug: 'lipid-profile' },
    { label: 'Liver Function Test', slug: 'liver-function-test' },
    { label: 'Kidney Function Test', slug: 'kidney-function-test' },
    { label: 'Vitamin D Test', slug: 'vitamin-d-test' },
    { label: 'HbA1c Test', slug: 'hba1c-test' },
    { label: 'Full Body Checkup', slug: 'full-body-check-up' },
  ],
  cardiac: [
    { label: '2D Echo Test', slug: '2d-echo' },
    { label: 'ECG Test', slug: 'ecg' },
    { label: 'TMT Test', slug: 'tmt-test' },
    { label: 'Holter Monitoring', slug: 'holter-monitoring' },
    { label: 'Stress Echo', slug: 'stress-echo' },
    { label: 'Angiography', slug: 'angiography' },
    { label: 'Cardiac Screening', slug: 'cardiac-screening' },
    { label: 'Echo vs ECG', slug: '/compare/2d-echo-vs-ecg' },
  ],
  default: [
    { label: 'MRI Scan', slug: 'mri-scan' },
    { label: 'CT Scan', slug: 'ct-scan' },
    { label: 'PET-CT', slug: 'pet-ct' },
    { label: 'Ultrasound', slug: 'ultrasound' },
    { label: 'Blood Test', slug: 'blood-test' },
    { label: '2D Echo', slug: '2d-echo' },
    { label: 'Health Checkup', slug: 'health-checkup' },
    { label: 'Mammography', slug: 'mammography' },
  ],
};

function getCategory(serviceSlug: string): string {
  if (serviceSlug.includes('mri')) return 'mri';
  if (serviceSlug.includes('ct') || serviceSlug.includes('hrct')) return 'ct';
  if (serviceSlug.includes('pet') || serviceSlug.includes('nuclear') || serviceSlug.includes('spect') || serviceSlug.includes('bone-scan')) return 'pet';
  if (serviceSlug.includes('ultrasound') || serviceSlug.includes('sonography') || serviceSlug.includes('doppler') || serviceSlug.includes('scan') && serviceSlug.includes('pregnancy')) return 'ultrasound';
  if (serviceSlug.includes('blood') || serviceSlug.includes('test') && !serviceSlug.includes('stress') || serviceSlug.includes('profile') || serviceSlug.includes('vitamin')) return 'blood';
  if (serviceSlug.includes('echo') || serviceSlug.includes('ecg') || serviceSlug.includes('tmt') || serviceSlug.includes('holter') || serviceSlug.includes('cardiac') || serviceSlug.includes('angio')) return 'cardiac';
  return 'default';
}

interface Props {
  currentServiceSlug: string;
}

export default function PeopleAlsoSearchFor({ currentServiceSlug }: Props) {
  const category = getCategory(currentServiceSlug);
  const suggestions = RELATED_SEARCHES[category] || RELATED_SEARCHES.default;
  // Exclude current service
  const filtered = suggestions.filter(s => s.slug !== currentServiceSlug);

  return (
    <section className="mt-12 mb-8">
      <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
        <Search size={18} className="text-blue-500" />
        People Also Search For
      </h3>
      <div className="flex flex-wrap gap-2">
        {filtered.map(item => (
          <Link
            key={item.slug}
            href={item.slug.startsWith('/') ? item.slug : `/services/${item.slug}`}
            className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
