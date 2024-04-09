import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import AUTH from "./routes/auth";
import ADMIN from "./routes/admin";
import SERVER from "./routes/server";
import USER from "./routes/user";

import { mySqlSource } from "./config/data-source";

const app: Express = express();
const port = 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

mySqlSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization:", err)
  })

io.on("connection", (socket) => {

  // const cpuInterval = setInterval(async() => {
  //   const serverStats = await serverUtilization();
  //   io.emit("server_dispatch", serverStats);
  // }, 2000);

  // socket.on("disconnect", () => {
  //   console.log("Client disconnected");
  //   clearInterval(cpuInterval);
  // });
});


app.use("/api/auth", AUTH);
app.use("/api/admin", ADMIN)
app.use("/api/server", SERVER);
app.use("/api/user", USER);

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
