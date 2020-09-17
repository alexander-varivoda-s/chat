import { IResolvers, PubSub } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import {
  Chat,
  ChatType,
  Message,
  ResolverContext,
  User,
} from '../../../lib/types';
import {
  ChatArgs,
  ChatMessagesArgs,
  OpenChatArgs,
  SendDirectMessageArgs,
} from './types';

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
          $in: chat.messages,
        },
      });

      cursor.sort({ created: -1 });

      if (first && page) {
        cursor.skip(page > 0 ? first * (page - 1) : 0);
      }

      if (first) {
        cursor.limit(first);
      }

      return cursor.toArray();
    },
    participants: async (
      chat: Chat,
      _args: undefined,
      { db }: Pick<ResolverContext, 'db'>
    ): Promise<User[]> => {
      const cursor = await db.users.find({
        _id: {
          $in: chat.participants,
        },
      });

      return cursor.toArray();
    },
  },
  Query: {
    chat: async (
      _root: undefined,
      { input }: ChatArgs,
      { db }: Pick<ResolverContext, 'db'>
    ): Promise<Chat> => {
      const chat = await db.chats.findOne({ _id: new ObjectId(input.chatId) });

      if (!chat) {
        throw new Error(`Chat with id "${input.chatId}" does not exists!`);
      }

      return chat;
    },
  },
  Mutation: {
    newDirectMessage: async (
      _root: undefined,
      { input }: SendDirectMessageArgs,
      { db, req }: Pick<ResolverContext, 'db' | 'req'>
    ): Promise<Message> => {
      const { userId } = req.signedCookies;

      try {
        const {
          ops: [newMessage],
        } = await db.messages.insertOne({
          content: input.content,
          author: userId,
          created: new Date(),
        });

        const chat = await db.chats.findOne({
          _id: new ObjectId(input.chatId),
        });

        if (!chat) {
          throw new Error('Chat not found!');
        }

        await db.chats.findOneAndUpdate(
          { _id: chat._id },
          {
            $set: {
              messages: [...chat.messages, newMessage._id],
            },
          }
        );

        pubSub.publish('DIRECT_MESSAGE_CREATED', { message: newMessage });

        return newMessage;
      } catch (error) {
        throw new Error(`Failed to send direct message: ${error}`);
      }
    },
    openChat: async (
      _root: undefined,
      { input }: OpenChatArgs,
      { db, req }: Pick<ResolverContext, 'db' | 'req'>
    ): Promise<Chat> => {
      const { userId } = req.signedCookies;
      const participants = [userId, input.participant];

      let chat = await db.chats.findOne({
        type: ChatType.Direct,
        participants: {
          $in: participants,
        },
      });

      if (!chat) {
        try {
          const {
            ops: [newChat],
          } = await db.chats.insertOne({
            type: ChatType.Direct,
            participants,
            messages: [],
          });

          chat = newChat;
        } catch (error) {
          throw new Error(`Failed to open chat: ${error}`);
        }
      }

      return chat;
    },
  },
  Subscription: {
    directMessageCreated: {
      subscribe: (): AsyncIterator<string> =>
        pubSub.asyncIterator('DIRECT_MESSAGE_CREATED'),
      resolve: (payload: { message: Message }): Message => payload.message,
    },
  },
};
