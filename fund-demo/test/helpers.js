const sinon = require('sinon');
const axios = require('axios');
const mqtt = require('mqtt');

function loadAgents({ postResp, getResp, postError, getError } = {}) {
  const sandbox = sinon.createSandbox();
  const mqttClient = { connected: true, publish: sandbox.spy(), end: sandbox.spy() };
  sandbox.stub(mqtt, 'connect').returns(mqttClient);

  const postStub = sandbox.stub(axios, 'post');
  if (postError) postStub.rejects(new Error('post error')); else postStub.resolves({ data: { text: postResp || '' } });
  const getStub = sandbox.stub(axios, 'get');
  if (getError) getStub.rejects(new Error('get error')); else getStub.resolves({ data: getResp || {} });

  delete require.cache[require.resolve('../index.js')];
  const agents = require('../index.js');

  function restore() {
    sandbox.restore();
    mqttClient.end();
  }
  return { agents, restore, postStub, getStub, mqttClient };
}

module.exports = { loadAgents };
