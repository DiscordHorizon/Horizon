const Discord = require("discord.js");
const { discord, guild, tasks } = require('./utils/horizonUtils');
const { users } = require("./include/users");
const {
    showTasks,
    addTask,
    removeTask,
} = require("./controller/user");

require('./server');
require('./database');

const bot = new Discord.Client();

//* dynamic presence
let presence = false;
async function botPresence() {
    presence = !presence;
    if (presence === false) {
        await bot.user.setPresence({
            activity: {
                name: `${bot.guilds.cache.get(guild).memberCount} Horizon Members.`,
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
    users(bot.guilds.cache.get(guild));
    console.log("[Bot] Connected");
});

//* member count update
bot.on("guildMemberAdd", (user) => {
    users(user.guild);
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
    if (id === tasks.tasks) {
        showTasks(message);
    } else if (id === tasks.add) {
        addTask(message);
    } else if (id === tasks.remove) {
        removeTask(message);
    }
});

bot.login(discord);
