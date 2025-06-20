# Agentic Fund Management Demo

This demo shows a simplified multi-agent framework for managing a cryptocurrency fund. Each agent uses the `/ai/ask` endpoint of the REST API to call Google Gemini for research, market analysis, risk checks and other tasks. The demo also generates a wallet and saves the address for later funding.

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

Set the `GEMINI_API_KEY` environment variable before starting the REST API if you want to use a different Google Gemini key.

## Tests

Run automated tests with:

```bash
npm test
```
