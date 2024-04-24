import { Request, Response, NextFunction } from "express";

import { mySqlSource } from "../config/data-source";
import { RESPONSE } from "../utilities/response";

import { User } from "../entities/User";

const PrivilegeManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getUser = await mySqlSource
      .getRepository(User)
      .findOneBy({ id: res.locals.user_id });
    if (
      getUser &&
      (getUser.role === "admin" || getUser.role === "server_admin")
    ) {
      res.locals.privilege = "/root/";
      next();
    } else {
      res.locals.privilege = "/";
      next();
    }
  } catch (error) {
    res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export default PrivilegeManager;
