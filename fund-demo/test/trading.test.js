const { expect } = require('chai');
const { loadAgents } = require('./helpers');

const decisions = [
  { action:'buy', asset:'NANO', amount:1 },
  { action:'sell', asset:'NANO', amount:2 },
  { action:'buy', asset:'BTC', amount:5 },
  { action:'buy', asset:'ETH', amount:3 },
  { action:'sell', asset:'ETH', amount:1 },
  { action:'buy', asset:'DOGE', amount:10 },
  { action:'buy', asset:'SOL', amount:4 },
  { action:'sell', asset:'SOL', amount:2 },
  { action:'buy', asset:'ADA', amount:6 },
  { action:'sell', asset:'ADA', amount:1 },
  { action:'buy', asset:'XMR', amount:2 },
  { action:'sell', asset:'XMR', amount:2 },
  { action:'buy', asset:'LTC', amount:7 },
  { action:'buy', asset:'DOT', amount:3 },
  { action:'sell', asset:'DOT', amount:1 }
];

describe('TradingAgent', function(){
  decisions.forEach((decision,i)=>{
    it(`executes trade case ${i+1}`, async function(){
      const { agents, restore, postStub } = loadAgents({ postResp:'done' });
      try {
        const t = new agents.TradingAgent();
        await t.execute(decision, { address:'nano_test' });
        expect(postStub.called).to.equal(true);
      } finally {
        restore();
      }
    });
  });
});
