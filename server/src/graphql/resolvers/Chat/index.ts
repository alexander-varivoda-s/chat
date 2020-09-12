import { IResolvers, PubSub } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Chat, ChatType, Message, ResolverContext } from '../../../lib/types';
import { ChatArgs, ChatMessagesArgs, SendDirectMessageArgs } from './types';

const pubSub = new PubSub();

export const chatResolvers: IResolvers = {
  Chat: {
    id: (chat: Chat): string => chat._id.toString(),
    messages: async (
      chat: Chat,
      { first, page }: ChatMessagesArgs,
      { db }: Pick<ResolverContext, 'db'>
    ): Promise<Message[]> => {
      const cursor = await db.messages.find({
        _id: {
          $in: chat.messages
        }
      });
      cursor.skip(page > 0 ? first * (page - 1) : 0);
      cursor.limit(first);

      return cursor.toArray();
    }
  },
  Query: {
    chat: async (
      _root: undefined,
      args: ChatArgs,
      { db }: Pick<ResolverContext, 'db'>
    ): Promise<Chat | null> => {
      return db.chats.findOne({ _id: new ObjectId(args.input.chatId) });
    }
  },
  Mutation: {
    newDirectMessage: async (
      _root: undefined,
      args: SendDirectMessageArgs,
      { db, req }: Pick<ResolverContext, 'db' | 'req'>
    ): Promise<Chat | undefined> => {
      const { userId } = req.signedCookies;
      const {
        input: { userId: receiverId }
      } = args;

      if (userId === receiverId) {
        throw new Error('Trying to send direct message to same user!');
      }

      const {
        ops: [newMessage]
      } = await db.messages.insertOne({
        content: 'New Message',
        author: userId,
        created: new Date()
      });

      let chat = await db.chats.findOne({
        type: ChatType.Direct,
        participants: [userId, receiverId]
      });

      if (!chat) {
        const {
          ops: [newChat]
        } = await db.chats.insertOne({
          type: ChatType.Direct,
          participants: [userId, receiverId],
          messages: []
        });

        chat = newChat;
      }

      const { value: updatedChat } = await db.chats.findOneAndUpdate(
        { _id: chat._id },
        {
          $set: {
            messages: [...chat.messages, newMessage._id]
          }
        }
      );

      pubSub.publish('DIRECT_MESSAGE_CREATED', { chat });

      return updatedChat;
    }
  },
  Subscription: {
    directMessageCreated: {
      subscribe: (): AsyncIterator<string> =>
        pubSub.asyncIterator('DIRECT_MESSAGE_CREATED'),
      resolve: (payload: { chat: Chat }): Chat => payload.chat
    }
  }
};
