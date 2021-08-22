import { Bot } from "../bot";
import { membersCount } from "../utils";

/**
 * @param {Bot} client
 */
export const run = async (client) => {
  membersCount(client);
};

export const name = "guildMemberAdd";
