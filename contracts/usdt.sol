// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract myUSDT is ERC20 {
    uint256 private _initialSupply = 1000000 * 10**6; // 1 million USDT (with 6 decimals)

    constructor() ERC20("Tether USD", "USDT") {
        _mint(msg.sender, _initialSupply);
    }

    // Overriding decimals function to set it to 6 instead of the default 18
    function decimals() public view virtual override returns (uint8) {
        return 6;
    }
}