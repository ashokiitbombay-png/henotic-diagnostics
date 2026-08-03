import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { GET_BLOG_POSTS, GET_BLOG_POST } from "@/lib/wordpress/queries";
import type { BlogPost, GetBlogPostsResponse, GetBlogPostResponse } from "@/types/cms";
import { wpCacheThrough } from "@/lib/cache/wp-cache";

// ─────────────────────────────────────────────────────────────────────────────
// Data Fetchers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a paginated list of published blog posts from WordPress.
 * Returns BlogPostCard[] (no `content` field) for optimized list views.
 * Cached in Redis with key: wp:posts:{first}:{cursor}
 *
 * @param first  Number of posts to fetch (default 12)
 * @param after  Cursor for pagination
 */
async function _getBlogPosts(
  first: number = 12,
  after?: string
): Promise<GetBlogPostsResponse["posts"] | null> {
  try {
    return await wpCacheThrough<GetBlogPostsResponse["posts"] | null>(
      'posts',
      `${first}:${after || 'start'}`,
      async () => {
        const client = getClient();
        const { data } = await client.query<GetBlogPostsResponse>({
          query: GET_BLOG_POSTS,
          variables: { first, after: after || null },
          fetchPolicy: "no-cache",
        });
        return data?.posts ?? null;
      },
      3600 // Blog list cache: 1 hour (more dynamic than service content)
    );
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return null;
  }
}

export const getBlogPosts = cache(_getBlogPosts);

/**
 * Fetches a single blog post by its slug from WordPress.
 * Returns full BlogPost with content + tags for detail views.
 * Cached in Redis with key: wp:post:{slug}
 *
 * @param slug  The post slug (e.g. "understanding-mri-scans")
 */
async function _getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    return await wpCacheThrough<BlogPost | null>(
      'post',
      slug,
      async () => {
        const client = getClient();
        const { data } = await client.query<GetBlogPostResponse>({
          query: GET_BLOG_POST,
          variables: { slug },
          fetchPolicy: "no-cache",
        });
        return data?.post ?? null;
      }
    );
  } catch (error) {
    console.error(`Failed to fetch blog post for slug "${slug}":`, error);
    return null;
  }
}

export const getBlogPost = cache(_getBlogPost);
