// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameCoin is ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 10_000_000 * 10**18; // 10 million tokens with 18 decimals
    address public marketplaceAddress;

    constructor(string memory name, string memory symbol) 
        ERC20(name, symbol) 
        Ownable(msg.sender) 
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }

    function setMarketplaceAddress(address newMarketplaceAddress) public onlyOwner {
        require(newMarketplaceAddress != address(0), "Invalid address");
        marketplaceAddress = newMarketplaceAddress;
    }

    function mintFromMarketplace(address to, uint256 amount) public {
        require(msg.sender == marketplaceAddress, "Only marketplace can mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
}