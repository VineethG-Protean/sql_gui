import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";

import { connect } from "./config/db-connection";
import { executeUnsafeCommands } from "./utilities/execute-commands";
import { serverUtilization } from "./services/server-system";

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

  setInterval(() => {
    emitServerStats();
  }, 10000);
});

function emitServerStats() {
  const serverStats = serverUtilization();
  io.emit("server_dispatch", serverStats);
}

app.get("/", async (req: Request, res: Response) => {
  const connection = await connect();
  const [UPTIME]: any = await connection.query("SHOW STATUS LIKE 'Uptime';");
  const [VERSION]: any = await connection.query("SELECT VERSION()");
  const [SIZE]: any = await connection.query(
    'SELECT table_schema AS "Database",\
    SUM(data_length + index_length) / 1024 / 1024 AS "Size" \
    FROM information_schema.tables GROUP BY table_schema;'
  );

  const DATA_DIR = await executeUnsafeCommands(
    'mysql --user=root --password=admin --execute="SELECT @@datadir;"'
  );
  const BASE_DIR = await executeUnsafeCommands(
    'mysql --user=root --password=admin --execute="SELECT @@basedir;"'
  );

  return res.status(200).json({
    BASE_DIR,
    DATA_DIR,
    UPTIME: UPTIME[0].Value,
    VERSION: VERSION[0]["VERSION()"],
    SIZE,
  });
});

server.listen(port, () =>
  console.log(`⚡ | Server is running at http://localhost:${port}`)
);
