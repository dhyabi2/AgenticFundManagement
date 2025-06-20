const express = require('express');
const bodyParser = require('body-parser');
const { NanoMCPServer } = require('nano-mcp/src/server');

// create underlying Nano MCP server instance
const nanoServer = new NanoMCPServer();

const app = express();
app.use(bodyParser.json());

// helper to call json-rpc method
async function call(method, params = {}) {
  const request = { jsonrpc: '2.0', method, params, id: Date.now() };
  const resp = await nanoServer.handleRequest(request);
  if (resp.error) {
    throw new Error(resp.error.message);
  }
  return resp.result;
}

app.get('/initialize', async (req, res) => {
  try {
    const result = await call('initialize');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/generateWallet', async (req, res) => {
  try {
    const result = await call('generateWallet');
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/balance/:address', async (req, res) => {
  try {
    const result = await call('getBalance', { address: req.params.address });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/account/:address', async (req, res) => {
  try {
    const result = await call('getAccountInfo', { address: req.params.address });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/pending/:address', async (req, res) => {
  try {
    const result = await call('getPendingBlocks', { address: req.params.address });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/initializeAccount', async (req, res) => {
  try {
    const { address, privateKey } = req.body;
    const result = await call('initializeAccount', { address, privateKey });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/sendTransaction', async (req, res) => {
  try {
    const { fromAddress, toAddress, amountRaw, privateKey } = req.body;
    const result = await call('sendTransaction', { fromAddress, toAddress, amountRaw, privateKey });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/receiveAllPending', async (req, res) => {
  try {
    const { address, privateKey } = req.body;
    const result = await call('receiveAllPending', { address, privateKey });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Nano MCP REST API running on port ${PORT}`);
});

module.exports = server;
