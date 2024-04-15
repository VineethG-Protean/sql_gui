import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();

import { serverUtilization } from "./services/server-services";
import SERVER from "./routes/server";
import GLOBAL from "./routes/mysql-global";
import DATABASE from "./routes/mysql-database";
import TABLE from "./routes/mysl-table";

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

app.use("/server", SERVER);
app.use("/mysql/global", GLOBAL);
app.use("/mysql/database", DATABASE);
app.use("/mysql/table", TABLE);

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
