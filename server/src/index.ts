/* eslint-disable import/first */
require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';
import { connectToDatabase } from './database';

async function run(app: Application) {
  const db = await connectToDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
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
