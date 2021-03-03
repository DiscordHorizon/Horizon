const Discord = require('discord.js');
const { config } = require('./config');
const { members } = require('./include/members');
const { welcome } = require('./include/welcome');
const { userConnection, showTasks, newTask, removeTask } = require('./controller/user');

const bot = new Discord.Client();

//* dynamic presence
let presence = false;
async function botPresence() {
    presence = !presence;
    if(presence === false) {
        await bot.user.setPresence({ activity: { name: `${bot.users.cache.size} membros no servidor.`, type: 1, url: 'https://twitch.tv/bravanzin' }});
    } else {
        await bot.user.setPresence({ activity: { name: `Seja bem vindo ao Horizon`, type: 1, url: 'https://twitch.tv/bravanzin' }});
    }
}
setInterval(botPresence, 7000);

//* bot ready
bot.on('ready', async () => {
    await bot.user.setPresence({ activity: { name: `Seja bem vindo ao Horizon!!`, type: 1, url: 'https://twitch.tv/bravanzin' }});
    members(bot.guilds.cache.get(config.channels.guild));
    console.log('[Bot] Connected');
});

//* member count update
bot.on('guildMemberAdd', user => {
    members(user.guild);
    welcome(user);
});

bot.on('guildMemberRemove', user => {
    members(user.guild);
});

//* voice connection
bot.on('voiceStateUpdate', (oldState, newState) => {
    userConnection(newState);
});

bot.on('message', message => {
    const id = message.channel.id;
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    if (id === config.channels.tasks.tasks) {
        showTasks(message);
    } else if (id === config.channels.tasks.add) {
        newTask(message);
    } else if (id === config.channels.tasks.remove) {
        removeTask(message);
    }
})

bot.login(config.tokens.discord);