const userModel = require("../models/user");
const { MessageEmbed } = require("discord.js");

async function userVerify(userId) {
    const req = await userModel.findOne({ id: userId });

    if (!req) {
        const newUser = new userModel({
            id: userId,
            lastConnection: Date.now(),
            accumulatedTime: 0,
            tasks: Array,
        });
        await newUser.save();
    }

    return (user = await userModel.findOne({ id: userId }));
}

module.exports = {
    async userConnection(state) {
        const user = await userVerify(state.id);
        var time;

        if (state.channelID) {
            await user.updateOne({ lastConnection: Date.now() });
        } else {
            time = Date.now() - user.lastConnection;
            await user.updateOne({
                accumulatedTime: user.accumulatedTime + time,
            });
        }
    },
    async showTasks(message) {
        const channel = message.channel;
        const user = await userVerify(message.author.id);
        message.delete();

        const msg = new MessageEmbed()
            .setTitle(`Lista de afazeres de ${message.author.username}`)
            .setColor("3498DB")
            .setTimestamp(Date.now())
            .setFooter("Horizon", message.client.user.avatarURL());

        if (!user.tasks.length) {
            msg.setDescription("O usuário não tem afazeres pendentes.");
        } else {
            let tasks = [];
            user.tasks.map((task) => (tasks += ` \`*\` ${task}\n`));
            msg.setDescription(tasks);
        }
        channel.send(msg);
    },
    async newTask(message) {
        const log = message.guild.channels.cache.get(process.env.TASKS_LOG);
        const user = await userVerify(message.author.id);

        if (user.tasks.length > 14) {
            log.send(
                `${message.author} sua lista de afazeres está lotada, por gentileza termine um afazer antes de adicionar outro, o limite de afazeres por usuário é 15.`
            );
        } else {
            if (user.tasks.find((task) => task === message.content)) {
                log.send(
                    `${message.author}, afazer: \`${message.content}\` já está na lista de afazeres.`
                );
            } else {
                await user.updateOne({ $push: { tasks: message.content } });
                log.send(
                    `${message.author} adicionou \`${message.content}\` na lista de afazeres.`
                );
            }
        }
    },
    async removeTask(message) {
        const log = message.guild.channels.cache.get(process.env.TASKS_LOG);
        const user = await userVerify(message.author.id);

        if (!user.tasks.length) {
            log.send(`${message.author} Não tem afazeres.`);
        } else {
            if (user.tasks.find((task) => task === message.content)) {
                await user.updateOne({ $pull: { tasks: message.content } });
                log.send(
                    `${message.author} concluiu/removeu \`${message.content}\` da lista de afazeres.`
                );
            } else {
                log.send(
                    `${message.author}, afazer: \`${message.content}\` não está na lista de afazeres.`
                );
            }
        }
    },
};