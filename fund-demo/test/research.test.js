const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('ResearchAgent', function(){
  it('handles valid high score', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":0.9}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.9);
    } finally {
      restore();
    }
  });

  it('handles valid low score', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":0.4}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.4);
    } finally {
      restore();
    }
  });

  it('handles score as string', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":"0.7"}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.7);
    } finally {
      restore();
    }
  });

  it('handles score zero', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":0}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.5);
    } finally {
      restore();
    }
  });

  it('handles score one', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":1}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(1);
    } finally {
      restore();
    }
  });

  it('handles score greater than one', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":2}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(2);
    } finally {
      restore();
    }
  });

  it('handles negative score', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":-1}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(-1);
    } finally {
      restore();
    }
  });

  it('handles decimal score', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":0.33}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.33);
    } finally {
      restore();
    }
  });

  it('handles invalid JSON', async function(){
    const { agents, restore } = loadAgents({ postResp:'oops' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.5);
    } finally {
      restore();
    }
  });

  it('handles missing score', async function(){
    const { agents, restore } = loadAgents({ postResp:'{}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.5);
    } finally {
      restore();
    }
  });

  it('handles null score', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":null}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.5);
    } finally {
      restore();
    }
  });

  it('handles empty response', async function(){
    const { agents, restore } = loadAgents({ postResp:'' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.5);
    } finally {
      restore();
    }
  });

  it('handles network error', async function(){
    const { agents, restore } = loadAgents({ postError:true });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.5);
    } finally {
      restore();
    }
  });

  it('handles large decimal', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":0.99}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.99);
    } finally {
      restore();
    }
  });

  it('handles half score', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"score":0.5}' });
    try {
      const r = new agents.ResearchAgent();
      const res = await r.evaluate();
      expect(res[0].score).to.equal(0.5);
    } finally {
      restore();
    }
  });
});
