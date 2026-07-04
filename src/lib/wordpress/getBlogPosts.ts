import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import type { BlogPost, BlogPostsResponse } from "@/types/cms";

// ─────────────────────────────────────────────────────────────────────────────
// GraphQL Queries
// ─────────────────────────────────────────────────────────────────────────────

const GET_BLOG_POSTS = gql`
  query GetBlogPosts($first: Int, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;

const GET_BLOG_POST = gql`
  query GetBlogPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      content
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      tags {
        nodes {
          name
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// Data Fetchers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a paginated list of published blog posts from WordPress.
 *
 * @param first  Number of posts to fetch (default 12)
 * @param after  Cursor for pagination
 */
export async function getBlogPosts(
  first: number = 12,
  after?: string
): Promise<BlogPostsResponse["posts"] | null> {
  try {
    const client = getClient();
    const { data } = await client.query<BlogPostsResponse>({
      query: GET_BLOG_POSTS,
      variables: { first, after: after || null },
      fetchPolicy: "no-cache",
    });

    return data?.posts ?? null;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return null;
  }
}

/**
 * Fetches a single blog post by its slug from WordPress.
 *
 * @param slug  The post slug (e.g. "understanding-mri-scans")
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const client = getClient();
    const { data } = await client.query<{ post: BlogPost }>({
      query: GET_BLOG_POST,
      variables: { slug },
      fetchPolicy: "no-cache",
    });

    return data?.post ?? null;
  } catch (error) {
    console.error(`Failed to fetch blog post for slug "${slug}":`, error);
    return null;
  }
}
