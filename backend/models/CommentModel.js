import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const CommentsSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    todo: {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
    comment: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

export const Comments =
  mongoose.models.Comments || mongoose.model('Comments', CommentsSchema);
