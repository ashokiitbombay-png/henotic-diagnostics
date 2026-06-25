import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { WordPressService } from "@/types/cms";

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
export async function getService(slug: string): Promise<WordPressService | null> {
  try {
    const client = getClient();
    const { data } = await client.query<any>({
      query: GET_SERVICE_BY_SLUG,
      variables: { slug },
      fetchPolicy: "no-cache"
    });

    return data?.service || null;
  } catch (error) {
    console.error(`Failed to fetch service data for slug ${slug}:`, error);
    return null;
  }
}
