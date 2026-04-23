import { Router } from 'express';
import { 
  getBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from './blog.controller';
import { protect } from '../../middlewares/auth.middleware';

const router = Router();

router.route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

router.get('/slug/:slug', getBlogBySlug);

export default router;
