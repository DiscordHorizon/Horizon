module.exports = {
    async members(guild) {
        const channel = await guild.channels.cache.get(process.env.MEMBERS);
        channel.setName(`${guild.memberCount} membros`);
    }
}