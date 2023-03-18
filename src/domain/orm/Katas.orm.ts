import { KataEntity } from "../entities/Kata.entity";
import { logError, logSuccess } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";

// enviroment variables
import dotenv from 'dotenv'


dotenv.config()

//crud
/**
 * method to obtain all userss from collection "Users" in mongo server
 */
export const getAlKatas = async () => {

    try {
        let kataModel = KataEntity();
        // search all users
        return await kataModel.find({isDelete:false})
    } catch (error) {
        logError(`[ORM ERROR]: getting all katas: ${error}`)
    }
}

// TODO:
// get user by id
export const getKataByID = async (id:string) : Promise<any | undefined> => {

    try {
        let kataModel = KataEntity();

        //search kata by id
        return await kataModel.findById(id)

    } catch (error) {
        logError(`[ORM ERROR] Getting All kata: ${error}`)
    }
    
}

// Delete kata by id
export const deletKataByID =  async (id:string): Promise<any | undefined> => {

    try {
        let kataModel = KataEntity()
        // delete kata by ID
        return await kataModel.deleteOne({_id: id})
    } catch (error) {
        logError(`[ORM ERROR] Deleting kata by id: ${error}`)
    }

}
// Create new user
export const crateNewKata = async (kata:IKata): Promise<any | undefined> => {

    try {
        
        let kataModel = KataEntity()

        //create / inser new kata
        return await kataModel.create(kata)

    } catch (error) {
        logError(`[ORM ERROR] Creating kata ${error}`)
    }
}
// update kata by id
export const updateKataByID = async(id:string, kata:any): Promise<any | undefined> => {

    try {
        
        let kataModel = KataEntity()
        // update kata
        return await kataModel.findByIdAndUpdate(id, kata)

    } catch (error) {
        logError(`[ORM ERROR]: Updating Kata`)
    }
}

