# Agent Roles and Letta Implementation Plan

This project uses the **Letta** framework to orchestrate asynchronous tasks for each agent in the fund demo.  Letta allows generator functions to yield promises and provides robust error handling.

## Agents

1. **ResearchAgent** – Gathers fundamentals of individual cryptocurrencies using AI.
2. **MarketAnalysisAgent** – Evaluates overall market trends using AI.
3. **RiskManagementAgent** – Checks trade safety and risk limits.
4. **PortfolioManagementAgent** – Decides portfolio actions using input from Research and Market agents.
5. **TradingAgent** – Executes trades (simulated) and publishes progress.
6. **SecurityAgent** – Stores the generated wallet address in a file.
7. **ComplianceAgent** – Produces compliance summaries via AI.

## Implementation with Letta

- Each agent method is implemented as a generator function wrapped with `letta()`. This returns a promise and allows yielding asynchronous calls like the AI endpoint.
- The `main` routine is itself a Letta generator coordinating the full workflow in sequence: initialize wallet, evaluate assets, make decisions, trade, and produce compliance reports.
- The AskAI helper uses Letta to wrap the HTTP request to the `/ai/ask` endpoint.

## Testing Strategy

- Unit tests start the REST API and dashboard, then execute the demo to verify the wallet file is created.
- Additional tests invoke each agent individually to ensure their methods resolve and produce expected data structures.

