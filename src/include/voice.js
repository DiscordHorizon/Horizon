module.exports = {
    async voiceRole(oldState, newState) {
        const userId = newState.id;
        const oldChannel = oldState.channelID
        const newChannel = newState.channelID;

        if(newChannel) {
            const channel = newState.guild.channels.cache.get(newChannel);
            const voiceRole = newChannel.guild.roles.cache.find(
                roles => roles.name === channel.name
            );
            state.guild.members.cache.get(userId).roles.add(voiceRole);
        } else {
            const channel = oldState.guild.channels.cache.get(oldChannel);
            const voiceRole = oldState.guild.roles.cache.find(
                roles => roles.name === channel.name
            );
            state.guild.members.cache.get(userId).roles.add(voiceRole);
        }
    }
}