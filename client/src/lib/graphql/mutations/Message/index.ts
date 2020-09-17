import { gql } from '@apollo/client';

export const SEND_DIRECT_MESSAGE = gql`
  mutation NewDirectMessage($input: DirectMessageInput) {
    newDirectMessage(input: $input) {
      id
      content
      author {
        id
        displayName
      }
      created
    }
  }
`;
