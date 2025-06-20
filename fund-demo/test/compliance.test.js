const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('ComplianceAgent', function(){
  const texts = Array.from({length:15},(_,i)=>`report ${i+1}`);

  texts.forEach((text,i)=>{
    it(`generates report ${i+1}`, async function(){
      const { agents, restore, postStub } = loadAgents({ postResp:text });
      try {
        const c = new agents.ComplianceAgent();
        await c.report();
        expect(postStub.called).to.equal(true);
      } finally {
        restore();
      }
    });
  });
});
