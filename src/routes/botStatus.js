import { Router } from "express";
import Bot from "../app";

class HealthCheck {
  constructor() {
    this.router = Router();
  }

  getRoutes() {
    this.router.route("/").get((req, res) => {
      if (Bot.user.presence.status !== "offline") {
        res.status(200).json({ bravanzStatus: Bot.user.presence.status });
      } else {
        res.status(500).json({ bravanzStatus: "offline" });
      }
    });

    return this.router;
  }
}

export const path = "/botstatus";

export const routes = new HealthCheck().getRoutes();
