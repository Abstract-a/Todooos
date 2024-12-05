import AsyncHandler from 'express-async-handler';
import { Comments } from '../models/CommentModel.js';

const getComments = AsyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const comments = await Comments.find({ todo: todoId });
  res.status(200).json(comments);
});

const setComment = AsyncHandler(async (req, res) => {
  const { todo, comment } = req.body;
  if (!comment || !todo) {
    res.status(400).json({ error: 'Comment or todo not found' });
  }

  const newComment = await Comments.create({ todo, comment });

  res.status(201).json(newComment);
});

const updateComment = AsyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    res.status(400).json({ error: 'Comment not found' });
  }

  const updatedComment = await Comments.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedComment);
});

const deleteComment = AsyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    res.status(400);
    res.json({ error: 'Comment not found' });
  }

  await Comments.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

export { getComments, setComment, updateComment, deleteComment };
