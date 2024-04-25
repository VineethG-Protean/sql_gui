import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "../../utilities/response";
import { pool } from "../../config/db-connection";

const connection = pool();

export const getMysqlUsers = async (req: Request, res: Response) => {
  try {
    const [users] = await connection.query("SELECT * FROM mysql.user");
    if (users) return res.status(200).json(RESPONSE.OK("DATA RETURNED", users));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const createMysqlUser = async (req: Request, res: Response) => {
  const { name, password, host, database, privileges } = req.body;
  if (!name || !password) return res.status(422).json(RESPONSE.CONFLICT());
  try {
    const createUserQuery = `CREATE USER ?@? IDENTIFIED BY ?`;
    await connection.query(createUserQuery, [name, host, password]);

    const elevatePrivileges = `GRANT ? ON ${database}.* TO ?@?`;

    if (privileges)
      await connection.query(elevatePrivileges, [
        privileges.join(","),
        name,
        host,
      ]);
    return res.status(201).json(RESPONSE.CREATED("USER CREATED"));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const dropMysqlUser = async (req: Request, res: Response) => {
  const { name, host } = req.body;
  if (!name || !host)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const dropUserQuery = `DROP USER ?@?`;
    await connection.query(dropUserQuery, [name, host]);
    return res.status(204).json(RESPONSE.NO_CONTENT("USER HAS BEEN DROPPED"));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
