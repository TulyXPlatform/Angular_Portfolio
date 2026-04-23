import { Request, Response } from 'express';
import Settings from './settings.model';

import asyncHandler from '../../utils/asyncHandler';

export const getSettings = asyncHandler(async (req: Request, res: Response) => {
  const settings = await Settings.findOne();
  res.status(200).json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req: Request, res: Response) => {
  let settings = await Settings.findOne();
  if (settings) {
    settings = await Settings.findByIdAndUpdate(settings._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    settings = await Settings.create(req.body);
  }
  res.status(200).json({ success: true, data: settings });
});
