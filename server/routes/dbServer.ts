import express, { Request, Response } from "express";
import { dbServerStats } from "../services/dbServerService";

const DB_SERVER = express();

DB_SERVER.get("/stats", async (req: Request, res: Response) => {
  await dbServerStats(req, res);
});

export default DB_SERVER;
