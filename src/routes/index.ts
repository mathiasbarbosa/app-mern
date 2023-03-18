/**
 * root router
 * redirections to routers
 */
import express, { Request, Response } from 'express';
import helloRouter from './HelloRouter';
import { logInfo } from '../utils/logger';
import usersRouter from './UserRouter';
import authRouter from './AuthRouter';
import katassRouter from './KataRouter';

// server instance 
let server = express();

// router instance 
let rootRouter = express.Router();

// activate for request to http://localhost:8000/api
rootRouter.get('/', (req: Request, res: Response) => {
    logInfo('GET http://localhost:8000/api')
    res.send('app express')
})

// redirection to routers y controllers
server.use('/', rootRouter) //  http://localhost:8000/api/
server.use('/hello', helloRouter) // http://localhost:8000/api/hello/ => HelloRouter
// add more routes to the app
server.use('/users', usersRouter) // http://localhost:8000/api/users => HelloRouter
// AUTH routes
server.use('/auth', authRouter) // http://localhost:8000/api/auth => AuthRouter
server.use('/katas', katassRouter) // http://localhost:8000/api/katas => KatasRouter
export default server; 