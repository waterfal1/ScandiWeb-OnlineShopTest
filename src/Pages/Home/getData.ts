import { ApolloClient, gql, InMemoryCache } from '@apollo/client';


export async function query(strQuery: string) {
  const client = new ApolloClient({
    uri: 'https://graphql-online-shop.herokuapp.com/',
    cache: new InMemoryCache()
  });
  return client
      .query({
        query: gql(strQuery)
      });
}

