// @flow

import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';

// The user as defined by mongoose.
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    firstName: String,
    lastName: String,
    avatar: String,
    password: String,
    email: String,
  },
  { timestamps: true },
);

// Pre save hook.
UserSchema.pre('save', function userPreSave(next: Function) {
  // If the password is modified hash it again.
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

// Schema methods.
UserSchema.methods = {
  /**
   * Hash the password.
   * @param {*string} password the unencrypted password.
   */
  _hashPassword(password: string): string {
    return hashSync(password);
  },
  /**
   * Authenticate a user.
   * @param {*string} password
   */
  authenticate(password: string): boolean {
    return compareSync(password, this.password);
  },
  /**
   * Create a token for a user.
   */
  createToken(): Object {
    return jwt.sign(
      {
        _id: this._id,
      },
      JWT_SECRET,
    );
  },
};

const User = mongoose.model('User', UserSchema);

export default User;
