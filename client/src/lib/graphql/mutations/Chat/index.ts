import { gql } from '@apollo/client';

export const OPEN_CHAT = gql`
  mutation OpenChat($input: OpenChatInput, $first: Int = 10, $page: Int = 1) {
    openChat(input: $input) {
      id
      messages(first: $first, page: $page) {
        id
        content
        author {
          id
          displayName
        }
        created
      }
      participants {
        id
      }
    }
  }
`;
