// ── WordPress Content Types ──────────────────────────────────────────────

/** Shared base for all WordPress content that has title + rendered HTML content. */
export interface WordPressContent {
  title: string;
  content: string;
}

/** WordPress "service" custom post type — fetched by slug. */
export interface WordPressService extends WordPressContent {}

/** WordPress static page — fetched by URI. */
export interface WordPressPage extends WordPressContent {}

/** WordPress block data from Gutenberg. */
export interface WordPressBlock {
  blockName: string;
  attrs?: Record<string, unknown>;
  innerHTML?: string;
}

/** Shortcode context for PSEO template rendering. */
export interface ShortcodeContext {
  serviceName?: string;
  locationName?: string;
  regionName?: string;
  [key: string]: string | undefined;
}

// ── Blog Types ───────────────────────────────────────────────────────────

/** Featured image node from WPGraphQL. */
export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

/** Author node from WPGraphQL. */
export interface WPAuthor {
  node: {
    name: string;
    avatar?: { url: string };
  };
}

/** Category node from WPGraphQL. */
export interface WPCategory {
  name: string;
  slug: string;
}

/** Tag node from WPGraphQL. */
export interface WPTag {
  name: string;
}

/**
 * Blog post card — used in list views (no full content).
 * Maps exactly to the BlogPostCardFields GraphQL fragment.
 */
export interface BlogPostCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: WPFeaturedImage;
  categories: { nodes: WPCategory[] };
  author: WPAuthor;
}

/**
 * Full blog post — extends card with content + tags for detail view.
 * Maps exactly to the GET_BLOG_POST GraphQL query.
 */
export interface BlogPost extends BlogPostCard {
  content: string;
  tags?: { nodes: WPTag[] };
}

// ── GraphQL Response Wrappers ────────────────────────────────────────────

/** Response shape for the service-by-slug query. */
export interface GetServiceResponse {
  service: WordPressService | null;
}

/** Response shape for the page-by-URI query. */
export interface GetPageResponse {
  page: WordPressPage | null;
}

/** Response shape for the blog posts list query. */
export interface GetBlogPostsResponse {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor: string };
    nodes: BlogPostCard[];
  };
}

/** Response shape for the single blog post query. */
export interface GetBlogPostResponse {
  post: BlogPost | null;
}

/** @deprecated Use GetBlogPostsResponse instead. */
export type BlogPostsResponse = GetBlogPostsResponse;
