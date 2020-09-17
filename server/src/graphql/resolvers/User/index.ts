import { IResolvers } from 'apollo-server-express';
import { ResolverContext, User } from '../../../lib/types';

export const userResolvers: IResolvers = {
  User: {
    id: (user: User): string => user._id,
  },
  Query: {
    users: (
      _root: undefined,
      _args: undefined,
      { db, req }: Pick<ResolverContext, 'db' | 'req'>
    ): Promise<User[]> => {
      const { userId } = req.signedCookies;

      if (!userId) {
        throw new Error('Not authorized!');
      }

      return db.users
        .find({
          _id: {
            $ne: userId,
          },
        })
        .toArray();
    },
  },
};
