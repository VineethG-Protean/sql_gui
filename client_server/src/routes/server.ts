import express, { Request, Response } from "express";
import {
  mysqlCollatAndCharSet,
  mySqlServerStats,
} from "@/services/server-services";

const SERVER = express();

SERVER.post("/connect", async (_: Request, res: Response) => {
  res.status(200).json({});
});

SERVER.post("/stats", async (req: Request, res: Response) => {
  await mySqlServerStats(req, res);
});

SERVER.post("/charset", async (req: Request, res: Response) => {
  await mysqlCollatAndCharSet(req, res);
});
export default SERVER;
