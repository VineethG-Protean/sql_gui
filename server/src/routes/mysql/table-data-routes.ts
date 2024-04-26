import express, { Request, Response } from "express";
import { clientServer_POST } from "../../services/mysql-server-services";
import PrivilegeManager from "../../middlewares/privilege-manager";
import TokenValidator from "../../middlewares/token-validator";
import { RESPONSE } from "../../utilities/response";

const MYSQL_TABLE_DATA = express();
MYSQL_TABLE_DATA.use(TokenValidator);
MYSQL_TABLE_DATA.use(PrivilegeManager);

MYSQL_TABLE_DATA.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string")
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());

  switch (action) {
    case "get":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table/data?action=get`
      );
      break;
    case "schema":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table/data?action=schema`
      );
      break;
    case "add":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table/data?action=add`
      );
      break;
    case "drop":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table/data?action=drop`
      );
      break;
    case "alter":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table/data?action=alter`
      );
      break;
    default:
      return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
});

export default MYSQL_TABLE_DATA;
