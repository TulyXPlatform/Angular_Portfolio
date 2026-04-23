import { Request, Response } from 'express';

import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  const fileData = {
    url: (req.file as any).path,
    publicId: (req.file as any).filename,
    thumbnail: (req.file as any).path.replace('/upload/', '/upload/w_300,h_300,c_fill/')
  };

  res.status(200).json({ success: true, data: fileData });
});
