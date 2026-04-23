import { Router } from 'express';
import { 
  getExperiences, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from './experience.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.route('/')
  .get(getExperiences)
  .post(protect, createExperience);

router.route('/:id')
  .put(protect, updateExperience)
  .delete(protect, deleteExperience);

export default router;
