// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CRUD is Ownable {
    mapping(uint => string) public data;

    function createData(uint _key, string memory _value) public onlyOwner {
        require(
            bytes(data[_key]).length == 0,
            "Key is already used to store data!"
        );
        data[_key] = _value;
    }

    function readData(uint _key) public view returns (string memory) {
        return data[_key];
    }

    function updateData(uint _key, string memory _value) public onlyOwner {
        require(bytes(data[_key]).length != 0, "Key is not used yet!");
        data[_key] = _value;
    }

    function deleteData(uint _key) public onlyOwner {
        delete data[_key];
    }
}
