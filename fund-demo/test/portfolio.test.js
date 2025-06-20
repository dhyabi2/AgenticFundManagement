const { expect } = require('chai');
const sinon = require('sinon');
const { loadAgents } = require('./helpers');

describe('PortfolioManagementAgent', function(){
  function runCase(score, risk, expected) {
    const fakeRisk = { check: sinon.stub() };
    if (risk === 'error') fakeRisk.check.rejects(new Error('fail')); else fakeRisk.check.resolves(!!risk);
    const { agents, restore } = loadAgents();
    return { fakeRisk, P: agents.PortfolioManagementAgent, restore };
  }

  it('decides with high score and risk ok', async function(){
    const { fakeRisk, P, restore } = runCase(0.8, true, true);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.8 }], {});
      expect(res).to.be.an('object');
    } finally { restore(); }
  });

  it('decides borderline score 0.51', async function(){
    const { fakeRisk, P, restore } = runCase(0.51, true, true);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.51 }], {});
      expect(res).to.be.an('object');
    } finally { restore(); }
  });

  it('rejects at score 0.5', async function(){
    const { fakeRisk, P, restore } = runCase(0.5, true, false);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.5 }], {});
      expect(res).to.equal(null);
    } finally { restore(); }
  });

  it('rejects with low score despite risk ok', async function(){
    const { fakeRisk, P, restore } = runCase(0.3, true, false);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.3 }], {});
      expect(res).to.equal(null);
    } finally { restore(); }
  });

  it('rejects when risk fails', async function(){
    const { fakeRisk, P, restore } = runCase(0.9, false, false);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.9 }], {});
      expect(res).to.equal(null);
    } finally { restore(); }
  });

  it('accepts very high score', async function(){
    const { fakeRisk, P, restore } = runCase(1, true, true);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:1 }], {});
      expect(res).to.be.an('object');
    } finally { restore(); }
  });

  it('rejects negative score', async function(){
    const { fakeRisk, P, restore } = runCase(-1, true, false);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:-1 }], {});
      expect(res).to.equal(null);
    } finally { restore(); }
  });

  it('fails when risk check errors', async function(){
    const { fakeRisk, P, restore } = runCase(0.8, 'error', false);
    try {
      const p = new P(fakeRisk);
      await p.decide([{ symbol:'NANO', score:0.8 }], {}).then(
        () => { throw new Error('should reject'); },
        err => { expect(err).to.be.instanceOf(Error); }
      );
    } finally { restore(); }
  });

  it('accepts score 0.7 when risk ok', async function(){
    const { fakeRisk, P, restore } = runCase(0.7, true, true);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.7 }], {});
      expect(res).to.be.an('object');
    } finally { restore(); }
  });

  it('rejects when risk false at score 0.6', async function(){
    const { fakeRisk, P, restore } = runCase(0.6, false, false);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.6 }], {});
      expect(res).to.equal(null);
    } finally { restore(); }
  });

  it('accepts score 0.55 with risk true', async function(){
    const { fakeRisk, P, restore } = runCase(0.55, true, true);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.55 }], {});
      expect(res).to.be.an('object');
    } finally { restore(); }
  });

  it('rejects just below threshold', async function(){
    const { fakeRisk, P, restore } = runCase(0.49, true, false);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.49 }], {});
      expect(res).to.equal(null);
    } finally { restore(); }
  });

  it('accepts score 0.75 with risk true', async function(){
    const { fakeRisk, P, restore } = runCase(0.75, true, true);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.75 }], {});
      expect(res).to.be.an('object');
    } finally { restore(); }
  });

  it('accepts score 0.85 with risk true', async function(){
    const { fakeRisk, P, restore } = runCase(0.85, true, true);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.85 }], {});
      expect(res).to.be.an('object');
    } finally { restore(); }
  });

  it('rejects when risk false at score 0.65', async function(){
    const { fakeRisk, P, restore } = runCase(0.65, false, false);
    try {
      const p = new P(fakeRisk);
      const res = await p.decide([{ symbol:'NANO', score:0.65 }], {});
      expect(res).to.equal(null);
    } finally { restore(); }
  });
});
