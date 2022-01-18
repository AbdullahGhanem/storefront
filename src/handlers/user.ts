import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/verifyauthtoken';

const store = new UserStore()
const token_secret = process.env.TOKEN_SECRET!;

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (_req: Request, res: Response) => {
    try {
        const user = await store.show(_req.params.id)
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user)
        return res.json(newUser)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        username: req.body.username,
        password: req.body.password,
    }
    try {
        const u = await store.authenticate(user.username, user.password)
        if (u) {
            if (token_secret) {
                let token = jwt.sign({ user: u }, token_secret);
                res.json(token);
            }
        } else {
            res.send('Username or password incorrect');
        }
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
}
const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id)
        res.json(deleted)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}
const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
    app.post('/users/login', authenticate)
    app.delete('/users', verifyAuthToken, destroy);
}

export default userRoutes
