export interface WordPressBlock {
  blockName: string;
  attrs?: Record<string, any>;
  innerHTML?: string;
}

export interface WordPressService {
  title: string;
  content: string;
}

export interface WordPressPage {
  title: string;
  content: string;
}

export interface ShortcodeContext {
  serviceName?: string;
  locationName?: string;
  regionName?: string;
  [key: string]: any;
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog Post Types (WordPress WPGraphQL)
// ─────────────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
  categories: { nodes: Array<{ name: string; slug: string }> };
  author: { node: { name: string; avatar?: { url: string } } };
  tags?: { nodes: Array<{ name: string }> };
}

export interface BlogPostsResponse {
  posts: {
    pageInfo: { hasNextPage: boolean; endCursor: string };
    nodes: BlogPost[];
  };
}
