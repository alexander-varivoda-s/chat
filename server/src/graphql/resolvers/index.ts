import merge from 'lodash.merge';
import { authResolvers } from './Auth';
import { chatResolvers } from './Chat';
import { messageResolvers } from './Message';
import { scalarResolvers } from './Scalar';
import { userResolvers } from './User';

export const resolvers = merge(
  scalarResolvers,
  authResolvers,
  userResolvers,
  messageResolvers,
  chatResolvers
);
