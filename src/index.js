import Bot from "./app";
import Server from "./server";
import { config as setEnvs } from "dotenv";
setEnvs();

const token = String(process.env.DISCORD_TOKEN);
const port = parseInt(process.env.PORT);

Bot.start(token);
Server.start(port);
