import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IAuthController } from "./interfaces";
import { logSuccess, logError, logWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM
import {registerUser, loginrUser, logoutrUser, getUserByID } from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";



@Route("/api/users")
@Tags("AuthController")

export class AuthController implements IAuthController {
    @Post('/register')
    public async registerUser(user: IUser): Promise<any> {
        let response: any = '';

        if (user) {
        
            logSuccess(`[/api/auth/register] register new user:${user}`)
            await registerUser(user).then((r) => {
                logSuccess(`[/api/auth/register] Created new user ${user}`)
                response = {
                    message: `creating new user: ${user.name}`
                }
            })
        
        }else {
            
            logWarning(`[/api/auth/register] Register needs user entity `)
            response = {
                message: `User not register. Please, provide a user entity to create one`
            }
        }
    
        return response

    }

    @Post('/login')
    public async loginUser(auth: IAuth): Promise<any> {
        let response: AuthResponse | ErrorResponse | undefined;
        
        if (auth) {
            logSuccess(`[/api/auth/login] logged in user:${auth.email}`)
            // await loginrUser(auth).then((r) => {
            //     logSuccess(`[/api/auth/login] logged in user ${auth.email}`)
            //     response = {
            //         message: `User logged in successfully user: ${auth.email}`,
            //         token: r.token // JWT generated for logged in user
            //     }
            // })
            let data = await loginrUser(auth)
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }
        }else{
             
            logWarning(`[/api/auth/register] Register needs auth entity (email & password) `)
            response = {
                error: "[Auth ERROR]: email & password are neded",
                message: `Please, provide a email & password to login`
            }
        }

        return response
       
    }

     /**
     * endpoint to retreive the user in te collection "users" of DB
     * middleware validate JWT
     * in headers you must add the x-access-token with a valid JWT
     * @param {string} id id of user to retreive (optional) 
     * @returns all user o user found by id
     */
     @Get("/me")
     public async userData(@Query()id: string): Promise<any> {
         let response: any = '';
 
         if (id) {
         
             logSuccess(`[/api/users] Get User data By ID ${id}`)
             response = await getUserByID(id)
         
         }
     
         return response
     }

    @Post('/logout')
    public async logoutUser(): Promise<any> {
        let response: any = '';
       
    }
}

export default AuthController