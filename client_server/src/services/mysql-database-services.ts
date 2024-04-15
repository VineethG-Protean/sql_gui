import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { RESPONSE } from "../utilities/response";
import pool from "../config/db-connection";

const connection = pool();

export const createDatabase = async (req: Request, res: Response) => {
    const { name, character_set, collate, encryption, engine } = req.body;
    if (!name || !character_set || !collate || !encryption || !engine) return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    try {

    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const dropDatabase = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export const alterDatabase = async (req: Request, res: Response) => {
    const { name, character_set, collate, engine } = req.body;
    try {

    } catch (error) {
        return res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

