import express from 'express';
import mongoose from 'mongoose';

import {
  getComments,
  setComment,
  updateComment,
  deleteComment,
} from '../controllers/commentsControllers.js';

const router = express.Router();

router.get('/:id', getComments);
router.post('/:id', setComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
