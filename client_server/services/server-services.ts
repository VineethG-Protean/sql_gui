import dotenv from "dotenv";
dotenv.config();
import os from "os";
import pool from "../config/db-connection";
import { executeUnsafeCommands } from "../utilities/execute-commands";
import { Request, Response } from "express";
import { RESPONSE } from "../utilities/response";
import osu from "node-os-utils";
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

export const getServerStats = async (req: Request, res: Response) => {
  try {
    const [UPTIME]: any = await connection.query("SHOW STATUS LIKE 'Uptime';");
    const [VERSION]: any = await connection.query("SELECT VERSION()");
    const [SIZE]: any = await connection.query(
      'SELECT table_schema AS "Database",\
        SUM(data_length + index_length) / 1024 / 1024 AS "Size" \
        FROM information_schema.tables GROUP BY table_schema;'
    );

    const DATA_DIR = await executeUnsafeCommands(
      `mysql --user=${process.env.DB_USER} --password=${process.env.DB_PASS} --execute="SELECT @@datadir;"`
    );
    const BASE_DIR = await executeUnsafeCommands(
      `mysql --user=${process.env.DB_USER} --password=${process.env.DB_PASS} --execute="SELECT @@basedir;"`
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
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getMysqlUsers = async (req: Request, res: Response) => {
  try {
    const [users] = await connection.query("SELECT user FROM mysql.user");
    if (users) return res.status(200).json(RESPONSE.OK("DATA RETURNED", users));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createMysqlUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    await connection.query(
      `CREATE USER "${name}"@"${process.env.DB_HOST}" IDENTIFIED BY "${process.env.DB_PASS}"`
    );
    return res.status(201).json(RESPONSE.CREATED("USER CREATED"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropMysqlUser = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    await connection.query(`DROP USER "${name}"@"${process.env.DB_HOST}"`);
    return res.status(204).json(RESPONSE.NO_CONTENT("USER HAS BEEN DROPPED"));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const elevatePrivilages = async (req: Request, res: Response) => {
  const { privilages_level, database } = req.body;
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
