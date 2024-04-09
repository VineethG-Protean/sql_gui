import { Request, Response, NextFunction } from 'express'

import { mySqlSource } from '../config/data-source';
import { RESPONSE } from '../utilities/response';
import { verifyJWT } from '../utilities/tokens';

import { User } from '../entities/User';

const tokenValidator = async (req: Request, res: Response, next: NextFunction) => {
    const allowedOrigins = [
        "http://localhost:5372",
    ];
    const origin = req.get("origin");
    // if (origin && allowedOrigins.includes(origin)) {
    var token = req.headers["x-access-token"];
    console.log(token);
    if (!token)
        res.status(401).json(RESPONSE.UN_AUTHORIZED())

    const decoded: any = verifyJWT(token as string);
    const getClient: any = await mySqlSource
        .getRepository(User)
        .findOneBy({ id: decoded.user_id });

    if (getClient && getClient.is_verified == 1) {
        res.locals.user_id = decoded.user_id;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS,"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "origin, content-type, accept,x-access-token"
        );
        // res.setHeader("Access-Control-Allow-Credentials", true);
        next();
    } else {
        res.status(401).json(RESPONSE.UN_AUTHORIZED());
    }
}

export default tokenValidator;