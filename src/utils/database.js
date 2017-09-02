/* eslint-disable no-console */

import mongoose from 'mongoose';

import { MONGODB_URL } from './constants';

/**
 * Function that sets up the database connection.
 */
function initializeDatabase() {
  mongoose.Promise = global.Promise;

  mongoose.set('debug', true); // debug mode on

  try {
    mongoose.connect(MONGODB_URL, {
      useMongoClient: true,
    });
  } catch (err) {
    mongoose.createConnection(MONGODB_URL, {
      useMongoClient: true,
    });
  }

  mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', (e) => {
      throw e;
    });
}

export {
  initializeDatabase,
};
