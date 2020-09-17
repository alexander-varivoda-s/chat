import { Request, Response } from 'express';
import { Collection, ObjectId } from 'mongodb';

// eslint-disable-next-line no-shadow
export enum ChatType {
  Direct = 'DIRECT',
  Channel = 'CHANNEL',
}

export interface User {
  _id: string;
  displayName: string;
  avatar: string;
  email: string;
  token: string;
}

export interface Message {
  _id: ObjectId;
  content: string;
  author: string;
  created: Date;
}

export interface Chat {
  _id: ObjectId;
  type: ChatType;
  participants: string[];
  messages: ObjectId[];
}

export interface Database {
  users: Collection<User>;
  chats: Collection<Chat>;
  messages: Collection<Message>;
}

export interface ResolverContext {
  db: Database;
  req: Request;
  res: Response;
}
