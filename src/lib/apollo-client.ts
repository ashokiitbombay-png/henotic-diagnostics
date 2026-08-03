import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
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

// ── Singleton Client ─────────────────────────────────────────────────────

let _client: ApolloClient | null = null;

export const getClient = () => {
  if (!_client) {
    const batchLink = new BatchHttpLink({
      uri: process.env.WORDPRESS_API_URL,
      // Use Next.js native fetch caching for fast page loads
      fetchOptions: { next: { revalidate: 3600 } },
      batchMax: 5,         // Batch up to 5 queries together
      batchInterval: 20,   // Delay up to 20ms to bundle requests
    });

    _client = new ApolloClient({
      link: from([errorLink, batchLink]),
      cache: new InMemoryCache(),
      ssrMode: typeof window === 'undefined',
    });
  }
  return _client;
};
