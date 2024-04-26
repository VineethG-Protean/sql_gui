import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = () => {
  const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
    connectionLimit: 10,
    enableKeepAlive: false,
  });

  return connection;
};

export const privatePool = (
  host: string,
  username: string,
  password: string,
  database: string
) => {
  const connection = createPool({
    host: host,
    user: username,
    password: password,
    database: database,
    connectionLimit: 10,
    enableKeepAlive: false,
  });

  return connection;
};
