const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying from:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "RBNT");

  // Replace with the actual eligibility contract address confirmed by Redbelly core team
  const ELIGIBILITY_CONTRACT = process.env.ELIGIBILITY_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

  if (ELIGIBILITY_CONTRACT === "0x0000000000000000000000000000000000000000") {
    console.warn("WARNING: Using zero address for eligibility contract. Set ELIGIBILITY_CONTRACT_ADDRESS in .env");
  }

  // Replace YourContract with the name of your contract
  // const YourContract = await ethers.getContractFactory("YourContract");
  // const contract = await YourContract.deploy(ELIGIBILITY_CONTRACT);
  // await contract.waitForDeployment();
  // console.log("YourContract deployed to:", await contract.getAddress());

  console.log("Deployment script ready. Uncomment the deployment lines above and replace YourContract.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
