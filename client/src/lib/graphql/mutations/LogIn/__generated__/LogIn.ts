/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_logIn {
  __typename: "User";
  id: string;
  displayName: string;
  avatar: string;
  email: string;
  token: string;
}

export interface LogIn {
  logIn: LogIn_logIn | null;
}

export interface LogInVariables {
  input?: LogInInput | null;
}
