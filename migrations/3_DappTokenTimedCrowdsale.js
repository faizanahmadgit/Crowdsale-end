const DappTokenTimedCrowdsale = artifacts.require("DappTokenTimedCrowdsale");
const Web3= require('web3');
module.exports = function (deployer) {
  deployer.deploy(DappTokenTimedCrowdsale, 20, "0xbA251f3C1643295BC5b909fB664044B55A2375Cc", "0xdbaBB6d9d86730E4b9a24c02d04e326DBE6Be4BB", Web3.utils.toWei('15', 'ether'),1654408289,1654408489);
};
