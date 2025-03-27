// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./GameToken.sol";
import "./SpecialItem.sol";

contract Marketplace is Ownable, ERC1155Holder {
    GameCoin private s_coin;
    GameItems private s_items;

    uint256 public constant SMALL_PACK = 10000; // 10k GameCoins
    uint256 public constant LARGE_PACK = 100000; // 100k GameCoins
    uint256 public constant SMALL_PACK_PRICE = 0.002 ether;
    uint256 public constant LARGE_PACK_PRICE = 0.005 ether;

    mapping(uint256 => uint256) public itemPrices;
    mapping(uint256 => uint256) public maxItemsPerUser;

    mapping(address => mapping(uint256 => uint256)) public userItemCount;

    event ItemPurchased(address buyer, uint256 itemId, uint256 amount);
    event ItemUpgraded(
        address indexed user,
        uint256 oldItemId1,
        uint256 oldItemId2,
        uint256 newItemId
    );
    event TokensPurchased(address indexed buyer, uint256 amount);

    constructor(GameCoin coinAddress, GameItems itemsAddress)
        Ownable(msg.sender)
    {
        s_coin = coinAddress;
        s_items = itemsAddress;

        // Set default prices and max items per user
        for (uint256 i = 0; i < 18; i++) {
            itemPrices[i] = 10 * (10**(i % 6));
            maxItemsPerUser[i] = 10 / (2**(i % 6));
        }
    }

    function setGameItemsAddress(address _gameItemsAddress) external onlyOwner {
        require(_gameItemsAddress != address(0), "Invalid address");
        s_items = GameItems(_gameItemsAddress);
    }

    function upgradeItem(uint256 itemId1, uint256 itemId2) external {
        (, GameItems.Rarity rarity1, , ) = s_items.getItemInfo(itemId1);
        (, GameItems.Rarity rarity2, , ) = s_items.getItemInfo(itemId2);

        require(rarity1 == rarity2, "Items must be of the same rarity");
        require(
            uint256(rarity1) < uint256(GameItems.Rarity.Legendary),
            "Cannot upgrade Legendary items"
        );

        uint256 newItemId = itemId1 + 1; // Assuming the next ID is the upgraded version
        (, GameItems.Rarity newRarity, , ) = s_items.getItemInfo(newItemId);
        require(
            uint256(newRarity) == uint256(rarity1) + 1,
            "Invalid upgrade path"
        );

        // Check if the user has approved the marketplace to handle their tokens
        require(
            s_items.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved to handle tokens"
        );

        // Transfer the items from the user to the marketplace
        s_items.safeTransferFrom(msg.sender, address(this), itemId1, 1, "");
        s_items.safeTransferFrom(msg.sender, address(this), itemId2, 1, "");

        // Burn the old items
        s_items.burn(address(this), itemId1, 1);
        s_items.burn(address(this), itemId2, 1);

        // Mint the new item
        s_items.mint(msg.sender, newItemId, 1);

        emit ItemUpgraded(msg.sender, itemId1, itemId2, newItemId);
    }

    function buyItem(uint256 itemId, uint256 amount) public {
        require(
            userItemCount[msg.sender][itemId] + amount <=
                maxItemsPerUser[itemId],
            "Exceeds max items per user"
        );
        uint256 totalPrice = itemPrices[itemId] * amount;
        require(
            s_coin.balanceOf(msg.sender) >= totalPrice,
            "Insufficient balance"
        );

        s_coin.transferFrom(msg.sender, address(this), totalPrice);
        s_items.mint(msg.sender, itemId, amount);

        userItemCount[msg.sender][itemId] += amount;
        emit ItemPurchased(msg.sender, itemId, amount);
    }

    function buyTokens(uint256 amount) public payable {
        require(msg.value >= amount * 0.00001 ether, "Insufficient payment");
        s_coin.mintFromMarketplace(msg.sender, amount);
        emit TokensPurchased(msg.sender, amount);
    }

    function setItemPrice(uint256 itemId, uint256 newPrice) public onlyOwner {
        itemPrices[itemId] = newPrice;
    }

    function setMaxItemsPerUser(uint256 itemId, uint256 newMax)
        public
        onlyOwner
    {
        maxItemsPerUser[itemId] = newMax;
    }

    function withdrawTokens(address to, uint256 amount) public onlyOwner {
        s_coin.transfer(to, amount);
    }

    // Payable function to buy GameCoins
    function buyGameCoins(bool isLargePack) external payable {
        uint256 amount;
        uint256 price;

        if (isLargePack) {
            amount = LARGE_PACK;
            price = LARGE_PACK_PRICE;
        } else {
            amount = SMALL_PACK;
            price = SMALL_PACK_PRICE;
        }

        require(msg.value == price, "Incorrect ETH amount");

        s_coin.mint(msg.sender, amount);

        emit TokensPurchased(msg.sender, amount);
    }

    // Function to withdraw ETH (for the contract owner)
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");

        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "ETH transfer failed");
    }
}
