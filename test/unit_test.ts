// Import necessary modules
import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../dist/main.js'
import { expect } from 'chai';
import { describe, it } from 'node:test';

// Configure chai to use chai-http
chai.use(chaiHttp);

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
      });
  });
});