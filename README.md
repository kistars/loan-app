# 借贷合约

该合约实现了一个简单的去中心化借贷系统，用户可以存入抵押物代币，并根据抵押物借出另一种借贷代币（lending token）。此外，还提供了一个水龙头（faucet）功能，允许用户铸造抵押物代币用于测试。

## 功能

1. **存入抵押物**：用户可以存入一定数量的抵押物代币来作为借款的担保。
2. **借款**：用户可以根据抵押物借出借贷代币，要求用户存入的抵押物必须是借款金额的 150%。
3. **还款**：用户可以偿还所借的代币，偿还后债务减少。
4. **水龙头功能**：允许用户铸造一定数量的抵押物代币，用于测试。

## 合约部署

### 步骤 1：克隆项目并安装依赖

首先进入项目根目录并安装依赖。

```bash
cd lending-contract
npm install
```

### 步骤 2：编译合约

编译合约文件，确保一切正常。

```bash
npx hardhat compile
```

### 步骤 3：部署合约

编写一个部署脚本，使用 Hardhat 将合约部署到本地或其他网络。修改部署脚本中的初始参数 `_collateralToken` 和 `_lendingToken` 的地址，以及 `mint` 的初始数量 `_amount`。

部署脚本示例（`scripts/deploy.js`）：

```javascript
async function main() {
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);
    
    // 部署 MockToken 作为抵押物和借贷代币
    const MockToken = await ethers.getContractFactory("MockToken");
    const collateralToken = await MockToken.deploy("Collateral Token", "CTK", ethers.utils.parseUnits("1000000", 18)); // 初始发行 100 万代币
    const lendingToken = await MockToken.deploy("Lending Token", "LTK", ethers.utils.parseUnits("1000000", 18)); // 初始发行 100 万代币
    
    console.log("Collateral Token deployed to:", collateralToken.address);
    console.log("Lending Token deployed to:", lendingToken.address);
    
    // 部署 LendingContract
    const LendingContract = await ethers.getContractFactory("LendingContract");
    const lendingContract = await LendingContract.deploy(collateralToken.address, lendingToken.address, ethers.utils.parseUnits("50000", 18)); // 铸造5万Lending Token给合约
    
    console.log("LendingContract deployed to:", lendingContract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

运行部署脚本：

```bash
npx hardhat run scripts/deploy.js --network <网络名称>
```

### 步骤 4：与合约交互

你可以通过以下方式与合约进行交互。

#### 1. 存入抵押物

用户可以调用 `depositCollateral` 函数，将一定数量的抵押物代币存入合约。首先需要批准合约使用用户的抵押物代币：

```javascript
await collateralToken.connect(user).approve(lendingContract.address, depositAmount);
await lendingContract.connect(user).depositCollateral(depositAmount);
```

#### 2. 借款

用户存入足够的抵押物后，可以借出借贷代币。注意，用户的抵押物必须至少是借款金额的 150%。

```javascript
await lendingContract.connect(user).borrow(borrowAmount);
```

#### 3. 还款

用户可以偿还所借的代币，通过以下步骤还款：

```javascript
await lendingToken.connect(user).approve(lendingContract.address, repayAmount);
await lendingContract.connect(user).repay(repayAmount);
```

#### 4. 使用水龙头

用户可以调用 `faucet` 函数，铸造一定数量的抵押物代币用于测试。每次调用会给用户铸造 100 个抵押物代币。

```javascript
await lendingContract.connect(user).faucet();
```

## 详细流程

### 1. 用户存入抵押物

用户首先调用 `depositCollateral` 函数，将抵押物代币（`collateralToken`）存入合约，并增加其在合约中的抵押余额。

### 2. 用户借款

用户在存入抵押物后，可以调用 `borrow` 函数借款。合约要求用户存入的抵押物金额必须是借款金额的 150%，否则会报错。借款成功后，借贷代币（`lendingToken`）会转到用户的账户中，同时记录用户的债务。

### 3. 用户还款

用户可以通过调用 `repay` 函数归还借贷的代币，并减少其债务。用户需要先批准合约使用其借贷代币。

### 4. 水龙头功能

用户可以使用水龙头功能，直接铸造一定数量的抵押物代币，用于测试。每次调用水龙头都会给用户铸造 100 个抵押物代币。

## 注意事项

- 合约设计为 150% 过度抵押，确保借贷系统的稳定性。
- 用户需要先批准合约使用其代币才能完成抵押、还款等操作。
- 合约中水龙头功能仅用于测试，不应用于生产环境。

### 合约中的事件

1. `CollateralDeposited`：当用户存入抵押物时触发。
2. `Borrowed`：当用户成功借款时触发。
3. `Repaid`：当用户还款时触发。
4. `FaucetUsed`：当用户调用水龙头领取抵押物代币时触发。
