//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "../helperContracts/ierc20.sol";
import "../helperContracts/safemath.sol";
import "./erc20.sol";

contract Pool {

    address[] public stakers;
    address public legacy;
    mapping(address => uint256) stakerAmount;
    mapping(address => bool) isStaker;
    // address public rewardTokenAddress;
    uint48 public drawPeriod; // time between each draw
    uint48 public firstDrawOpensAfter = 10;
    uint24 public grandPrizePeriodDraws; // grants before grandPrizePeriod starts
    // uint16 public APY;
    uint256 public TPW; // Tokens Per Week
    bool public isActive;
    uint256 public totalAmountStaked;
    uint256 public creationTime;

    struct Winners {
        uint256 roundId;
        address[] winners;
        mapping(address => uint256) winnerReward;
        mapping(address => bool) isWinner;
        mapping(address => bool) isClaimed;
        uint256 timestamp;
    }

    struct TokenDetails {
        string name;
        string symbol;
        uint256 initialSupply;
        address tokenAddress;
        address tokenOwner;
    }

    Winners public winners;
    TokenDetails public tokenDetails;
    IERC20Permit private _token;
    
 
    event PoolCreated(address indexed poolAddress, address indexed poolCreator, uint256 indexed timestamp);
    event deposited(address indexed staker, uint256 amount);
    event withdraw(address indexed staker, uint256 amount);

    using SafeMath for *;

    constructor(string memory tokenName, string memory tokenSymbol, uint48 _drawPeriod, uint16 _TPW) {

        if( _TPW == 0) revert("Tokens Per Week cant be zero");
        tokenDetails = TokenDetails({
            name: tokenName,
            symbol: tokenSymbol,
            initialSupply: TPW * 100,
            tokenAddress: 0x0000000000000000000000000000000000000000,
            tokenOwner: msg.sender
        });
        _deployToken();
        drawPeriod = _drawPeriod;
        creationTime = block.timestamp;
        // firstDrawOpensAfter = _firstDrawOpensAfter;
        // grandPrizePeriodDraws = _grandPrizePeriodDraws;
        TPW = _TPW;
        isActive = true;
        emit PoolCreated(address(this), msg.sender, block.timestamp);
    }

    function stake(uint256 _amount) public payable {
        address staker = msg.sender;
        if(!isStaker[staker]) {
            stakers.push(staker);
            isStaker[staker] = true;
        }
        stakerAmount[staker] = stakerAmount[staker].add(_amount);
        totalAmountStaked = totalAmountStaked.add(_amount);
        (bool sent, ) = address(this).call{value: _amount}("");
        require(sent, "failed to stake ether");
        emit deposited(staker, _amount);
    }

    function unStake() public {
        address staker = msg.sender;
        if(!isStaker[staker]) revert("you are not a staker");
        uint256 un_stake = stakerAmount[staker];
        stakerAmount[staker] = 0;
        isStaker[staker] = false;
        (bool sent, ) = staker.call{value: un_stake}("");
        require(sent, "failed to unstake");
        emit withdraw(staker, un_stake);
    }

    function nextDrawIn() public view returns(uint256) {
        return (winners.timestamp * 7 days - block.timestamp);
    }

    function selectWinners() public returns(address[] memory) {
        require(block.timestamp >= creationTime * 10 days, "need to wait 10 days after creation");
        require(stakers.length >= 3, "Not enough stakers to select winners");
        require(block.timestamp >= winners.timestamp * 7 days, "you can only select winners once in a week");
        delete winners.winners;

        for (uint i = 0; i < 3; i++) {
            uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, i))) % stakers.length;
            winners.winners.push(stakers[randomIndex]);
            winners.isWinner[stakers[randomIndex]] = true;
        }

        winners.roundId++;
        winners.timestamp = block.timestamp;
        return winners.winners;
    }

    function claimRewards() public returns(uint256) {
        address staker = msg.sender;
        require(isStaker[staker], "Not a staker");
        require(winners.roundId > 0, "No completed draws");
        require(winners.isWinner[staker], "Not a winner for the last draw");

        if (_token.balanceOf(address(this)) < TPW) {
            ERC20MemeToken(tokenDetails.tokenAddress).mint(address(this), TPW * 100);
        }
        uint256 rewardAmount = TPW / 3;
        winners.winnerReward[staker] = rewardAmount;
        _token.transfer(staker, rewardAmount);
        winners.isClaimed[staker] = true;

        return rewardAmount;
    }

    function myClaimableRewards() public view returns(bool claimable, uint256 amount) {
        address staker = msg.sender;
        require(!winners.isClaimed[staker], "winner already claimed");
        if(winners.isWinner[msg.sender]) {
            return(true, TPW / 3);
        } else {
            return(false, 0);
        }
    }

    function _deployToken() private {
        require(tokenDetails.tokenAddress == 0x0000000000000000000000000000000000000000, "Token already deployed");

        ERC20MemeToken token = new ERC20MemeToken(
            tokenDetails.name,
            tokenDetails.symbol,
            tokenDetails.initialSupply
        );
        tokenDetails.tokenAddress = address(token);
    }

    receive() external payable {
        stake(msg.value);
     }

}