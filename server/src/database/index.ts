import { MongoClient } from 'mongodb';
import { Database } from '../lib/types';

export const connectToDatabase = async (): Promise<Database> => {
  const { DB_NAME, DB_USER, DB_USER_PASS, DB_CLUSTER } = process.env;

  const url = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = client.db(DB_NAME);

  return {
    messages: db.collection('messages'),
    users: db.collection('users'),
    chats: db.collection('chats')
  };
};
