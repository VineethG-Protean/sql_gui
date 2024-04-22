import { Request, Response } from "express";
import dotenv from "dotenv";

import { privatePool } from "../../config/db-connection";
import { RESPONSE } from "../../utilities/response";

dotenv.config();

export const getMysqlDatabases = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const connection = await privatePool(username, password).getConnection();
    const databases = await connection.query("SHOW DATABASES");
    connection.release();
    if (!databases) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", databases));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getMysqlDatabaseInfo = async (req: Request, res: Response) => {
  const { username, password, dbName } = req.body;
  try {
    const connection = await privatePool(username, password).getConnection();
    const databaseInfoQuery = `SELECT CREATE DATABASE ?`;
    const databaseInfo = await connection.query(databaseInfoQuery, [dbName]);
    if (!databaseInfo) res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("", databaseInfo));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createMysqlDatabase = async (req: Request, res: Response) => {
    
};
