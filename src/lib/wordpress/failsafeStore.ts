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
  },
  "stress-echo": {
    title: "Stress Echo",
    content: "<p>Stress Echo (Stress Echocardiography) test provides non-invasive diagnostic evaluation of myocardial blood flow and cardiac muscle contraction under physical or pharmacological stress.</p>"
  },
  "dobutamine-stress-echo": {
    title: "Dobutamine Stress Echo",
    content: "<p>Dobutamine Stress Echocardiogram evaluates cardiac function and blood flow under pharmacological stress for precise cardiovascular diagnostics.</p>"
  }
};

// Maximum number of entries to hold in the file cache to prevent unbounded memory growth
const MAX_CACHE_ENTRIES = 200;

// In-memory cache layer to avoid reading/writing to disk on every single request
let fileCache: Record<string, { title: string; content: string }> | null = null;

function loadCacheFromFile(): Record<string, { title: string; content: string }> {
  if (fileCache !== null) {
    return fileCache;
  }
  
  const cache: Record<string, { title: string; content: string }> = {};
  try {
    const cachePath = path.join(process.cwd(), 'src/lib/wordpress/failsafe-cache.json');
    if (fs.existsSync(cachePath)) {
      const content = fs.readFileSync(cachePath, 'utf8').trim();
      if (content) {
        Object.assign(cache, JSON.parse(content));
      }
    }
  } catch (e) {
    // Fail silently to prevent console pollution
  }
  
  fileCache = cache;
  return cache;
}

export function getFailsafeData(key: string): { title: string; content: string } | null {
  const cache = loadCacheFromFile();
  if (cache[key]) {
    return cache[key];
  }
  
  return fallbackDatabase[key] || null;
}

export function saveFailsafeData(key: string, data: { title: string; content: string }) {
  // Disable writing to failsafe cache during production builds to avoid multi-worker write collisions
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  try {
    const cache = loadCacheFromFile();

    // Prevent redundant disk writes if the data matches exactly
    if (cache[key] && cache[key].title === data.title && cache[key].content === data.content) {
      return;
    }

    // Update in-memory cache
    cache[key] = data;

    // LRU-style eviction: remove oldest entries when cache exceeds limit
    const keys = Object.keys(cache);
    if (keys.length > MAX_CACHE_ENTRIES) {
      const keysToRemove = keys.slice(0, keys.length - MAX_CACHE_ENTRIES);
      keysToRemove.forEach(k => delete cache[k]);
    }

    const cachePath = path.join(process.cwd(), 'src/lib/wordpress/failsafe-cache.json');
    // Create directory if not exists
    const dir = path.dirname(cachePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
    console.log(`💾 [FAILSAFE STORAGE] Mirrored data for key "${key}" to local cache.`);
  } catch (e) {
    // Fail silently in read-only environments
  }
}
