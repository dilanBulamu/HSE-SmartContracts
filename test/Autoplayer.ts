import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    const GameContract  = await ethers.getContractFactory("GameContract");
    const gameContract  = await GameContract.deploy();

    const Autoplayer  = await ethers.getContractFactory("Autoplayer");
    const autoplayer  = await Autoplayer.deploy(gameContract.address);

    return { gameContract, autoplayer };
  }

  describe("Deployment", function () {
    it("Should work", async function () {
      const {gameContract, autoplayer } = await loadFixture(deploy);
      
      await autoplayer.commitMove();
    });
  });
});

