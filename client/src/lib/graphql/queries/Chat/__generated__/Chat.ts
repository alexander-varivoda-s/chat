/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Chat
// ====================================================

export interface Chat_chat_messages_author {
  __typename: "User";
  id: string;
  displayName: string;
  email: string;
  avatar: string;
}

export interface Chat_chat_messages {
  __typename: "Message";
  id: string;
  content: string;
  author: Chat_chat_messages_author;
}

export interface Chat_chat {
  __typename: "Chat";
  id: string;
  messages: Chat_chat_messages[];
}

export interface Chat {
  chat: Chat_chat;
}

export interface ChatVariables {
  chatId: string;
}
