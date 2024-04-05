import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import { serverUtilization } from "./services/dbServerService";

import AUTH from "./routes/auth";
import DB_SERVER from "./routes/dbServer";

const app: Express = express();
const port = 3001;
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
  emitServerStats();

  const cpuInterval = setInterval(() => {
    emitServerStats();
  }, 2000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(cpuInterval);
  });
});

async function emitServerStats() {
  try {
    const serverStats = await serverUtilization();
    io.emit("server_dispatch", serverStats);
  } catch (error) {}
}

app.use("/api/auth", AUTH);
app.use("/api/db_server", DB_SERVER);

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
