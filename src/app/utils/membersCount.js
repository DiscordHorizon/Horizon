import { Bot } from "../bot";
import { GuildChannel } from "discord.js";
import { config as setEnvs } from "dotenv";
setEnvs();

const countChannel = String(process.env.COUNT_CHANNEL);
const guildId = String(process.env.GUILD_ID);
/**
 * @param {Bot} client
 */
export const membersCount = (client) => {
  const count = client.guilds.cache.get(guildId).memberCount;
  const channel = new GuildChannel(guildId, { id: countChannel, type: "2" }, client);

  channel.setName(`${count} members`);
};
