import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  enum ChatType {
    DIRECT
    CHANNEL
  }

  input LogInInput {
    code: String!
  }

  input ChatInput {
    chatId: ID!
  }

  input DirectMessageInput {
    chatId: ID!
    content: String!
  }

  input OpenChatInput {
    participant: ID!
  }

  type User {
    id: ID!
    displayName: String!
    avatar: String!
    email: String!
    token: String!
  }

  type Message {
    id: ID!
    content: String!
    author: User!
    created: Date!
  }

  type Chat {
    id: ID!
    type: ChatType!
    participants: [User!]!
    messages(first: Int, page: Int): [Message!]!
  }

  type Query {
    authUrl: String!
    chat(input: ChatInput): Chat!
    users: [User!]!
  }

  type Mutation {
    logIn(input: LogInInput): User
    logOut: User!
    newDirectMessage(input: DirectMessageInput): Message!
    openChat(input: OpenChatInput): Chat!
  }

  type Subscription {
    directMessageCreated: Message!
  }
`;
