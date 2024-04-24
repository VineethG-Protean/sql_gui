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
  const dbName = req.query.dbName as string;
  if (!dbName) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const databaseInfoQuery = `SHOW CREATE DATABASE ${connection.escapeId(
      dbName
    )}`;
    const [databaseInfoRows]: any = await connection.query(databaseInfoQuery);

    if (!databaseInfoRows.length)
      return res.status(404).json({ error: "Database not found." });
    const createStatement = databaseInfoRows[0]["Create Database"];
    const match = createStatement.match(
      /DEFAULT CHARACTER SET (\S+) COLLATE (\S+)/
    );
    const characterSet = match ? match[1] : null;
    const collation = match ? match[2] : null;
    const encryptionMatch = createStatement.match(/DEFAULT ENCRYPTION='(\S+)'/);
    const encryption = encryptionMatch ? encryptionMatch[1] : null;
    const databaseInfo = {
      name: dbName,
      characterSet,
      collation,
      encryption,
    };
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
    const createDatabaseQuery = `
      CREATE DATABASE ${name}
      CHARACTER SET = ?
      DEFAULT CHARACTER SET = ?
      COLLATE = ?
      DEFAULT COLLATE = ?
      ENCRYPTION = ?
      DEFAULT ENCRYPTION = ?
      DEFAULT STORAGE ENGINE = ?
    `;

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
  } catch (error) {
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
  ) {
    return res.status(422).json({ error: "Missing required parameters" });
  }

  try {
    const alterDatabaseQuery = `
      ALTER DATABASE ?
      CHARACTER SET = ?
      DEFAULT CHARACTER SET = ?
      COLLATE = ?
      DEFAULT COLLATE = ?
      ENCRYPTION = ?
      DEFAULT ENCRYPTION = ?
      DEFAULT STORAGE ENGINE = ?
    `;

    await connection.query(alterDatabaseQuery, [
      name,
      characterSet,
      defaultCharSet,
      collate,
      defaultCollate,
      encryption,
      defaultEncryption,
      engine,
    ]);

    return res.status(200).json({ message: "Database altered successfully" });
  } catch (error) {
    console.error("Error altering database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
