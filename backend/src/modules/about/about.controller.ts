import { Request, Response } from 'express';
import About from './about.model';
import asyncHandler from '../../utils/asyncHandler';

export const getAbout = asyncHandler(async (req: Request, res: Response) => {
  const about = await About.findOne();
  res.status(200).json({ success: true, data: about });
});

export const updateAbout = asyncHandler(async (req: Request, res: Response) => {
  let about = await About.findOne();
  if (about) {
    about = await About.findByIdAndUpdate(about._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    about = await About.create(req.body);
  }
  res.status(200).json({ success: true, data: about });
});
