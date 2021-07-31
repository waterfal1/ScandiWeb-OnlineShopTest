import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export async function query(strQuery: string) {
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });
  return client
      .query({
        query: gql(strQuery)
      });
}
