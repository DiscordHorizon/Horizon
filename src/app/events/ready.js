import { Bot } from "../bot";

/**
 * @param {Bot} client
 */
export const run = async (client) => {
  client.logger.success(`[${client.user.username}] Connection: SUCCESS`);
};

export const name = "ready";
