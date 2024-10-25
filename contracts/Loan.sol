// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// 导入自定义的 MockToken 合约，用于模拟借贷和抵押的代币
import "./MockToken.sol";

/**
 * @title LendingContract
 * @dev 这是一个简单的去中心化借贷合约，用户可以存入抵押物、借出代币、还款以及使用 faucet 领取代币。
 */
contract LendingContract {
    // 抵押物代币合约实例
    MockToken public collateralToken;
    // 借出代币合约实例
    MockToken public lendingToken;

    // 存储每个用户的抵押物余额
    mapping(address => uint256) public collateralBalances;
    // 存储每个用户的债务（借款金额）
    mapping(address => uint256) public debt;

    // 事件声明，用于记录发生的操作，方便链上查询
    event CollateralDeposited(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);
    event FaucetUsed(address indexed user, uint256 amount);

    /**
     * @dev 合约的构造函数，在部署时初始化抵押物和借贷代币合约，并向合约地址铸造一定量的借贷代币。
     * @param _collateralToken 抵押物代币的合约地址
     * @param _lendingToken 借出代币的合约地址
     * @param _amount 初始铸造的借出代币数量
     */
    constructor(MockToken _collateralToken, MockToken _lendingToken, uint256 _amount) {
        collateralToken = _collateralToken;
        lendingToken = _lendingToken;
        lendingToken.mint(address(this), _amount); // 铸造借出代币，并存入本合约地址
    }

    /**
     * @dev 存入抵押物函数，用户将抵押物代币转移到合约中作为借款的担保。
     * @param _amount 存入的抵押物代币数量，必须大于 0
     */
    function depositCollateral(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero"); // 确保存入的金额大于 0
        // 从用户地址转移指定数量的抵押物代币到合约地址
        collateralToken.transferFrom(msg.sender, address(this), _amount);
        // 更新用户的抵押物余额
        collateralBalances[msg.sender] += _amount;

        // 触发存入事件
        emit CollateralDeposited(msg.sender, _amount);
    }

    /**
     * @dev 借款函数，用户在提供足够抵押物的情况下，可以从合约中借出代币。
     * @param _amount 借出的代币数量，必须大于 0
     * @notice 用户需要提供至少 150% 的抵押物才能借款。
     */
    function borrow(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero"); // 确保借款金额大于 0
        // 检查用户是否有足够的抵押物来借款，要求 150% 的过度抵押
        require(collateralBalances[msg.sender] >= _amount * 150 / 100, "Insufficient collateral");

        // 从用户的抵押物余额中扣除相应数量（150% 的抵押物）
        collateralBalances[msg.sender] -= _amount * 150 / 100;

        // 增加用户的债务（借款金额）
        debt[msg.sender] += _amount;

        // 向用户转移借出的代币
        lendingToken.transfer(msg.sender, _amount);

        // 触发借款事件
        emit Borrowed(msg.sender, _amount);
    }

    /**
     * @dev 还款函数，用户可以将借款的代币返还到合约中，同时释放部分抵押物。
     * @param _amount 还款的代币数量
     * @notice 假设用户的债务金额必须大于 0 才能还款。
     */
    function repay(uint256 _amount) external {
        require(debt[msg.sender] > 0, "No outstanding debt"); // 确保用户有未偿还的债务
        // 将用户的还款金额从用户地址转移到合约地址
        lendingToken.transferFrom(msg.sender, address(this), _amount);

        // 释放用户相应数量的抵押物（还款金额的 150%）
        collateralBalances[msg.sender] += _amount * 150 / 100;

        // 减少用户的债务
        debt[msg.sender] -= _amount;

        // 触发还款事件
        emit Repaid(msg.sender, _amount);
    }

    /**
     * @dev Faucet 功能，用于领取一定数量的抵押物代币，方便测试和初学者练习。
     * @notice 每个用户调用该函数时，会获得 100 个抵押物代币。
     */
    function faucet() external {
        // 为调用者铸造 100 个抵押物代币
        collateralToken.mint(msg.sender, 100 * 1e18);

        // 触发 faucet 使用事件
        emit FaucetUsed(msg.sender, 100 * 1e18);
    }
}
