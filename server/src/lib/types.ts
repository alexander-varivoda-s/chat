/* eslint-disable camelcase */
import { Collection, ObjectId } from 'mongodb';

export enum ChatType {
  Direct = 'DIRECT',
  Channel = 'CHANNEL'
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
  author: ObjectId;
  created: Date;
}

export interface Chat {
  _id: ObjectId;
  type: ChatType;
  messages: ObjectId[];
}

export interface Database {
  users: Collection<User>;
  chats: Collection<Chat>;
  messages: Collection<Message>;
}
