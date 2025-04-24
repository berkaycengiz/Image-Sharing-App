import express from 'express';
import { isAuthenticated } from '../middlewares/index';
import { getAllPosts, newPost } from '../controllers/posts';

export default (router: express.Router) => {
    router.post('/post', isAuthenticated, newPost);
    router.get('/posts', getAllPosts);
};