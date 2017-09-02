// @flow

import User from '../models/User';
import { requireAuth } from '../utils/auth';

const MIN_SEARCH_LENGTH = 2;

export default {
  signup: async (_, { fullName, ...rest }) => {
    try {
      const [firstName, ...lastName] = fullName.split(' ');
      const user = await User.create({ firstName, lastName, ...rest });

      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },

  login: async (_, { username, password }) => {
    try {
      const user = await User.findOne({ username });

      if (!user || !user.authenticate(password)) {
        throw new Error('INVALID_CREDENTIALS');
      }

      return {
        token: user.createToken(),
      };
    } catch (error) {
      throw error;
    }
  },

  search: async (_, { query }) => {
    try {
      if (query.length < MIN_SEARCH_LENGTH) {
        throw new Error('TOO_SHORT');
      }

      const users = await User.find({
        $or: [
          { firstName: new RegExp(query, 'i') },
          { lastName: new RegExp(query, 'i') },
          { username: new RegExp(query, 'i') },
        ],
      }).limit(10);
      if (!users) {
        throw new Error('NO_RESULTS');
      }
      return users;
    } catch (error) {
      throw error;
    }
  },

  me: async (_, args, { user }) => {
    try {
      const me = await requireAuth(user);
      return me;
    } catch (error) {
      throw error;
    }
  },
};
