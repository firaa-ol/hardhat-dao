const { network } = require("hardhat");
const { proposalsFile, developmentChains, VOTING_PERIOD } = require("../helper-hardhat-config");
const fs = require("fs");
const { moveBlocks } = require("../utils/move-blocks");

const index = 0;

async function vote(proposalIndex) {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    const proposalId = proposals[network.config.chainId][proposalIndex];
    //vote -> 0=Against, 1 = For, 2=Abstain
    const voteWay = 1;
    const governor = await ethers.getContract("GovernorContract");
    const voteTxResponse = await governor.castVote(proposalId, voteWay);
    await voteTxResponse.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1);
    }

    console.log("Voted! Ready to go!");

    const proposalState = await governor.state(proposalId);
    console.log(`Proposal State: ${proposalState}`);
}

vote(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
