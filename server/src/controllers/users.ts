import express from 'express';
import { deleteUserById, getUserById, getUsers } from '../db/users';

export const getUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const user = await getUserById(id);

        return res.json(user);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getAllUsers = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const users = await getUsers();

        return res.status(200).json(users);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;

        const deletedUser = await deleteUserById(id);

        return res.json(deletedUser);
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {id} = req.params;
        const {profilepic} = req.body;

        const user = await getUserById(id);

        user.profilePic = profilepic;
        await user.save();
        
        return res.status(200).json(user).end();
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

