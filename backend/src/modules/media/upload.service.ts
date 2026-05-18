import multer from 'multer';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const isCloudinaryConfigured = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name' &&
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_KEY !== 'your_api_key' &&
  process.env.CLOUDINARY_API_SECRET && 
  process.env.CLOUDINARY_API_SECRET !== 'your_api_secret';

let storage;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      // Generate an optimized version and thumbnails automatically via Cloudinary transformations
      // Cloudinary natively supports PDF and CAD (via conversion) when proper configurations are met
      let folder = 'portfolio/media';
      let resource_type = 'auto'; // automatically detects image/video/raw

      // Example logic for specific formats if needed
      if (file.mimetype === 'application/pdf') {
         folder = 'portfolio/docs';
      }

      return {
        folder: folder,
        resource_type: resource_type,
        public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
      };
    },
  });
} else {
  // Local storage fallback
  const uploadDir = 'uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname.replace(/\s+/g, '_')}`);
    }
  });
}

export const upload = multer({ storage: storage });
