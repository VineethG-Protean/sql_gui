import { Request, Response, NextFunction } from 'express'

import { mySqlSource } from '../config/data-source';
import { RESPONSE } from '../utilities/response';

import { User } from '../entities/User';

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const getUser = await mySqlSource.getRepository(User).findOneBy({ id: res.locals.user_id });
        if (getUser && getUser.role === "admin") {
            next();
        } else {
            res.status(401).json(RESPONSE.UN_AUTHORIZED());
        }
    } catch (error) {
        res.status(500).json(RESPONSE.INTERNAL_SERVER_ERROR());
    }
}

export default verifyAdmin;