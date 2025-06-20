const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('TradingAgent', function(){
  function execute(decision){
    const { agents, restore, postStub } = loadAgents({ postResp:'done' });
    return { agents, restore, postStub, decision };
  }

  it('executes buy NANO', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'NANO', amount:1 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes sell NANO', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'sell', asset:'NANO', amount:2 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy BTC', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'BTC', amount:5 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy ETH', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'ETH', amount:3 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes sell ETH', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'sell', asset:'ETH', amount:1 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy DOGE', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'DOGE', amount:10 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy SOL', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'SOL', amount:4 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes sell SOL', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'sell', asset:'SOL', amount:2 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy ADA', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'ADA', amount:6 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes sell ADA', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'sell', asset:'ADA', amount:1 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy XMR', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'XMR', amount:2 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes sell XMR', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'sell', asset:'XMR', amount:2 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy LTC', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'LTC', amount:7 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes buy DOT', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'buy', asset:'DOT', amount:3 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('executes sell DOT', async function(){
    const { agents, restore, postStub, decision } = execute({ action:'sell', asset:'DOT', amount:1 });
    try { const t = new agents.TradingAgent(); await t.execute(decision, { address:'nano_test' }); expect(postStub.called).to.equal(true); } finally { restore(); }
  });
});
