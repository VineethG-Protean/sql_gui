import { Request, Response } from "express";

import { mySqlSource } from "../config/data-source";
import { RESPONSE } from "../utilities/response";
import { encryptPassword } from "../utilities/encryption";

import { Server } from "../entities/Server";
import { User } from "../entities/User";
import moment from "moment";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await mySqlSource
      .getRepository(User)
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.email",
        "user.username",
        "user.name",
        "user.role",
        "user.is_verified",
        "user.is_active",
        "user.created_at",
        "user.modified_at",
      ])
      .getMany();

    if (!users) {
      return res.status(404).json(RESPONSE.NOT_FOUND());
    } else {
      return res.status(200).json(RESPONSE.OK("DATA RETURNED", users));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const inviteUser = async (req: Request, res: Response) => {
  const { email, username, password, name } = req.body;
  if (!email || !username || !password || !name)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const getEmail = await mySqlSource.getRepository(User).findOneBy({ email });
    if (getEmail == null) {
      const user = new User();
      user.email = email;
      user.username = username;
      user.password = await encryptPassword(password);
      user.name = name;
      user.is_verified = true;
      user.is_active = true;

      const result = await mySqlSource.getRepository(User).save(user);
      return res.status(201).json(RESPONSE.CREATED("INVITATION HAS BEEN SENT"));
    } else {
      res.status(422).json(RESPONSE.CONFLICT("EMAIL ALREADY IN USE"));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id, name, email, username, role, is_verified, is_active } = req.body;
  if (
    !id ||
    !name ||
    !email ||
    !username ||
    !role ||
    !is_verified ||
    !is_active
  )
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const user = new User();
    user.name = name;
    user.email = email;
    user.username = username;
    user.role = role;
    user.is_verified = is_verified;
    user.is_active = is_active;
    user.modified_at = moment().format("YYYY-MM-DD HH:mm:ss");

    const result = await mySqlSource
      .createQueryBuilder()
      .update(User)
      .set(user)
      .where("id= :id", { id })
      .execute();

    if (result.affected && result.affected > 0) {
      return res.status(204).json(RESPONSE.NO_CONTENT());
    } else {
      return res
        .status(404)
        .json(RESPONSE.NOT_FOUND(`USER WITH ID ${id} WAS NOT FOUND`));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const result = await mySqlSource
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .where("id= :id", { id })
      .execute();

    if (result.affected && result.affected > 0) {
      return res.status(204).json(RESPONSE.NO_CONTENT());
    } else {
      return res
        .status(404)
        .json(RESPONSE.NOT_FOUND(`SERVER WITH ${id} WAS NOT FOUND`));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const addServer = async (req: Request, res: Response) => {
  const { name, protocol, host, port, username, password, type } = req.body;
  if (!name || !protocol || !host || !port || !username || !password || !type)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = new Server();
    server.name = name;
    server.protocol = protocol;
    server.host = host;
    server.port = port;
    server.username = username;
    server.password = password;
    server.type = type;

    const savedServer = await mySqlSource.getRepository(Server).save(server);
    return res.status(201).json(RESPONSE.CREATED());
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const updateServer = async (req: Request, res: Response) => {
  const { id, name, protocol, host, port, username, password, type } = req.body;
  if (!id || !protocol || !host || !port || !username || !password || !type)
    return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const server = new Server();
    server.id = id;
    server.name = name;
    server.protocol = protocol;
    server.host = host;
    server.port = port;
    server.username = username;
    server.password = password;
    server.type = type;
    server.modified_at = moment().format("YYYY-MM-DD HH:mm:ss");

    const result = await mySqlSource
      .createQueryBuilder()
      .update(Server)
      .set(server)
      .where("id= :id", { id })
      .execute();
    if (result.affected && result.affected > 0) {
      return res.status(204).json(RESPONSE.NO_CONTENT());
    } else {
      return res
        .status(404)
        .json(RESPONSE.NOT_FOUND(`SERVER WITH ID ${id} WAS NOT FOUND`));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};

export const deleteServer = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
  try {
    const result = await mySqlSource
      .getRepository(Server)
      .createQueryBuilder()
      .delete()
      .where("id= :id", { id })
      .execute();

    if (result.affected && result.affected > 0) {
      return res.status(204).json(RESPONSE.NO_CONTENT());
    } else {
      return res
        .status(404)
        .json(RESPONSE.NOT_FOUND(`SERVER WITH ID ${id} WAS NOT FOUND`));
    }
  } catch (error) {
    return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
  }
};
