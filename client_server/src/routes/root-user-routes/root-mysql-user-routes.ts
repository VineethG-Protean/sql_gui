import express, { Request, Response } from "express";
import {
  createMysqlUser,
  dropMysqlUser,
  getMysqlUsers,
} from "../../services/root-user-services/root-user-services";

const ROOT_USER = express();

ROOT_USER.get("/users", async (req: Request, res: Response) => {
  await getMysqlUsers(req, res);
});

ROOT_USER.post("/user", async (req: Request, res: Response) => {
  await createMysqlUser(req, res);
});

ROOT_USER.delete("/user", async (req: Request, res: Response) => {
  await dropMysqlUser(req, res);
});

export default ROOT_USER;
