import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { GET_BLOG_POSTS, GET_BLOG_POST } from "@/lib/wordpress/queries";
import type { BlogPost, BlogPostCard, GetBlogPostsResponse, GetBlogPostResponse } from "@/types/cms";

// ─────────────────────────────────────────────────────────────────────────────
// Data Fetchers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a paginated list of published blog posts from WordPress.
 * Returns BlogPostCard[] (no `content` field) for optimized list views.
 *
 * @param first  Number of posts to fetch (default 12)
 * @param after  Cursor for pagination
 */
async function _getBlogPosts(
  first: number = 12,
  after?: string
): Promise<GetBlogPostsResponse["posts"] | null> {
  try {
    const client = getClient();
    const { data } = await client.query<GetBlogPostsResponse>({
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

export const getBlogPosts = cache(_getBlogPosts);

/**
 * Fetches a single blog post by its slug from WordPress.
 * Returns full BlogPost with content + tags for detail views.
 *
 * @param slug  The post slug (e.g. "understanding-mri-scans")
 */
async function _getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const client = getClient();
    const { data } = await client.query<GetBlogPostResponse>({
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

export const getBlogPost = cache(_getBlogPost);
