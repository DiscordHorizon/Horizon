module.exports = {
    async voiceRole(oldState, newState) {
        //* user
        const user = newState.guild.members.cache.get(newState.id);

        //* channels
        const oldChannel = oldState.channelID;
        const newChannel = newState.channelID;

        if (newChannel) {
            const channel = newState.guild.channels.cache.get(newChannel);
            const lastChannel = oldState.guild.channels.channelID.get(
                oldChannel
            );

            //* add voice channel role
            const voiceRole = newState.guild.roles.cache.find(
                (roles) => roles.name === channel.name
            );
            user.roles.add(voiceRole);

            //* remove last voice channel role
            if (oldChannel) {
                const lastVoiceRole = newState.guild.roles.cache.find(
                    (roles) => roles.name === lastChannel.name
                );
                user.roles.remove(lastVoiceRole);
            }

        } else {
            const channel = oldState.guild.channels.cache.get(oldChannel);

            //* remove voice channel role
            const voiceRole = oldState.guild.roles.cache.find(
                (roles) => roles.name === channel.name
            );
            user.roles.remove(voiceRole);
        }
    },
};
