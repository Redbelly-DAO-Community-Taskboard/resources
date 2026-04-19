require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "redbelly-testnet": {
      url: "https://rpc-testnet.redbelly.network",
      chainId: 153,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto",
    },
    "redbelly-mainnet": {
      url: "https://rpc.redbelly.network",
      chainId: 151,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: "auto",
    },
  },
  etherscan: {
    apiKey: {
      "redbelly-testnet": "no-api-key-needed",
    },
    customChains: [
      {
        network: "redbelly-testnet",
        chainId: 153,
        urls: {
          apiURL: "https://explorer.testnet.redbelly.network/api",
          browserURL: "https://explorer.testnet.redbelly.network",
        },
      },
    ],
  },
};
