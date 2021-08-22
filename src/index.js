import Bot from "./app";
import { config as setEnvs } from "dotenv";
setEnvs();

const token = String(process.env.DISCORD_TOKEN);

Bot.start(token);
