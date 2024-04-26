import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
import osu from "node-os-utils";
import os from "os";

import { pool } from "@/config/db-connection";
import { RESPONSE } from "@/utilities/response";

let cpu = osu.cpu;
const connection = pool();

export const serverUtilization = async () => {
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

export const mySqlServerStats = async (_: Request, res: Response) => {
  try {
    const [UPTIME]: any = await connection.query("SHOW STATUS LIKE 'Uptime';");
    const [VERSION]: any = await connection.query("SELECT VERSION()");
    const [SIZE]: any = await connection.query(
      'SELECT table_schema AS "Database",\
        SUM(data_length + index_length) / 1024 / 1024 AS "Size" \
        FROM information_schema.tables GROUP BY table_schema;'
    );

    const DATA_DIR = await connection.query("SELECT @@datadir");
    const BASE_DIR = await connection.query("SELECT @@basedir");

    return res.status(200).json(
      RESPONSE.OK("DATA RETURNED", {
        BASE_DIR,
        DATA_DIR,
        UPTIME: UPTIME[0].Value,
        VERSION: VERSION[0]["VERSION()"],
        SIZE,
      })
    );
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
