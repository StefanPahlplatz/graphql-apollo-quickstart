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

UserSchema.pre('save', function userPreSave(next: Function) {
  // If the password is modified hash it again.
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }

  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return hashSync(password);
  },
  authenticate(password) {
    return compareSync(password, this.password);
  },
  createToken() {
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
