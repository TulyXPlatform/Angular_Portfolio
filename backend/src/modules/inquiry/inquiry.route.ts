import { Router } from 'express';
import { 
  getInquiries, 
  createInquiry, 
  deleteInquiry 
} from './inquiry.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', protect, getInquiries);
router.post('/', createInquiry);
router.delete('/:id', protect, deleteInquiry);

export default router;
