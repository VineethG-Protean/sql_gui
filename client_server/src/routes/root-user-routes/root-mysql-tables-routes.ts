import express, { Request, Response } from "express";
import { alterTableData, alterTableSchema, createTable, deleteTableData, dropTable, getAllTables, getTableData, getTableSchema } from "../../services/root-user-services/root-table-services";

const ROOT_TABLE = express();

ROOT_TABLE.get("/", async (req: Request, res: Response) => {
    await getAllTables(req, res);
})

ROOT_TABLE.get("/schema", async (req: Request, res: Response) => {
    await getTableSchema(req, res);
})

ROOT_TABLE.post("/", async (req: Request, res: Response) => {
    await createTable(req, res);
})

ROOT_TABLE.delete("/", async (req: Request, res: Response) => {
    await dropTable(req, res);
})

ROOT_TABLE.put("/", async (req: Request, res: Response) => {
    await alterTableSchema(req, res);
})

ROOT_TABLE.get("/data", async (req: Request, res: Response) => {
    await getTableData(req, res);
})

ROOT_TABLE.delete("/data", async (req: Request, res: Response) => {
    await deleteTableData(req, res);
})

ROOT_TABLE.put("/data", async (req: Request, res: Response) => {
    await alterTableData(req, res);
})

export default ROOT_TABLE;
