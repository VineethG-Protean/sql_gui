import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

import { RESPONSE } from "../utilities/response";
import { mySqlSource } from "../config/data-source";

import { Server } from "../entities/Server";

export const connectServer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = await mySqlSource.getRepository(Server).findOneBy({ id });
    const response: AxiosResponse = await axios.get(
      `${server?.protocol}://${server?.host}:${server?.port}/connect`
    );
    if (response.status == 200) {
      return res.status(200).json(RESPONSE.OK("SERVER RESPONDED WITH 200"));
    } else {
      return res
        .status(500)
        .json(RESPONSE.INTERNAL_SERVER_ERROR("SERVER RESPONDED WITH 500"));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const getStats = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = await mySqlSource.getRepository(Server).findOneBy({ id });
    const response: AxiosResponse = await axios.get(
      `${server?.protocol}://${server?.host}:${server?.port}/stats`
    );
    if (response.status === 200) {
      return res.status(200).json(RESPONSE.OK("SERVER RESPONDED WITH 200",response.data.DATA));
    } else {
      return res
        .status(500)
        .json(RESPONSE.INTERNAL_SERVER_ERROR("SERVER RESPONDED WITH 500"));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

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
};
