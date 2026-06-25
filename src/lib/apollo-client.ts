import { ApolloClient, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';

export const getClient = () => {
  return new ApolloClient({
    link: new BatchHttpLink({
      uri: process.env.WORDPRESS_API_URL,
      // Use Next.js native fetch caching for fast page loads
      fetchOptions: { next: { revalidate: 3600 } }, 
      batchMax: 5,         // Batch up to 5 queries together
      batchInterval: 20,   // Delay up to 20ms to bundle requests
    }),
    cache: new InMemoryCache(),
  });
};
