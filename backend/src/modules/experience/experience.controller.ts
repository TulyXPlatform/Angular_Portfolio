import { Request, Response } from 'express';
import Experience from './experience.model';
import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const getExperiences = asyncHandler(async (req: Request, res: Response) => {
  const experiences = await Experience.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: experiences.length, data: experiences });
});

export const createExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.create(req.body);
  res.status(201).json({ success: true, data: experience });
});

export const updateExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!experience) {
    throw new AppError('No experience found with that ID', 404);
  }
  res.status(200).json({ success: true, data: experience });
});

export const deleteExperience = asyncHandler(async (req: Request, res: Response) => {
  const experience = await Experience.findByIdAndDelete(req.params.id);
  if (!experience) {
    throw new AppError('No experience found with that ID', 404);
  }
  res.status(200).json({ success: true, data: null });
});
