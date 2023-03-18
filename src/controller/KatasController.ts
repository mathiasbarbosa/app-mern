import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { logSuccess, logError, logWarning } from "../utils/logger";

// orm - Kata
import { getAlKatas, getKataByID, crateNewKata, updateKataByID, deletKataByID } from "../domain/orm/Katas.orm";
import { IKata } from "../domain/interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KataController")

export class KatasController implements IKataController {
    /**
     * endpoint to retreive the kata in te collection "katas" of DB
     * @param {string} id id of kata to retreive (optional) 
     * @returns all kata o kata found by id
     */
    
    @Get("/")
    public async getkatas(id?: string | undefined): Promise<any> {
        let response: any = '';

        if (id) {
        
            logSuccess(`[/api/katas] Get kata By ID ${id}`)
            response = await getKataByID(id)
            //remove the password
             response.password = '';
        
        }else {
            
            logSuccess(`[/api/katas] Get All katas Request`)
            response = await getAlKatas()
            // TODO remove passwords from response
        }
    
        return response
    
        throw new Error("Method not implemented.");
    }

    public async createKata(kata: IKata): Promise<any> {
        let response: any = '';

        if (kata) {
        
            logSuccess(`[/api/katas] register new kata:${kata}`)
            await crateNewKata(kata).then((r) => {
                logSuccess(`[/api/katas] Created new kata ${kata}`)
                response = {
                    message: `creating new kata: ${kata.name}`
                }
            })
        
        }else {
            
            logWarning(`[/api/katas] Register needs kata entity `)
            response = {
                message: `kata not register. Please, provide a kata entity to create one`
            }
        }
    
        return response
    }
    /**
     * endpoint to delete the kata in te collection "katas" of DB
     * @param {string} id id of kata to retreive (optional) 
     * @returns message informing  if deletion was correct 
     */
    @Delete("/")
    public async deletekata(@Query()id?: string): Promise<any> {
        let response: any = '';

        if (id) {
        
            logSuccess(`[/api/katas] delete kata By ID ${id}`)
            await deletKataByID(id).then((r) => {
                response = {
                    message: `kata delete successfull: ${id}`
                }
            })
        
        }else {
            
            logWarning(`[/api/katas] delete kata request without id`)
            response = {
                message: `Please, provide an id to remove from database`
            }
        }
    
        return response
    }
    public async updatekata(id: string, kata: IKata): Promise<any> {
        let response: any = '';

        if (id) {
        
            logSuccess(`[/api/katas] Update kata By ID ${id}`)
            await updateKataByID(id, kata).then((r) => {
                response = {
                    message: `kata update successfull: ${id}`
                }
            })
        
        }else {
            
            logWarning(`[/api/katas] update kata request without id`)
            response = {
                message: `Please, provide an id to update from database`
            }
        }
    
        return response

    }

}