import { IResolvers } from 'apollo-server-express';
import { Google } from '../../../lib/api';

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
};
