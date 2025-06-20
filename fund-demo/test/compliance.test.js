const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('ComplianceAgent', function(){
  function run(text){
    const { agents, restore, postStub } = loadAgents({ postResp:text });
    return { agents, restore, postStub };
  }

  it('generates report 1', async function(){
    const { agents, restore, postStub } = run('report 1');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 2', async function(){
    const { agents, restore, postStub } = run('report 2');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 3', async function(){
    const { agents, restore, postStub } = run('report 3');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 4', async function(){
    const { agents, restore, postStub } = run('report 4');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 5', async function(){
    const { agents, restore, postStub } = run('report 5');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 6', async function(){
    const { agents, restore, postStub } = run('report 6');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 7', async function(){
    const { agents, restore, postStub } = run('report 7');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 8', async function(){
    const { agents, restore, postStub } = run('report 8');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 9', async function(){
    const { agents, restore, postStub } = run('report 9');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });

  it('generates report 10', async function(){
    const { agents, restore, postStub } = run('report 10');
    try { const c = new agents.ComplianceAgent(); await c.report(); expect(postStub.called).to.equal(true); } finally { restore(); }
  });
});
