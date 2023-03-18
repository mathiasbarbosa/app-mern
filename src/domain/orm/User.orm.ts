import { userEntity } from "../entities/User.entity";
import { logError, logSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// enviroment variables
import dotenv from 'dotenv'


// bcrypt for password
import bcrypt from 'bcrypt'

// JWT
import jwt from 'jsonwebtoken'
import { KataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/IKata.interface";
import mongoose from "mongoose";

dotenv.config()
// obtain secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY'

//crud
/**
 * method to obtain all userss from collection "Users" in mongo server
 */
export const getAllUsers = async () => {

    try {
        let userModel = userEntity();
        // search all users
        return await userModel.find({isDelete:false})
    } catch (error) {
        logError(`[ORM ERROR]: getting all users: ${error}`)
    }
}

// TODO:
// get user by id
export const getUserByID = async (id:string) : Promise<any | undefined> => {

    try {
        let userModel = userEntity();

        //search user by id
        return await userModel.findById(id)

    } catch (error) {
        logError(`[ORM ERROR] Getting All Users: ${error}`)
    }
    
}
// get user by email
// Delete user by id
export const deleteUserByID =  async (id:string): Promise<any | undefined> => {

    try {
        let userModel = userEntity()
        // delete user by ID
        return await userModel.deleteOne({_id: id})
    } catch (error) {
        logError(`[ORM ERROR] Deleting user by id: ${error}`)
    }

}
// Create new user
export const crateNewUser = async (user:any): Promise<any | undefined> => {

    try {
        
        let userModel = userEntity()

        //create / inser new user
        return await userModel.create(user)

    } catch (error) {
        logError(`[ORM ERROR] Creating user ${error}`)
    }
}
// update user by id
export const updateUserByID = async(id:string, user:any): Promise<any | undefined> => {

    try {
        
        let userModel = userEntity()
        // update user
        return await userModel.findByIdAndUpdate(id, user)

    } catch (error) {
        logError(`[ORM ERROR]: Updating User`)
    }
}

// Registrer User
export const registerUser = async(user:IUser): Promise<any | undefined> => {
    // TODO NOT IMPLEMENTED
    try {
        
        let userModel = userEntity()

        //create / inser new user
        return await userModel.create(user)

    } catch (error) {
        logError(`[ORM ERROR] Creating user ${error}`)
    }
}
// Login User
export const loginrUser = async(auth:IAuth): Promise<any | undefined> => {
    try {
        
        let userModel = userEntity()

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        await userModel.findOne({email: auth.email}).then((user:IUser) => {

            userFound = user


        }).catch((err) => {
            console.error('[ERROR Autehntication in ORM]: USER NOT FOUND')
            throw new Error(`[ERROR Autehntication in ORM]: USER NOT FOUND: ${err}`);
            
        })

        // Use bcrypt to compare password
        let validPassword = bcrypt.compareSync(auth.password , userFound!.password)

        if (!validPassword) {
            // TODO not authorised (401)
            console.error('[ERROR Autehntication in ORM]: Password not valid')
            throw new Error(`[ERROR Autehntication in ORM]: Password not valid`);

        }
        //create JWT
        token = jwt.sign({email: userFound!.email}, secret ,{
            expiresIn:"2h"
        })

        return {
            user: userFound,
            token: token
        } 

    } catch (error) {
        logError(`[ORM ERROR] Creating user ${error}`)
    }
}

// Logout user
export const logoutrUser = async(): Promise<any | undefined> => {
    // TODO NOT IMPLEMENTED
}

/**
 * method to obtain all katas from userss in mongo server
 */
export const getKatasFromUser = async (id:string) => {

    try {
        let userModel = userEntity();
        let katasModel = KataEntity()
        
        let katasFound: IKata[] = []
        let response: any = {
            katas: []
        }

        await userModel.findById(id).then(async (user:IUser) => {

            response.user.name  = user.name
            response.user.email  = user.email

            let objectsIds: mongoose.Types.ObjectId[] = []
            user.katas.forEach((KataID : string) => {
                let objectID = new  mongoose.Types.ObjectId(KataID)
                objectsIds.push(objectID )
            })
           
            
            await katasModel.find({"_id": {'$in': objectsIds}}).then((katas:IKata[]) => {
              katasFound = katas
            })

            response.katas = katasFound

        }).catch(err => {
            logError(`[ORM ERROR]: getting all users: ${err}`)
        })
        // search all users
        return await userModel.find({isDelete:false})
    } catch (error) {
        logError(`[ORM ERROR]: getting all users: ${error}`)
    }
}