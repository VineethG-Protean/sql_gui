import express, { Request, Response } from "express";
import {
  createMysqlUser,
  getMysqlUsers,
  getServerStats,
} from "../services/server-services";

const SERVER = express();

SERVER.get("/connect", async (req: Request, res: Response) => {
  res.status(200).json({});
});

SERVER.get("/stats", async (req: Request, res: Response) => {
  await getServerStats(req, res);
});

SERVER.get("/users", async (req: Request, res: Response) => {
  await getMysqlUsers(req, res);
});

SERVER.post("/users/create", async (req: Request, res: Response) => {
  await createMysqlUser(req, res);
});
export default SERVER;
