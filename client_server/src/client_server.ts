import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import 'module-alias/register';

import { serverUtilization } from "@/services/server-services";
import ROOT_USER from "@/routes/root-user-routes/root-mysql-user-routes";
import ROOT_DB from "@/routes/root-user-routes/root-mysql-database-routes";
import ROOT_TABLE from "@/routes/root-user-routes/root-mysql-tables-routes";
import SERVER from "@/routes/server";
import DB from "@/routes/non-root-user-routes/mysql-database-routes";
import TABLE from "@/routes/non-root-user-routes/mysql-table-routes";
import TABLE_DATA from "@/routes/non-root-user-routes/mysql-table-data-routes";
import ROOT_TABLE_DATA from "@/routes/root-user-routes/root-mysql-tables-data-routes";

const app: Express = express();
const port = process.env.SERVER_PORT;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  socket.on("connect", () => {
    console.log("Client connected");
  });

  const cpuInterval = setInterval(async () => {
    const serverStats = await serverUtilization();
    io.emit("server_dispatch", serverStats);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(cpuInterval);
  });
});

app.use("/root/user", ROOT_USER);
app.use("/root/database", ROOT_DB);
app.use("/root/table", ROOT_TABLE);
app.use("/root/table/data", ROOT_TABLE_DATA);

app.use("/server", SERVER);
app.use("/database", DB);
app.use("/table", TABLE);
app.use("/table/data", TABLE_DATA);

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
