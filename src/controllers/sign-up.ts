
import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {BadRequestError} from '@jaypeeblogs/common'

import User from '../models/user';




export const signUp = async (req:Request, res:Response) => {
    const {email,name, password} = req.body;

    const existingUser = await User.findOne({email:email})

    if(existingUser){
        throw new BadRequestError('bad request user already exit');
    }

    const user = User.build({email,name,password});

    await user.save()

    const token = jwt.sign({id:user.id, email:user.email}, process.env.JWT!);
     

    req.session = {token:token};
     
     res.status(201).send(user);
}
