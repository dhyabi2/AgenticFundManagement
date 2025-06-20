# Agentic Fund Management Demo

This demo shows a simplified multi-agent framework for managing a cryptocurrency fund. It uses the Nano MCP REST API to generate a wallet and demonstrates how specialized agents could collaborate.

## Running the Demo

First start the REST API:

```bash
node ../nano-mcp-api/src/server.js &
```

Then run the demo script:

```bash
npm start
```

The fund wallet address is written to `fund-wallet.txt` for testing so you can fund it later.

## Tests

Run automated tests with:

```bash
npm test
```
