// Import necessary modules
import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import express from 'express';
import {createServer} from 'node:http';
import { engine } from 'express-handlebars';

const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Configure chai to use chai-http
chai.use(chaiHttp);

app.get('/', (req, res) => {
  res.render('home')

})

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

describe('Server', () => {
  // Test to check if the server is running successfully
  it('should return a 200 status when accessing the root endpoint', (done) => {
    chai.request(app)
      .get('/')
      .end((err:any, res:any) => {
        // Assert that there are no errors
        expect(err).to.be.null;

        // Assert that the status code is 200
        expect(res).to.have.status(200);

        // Call done to finish the test
        done();

        // Stop the server
        server.close();

      });
  });
});
