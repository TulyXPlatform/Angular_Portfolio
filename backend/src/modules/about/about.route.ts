import { Router } from 'express';
import { getAbout, updateAbout } from './about.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.route('/')
  .get(getAbout)
  .put(protect, updateAbout);

export default router;
