import express, { Request, Response } from "express";
import {
  alterMysqlDatabase,
  createMysqlDatabase,
  dropMysqlDatabase,
  getMysqlDatabaseInfo,
  getMysqlDatabases,
} from "../../services/root-services/database-services";

const DB = express();

DB.get("/", async (req: Request, res: Response) => {
  await getMysqlDatabases(req, res);
});

DB.get("/info", async (req: Request, res: Response) => {
  await getMysqlDatabaseInfo(req, res);
});

DB.post("/", async (req: Request, res: Response) => {
  await createMysqlDatabase(req, res);
});

DB.delete("/:id", async (req: Request, res: Response) => {
  await dropMysqlDatabase(req, res);
});

DB.put("/", async (req: Request, res: Response) => {
  await alterMysqlDatabase(req, res);
});

export default DB;
