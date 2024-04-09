import { createPool } from "mysql2/promise";

const pool = () => {
  const connection = createPool({
    host: "localhost",
    user: "root",
    password: "nafaz123",
    database: "pep",
    connectionLimit: 10,
  });

  return connection;
}

export default pool;
