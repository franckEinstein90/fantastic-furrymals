/******************************************************************************
 * The entry point for the llm-deliotte-chat-bot application. 
 * The appliation is a chat bot that is hosted on Azure and is accessible
 * through http or websocket connections. 
 * December 2023
/******************************************************************************/
// <----------------------------- 1. Load Environment Variables ---------------->
import { appFactory } from './server/appFactory';
import * as path from 'path';
import {config} from 'dotenv';
import winston from 'winston';
const ENV_FILE_NAME = process.env.ENV_FILE || '.env';
const ENV_FILE_PATH = path.join(__dirname, '..', ENV_FILE_NAME);
config({ path: ENV_FILE_PATH });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });

const main = async ():Promise<void> => {


  const furryMalsApp = await appFactory({
    logger
  });

  const io = furryMalsApp.io;
  io.on('connection', (socket)=> {
    console.log("some user connected");
    io.emit('update', {property: "prop", value: "fdsa"});

    socket.on('chat message', (msg)=> {
      console.log(msg);
    });
 
    socket.on('disconnect', ()=> {
      console.log('user disconnected');
    });
  })

}




main()
.catch(e => {
  console.log('error')
})

