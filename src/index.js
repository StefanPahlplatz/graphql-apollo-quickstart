// @flow

import express from 'express';
import { createServer } from 'http';

import middlewares from './middlewares';
import { PORT } from './utils/constants';
import { initializeDatabase } from './utils/database';

// Create an express server.
const app = express();

initializeDatabase();

// Apply middlewares.
middlewares(app);

const GraphQLServer = createServer(app);

GraphQLServer.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('\x1b[44m', `--- App started on PORT: ${PORT} ---`);
  }
});
