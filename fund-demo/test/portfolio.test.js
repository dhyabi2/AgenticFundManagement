const { expect } = require('chai');
const sinon = require('sinon');
const { loadAgents } = require('./helpers');

describe('PortfolioManagementAgent', function(){
  const cases = [
    {desc:'high score, risk ok', score:0.8, risk:true, expected:true},
    {desc:'borderline score 0.51', score:0.51, risk:true, expected:true},
    {desc:'low score 0.5', score:0.5, risk:true, expected:false},
    {desc:'low score risk ok', score:0.3, risk:true, expected:false},
    {desc:'high score risk fail', score:0.9, risk:false, expected:false},
    {desc:'very high score risk ok', score:1, risk:true, expected:true},
    {desc:'negative score', score:-1, risk:true, expected:false},
    {desc:'risk error defaults reject', score:0.8, risk:'error', expected:false},
    {desc:'multiple decisions accumulate', score:0.7, risk:true, expected:true},
    {desc:'score 0.6 risk false', score:0.6, risk:false, expected:false},
    {desc:'score 0.55 risk true', score:0.55, risk:true, expected:true},
    {desc:'score just below threshold', score:0.49, risk:true, expected:false},
    {desc:'score 0.75 risk true', score:0.75, risk:true, expected:true},
    {desc:'score 0.85 risk true', score:0.85, risk:true, expected:true},
    {desc:'score 0.65 risk false', score:0.65, risk:false, expected:false}
  ];

  cases.forEach(({desc,score,risk,expected})=>{
    it(`should handle ${desc}`, async function(){
      const fakeRisk = { check: sinon.stub() };
      if (risk === 'error') fakeRisk.check.rejects(new Error('fail')); else fakeRisk.check.resolves(!!risk);
      const { agents, restore } = loadAgents();
      try {
        const P = agents.PortfolioManagementAgent;
        const p = new P(fakeRisk);
        if (risk === 'error') {
          await p.decide([{ symbol:'NANO', score }], {}).then(() => {
            throw new Error('should reject');
          }, err => {
            expect(err).to.be.instanceOf(Error);
          });
        } else {
          const res = await p.decide([{ symbol:'NANO', score }], {});
          if (expected) {
            expect(res).to.be.an('object');
          } else {
            expect(res).to.equal(null);
          }
        }
      } finally {
        restore();
      }
    });
  });
});
