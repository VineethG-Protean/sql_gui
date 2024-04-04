import { createPool } from "mysql2/promise";

export async function connect() {
  const connection = await createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "test",
    connectionLimit: 10,
  });

  return connection;
}
