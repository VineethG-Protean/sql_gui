import { Request, Response } from "express";

import { RESPONSE } from "../utilities/response";
import { mySqlSource } from "../config/data-source";

import { Server } from "../entities/Server";

export const connectServer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = await mySqlSource.getRepository(Server).findOneBy({ id });
    /*
      INTERACT WITH THE CLIENT SERVER END POINT AND GET CONNECTION STATUS
    */
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
}

export const getStats = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = await mySqlSource.getRepository(Server).findOneBy({ id });
    /*
      INTERACT WITH THE CLIENT SERVER END POINT AND GET SERVER STATS
    */

  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
}

export const executeQuery = async (req: Request, res: Response) => {
  const { id, query } = req.body;
  try {
    const server = await mySqlSource.getRepository(Server).findOneBy({ id });
    /*
      INTERACT WITH THE CLIENT SERVER END POINT AND EXECUTE QUERY
    */
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
}
