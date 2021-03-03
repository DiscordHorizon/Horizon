const Discord = require("discord.js");
const { config } = require("./config");
const { users } = require("./include/users");
const { welcome } = require("./include/welcome");
const {
    userConnection,
    showTasks,
    addTask,
    removeTask,
} = require("./controller/user");

const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

//* dynamic presence
let presence = false;
async function botPresence() {
    presence = !presence;
    if (presence === false) {
        await bot.user.setPresence({
            activity: {
                name: `${bot.users.cache.size} membros no servidor.`,
                type: 1,
                url: "https://twitch.tv/bravanzin",
            },
        });
    } else {
        await bot.user.setPresence({
            activity: {
                name: `Seja bem vindo ao Horizon`,
                type: 1,
                url: "https://twitch.tv/bravanzin",
            },
        });
    }
}
setInterval(botPresence, 7000);

//* bot ready
bot.on("ready", async () => {
    await bot.user.setPresence({
        activity: {
            name: `Seja bem vindo ao Horizon!!`,
            type: 1,
            url: "https://twitch.tv/bravanzin",
        },
    });
    users(bot.guilds.cache.get(config.channels.guild));
    console.log("[Bot] Connected");
});

//* member count update
bot.on("guildMemberAdd", (user) => {
    users(user.guild);
    welcome(user);
});

bot.on("guildMemberRemove", (user) => {
    users(user.guild);
});

//* voice connection
bot.on("voiceStateUpdate", (oldState, newState) => {
    userConnection(newState);
});

//* messages
bot.on("message", (message) => {
    const id = message.channel.id;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    //* tasks
    if (id === config.channels.tasks.tasks) {
        showTasks(message);
    } else if (id === config.channels.tasks.add) {
        addTask(message);
    } else if (id === config.channels.tasks.remove) {
        removeTask(message);
    }
});

//* reaction role check
bot.on("messageReactionAdd", async (reaction, user) => {
    const id = reaction.message.id;
    const roles = reaction.message.guild.roles.cache;
    const members = reaction.message.guild.members.cache;

    if (reaction.partial) await reaction.fetch();

    //* "Horizon" role
    if (id === config.check.rules) {
        const role = roles.find((role) => role.name === "Horizon member");
        members.get(user.id).roles.add(role);
    };
    //* "Valorant" role
    if (id === config.check.games.valorant) {
        const role = roles.find((role) => role.name === "Valorant");
        members.get(user.id).roles.add(role);
    }
    //* "League of Legends" role
    if (id === config.check.games.leagueoflegends) {
        const role = roles.find((role) => role.name === "League of Legends");
        members.get(user.id).roles.add(role);
    }
    //* "Ragnarok" role
    if (id === config.check.games.ragnarok) {
        const role = roles.find((role) => role.name === "Ragnarok");
        members.get(user.id).roles.add(role);
    }
});

bot.on("messageReactionRemove", async (reaction, user) => {
    const roles = reaction.message.guild.roles.cache;
    const members = reaction.message.guild.members.cache;

    if (reaction.partial) await reaction.fetch();

    //* remove "Horizon" role
    if (reaction.message.id === config.check.rules) {
        const role = roles.find((role) => role.name === "Horizon member");
        members.get(user.id).roles.remove(role);
    }
});

bot.login(config.tokens.discord);
