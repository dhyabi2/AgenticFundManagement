const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const { loadAgents } = require('./helpers');

describe('SecurityAgent', function(){
  function store(addr){
    const { agents, restore } = loadAgents();
    return { agents, restore, addr };
  }

  it('stores wallet 1', async function(){
    const { agents, restore, addr } = store('nano_1');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 2', async function(){
    const { agents, restore, addr } = store('nano_2');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 3', async function(){
    const { agents, restore, addr } = store('nano_3');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 4', async function(){
    const { agents, restore, addr } = store('nano_4');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 5', async function(){
    const { agents, restore, addr } = store('nano_5');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 6', async function(){
    const { agents, restore, addr } = store('nano_6');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 7', async function(){
    const { agents, restore, addr } = store('nano_7');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 8', async function(){
    const { agents, restore, addr } = store('nano_8');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 9', async function(){
    const { agents, restore, addr } = store('nano_9');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });

  it('stores wallet 10', async function(){
    const { agents, restore, addr } = store('nano_10');
    try {
      const s = new agents.SecurityAgent();
      await s.storeWallet({ address: addr });
      const file = path.join(__dirname, '..', 'fund-wallet.txt');
      const saved = fs.readFileSync(file,'utf8');
      expect(saved).to.equal(addr);
    } finally { restore(); }
  });
});
