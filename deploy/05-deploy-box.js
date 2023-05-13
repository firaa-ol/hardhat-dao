module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    });

    log("Transfering ownership of Box to TimeLock");

    const timeLock = await ethers.getContract("TimeLock");
    const boxContract = await ethers.getContractAt("Box", box.address);
    const transferOwnerTx = await boxContract.transferOwnership(timeLock.address);
    await transferOwnerTx.wait(1);
};
