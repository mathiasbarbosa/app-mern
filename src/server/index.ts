import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
//swagger
import swaggerUi from 'swagger-ui-express';

// security
import cors from 'cors';
import helmet from 'helmet';

// TODO HTTPS

// Root routes
import router from '../routes'
import { logSuccess } from "../utils/logger";


 // * create express app
 const server: Express = express();

// * swagger config and route
server.use(
   '/docs',
   swaggerUi.serve,
   swaggerUi.setup(undefined, {
      swaggerOptions: {
         url: "/swagger.json",
         explorer: true
      }
   })
);

 // * define server  to use /api and use rootRouter from index.ts in routes 
 // from this point onover: http://localhost:8000/api/
 server.use('/api',router)

 // static server
 server.use(express.static('public'));

 // todo mongoose conection
 mongoose.connect('mongodb://127.0.0.1:27017/codeverification')
   .then(() => {
      logSuccess("DB CONECTADA")
   })
   .catch((err) => {
      console.log(`EROR: ${err}`);
      
   })

 // * security config
 server.use(helmet());
 server.use(cors());

 // * content type config
 server.use(express.urlencoded({ extended:true, limit: '50mb'}))
 server.use(express.json({limit: '50mb'}))

 // * redirectionconfig
 // http://localhost:8000/ => http://localhost:8000/api/
 server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
 })

 export default server