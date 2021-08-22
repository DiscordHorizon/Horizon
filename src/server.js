import express from "express";
import consola from "consola";
import cors from "cors";
import { promisify } from "util";
import glob from "glob";
import { config as setEnvs } from "dotenv";
setEnvs();

const globPromise = promisify(glob);

class Server {
  logger = consola;

  constructor() {
    this.server = express();
    this.server.use(cors());
  }

  /**
   * @param {number} port
   */
  async start(port) {
    const routeFiles = await globPromise(`${__dirname}/routes/*.js`);
    routeFiles.forEach(async (routeFile) => {
      const route = await import(routeFile);
      this.server.use(route.path, route.routes);
    });

    this.server.listen(port, () => this.logger.success("[SERVER] Connection: SUCCESS"));
  }
}

export default new Server();
