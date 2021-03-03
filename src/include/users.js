const { config } = require('../config');

module.exports = {
    async members(guild) {
        const channel = await guild.channels.cache.get(config.channels.users);
        channel.setName(`${guild.memberCount} membros`);
    }
}