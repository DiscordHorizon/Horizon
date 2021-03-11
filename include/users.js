const { config } = require('../config');

module.exports = {
    async users(guild) {
        const channel = await guild.channels.cache.get(config.channels.users);
        channel.setName(`Horizon Members: ${guild.memberCount}`);
    }
}