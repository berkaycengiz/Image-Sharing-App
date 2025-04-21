import express from 'express';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares/index';
import upload from '../middlewares/multer';
import { uploadPic } from '../controllers/authentication';

export default (router: express.Router) => {
    router.get('/profile', isAuthenticated, getAllUsers);
    router.get('/profile/:username', isAuthenticated, getUser);
    router.delete('/profile/:username', isAuthenticated, isOwner, deleteUser);
    router.patch('/profile/:id', isAuthenticated, isOwner, updateUser);
    router.post('/profile/picture/:username', isAuthenticated, isOwner, upload.single('profilePic'), uploadPic);
};