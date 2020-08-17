import { IResolvers } from 'apollo-server-express';
import { uuid } from 'uuidv4';
import { Google } from '../../../lib/api';
import { Database, User } from '../../../lib/types';
import { LogInArgs } from './types';

async function logInViaGoogle(code: string): Promise<User | undefined> {
  const { user } = await Google.signIn(code);

  const displayName = user?.names?.[0]?.displayName || null;
  const avatar = user?.photos?.[0]?.url || null;
  const email = user?.emailAddresses?.[0]?.value || null;
  const id = user?.names?.[0]?.metadata?.source?.id;

  if (!displayName || !avatar || !email || !id) {
    throw new Error('Google login failed');
  }

  return {
    _id: id,
    displayName,
    avatar,
    email,
    token: uuid(),
  };
}

export const authResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return Google.generateAuthUrl();
      } catch (error) {
        throw new Error(`Failed to generate authUrl: ${error}`);
      }
    },
  },
  Mutation: {
    logIn: (
      _root: undefined,
      { input }: LogInArgs,
      { db }: { db: Database },
    ): Promise<any> => {
      try {
        return logInViaGoogle(input.code);
      } catch (error) {
        throw new Error(`Failed to sign in user: ${error}`);
      }
    },
  },
};
