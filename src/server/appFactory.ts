import path from 'node:path'
import fs from 'node:fs';
import express, {Express} from 'express';
import {createServer} from 'node:http';
import {engine} from 'express-handlebars';
import {Server as SocketIOServer} from "socket.io";
import {FurryMallsApp} from './types';
import winston from 'winston';

const resolveFirstExistingPath = (paths: string[]): string => {
  for (const possiblePath of paths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }

  return paths[0];
};

export const appFactory = async (logger: winston.Logger): Promise<FurryMallsApp> => {
  const app: Express = express();
  const port = process.env.PORT || 3000;

  const viewsDir = resolveFirstExistingPath([
    path.join(process.cwd(), 'src/views'),
    path.join(process.cwd(), 'dist/views'),
    path.join(__dirname, '../views'),
  ]);

  const publicDir = resolveFirstExistingPath([
    path.join(process.cwd(), 'public'),
    path.join(__dirname, '../../public'),
  ]);

  app.engine('handlebars', engine({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(viewsDir, 'layouts'),
    partialsDir: path.join(viewsDir, 'partials')
  }));

  app.set('view engine', 'handlebars');
  app.set('views', viewsDir);
  app.use(express.static(publicDir));

  app.get('/', (req, res) => {
    res.render('home');
  });

  app.get('/workspace', (req, res) => {
    res.render('workspace', { data: "yourData" });
  });

  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
  });

  const io = new SocketIOServer(httpServer);

  return {
    io,
    app,
    httpServer,

    shutDown: async ()=>{
      io.close(()=>{
        logger.info('Socket.IO shut down');
      });
      httpServer.close(()=>{
        logger.info('HTTP server shut down');
      });
    }
  }
}
