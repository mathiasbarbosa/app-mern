import  Jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'

// configure dotenv to read enviroment variables
dotenv.config()
const secret = process.env.SECRETKEY || ' MYSECRETKEY'

/**
 * 
 * @param {Request} req original request previos middleware of verification JWT
 * @param {Response} res response tp verification of JWT
 * @param {NextFunction} next next function to be executed
 * @returns Errors of verification or next execution
 */

export const verifyToken = (req:Request, res:Response, next:NextFunction) => {

    // check header from request for 'x-acess-token'
    let token: any = req.headers['x-access-token']
    // verify if jwt is present
    if (!token) {
        return res.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorised to consume this endpoint'
        })
    }

    // verify the token obtained
    Jwt.verify(token, secret ,(err:any, decoded:any) => {

        if (err) {
            return res.status(500).send({
                authenticationError: 'JWT verifaction failed ',
                message: 'failed to verify jwt token in requestt'
            })
        }

        //pass something to next request 
        // execute next function => preotected routes will be executed
        next()
    })

}