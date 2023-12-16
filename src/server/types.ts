import {Express} from 'express';
import {Server as SocketIOServer} from "socket.io";
import {DefaultEventsMap} from 'socket.io/dist/typed-events';
import {createServer, Server} from 'node:http';

export type IOServer = SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>

export interface FurryMallsApp {
    app: Express;
    httpServer: Server;
    io: IOServer;
    shutDown(): Promise<void>;
}
