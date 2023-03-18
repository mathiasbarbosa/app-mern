// env variables
import dotenv from 'dotenv';
import server from './src/server/index';
import { logError, logSuccess } from './src/utils/logger';

// * configuration the .env file 
dotenv.config();

const port = process.env.PORT || 8000;

// * execute server
server.listen(port, () => {
    logSuccess(`[server on]: runing in http://localhost:${port}/api`)
});

// * control server error
server.on('error', (error) => {
    logError(`[server error]: ${error}`)
});