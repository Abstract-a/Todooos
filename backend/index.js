import express from 'express';
import 'dotenv/config';
import todoRouter from './routes/todoRoutes.js';
import commentsRouter from './routes/commentsRoutes.js';
import userRouter from './routes/userRoutes.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) => {
  res.send({ message: 'hello' });
});

app.use('/api/todos', todoRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', userRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
