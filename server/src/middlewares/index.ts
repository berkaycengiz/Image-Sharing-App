import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> =>{
    try{
        const {id, username} = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        const currentUserUsername = get(req, 'identity.username') as string;

        if(!currentUserId || !currentUserUsername){ 
            console.log('a');
            return res.sendStatus(403);
        }

        if (id && currentUserId.toString() !== id) {
            console.log('b');
            return res.sendStatus(403);
        }
  
        if (username && currentUserUsername !== username) {
            console.log('c');
            return res.sendStatus(403);
        }

        next();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];

        if(!sessionToken){
            console.log('d');
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser){
            console.log('e');
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});
        return next();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};