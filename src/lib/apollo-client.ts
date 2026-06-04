import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const getClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.WORDPRESS_API_URL,
      // Use Next.js native fetch caching for fast page loads
      fetchOptions: { next: { revalidate: 3600 } }, 
    }),
    cache: new InMemoryCache(),
  });
};
