import { DataSource } from "typeorm"
import "reflect-metadata"

export const mySqlSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_HOST || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'admin',
    database: process.env.DB_DBNAME || 'test',
    entities: ["entities/*.ts"],
    logging: true, //set true to see logs related to schema updates.
    synchronize: true, //set false to avoid schema sync between server and database.
    extra: {
        connectionLimit: 1000,
        charset: "utf8mb4"
    },
})