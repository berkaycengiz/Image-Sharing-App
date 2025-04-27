import express from 'express';
import { isAuthenticated, isOwner } from '../middlewares/index';
import { deletePost, getAllPosts, getPost, getPostsByUsername, newPost, updatePost } from '../controllers/posts';
import upload from '../middlewares/multer';


export default (router: express.Router) => {
    router.post('/post', isAuthenticated, upload.single("photo"), newPost);
    router.get('/posts', getAllPosts);
    router.get('/posts/:username', isAuthenticated, getPostsByUsername);
    router.get('/post/:id', isAuthenticated, getPost);
    router.delete('/post/:id', isAuthenticated, isOwner, deletePost);
    router.patch('/post/:id', isAuthenticated, isOwner, updatePost);
};