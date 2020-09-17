import { Request } from 'express';
import { Database, User } from '../types';

export const authorize = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  const { userId } = req.signedCookies;
  const token = req.header('CSRF-TOKEN');

  return db.users.findOne({
    _id: userId,
    token,
  });
};
