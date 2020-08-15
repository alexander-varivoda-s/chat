import { google } from 'googleapis';

const { G_CLIENT_ID, G_CLIENT_SECRET, PUBLIC_URL } = process.env;

const client = new google.auth.OAuth2(
  G_CLIENT_ID,
  G_CLIENT_SECRET,
  `${PUBLIC_URL}/login`,
);

export const Google = {
  generateAuthUrl: () => client.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  }),
};
