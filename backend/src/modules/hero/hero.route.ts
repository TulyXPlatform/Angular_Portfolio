import { Router } from 'express';
import { getHero, updateHero } from './hero.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.route('/')
  .get(getHero)
  .put(protect, updateHero);

export default router;
