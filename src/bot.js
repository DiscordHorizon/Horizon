const Discord = require("discord.js");
const { config } = require("./config");
const { users } = require("./include/users");
const { voiceRole } = require("./include/voice");
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
                name: `${bot.guilds.cache.get(config.channels.guild).memberCount} Horizon Members.`,
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

bot.login(config.tokens.discord);
