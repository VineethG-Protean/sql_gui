import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = () => {
  const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DBNAME,
    connectionLimit: 10,
  });

  return connection;
}

export default pool;
