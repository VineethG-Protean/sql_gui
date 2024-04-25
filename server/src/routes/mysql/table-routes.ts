import express, { Request, Response } from "express";
import {
  clientServer_DELETE,
  clientServer_GET,
  clientServer_POST,
  clientServer_PUT,
} from "../../services/mysql-server-services";
import PrivilegeManager from "../../middlewares/privilege-manager";
import TokenValidator from "../../middlewares/token-validator";

const MYSQL_TABLE = express();
MYSQL_TABLE.use(TokenValidator);
MYSQL_TABLE.use(PrivilegeManager);

MYSQL_TABLE.get("/:id", async (req: Request, res: Response) => {
  const dbName = req.query.dbName;
  await clientServer_GET(
    req,
    res,
    `${res.locals.privilege}table&dbName=${dbName}`
  );
});

MYSQL_TABLE.get("/:server_id", async (req: Request, res: Response) => {
  const dbName = req.query.dbName;
  const tableName = req.query.tableName;
  await clientServer_GET(
    req,
    res,
    `${res.locals.privilege}table/schema&dbName=${dbName}&tableName=${tableName}`
  );
});

MYSQL_TABLE.post("/:server_id", async (req: Request, res: Response) => {
  await clientServer_POST(req, res, `${res.locals.privilege}table`);
});

MYSQL_TABLE.post("/delete/:server_id", async (req: Request, res: Response) => {
  await clientServer_POST(req, res, `${res.locals.privilege}table/delete`);
});

MYSQL_TABLE.put("/:server_id", async (req: Request, res: Response) => {
  await clientServer_PUT(req, res, `${res.locals.privilege}table`);
});

export default MYSQL_TABLE;
