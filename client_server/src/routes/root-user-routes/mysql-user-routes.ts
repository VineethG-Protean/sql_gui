import express, { Request, Response } from "express";
import {
  createMysqlUser,
  dropMysqlUser,
  getMysqlUsers,
} from "../../services/root-services/user-services";

const USER = express();

USER.get("/users", async (req: Request, res: Response) => {
  await getMysqlUsers(req, res);
});

USER.post("/user", async (req: Request, res: Response) => {
  await createMysqlUser(req, res);
});

USER.delete("/user", async (req: Request, res: Response) => {
  await dropMysqlUser(req, res);
});

export default USER;
