const MIN_DELAY = 3600;
const VOTING_PERIOD = 5;
const VOTING_DELAY = 1;
const QUORUM_PERCENTAGE = 4;
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const NEW_STORE_VALUE = 77;
const FUNC_NAME = "store";
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 77 in the Box";
const proposalsFile = "proposals.json";

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    MIN_DELAY,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
    ADDRESS_ZERO,
    NEW_STORE_VALUE,
    FUNC_NAME,
    PROPOSAL_DESCRIPTION,
    developmentChains,
    proposalsFile,
};
