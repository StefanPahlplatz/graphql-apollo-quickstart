// @flow

import { decodeToken } from '../utils/auth';

/**
 *
 * @param {*Object} req the request object.
 * @param {*Object} res the response object.
 * @param {*Function} next the next middleware function in the application’s request-response cycle.
 */
async function auth(req: Object, res: Object, next: Function) {
  try {
    // Get the token from the authorization header.
    const token = req.headers.authorization;

    if (token != null) {
      // Try to get a user object from the token.
      const user = await decodeToken(token);
      // Set the user as part of the request so we can access it later.
      req.user = user || null;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
}

export default auth;
