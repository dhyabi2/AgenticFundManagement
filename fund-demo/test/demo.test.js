const { expect } = require('chai');
const fs = require('fs');
const path = require('path');

let server;
let dashboard;

before(function(done){
  // start the API server
  const apiPath = path.join(__dirname, '..', '..', 'nano-mcp-api', 'src', 'server.js');
  server = require(apiPath);
  const dashPath = path.join(__dirname, '..', '..', 'dashboard', 'server.js');
  dashboard = require(dashPath).start();
  setTimeout(done, 500);
});

after(function(){
  server.close && server.close();
  dashboard.httpServer.close();
  dashboard.mqttServer.close();
  dashboard.mqttClient.end(true);
});

describe('Agentic Fund Demo', function(){
  it('should generate wallet file', async function(){
    this.timeout(10000);
    const { main } = require('../index.js');
    await main();
    await new Promise(resolve => setTimeout(resolve, 500)); // allow async ops
    const walletFile = path.join(__dirname, '..', 'fund-wallet.txt');
    const exists = fs.existsSync(walletFile);
    expect(exists).to.equal(true);
    const addr = fs.readFileSync(walletFile, 'utf8');
    expect(addr).to.match(/^nano_/);
  });
});
