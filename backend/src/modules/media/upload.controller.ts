import { Request, Response } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import AppError from '../../utils/AppError';

export const uploadMedia = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  const isCloudinaryConfigured = 
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';

  let url = (req.file as any).path;
  let thumbnail = url;

  if (!isCloudinaryConfigured) {
    const port = process.env.PORT || 3000;
    const host = req.get('host') || `localhost:${port}`;
    const protocol = req.protocol;
    const normalizedPath = (req.file as any).path.replace(/\\/g, '/');
    url = `${protocol}://${host}/${normalizedPath}`;
    thumbnail = url;
  } else {
    thumbnail = (req.file as any).path.replace('/upload/', '/upload/w_300,h_300,c_fill/');
  }

  const fileData = {
    url,
    publicId: (req.file as any).filename,
    thumbnail
  };

  res.status(200).json({ success: true, data: fileData });
});
