const DappTokenICOPreSale = artifacts.require("DappTokenICOPreSale");
const Web3= require('web3');
module.exports = function (deployer) {
  deployer.deploy(DappTokenICOPreSale, 20, "0xbA251f3C1643295BC5b909fB664044B55A2375Cc", "0x646a311dD9B9A5bBA4439cDfC23572A41Ed7Bc67", Web3.utils.toWei('15', 'ether'),Web3.utils.toWei('10', 'ether'), "0xe4E51db0FA8586Ba37ab32DC044640e2cd155E10","0x1e01698d5d48362E9fc29E554d5694B50CADc368", "0x857D7De803e6C5B3CDE0b5Ba02fbd4978685f2ad", 	1654860753);
};
