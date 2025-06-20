# Agentic Fund Management

This repository contains three main components:

- **NANO_MCP_SERVER** – original Nano MCP server codebase
- **nano-mcp-api** – REST API wrapper used for this demo
- **fund-demo** – simple multi-agent demonstration that generates a wallet and writes the address to `fund-wallet.txt`

## Setup

Install dependencies and run tests in each project:

```bash
cd NANO_MCP_SERVER && npm install --omit=dev && cd ..
cd nano-mcp-api && npm install && npm test && cd ..
cd fund-demo && npm install && npm test && cd ..
```

## Running the demo

1. Start the REST API:
   ```bash
   node nano-mcp-api/src/server.js
   ```
2. In another terminal, run the demo:
   ```bash
   cd fund-demo && npm start
   ```

The generated wallet address is stored in `fund-demo/fund-wallet.txt`.
