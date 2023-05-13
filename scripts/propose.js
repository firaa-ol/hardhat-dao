const { network } = require("hardhat");
const {
    NEW_STORE_VALUE,
    FUNC_NAME,
    PROPOSAL_DESCRIPTION,
    developmentChains,
    VOTING_DELAY,
    proposalsFile,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const fs = require("fs");

async function propose(args, functionToCall, proposalDescription) {
    const governor = await ethers.getContract("GovernorContract");
    const box = await ethers.getContract("Box");

    const encodedFuncCall = box.interface.encodeFunctionData(functionToCall, args);
    console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
    console.log(`Proposal Description: \n ${proposalDescription}`);

    const proposeTx = await governor.propose(
        [box.address],
        [0],
        [encodedFuncCall],
        proposalDescription
    );
    const proposeReceipt = await proposeTx.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_DELAY + 1);
    }

    const proposalId = proposeReceipt.events[0].args.proposalId;
    let proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    proposals[network.config.chainId].push(proposalId.toString());
    fs.writeFileSync(proposalsFile, JSON.stringify(proposals));
}

propose([NEW_STORE_VALUE], FUNC_NAME, PROPOSAL_DESCRIPTION)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
