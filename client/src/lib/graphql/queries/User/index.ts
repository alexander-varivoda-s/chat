import { gql } from '@apollo/client';

export const FETCH_USERS = gql`
  query Users {
    users {
      id
      displayName
      avatar
      email
    }
  }
`;
