const { expect } = require('chai');
const { loadAgents } = require('./helpers');

describe('RiskManagementAgent', function(){
  function check(text, expected, error){
    const { agents, restore } = loadAgents({ postResp:text, postError:error });
    return { agents, restore, expected };
  }

  it('accepts when ok true', async function(){
    const { agents, restore } = check('{"ok":true}', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('rejects when ok false', async function(){
    const { agents, restore } = check('{"ok":false}', false);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(false); } finally { restore(); }
  });

  it('accepts when ok as string', async function(){
    const { agents, restore } = check('{"ok":"true"}', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('accepts numeric 1', async function(){
    const { agents, restore } = check('{"ok":1}', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('rejects numeric 0', async function(){
    const { agents, restore } = check('{"ok":0}', false);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(false); } finally { restore(); }
  });

  it('rejects missing field', async function(){
    const { agents, restore } = check('{}', false);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(false); } finally { restore(); }
  });

  it('rejects null field', async function(){
    const { agents, restore } = check('{"ok":null}', false);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(false); } finally { restore(); }
  });

  it('defaults to true on invalid json', async function(){
    const { agents, restore } = check('oops', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('defaults to true on network error', async function(){
    const { agents, restore } = check('', true, true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('accepts string false value', async function(){
    const { agents, restore } = check('{"ok":"false"}', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('rejects undefined ok', async function(){
    const { agents, restore } = check('{"foo":1}', false);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(false); } finally { restore(); }
  });

  it('rejects empty string', async function(){
    const { agents, restore } = check('{"ok":""}', false);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(false); } finally { restore(); }
  });

  it('accepts boolean true string', async function(){
    const { agents, restore } = check('{"ok":"true"}', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('accepts boolean false string', async function(){
    const { agents, restore } = check('{"ok":"false"}', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });

  it('ignores extra fields', async function(){
    const { agents, restore } = check('{"ok":true,"x":1}', true);
    try { const r = new agents.RiskManagementAgent(); const ok = await r.check({ action:'buy' }); expect(ok).to.equal(true); } finally { restore(); }
  });
});
