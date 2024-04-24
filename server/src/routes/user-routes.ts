import express, { Request, Response } from "express";

import { getAllServers, getUserProfile } from "../services/user-services";
import TokenValidator from "../middlewares/token-validator";

const USER = express();
USER.use(TokenValidator);

USER.get("/", async (req: Request, res: Response) => {
  await getUserProfile(req, res);
});

USER.get("/servers", async (req: Request, res: Response) => {
  await getAllServers(req, res);
});

export default USER;
