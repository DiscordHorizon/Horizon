let config;
try {
    config = require("../../config.json");
} catch (error) {
    config = null;
}

exports.config = {
    tokens: {
        discord: config ? config.discord : process.env.DISCORD_TOKEN,
        mongoUri: config ? config.mongo : process.env.MONGO_URI,
    },
    categorys: {
        valorant: config ? config.categorys.valorant : process.env.P_VALORANT,
        leagueoflegends: config ? config.categorys.leagueoflegends : process.env.P_LEAGUEOFLEGENDS,
        ragnarok : config ? config.categorys.ragnarok : process.env.P_RAGNAROK
    },
    channels: {
        guild: config ? config.channels.guild : process.env.GUILD,
        users: config ? config.channels.users : process.env.USERS,
        welcome: config ? config.channels.welcome : process.env.WELCOME,
        rules: config ? config.channels.rules : process.env.RULES,
        tasks: {
            log: config ? config.channels.tasks.log : process.env.LOG,
            tasks: config ? config.channels.tasks.tasks : process.env.TASKS,
            add: config ? config.channels.tasks.add : process.env.ADD,
            remove: config ? config.channels.tasks.remove : process.env.REMOVE,
        },
    },
    check: {
        rules: config ? config.check.rules : process.env.C_RULES,
        games: {
            valorant: config ? config.games.valorant : process.env.C_VALORANT,
            leagueoflegends: config
                ? config.games.leagueoflegends
                : process.env.C_LEAGUEOFLEGENDS,
            ragnarok: config ? config.games.ragnarok : process.env.C_RAGNAROK,
        },
    }
};
