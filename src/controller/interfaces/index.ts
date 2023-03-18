
import { BasicResponse } from "../types";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { IKata } from "../../domain/interfaces/IKata.interface";

export interface IHelloController{
    getMessage(name?:string): Promise <BasicResponse>
}

export interface IUserController{

    //read all user from database || fubd user by id
    getUsers(id?:string): Promise<any>
    
    //Get katas of user
    getKatas(id?:string): Promise<any>

    //delete user by id
    deleteUser(id?:string): Promise <any>

    //update user
    updateUser(id:string, user: any): Promise<any>
}

export interface IAuthController{
    //registrer user
    registerUser(user: IUser): Promise <any>
    // loginUser
    loginUser(auth:any): Promise<any>
}

export interface IKataController {

     //read all kata from database || fubd kata by id
    getkatas(id?:string): Promise<any>


    // create new kata
    createKata(kata: IKata): Promise<any> 

    //delete kata by id
    deletekata(id?:string): Promise <any>

    //update kata
    updatekata(id:string, user: IKata): Promise<any>
}