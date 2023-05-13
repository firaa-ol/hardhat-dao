// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/TimelockController.sol";

//TimeLock will own the Box contract
contract TimeLock is TimelockController {
    /**
     *
     * @param minDelay How long you have to wait before executing
     * @param proposers the list of addresses that can propose
     * @param executors who can execute when a proposal passes
     */
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors
    ) TimelockController(minDelay, proposers, executors, msg.sender) {}
}
