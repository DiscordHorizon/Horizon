import { Client, Intents, ClientOptions, Collection } from "discord.js";
import consola from "consola";
import { promisify } from "util";
import glob from "glob";

const globPromise = promisify(glob);

export class Bot extends Client {
  logger = consola;
  events = new Collection();
  commands = new Collection();

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

    const eventFiles = await globPromise(`${__dirname}/events/*.js`);
    eventFiles.forEach(async (eventFile) => {
      const file = await import(eventFile);
      this.events.set(file.name, file);
      this.on(file.name, file.run.bind(null, this));
    });

    const commandFiles = await globPromise(`${__dirname}/commands/*.js`);
    commandFiles.forEach(async (commandFile) => {
      const file = await import(commandFile);
      this.commands.set(file.name, file);
    });
  }
}

export default new Bot({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
