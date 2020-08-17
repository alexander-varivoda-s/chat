/* eslint-disable camelcase */
import { Collection } from 'mongodb';

export interface User {
  _id: string;
  displayName: string;
  avatar: string;
  email: string;
}

export interface Database {
  users: Collection<User>;
}
