import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // 部署 MockToken 作为抵押物和借贷代币
    const MockToken = await ethers.getContractFactory("MockToken");
    const collateralToken = await MockToken.deploy("Collateral Token", "CTK", ethers.parseUnits("1000000", 18)); // 初始发行 100 万代币
    const lendingToken = await MockToken.deploy("Lending Token", "LTK", ethers.parseUnits("1000000", 18)); // 初始发行 100 万代币

    console.log("Collateral Token deployed to:", collateralToken.target);
    console.log("Lending Token deployed to:", lendingToken.target);
    const sleep = (number) => {
        return new Promise(resolve => setTimeout(resolve, number))
    };

    // 部署 LendingContract
    const LendingContract = await ethers.getContractFactory("LendingContract");
    const lendingContract = await LendingContract.deploy(collateralToken.target, lendingToken.target, ethers.parseUnits("50000", 18)); // 铸造5万Lending Token给合约

    console.log("LendingContract deployed to:", lendingContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
