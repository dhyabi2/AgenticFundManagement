const axios = require('axios');
const fs = require('fs');
const mqtt = require('mqtt');

const API_URL = 'http://localhost:3000';

async function askAI(prompt) {
  try {
    const res = await axios.post(`${API_URL}/ai/ask`, { prompt });
    return res.data.text || '';
  } catch (err) {
    console.error('AI request failed:', err.message);
    return '';
  }
}
const WALLET_FILE = 'fund-wallet.txt';
const MQTT_URL = 'mqtt://localhost:1883';
const mqttClient = mqtt.connect(MQTT_URL);

function publish(topic, message) {
  if (mqttClient.connected) {
    mqttClient.publish(topic, message.toString());
  }
}

class ResearchAgent {
  async evaluate() {
    console.log('ResearchAgent: evaluating assets via AI...');
    publish('agent/research', 'evaluating assets via AI');
    const prompt = 'Rate the cryptocurrency NANO from 0 to 1 based on fundamentals. Respond with JSON {"score": <number>}';
    const text = await askAI(prompt);
    try {
      const data = JSON.parse(text);
      return [{ symbol: 'NANO', score: Number(data.score) || 0.5 }];
    } catch (e) {
      return [{ symbol: 'NANO', score: 0.5 }];
    }
  }
}

class MarketAnalysisAgent {
  async analyze() {
    console.log('MarketAnalysisAgent: analyzing market via AI...');
    publish('agent/market', 'analyzing market via AI');
    const prompt = 'What is the current cryptocurrency market trend? Respond with JSON {"trend":"bullish"|"bearish"|"neutral"}';
    const text = await askAI(prompt);
    publish('agent/market', `analysis result: ${text}`);
    try {
      const data = JSON.parse(text);
      return { trend: data.trend || 'neutral' };
    } catch (e) {
      return { trend: 'neutral' };
    }
  }
}

class PortfolioManagementAgent {
  constructor(riskAgent) {
    this.riskAgent = riskAgent;
    this.portfolio = [];
  }

  async decide(research, market) {
    console.log('PortfolioManagementAgent: making decisions...');
    publish('agent/portfolio', 'making portfolio decision');
    // simple demo: if top asset has score > 0.5 buy small amount
    if (research[0].score > 0.5) {
      const decision = { action: 'buy', asset: research[0].symbol, amount: 1 };
      if (await this.riskAgent.check(decision)) {
        this.portfolio.push(decision);
        publish('agent/portfolio', `decided ${JSON.stringify(decision)}`);
        return decision;
      }
    }
    return null;
  }
}

class RiskManagementAgent {
  async check(decision) {
    console.log('RiskManagementAgent: checking decision via AI...');
    publish('agent/risk', `checking decision ${JSON.stringify(decision)}`);
    const prompt = `Is the following trade safe? Reply with JSON {\"ok\":true/false}: ${JSON.stringify(decision)}`;
    const text = await askAI(prompt);
    publish('agent/risk', `AI result ${text}`);
    try {
      const data = JSON.parse(text);
      return !!data.ok;
    } catch (e) {
      return true;
    }
  }
}

class TradingAgent {
  async execute(decision, wallet) {
    console.log('TradingAgent: executing trade', decision);
    publish('agent/trading', `executing ${JSON.stringify(decision)}`);
    const prompt = `Pretend to execute trade ${JSON.stringify(decision)} from address ${wallet.address}. Reply with 'done'.`;
    await askAI(prompt);
    publish('agent/trading', 'trade executed');
  }
}

class SecurityAgent {
  async storeWallet(wallet) {
    fs.writeFileSync(WALLET_FILE, wallet.address);
    console.log(`SecurityAgent: wallet address saved to ${WALLET_FILE}`);
    publish('agent/security', `wallet stored: ${wallet.address}`);
  }
}

class ComplianceAgent {
  async report() {
    console.log('ComplianceAgent: generating report via AI...');
    publish('agent/compliance', 'generating compliance report');
    await askAI('Provide a short compliance summary for today.');
    publish('agent/compliance', 'report generated');
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
  publish('agent/security', 'initializing wallet');
  const wallet = await initializeWallet();
  await security.storeWallet(wallet);

  const researchData = await research.evaluate();
  const marketOutlook = await market.analyze();
  const decision = await portfolio.decide(researchData, marketOutlook);
  if (decision) {
    await trading.execute(decision, wallet);
  }

  await compliance.report();
  console.log('Demo complete');
  mqttClient.end();
}

module.exports = { main };

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
