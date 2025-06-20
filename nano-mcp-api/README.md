# Nano MCP REST API

This project wraps the [NANO MCP Server](https://github.com/dhyabi2/NANO_MCP_SERVER) and exposes a simple REST interface.

## Installation

```
npm install
```

## Usage

Run the server:

```
node src/server.js
```

The API listens on `http://localhost:3000` by default.

### Endpoints

- `GET /initialize` – server capabilities
- `GET /generateWallet` – generate a new wallet
- `GET /balance/:address` – get balance
- `GET /account/:address` – get account info
- `GET /pending/:address` – get pending blocks
- `POST /initializeAccount` – body: `{ address, privateKey }`
- `POST /sendTransaction` – body: `{ fromAddress, toAddress, amountRaw, privateKey }`
- `POST /receiveAllPending` – body: `{ address, privateKey }`
- `POST /ai/ask` – body: `{ prompt }` – returns a Gemini AI response

## Testing

```
npm test
```

### AI configuration

Set `GEMINI_API_KEY` environment variable to override the default sample key used
for the `/ai/ask` endpoint.
