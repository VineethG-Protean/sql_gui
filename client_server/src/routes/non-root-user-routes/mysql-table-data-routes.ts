import express, { Request, Response } from "express";
import { RESPONSE } from "@/utilities/response";
import { addTableData, alterTableData, dropTableData, getTableData } from "@/services/non-root-user-services/table-data-services";
const TABLE_DATA = express();

TABLE_DATA.post("/", async (req: Request, res: Response) => {
    const { action } = req.query;
    if (typeof action !== "string") {
        return res.status(422).json(RESPONSE.UNPROCESSABLE_ENTITY());
    }
    switch (action) {
        case "get":
            await getTableData(req, res);
            break;
        case "add":
            await addTableData(req, res);
            break;
        case "drop":
            await dropTableData(req, res);
            break;
        case "alter":
            await alterTableData(req, res);
            break;
        default:
            return res.status(409).json(RESPONSE.CONFLICT());
    }
});

export default TABLE_DATA;
