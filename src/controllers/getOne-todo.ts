import {Request, Response} from "express";

import Todo from "../models/todo"
import { NotFoundError } from "@jaypeeblogs/common";

export const getOneTodo = async (req:Request, res:Response) => {

    const {todoId} = req.params

    const todo = await Todo.findById({_id: todoId})

    if(!todo){
        throw new NotFoundError('todo not found')
    }

    res.send(todo)

};