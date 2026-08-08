import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 🧠 Medical-Aware Slug Formatter
 * Formats slugs cleanly for SEO Titles, Meta Descriptions, and UI Headings.
 * Converts medical acronyms (MRI, CT, PET-CT, 2D, HbA1c, DEXA) and location names properly.
 */
export function formatSlug(slug: string): string {
  if (!slug) return "";

  // Special overrides for compound terms
  const overrides: Record<string, string> = {
    "pet-scan": "PET-CT Scan",
    "pet-ct-scan": "PET-CT Scan",
    "whole-body-pet-ct": "Whole Body PET-CT",
    "mri-scan": "MRI Scan",
    "ct-scan": "CT Scan",
    "2d-echo": "2D Echo",
    "3d-4d-ultrasound": "3D/4D Ultrasound",
    "dexa-bone-scan": "DEXA Bone Scan",
    "dexa-scan": "DEXA Scan",
    "full-body-check-up": "Full Body Checkup",
    "full-body-checkup": "Full Body Checkup",
    "corporate-health-checkup": "Corporate Health Checkup",
    "navi-mumbai": "Navi Mumbai",
    "western-suburbs": "Western Suburbs",
    "central-suburbs": "Central Suburbs",
    "south-mumbai": "South Mumbai",
    "eastern-suburbs": "Eastern Suburbs",
    "mumbai-suburban": "Mumbai Suburban",
    "cbd-belapur": "CBD Belapur",
    "kopar-khairane": "Kopar Khairane",
    "thane-west": "Thane West",
    "pune-city": "Pune City"
  };

  const lowerSlug = slug.toLowerCase().trim();
  if (overrides[lowerSlug]) {
    return overrides[lowerSlug];
  }

  const acronyms = [
    "mri", "ct", "pet", "nt", "usg", "ecg", "cbc", "lft", "kft", "hba1c",
    "2d", "3d", "4d", "nipt", "nips", "nippt", "dna", "dexa", "bmd", "tmt",
    "bpp", "fnac", "dtpa", "mag3", "gfr", "vdrl", "hiv", "hpv", "std", "sti",
    "tavr", "cbd", "hrct", "mrcp", "pns", "ec"
  ];

  return slug
    .split("-")
    .map(word => {
      const lowerWord = word.toLowerCase();
      if (acronyms.includes(lowerWord)) {
        if (lowerWord === "hba1c") return "HbA1c";
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export function optimizeWordPressHTML(htmlContent: string): string {
  if (!htmlContent) return "";

  // Regular expression to match img tags and process them
  return htmlContent.replace(/<img([^>]+)>/gi, (match) => {
    // 1. Extract src
    const srcMatch = match.match(/src=["']([^"']+)["']/i);
    if (!srcMatch) return match;

    const originalSrc = srcMatch[1];
    let updatedTag = match;

    // 2. Resolve any HTML entities and decode URI to prevent double-encoding (%20 -> %2520)
    let decodedSrc = originalSrc.replace(/&amp;/g, '&');
    try {
      decodedSrc = decodeURIComponent(decodedSrc);
    } catch (e) {
      console.error("Failed to decode image URL:", e);
    }
    // Keep direct GCS URL — already whitelisted in CSP & remotePatterns.
    // Using /media-cdn/ proxy caused rate-limiting & mobile loading failures.
    let finalSrc = decodedSrc;
    if (decodedSrc.includes("storage.googleapis.com/wp-media-henoticbucket/")) {
      const parts = decodedSrc.split("storage.googleapis.com/wp-media-henoticbucket/");
      const relativePath = parts[1];
      // Re-encode path segments for proper URL formatting
      const encodedPath = relativePath.split('/').map(seg => encodeURIComponent(seg)).join('/');
      finalSrc = "https://storage.googleapis.com/wp-media-henoticbucket/" + encodedPath;
    }
    updatedTag = updatedTag.replace(/src=["']([^"']+)["']/i, `src="${finalSrc}"`);

    // 3. Prevent CLS by forcing explicit width and height if missing
    if (!updatedTag.includes("width=") && !updatedTag.includes("height=")) {
      // Inject standard 16:9 landscape aspect ratio properties
      updatedTag = updatedTag.replace("<img", '<img width="800" height="450" style="aspect-ratio: 16/9; height: auto;"');
    }

    // 4. Force decoding async and add native lazy loading if not eager
    if (!updatedTag.includes("decoding=")) {
      updatedTag = updatedTag.replace("<img", '<img decoding="async"');
    }
    
    return updatedTag;
  });
}