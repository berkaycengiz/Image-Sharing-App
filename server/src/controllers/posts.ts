import express from 'express';
import { deletePostById, getPostById, getPosts, createPost, getPostsByUserId } from '../db/posts';
import { RequestWithIdentity } from '../index.d';
import { uploadFromBuffer } from '../helpers/cloudinaryHelper';
import { getUserByUsername } from '../db/users';
import { extractPublicIdFromUrl } from '../helpers/cloudinaryURLHelper';
import { cloudinary } from '../config/cloudinaryConfig';


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

export const getPostsByUsername = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {username} = req.params;

        const user = await getUserByUsername(username);

        const posts = await getPostsByUserId(user.id);

        return res.json(posts);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const newPost = async (req: RequestWithIdentity, res: express.Response): Promise<any> => {
    try{
        const {description} = req.body;
        const user = req.identity; //lodash get 2. yontem.
    
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

        const post = await getPostById(id);

        const deletedPost = await deletePostById(id);

        const publicId = extractPublicIdFromUrl(post.photo);

        if(publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

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
        else{
            return res.status(400).json({ message: "The description is already the same." });
        }

        await post.save();
        
        return res.status(200).json(post).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};