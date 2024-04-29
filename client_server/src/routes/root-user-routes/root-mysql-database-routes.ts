import express, { Request, Response } from "express";
import {
  alterMysqlDatabase,
  createMysqlDatabase,
  dropMysqlDatabase,
  getMysqlDatabase,
  getMysqlDatabases,
  getMysqlDatabaseUsers,
} from "@/services/root-user-services/root-mysql-database-services";
import { RESPONSE } from "@/utilities/response";

const ROOT_DB = express();

ROOT_DB.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string") {
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
  switch (action) {
    case "get":
      await getMysqlDatabases(req, res);
      break;
    case "schema":
      await getMysqlDatabase(req, res);
      break;
    case "users":
      await getMysqlDatabaseUsers(req, res);
      break;
    case "add":
      await createMysqlDatabase(req, res);
      break;
    case "drop":
      await dropMysqlDatabase(req, res);
      break;
    case "alter":
      await alterMysqlDatabase(req, res);
      break;
    default:
      return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
});

export default ROOT_DB;
