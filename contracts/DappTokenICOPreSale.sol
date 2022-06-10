// pragma solidity 0.4.24;

// import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
// import "openzeppelin-solidity/contracts/token/ERC20/PausableToken.sol";
// import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
// import "openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";
// import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
// import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
// import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
// import "openzeppelin-solidity/contracts/crowdsale/validation/WhitelistedCrowdsale.sol";
// import "openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
// contract DappTokenICOPreSale is Crowdsale, MintedCrowdsale, CappedCrowdsale, TimedCrowdsale, WhitelistedCrowdsale, RefundableCrowdsale {

// uint256 public investorMinCap= 0.025 ether;
// uint256 public investorMaxCap= 5 ether;
// mapping(address=> uint256) public contributions;
// event ContributionDone(address bene, uint256 contribe);

// // Define Pre-ICO 
// enum CrowdsaleStage {PreICO, ICO}
// CrowdsaleStage public stage= CrowdsaleStage.PreICO;

// //Token Distribution
// uint256 public tokenSalePercentage= 70;
// uint256 public foundersPercentage= 10;
// uint256 public foundationPercentage= 10;
// uint256 public partnersPercentage= 10;
 
// address public foundersFund;
// address public foundationFund;
// address public partnersFund;
// uint256 releaseTime;


// uint256 public _openingTime= block.timestamp + 1 seconds ; //After 1Min of Deployment
// uint256 public _closingTime = _openingTime + 1 hours ;  // Till 1 hour after deployment

//   constructor(
//     uint256 _rate,
//     address _wallet,
//     ERC20 _token,
//     uint256 _cap,
//     uint256 _goal,
//     address _foundersFund,
//     address _foundationFund,
//     address _partnersFund,
//     uint256 _releaseTime
//   )
//     Crowdsale(_rate, _wallet, _token)
//     CappedCrowdsale(_cap)
//     TimedCrowdsale(_openingTime, _closingTime)
//     RefundableCrowdsale(_goal)
//     public
//   {
// require( _goal <= _cap);
// foundersFund    = _foundersFund;
// foundationFund  = _foundationFund;
// partnersFund    = _partnersFund;
// releaseTime     = _releaseTime;

//   }

//   function getUserContribution(address _beneficiaryy) public view returns (uint256){
//      return contributions[_beneficiaryy];
//   }

//   function setCrowdsaleStage(uint _stage) public onlyOwner {
//     if(_stage == uint(CrowdsaleStage.PreICO)){
//       stage= CrowdsaleStage.PreICO;
//     }else if(_stage == uint(CrowdsaleStage.ICO)){
//       stage = CrowdsaleStage.ICO; 
//     }
    
//     if(uint(stage) == uint(CrowdsaleStage.PreICO)){
//       rate = 500;
//     } else if( uint(stage) == uint(CrowdsaleStage.ICO)){
//       rate = 250;
//     }
//   }
//   // forwards funds to wallet in Pre-ICO and to vault in ICO
//   function _forwardFunds() internal {
//     if(uint(stage) == uint(CrowdsaleStage.PreICO)){
//       wallet.transfer(msg.value);
//     } else if( uint(stage) == uint(CrowdsaleStage.ICO)){
//       super._forwardFunds();
//     }
//   }


//   function _preValidatePurchase(
//     address _beneficiary,
//     uint256 _weiAmount
//   )
//     internal
//   {
//     super._preValidatePurchase(_beneficiary, _weiAmount);
//     TimedCrowdsale._preValidatePurchase(_beneficiary, _weiAmount);
//     uint256 oldContributions= contributions[_beneficiary];
//     uint256 newContributions = oldContributions + (_weiAmount);
//     require(newContributions >= investorMinCap && newContributions <= investorMaxCap,"Not Valid Amount of Ether");
//     contributions[_beneficiary]= newContributions;
//     emit ContributionDone(_beneficiary, contributions[_beneficiary]);
//   }

//     function finalization() internal {
//       if(goalReached()){
//         MintableToken _mintableToken = MintableToken(token); //reference to Mintable Token
//         uint256 _alreadyMinted= _mintableToken.totalSupply();
//         uint256 _finalTotalSupply = _alreadyMinted.div(tokenSalePercentage).mul(100);
//         //Timelock
//        TokenTimelock foundersTimelock    = new TokenTimelock(token, foundersFund, releaseTime);
//         TokenTimelock foundationTimelock  = new TokenTimelock(token, foundersFund, releaseTime);
//         TokenTimelock partnersTimelock    = new TokenTimelock(token, foundersFund, releaseTime);

//         _mintableToken.mint(foundersTimelock, _finalTotalSupply.div(foundersPercentage));
//         _mintableToken.mint(foundationTimelock, _finalTotalSupply.div(foundersPercentage));
//         _mintableToken.mint(partnersTimelock, _finalTotalSupply.div(foundersPercentage));

//         //finish minting
//         _mintableToken.finishMinting(); //onlyOwner ,which is crowdsale
//         //pause token
//         PausableToken(token).unpause();
//       }
//       super.finalization();
//   }

// }