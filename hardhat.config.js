require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    networks: {
        hardhat: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
    },
    settings: {
        optimizer: {
            enabled: true,
            runs: 200,
            details: { yul: false },
        },
    },
};
