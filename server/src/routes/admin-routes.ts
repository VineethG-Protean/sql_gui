import express, { Request, Response } from "express";

import TokenValidator from "../middlewares/token-validator";
import VerifyAdmin from "../middlewares/verify-admin";

import {
  addServer,
  deleteServer,
  deleteUser,
  getAllUsers,
  inviteUser,
  updateServer,
  updateUser,
} from "../services/admin-services";

const ADMIN = express();
ADMIN.use(TokenValidator);
ADMIN.use(VerifyAdmin);

ADMIN.get("/users", async (req: Request, res: Response) => {
  await getAllUsers(req, res);
});

ADMIN.post("/user/invite", async (req: Request, res: Response) => {
  await inviteUser(req, res);
});

ADMIN.put("/user", async (req: Request, res: Response) => {
  await updateUser(req, res);
});

ADMIN.delete("/user/:id", async (req: Request, res: Response) => {
  await deleteUser(req, res);
});

ADMIN.post("/server", async (req: Request, res: Response) => {
  await addServer(req, res);
});

ADMIN.put("/server", async (req: Request, res: Response) => {
  await updateServer(req, res);
});

ADMIN.delete("/server/:id", async (req: Request, res: Response) => {
  await deleteServer(req, res);
});

export default ADMIN;
