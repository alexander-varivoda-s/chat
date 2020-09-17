/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DirectMessageInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: NewDirectMessage
// ====================================================

export interface NewDirectMessage_newDirectMessage_author {
  __typename: "User";
  id: string;
  displayName: string;
}

export interface NewDirectMessage_newDirectMessage {
  __typename: "Message";
  id: string;
  content: string;
  author: NewDirectMessage_newDirectMessage_author;
  created: any;
}

export interface NewDirectMessage {
  newDirectMessage: NewDirectMessage_newDirectMessage;
}

export interface NewDirectMessageVariables {
  input?: DirectMessageInput | null;
}
