import { DataSource } from "typeorm";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

export const mySqlSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DBNAME,
  entities: ["src/entities/*.ts"],
  logging: false, //set true to see logs related to schema updates.
  synchronize: true, //set false to avoid schema sync between server and database.
  extra: {
    connectionLimit: 1000,
    charset: "utf8mb4",
  },
});
