import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { gql } from "@apollo/client";
import { WordPressService } from "@/types/cms";
import { getFailsafeData, saveFailsafeData } from "@/lib/wordpress/failsafeStore";

const GET_SERVICE_BY_SLUG = gql`
  query GetServiceContent($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

/**
 * Fetches dynamic service custom post type content from WordPress by its slug.
 * 
 * @param slug The service slug (e.g. "mri-scan", "ct-scan")
 */
async function _getService(slug: string): Promise<WordPressService | null> {
  try {
    const client = getClient();
    const { data } = await client.query<any>({
      query: GET_SERVICE_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache"
    });

    if (data?.service) {
      saveFailsafeData(slug, { title: data.service.title, content: data.service.content });
      return data.service;
    }

    // Check fallback if service data is missing
    const fallback = getFailsafeData(slug);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored service content for slug "${slug}".`);
      return fallback;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch service data for slug ${slug}:`, error);
    const fallback = getFailsafeData(slug);
    if (fallback) {
      console.log(`🛡️ [FAILSAFE ACTIVE] Serving mirrored service content for slug "${slug}" after error.`);
      return fallback;
    }
    return null;
  }
}

export const getService = cache(_getService);
