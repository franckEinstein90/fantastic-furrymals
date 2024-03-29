import { appFactory } from './server/appFactory';
import winston from 'winston'

// Create a logger instance
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

  const furryMalsApp = await appFactory(logger);
  const io = furryMalsApp.io;

  io.on('connection', (socket)=> {
    console.log("some user connected");

    io.emit('update', {property: "prop", value: "fdsa"});

    socket.on('disconnect', ()=> {
      console.log('user disconnected');
    });
  })

}




main()
.catch(e => {
  console.log('error')
})

