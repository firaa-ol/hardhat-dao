const { network } = require("hardhat");
const {
    NEW_STORE_VALUE,
    PROPOSAL_DESCRIPTION,
    developmentChains,
    MIN_DELAY,
    FUNC_NAME,
    VOTING_PERIOD,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const { moveTime } = require("../utils/move-time");

async function queueAndExecute() {
    const args = [NEW_STORE_VALUE];
    const box = await ethers.getContract("Box");
    const encodedFuncCall = box.interface.encodeFunctionData(FUNC_NAME, args);
    const descriptionHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION));

    const governor = await ethers.getContract("GovernorContract");
    console.log("Queueing...");
    const queueTx = await governor.queue([box.address], [0], [encodedFuncCall], descriptionHash);

    await queueTx.wait(1);

    if (developmentChains.includes(network.name)) {
        await moveTime(MIN_DELAY + 1);
        await moveBlocks(VOTING_PERIOD + 1);
    }

    console.log("Executing...");

    const executeTx = await governor.execute(
        [box.address],
        [0],
        [encodedFuncCall],
        descriptionHash
    );

    await executeTx.wait(1);

    const boxNewValue = await box.retrieve();
    console.log(`New Box Value: ${boxNewValue.toString()}`);
}

queueAndExecute()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
