import {Express} from 'express';
import {Server as SocketIOServer} from "socket.io";
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {Server} from 'node:http';
import winston from 'winston';

export type IOServer = SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export interface FurryMallsApp {
    app: Express;
    httpServer: Server;
    io: IOServer;
    shutDown(): Promise<void>;
}

export interface FurryMallsAppFactoryOptions {
    logger: winston.Logger;
}