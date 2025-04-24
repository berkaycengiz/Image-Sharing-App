import express from 'express';
import { isAuthenticated } from '../middlewares/index';
import { getAllPosts, newPost } from '../controllers/posts';
import upload from '../middlewares/multer';

export default (router: express.Router) => {
    router.post('/post', isAuthenticated, upload.single("photo"), newPost);
    router.get('/posts', getAllPosts);
};