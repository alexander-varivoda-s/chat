import { rule } from 'graphql-shield';
import { ObjectId } from 'mongodb';
import { ResolverContext } from '../../../lib/types';

export const isAuthineticated = rule({
  cache: 'contextual',
})(async (_parent, _args, { user }: Pick<ResolverContext, 'user'>) => {
  return user !== null;
});

export const isChatMember = rule({ cache: 'strict' })(
  async (
    _parent,
    { input }: { input: { chatId: ObjectId } },
    { db, user }: Pick<ResolverContext, 'db' | 'user'>
  ) => {
    const chat = await db.chats.findOne({
      _id: new ObjectId(input.chatId),
      participants: user._id,
    });

    return chat !== null;
  }
);
