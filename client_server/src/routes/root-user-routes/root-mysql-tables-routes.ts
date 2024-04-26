import express, { Request, Response } from "express";
import {
  alterTable,
  createTable,
  dropTable,
  getAllTables,
  getSchema,
} from "@/services/root-user-services/root-mysql-table-services";
import { RESPONSE } from "@/utilities/response";

const ROOT_TABLE = express();

ROOT_TABLE.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string") {
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
  switch (action) {
    case "get":
      await getAllTables(req, res);
      break;
    case "schema":
      await getSchema(req, res);
      break;
    case "add":
      await createTable(req, res);
      break;
    case "drop":
      await dropTable(req, res);
      break;
    case "alter":
      await alterTable(req, res);
      break;
    default:
      return res.status(409).json(RESPONSE.CONFLICT());
  }
});

export default ROOT_TABLE;
