import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { RetryLink } from '@apollo/client/link/retry';
import { ErrorLink } from '@apollo/client/link/error';
import { CombinedGraphQLErrors } from '@apollo/client/errors';

// ── Structured Error Logging ─────────────────────────────────────────────

const errorLink = new ErrorLink(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL Error] Operation: ${operation.operationName} | Message: ${message}`,
        { locations, path }
      );
    });
  } else {
    console.error(`[Network Error] Operation: ${operation.operationName}`, error);
  }
});

// ── Retry Link (Exponential Backoff) ─────────────────────────────────────

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 3000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error) => !!error && (error as unknown as Record<string, unknown>).statusCode !== 400,
  },
});

// ── Singleton Client ─────────────────────────────────────────────────────

let _client: ApolloClient | null = null;

export const getClient = () => {
  if (!_client) {
    const rawUrl = (process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '').trim();
    const isValidUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://');
    const uri = isValidUrl ? rawUrl : 'https://cms.henoticdiagnostics.com/graphql';

    const batchLink = new BatchHttpLink({
      uri,
      // Use Next.js native fetch caching for fast page loads
      fetchOptions: { next: { revalidate: 3600 } },
      batchMax: 5,         // Batch up to 5 queries together
      batchInterval: 20,   // Delay up to 20ms to bundle requests
    });

    _client = new ApolloClient({
      link: from([errorLink, retryLink, batchLink]),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              // Merge paginated blog post results
              posts: {
                keyArgs: ['where'],
                merge(existing, incoming) {
                  if (!existing) return incoming;
                  return {
                    ...incoming,
                    nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
                  };
                },
              },
              // Merge paginated service results
              services: {
                keyArgs: ['where'],
                merge(existing, incoming) {
                  if (!existing) return incoming;
                  return {
                    ...incoming,
                    nodes: [...(existing.nodes || []), ...(incoming.nodes || [])],
                  };
                },
              },
            },
          },
          // Normalize service entities by slug for dedup
          Service: {
            keyFields: ['slug'],
          },
          // Normalize post entities by slug for dedup
          Post: {
            keyFields: ['slug'],
          },
        },
      }),
      ssrMode: typeof window === 'undefined',
    });
  }
  return _client;
};
