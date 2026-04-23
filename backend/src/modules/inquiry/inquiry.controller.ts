import { Request, Response } from 'express';
import Inquiry from './inquiry.model';
import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const getInquiries = asyncHandler(async (req: Request, res: Response) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
});

export const createInquiry = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await Inquiry.create(req.body);
  res.status(201).json({ success: true, data: inquiry });
});

export const deleteInquiry = asyncHandler(async (req: Request, res: Response) => {
  const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
  if (!inquiry) {
    throw new AppError('No inquiry found with that ID', 404);
  }
  res.status(200).json({ success: true, data: null });
});
