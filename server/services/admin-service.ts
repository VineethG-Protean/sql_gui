import { Request, Response } from "express";

import { mySqlSource } from "../config/data-source";
import { RESPONSE } from "../utilities/response";
import { encryptPassword } from "../utilities/encryption";

import { Server } from "../entities/Server";
import { User } from "../entities/User";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await mySqlSource.getRepository(User).createQueryBuilder('user').select(['user.id', 'user.created_at', 'user.modified_at', 'user.role', 'user.name', 'user.username']).getMany();
        if (!users) return res.status(404).json(RESPONSE.NOT_FOUND());
        return res.status(200).json(RESPONSE.OK("DATA RETURNED", users))
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const inviteUser = async (req: Request, res: Response) => {
    const { email, username, password, name } = req.body;
    if (!email || !username || !password || !name) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
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
            const savedUser = await mySqlSource.getRepository(User).save(user);
            return res.status(201).json(RESPONSE.CREATED("INVITATION HAS BEEN SENT"));
        } else {
            res.status(422).json(RESPONSE.CONFLICT("EMAIL ALREADY IN USE"));
        }
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const addServer = async (req: Request, res: Response) => {
    const { host, port, username, password, type } = req.body;
    if (!host || !port || !username || !password || !type) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {
        const server = new Server();
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
}

export const updateServer = async (req: Request, res: Response) => {
    const { id, host, port, username, password, type } = req.body;
    if (!id || !host || !port || !username || !password || !type) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {
        const server = new Server();
        server.id = id;
        server.host = host;
        server.port = port;
        server.username = username;
        server.password = password;
        server.type = type;

        const updateServer = await mySqlSource.createQueryBuilder()
            .update(Server).set(server)
            .where("id", { id }).execute();

        return res.status(201).json(RESPONSE.CREATED());
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const deleteServer = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {
        const deletedServer = await mySqlSource.getRepository(Server)
            .createQueryBuilder().delete()
            .where("id", { id }).execute();

        return res.status(201).json(RESPONSE.CREATED());
    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}