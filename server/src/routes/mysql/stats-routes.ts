import express, { Request, Response } from "express";
import { clientServer_GET } from "../../services/mysql-server-services";
import TokenValidator from "../../middlewares/token-validator";

const STATS = express();
STATS.use(TokenValidator);

STATS.get("/connect/:id", async (req: Request, res: Response) => {
  await clientServer_GET(req, res, "/server/connect");
});

STATS.get("/:id", async (req: Request, res: Response) => {
  await clientServer_GET(req, res, "/server/stats");
});

export default STATS;
