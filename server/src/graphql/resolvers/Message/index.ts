import { IResolvers } from 'apollo-server-express';
import { Message, ResolverContext, User } from '../../../lib/types';

export const messageResolvers: IResolvers = {
  Message: {
    id: (message: Message): string => message._id.toString(),
    author: async (
      message: Message,
      _args: undefined,
      { db }: Pick<ResolverContext, 'db'>
    ): Promise<User | null> => {
      return db.users.findOne({
        _id: message.author,
      });
    },
  },
};
