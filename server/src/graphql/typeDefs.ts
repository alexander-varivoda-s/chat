import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    hello: String
    users: [User!]
  }

  type User {
    first_name: String
    last_name: String
  }
`;
