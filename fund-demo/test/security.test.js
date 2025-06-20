const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { loadAgents } = require('./helpers');

describe('SecurityAgent', function(){
  const addresses = [
    'nano_1', 'nano_2', 'nano_3', 'nano_4', 'nano_5',
    'nano_6', 'nano_7', 'nano_8', 'nano_9', 'nano_10',
    'nano_11', 'nano_12', 'nano_13', 'nano_14', 'nano_15'
  ];

  addresses.forEach((addr,i)=>{
    it(`stores wallet ${i+1}`, async function(){
      const { agents, restore } = loadAgents();
      try {
        const s = new agents.SecurityAgent();
        await s.storeWallet({ address: addr });
        const file = path.join(__dirname, '..', 'fund-wallet.txt');
        const saved = fs.readFileSync(file,'utf8');
        expect(saved).to.equal(addr);
      } finally {
        restore();
      }
    });
  });
});
