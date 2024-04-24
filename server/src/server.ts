import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import AUTH from "./routes/auth-routes";
import ADMIN from "./routes/admin-routes";
import USER from "./routes/user-routes";
import STATS from "./routes/mysql/stats-routes";
import MYSQL_USER from "./routes/mysql/user-routes";

import { mySqlSource } from "./config/data-source";
import { User } from "./entities/User";
import { encryptPassword } from "./utilities/encryption";
import MYSQL_DATABASE from "./routes/mysql/database-routes";
import MYSQL_TABLE from "./routes/mysql/table-routes";

const app: Express = express();
const port = process.env.SERVER_PORT;
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

app.use("/auth", AUTH);
app.use("/admin", ADMIN);
app.use("/user", USER);
app.use("/mysql/stats", STATS);
app.use("/mysql/user", MYSQL_USER);
app.use("/mysql/database", MYSQL_DATABASE);
app.use("/mysql/table", MYSQL_TABLE);

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
