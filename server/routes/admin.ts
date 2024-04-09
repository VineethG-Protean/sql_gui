import express, { Request, Response } from "express";

import tokenValidator from "../middlewares/token-validator";
import verifyAdmin from "../middlewares/verify-admin";

import { addServer, deleteServer, getAllUsers, inviteUser, updateServer } from "../services/admin-service";

const ADMIN = express();
ADMIN.use(tokenValidator);
ADMIN.use(verifyAdmin);

ADMIN.get("/users", async (req: Request, res: Response) => {
    await getAllUsers(req, res);
})

ADMIN.post("/user/invite", async (req: Request, res: Response) => {
    await inviteUser(req, res);
});

ADMIN.put("/user", async (req: Request, res: Response) => {

})

ADMIN.delete("/user/:id", async (req: Request, res: Response) => {

})


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