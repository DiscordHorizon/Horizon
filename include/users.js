const { users } = require('../utils/horizonUtils');

module.exports = {
    async users(guild) {
        const channel = await guild.channels.cache.get(users);
        channel.setName(`Horizon Members: ${guild.memberCount}`);
    }
}