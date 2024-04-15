import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "../utilities/response";
import pool from "../config/db-connection";

const connection = pool();

export const getMysqlUsers = async (req: Request, res: Response) => {
    try {
        const [users] = await connection.query("SELECT user FROM mysql.user");
        if (users) return res.status(200).json(RESPONSE.OK("DATA RETURNED", users));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
};

export const createMysqlUser = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        await connection.query(
            `CREATE USER "${name}"@"${process.env.DB_HOST}" IDENTIFIED BY "${process.env.DB_PASS}"`
        );
        return res.status(201).json(RESPONSE.CREATED("USER CREATED"));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
};

export const dropMysqlUser = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        await connection.query(`DROP USER "${name}"@"${process.env.DB_HOST}"`);
        return res.status(204).json(RESPONSE.NO_CONTENT("USER HAS BEEN DROPPED"));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
};

export const getMysqlDatabases = async (req: Request, res: Response) => {
    try {
        const databases = await connection.query('SHOW DATABASES');
        if (!databases) return res.status(404).json(RESPONSE.NOT_FOUND());
        return res.status(200).json(RESPONSE.OK("DATA RETURNED", databases));
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}