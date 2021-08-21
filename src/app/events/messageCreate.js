import { Bot } from "../bot";
import { Message } from "discord.js";
import { config as setEnvs } from "dotenv";
setEnvs();

const prefix = ";";

/**
 * @param {Bot} client
 * @param {Message} message
 */
export const run = async (client, message) => {
  if (message.author.bot || message.channel.type === "dm" || !message.guild) return;

  try {
    const arg = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = String(arg.shift());
    const command =
      client.commands.get(cmd) ||
      client.commands.find(
        (commandFile) => commandFile.aliases && commandFile.aliases.includes(cmd)
      );

    if (!command) return;

    let args;

    arg.forEach((thisArg) => {
      if (!args) {
        args = thisArg;
        return;
      }
      args += ` ${thisArg}`;
    });

    command.run(client, message);
  } catch (error) {
    client.logger.error(error);
    message.channel.send({ content: `An error came: ${error}` });
  }
};

export const name = "messageCreate";
