import { ethers } from "hardhat";

async function main() {
  const supply = ethers.utils.parseEther("1");

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(supply);

  await token.deployed();

  console.log(`Deployed to ${token.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
