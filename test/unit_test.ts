// Import necessary modules
import chai from 'chai';
import chaiHttp from 'chai-http';
import {expect} from 'chai';
import winston from 'winston';
import { FurryMallsApp } from '../src/server/types'; 
import { appFactory } from '../src/server/appFactory';


let furryMalsTestApp: FurryMallsApp;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});


before(async ()=>{
  furryMalsTestApp = await appFactory(logger);
})

// Configure chai to use chai-http
chai.use(chaiHttp);


describe('FurryMals App Server', () => {

  it('should return a 200 status when accessing the root endpoint', (done) => {
    chai.request(furryMalsTestApp.app)
      .get('/')
      .end((err:any, res:any) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        furryMalsTestApp.shutDown();
        done();
      });
  });

});
