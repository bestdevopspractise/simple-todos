import {Router} from 'express';
import {param} from 'express-validator';
import mongoose from 'mongoose';

import { currentUser, requestValidation, RequireAuth } from '@jaypeeblogs/common';
import { deleteTodo} from '../controllers/deleteTodo';

const deleteTodoRouter = Router()

deleteTodoRouter
.delete('/:todoId',
currentUser,
RequireAuth,
param('todoId')
.custom((val:string)=> mongoose.Types.ObjectId.isValid(val))
.withMessage('todoId must be a valid mongodb objectId'),
requestValidation,
deleteTodo
)

export default deleteTodoRouter;