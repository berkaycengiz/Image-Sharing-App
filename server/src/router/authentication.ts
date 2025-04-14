import express from 'express';
import { register, login, logout, authMe } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares';
import upload from '../middlewares/multer';

export default (router: express.Router) =>{
    router.post('/auth/register', upload.single('profilePic'), register);
    router.post('/auth/login', login);
    router.get('/auth/session', authMe);
    router.post('/auth/logout', isAuthenticated, logout);
};