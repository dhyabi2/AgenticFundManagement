const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('RiskManagementAgent', function(){
  const cases = [
    {desc:'ok true', text:'{"ok":true}', expected:true},
    {desc:'ok false', text:'{"ok":false}', expected:false},
    {desc:'ok as string', text:'{"ok":"true"}', expected:true},
    {desc:'ok numeric 1', text:'{"ok":1}', expected:true},
    {desc:'ok numeric 0', text:'{"ok":0}', expected:false},
    {desc:'missing field', text:'{}', expected:false},
    {desc:'null field', text:'{"ok":null}', expected:false},
    {desc:'invalid json', text:'oops', expected:true},
    {desc:'network error', error:true, expected:true},
    {desc:'ok false string', text:'{"ok":"false"}', expected:true},
    {desc:'ok undefined', text:'{"foo":1}', expected:false},
    {desc:'ok empty string', text:'{"ok":""}', expected:false},
    {desc:'ok boolean true string', text:'{"ok":"true"}', expected:true},
    {desc:'ok boolean false string', text:'{"ok":"false"}', expected:true},
    {desc:'extra fields', text:'{"ok":true,"x":1}', expected:true}
  ];

  cases.forEach(({desc,text,expected,error})=>{
    it(`should handle ${desc}`, async function(){
      const { agents, restore } = loadAgents({ postResp:text, postError:error });
      try {
        const r = new agents.RiskManagementAgent();
        const ok = await r.check({ action:'buy' });
        expect(ok).to.equal(expected);
      } finally {
        restore();
      }
    });
  });
});
