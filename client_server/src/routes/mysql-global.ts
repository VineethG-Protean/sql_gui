import express, { Request, Response } from "express";
import { createMysqlUser, dropMysqlUser, getMysqlDatabases, getMysqlUsers } from "../services/mysql-global-services";

const GLOBAL = express();

GLOBAL.get("/users", async (req: Request, res: Response) => {
    await getMysqlUsers(req, res);
})

GLOBAL.post("/user", async (req: Request, res: Response) => {
    await createMysqlUser(req, res);
})

GLOBAL.delete("/user", async (req: Request, res: Response) => {
    await dropMysqlUser(req, res);
})

GLOBAL.get("/databases", async (req: Request, res: Response) => {
    await getMysqlDatabases(req, res);
})

export default GLOBAL;