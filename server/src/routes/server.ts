import express, { Request, Response } from "express";
import tokenValidator from "../middlewares/token-validator";
import { connectServer, executeQuery, getStats } from "../services/server-service";

const SERVER = express();
SERVER.use(tokenValidator);

SERVER.get("/connect/:id", async (req: Request, res: Response) => {
  await connectServer(req, res);
});

SERVER.get("/stats/:id", async (req: Request, res: Response) => {
  await getStats(req, res);
})

SERVER.post("/query", async (req: Request, res: Response) => {
  await executeQuery(req, res);
})


export default SERVER;
