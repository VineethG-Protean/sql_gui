import { Request, Response } from "express";
import { RESPONSE } from "../utilities/response";
import { connect } from "../config/db-connection";

export const loginService = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const connection = await connect();
    const [rows, fields]: any = await connection.query(
      "SELECT password FROM users WHERE username=? LIMIT 1",
      [username]
    );
    if (rows.length !== 0 && rows[0].password === password) {
      return res.status(200).json(RESPONSE.OK());
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
