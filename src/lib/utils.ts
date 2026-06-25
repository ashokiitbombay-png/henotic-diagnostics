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

    // 2. Resolve any HTML entities and decode URI to prevent double-encoding (%20 -> %2520)
    let decodedSrc = originalSrc.replace(/&amp;/g, '&');
    try {
      decodedSrc = decodeURIComponent(decodedSrc);
    } catch (e) {
      console.error("Failed to decode image URL:", e);
    }
    // Update the tag to use the direct decoded GCS URL or the proxied CDN URL
    let finalSrc = decodedSrc;
    if (decodedSrc.includes("storage.googleapis.com/wp-media-henoticbucket/")) {
      finalSrc = "/media-cdn/" + decodedSrc.split("storage.googleapis.com/wp-media-henoticbucket/")[1];
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