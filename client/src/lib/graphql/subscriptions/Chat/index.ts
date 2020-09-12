import { gql } from '@apollo/client';

export const NEW_DIRECT_MESSAGE = gql`
  subscription OnNewDirectMessage {
    directMessageCreated {
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
