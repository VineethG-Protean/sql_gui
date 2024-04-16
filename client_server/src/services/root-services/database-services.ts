import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "../../utilities/response";
import { pool } from "../../config/db-connection";

const connection = pool();

export const getMysqlDatabases = async (req: Request, res: Response) => {
  try {
    const databases = await connection.query("SHOW DATABASES");
    if (!databases) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", databases));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getMysqlDatabaseInfo = async (req: Request, res: Response) => {
  const db_name = req.query.db_name;
  if (!db_name) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createMysqlDatabase = async (req: Request, res: Response) => {
  const { name, character_set, collate, encryption, engine } = req.body;
  if (!name || !character_set || !collate || !encryption || !engine)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropMysqlDatabase = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const alterMysqlDatabase = async (req: Request, res: Response) => {
  const { name, character_set, collate, engine } = req.body;
  try {
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
