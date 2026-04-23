import { Request, Response } from 'express';
import User from './user.model';
import { generateToken } from '../../utils/jwt';
import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new AppError('Please provide username and password', 400);
  }

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid credentials', 401);
  }

  const token = generateToken({ id: user._id, username: user.username, role: user.role });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  });
});

export const getMe = asyncHandler(async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.status(200).json({ success: true, user });
});
