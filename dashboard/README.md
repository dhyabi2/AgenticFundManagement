# Fund Dashboard

This dashboard provides a simple view of all agent activity. It starts an MQTT broker and subscribes to `agent/#` topics, forwarding updates to connected web clients via Socket.IO.

## Usage

Install dependencies and start the server:

```bash
npm install
node server.js
```

Open <http://localhost:4000> to see live messages from the agents.
