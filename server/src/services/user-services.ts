import { Request, Response } from "express";

import { RESPONSE } from "../utilities/response";
import { mySqlSource } from "../config/data-source";

import { User } from "../entities/User";
import { Server } from "../entities/Server";

export const getUserProfile = async (req: Request, res: Response) => {
  const id = res.locals.user_id;
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const user = await mySqlSource.getRepository(User).findOneBy({ id });
    if (user) {
      const {
        password,
        is_active,
        is_verified,
        created_at,
        modified_at,
        ...selectiveFields
      } = user;
      return res
        .status(200)
        .json(RESPONSE.OK("DATA RETURNED", selectiveFields));
    }
    return res.status(404).json(RESPONSE.NOT_FOUND());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getAllServers = async (req: Request, res: Response) => {
  try {
    const servers = await mySqlSource.getRepository(Server).find();
    if (!servers) return res.status(404).json(RESPONSE.NOT_FOUND());
    return res.status(200).json(RESPONSE.OK("DATA RETURNED", servers));
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
