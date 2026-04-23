import { Router } from 'express';
import { getSettings, updateSettings } from './settings.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.route('/')
  .get(getSettings)
  .put(protect, updateSettings);

export default router;
