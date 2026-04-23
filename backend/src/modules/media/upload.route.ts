import { Router } from 'express';
import { uploadMedia } from './upload.controller';
import { upload } from './upload.service';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', protect, upload.single('file'), uploadMedia);

export default router;
