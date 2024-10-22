// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./MockToken.sol";

contract LendingContract {
    MockToken public collateralToken;  // 抵押物代币
    MockToken public lendingToken;     // 借出代币
    mapping(address => uint256) public collateralBalances;
    mapping(address => uint256) public debt;

    event CollateralDeposited(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);
    event FaucetUsed(address indexed user, uint256 amount);

    constructor(MockToken _collateralToken, MockToken _lendingToken, uint256 _amount) {
        collateralToken = _collateralToken;
        lendingToken = _lendingToken;
        lendingToken.mint(address(this), _amount);
    }

    // 存入抵押物函数
    function depositCollateral(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        collateralToken.transferFrom(msg.sender, address(this), _amount);
        collateralBalances[msg.sender] += _amount;

        emit CollateralDeposited(msg.sender, _amount);
    }

    // 借款函数
    function borrow(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(collateralBalances[msg.sender] >= _amount * 150 / 100, "Insufficient collateral"); // 150% 过度抵押

        collateralBalances[msg.sender] -= _amount * 150 / 100;

        debt[msg.sender] += _amount;

        lendingToken.transfer(msg.sender, _amount);

        emit Borrowed(msg.sender, _amount);
    }

    // 还款函数
    function repay(uint256 _amount) external {
        require(debt[msg.sender] > 0, "No outstanding debt");
        lendingToken.transferFrom(msg.sender, address(this), _amount);

        collateralBalances[msg.sender] += _amount * 150 / 100;

        debt[msg.sender] -= _amount;

        emit Repaid(msg.sender, _amount);
    }

    // Faucet 功能用于领取抵押物代币（collateralToken）
    function faucet() external {
        collateralToken.mint(msg.sender, 100*1e18);
        emit FaucetUsed(msg.sender, 100*1e18);
    }
}
