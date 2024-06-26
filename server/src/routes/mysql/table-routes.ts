import express, { Request, Response } from "express";
import { clientServer_POST } from "../../services/mysql-server-services";
import PrivilegeManager from "../../middlewares/privilege-manager";
import TokenValidator from "../../middlewares/token-validator";
import { RESPONSE } from "../../utilities/response";

const MYSQL_TABLE = express();
MYSQL_TABLE.use(TokenValidator);
MYSQL_TABLE.use(PrivilegeManager);

MYSQL_TABLE.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string")
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());

  switch (action) {
    case "get":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table?action=get`
      );
      break;
    case "schema":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table?action=schema`
      );
      break;
    case "add":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table?action=add`
      );
      break;
    case "drop":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table?action=drop`
      );
      break;
    case "alter":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}table?action=alter`
      );
      break;
    default:
      return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
});

export default MYSQL_TABLE;
