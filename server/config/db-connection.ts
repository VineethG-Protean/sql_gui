import { createPool } from "mysql2/promise";

const pool = () => {
  const connection = createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "test",
    connectionLimit: 10,
  });

  return connection;
}

export default pool;
