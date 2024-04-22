import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import { serverUtilization } from "./services/server-services";
import ROOT_USER from "./routes/root-user-routes/root-mysql-user-routes";
import ROOT_DB from "./routes/root-user-routes/root-mysql-database-routes";
import ROOT_TABLE from "./routes/root-user-routes/root-mysql-tables-routes";

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

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
