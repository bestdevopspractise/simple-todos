import {Router} from 'express';

import { currentUser, RequireAuth } from '@jaypeeblogs/common';
import { getAllTodos } from '../controllers/getAllTodos';

const getAllTodosRouter = Router();

getAllTodosRouter
.get('/todos',
currentUser,
RequireAuth,
getAllTodos)

export default getAllTodosRouter;