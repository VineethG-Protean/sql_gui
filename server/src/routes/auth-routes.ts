import express, { Request, Response } from "express";
import { loginService } from "../services/auth-services";

const AUTH = express();

AUTH.post("/login", async (req: Request, res: Response) => {
  await loginService(req, res);
});

AUTH.get("/verify/:token", async (req: Request, res: Response) => {

})


export default AUTH;
