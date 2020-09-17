import { ObjectId } from 'mongodb';

export interface SendDirectMessageInput {
  chatId: ObjectId;
  content: string;
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
  first?: number;
  page?: number;
}

export interface OpenChatInput {
  participant: ObjectId;
}

export interface OpenChatArgs {
  input: OpenChatInput;
}
