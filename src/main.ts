import express, { Request, Response } from 'express';
import {createServer} from 'node:http';
import {engine} from 'express-handlebars';
import {Server} from "socket.io";

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
const port = process.env.PORT || 3000;

const server = createServer(app);
const io = new Server(server);

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/workspace', (req, res) => {
  res.render('workspace');
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

io.on('connection', (socket)=> {
  console.log("some user connected");

  io.emit('update', {property: "prop", value: "fdsa"})
  socket.on('disconnect', ()=> {
    console.log('user disconnected');
  });
})