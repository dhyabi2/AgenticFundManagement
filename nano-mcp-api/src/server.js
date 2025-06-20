const express = require('express');
const bodyParser = require('body-parser');
const { NanoMCPServer } = require('nano-mcp/src/server');
const { execFile } = require('child_process');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyBNZQBYpPqen_tDAIuZ7aRdHaj4fgR_19c';

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

// simple AI endpoint using Google Gemini
app.post('/ai/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const payload = JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] });
    execFile('curl', ['-s', '-X', 'POST', url, '-H', 'Content-Type: application/json', '-d', payload], (err, stdout) => {
      if (err) return res.status(500).json({ error: err.message });
      try {
        const data = JSON.parse(stdout);
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        res.json({ text });
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Nano MCP REST API running on port ${PORT}`);
});

module.exports = server;
