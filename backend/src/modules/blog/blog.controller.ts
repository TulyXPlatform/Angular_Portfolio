import { Request, Response } from 'express';
import Blog from './blog.model';
import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: blogs.length, data: blogs });
});

export const getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findOne({ slug: req.params.slug });
  if (!blog) {
    throw new AppError('No blog found with that slug', 404);
  }
  res.status(200).json({ success: true, data: blog });
});

export const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.create(req.body);
  res.status(201).json({ success: true, data: blog });
});

export const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!blog) {
    throw new AppError('No blog found with that ID', 404);
  }
  res.status(200).json({ success: true, data: blog });
});

export const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
    throw new AppError('No blog found with that ID', 404);
  }
  res.status(200).json({ success: true, data: null });
});
