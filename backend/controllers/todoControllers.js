import AsyncHandler from 'express-async-handler';
import { Todo } from '../models/todoModels.js';

const getTodos = AsyncHandler(async (req, res) => {
  const todos = await Todo.find({});
  res.status(200).json(todos);
});

const setTodo = AsyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'Please write a task' });
  }
  const todo = await Todo.create({
    title: req.body.title,
    text: req.body.text,
    completed: req.body.completed,
  });
  res.status(200).json(todo);
});

const updateTodo = AsyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    res.json({ error: 'User not found' });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedTodo);
});

const deleteTodo = AsyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    res.json({ error: 'User not found' });
  }

  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

export { getTodos, setTodo, updateTodo, deleteTodo };
