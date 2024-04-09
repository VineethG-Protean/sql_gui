import express, { Request, Response } from "express";
import tokenValidator from "../middlewares/token-validator";
import { getAllServers, getUserProfile } from "../services/user-services";

const USER = express();
USER.use(tokenValidator);

USER.get("/", async (req: Request, res: Response) => {
    await getUserProfile(req, res);
})

USER.get("/servers", async (req: Request, res: Response) => {
    await getAllServers(req, res);
})


export default USER;

