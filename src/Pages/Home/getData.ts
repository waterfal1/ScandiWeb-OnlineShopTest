import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export async function query(strQuery: string) {
  const client = new ApolloClient({
    uri: "https://online-shop-2023-156725473551.herokuapp.com/",
    cache: new InMemoryCache(),
  });
  return client
      .query({
        query: gql(strQuery)
      });
}
