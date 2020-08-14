require('dotenv').config();

// eslint-disable-next-line import/first
import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.send('Hello, world!\n');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
