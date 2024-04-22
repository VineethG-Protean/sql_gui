import dotenv from "dotenv";
import { Request, Response } from "express";

import { RESPONSE } from "../../utilities/response";
import { pool } from "../../config/db-connection";

dotenv.config();
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
  const dbName = req.query.dbName;
  if (!dbName) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const databaseInfoQuery = `SELECT CREATE DATABASE ?`;
    const databaseInfo = await connection.query(databaseInfoQuery, [dbName]);
    if (!databaseInfo) res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("", databaseInfo));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createMysqlDatabase = async (req: Request, res: Response) => {
  const {
    name,
    characterSet,
    defaultCharSet,
    collate,
    defaultCollate,
    encryption,
    defaultEncryption,
    engine,
  } = req.body;
  if (
    !name ||
    !characterSet ||
    !defaultCharSet ||
    !collate ||
    !defaultCollate ||
    !defaultEncryption ||
    !encryption ||
    !engine
  )
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
  } catch (error) {
    const createDatabaseQuery = `CREATE DATABASE ${name} \
    CHARACTER SET = ? \
    DEFAULT CHARACTER SET = ? \
    COLLATE = ? \
    DEFAULT COLLATE = ? \
    ENCRYPTION = ? \
    DEFAULT ENCRYPTION = ? \
    DEFAULT STORAGE ENGINE = ?`;

    const createDatabase = await connection.query(createDatabaseQuery, [
      characterSet,
      defaultCharSet,
      collate,
      defaultCollate,
      encryption,
      defaultEncryption,
      engine,
    ]);

    res.status(201).json(RESPONSE.CREATED());
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropMysqlDatabase = async (req: Request, res: Response) => {
  const dbName = req.query.dbName;
  try {
    const dropDatabaseQuery = `DROP DATABASE IF EXISTS ?`;
    const dropDatabase = await connection.query(dropDatabaseQuery, [dbName]);
    return res
      .status(204)
      .json(RESPONSE.NO_CONTENT("DATABASE HAS BEEN DROPPED"));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const alterMysqlDatabase = async (req: Request, res: Response) => {
  const {
    name,
    characterSet,
    defaultCharSet,
    collate,
    defaultCollate,
    encryption,
    defaultEncryption,
    engine,
  } = req.body;
  if (
    !name ||
    !characterSet ||
    !defaultCharSet ||
    !collate ||
    !defaultCollate ||
    !defaultEncryption ||
    !encryption ||
    !engine
  )
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const alterDatabaseQuery = `ALTER DATABASE ${name}
    CHARACTER SET = ${characterSet}
    DEFAULT CHARACTER SET = ${defaultCharSet}
    COLLATE = ${collate}
    DEFAULT COLLATE = ${defaultCollate}
    ENCRYPTION = ${encryption}
    DEFAULT ENCRYPTION = ${defaultEncryption}
    DEFAULT STORAGE ENGINE = ${engine}`;
    await connection.query(alterDatabaseQuery);
    return res.status(200).json(RESPONSE.OK());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
