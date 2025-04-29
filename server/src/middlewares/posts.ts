import { getPostById } from '../db/posts';
import express from 'express';
import { get } from 'lodash';

export const isPostOwner = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
    try{
        const {id} = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId){
            return res.sendStatus(404);
        }

        const post = await getPostById(id);

        if(!post){
            return res.sendStatus(404);
        }
        
        if(post.postedBy._id.toString() !== currentUserId.toString()){
            return res.sendStatus(403);
        }
        
        return next();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};