import dotenv from "dotenv";
import { Request, Response } from "express";

import { RESPONSE } from "@/utilities/response";
import { pool } from "@/config/db-connection";

dotenv.config();
const connection = pool();

export const getMysqlDatabases = async (_: Request, res: Response) => {
  try {
    const databases = await connection.query("SHOW DATABASES");
    if (!databases) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", databases));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getMysqlDatabase = async (req: Request, res: Response) => {
  const { databaseName } = req.body;
  if (!databaseName) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const databaseInfoQuery = `SHOW CREATE DATABASE ${connection.escapeId(
      databaseName
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
      name: databaseName,
      characterSet,
      collation,
      encryption,
    };
    return res.status(200).json(RESPONSE.OK("", databaseInfo));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getMysqlDatabaseUsers = async (req: Request, res: Response) => {
  const { databaseName } = req.body;
  if (!databaseName) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const databaseUsersQuery = `SELECT DISTINCT u.User, u.Host, 
    d.Db, d.*
    FROM mysql.user u
    JOIN mysql.db d ON u.User = d.User
    WHERE d.Db = ?`
    const [dataUsers, _] = await connection.query(databaseUsersQuery, [databaseName]);
    if (!dataUsers) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("", dataUsers));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
}

export const createMysqlDatabase = async (req: Request, res: Response) => {
  const {
    name,
    characterSet,
    collation,
    encryption,
  } = req.body;
  if (
    !name ||
    !characterSet ||
    !collation ||
    !encryption
  )
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const createDatabaseQuery = `
      CREATE DATABASE ${name}
      DEFAULT CHARACTER SET ${characterSet.replace(/[^a-zA-Z0-9_]/g, "")}
      DEFAULT COLLATE ${collation.replace(/[^a-zA-Z0-9_]/g, "")}
      ENCRYPTION = '${encryption}'
    `;
    await connection.query(createDatabaseQuery);
    return res.status(201).json(RESPONSE.CREATED());
  } catch (error) {
    console.log(error);
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropMysqlDatabase = async (req: Request, res: Response) => {
  const { databaseName } = req.body;
  try {
    const dropDatabaseQuery = `DROP DATABASE IF EXISTS ${databaseName.replace(/[^a-zA-Z0-9_]/g, "")}`;
    await connection.query(dropDatabaseQuery);
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
    collation,
    encryption,
  } = req.body;

  if (
    !name ||
    !characterSet ||
    !collation ||
    !encryption
  ) {
    return res.status(422).json({ error: "Missing required parameters" });
  }

  try {
    const alterDatabaseQuery = `
      ALTER DATABASE ${name}
      CHARACTER SET ${characterSet.replace(/[^a-zA-Z0-9_]/g, "")}
      COLLATE ${collation.replace(/[^a-zA-Z0-9_]/g, "")}
      ENCRYPTION = '${encryption.replace(/[^a-zA-Z0-9_]/g, "")}'
    `;

    await connection.query(alterDatabaseQuery, [
      name,
      characterSet,
      collation,
      encryption,
    ]);

    return res.status(200).json({ message: "Database altered successfully" });
  } catch (error) {
    console.error("Error altering database:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
