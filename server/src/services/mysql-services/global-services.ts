import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";

import { RESPONSE } from "../../utilities/response";
import { mySqlSource } from "../../config/data-source";

import { Server } from "../../entities/Server";

export const clientServer_GET = async (
  req: Request,
  res: Response,
  endpoint: string
) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = await mySqlSource.getRepository(Server).findOneBy({ id });
    const response: AxiosResponse = await axios.get(
      `${server?.protocol}://${server?.host}:${server?.port}` + endpoint
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const clientServer_POST = async (
  req: Request,
  res: Response,
  endpoint: string
) => {
  const { id, ...data } = req.body;
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = await mySqlSource.getRepository(Server).findOneBy({ id });
    const response: AxiosResponse = await axios.post(
      `${server?.protocol}://${server?.host}:${server?.port}` + endpoint,
      data
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
