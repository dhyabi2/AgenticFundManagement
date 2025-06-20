# Agentic Fund Management

This repository contains four main components:

- **NANO_MCP_SERVER** – original Nano MCP server codebase
- **nano-mcp-api** – REST API wrapper used for this demo
- **fund-demo** – multi-agent demo using the Letta framework for asynchronous control. It calls the REST API for AI help, generates a wallet, writes the address to `fund-wallet.txt`, and publishes progress over MQTT
- **dashboard** – web dashboard and MQTT broker showing each agent's activity

## Setup

Install dependencies and run tests in each project:

```bash
cd NANO_MCP_SERVER && npm install --omit=dev && cd ..
cd nano-mcp-api && npm install && npm test && cd ..
cd fund-demo && npm install && npm test && cd ..
cd dashboard && npm install && cd ..
```

The REST API exposes an `/ai/ask` endpoint that forwards prompts to Google Gemini. Set `GEMINI_API_KEY` to override the default demo key.

## Running the demo

1. Start the REST API:
   ```bash
   node nano-mcp-api/src/server.js
   ```
2. Start the dashboard which also runs the MQTT broker:
   ```bash
   node dashboard/server.js
   ```
3. In another terminal, run the demo:
   ```bash
   cd fund-demo && npm start
   ```

Visit `http://localhost:4000` to view agent progress. The generated wallet address
is stored in `fund-demo/fund-wallet.txt`.

See `docs/ACTION_PLAN.md` for a detailed overview of each agent role and how the Letta framework is used.
