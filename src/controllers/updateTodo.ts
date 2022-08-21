import {Request, Response} from "express";
import { NotFoundError, NotAuthorisedError } from "@jaypeeblogs/common";

import Todo from "../models/todo";
import User from "../models/user";


export const updateTodo = async (req: Request, res: Response) => {
    const { todoId, status } = req.query;

    const author = await User.findOne({ email: req.currentUser!.email });

    const todo = await Todo.findById({ _id: todoId });

    if (!todo) {
        throw new NotFoundError('todo not found');
    }

    if (todo.author !== author!.name) {
        throw new NotAuthorisedError('forbidden, not authorised');
    }

    todo.set('status', status);
    await todo.save();

    res.send(todo);
}