import { gql } from '@apollo/client';

export const SEND_DIRECT_MESSAGE = gql`
  mutation NewDirectMessage($input: DirectMessageInput) {
    newDirectMessage(input: $input) {
      id
      messages(page: 1, first: 1) {
        id
        content
        author {
          id
          displayName
          email
          avatar
        }
        created
      }
    }
  }
`;
