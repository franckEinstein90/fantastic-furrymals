import {Server} from "socket.io";
import {DefaultEventsMap} from 'socket.io/dist/typed-events';

export type IoServer = Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;