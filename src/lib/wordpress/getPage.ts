import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { WordPressPage } from "@/types/cms";

const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

/**
 * Fetches generic static page content from WordPress by URI/slug.
 * 
 * @param uri The page path (e.g. "/about-us", "/privacy")
 */
export async function getPage(uri: string): Promise<WordPressPage | null> {
  try {
    const client = getClient();
    const { data } = await client.query<any>({
      query: GET_PAGE_BY_URI,
      variables: { uri },
      fetchPolicy: "no-cache"
    });

    return data?.page || null;
  } catch (error) {
    console.error(`Failed to fetch page data for URI ${uri}:`, error);
    return null;
  }
}
