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
import { randomUUID } from 'node:crypto';
import winston from 'winston';
import { Server as SocketIOServer, Socket } from 'socket.io';

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

interface UpdateMessage {
  property: string;
  value: string;
}

interface ChatMessage {
  text: string;
}

interface FurryMalsApp {
  io: SocketIOServer;
}

const main = async (): Promise<void> => {

  const furryMalsApp: FurryMalsApp = await appFactory(logger);
  const io: SocketIOServer = furryMalsApp.io;

  io.on('connection', (socket: Socket): void => {
    const userId = randomUUID();
    socket.data.user_id = userId;
    socket.emit('user_id', { user_id: userId });
    console.log(`user connected: ${userId}`);

    io.emit('update', { property: "prop", value: "fdsa" } as UpdateMessage);

    socket.on('chat message', (msg: ChatMessage): void => {
      console.log(msg);
      io.emit('chat message', msg);
    });
 
    socket.on('disconnect', (): void => {
      console.log(`user disconnected: ${socket.data.user_id}`);
    });
  

  })

}




main()
.catch(e => {
  console.log('error')
})

