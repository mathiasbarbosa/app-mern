import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// BCRYPT for passwords
import bcrypt from 'bcrypt'

// middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";
// body parser
import  bodyParser  from "body-parser";
// middleware to read json in body
let jsonParser = bodyParser.json()

// Router from express
let authRouter = express.Router();

authRouter.route('/register')
    // POST
    .post(jsonParser,async (req:Request, res:Response) => {
        let {name, email, password, age} = req?.body
        let hashedPassword = '';
        if ( name && email && password && age ) {
            //obtain the password in request and cypher
            hashedPassword = bcrypt.hashSync( password, 8);
            let newUser: IUser = {
                name,
                email,
                password: hashedPassword,
                age,
                katas: []
            }
             // controller instance to excute method 
            const controller: AuthController = new AuthController()
            // obtain response 
            const response: any = await controller.registerUser(newUser)
              // send to the cliente the response
            return res.status(200).send(response)
        }else{
              // send to the cliente the response
              return res.status(400).send({
                message: '[Error user data missing]: no user can be registered'
              })
        }
    })

authRouter.route('/login')
    // POST
    .post(jsonParser,async (req:Request, res:Response) => {
        let { email, password} = req?.body
        let hashedPassword = ''
        if (  email && password  ) {
            
             // controller instance to excute method 
            const controller: AuthController = new AuthController()

           
            let auth: IAuth = {
                email,
                password
            }
            // obtain response 
            const response: any = await controller.loginUser(auth)
              // send to the cliente the response wich includes the jwt to authorize requests
            return res.status(200).send(response)
        }
        else{
            // send to the cliente the response
            return res.status(400).send({
              message: '[Error user data missing]: no user can be registered'
            })
      }
    })


// ROUTE PROTECTED BY verify token middleware
authRouter.route('/me')
    .get(verifyToken, async (req: Request, res:Response) => {
      // ontain the id of user to check it's data
      let id: any = req?.query?.id
      if (id) {
        // Controller: auth controller
        const controller: AuthController = new AuthController();

        //obtain response from controller 
        let response: any = await controller.userData(id)
        //remove the password
        response.password = '';
        // if user is authorised
        return res.status(200).send(response)

      }else{
        return res.status(401).send({
          message: ' you are not authorised to perform this action'
        })
      }
    })

export default authRouter