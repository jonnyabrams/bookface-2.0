import pkg from "pg";
const { Pool } = pkg;

const db = new Pool({
  host: "localhost",
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWORD,
  port: 5432,
  database: "bookface",
});

export default db;