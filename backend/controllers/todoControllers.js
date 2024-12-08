import AsyncHandler from 'express-async-handler';
import { Todo } from '../models/TodoModel.js';
import { User } from '../models/UserModel.js';

const getTodos = AsyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  if (!todos) {
    res.status(401).json({ error: 'Todos not found' });
  }
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
    user: req.user.id,
  });
  res.status(200).json(todo);
});

const updateTodo = AsyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    res.json({ error: 'Todo not found' });
  }

  const user = await User.findById(req.user.id);
  // checking if the user associated with the todo is in our db
  if (!user) {
    res.status(401).json({ error: 'User not found' });
  }

  if (todo.user.toString() !== user.id) {
    res.status(401).json({ error: 'User not authorised to update' });
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
    res.json({ error: 'Todo not found' });
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401).json({ error: 'User not found' });
  }

  if (todo.user.toString() !== user.id) {
    res.status(401).json({ error: 'User is not authorised to delete' });
  }

  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ id: req.params.id });
});

export { getTodos, setTodo, updateTodo, deleteTodo };
