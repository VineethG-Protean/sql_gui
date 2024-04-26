import express, { Request, Response } from "express";
import { clientServer_POST } from "../../services/mysql-server-services";
import PrivilegeManager from "../../middlewares/privilege-manager";
import TokenValidator from "../../middlewares/token-validator";
import { RESPONSE } from "../../utilities/response";

const MYSQL_DATABASE = express();
MYSQL_DATABASE.use(TokenValidator);
MYSQL_DATABASE.use(PrivilegeManager);

MYSQL_DATABASE.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string")
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  switch (action) {
    case "get":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}database?action=get`
      );
      break;
    case "schema":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}database?action=schema`
      );
      break;
    case "add":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}database?action=add`
      );
      break;
    case "drop":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}database?action=drop`
      );
      break;
    case "alter":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}database?action=alter`
      );
      break;
    default:
      return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
});

export default MYSQL_DATABASE;
