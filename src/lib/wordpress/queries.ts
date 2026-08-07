import { gql } from '@apollo/client';

// ── Fragments ────────────────────────────────────────────────────────────

/**
 * Shared fields for blog post list items (cards).
 * IMPORTANT: No `content` field — saves ~80% payload on list views.
 */
export const BLOG_POST_CARD_FIELDS = gql`
  fragment BlogPostCardFields on Post {
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
`;

// ── Service Queries ──────────────────────────────────────────────────────

export const GET_SERVICE_BY_SLUG = gql`
  query GetServiceBySlug($slug: ID!) {
    service(id: $slug, idType: SLUG) {
      title
      content
    }
  }
`;

// ── Page Queries ─────────────────────────────────────────────────────────

export const GET_PAGE_BY_URI = gql`
  query GetPageByUri($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

// ── Blog Queries ─────────────────────────────────────────────────────────

/**
 * List query — uses fragment to avoid fetching `content`.
 * Saves ~80% payload vs fetching full HTML for 12+ posts.
 */
export const GET_BLOG_POSTS = gql`
  ${BLOG_POST_CARD_FIELDS}
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
        ...BlogPostCardFields
      }
    }
  }
`;

/** Detail query — fetches full content + tags for single post view. */
export const GET_BLOG_POST = gql`
  ${BLOG_POST_CARD_FIELDS}
  query GetBlogPost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...BlogPostCardFields
      content
      tags {
        nodes {
          name
        }
      }
    }
  }
`;

// ── Batch Service Queries (DataLoader) ───────────────────────────────────

/**
 * Batch query for DataLoader — fetches multiple services by slug array.
 * WPGraphQL supports `slugIn` for the `services` root query.
 * 
 * Used by the DataLoader to collapse N concurrent getService() calls
 * into a single GraphQL request during crawl storms.
 */
export const GET_SERVICES_BY_SLUGS = gql`
  query GetServicesBySlugs($slugs: [String!]!) {
    services(where: { slugIn: $slugs }, first: 50) {
      nodes {
        slug
        title
        content
      }
    }
  }
`;

// ── Batch Page Queries (DataLoader) ──────────────────────────────────────

/**
 * Batch query for DataLoader — fetches multiple pages by URI array.
 */
export const GET_PAGES_BY_URIS = gql`
  query GetPagesByUris($uris: [String!]!) {
    pages(where: { nameIn: $uris }, first: 50) {
      nodes {
        uri
        title
        content
      }
    }
  }
`;

// ── Cursor-Based Service Slug Discovery ──────────────────────────────────

/**
 * Paginated query to discover ALL service slugs from WordPress.
 * Used by build scripts to regenerate build-priorities.json.
 * Fetches 100 slugs per page using cursor-based pagination.
 */
export const GET_ALL_SERVICE_SLUGS = gql`
  query GetAllServiceSlugs($first: Int!, $after: String) {
    services(
      first: $first
      after: $after
      where: { status: PUBLISH }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        slug
      }
    }
  }
`;
