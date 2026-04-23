import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../modules/auth/user.model';
import asyncHandler from '../utils/asyncHandler';
import AppError from '../utils/AppError';

export const protect = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized to access this route', 401);
  }

  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      throw new AppError('User belonging to this token no longer exists', 401);
    }
    next();
  } catch (error) {
    throw new AppError('Not authorized to access this route', 401);
  }
});

export const authorize = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(`User role ${req.user.role} is not authorized to access this route`, 403);
    }
    next();
  };
};
