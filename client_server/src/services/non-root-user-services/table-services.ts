import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "@/utilities/response";
import { privatePool } from "@/config/db-connection";

export const getAllTables = async (req: Request, res: Response) => {
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

    const showTablesQuery = `SHOW TABLES FROM ?`;
    const tables = await connection.query(showTablesQuery, [databaseName]);
    if (!tables) return res.status(404).json(RESPONSE.NOT_FOUND());
    connection.release();
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", tables));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getSchema = async (req: Request, res: Response) => {
  const { credentials, databaseName, tableName } = req.body;
  if (!credentials || !tableName || !databaseName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    const schema = await connection.query(`DESCRIBE ?.?`, [databaseName, tableName]);
    if (!schema) return res.status(404).json(RESPONSE.NOT_FOUND());
    connection.release();
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", schema));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createTable = async (req: Request, res: Response) => {
  const { credentials, databaseName, tableName, columns } = req.body;
  if (!credentials || !databaseName || !tableName || !columns)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    let query = `CREATE TABLE ${databaseName}.${tableName} (`;
    for (let i = 0; i < columns.length; i++) {
      const { columnName, dataType, constraints, key } = columns[i];
      query += `${columnName} ${dataType}`;
      if (constraints) {
        query += ` ${constraints.join(" ")}`;
      }
      if (key) {
        query += ` ${key}`;
      }
      if (i !== columns.length - 1) {
        query += ", ";
      }
    }
    query += `);`;

    await connection.query(query);
    connection.release();
    return res.status(201).json(RESPONSE.CREATED());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropTable = async (req: Request, res: Response) => {
  const { credentials, databaseName, tableName } = req.body;
  if (!credentials || !databaseName || !tableName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    const result = await connection.query(`DROP TABLE ?.?`, [
      databaseName,
      tableName,
    ]);

    connection.release();
    if (result)
      return res.status(204).json(RESPONSE.NO_CONTENT("TABLE DROPPED"));
    return res.status(404).json(RESPONSE.NOT_FOUND());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const alterTable = async (req: Request, res: Response) => {
  const { credentials, tableName, alterations } = req.body;
  if (
    !credentials ||
    !tableName ||
    !alterations ||
    !Array.isArray(alterations) ||
    alterations.length === 0
  )
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());

  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    let query = `ALTER TABLE ${tableName}`;
    for (let i = 0; i < alterations.length; i++) {
      const { type, columnName, newColumnName, dataType, constraints } =
        alterations[i];
      if (type === "ADD_COLUMN") {
        query += ` ADD COLUMN ${columnName} ${dataType}`;
        if (constraints) {
          query += ` ${constraints.join(" ")}`;
        }
      } else if (type === "MODIFY_COLUMN") {
        query += ` MODIFY COLUMN ${columnName} ${dataType}`;
        if (constraints) {
          query += ` ${constraints.join(" ")}`;
        }
      } else if (type === "CHANGE_COLUMN") {
        query += ` CHANGE COLUMN ${columnName} ${newColumnName} ${dataType}`;
        if (constraints) {
          query += ` ${constraints.join(" ")}`;
        }
      } else if (type === "DROP_COLUMN") {
        query += ` DROP COLUMN ${columnName}`;
      }

      if (i !== alterations.length - 1) {
        query += ",";
      }
    }

    await connection.query(query);
    connection.release();
    return res.status(200).json(RESPONSE.OK());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
