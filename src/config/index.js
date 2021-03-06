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
    roles: {
        heaven: config ? config.roles.heaven : process.env.R_HEAVEN,
        clouds: config ? config.roles.clouds : process.env.R_CLOUDS,
        snow: config ? config.roles.snow : process.env.R_SNOW,
        icePeaks: config ? config.roles.icePeaks : process.env.R_ICE_PEAKS,
        fishs: config ? config.roles.fishs : process.env.R_FISHS,
        seas: config ? config.roles.seas : process.env.R_SEAS,
        lights: config ? config.roles.lights : process.env.R_LIGHTS,
        rainbows: config ? config.roles.rainbows : process.env.R_RAINBOWS,
        vulcans: config ? config.roles.vulcans : process.env.R_VULCANS,
        shinyStones: config ? config.roles.shinyStones : process.env.R_SHINY_STONES,
        stones: config ? config.roles.stones : process.env.R_STONES,
        rivers: config ? config.roles.rivers : process.env.R_RIVERS,
        flowers: config ? config.roles.flowers : process.env.R_FLOWERS,
        trees: config ? config.roles.trees : process.env.R_TREES,
        arriving: config ? config.roles.arriving : process.env.R_ARRIVING,
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
        tasks: config ? config.check.tasks : process.env.C_TASKS,
        games: {
            valorant: config ? config.games.valorant : process.env.C_VALORANT,
            leagueoflegends: config
                ? config.games.leagueoflegends
                : process.env.C_LEAGUEOFLEGENDS,
            ragnarok: config ? config.games.ragnarok : process.env.C_RAGNAROK,
        },
    }
};
