pragma solidity 0.4.24;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
contract DappTokenWhitelistedCrowdsale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, WhitelistedCrowdsale, RefundableCrowdsale {

uint256 public investorMinCap= 0.025 ether;
uint256 public investorMaxCap= 5 ether;
mapping(address=> uint256) public contributions;
event ContributionDone(address bene, uint256 contribe);

uint256 public _openingTime= block.timestamp + 1 seconds ; //After 1Min of Deployment
uint256 public _closingTime = _openingTime + 1 hours ;  // Till 1 hour after deployment

  constructor(
    uint256 _rate,
    address _wallet,
    ERC20 _token,
    uint256 _cap,
    uint256 _goal
  )
    Crowdsale(_rate, _wallet, _token)
    CappedCrowdsale(_cap)
    TimedCrowdsale(_openingTime, _closingTime)
    RefundableCrowdsale(_goal)
    public
  {
require( _goal <= _cap);
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
    TimedCrowdsale._preValidatePurchase(_beneficiary, _weiAmount);
    uint256 oldContributions= contributions[_beneficiary];
    uint256 newContributions = oldContributions + (_weiAmount);
    require(newContributions >= investorMinCap && newContributions <= investorMaxCap,"Not Valid Amount of Ether");
    contributions[_beneficiary]= newContributions;
    emit ContributionDone(_beneficiary, contributions[_beneficiary]);
  }
}