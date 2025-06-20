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
    await new Promise(resolve => setTimeout(resolve, 500));
    const walletFile = path.join(__dirname, '..', 'fund-wallet.txt');
    const exists = fs.existsSync(walletFile);
    expect(exists).to.equal(true);
    const addr = fs.readFileSync(walletFile, 'utf8');
    expect(addr).to.match(/^nano_/);
  });
});

describe('Individual Agents', function(){
  const agents = require('../index.js');

  it('ResearchAgent should return array', async function(){
    this.timeout(10000);
    const r = new agents.ResearchAgent();
    const res = await r.evaluate();
    expect(res).to.be.an('array');
  });

  it('MarketAnalysisAgent should return trend object', async function(){
    this.timeout(10000);
    const m = new agents.MarketAnalysisAgent();
    const res = await m.analyze();
    expect(res).to.be.an('object');
    expect(res).to.have.property('trend');
  });

  it('RiskManagementAgent should return boolean', async function(){
    this.timeout(10000);
    const risk = new agents.RiskManagementAgent();
    const ok = await risk.check({ action: 'buy' });
    expect(ok).to.be.a('boolean');
  });

  it('PortfolioManagementAgent should return decision or null', async function(){
    this.timeout(10000);
    const risk = new agents.RiskManagementAgent();
    const p = new agents.PortfolioManagementAgent(risk);
    const res = await p.decide([{ symbol: 'NANO', score: 1 }], { trend: 'bullish' });
    expect(res === null || typeof res === 'object').to.equal(true);
  });

  it('SecurityAgent should create wallet file', async function(){
    const s = new agents.SecurityAgent();
    await s.storeWallet({ address: 'nano_test' });
    const walletFile = path.join(__dirname, '..', 'fund-wallet.txt');
    const exists = fs.existsSync(walletFile);
    expect(exists).to.equal(true);
  });

  it('ComplianceAgent should run without throwing', async function(){
    this.timeout(10000);
    const c = new agents.ComplianceAgent();
    await c.report();
  });
});
