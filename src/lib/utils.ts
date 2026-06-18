import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

    // 2. Pass GCS images through Next.js Image Optimization
    if (originalSrc.includes("storage.googleapis.com") && !originalSrc.includes("_next/image")) {
      const isHero = originalSrc.toLowerCase().includes("hero");
      // Optimize image width: 800px for hero scans, 640px for others
      const targetWidth = isHero ? 800 : 640;
      // Resolve any HTML entities and decode URI to prevent double-encoding (%20 -> %2520)
      let decodedSrc = originalSrc.replace(/&amp;/g, '&');
      try {
        decodedSrc = decodeURIComponent(decodedSrc);
      } catch (e) {
        console.error("Failed to decode image URL:", e);
      }
      const optimizedSrc = `/_next/image?url=${encodeURIComponent(decodedSrc)}&w=${targetWidth}&q=75`;
      updatedTag = updatedTag.replace(/src=["']([^"']+)["']/i, `src="${optimizedSrc}"`);
    }

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