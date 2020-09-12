// eslint-disable-next-line camelcase
import { google, people_v1 } from 'googleapis';

const { G_CLIENT_ID, G_CLIENT_SECRET, PUBLIC_URL } = process.env;

const client = new google.auth.OAuth2(G_CLIENT_ID, G_CLIENT_SECRET, PUBLIC_URL);

export const Google = {
  generateAuthUrl: (): string =>
    client.generateAuthUrl({
      access_type: 'online',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ]
    }),
  // eslint-disable-next-line camelcase
  signIn: async (code: string): Promise<{ user: people_v1.Schema$Person }> => {
    const { tokens } = await client.getToken(code);

    client.setCredentials(tokens);

    const { data } = await google
      .people({ version: 'v1', auth: client })
      .people.get({
        resourceName: 'people/me',
        personFields: 'emailAddresses,names,photos'
      });

    return {
      user: data
    };
  }
};
