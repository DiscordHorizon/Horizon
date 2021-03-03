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
            valorant: config ? config.games.valorant : process.env.VALORANT,
            leagueoflegends: config
                ? config.games.leagueoflegends
                : process.env.LEAGUEOFLEGENDS,
            ragnarok: config ? config.games.ragnarok : process.env.RAGNAROK,
        },
    },
};
