import express, { Request, Response } from "express";
import {
  clientServer_DELETE,
  clientServer_GET,
  clientServer_POST,
  clientServer_PUT,
} from "../../services/mysql-server-services";
import PrivilegeManager from "../../middlewares/privilege-manager";
import TokenValidator from "../../middlewares/token-validator";

const MYSQL_DATABASE = express();
MYSQL_DATABASE.use(TokenValidator);
MYSQL_DATABASE.use(PrivilegeManager);

MYSQL_DATABASE.get("/:server_id", async (req: Request, res: Response) => {
  await clientServer_GET(req, res, `${res.locals.privilege}database`);
});

MYSQL_DATABASE.get("/:server_id/schema", async (req: Request, res: Response) => {
  const dbName = req.query.dbName;
  await clientServer_GET(
    req,
    res,
    `${res.locals.privilege}database/schema?dbName=${dbName}`
  );
});

MYSQL_DATABASE.post("/:server_id", async (req: Request, res: Response) => {
  await clientServer_POST(req, res, `${res.locals.privilege}database`);
});

MYSQL_DATABASE.delete("/:server_id", async (req: Request, res: Response) => {
  const dbName = req.query.dbName;
  await clientServer_DELETE(
    req,
    res,
    `${res.locals.privilege}database/drop?dbName=${dbName}`
  );
});

MYSQL_DATABASE.put("/:server_id", async (req: Request, res: Response) => {
  await clientServer_PUT(req, res, `${res.locals.privilege}database`);
});

export default MYSQL_DATABASE;
