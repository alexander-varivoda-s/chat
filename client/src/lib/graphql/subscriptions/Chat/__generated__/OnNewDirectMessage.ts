/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnNewDirectMessage
// ====================================================

export interface OnNewDirectMessage_directMessageCreated_messages_author {
  __typename: "User";
  id: string;
  displayName: string;
  email: string;
  avatar: string;
}

export interface OnNewDirectMessage_directMessageCreated_messages {
  __typename: "Message";
  id: string;
  content: string;
  author: OnNewDirectMessage_directMessageCreated_messages_author;
  created: any;
}

export interface OnNewDirectMessage_directMessageCreated {
  __typename: "Chat";
  id: string;
  messages: OnNewDirectMessage_directMessageCreated_messages[] | null;
}

export interface OnNewDirectMessage {
  directMessageCreated: OnNewDirectMessage_directMessageCreated;
}
