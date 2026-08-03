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
