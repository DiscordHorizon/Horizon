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
        tasks: config ? config.check.tasks : process.env.C_TASKS,
        games: {
            valorant: config ? config.games.valorant : process.env.C_VALORANT,
            leagueoflegends: config
            ? config.games.leagueoflegends
            : process.env.C_LEAGUEOFLEGENDS,
            ragnarok: config ? config.games.ragnarok : process.env.C_RAGNAROK,
        },
    },
    roles: [
        arriving = {
            level: 1,
            id: config ? config.roles.arriving : process.env.R_ARRIVING,
        },
        trees = {
            level: 6,
            id: config ? config.roles.trees : process.env.R_TREES,
        },
        flowers = {
            level: 16,
            id: config ? config.roles.flowers : process.env.R_FLOWERS,
        },
        rivers = {
            level: 26,
            id: config ? config.roles.rivers : process.env.R_RIVERS,
        },
        stones = {
            level: 36,
            id: config ? config.roles.stones : process.env.R_STONES,
        },
        shinyStones = {
            level: 46,
            id: config ? config.roles.shinyStones : process.env.R_SHINY_STONES,
        },
        vulcans = {
            level: 56,
            id: config ? config.roles.vulcans : process.env.R_VULCANS,
        },
        rainbows = {
            level: 66,
            id: config ? config.roles.rainbows : process.env.R_RAINBOWS,
        },
        lights = {
            level: 71,
            id: config ? config.roles.lights : process.env.R_LIGHTS,
        },
        seas = {
            level: 76,
            id: config ? config.roles.seas : process.env.R_SEAS,
        },
        fishs = {
            level: 81,
            id: config ? config.roles.fishs : process.env.R_FISHS,
        },
        icePeaks = {
            level: 86,
            id: config ? config.roles.icePeaks : process.env.R_ICE_PEAKS,
        },
        snow = {
            level: 91,
            id: config ? config.roles.snow : process.env.R_SNOW,
        },
        clouds = {
            level: 96,
            id: config ? config.roles.clouds : process.env.R_CLOUDS,
        },
        heaven = {
            level: 99,
            id: config ? config.roles.heaven : process.env.R_HEAVEN,
        },
    ],
};
