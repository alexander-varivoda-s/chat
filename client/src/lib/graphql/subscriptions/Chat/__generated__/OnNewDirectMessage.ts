/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: OnNewDirectMessage
// ====================================================

export interface OnNewDirectMessage_directMessageCreated_author {
  __typename: "User";
  id: string;
  displayName: string;
}

export interface OnNewDirectMessage_directMessageCreated {
  __typename: "Message";
  id: string;
  content: string;
  author: OnNewDirectMessage_directMessageCreated_author;
  created: any;
}

export interface OnNewDirectMessage {
  directMessageCreated: OnNewDirectMessage_directMessageCreated;
}
