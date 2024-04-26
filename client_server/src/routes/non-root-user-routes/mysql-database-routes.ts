import express, { Request, Response } from "express";
import { RESPONSE } from "@/utilities/response";
import {
  getMysqlDatabases,
  getMysqlDatabaseInfo,
  createMysqlDatabase,
  dropMysqlDatabase,
  alterMysqlDatabase,
} from "@/services/non-root-user-services/database-services";

const DB = express();

DB.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string") {
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
  switch (action) {
    case "get":
      await getMysqlDatabases(req, res);
      break;
    case "schema":
      await getMysqlDatabaseInfo(req, res);
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

export default DB;
