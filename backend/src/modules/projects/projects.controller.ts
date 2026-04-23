import { Request, Response } from 'express';
import Project from './project.model';

import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: projects.length, data: projects });
});

export const getProjectBySlug = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  res.status(200).json({ success: true, data: project });
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.create(req.body);
  res.status(201).json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  res.status(200).json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    throw new AppError('Project not found', 404);
  }
  res.status(200).json({ success: true, data: null });
});
