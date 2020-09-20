/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import {
  ApolloServer,
  makeExecutableSchema,
  PubSub,
} from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express, { Application, Request } from 'express';
import { applyMiddleware } from 'graphql-middleware';
import http from 'http';
import { connectToDatabase } from './database';
import { resolvers, typeDefs } from './graphql';
import { permissions } from './graphql/permissions';
import { Database, User } from './lib/types';

async function fetchCurrentUser(
  req: Request,
  db: Database
): Promise<User | null> {
  const userId = req?.signedCookies?.userId;

  if (!userId) return null;

  return db.users.findOne({ _id: userId });
}

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);

async function run(app: Application) {
  const db = await connectToDatabase();
  const pubSub = new PubSub();

  app.use(cookieParser(process.env.COOKIE_SECRET));

  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      const user = await fetchCurrentUser(req, db);

      return {
        db,
        req,
        res,
        user,
        pubSub,
      };
    },
  });

  server.applyMiddleware({
    app,
    path: '/api',
  });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(process.env.PORT, () => {
    console.log(
      `Server is running on http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`
    );
  });
}

run(express());
