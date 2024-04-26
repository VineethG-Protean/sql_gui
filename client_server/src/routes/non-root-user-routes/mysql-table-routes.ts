import express, { Request, Response } from "express";
import { RESPONSE } from "@/utilities/response";
import {
  getAllTables,
  getSchema,
  createTable,
  dropTable,
  alterTable,
} from "@/services/non-root-user-services/table-services";

const TABLE = express();

TABLE.post("/", async (req: Request, res: Response) => {
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

export default TABLE;
