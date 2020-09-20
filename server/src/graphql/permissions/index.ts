import { and, deny, shield } from 'graphql-shield';
import { isAuthineticated, isChatMember } from './rules';

export const permissions = shield({
  Query: {
    chat: and(isAuthineticated, isChatMember),
    users: isAuthineticated,
  },
  Mutation: {
    logOut: isAuthineticated,
    newDirectMessage: and(isAuthineticated, isChatMember),
    openChat: isAuthineticated,
  },
});
