pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";

contract DappTokenCappedCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale {

uint256 public investorMinCap= 0.025 ether;
uint256 public investorMaxCap= 5 ether;
mapping(address=> uint256) public contributions;
event ContributionDone(address bene, uint256 contribe);

  constructor(
    uint256 _rate,
    address _wallet,
    ERC20 _token,
    uint256 _cap
  )
    Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale(_cap)
    public
  {

  }

  function getUserContribution(address _beneficiaryy) public view returns (uint256){
     return contributions[_beneficiaryy];
  }


  function _preValidatePurchase(
    address _beneficiary,
    uint256 _weiAmount
  )
    internal
  {
    super._preValidatePurchase(_beneficiary, _weiAmount);
    uint256 oldContributions= contributions[_beneficiary];
    uint256 newContributions = oldContributions + (_weiAmount);
    require(newContributions >= investorMinCap && newContributions <= investorMaxCap,"Not Valid Amount of Ether");
    contributions[_beneficiary]= newContributions;
    emit ContributionDone(_beneficiary, contributions[_beneficiary]);
  }
}