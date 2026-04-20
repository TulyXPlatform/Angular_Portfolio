import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
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

export const upload = multer({ storage: storage });
