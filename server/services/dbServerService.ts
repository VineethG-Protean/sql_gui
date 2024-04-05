import os from "os";
import { connect } from "../config/db-connection";
import { executeUnsafeCommands } from "../utilities/execute-commands";
import { Request, Response } from "express";
import { RESPONSE } from "../utilities/response";
import osu from "node-os-utils";
let cpu = osu.cpu;

export const serverUtilization = async() => {
  let CPU_USAGE = await cpu.usage();
  const CURRENT_TIME = new Date().toISOString();
  const TOTAL_MEMORY = os.totalmem();
  const FREE_MEMORY = os.freemem();
  const MEMORY_USAGE = ((TOTAL_MEMORY - FREE_MEMORY) / TOTAL_MEMORY) * 100;
  const SECONDS = new Date(CURRENT_TIME).getSeconds();
  return {
    CURRENT_TIME,
    CPU_USAGE,
    TOTAL_MEMORY,
    FREE_MEMORY,
    MEMORY_USAGE,
    SECONDS,
  };
};

export const dbServerStats = async (req: Request, res: Response) => {
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

  return res.status(200).json(
    RESPONSE.OK("DATA RETURNED", {
      BASE_DIR,
      DATA_DIR,
      UPTIME: UPTIME[0].Value,
      VERSION: VERSION[0]["VERSION()"],
      SIZE,
    })
  );
};
