import {Router} from 'express';
import {query} from 'express-validator'
import mongoose from 'mongoose';

import { currentUser, RequireAuth, requestValidation } from '@jaypeeblogs/common';
import {updateTodo} from '../controllers/updateTodo'

const updateTodoRouter = Router()

updateTodoRouter
.put('/todos',
currentUser,

RequireAuth,

query('todoId')
.custom((val:string)=> mongoose.Types.ObjectId.isValid(val))
.withMessage('todoId must be a valid mongodb objectId'),

query('status')
.not()
.isEmpty()
.isString()
.withMessage('status is not a valid string'),

requestValidation,

updateTodo
)

export default updateTodoRouter;