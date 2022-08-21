import {Request, Response} from "express";

import Todo from "../models/todo"
import User from "../models/user"

export const getAllTodos = async (req:Request, res:Response) => {

    const author = await User.findOne({
        email: req.currentUser!.email
    })

    const todos = await Todo.find({
        author: author!.name
    })

    res.send(todos)

};