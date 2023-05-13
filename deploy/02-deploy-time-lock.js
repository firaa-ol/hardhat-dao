const { MIN_DELAY } = require("../helper-hardhat-config");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
    });
};
