const axios = require('axios');
const fs = require('fs');

const API_URL = 'http://localhost:3000';
const WALLET_FILE = 'fund-wallet.txt';

class ResearchAgent {
  async evaluate() {
    console.log('ResearchAgent: evaluating assets...');
    // demo placeholder
    return [{ symbol: 'NANO', score: 0.9 }];
  }
}

class MarketAnalysisAgent {
  async analyze() {
    console.log('MarketAnalysisAgent: analyzing market...');
    // demo placeholder
    return { trend: 'neutral' };
  }
}

class PortfolioManagementAgent {
  constructor(riskAgent) {
    this.riskAgent = riskAgent;
    this.portfolio = [];
  }

  decide(research, market) {
    console.log('PortfolioManagementAgent: making decisions...');
    // simple demo: if top asset has score > 0.5 buy small amount
    if (research[0].score > 0.5) {
      const decision = { action: 'buy', asset: research[0].symbol, amount: 1 };
      if (this.riskAgent.check(decision)) {
        this.portfolio.push(decision);
        return decision;
      }
    }
    return null;
  }
}

class RiskManagementAgent {
  check(decision) {
    console.log('RiskManagementAgent: approving decision');
    return true; // always approve in demo
  }
}

class TradingAgent {
  async execute(decision, wallet) {
    console.log('TradingAgent: executing trade', decision);
    // demo: just log
  }
}

class SecurityAgent {
  async storeWallet(wallet) {
    fs.writeFileSync(WALLET_FILE, wallet.address);
    console.log(`SecurityAgent: wallet address saved to ${WALLET_FILE}`);
  }
}

class ComplianceAgent {
  report() {
    console.log('ComplianceAgent: generating report...');
  }
}

async function initializeWallet() {
  const res = await axios.get(`${API_URL}/generateWallet`);
  return res.data;
}

async function main() {
  const research = new ResearchAgent();
  const market = new MarketAnalysisAgent();
  const risk = new RiskManagementAgent();
  const portfolio = new PortfolioManagementAgent(risk);
  const trading = new TradingAgent();
  const security = new SecurityAgent();
  const compliance = new ComplianceAgent();

  console.log('Initializing fund wallet...');
  const wallet = await initializeWallet();
  await security.storeWallet(wallet);

  const researchData = await research.evaluate();
  const marketOutlook = await market.analyze();
  const decision = portfolio.decide(researchData, marketOutlook);
  if (decision) {
    await trading.execute(decision, wallet);
  }

  compliance.report();
  console.log('Demo complete');
}

module.exports = { main };

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
