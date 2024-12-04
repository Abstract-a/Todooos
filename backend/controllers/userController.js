import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/UserModel.js';

// Register user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    res.json({ error: 'All fields are mandatory ' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    res.json({ error: 'User exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWTtoken(user._is),
    });
  } else {
    res.status(400).json({ error: 'Invalid user data' });
  }
});

// login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateJWTtoken(user._id),
    });
  } else {
    res.status(401).json({ error: 'Invalid data' });
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.body.id);
  res.status(200).json({ id: _id, name, email });
});
const generateJWTtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '5d' });

export { registerUser, loginUser, getCurrentUser };
