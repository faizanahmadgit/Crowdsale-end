// const { default: BigNumber } = require("bignumber.js");

// //const BigNumber = web3.BigNumber;
//                        require("chai")
//                           //.use(require('chai-bignumber')(BigNumber))
//                           //.should();

// const DappToken= artifacts.require('DappToken');

// contract('DappToken', accounts => {
//     const _decimals= 18;
//     beforeEach(async function(){
//         this.token= await DappToken.deployed(); //.new(10000); can be for new instance
//     })
//     describe('token attributes', ()=>{
//         it('has correct name', async function() {
//             // DappToken.deployed().then(function(instance){
//             //     deployedToken= instance;
//             //     deployedToken.name().then(function(n){
//             //         assert.equal(n, 'Dapp Token');
//             //     })
//             // })
//                 const name = await this.token.name();
// //                name.should.equal("Dapp Token");
//                 assert.equal(name, 'Dapp Token');
//         })
//         it('has correct symbol', async function() {
//                 const symb = await this.token.symbol();
//               //  symb.should.equal("DPT");
//               assert.equal(symb, 'DPT');
//         })
//         it('has correct decimal', async function() {
//             const decimal = await this.token.decimals();
//             //decimal.should.equal(18);
//                 assert.equal(decimal, 18);
//     })
//     });

// });