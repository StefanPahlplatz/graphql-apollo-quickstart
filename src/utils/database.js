/* eslint-disable no-console */

import mongoose from 'mongoose';

import { MONGODB_URL } from './constants';

/**
 * Function that sets up the database connection.
 */
function initializeDatabase() {
  mongoose.Promise = global.Promise;

  // debug mode on
  mongoose.set('debug', true);

  try {
    // Connect to the MongoDB server with the existing connection.
    mongoose.connect(MONGODB_URL, {
      useMongoClient: true,
      server: {
        auto_reconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      },
    });
  } catch (err) {
    // Create a new connection.
    mongoose.createConnection(MONGODB_URL, {
      useMongoClient: true,
    });
  }

  // Open the connection.
  mongoose.connection
    .once('open', () => {
      // Database connection opened succesfully.
    })
    .on('error', (e) => {
      throw e;
    });
}

export {
  initializeDatabase,
};
