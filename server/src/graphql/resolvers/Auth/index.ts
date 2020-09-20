import { IResolvers } from 'apollo-server-express';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { Google } from '../../../lib/api';
import { Database, ResolverContext, User } from '../../../lib/types';
import { LogInArgs } from './types';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  secure: process.env.NODE_ENV === 'production',
  signed: true,
};

async function logInViaGoogle(
  code: string,
  token: string,
  db: Database,
  res: Response
): Promise<User> {
  const { user } = await Google.signIn(code);

  const displayName = user?.names?.[0]?.displayName || null;
  const avatar = user?.photos?.[0]?.url || null;
  const email = user?.emailAddresses?.[0]?.value || null;
  const id = user?.names?.[0]?.metadata?.source?.id;

  if (!displayName || !avatar || !email || !id) {
    throw new Error('Google login failed');
  }

  const { value: updateResult } = await db.users.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        avatar,
        displayName,
        email,
        token,
      },
    },
    {
      returnOriginal: false,
    }
  );

  let userData = updateResult;

  if (!userData) {
    const {
      ops: [insertResult],
    } = await db.users.insertOne({
      _id: id,
      avatar,
      displayName,
      email,
      token,
    });

    userData = insertResult;
  }

  res.cookie('userId', id, {
    ...cookieOptions,
    maxAge: 24 * 60 * 60 * 365 * 1000,
  });

  return {
    ...userData,
  };
}

const logInViaCookie = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<User | null> => {
  const { userId } = req.signedCookies;

  const { value: updateResult } = await db.users.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      $set: {
        token,
      },
    },
    {
      returnOriginal: false,
    }
  );

  if (!updateResult) {
    res.clearCookie('userId', cookieOptions);
  }

  return updateResult || null;
};

export const authResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
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
      { db, req, res }: ResolverContext
    ): Promise<User | null> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString('hex');

        const result = code
          ? logInViaGoogle(code, token, db, res)
          : logInViaCookie(token, db, req, res);

        return result;
      } catch (error) {
        throw new Error(`Failed to sign in user: ${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: undefined,
      { res, user }: Pick<ResolverContext, 'res' | 'user'>
    ): User => {
      try {
        res.clearCookie('userId', cookieOptions);
        return user;
      } catch (error) {
        throw new Error('Failed to log out.');
      }
    },
  },
};
