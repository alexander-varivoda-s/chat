import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input LogInInput {
    code: String!
  }

  type User {
    id: ID!,
    displayName: String!,
    avatar: String!
    email: String!
  }

  type Query {
    authUrl: String!
  }

  type Mutation {
    logIn(input: LogInInput): User!
  }
`;
