import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const User = mongoose.model('User', UserSchema);
