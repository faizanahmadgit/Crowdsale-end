const { assert } = require('chai');
const Web3= require('web3');
const { isUserEthereumAddressInBloom } = require('web3-utils');
const BigNumber =Web3.BigNumber;

require("chai")
.use(require('chai-as-promised'))
.use(require('chai-bignumber')())
.should();

const DappTokenTimedCrowdsale= artifacts.require('DappTokenTimedCrowdsale');
const DappToken= artifacts.require('DappToken');
contract('DappTokenTimedCrowdsale', function([owner1, wallet, investor1, investor2, investor5]) {

beforeEach(async function(){
this.token= await DappToken.new("Dapp Token", "DPT", 18)       //.deployed(); //.new(10000); can be for new instance

//Crowdsale config
this.rate = 500; //500 token per ether
this.wallet= wallet;
this.cap = Web3.utils.toWei('15', 'ether');

this.investorMinCap= Web3.utils.toWei('0.02', 'ether');
this.investorMaxCap= Web3.utils.toWei('5', 'ether');

this.crowdsale= await DappTokenTimedCrowdsale.new(
    this.rate,
    this.wallet,
    this.token.address,
    this.cap,
    1654408289,
    1654408489
);
// transfer ownership
await this.token.transferOwnership(this.crowdsale.address);

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
//         await this.crowdsale.buyTokens(investor2, {value: value, from: investor1});
//          await this.crowdsale.sendTransaction({value: value, from: investor1});
//     })
// })
// describe('Minted Crowdsale', ()=>{
//     it('should change total suppy', async function(){
//         const value1= Web3.utils.toWei('1','ether');
//         const beforeTotalSupply = await this.token.totalSupply();
//         await this.crowdsale.buyTokens(investor2,{value: value1, from: investor1});
//         const afterTotalSupply = await this.token.totalSupply();
//         assert.isTrue(beforeTotalSupply == 0  );
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
//          await this.crowdsale.buyTokens(investor2, {value: value, from: investor2}).should.be.rejected;
//          //assert.isRejected(this.crowdsale.buyTokens(investor2, {value: value, from: investor2}))
//      })
//      it('when already met the minCap and can buy below minCap', async function(){
//         const value1= Web3.utils.toWei('0.1', 'ether');
//         await this.crowdsale.buyTokens(investor2, {value: value1, from: investor2}).should.be.ok;
//         const value2= Web3.utils.toWei('0.001', 'ether');
//         await this.crowdsale.buyTokens(investor2, {value: value2, from: investor2}).should.be.ok;
        
//      })
//      it('check Maximum Cap', async function(){
//         const value1= Web3.utils.toWei('5', 'ether');
//         await this.crowdsale.buyTokens(investor2, {value: value1, from: investor2}).should.be.ok;
//         const value2= Web3.utils.toWei('0.001', 'ether');
//         await this.crowdsale.buyTokens(investor2, {value: value2, from: investor2}).should.be.rejected;
//      })
//      it('checks if changes record in contributions', async function(){
//         const contribution3= await this.crowdsale.getUserContribution(investor5);
//         console.log('before : ', contribution3.toString());

//         const value5= Web3.utils.toWei('5', 'ether');
//         const wa = await this.crowdsale.buyTokens(investor5, {value: value5, from: investor5});
//         const contribution5= await this.crowdsale.getUserContribution(investor5);
//         console.log(wa.logs[0].args[1].toString());
//         assert.equal(wa.logs[0].args[1].toString(), value5);
//         //contribution.should.be.bignumber.equal(value1);
//      })
//  })

 describe('Timed Crowdsale', function(){
     it('is open', async function(){
         const isClosed= await this.crowdsale.hasClosed();
         isClosed.should.be.false;
     })
 })

});
