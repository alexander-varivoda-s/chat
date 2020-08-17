import merge from 'lodash.merge';
import { authResolvers } from './Auth';
import { userResolvers } from './User';

export const resolvers = merge(authResolvers, userResolvers);
