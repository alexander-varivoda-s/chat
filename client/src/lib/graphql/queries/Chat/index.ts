import { gql } from '@apollo/client';

export const FETCH_CHAT = gql`
  query Chat($chatId: ID!) {
    chat(input: { chatId: $chatId }) {
      id
      messages(page: 1, first: 10) {
        id
        content
      }
    }
  }
`;
