import { Request, Response } from "express";
import dotenv from "dotenv";

import { privatePool } from "@/config/db-connection";
import { RESPONSE } from "@/utilities/response";

dotenv.config();

export const getMysqlDatabases = async (req: Request, res: Response) => {
  const { credentials } = req.body;
  if (!credentials)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    const databases = await connection.query("SHOW DATABASES");
    connection.release();
    if (!databases) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", databases));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getMysqlDatabaseInfo = async (req: Request, res: Response) => {
  const { credentials, databaseName } = req.body;
  if (!credentials || !databaseName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    const databaseInfoQuery = `SELECT CREATE DATABASE ?`;
    const databaseInfo = await connection.query(databaseInfoQuery, [databaseName]);
    if (!databaseInfo) res.status(404).json(RESPONSE.NOT_FOUND());
    connection.release();
    return res.status(200).json(RESPONSE.OK("", databaseInfo));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createMysqlDatabase = async (req: Request, res: Response) => {
  const {
    credentials,
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
    !credentials ||
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
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();

    const createDatabaseQuery = `CREATE DATABASE ${name} \
    CHARACTER SET = ? \
    DEFAULT CHARACTER SET = ? \
    COLLATE = ? \
    DEFAULT COLLATE = ? \
    ENCRYPTION = ? \
    DEFAULT ENCRYPTION = ? \
    DEFAULT STORAGE ENGINE = ?`;

    await connection.query(createDatabaseQuery, [
      characterSet,
      defaultCharSet,
      collate,
      defaultCollate,
      encryption,
      defaultEncryption,
      engine,
    ]);

    connection.release();
    res.status(201).json(RESPONSE.CREATED());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropMysqlDatabase = async (req: Request, res: Response) => {
  const { credentials, databaseName } = req.body;
  if (!credentials || !databaseName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());

  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    const dropDatabaseQuery = `DROP DATABASE IF EXISTS ?`;
    await connection.query(dropDatabaseQuery, [databaseName]);
    connection.release();
    return res
      .status(204)
      .json(RESPONSE.NO_CONTENT("DATABASE HAS BEEN DROPPED"));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const alterMysqlDatabase = async (req: Request, res: Response) => {
  const {
    credentials,
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
    !credentials ||
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
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();

    const alterDatabaseQuery = `ALTER DATABASE ${name}
    CHARACTER SET = ${characterSet}
    DEFAULT CHARACTER SET = ${defaultCharSet}
    COLLATE = ${collate}
    DEFAULT COLLATE = ${defaultCollate}
    ENCRYPTION = ${encryption}
    DEFAULT ENCRYPTION = ${defaultEncryption}
    DEFAULT STORAGE ENGINE = ${engine}`;

    await connection.query(alterDatabaseQuery);
    connection.release();
    return res.status(200).json(RESPONSE.OK());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
