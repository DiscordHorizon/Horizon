import { Client, Intents, ClientOptions } from "discord.js";

export class Bot extends Client {
  /**
   * @param {ClientOptions} options
   */
  constructor(options) {
    super(options);
  }

  /**
   * @param {string} token
   */
  async start(token) {
    this.login(token);
  }
}

export default new Bot({ intents: [Intents.FLAGS.GUILDS] });
