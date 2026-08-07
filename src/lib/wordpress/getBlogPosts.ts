import { getClient } from "@/lib/apollo-client";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { GET_BLOG_POSTS, GET_BLOG_POST } from "@/lib/wordpress/queries";
import type { BlogPost, GetBlogPostsResponse, GetBlogPostResponse } from "@/types/cms";
import { wpCacheThrough } from "@/lib/cache/wp-cache";
import { CACHE_TAGS } from "@/lib/cache/tags";

// ─────────────────────────────────────────────────────────────────────────────
// Data Fetchers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetches a paginated list of published blog posts from WordPress.
 * Returns BlogPostCard[] (no `content` field) for optimized list views.
 *
 * Cache Architecture:
 * - Next.js Data Cache: tagged with `CACHE_TAGS.postsList` for O(1) invalidation
 * - Redis L1: keyed as `wp:posts:{first}:{cursor}`
 *
 * @param first  Number of posts to fetch (default 12)
 * @param after  Cursor for pagination
 */
async function _getBlogPosts(
  first: number = 12,
  after?: string
): Promise<GetBlogPostsResponse["posts"] | null> {
  try {
    const fetchWithTags = unstable_cache(
      async () => {
        return wpCacheThrough<GetBlogPostsResponse["posts"] | null>(
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
      },
      ['wp-posts-list', String(first), after || 'start'],
      {
        tags: [CACHE_TAGS.postsList],
        revalidate: 3600,
      }
    );

    return await fetchWithTags();
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
 * Cache Architecture:
 * - Next.js Data Cache: tagged with `CACHE_TAGS.post(slug)` for O(1) invalidation
 * - Redis L1: keyed as `wp:post:{slug}`
 *
 * @param slug  The post slug (e.g. "understanding-mri-scans")
 */
async function _getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fetchWithTags = unstable_cache(
      async () => {
        return wpCacheThrough<BlogPost | null>(
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
      },
      ['wp-post', slug],
      {
        tags: [CACHE_TAGS.post(slug), CACHE_TAGS.postsList],
        revalidate: 86400,
      }
    );

    return await fetchWithTags();
  } catch (error) {
    console.error(`Failed to fetch blog post for slug "${slug}":`, error);
    return null;
  }
}

export const getBlogPost = cache(_getBlogPost);
