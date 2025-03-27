// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameItems is ERC1155, ERC1155Burnable, ERC1155Supply, Ownable {
    enum Rarity {
        Poor,
        Common,
        Uncommon,
        Rare,
        Epic,
        Legendary
    }

    struct Item {
        string name;
        Rarity rarity;
        uint256 maxSupply;
    }

    mapping(uint256 => Item) public items;

    uint256 public constant ITEM_1 = 0;
    uint256 public constant ITEM_2 = 1;
    uint256 public constant ITEM_3 = 2;

    event ItemCreated(
        uint256 indexed itemId,
        string name,
        Rarity rarity,
        uint256 maxSupply
    );
    event ItemMinted(
        uint256 indexed itemId,
        address indexed to,
        uint256 amount
    );

    address public marketplaceAddress;

    constructor(string memory uri) ERC1155(uri) Ownable(msg.sender) {
        for (uint256 i = 0; i < 3; i++) {
            for (uint256 j = 0; j < 6; j++) {
                _createItem(
                    i * 6 + j,
                    getItemName(i, Rarity(j)),
                    Rarity(j),
                    getMaxSupply(Rarity(j))
                );
            }
        }
    }

    function getItemName(uint256 itemType, Rarity rarity)
        internal
        pure
        returns (string memory)
    {
        string[3] memory itemNames = ["Sword", "Shield", "Potion"];
        string[6] memory rarityNames = [
            "Poor",
            "Common",
            "Uncommon",
            "Rare",
            "Epic",
            "Legendary"
        ];
        return
            string(
                abi.encodePacked(
                    rarityNames[uint256(rarity)],
                    " ",
                    itemNames[itemType]
                )
            );
    }

    function getMaxSupply(Rarity rarity) internal pure returns (uint256) {
        if (rarity == Rarity.Poor) return 10000;
        if (rarity == Rarity.Common) return 5000;
        if (rarity == Rarity.Uncommon) return 2500;
        if (rarity == Rarity.Rare) return 1000;
        if (rarity == Rarity.Epic) return 500;
        if (rarity == Rarity.Legendary) return 100;
        return 0;
    }

    function setMarketplaceAddress(address _marketplaceAddress)
        external
        onlyOwner
    {
        require(_marketplaceAddress != address(0), "Invalid address");
        marketplaceAddress = _marketplaceAddress;
    }

    function _createItem(
        uint256 itemId,
        string memory name,
        Rarity rarity,
        uint256 maxSupply
    ) internal onlyOwner {
        require(bytes(items[itemId].name).length == 0, "Item already exists");
        items[itemId] = Item(name, rarity, maxSupply);
        emit ItemCreated(itemId, name, rarity, maxSupply);
    }

    function mint(
        address to,
        uint256 itemId,
        uint256 amount
    ) external {
        require(msg.sender == marketplaceAddress, "Only marketplace can mint");
        require(
            totalSupply(itemId) + amount <= items[itemId].maxSupply,
            "Exceeds max supply"
        );
        _mint(to, itemId, amount, "");
        emit ItemMinted(itemId, to, amount);
    }

    function burn(
        address from,
        uint256 itemId,
        uint256 amount
    ) public override {
        require(msg.sender == marketplaceAddress, "Only marketplace can burn");
        _burn(from, itemId, amount);
    }

    function getItemInfo(uint256 itemId)
        public
        view
        returns (
            string memory name,
            Rarity rarity,
            uint256 maxSupply,
            uint256 currentSupply
        )
    {
        Item memory item = items[itemId];
        require(bytes(item.name).length > 0, "Item does not exist");
        return (item.name, item.rarity, item.maxSupply, totalSupply(itemId));
    }

    function getItemBalance(address account, uint256 itemId)
        public
        view
        returns (uint256)
    {
        return balanceOf(account, itemId);
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
