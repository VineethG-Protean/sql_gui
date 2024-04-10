import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";

import AUTH from "./routes/auth";
import ADMIN from "./routes/admin";
import SERVER from "./routes/server";
import USER from "./routes/user";

import { mySqlSource } from "./config/data-source";
import { User } from "./entities/User";
import { encryptPassword } from "./utilities/encryption";

const app: Express = express();
const port = 3000;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mySqlSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use("/api/auth", AUTH);
app.use("/api/admin", ADMIN);
app.use("/api/server", SERVER);
app.use("/api/user", USER);

app.get("/test", async (req: Request, res: Response) => {
  const encryptedPassword = await encryptPassword("admin");
  const user = new User();
  user.email = "admin@gmail.com";
  user.name = "admin";
  user.username = "admin";
  user.password = encryptedPassword;
  user.role = "admin";
  user.is_verified = true;
  user.is_active = true;

  await mySqlSource.getRepository(User).save(user);
  return res.status(201).json({});
});

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
