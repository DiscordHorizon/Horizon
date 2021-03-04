const userModel = require("../models/user");
const { config } = require("../config");

module.exports = {
    async voiceRole(oldState, newState) {
        //* user
        const req = await userModel.findOne({ id: oldState.id });
        const user = newState.guild.members.cache.get(newState.id);

        //* channels
        const oldChannel = oldState.channelID;
        const newChannel = newState.channelID;

        //* roles
        const horizon = newState.guild.roles.cache.find(
            (roles) => roles.name === "Horizon Member"
        );
        const valorant = newState.guild.roles.cache.find(
            (roles) => roles.name === "Valorant"
        );
        const leagueoflegends = newState.guild.roles.cache.find(
            (roles) => roles.name === "League of Legends"
        );
        const ragnarok = newState.guild.roles.cache.find(
            (roles) => roles.name === "Ragnarok"
        );

        if (newChannel) {
            const channel = newState.guild.channels.cache.get(newChannel);

            //* add voice channel role
            const voiceRole = newState.guild.roles.cache.find(
                (roles) => roles.name === channel.name
            );
            user.roles.add(voiceRole);

            // * remove roles
            user.roles.remove(horizon);
            user.roles.remove(valorant);
            user.roles.remove(leagueoflegends);
            user.roles.remove(ragnarok);

        } else {
            const channel = oldState.guild.channels.cache.get(oldChannel);

            //* remove voice channel role
            const voiceRole = oldState.guild.roles.cache.find(
                (roles) => roles.name === channel.name
            );
            user.roles.remove(voiceRole);

            // * add Horizon Member role
            user.roles.add(horizon);

            //* game role
            req.games.forEach((game) => {
                const role = oldState.guild.roles.cache.find(
                    (roles) => roles.name === game
                );
                user.roles.add(role);
            });
        }
    },
};
