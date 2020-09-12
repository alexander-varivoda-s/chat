import { ObjectId } from 'mongodb';

export interface SendDirectMessageInput {
  userId: ObjectId;
}

export interface SendDirectMessageArgs {
  input: SendDirectMessageInput;
}

export interface ChatInput {
  chatId: ObjectId;
}

export interface ChatArgs {
  input: ChatInput;
}

export interface ChatMessagesArgs {
  first: number;
  page: number;
}
