# Redbelly DAO: Resources

Starter kits, SDK boilerplate, and testnet guides for DAO task board contributors. Start here before building anything.

---

## Contents

### `hardhat-starter/`
A pre-configured Hardhat project targeting the Redbelly Testnet (Chain ID 153). Includes network config, a deploy script, a basic contract, and a test suite. Clone this as the foundation for any developer task (Tasks 1, 2, 3, 4, 10, 13).

### `eligibility-sdk-boilerplate/`
Ready-to-use React components for integrating the `useHasChainPermission` and `useBusinessDetails` hooks from `@redbellynetwork/eligibility-sdk`. Use this as your frontend scaffold for any task that requires eligibility verification.

### `testnet-guide/`
Step-by-step guide to getting set up on the Redbelly Testnet: adding the network to MetaMask, acquiring testnet RBNT, connecting via RPC, and deploying your first contract.

---

## Quick Start

```bash
# Clone this repo
git clone https://github.com/Redbelly-DAO-Community-Taskboard/resources.git

# Hardhat starter
cd resources/hardhat-starter
npm install
cp .env.example .env
# Add your private key to .env
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network redbelly-testnet
```

---

## Redbelly Testnet Details

| Parameter | Value |
|-----------|-------|
| Network Name | Redbelly Testnet |
| Chain ID | 153 |
| RPC URL | `https://governors.testnet.redbelly.network` |
| Block Explorer | `https://redbelly.testnet.routescan.io` |
| Currency Symbol | RBNT |

---

## Averer Issuer DIDs

Required in the `allowedIssuers` array of your ZK proof queries.

| Environment | Issuer DID |
|-------------|------------|
| Mainnet | `did:receptor:redbelly:mainnet:31AAH8sSaGd6fpnG1TcB6yQ4UZnNeyHzTk5aM2P7rjv` |
| Testnet | `did:receptor:redbelly:testnet:31K82iKCtE6ciDc7oAr3T5EpjZb4S1EFM7c4xJaWkM2` |

---

## EligibilitySDK Package

```bash
npm install @redbellynetwork/eligibility-sdk
```

**Hooks available:**
- `useHasChainPermission(address)` - Returns whether an address has chain permission (boolean)
- `useBusinessDetails(address)` - Returns `isBusinessUser`, `businessContractAddress`, and `businessDetails` (including `companyAddress`)

Full docs: [https://docs.redbelly.network/pages/eligibility-sdk/](https://docs.redbelly.network/pages/eligibility-sdk/)

---

## Contributing to Resources

If you discover a useful pattern, fix, or snippet during your task work, open a PR to add it here. The better these resources get, the faster every future contributor can move.
