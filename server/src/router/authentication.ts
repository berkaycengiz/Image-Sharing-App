import express from 'express';
import { register, login, logout, authMe } from '../controllers/authentication';
import { isAuthenticated } from '../middlewares';

export default (router: express.Router) =>{
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/session', authMe);
    router.post('/auth/logout', isAuthenticated, logout);
};