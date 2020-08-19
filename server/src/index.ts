/* eslint-disable import/first */
require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
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

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}

run(express());
