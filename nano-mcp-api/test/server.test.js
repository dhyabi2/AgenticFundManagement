const { expect } = require('chai');
const request = require('supertest');
const path = require('path');

let server;

before(function(done){
  const apiPath = path.join(__dirname, '..', 'src', 'server.js');
  server = require(apiPath);
  // server.js exports nothing but starts listening; wait a bit
  setTimeout(done, 500);
});

after(function(){
  server.close && server.close();
});

describe('Nano MCP REST API', function(){
  it('should return capabilities', async function(){
    const res = await request('http://localhost:3000').get('/initialize');
    expect(res.status).to.equal(200);
    expect(res.body.capabilities).to.be.an('object');
  });

  it('should generate wallet', async function(){
    const res = await request('http://localhost:3000').get('/generateWallet');
    expect(res.status).to.equal(200);
    expect(res.body.address).to.be.a('string');
    expect(res.body.privateKey).to.be.a('string');
  });

  it('should return AI response', async function(){
    const res = await request('http://localhost:3000')
      .post('/ai/ask')
      .send({ prompt: 'Hello' });
    expect(res.status).to.equal(200);
    expect(res.body.text).to.be.a('string');
  });
});
