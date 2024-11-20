import mongoose from 'mongoose';

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

export const Todo = mongoose.model('Todo', TodosSchema);
