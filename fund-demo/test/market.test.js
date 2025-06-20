const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('MarketAnalysisAgent', function(){
  it('handles bullish trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"bullish"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('bullish');
    } finally {
      restore();
    }
  });

  it('handles bearish trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"bearish"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('bearish');
    } finally {
      restore();
    }
  });

  it('handles neutral trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"neutral"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('neutral');
    } finally {
      restore();
    }
  });

  it('handles uppercase trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"BULLISH"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('BULLISH');
    } finally {
      restore();
    }
  });

  it('handles sideways trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"sideways"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('sideways');
    } finally {
      restore();
    }
  });

  it('handles empty string trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":""}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('neutral');
    } finally {
      restore();
    }
  });

  it('handles missing trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('neutral');
    } finally {
      restore();
    }
  });

  it('handles invalid json', async function(){
    const { agents, restore } = loadAgents({ postResp:'oops' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('neutral');
    } finally {
      restore();
    }
  });

  it('handles rally trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"rally"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('rally');
    } finally {
      restore();
    }
  });

  it('handles selloff trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"selloff"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('selloff');
    } finally {
      restore();
    }
  });

  it('handles stable trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"stable"}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('stable');
    } finally {
      restore();
    }
  });

  it('handles numeric trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":0}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('neutral');
    } finally {
      restore();
    }
  });

  it('handles null trend', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":null}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('neutral');
    } finally {
      restore();
    }
  });

  it('handles network error', async function(){
    const { agents, restore } = loadAgents({ postError:true });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('neutral');
    } finally {
      restore();
    }
  });

  it('handles extra field', async function(){
    const { agents, restore } = loadAgents({ postResp:'{"trend":"bullish","foo":1}' });
    try {
      const m = new agents.MarketAnalysisAgent();
      const res = await m.analyze();
      expect(res.trend).to.equal('bullish');
    } finally {
      restore();
    }
  });
});
