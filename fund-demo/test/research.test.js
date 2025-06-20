const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('ResearchAgent', function(){
  const cases = [
    {desc:'valid high score', text:'{"score":0.9}', expected:0.9},
    {desc:'valid low score', text:'{"score":0.4}', expected:0.4},
    {desc:'score as string', text:'{"score":"0.7"}', expected:0.7},
    {desc:'score zero', text:'{"score":0}', expected:0.5},
    {desc:'score one', text:'{"score":1}', expected:1},
    {desc:'score >1', text:'{"score":2}', expected:2},
    {desc:'negative score', text:'{"score":-1}', expected:-1},
    {desc:'decimal score', text:'{"score":0.33}', expected:0.33},
    {desc:'invalid json', text:'oops', expected:0.5},
    {desc:'missing score', text:'{}', expected:0.5},
    {desc:'null score', text:'{"score":null}', expected:0.5},
    {desc:'empty response', text:'', expected:0.5},
    {desc:'network error', error:true, expected:0.5},
    {desc:'large decimal', text:'{"score":0.99}', expected:0.99},
    {desc:'half', text:'{"score":0.5}', expected:0.5}
  ];

  cases.forEach(({desc, text, expected, error})=>{
    it(`should handle ${desc}`, async function(){
      const { agents, restore } = loadAgents({ postResp: text, postError: error });
      try {
        const r = new agents.ResearchAgent();
        const res = await r.evaluate();
        expect(res[0].score).to.equal(expected);
      } finally {
        restore();
      }
    });
  });
});
