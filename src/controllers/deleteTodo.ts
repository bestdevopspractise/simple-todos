import {Request, Response} from "express"
import { NotAuthorisedError, NotFoundError } from "@jaypeeblogs/common"

import Todo from "../models/todo"
import User from "../models/user"

export const deleteTodo = async (req:Request, res:Response) => {
    const {todoId} = req.params;

    const todo = await Todo.findById({_id: todoId})

    if(!todo){
        throw new NotFoundError('todo not found')
    }

    const author = await User.findOne({email: req.currentUser!.email})

    if(todo.author !== author!.name){
        throw new NotAuthorisedError('forbidden, not authorised')
    }

    const deletedTodo = await Todo.deleteOne({_id: todoId})

    res.send(deletedTodo)
};