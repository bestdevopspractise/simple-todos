import {Router} from "express";
import {param} from "express-validator"
import mongoose from "mongoose";

import { currentUser, requestValidation, RequireAuth } from "@jaypeeblogs/common";
import {getOneTodo} from '../controllers/getOne-todo'

const getOneTodoRouter = Router()

getOneTodoRouter
.get('/:todoId',
currentUser,
RequireAuth,
param('todoId')
.custom((val:string)=> mongoose.Types.ObjectId.isValid(val))
.withMessage('todoId must be a valid mongodb objectId'),
requestValidation,
getOneTodo
);

export default getOneTodoRouter

