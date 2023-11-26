import express, { Request, Response } from 'express';
import {engine} from 'express-handlebars';

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
    res.render('home');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
