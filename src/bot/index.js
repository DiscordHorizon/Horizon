const Discord = require('discord.js');
const bot = new Discord.Client();

let presence = false;

async function botPresence() {
    presence = !presence;
    if(presence === false) {
        await bot.user.setPresence({ activity: { name: `Precisa de ajuda? mande "help" no privado.`, type: 1, url: 'https://twitch.tv/bravanzin' }});
    } else {
        await bot.user.setPresence({ activity: { name: `Seja bem vindo ao Horizon, ${bot.users.cache.size} presentes no servidor!`, type: 1, url: 'https://twitch.tv/bravanzin' }});
    }
}
setInterval(botPresence, 7000);

bot.on('ready', () => {
    console.log('[Bot] Connected');
})

bot.login(process.env.DISCORD_TOKEN);