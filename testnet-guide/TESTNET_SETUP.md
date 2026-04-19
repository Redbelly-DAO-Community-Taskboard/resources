# Redbelly Testnet Setup Guide

Complete setup guide for DAO contributors. Follow this before starting any developer task.

---

## 1. Add Redbelly Testnet to MetaMask

1. Open MetaMask and click the network selector at the top
2. Click "Add network" then "Add a network manually"
3. Enter the following details:

| Field | Value |
|-------|-------|
| Network Name | Redbelly Testnet |
| New RPC URL | `https://rpc-testnet.redbelly.network` |
| Chain ID | `153` |
| Currency Symbol | `RBNT` |
| Block Explorer URL | `https://explorer.testnet.redbelly.network` |

4. Click Save. Redbelly Testnet will now appear in your network list.

---

## 2. Get Testnet RBNT

You need RBNT to pay gas fees on the testnet.

- Check if Redbelly has a public testnet faucet at their [documentation](https://docs.redbelly.network) or in the `#dev-resources` Discord channel
- If no public faucet is available, request testnet RBNT directly in `#taskboard-updates` on Discord, mentioning your task number and wallet address

---

## 3. Verify Your Connection

Run this in your Hardhat project to confirm you are connected:

```bash
npx hardhat console --network redbelly-testnet
```

Then in the console:
```javascript
const [signer] = await ethers.getSigners();
console.log(await signer.getAddress());
console.log(ethers.formatEther(await ethers.provider.getBalance(signer.address)));
```

You should see your wallet address and RBNT balance.

---

## 4. Deploy a Test Contract

Using the hardhat-starter:

```bash
cd resources/hardhat-starter
npm install
cp .env.example .env
# Add your private key to .env (never commit this file)
npx hardhat compile
npx hardhat run scripts/deploy.js --network redbelly-testnet
```

---

## 5. Mock Eligibility for Testing

For unit tests where you do not want to depend on real KYC status, use a mock eligibility contract:

```solidity
// MockEligibility.sol - for tests only, never deploy to mainnet
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockEligibility {
    mapping(address => bool) private permissions;

    function setPermission(address user, bool allowed) external {
        permissions[user] = allowed;
    }

    function hasChainPermission(address user) external view returns (bool) {
        return permissions[user];
    }
}
```

Deploy this in your test setup and pass its address to your contract's constructor instead of the real eligibility contract address.

---

## 6. Common Testnet Issues

| Problem | Fix |
|---------|-----|
| "Nonce too low" error | Reset your MetaMask account: Settings > Advanced > Clear activity tab data |
| Transaction pending forever | Increase gas limit manually or check RPC endpoint is responsive |
| MetaMask not detecting the network | Confirm Chain ID is 153 (not 0x99 hex) |
| "Insufficient funds" on deploy | Request more testnet RBNT (see Step 2) |
| RPC returning 429 errors | You are rate-limited. Wait 60 seconds and retry. Consider running your own node. |

---

## 7. Verify a Contract on the Explorer

```bash
npx hardhat verify --network redbelly-testnet DEPLOYED_CONTRACT_ADDRESS "constructor_arg_1" "constructor_arg_2"
```

Check the result at `https://explorer.testnet.redbelly.network/address/DEPLOYED_CONTRACT_ADDRESS`.

---

## Resources

- [Redbelly Technical Documentation](https://docs.redbelly.network)
- [EligibilitySDK Overview](https://docs.redbelly.network/pages/eligibility-sdk/)
- [Discord #dev-resources](#)
