//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "../helperContracts/ierc20.sol";
import "../helperContracts/nonReentrant.sol";

contract UBI is ReentrancyGuard {

    address[] public totalUsers;
    mapping(address => bool) public isUserVerified;
    uint256 public nextPayout;
    IERC20Permit private _token;

    event PaymentReceipt(address from, uint256 value);
    event DonatedToCharies(address indexed to, uint256 amount);

    constructor() {
        nextPayout = block.timestamp * 30 days;
    }

    function listUser(bool verified) public {
        if(!verified) revert ("user not verified");
        totalUsers.push(msg.sender);
        isUserVerified[msg.sender] = true;
    }

    function payOut(address tokenAddress) public {
        require(block.timestamp >= nextPayout, "next payout deadline not reached");
        _token = IERC20Permit(tokenAddress);
        
        uint256 individual_reward = _token.balanceOf(address(this)) / totalUsers.length;
        for(uint256 i=0; i<totalUsers.length; i++) {
            _token.transfer(totalUsers[i], individual_reward);
        }
    }

    function getBack(address payable _to) public {
        _to.transfer(address(this).balance);
    }

    function getBackTokens(address tokenAddress, address _to) public {
        _token = IERC20Permit(tokenAddress);
        _token.transfer(_to, _token.balanceOf(address(this)));
    }

    receive() external payable {
        emit PaymentReceipt(msg.sender, msg.value);
    }
}