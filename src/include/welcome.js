const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

module.exports = {
    async welcome(member) {
        const channel = member.guild.channels.cache.find(channel => channel.id === process.env.WELCOME);
        if (!channel) return;
        
        const canvas = Canvas.createCanvas(1920, 1080);
        const ctx = canvas.getContext('2d');

        // * add fonte
        Canvas.registerFont("src/assets/SansitaSwashed.ttf", { family: 'Sansita Swashed' });

        // * background
        const background = await Canvas.loadImage('./src/assets/background.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // * background dark
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, 1920, 1080);
        ctx.stroke();

        // * sombra
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(50, 50, 1820, 980);
        ctx.stroke();

        // * contorno da foto de perfil
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 60;
        ctx.arc(960, 350, 200, 0, Math.PI * 2, true);
        ctx.stroke();
        
        // * boas vindas e user
        ctx.fillStyle = 'rgb(110,46,255)';
        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 20;
        ctx.textAlign = 'center';
        ctx.font = '110px Sansita Swashed';
        ctx.strokeText("Bem vindo(a) ao Exphare", 960, 750);
        ctx.fillText("Bem vindo(a) ao Exphare", 960, 750);
        ctx.font = '90px Sansita Swashed';
        ctx.strokeText(member.user.tag, 960, 900);
        ctx.fillText(member.user.tag, 960, 900);

        // * foto de perfil
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpeg' }));
        ctx.beginPath();
        ctx.arc(960, 350, 200, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip()
        ctx.drawImage(avatar, 760, 150, 400, 400);

        const attachment = new MessageAttachment(canvas.toBuffer(), "welcome-image.png");

        channel.send(`Bem vindo(a) ao Horizon! ${member.user}, confira o canal <#${process.env.RULES}> para obter mais informações!`, attachment);
    }
}