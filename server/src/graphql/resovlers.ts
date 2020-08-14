import { IResolvers } from 'apollo-server-express';
import { Database, User } from '../lib/types';

export const resolvers: IResolvers = {
  Query: {
    hello: () => 'Hello, world!',
    users: (
      _root: undefined,
      _args: {},
      { db }: { db: Database },
    ): Promise<User[]> => db.users.find({}).toArray(),
  },
};
