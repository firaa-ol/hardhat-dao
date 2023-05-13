module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
    });

    await delegate(governanceToken.address, deployer);
    log("Delegated!");
};

const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const govToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const tx = await govToken.delegate(delegatedAccount);
    const txReceipt = await tx.wait(1);
    console.log(`Checkpoints ${await govToken.numCheckpoints(delegatedAccount)}`);
    //console.log(txReceipt.events[0].args);
};
