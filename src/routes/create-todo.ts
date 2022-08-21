import {Router} from 'express';
import {body} from 'express-validator';

import {RequireAuth, currentUser, requestValidation} from '@jaypeeblogs/common';
import {createTodo} from '../controllers/create-todo'

const createTodoRouter = Router();


createTodoRouter
.post('/todos',
 currentUser,
 RequireAuth,
 body('item').
 isString().
 withMessage('must be defined'),
 requestValidation,
 createTodo
);

export default createTodoRouter;

