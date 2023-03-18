import { UserController } from "../controller/UsersController";
import express, { Request, Response } from "express";

import { logInfo } from "../utils/logger";

// body parser to read body from requests
import bodyParser from "body-parser";

// middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

let jsonParser = bodyParser.json()
// Router from express
let usersRouter = express.Router();

// GET => http://localhost:8000/api/users?id=
usersRouter.route('/')
    .get(verifyToken,async (req: Request, res: Response) => {
        // obtain a query param
        let id: any = req?.query?.id;
        logInfo(`query param: ${id}`)
        // controller instance to excute method 
        const controller: UserController = new UserController()
        // obtain response 
        const response: any = await controller.getUsers(id)
        // send to the cliente the response
        return res.status(200).send(response)
    } )
    // DELETE
    .delete(verifyToken,async (req:Request, res:Response) => {
        // obtain a query param
        let id: any = req?.query?.id;
        logInfo(`query param: ${id}`)
        // controller instance to excute method 
        const controller: UserController = new UserController()
        // obtain response 
        const response: any = await controller.deleteUser(id)
        // send to the cliente the response
        return res.status(200).send(response)
    })
    .put(verifyToken,async (req:Request, res:Response) => {
        // obtain a query param
        let id: any = req?.query?.id;
        logInfo(`query param: ${id}`)
        // controller instance to excute method 
         const controller: UserController = new UserController()
         let user = {
            name: "Jorge",
            email: "jorge@gmail.com",
            age:  18
         }
         // obtain response 
         const response: any = await controller.updateUser(id, user)
         // send to the cliente the response
         return res.status(200).send(response)
    }) 

// GET => http://localhost:8000/api/users/katas
usersRouter.route('/katas')
.get(verifyToken,async (req: Request, res: Response) => {
     // obtain a query param
     let id: any = req?.query?.id;
     logInfo(`query param: ${id}`)
     // controller instance to excute method 
     const controller: UserController = new UserController()
     // obtain response 
     const response: any = await controller.getKatas(id)
     // send to the cliente the response
     return res.status(200).send(response)
})

export default usersRouter