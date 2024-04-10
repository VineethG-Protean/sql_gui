import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import { serverUtilization } from "./services/server-services";
import SERVER from "./routes/server";

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
  const cpuInterval = setInterval(async () => {
    const serverStats = await serverUtilization();
    io.emit("server_dispatch", serverStats);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(cpuInterval);
  });
});

app.use("/", SERVER);

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
