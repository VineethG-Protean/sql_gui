import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

import { RESPONSE } from "@/utilities/response";
import { pool } from "@/config/db-connection";

const connection = pool();

export const getTableData = async (req: Request, res: Response) => {
  const { dbName, tableName } = req.body;
  if (!dbName || !tableName)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const selectQuery = `SELECT * FROM ?.?`;
    const selectQueryResults = await connection.query(selectQuery, [
      dbName,
      tableName,
    ]);
    if (!selectQueryResults) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("", selectQueryResults));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const addTableData = async (req: Request, res: Response) => {
  const { data } = req.body;
  if (!data) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {

  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const deleteTableData = async (req: Request, res: Response) => {
  const { dbName, tableName, row } = req.body;
  if (!dbName || !tableName || !row)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const deleteDataQuery = `DELETE FROM ?.? WHERE ?=?`;
    await connection.query(deleteDataQuery, [
      dbName,
      tableName,
      row.name,
      row.value,
    ]);
    return res.status(204).json(RESPONSE.NO_CONTENT());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

/*
  const alterations = {
    identify: {
      column_name:"",
      column_value:""
    },

    alterations:[
      {
        column_name:"",
        column_value:"",
      },
      {
        column_name:"",
        column_value:"",
      },
      {
        column_name:"",
        column_value:"",
      },
    ]
  }

*/

export const alterTableData = async (req: Request, res: Response) => {
  const { dbName, tableName, alterations } = req.body;
  if (!dbName || !tableName || !alterations)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const {
      column_name: identifyColumnName,
      column_value: identifyColumnValue,
    } = alterations.identify;
    for (const alteration of alterations.alterations) {
      const columnsToUpdate = Object.keys(alteration)
        .map((columnName) => `${columnName} = ?`)
        .join(", ");
      const valuesToUpdate = Object.values(alteration);

      const alterTableDataQuery = `UPDATE ${dbName}.${tableName} SET ${columnsToUpdate} WHERE ${identifyColumnName} = ?`;
      const queryParams = [...valuesToUpdate, identifyColumnValue];

      await connection.query(alterTableDataQuery, queryParams);
    }
    return res.status(201).json(RESPONSE.NO_CONTENT());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
