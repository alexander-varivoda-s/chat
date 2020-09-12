/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Chat
// ====================================================

export interface Chat_chat_messages {
  __typename: "Message";
  id: string;
  content: string;
}

export interface Chat_chat {
  __typename: "Chat";
  id: string;
  messages: Chat_chat_messages[] | null;
}

export interface Chat {
  chat: Chat_chat;
}

export interface ChatVariables {
  chatId: string;
}
