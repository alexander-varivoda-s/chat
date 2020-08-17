import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation LogIn($input: LogInInput) {
    logIn(input: $input) {
      id
      displayName
      avatar
      email
      token
    }
  }
`;
