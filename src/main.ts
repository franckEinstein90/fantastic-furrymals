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

interface ChatMessage {
  text: string;
  userId: string;
  timestamp: string;
}

interface WindowCountMessage {
  count: number;
}

interface FurryMalsApp {
  io: SocketIOServer;
}

const main = async (): Promise<void> => {
  const furryMalsApp: FurryMalsApp = await appFactory(logger);
  const io: SocketIOServer = furryMalsApp.io;

  const emitWindowCount = (): void => {
    const payload: WindowCountMessage = { count: io.of('/').sockets.size };
    io.emit('window_count', payload);
  };

  io.on('connection', (socket: Socket): void => {
    const userId = randomUUID();
    socket.data.user_id = userId;
    socket.emit('user_id', { user_id: userId });
    emitWindowCount();
    logger.info(`user connected: ${userId}`);

    socket.on('chat message', (text: string): void => {
      const cleanedText = text.trim();
      if (!cleanedText) {
        return;
      }

      const message: ChatMessage = {
        text: cleanedText,
        userId,
        timestamp: new Date().toISOString(),
      };

      io.emit('chat message', message);
    });

    socket.on('disconnect', (): void => {
      emitWindowCount();
      logger.info(`user disconnected: ${socket.data.user_id}`);
    });
  });
}

main().catch(() => {
  logger.error('error starting application');
});
