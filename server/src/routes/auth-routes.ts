import express, { Request, Response } from "express";
import { loginService } from "../services/auth-services";

const AUTH = express();

AUTH.post("/login", async (req: Request, res: Response) => {
  await loginService(req, res);
});

AUTH.get("/verify", async (req: Request, res: Response) => {
  const token = req.query.token;
});

export default AUTH;
