import { Router } from 'express';
import { getContact, updateContact } from './contact.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.route('/')
  .get(getContact)
  .put(protect, updateContact);

export default router;
