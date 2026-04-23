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

  // 1. Variable-based Login Bypass
  const envAdminUser = process.env.ADMIN_USERNAME || 'admin';
  const envAdminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === envAdminUser && password === envAdminPass) {
    let user = await User.findOne({ username: envAdminUser });
    if (!user) {
      user = await User.create({
        username: envAdminUser,
        password: envAdminPass,
        role: 'admin'
      });
    }

    const token = generateToken({ id: user._id, username: envAdminUser, role: 'admin' });
    return res.status(200).json({
      success: true,
      token,
      user: { id: user._id, username: envAdminUser, role: 'admin' }
    });
  }

  // 2. Standard DB Login
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
