import express from 'express';
import { isAuthenticated } from '../middlewares/index';
import { isPostOwner } from '../middlewares/posts';
import { deletePost, getAllPosts, getPost, getPostsByUsername, newPost, updatePost } from '../controllers/posts';
import upload from '../middlewares/multer';


export default (router: express.Router) => {
    router.post('/post', isAuthenticated, upload.single("photo"), newPost);
    router.get('/posts', getAllPosts);
    router.get('/posts/:username', isAuthenticated, getPostsByUsername);
    router.get('/post/:id', isAuthenticated, getPost);
    router.delete('/post/:id', isAuthenticated, isPostOwner, deletePost);
    router.patch('/post/:id', isAuthenticated, isPostOwner, updatePost);
};