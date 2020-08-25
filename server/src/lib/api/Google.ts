import { google } from 'googleapis';

const { G_CLIENT_ID, G_CLIENT_SECRET, PUBLIC_URL } = process.env;

const client = new google.auth.OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  PUBLIC_URL,
);

export const Google = {
  generateAuthUrl: () => client.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
  signIn: async (code: string) => {
    const { tokens } = await client.getToken(code);

    client.setCredentials(tokens);

    const { data } = await google.people({ version: 'v1', auth: client }).people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    });

    return {
      user: data,
    };
  },
};
