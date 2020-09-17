/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OpenChatInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: OpenChat
// ====================================================

export interface OpenChat_openChat_messages_author {
  __typename: "User";
  id: string;
  displayName: string;
}

export interface OpenChat_openChat_messages {
  __typename: "Message";
  id: string;
  content: string;
  author: OpenChat_openChat_messages_author;
  created: any;
}

export interface OpenChat_openChat_participants {
  __typename: "User";
  id: string;
}

export interface OpenChat_openChat {
  __typename: "Chat";
  id: string;
  messages: OpenChat_openChat_messages[];
  participants: OpenChat_openChat_participants[];
}

export interface OpenChat {
  openChat: OpenChat_openChat;
}

export interface OpenChatVariables {
  input?: OpenChatInput | null;
}
