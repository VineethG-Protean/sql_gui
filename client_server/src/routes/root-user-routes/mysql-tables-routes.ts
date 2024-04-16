import express, { Request, Response } from "express";
import { alterTableData, alterTableSchema, createTable, deleteTableData, dropTable, getAllTables, getTableData, getTableSchema } from "../../services/root-services/table-services";

const TABLE = express();

TABLE.get("/", async (req: Request, res: Response) => {
    await getAllTables(req, res);
})

TABLE.get("/schema", async (req: Request, res: Response) => {
    await getTableSchema(req, res);
})

TABLE.post("/", async (req: Request, res: Response) => {
    await createTable(req, res);
})

TABLE.delete("/", async (req: Request, res: Response) => {
    await dropTable(req, res);
})

TABLE.put("/", async (req: Request, res: Response) => {
    await alterTableSchema(req, res);
})

TABLE.get("/data", async (req: Request, res: Response) => {
    await getTableData(req, res);
})

TABLE.delete("/data", async (req: Request, res: Response) => {
    await deleteTableData(req, res);
})

TABLE.put("/data", async (req: Request, res: Response) => {
    await alterTableData(req, res);
})

export default TABLE;
