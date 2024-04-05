import express, { Request, Response } from "express";
import { loginService } from "../services/authService";

const AUTH = express();

AUTH.post("/login", async (req: Request, res: Response) => {
  await loginService(req, res);
});

AUTH.post("/register", async (req: Request, res: Response) => {});

AUTH.post("/verify", async (req: Request, res: Response) => {});

export default AUTH;
