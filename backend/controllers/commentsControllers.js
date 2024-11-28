import AsyncHandler from 'express-async-handler';
import { Comments } from '../models/todoModels';

const getComments = AsyncHandler(async (req, res) => {
  const comments = await Comments.find({});
  res.status(200).json(todos);
});

const setComment = AsyncHandler(async (req, res) => {
  if (!req.body.comment) {
    res.status(400).json({ error: 'Please Write a comment' });
  }
  const comment = Comments.create({
    comment: req.body.comment,
  });

  res.status(200).json(todo);
});

const UpdateComment = AsyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    res.status(400);
    res.json({ error: 'Comment not found' });
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

const DeleteComment = AsyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    res.status(400);
    res.json({ error: 'Comment not found' });
  }

  await Comments.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

export { getComments, setComment, updatedComment, DeleteComment };
