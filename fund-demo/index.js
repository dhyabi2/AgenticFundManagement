const axios = require('axios');
const fs = require('fs');
const mqtt = require('mqtt');
const letta = require('letta');

const API_URL = 'http://localhost:3000';

function askAI(prompt) {
  return letta(function* () {
    try {
      const res = yield axios.post(`${API_URL}/ai/ask`, { prompt });
      return res.data.text || '';
    } catch (err) {
      console.error('AI request failed:', err.message);
      return '';
    }
  });
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
  evaluate() {
    return letta(function* () {
      console.log('ResearchAgent: evaluating assets via AI...');
      publish('agent/research', 'evaluating assets via AI');
      const prompt = 'Rate the cryptocurrency NANO from 0 to 1 based on fundamentals. Respond with JSON {"score": <number>}';
      const text = yield askAI(prompt);
      try {
        const data = JSON.parse(text);
        return [{ symbol: 'NANO', score: Number(data.score) || 0.5 }];
      } catch (e) {
        return [{ symbol: 'NANO', score: 0.5 }];
      }
    });
  }
}

class MarketAnalysisAgent {
  analyze() {
    return letta(function* () {
      console.log('MarketAnalysisAgent: analyzing market via AI...');
      publish('agent/market', 'analyzing market via AI');
      const prompt = 'What is the current cryptocurrency market trend? Respond with JSON {"trend":"bullish"|"bearish"|"neutral"}';
      const text = yield askAI(prompt);
      publish('agent/market', `analysis result: ${text}`);
      try {
        const data = JSON.parse(text);
        return { trend: data.trend || 'neutral' };
      } catch (e) {
        return { trend: 'neutral' };
      }
    });
  }
}

class PortfolioManagementAgent {
  constructor(riskAgent) {
    this.riskAgent = riskAgent;
    this.portfolio = [];
  }

  decide(research, market) {
    return letta(function* () {
      console.log('PortfolioManagementAgent: making decisions...');
      publish('agent/portfolio', 'making portfolio decision');
      // simple demo: if top asset has score > 0.5 buy small amount
      if (research[0].score > 0.5) {
        const decision = { action: 'buy', asset: research[0].symbol, amount: 1 };
        const ok = yield this.riskAgent.check(decision);
        if (ok) {
          this.portfolio.push(decision);
          publish('agent/portfolio', `decided ${JSON.stringify(decision)}`);
          return decision;
        }
      }
      return null;
    }.bind(this));
  }
}

class RiskManagementAgent {
  check(decision) {
    return letta(function* () {
      console.log('RiskManagementAgent: checking decision via AI...');
      publish('agent/risk', `checking decision ${JSON.stringify(decision)}`);
      const prompt = `Is the following trade safe? Reply with JSON {\"ok\":true/false}: ${JSON.stringify(decision)}`;
      const text = yield askAI(prompt);
      publish('agent/risk', `AI result ${text}`);
      try {
        const data = JSON.parse(text);
        return !!data.ok;
      } catch (e) {
        return true;
      }
    });
  }
}

class TradingAgent {
  execute(decision, wallet) {
    return letta(function* () {
      console.log('TradingAgent: executing trade', decision);
      publish('agent/trading', `executing ${JSON.stringify(decision)}`);
      const prompt = `Pretend to execute trade ${JSON.stringify(decision)} from address ${wallet.address}. Reply with 'done'.`;
      yield askAI(prompt);
      publish('agent/trading', 'trade executed');
    });
  }
}

class SecurityAgent {
  storeWallet(wallet) {
    return letta(function* () {
      fs.writeFileSync(WALLET_FILE, wallet.address);
      console.log(`SecurityAgent: wallet address saved to ${WALLET_FILE}`);
      publish('agent/security', `wallet stored: ${wallet.address}`);
    });
  }
}

class ComplianceAgent {
  report() {
    return letta(function* () {
      console.log('ComplianceAgent: generating report via AI...');
      publish('agent/compliance', 'generating compliance report');
      yield askAI('Provide a short compliance summary for today.');
      publish('agent/compliance', 'report generated');
    });
  }
}

function initializeWallet() {
  return letta(function* () {
    const res = yield axios.get(`${API_URL}/generateWallet`);
    return res.data;
  });
}

function main() {
  return letta(function* () {
    const research = new ResearchAgent();
    const market = new MarketAnalysisAgent();
    const risk = new RiskManagementAgent();
    const portfolio = new PortfolioManagementAgent(risk);
    const trading = new TradingAgent();
    const security = new SecurityAgent();
    const compliance = new ComplianceAgent();

    console.log('Initializing fund wallet...');
    publish('agent/security', 'initializing wallet');
    const wallet = yield initializeWallet();
    yield security.storeWallet(wallet);

    const researchData = yield research.evaluate();
    const marketOutlook = yield market.analyze();
    const decision = yield portfolio.decide(researchData, marketOutlook);
    if (decision) {
      yield trading.execute(decision, wallet);
    }

    yield compliance.report();
    console.log('Demo complete');
    mqttClient.end();
  });
}

module.exports = {
  main,
  askAI,
  ResearchAgent,
  MarketAnalysisAgent,
  PortfolioManagementAgent,
  RiskManagementAgent,
  TradingAgent,
  SecurityAgent,
  ComplianceAgent
};

if (require.main === module) {
  main().catch(err => {
    console.error(err);
    process.exit(1);
  });
}
