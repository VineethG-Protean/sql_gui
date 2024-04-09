import { Request, Response } from "express";

import { User } from "../entities/User";

import { mySqlSource } from "../config/data-source";
import { RESPONSE } from "../utilities/response";
import { generateJWT } from "../utilities/tokens";
import { decryptPassword, encryptPassword } from "../utilities/encryption";

export const loginService = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const getUser = await mySqlSource.getRepository(User).findOneBy({ username })
    if (getUser && getUser.is_verified && getUser.is_active) {
      const isPasswordValid = await decryptPassword(password, getUser.password);
      if (isPasswordValid) {
        const token = generateJWT(getUser.id);
        return res.status(200).json(RESPONSE.OK("LOGIN SUCCESSFUL", token))
      }
    } else if (getUser && !getUser.is_active) {
      return res.status(401).json(RESPONSE.UN_AUTHORIZED());
    } else {
      return res.status(404).json(RESPONSE.NOT_FOUND("USER NOT FOUND"))
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

