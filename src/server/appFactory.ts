import path from 'node:path'
import express, {Express} from 'express';
import {createServer} from 'node:http';
import {engine} from 'express-handlebars';
import {Server as SocketIOServer} from "socket.io";
import {FurryMallsApp} from './types';
import winston from 'winston';


export const appFactory = async (logger: winston.Logger): Promise<FurryMallsApp> => {

  /********************************************************/
  const app: Express = express();
  const port = process.env.PORT || 3000;
  /********************************************************/
  app.engine('handlebars', engine());
  app.engine('hbs', engine({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
  }));
  app.set('view engine', 'hbs');
//  app.set('view engine', 'handlebars');
  app.use(express.static('public'));
  /********************************************************/
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
