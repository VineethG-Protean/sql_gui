import express, { Request, Response } from "express";
import tokenValidator from "../../middlewares/token-validator";
import {
  connectServer,
  getStats,
} from "../../services/mysql-services/stats-services";

const STATS = express();
STATS.use(tokenValidator);

STATS.get("/connect/:id", async (req: Request, res: Response) => {
  await connectServer(req, res);
});

STATS.get("/:id", async (req: Request, res: Response) => {
  await getStats(req, res);
});

export default STATS;
