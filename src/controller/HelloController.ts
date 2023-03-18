import { Get, Query, Route, Tags } from "tsoa";
import { BasicResponse } from "./types";
import { IHelloController } from "./interfaces";
import { logSuccess } from "../utils/logger";

@Route("/api/hello")
@Tags("HelloController")
export class HelloController implements IHelloController {
    /**
     * endpoint to retreive a message "hello {name} in json"
     * @param {string | undefined} name  Name of user to be greeted
     * @returns {BasicResponse} promise of BasicResponse
     */
    @Get("/")
    public async getMessage(@Query()name?: string): Promise<BasicResponse> {
        logSuccess('[/api/hello] Get Request')
        
        return {
            message: `Hello ${name || "world"}`
        }
    }
    
}