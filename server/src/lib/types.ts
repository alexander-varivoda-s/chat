/* eslint-disable camelcase */
import { Collection } from 'mongodb';

export interface User {
  first_name: string;
  last_name: string;
}

export interface Database {
  users: Collection<User>;
}
