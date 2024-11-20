import express from 'express';
import mongoose from 'mongoose';
import {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoControllers.js';

const router = express.Router();

// get all Todos

router.get('/', getTodos);
router.post('/', setTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;
