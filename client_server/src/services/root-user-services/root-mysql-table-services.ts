import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "@/utilities/response";
import { pool } from "@/config/db-connection";

const connection = pool();

export const getAllTables = async (req: Request, res: Response) => {
  const { dbName } = req.body;
  if (!dbName) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const showTablesQuery = `SHOW TABLES FROM ?`;
    const tables = await connection.query(showTablesQuery, [dbName]);
    if (!tables) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", tables));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getSchema = async (req: Request, res: Response) => {
  const { dbName, tableName } = req.body;
  if (!tableName || !dbName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const schema = await connection.query(`DESCRIBE ?.?`, [dbName, tableName]);
    if (!schema) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", schema));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createTable = async (req: Request, res: Response) => {
  const { databaseName, tableName, columns } = req.body;
  if (!databaseName || !tableName || !columns)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
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
    return res.status(201).json(RESPONSE.CREATED());
  } catch (error) {
    console.error("Error creating table:", error);
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropTable = async (req: Request, res: Response) => {
  const { dbName, tableName } = req.body;
  if (!dbName || !tableName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const result = await connection.query(`DROP TABLE ?.?`, [
      dbName,
      tableName,
    ]);
    if (result)
      return res.status(204).json(RESPONSE.NO_CONTENT("TABLE DROPPED"));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const alterTable = async (req: Request, res: Response) => {
  const { tableName, alterations } = req.body;
  if (
    !tableName ||
    !alterations ||
    !Array.isArray(alterations) ||
    alterations.length === 0
  )
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());

  try {
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
    return res.status(200).json(RESPONSE.OK());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
