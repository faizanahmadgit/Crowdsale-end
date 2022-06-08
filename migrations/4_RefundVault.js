const RefundVault = artifacts.require("RefundVault");

module.exports = function (deployer) {
  deployer.deploy(RefundVault, "0x1e01698d5d48362E9fc29E554d5694B50CADc368");
};
