import express, { Request, Response } from "express";
import {
  clientServer_GET,
  clientServer_POST,
} from "../../services/mysql-services/global-services";

const GLOBAL = express();

GLOBAL.get("/:id/users", async (req: Request, res: Response) => {
  await clientServer_GET(req, res, "/global/users");
});

GLOBAL.post("/user", async (req: Request, res: Response) => {
  await clientServer_POST(req, res, "/global/user");
});

GLOBAL.delete("/user", async (req: Request, res: Response) => {
});

GLOBAL.get("/:id/databases", async (req: Request, res: Response) => {
  await clientServer_GET(req,res,"/global/databases")
});

export default GLOBAL;
