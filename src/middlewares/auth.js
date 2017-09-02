// @flow

import { decodeToken } from '../utils/auth';

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token != null) {
      const user = await decodeToken(token);
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
