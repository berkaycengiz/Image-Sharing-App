import express from "express";
import { getUserByEmail, createUser, getUserBySessionToken, getUserByUsername } from "../db/users";
import { authentication, random } from "../helpers";
import { uploadFromBuffer } from "../helpers/cloudinaryHelper";
import { extractPublicIdFromUrl } from "../helpers/cloudinaryURLHelper";
import { cloudinary } from "../config/cloudinaryConfig";

export const authMe = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];

        if (!sessionToken) {
          return res.status(401).json({ message: 'Access denied. Please log in first.' });
        }
    
        const user = await getUserBySessionToken(sessionToken);
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid or expired session' });
        }
    
        return res.sendStatus(200);
    } 
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const login = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {email, password, rememberMe} = req.body;

        if(!email || !password){
            return res.status(400).json({ message: 'Please make sure all fields are filled in correctly.' });
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            return res.status(403).json({ message: 'Email or password is invalid.' });
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if(expectedHash !== user.authentication.password){
            return res.status(403).json({ message: 'Email or password is invalid.' });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('COOKIE-AUTH', user.authentication.sessionToken, {
                domain: '.localhost', 
                path: '/', 
                httpOnly: true,
                sameSite: 'lax',
                maxAge: rememberMe ? 14 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
        });
        return res.status(200).json(user).end();
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {email, password, username} = req.body;

        let profilePicUrl

        if(!req.file){
            profilePicUrl = 'https://res.cloudinary.com/dhzzoyfgt/image/upload/v1739299446/no-pic.png';
        }

        if (!email || !username || !password){
            return res.status(400).json({ message: 'Please make sure all fields are filled in correctly.' });
        }

        let existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({ message: 'Email already in use' });
        }

        existingUser = await getUserByUsername(username);

        if(existingUser){
            return res.status(400).json({ message: 'Username already in use' });
        }

        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' })
        }

        const salt = random();
        
        const user = await createUser({
            email,
            username,
            profilePic: profilePicUrl,
            authentication: {
                salt,
                password: authentication(salt, password)
            },
        });

        return res.status(200).json(user).end;
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const logout = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];
        
        if (!sessionToken) {
            return res.status(401).json({ message: 'Access denied. Please log in first.' });
        }
        
        const user = await getUserBySessionToken(sessionToken);

        user.authentication.sessionToken = '';
        await user.save();
        res.clearCookie('COOKIE-AUTH');
        return res.status(200).json({ message: 'Successfully logged out' });
    }
    catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const uploadPic = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {username} = req.params;

        const user = await getUserByUsername(username);

        const publicId = extractPublicIdFromUrl(user.profilePic);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.file) {
            const options = {folder: 'profile_pics'}
            const result = await uploadFromBuffer(req.file.buffer, options);
            user.profilePic = result.secure_url;
        }

        if (publicId && publicId !== "no-pic") {
            await cloudinary.uploader.destroy(publicId);
        }
         
        await user.save();

        return res.status(200).json(user).end;
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};