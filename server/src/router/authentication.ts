import express from 'express';
import { register, login, logout, authMe, uploadPic } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares/index';
import upload from '../middlewares/multer';

export default (router: express.Router) =>{
    router.post('/auth/register', register);
    router.post('/auth/upload/:username', upload.single('profilePic'), uploadPic);
    router.post('/auth/login', login);
    router.get('/auth/session', authMe);
    router.post('/auth/logout', isAuthenticated, logout);
};