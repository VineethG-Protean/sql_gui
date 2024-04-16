import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import { serverUtilization } from "./services/server-services";
import USER from "./routes/root-user-routes/mysql-user-routes";
import DB from "./routes/root-user-routes/mysql-database-routes";
import TABLE from "./routes/root-user-routes/mysql-tables-routes";

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
  console.log("Client disconnected");
  const cpuInterval = setInterval(async () => {
    const serverStats = await serverUtilization();
    io.emit("server_dispatch", serverStats);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(cpuInterval);
  });
});

app.use("/root/user", USER);
app.use("/root/database", DB);
app.use("/root/table", TABLE);

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
