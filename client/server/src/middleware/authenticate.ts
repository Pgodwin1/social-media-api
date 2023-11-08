import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserInstance } from '../model/userModel';

const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(req: Request | any, res: Response, next: NextFunction){
    const authorisation = req.headers.authorization;
    if(!authorisation) return res.status(401).json({ msg: 'Kindly sign in' })

    const token = authorisation.split(' ')[1];
    let verified = jwt.verify(token, jwtsecret);
    if(!verified) {
        return res.status(401).json({ msg: 'You are not authorised' })
    }
    const { id } = verified as { id: string };
    const user = await UserInstance.findOne({ where: { id}})
    if(!user){
        return res.status(401).json({ msg: 'Kindly sign in' }) 
    } 
    req.user = verified;
    next();
};
