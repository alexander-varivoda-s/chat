import { IResolvers } from 'apollo-server-express';
import { User } from '../../../lib/types';

export const userResolvers: IResolvers = {
  User: {
    // eslint-disable-next-line no-underscore-dangle
    id: (user: User): string => user._id,
  },
};
