import express, { Request, Response } from "express";
import {
  createMysqlUser,
  dropMysqlUser,
  getMysqlUsers,
} from "@/services/root-user-services/root-mysql-user-services";
import { RESPONSE } from "@/utilities/response";

const ROOT_USER = express();

ROOT_USER.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string") {
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
  switch (action) {
    case "get":
      await getMysqlUsers(req, res);
      break;
    case "add":
      await createMysqlUser(req, res);
      break;
    case "drop":
      await dropMysqlUser(req, res);
      break;
    default:
      return res.status(409).json(RESPONSE.CONFLICT());
  }
});

export default ROOT_USER;
