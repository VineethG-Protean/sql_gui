import express, { Request, Response } from "express";
import {
  mySqlServerStats
} from "@/services/server-services";

const SERVER = express();

SERVER.post("/connect", async (_: Request, res: Response) => {
  res.status(200).json({});
});

SERVER.post("/stats", async (req: Request, res: Response) => {
  await mySqlServerStats(req, res);
});

export default SERVER;
