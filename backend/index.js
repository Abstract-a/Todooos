import express from 'express';
import 'dotenv/config';
import todoRouter from './routes/todoRoutes.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({ message: 'hello' });
});

app.use('/api/todos', todoRouter);

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
