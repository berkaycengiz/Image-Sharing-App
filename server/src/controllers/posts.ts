import express from 'express';
import { deletePostById, getPostById, getPosts, createPost } from '../db/posts';
import { RequestWithIdentity } from '../index.d';
import { uploadFromBuffer } from '../helpers/cloudinaryHelper';


export const getPost = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const post = await getPostById(id);

        return res.json(post);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const newPost = async (req: RequestWithIdentity, res: express.Response): Promise<any> => {
    try{
        const {description} = req.body;
        const user = req.identity;
    
        if (!req.file || !description) {
            return res.status(400).json({ message: "Please make sure all fields are filled in correctly." });
        }

        if (description.length > 120){
            return res.status(400).json({ message: 'Description should not exceed 120 characters.' });
        }

        let photoUrl = "";

        if (req.file) {
            const options = {folder: 'posts'}
            const result = await uploadFromBuffer(req.file.buffer, options);
            photoUrl = result.secure_url;
        }

        const post = await createPost({
            photo: photoUrl,
            description,
            postedBy: user.id,
          });

        return res.status(200).json(post);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const getAllPosts = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const posts = await getPosts();

        return res.status(200).json(posts);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deletePost = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const deletedPost = await deletePostById(id);

        return res.json(deletedPost);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updatePost = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;
        const {description} = req.body;

        const post = await getPostById(id);

        if (description && description !== post.description) {
            post.description = description;
        }

        await post.save();
        
        return res.status(200).json(post).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};