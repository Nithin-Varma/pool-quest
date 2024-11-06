//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "../helperContracts/ierc20.sol";
import "../helperContracts/safemath.sol";

contract Pool {

    struct Winners {
        uint256 roundId;
        address[] winners;
    }

    address[] public stakers;
    mapping(address => uint256) stakerAmount;
    mapping(address => bool) isStaker;
    address public rewardTokenAddress;
    uint48 public drawPeriod; // time between each draw
    uint48 public firstDrawOpensAfter;
    uint24 public grandPrizePeriodDraws; // grants before grandPrizePeriod starts
    uint16 public APY;
    bool public isActive;
    uint256 public totalAmountStaked;
    Winners public winners;
 
    event PoolCreated(address indexed poolAddress, address indexed poolCreator, uint256 indexed timestamp);
    event deposited(address indexed staker, uint256 amount);
    event withdraw(address indexed staker, uint256 amount);

    using SafeMath for *;

    constructor(address _rewardTokenAddress, uint48 _drawPeriod, uint48 _firstDrawOpensAfter, uint24 _grandPrizePeriodDraws, uint16 _APY) {

        if(_grandPrizePeriodDraws == 0 || _drawPeriod == 0 || _grandPrizePeriodDraws == 0) revert("values cant be zero");
        rewardTokenAddress = _rewardTokenAddress;
        drawPeriod = _drawPeriod;
        firstDrawOpensAfter = _firstDrawOpensAfter;
        grandPrizePeriodDraws = _grandPrizePeriodDraws;
        APY = _APY;
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

    function getRewardAmount() public returns(uint256) {
    }

    function selectWinners() public returns(address[] memory) {
    }

    function claimRewards() public returns(uint256) {
    }

    receive() external payable {
        stake(msg.value);
     }

}