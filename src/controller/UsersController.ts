import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { logSuccess, logError, logWarning } from "../utils/logger";

// ORM
import { deleteUserByID, getAllUsers, getUserByID, crateNewUser, updateUserByID, getKatasFromUser } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")

export class UserController implements IUserController{
    /**
     * endpoint to retreive the user in te collection "users" of DB
     * @param {string} id id of user to retreive (optional) 
     * @returns all user o user found by id
     */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {
        let response: any = '';

        if (id) {
        
            logSuccess(`[/api/users] Get User By ID ${id}`)
            response = await getUserByID(id)
            //remove the password
             response.password = '';
        
        }else {
            
            logSuccess(`[/api/users] Get All Users Request`)
            response = await getAllUsers()
            // TODO remove passwords from response
        }
    
        return response
    }
    /**
     * endpoint to delete the user in te collection "users" of DB
     * @param {string} id id of user to retreive (optional) 
     * @returns message informing  if deletion was correct 
     */
    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        let response: any = '';

        if (id) {
        
            logSuccess(`[/api/users] delete User By ID ${id}`)
            await deleteUserByID(id).then((r) => {
                response = {
                    message: `User delete successfull: ${id}`
                }
            })
        
        }else {
            
            logWarning(`[/api/users] delete user request without id`)
            response = {
                message: `Please, provide an id to remove from database`
            }
        }
    
        return response
    }

    @Put("/")
    public async updateUser(@Query()id: string, user: any): Promise<any> {
        
        let response: any = '';

        if (id) {
        
            logSuccess(`[/api/users] Update User By ID ${id}`)
            await updateUserByID(id, user).then((r) => {
                response = {
                    message: `User update successfull: ${id}`
                }
            })
        
        }else {
            
            logWarning(`[/api/users] update user request without id`)
            response = {
                message: `Please, provide an id to update from database`
            }
        }
    
        return response

    }
    @Get("/katas") // /users/katas
    public async getKatas(@Query()id: string): Promise<any> {
        let response : any = '';
        
        if (id) {
        
            logSuccess(`[/api/users/katas] Get katas from user By ID ${id}`)
            response = await getKatasFromUser(id)
            
        
        }else {
            
            logError(`[/api/users/katas] Get All katas without id `)
            response = {
                message: ' Id from user is needed'
            }
          
        }
       
            
        
    
        return response
    }
    
    
}
