import express from 'express';
import mongoose from 'mongoose';
import {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoControllers.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// get all Todos

router.get('/', protect, getTodos);
router.post('/', protect, setTodo);
router.put('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);

export default router;
