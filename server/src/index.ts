/* eslint-disable import/first */
require('dotenv').config();

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './graphql';

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app, path: '/api' });

app.get('/', (_req, res) => {
  res.send('Hello, world!\n');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
