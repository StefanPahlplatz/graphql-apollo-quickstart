// @flow

import jwt from 'jsonwebtoken';

import { JWT_SECRET } from './constants';
import User from '../models/User';

/**
 * Checks if the user is authenticated.
 * @param {*Object} user the user from the context.
 */
export async function requireAuth(user: Object) {
  // Check if we got data the right data in the header.
  if (!user || !user._id) {
    throw new Error('UNAUTHORIZED');
  }

  // Check if the user actually exists.
  const me = await User.findById(user._id);
  if (!me) {
    throw new Error('UNAUTHORIZED');
  }

  return me;
}

/**
 * Checks if the token is valid or not.
 * @param {*string} token to decrypt.
 * @returns true if the token is valid.
 */
export function decodeToken(token: string) {
  const arr = token.split(' ');

  if (arr[0] === 'Bearer') {
    return jwt.verify(arr[1], JWT_SECRET);
  }

  throw new Error('INVALID_TOKEN');
}
