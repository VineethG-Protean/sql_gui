import express, { Request, Response } from "express";

import {
  getTableData,
  // addTableData,
  alterTableData,
  deleteTableData,
} from "@/services/root-user-services/root-mysql-table-data-services";
import { RESPONSE } from "@/utilities/response";

const ROOT_TABLE_DATA = express();

ROOT_TABLE_DATA.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string") {
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
  switch (action) {
    case "get":
      await getTableData(req, res);
      break;
    case "add":
      // await addTableData(req, res);
      break;
    case "drop":
      await deleteTableData(req, res);
      break;
    case "alter":
      await alterTableData(req, res);
      break;
    default:
      return res.status(409).json(RESPONSE.CONFLICT());
  }
});

export default ROOT_TABLE_DATA;
