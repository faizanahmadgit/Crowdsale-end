const { assert, expect } = require('chai');
//const Web3= require('web3');
const Web3 = require("web3")

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/664a28db2c0c47daa11d65b3d5de4ebf"));

// web3.eth.getBalance("0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5", function(err, result) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(web3.utils.fromWei(result, "ether") + " ETH")
//   }
// })
//const { isUserEthereumAddressInBloom } = require('web3-utils');
const BigNumber =Web3.BigNumber;
const sleep = ms => new Promise(r => setTimeout(r, ms));

require("chai")
.use(require('chai-as-promised'))
.use(require('chai-bignumber')(BigNumber))
.should();

const DappTokenICOPreSale= artifacts.require('DappTokenICOPreSale');
const DappToken= artifacts.require('DappToken');
const RefundVault = artifacts.require('./RefundVault');

contract('DappTokenICOPreSale', function([owner1, wallet, investor1, investor2, investor5]) {

beforeEach(async function(){
this.token= await DappToken.new("Dapp Token", "DPT", 18)       //.deployed(); //.new(10000); can be for new instance

//Crowdsale config
this.rate = 500; //500 token per ether
this.wallet= wallet;
this.cap = Web3.utils.toWei('15', 'ether');
this.goal = Web3.utils.toWei('10', 'ether')

this.investorMinCap= Web3.utils.toWei('0.02', 'ether');
this.investorMaxCap= Web3.utils.toWei('5', 'ether');

//ICO stages
this.preIcoStage = 0;
this.preIcoRate= 500;
this.icoStage = 1;
this.icoRate = 250;


this.crowdsale= await DappTokenICOPreSale.new(
    this.rate,
    this.wallet,
    this.token.address,
    this.cap,
    this.goal
);
// transfer ownership
await this.token.transferOwnership(this.crowdsale.address);
//Track refund vault
this.vaultAddress = await this.crowdsale.vault();
this.vault = await RefundVault.at(this.vaultAddress);
console.log('vault =', this.vaultAddress);
console.log("address",wallet)

await this.crowdsale.addManyToWhitelist([investor1, investor2]);

});
// describe ('Crowdsale checks', function() {
//     it('tracks the token',async function(){
//         const token= await this.crowdsale.token();
//         token.should.equal(this.token.address);
//     })
//     it('tracks the rate',async function(){
//         const rate= await this.crowdsale.rate();
//       //rate.should.be.bignumber.equal(this.rate);
//       assert.equal(rate, this.rate);
//     })
//     it('tracks the wallet',async function(){
//         const wallet= await this.crowdsale.wallet();
//         wallet.should.equal(this.wallet);
// //         assert.equal(wallet, this.wallet);
//     })
    
// })
// describe('Accepting Payments', ()=>{
//     it('should accept payments',async function(){
//         const value= Web3.utils.toWei('1', 'ether');
//         await sleep(2000);                        // Sale starts after 1 second
//         await this.crowdsale.buyTokens(investor2, {value: value, from: investor2});
//         // await this.crowdsale.sendTransaction({value: value, from: investor1});
//     })
// })
// describe('Minted Crowdsale', ()=>{
//     it('should change total suppy', async function(){
//         const value1= Web3.utils.toWei('0.1','ether');
//         const beforeTotalSupply = await this.token.totalSupply();
//         await sleep(2000);
//         await this.crowdsale.buyTokens(investor1,{value: value1, from: investor1});
//         const afterTotalSupply = await this.token.totalSupply();
//        // assert.isTrue(beforeTotalSupply == 0  );
//     })
// })

//  describe('Capped Crowdsale', async function(){
//      it('has the correct hard cap', async function(){
//          const cap= await this.crowdsale.cap();
//          //cap.should.be.BigNumber.equal(this.cap);
// //         cap.should.equal(this.cap);
//          assert.equal(cap, this.cap);
//      })
//      it('rejects the transaction with less than Min Cap', async function(){
//          const value= Web3.utils.toWei('0.01', 'ether');
//          await sleep(2000);
//          await this.crowdsale.buyTokens(investor2, {value: value, from: investor2}).should.be.rejected;
//          //assert.isRejected(this.crowdsale.buyTokens(investor2, {value: value, from: investor2}))
//      })
//      it('when already met the minCap and can buy below minCap', async function(){
//         const value1= Web3.utils.toWei('0.1', 'ether');
//         await sleep(2000);
//         await this.crowdsale.buyTokens(investor2, {value: value1, from: investor2}).should.be.ok;
//         const value2= Web3.utils.toWei('0.001', 'ether');
//         await sleep(2000);
//         await this.crowdsale.buyTokens(investor2, {value: value2, from: investor2}).should.be.ok;
        
//      })
//      it('check Maximum Cap', async function(){
//         const value1= Web3.utils.toWei('5', 'ether');
//         await sleep(2000);
//         await this.crowdsale.buyTokens(investor2, {value: value1, from: investor2}).should.be.ok;
//         const value2= Web3.utils.toWei('0.001', 'ether');
//         //await sleep(2000)
//         await this.crowdsale.buyTokens(investor2, {value: value2, from: investor2}).should.be.rejected;
//      })
//      it('checks if changes record in contributions', async function(){
//         const contribution3= await this.crowdsale.getUserContribution(investor5);
//         console.log('before : ', contribution3.toString());

//         const value5= Web3.utils.toWei('0.1', 'ether');
//         await sleep(2000);
//         const wa = await this.crowdsale.buyTokens(investor2, {value: value5, from: investor2});
//         const contribution5= await this.crowdsale.getUserContribution(investor2);
//         console.log(wa.logs[0].args[1].toString());
//         assert.equal(wa.logs[0].args[1].toString(), value5);
//         //contribution.should.be.bignumber.equal(value1);
//      })
//  })

//  describe('Timed Crowdsale', function(){
//      it('is open', async function(){
//          const isClosed= await this.crowdsale.hasClosed();
//          isClosed.should.be.false;
//      })
//  })
//  describe('Whitelisted Crowdsale', ()=>{
//     it('rejects from non-whitelisted investors', async function(){
//         const nonWhitelisted = investor2;
//         const value1= Web3.utils.toWei('0.05','ether');
//         await sleep(2000);
//         await this.crowdsale.buyTokens(nonWhitelisted,{value: value1, from: nonWhitelisted}).should.be.ok
//     })
// })
// describe('refundable crowdsale', ()=>{
//     beforeEach(async function(){
//         const value7= Web3.utils.toWei('0.1','ether');
//         await sleep(2000);
//       const tx1= await this.crowdsale.buyTokens(investor2,{value: value7, from: investor1}).should.be.ok
//        // console.log("tx1= ", tx1);
//     });
//     describe('during crowdsale', ()=>{
//         it('prevents to claim funds during crowdsale', async function(){
//           const tx=  await this.vault.refund(investor2, {from: investor2}).should.be.rejected;
//    // console.log( tx);   
//     })

//     })
// })
describe('Crowdsale Stages', function(){
    it('starts with preICO stage', async function(){
        const stage = await this.crowdsale.stage();
       // stage.should.equal(this.preIcoStage);
       console.log("stage : ",stage.toString());
        assert.equal(stage, this.preIcoStage);
    })
    it('check changing of stage and rate', async function(){
      await this.crowdsale.setCrowdsaleStage(this.icoStage, {from:owner1});
        const newStage= await this.crowdsale.stage();
        const newRate = await this.crowdsale.rate();
 
      
         assert.equal(newRate, this.icoRate);
        assert.equal(newStage,this.icoStage);
    })
    it('prevents non-owner to update stage', async function(){
        await this.crowdsale.setCrowdsaleStage(this.preIcoStage, {from: investor1}).should.be.rejected;
        
    })
    it('when in Pre-ICO, funds goes to wallet', async function(){
        const value8= Web3.utils.toWei('0.03','ether');
        await sleep(2000);
         await this.crowdsale.buyTokens(investor2,{value: value8, from: investor2});
         const balanceWallet =  await web3.eth.getBalance(this.wallet);
         //expect(balanceWallet.toString()).to.be.above('100');
console.log("balance : ",balanceWallet);
    })
    it('When in ICO, funds goes to vault', async function(){
        await this.crowdsale.setCrowdsaleStage(this.icoStage, {from:owner1});
      
        const value9= Web3.utils.toWei('1','ether');
        await sleep(2000);
         await this.crowdsale.buyTokens(investor2,{value: value9, from: investor2});
         const balanceVault =  await web3.eth.getBalance(this.vaultAddress);
        // expect(balanceVault.toNumber()).to.be.above(0);
 console.log("balance : ",balanceVault);

    })
})

});
