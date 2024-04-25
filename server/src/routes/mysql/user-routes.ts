import express, { Request, Response } from "express";
import {
  clientServer_DELETE,
  clientServer_GET,
  clientServer_POST,
} from "../../services/mysql-server-services";
import PrivilegeManager from "../../middlewares/privilege-manager";
import TokenValidator from "../../middlewares/token-validator";
import VerifyAdmin from "../../middlewares/verify-admin";

const MYSQL_USER = express();
MYSQL_USER.use(TokenValidator);
MYSQL_USER.use(VerifyAdmin);
MYSQL_USER.use(PrivilegeManager);

MYSQL_USER.get("/:server_id", async (req: Request, res: Response) => {
  await clientServer_GET(req, res, `${res.locals.privilege}user`);
});

MYSQL_USER.post("/:server_id", async (req: Request, res: Response) => {
  await clientServer_POST(req, res, `${res.locals.privilege}user`);
});

MYSQL_USER.post("/:server_id", async (req: Request, res: Response) => {
  await clientServer_POST(req, res, `${res.locals.privilege}user'/delete`);
});

export default MYSQL_USER;
