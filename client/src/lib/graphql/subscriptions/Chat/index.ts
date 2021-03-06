import { gql } from '@apollo/client';

export const NEW_DIRECT_MESSAGE = gql`
  subscription OnNewDirectMessage {
    directMessageCreated {
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
