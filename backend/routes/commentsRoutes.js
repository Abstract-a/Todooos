import express from 'express';
import mongoose from 'mongoose';

import {
  getComments,
  setComment,
  updateComment,
  deleteComment,
} from '../controllers/commentsControllers.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:todoId', protect, getComments);
router.post('/', protect, setComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;
