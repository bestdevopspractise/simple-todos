import {Request,Response} from  "express"

import User from "../models/user" 
import Todo from "../models/todo"


export const createTodo = async (req:Request, res: Response) => {

    const {item} = req.body
    const author = await User.findOne({email: req.currentUser!.email})

    const todo = Todo.build({
        item: item,
        author: author!.name 
    })

    await todo.save()

    res.status(201).send(todo)
};