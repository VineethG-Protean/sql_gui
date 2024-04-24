import express, { Request, Response } from "express";
import {
  alterMysqlDatabase,
  createMysqlDatabase,
  dropMysqlDatabase,
  getMysqlDatabaseInfo,
  getMysqlDatabases,
} from "../../services/root-user-services/root-database-services";

const ROOT_DB = express();

ROOT_DB.get("/", async (req: Request, res: Response) => {
  await getMysqlDatabases(req, res);
});

ROOT_DB.get("/schema", async (req: Request, res: Response) => {
  await getMysqlDatabaseInfo(req, res);
});

ROOT_DB.post("/", async (req: Request, res: Response) => {
  await createMysqlDatabase(req, res);
});

ROOT_DB.delete("/drop", async (req: Request, res: Response) => {
  await dropMysqlDatabase(req, res);
});

ROOT_DB.put("/", async (req: Request, res: Response) => {
  await alterMysqlDatabase(req, res);
});

export default ROOT_DB;
