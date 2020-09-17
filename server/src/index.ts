/* eslint-disable import/first */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import http from 'http';
import { connectToDatabase } from './database';
import { resolvers, typeDefs } from './graphql';

async function run(app: Application) {
  const db = await connectToDatabase();

  app.use(cookieParser(process.env.COOKIE_SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
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
