import fs from 'fs';
import path from 'path';

// In-memory baseline fallback database for serverless edge contexts
const fallbackDatabase: Record<string, { title: string; content: string }> = {
  "/about-us": {
    title: "About Henotic Diagnostics",
    content: "<p>Henotic Diagnostics is a premier diagnostic center offering high-fidelity medical imaging and pathology testing.</p>"
  },
  "/privacy": {
    title: "Privacy Policy",
    content: "<p>Your privacy is protected with 256-bit encryption and strict confidentiality standards.</p>"
  },
  "/terms": {
    title: "Terms of Service",
    content: "<p>Read our patient-centric terms, policies, and guidelines.</p>"
  },
  "mri-scan": {
    title: "MRI Scan (3T)",
    content: "<p>Advanced high-resolution 3T MRI Scan providing outstanding clinical clarity with same-day reports.</p>"
  },
  "ct-scan": {
    title: "CT Scan (128 Slice)",
    content: "<p>Low-dose 128-slice CT Scan for high-speed diagnostic accuracy.</p>"
  },
  "pet-scan": {
    title: "PET-CT Scan",
    content: "<p>Whole body PET-CT scan for oncologist-level precision and pathology detection.</p>"
  },
  "ultrasound": {
    title: "Sonography / USG",
    content: "<p>Highly accurate ultrasound screening for pregnancy and abdominal diagnostics.</p>"
  },
  "blood-test": {
    title: "Pathology Blood Tests",
    content: "<p>Comprehensive blood collection profiles and clinical laboratory panels.</p>"
  }
};

export function getFailsafeData(key: string): { title: string; content: string } | null {
  try {
    const cachePath = path.join(process.cwd(), 'src/lib/wordpress/failsafe-cache.json');
    if (fs.existsSync(cachePath)) {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
      if (cache[key]) {
        return cache[key];
      }
    }
  } catch (e) {
    console.warn("Failsafe cache file read failed, falling back to static database:", e);
  }
  
  return fallbackDatabase[key] || null;
}

export function saveFailsafeData(key: string, data: { title: string; content: string }) {
  try {
    const cachePath = path.join(process.cwd(), 'src/lib/wordpress/failsafe-cache.json');
    let cache: Record<string, any> = {};
    if (fs.existsSync(cachePath)) {
      cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
    }
    cache[key] = data;
    // Create directory if not exists
    const dir = path.dirname(cachePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
    console.log(`💾 [FAILSAFE STORAGE] Mirrored data for key "${key}" to local cache.`);
  } catch (e) {
    // In serverless environments, writes may be restricted, which is handled gracefully
    console.warn(`[FAILSAFE STORAGE] Write failed for key "${key}" (expected in serverless environments).`);
  }
}
