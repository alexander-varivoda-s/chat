/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DirectMessageInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: NewDirectMessage
// ====================================================

export interface NewDirectMessage_newDirectMessage_messages_author {
  __typename: "User";
  id: string;
  displayName: string;
  email: string;
  avatar: string;
}

export interface NewDirectMessage_newDirectMessage_messages {
  __typename: "Message";
  id: string;
  content: string;
  author: NewDirectMessage_newDirectMessage_messages_author;
  created: any;
}

export interface NewDirectMessage_newDirectMessage {
  __typename: "Chat";
  id: string;
  messages: NewDirectMessage_newDirectMessage_messages[] | null;
}

export interface NewDirectMessage {
  newDirectMessage: NewDirectMessage_newDirectMessage;
}

export interface NewDirectMessageVariables {
  input?: DirectMessageInput | null;
}
