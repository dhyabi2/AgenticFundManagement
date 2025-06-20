const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('MarketAnalysisAgent', function(){
  const cases = [
    {desc:'bullish', text:'{"trend":"bullish"}', expected:'bullish'},
    {desc:'bearish', text:'{"trend":"bearish"}', expected:'bearish'},
    {desc:'neutral', text:'{"trend":"neutral"}', expected:'neutral'},
    {desc:'uppercase', text:'{"trend":"BULLISH"}', expected:'BULLISH'},
    {desc:'sideways', text:'{"trend":"sideways"}', expected:'sideways'},
    {desc:'empty string', text:'{"trend":""}', expected:'neutral'},
    {desc:'missing trend', text:'{}', expected:'neutral'},
    {desc:'invalid json', text:'oops', expected:'neutral'},
    {desc:'trend rally', text:'{"trend":"rally"}', expected:'rally'},
    {desc:'trend selloff', text:'{"trend":"selloff"}', expected:'selloff'},
    {desc:'trend stable', text:'{"trend":"stable"}', expected:'stable'},
    {desc:'trend zero', text:'{"trend":0}', expected:'neutral'},
    {desc:'trend null', text:'{"trend":null}', expected:'neutral'},
    {desc:'network error', error:true, expected:'neutral'},
    {desc:'extra field', text:'{"trend":"bullish","foo":1}', expected:'bullish'}
  ];

  cases.forEach(({desc,text,expected,error})=>{
    it(`should handle ${desc}`, async function(){
      const { agents, restore } = loadAgents({ postResp:text, postError:error });
      try {
        const m = new agents.MarketAnalysisAgent();
        const res = await m.analyze();
        expect(res.trend).to.equal(expected);
      } finally {
        restore();
      }
    });
  });
});
