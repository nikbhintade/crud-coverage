const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("CRUD", () => {
    async function contractFicture() {

        const [owner, otherAccount] = await ethers.getSigners();
        console.log(`Owner address: ${owner.address} \nOther account's address: ${otherAccount.address}`)

        const CRUD = await ethers.getContractFactory("CRUD");
        const crud = await CRUD.deploy();

        console.log(`Address of deployed contract is ${await crud.getAddress()}\n`);

        return { crud, owner, otherAccount };
    }

    /* All tests will go below this ⬇️*/

    it("should have correct owner address", async () => {
        // Arrange
        const { crud, owner } = await loadFixture(contractFicture);
        // Act
        const contractOwner = await crud.owner();
        // Assert
        expect(contractOwner).to.be.equal(owner.address);
    })

    it("should have correct owner address", async () => {
        // Arrange
        const { crud, owner } = await loadFixture(contractFicture);
        // Act
        const contractOwner = await crud.owner();
        // Assert
        expect(contractOwner).to.be.equal(owner.address);
    })

    it("should update the stored value", async () => {
        const { crud } = await loadFixture(contractFicture);
        await crud.createData(1, "first value");

        await crud.updateData(1, "second value");

        expect(await crud.readData(1)).to.be.equal("second value");
    })

    it("should delete the entry", async () => {
        const { crud } = await loadFixture(contractFicture);
        await crud.createData(1, "first value");

        await crud.deleteData(1);

        expect(await crud.readData(1)).to.be.equal("");
    })

    it("should throws error if other address tries to access create function", async () => {
        const { crud, otherAccount } = await loadFixture(contractFicture);

        await expect(crud.connect(otherAccount).createData(1, "first value")).to.rejectedWith("Ownable: caller is not the owner")
    })

    it("should throw error if new entry created with key already in use", async () => {
        const { crud } = await loadFixture(contractFicture);
        await crud.createData(1, "first value");

        await expect(crud.createData(1, "second value")).to.be.rejectedWith("Key is already used to store data!");
    })
    /* Tests end here. */

})