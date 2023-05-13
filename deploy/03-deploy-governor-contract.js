const { VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } = require("../helper-hardhat-config");

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();

    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock");

    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE,
        ],
        log: true,
    });
};
