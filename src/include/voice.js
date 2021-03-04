const userModel = require('../models');
const { config } = require('../config');
const { findOne } = require('../models/user');

module.exports = {
    async voiceRole(oldState, newState) {
        //* user id
        const user = newState.guild.members.cache.get(newState.id);

        //* channels
        const oldChannel = oldState.channelID;
        const newChannel = newState.channelID;

        //* roles
        const horizon = newState.guild.roles.cache.find(
            roles => roles.name === "Horizon Member"
        );
        const valorant = newState.guild.roles.cache.find(
            roles => roles.name === "Valorant"
        );
        const leagueoflegends = newState.guild.roles.cache.find(
            roles => roles.name === "League of Legends"
        );
        const ragnarok = newState.guild.roles.cache.find(
            roles => roles.name === "Ragnarok"
        );
        

        if(newChannel) {
            const channel = newState.guild.channels.cache.get(newChannel);
            
            //* add voice channel role
            const voiceRole = newState.guild.roles.cache.find(
                roles => roles.name === channel.name
            );
            user.roles.add(voiceRole);

            // * remove Horizon Member role
            user.roles.remove(horizon);

            //* game role
            
            //* valorant
            if (channel.parentID === config.categorys.valorant) {
                user.roles.remove(leagueoflegends);
                user.roles.remove(ragnarok);
            };

            //* league of legends
            if (channel.parentID === config.categorys.leagueoflegends) {
                user.roles.remove(valorant);
                user.roles.remove(ragnarok);
            };

            //* ragnarok
            if (channel.parentID === config.categorys.ragnarok) {
                user.roles.remove(valorant);
                user.roles.remove(leagueoflegends);
            };

        } else {
            const req = await findOne({ id: oldState.id });
            const channel = oldState.guild.channels.cache.get(oldChannel);
            
            //* remove voice channel role
            const voiceRole = oldState.guild.roles.cache.find(
                roles => roles.name === channel.name
            );
            user.roles.remove(voiceRole);

            // * add Horizon Member role
            user.roles.add(horizon);

            //* game role
            
        }
    }
}