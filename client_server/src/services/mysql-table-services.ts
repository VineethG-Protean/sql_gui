import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "../utilities/response";
import pool from "../config/db-connection";

const connection = pool();

export const getAllTables = async (req: Request, res: Response) => {
    const { database_name } = req.body;
    if (!database_name) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {
        const tables = await connection.query(`SHOW TABLES FROM ${database_name}`);
        if (!tables) return res.status(404).json(RESPONSE.NOT_FOUND());
        return res.status(200).json(RESPONSE.OK("DATA RETURNED", tables));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const getTableSchema = async (req: Request, res: Response) => {
    const { database_name } = req.body
    if (!database_name) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {
        const schema = await connection.query(`DESCRIBE ${database_name}`);
        if (!schema) return res.status(404).json(RESPONSE.NOT_FOUND());
        return res.status(200).json(RESPONSE.OK("DATA RETURNED", schema));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const createTable = async (req: Request, res: Response) => {
    const { table_name, columns } = req.body;
    if (!table_name || !columns) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {
        let query = `create table ${table_name}`
        for (let column of columns) {
            const { columnName, dataType, constraints, key } = column;

            query += `\n ${columnName} ${dataType}`;
            if (constraints) {
                for (let constraint of constraints) {
                    query += ` ${constraint}`;
                }
            }
            if (key) query += ` ${key}`;
        }

        await connection.query(query);
        return res.status(201).json(RESPONSE.CREATED());
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const dropTable = async (req: Request, res: Response) => {
    const { table_name } = req.body;
    if (!table_name) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {
        const result = await connection.query(`DROP TABLE ${table_name}`);
        if (result) return res.status(204).json(RESPONSE.NO_CONTENT("TABLE DROPPED"));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const alterTableSchema = async (req: Request, res: Response) => {

}

export const getTableData = async (req: Request, res: Response) => {

}

export const deleteTableData = async (req: Request, res: Response) => {

}

export const alterTableData = async (req: Request, res: Response) => {

}