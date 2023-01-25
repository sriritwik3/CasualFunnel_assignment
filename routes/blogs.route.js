import express from 'express';
import {
    getAllBlogs,
    addNewBlog,
    getIndividualID,
    updateBlogByID,
    deleteBlogByID,
} from '../controllers/blogs.controller.js';
import passport from 'passport';
import { isAuthor } from '../middleware.js';
import { isAuthenticated } from '../middleware.js';

const router = express.Router();

router.route('/').get(getAllBlogs).post(isAuthenticated, addNewBlog);
router
    .route('/:id')
    .get(getIndividualID)
    .put(isAuthenticated, isAuthor, updateBlogByID)
    .delete(isAuthenticated, isAuthor, deleteBlogByID);

export default router;
