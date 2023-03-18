import express, { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { logInfo } from "../utils/logger";
import { BasicResponse } from "../controller/types";

// Router from express
let helloRouter = express.Router();

// GET => http://localhost:8000/api/hello/
helloRouter.route('/')
    .get(async (req: Request, res: Response) => {
        // obtain a query param
        let name: any = req?.query?.name;
        logInfo(`query param: ${name}`)
        // controller instance to excute method 
        const controller: HelloController = new HelloController()
        // obtain response 
        const response: BasicResponse = await controller.getMessage(name);
        // send to the cliente the response
        return res.send(response)
    } )

export default helloRouter