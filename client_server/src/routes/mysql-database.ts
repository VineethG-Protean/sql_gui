import express, { Request, Response } from "express";
import { alterDatabase, createDatabase, dropDatabase } from "../services/mysql-database-services";

const DATABASE = express();

DATABASE.post("/", async (req: Request, res: Response) => {
    await createDatabase(req, res);
})

DATABASE.delete("/", async (req: Request, res: Response) => {
    await dropDatabase(req, res);
})

DATABASE.put("/", async (req: Request, res: Response) => {
    await alterDatabase(req, res);
})

export default DATABASE;