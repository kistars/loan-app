require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // sepolia: {
    //   url: "https://eth-sepolia.g.alchemy.com/v2/<key>",
    //   accounts: [privateKey1, privateKey2, ...]
    // }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./loan-fe/artifacts"
  },
};
