import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "./tags";

/**
 * Safely triggers an on-demand revalidation for a specific cache tag.
 * Used for webhook handlers when content is updated in WordPress or Payload CMS.
 * 
 * @param tag The exact tag key to revalidate (use CACHE_TAGS helpers for consistency)
 */
export async function revalidateWordPressContent(tag: string): Promise<{ revalidated: boolean; tag: string }> {
  try {
    revalidateTag(tag, 'max');
    console.log(`[CACHE] Successfully revalidated Next.js cache tag: ${tag}`);
    return { revalidated: true, tag };
  } catch (error) {
    console.error(`[CACHE ERROR] Failed to revalidate Next.js cache tag ${tag}:`, error);
    return { revalidated: false, tag };
  }
}
