import { KatasController } from "../controller/KatasController";
import express, { Request, Response } from "express";

import { logInfo } from "../utils/logger";

// body parser to read body from requests
import bodyParser from "body-parser";

// middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { IKata, KataLevel } from "../domain/interfaces/IKata.interface";

let jsonParser = bodyParser.json()
// Router from express
let katassRouter = express.Router();

// GET => http://localhost:8000/api/users?id=
katassRouter.route('/')
    .get(verifyToken,async (req: Request, res: Response) => {
        // obtain a query param
        let id: any = req?.query?.id;
        logInfo(`query param: ${id}`)
        // controller instance to excute method 
        const controller: KatasController = new KatasController()
        // obtain response 
        const response: any = await controller.getkatas(id)
        // send to the cliente the response
        return res.status(200).send(response)
    } )
    // DELETE
    .delete(verifyToken,async (req:Request, res:Response) => {
        // obtain a query param
        let id: any = req?.query?.id;
        logInfo(`query param: ${id}`)
        // controller instance to excute method 
        const controller: KatasController = new KatasController()
        // obtain response 
        const response: any = await controller.deletekata(id)
        // send to the cliente the response
        return res.status(200).send(response)
    })
    .put(jsonParser,verifyToken,async (req:Request, res:Response) => {
        // obtain a query param
        let id: any = req?.query?.id;
        logInfo(`query param: ${id}`)
        //read from body
        let name: string = req?.body?.name
        let description: string = req?.body?.description || '' 
        let level: KataLevel = req?.body?.level || KataLevel.BASIC
        let intents: number = req?.body?.intents 
        let stars: number = req?.body?.stars
        let creator: string = req?.body?.creator
        let solution: string = req?.body?.solution
        let paticipants: string [] = req?.body?.paticipants

        if (name && description && level && intents >= 0 && stars >= 0 && creator && solution && paticipants.length >= 0) {
             // controller instance to excute method 
            const controller: KatasController = new KatasController()
            let kata: IKata = {
                name,
                description,
                level,
                intents,
                stars,
                creator,
                solution,
                paticipants
                
            }
            // obtain response 
            const response: any = await controller.updatekata(id, kata)
            // send to the cliente the response
            return res.status(200).send(response)
        }else{
            return res.status(400).send({
                message: '[error] updating Kata, you need to send all attrs of kata to update it'
            })
        }

      
    }) 
    .post(jsonParser,verifyToken,async (req:Request, res:Response) => {


        //read from body
        let name: string = req?.body?.name
        let description: string = req?.body?.description || '' 
        let level: KataLevel = req?.body?.level || KataLevel.BASIC
        let intents: number = req?.body?.intents 
        let stars: number = req?.body?.stars
        let creator: string = req?.body?.creator
        let solution: string = req?.body?.solution
        let paticipants: string [] = req?.body?.paticipants

        if (name && description && level && intents >= 0 && stars >= 0 && creator && solution && paticipants.length >= 0) {
            // controller instance to excute method 
            const controller: KatasController = new KatasController()
            let kata: IKata = {
                name,
                description,
                level,
                intents,
                stars,
                creator,
                solution,
                paticipants
                
            }
            // obtain response 
            const response: any = await controller.createKata(kata)
            // send to the cliente the response
            return res.status(201).send(response)
        }else{
            return res.status(400).send({
                message: '[error] creating Kata, you need to send all attrs of kata to update it'
            })
        }
    })
export default katassRouter