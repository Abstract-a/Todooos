import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const TodosSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentsSchema = mongoose.Schema(
  {
    todo: {
      type: Schema.Types.ObjectId,
      ref: 'Todo',
    },
    comment: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

export const Comments = mongoose.model('Comments', CommentsSchema);
export const Todo = mongoose.model('Todo', TodosSchema);
