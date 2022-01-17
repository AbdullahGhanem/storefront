import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const token_secret = process.env.TOKEN_SECRET!;


const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization || ''
        const token = authorizationHeader.split(' ')[1]
        
        jwt.verify(token, token_secret)
        next();
    } catch (error) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
}

export default verifyAuthToken