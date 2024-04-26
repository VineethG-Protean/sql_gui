import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

import { RESPONSE } from "../utilities/response";
import { mySqlSource } from "../config/data-source";

import { Server } from "../entities/Server";

export const clientServer_POST = async (
  req: Request,
  res: Response,
  endpoint: string
) => {
  const { server_id, ...data } = req.body;
  if (!server_id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = await mySqlSource
      .getRepository(Server)
      .findOneBy({ id: server_id });
    const response: AxiosResponse = await axios.post(
      `${server?.protocol}://${server?.host}:${server?.port}` + endpoint,
      data
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
