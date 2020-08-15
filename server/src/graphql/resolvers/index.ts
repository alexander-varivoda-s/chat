import merge from 'lodash.merge';

import { authResolvers } from './Auth';

export const resolvers = merge({}, authResolvers);
