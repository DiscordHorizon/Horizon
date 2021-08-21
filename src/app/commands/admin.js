import { Bot } from "../bot";
import { Message } from "discord.js";

const adminId = String(process.env.ADMIN_ID);

/**
 * @param {Bot} client
 * @param {Message} message
 */
export const run = async (client, message) => {
  if (message.author.id !== adminId) return;

  const adminRole = message.guild.roles.cache.find((role) => role.name === "Admin");

  let toggle;
  if (message.member.roles.cache.has(adminRole.id)) {
    message.member.roles.remove(adminRole.id);
    toggle = false;
  } else {
    message.member.roles.add(adminRole.id);
    toggle = true;
  }

  await message.delete();
  const msg = await message.reply({ content: toggle ? "Added admin role" : "Removed admin role" });
  setTimeout(() => msg.delete(), 3000);
};

export const name = "admin";

export const aliases = [];
