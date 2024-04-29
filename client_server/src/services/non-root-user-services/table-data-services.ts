import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "@/utilities/response";
import { privatePool } from "@/config/db-connection";

export const getTableData = async (req: Request, res: Response) => {
  const { credentials, dbName, tableName } = req.body;
  if (!credentials || !dbName || !tableName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();

    const selectQuery = `SELECT * FROM ?.?`;
    const selectQueryResults = await connection.query(selectQuery, [
      dbName,
      tableName,
    ]);
    if (!selectQueryResults) return res.status(404).json(RESPONSE.NOT_FOUND());
    connection.release();
    return res.status(200).json(RESPONSE.OK("", selectQueryResults));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const addTableData = async (req: Request, res: Response) => {
  const { credentials, dbName, tableName, data } = req.body;
  if (!credentials || !dbName || !tableName || !data)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    connection.release();
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropTableData = async (req: Request, res: Response) => {
  const { credentials, dbName, tableName, row } = req.body;
  if (!credentials || !dbName || !tableName || !row)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    const deleteDataQuery = `DELETE FROM ?.? WHERE ?=?`;
    await connection.query(deleteDataQuery, [
      dbName,
      tableName,
      row.name,
      row.value,
    ]);
    connection.release();
    return res.status(204).json(RESPONSE.NO_CONTENT());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const alterTableData = async (req: Request, res: Response) => {
  const { credentials, dbName, tableName, alterations } = req.body;
  if (!credentials || !dbName || !tableName || !alterations)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await privatePool(
      credentials.host,
      credentials.username,
      credentials.password,
      credentials.database
    ).getConnection();
    connection.release();
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
