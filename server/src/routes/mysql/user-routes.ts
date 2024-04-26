import express, { Request, Response } from "express";
import { clientServer_POST } from "../../services/mysql-server-services";
import PrivilegeManager from "../../middlewares/privilege-manager";
import TokenValidator from "../../middlewares/token-validator";
import VerifyAdmin from "../../middlewares/verify-admin";
import { RESPONSE } from "../../utilities/response";

const MYSQL_USER = express();
MYSQL_USER.use(TokenValidator);
MYSQL_USER.use(VerifyAdmin);
MYSQL_USER.use(PrivilegeManager);

MYSQL_USER.post("/", async (req: Request, res: Response) => {
  const { action } = req.query;
  if (typeof action !== "string")
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  switch (action) {
    case "get":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}user?action=get`
      );
      break;
    case "add":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}user?action=add`
      );
      break;
    case "drop":
      await clientServer_POST(
        req,
        res,
        `${res.locals.privilege}user?action=drop`
      );
      break;
    default:
      return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  }
});

export default MYSQL_USER;
