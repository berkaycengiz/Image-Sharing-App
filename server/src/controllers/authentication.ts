import express from "express";
import { getUserByEmail, createUser, getUserBySessionToken, getUserByUsername } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.sendStatus(400);
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

        res.cookie('COOKIE-AUTH', user.authentication.sessionToken, { domain: '.localhost', path: '/' });

        return res.status(200).json(user).end();
    }
    catch (error){
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const {email, password, username, profilepic} = req.body;

        if (!email || !username || !password){
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser){
            return res.status(400).json({ message: 'Email already in use' });
        }

        const existingUser2 = await getUserByUsername(username);

        if(existingUser2){
            return res.status(400).json({ message: 'Username already in use' });
        }

        if(password.length < 6){
            return res.status(400).json({ message: 'Password must be at least 6 characters long.' })
        }

        const salt = random();
        const connected = false;
        
        const user = await createUser({
            email,
            username,
            connected,
            profilepic,
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

export const logout  = async (req: express.Request, res: express.Response): Promise<any> => {
    try{
        const sessionToken = req.cookies['COOKIE-AUTH'];
        
        if (!sessionToken) {
            return res.status(401).json({ message: 'Unauthorized: No session token provided' });
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