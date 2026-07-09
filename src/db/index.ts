import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({ connectionString: config.db_url });

export const initDB = async () => {
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,

    role VARCHAR(20) NOT NULL DEFAULT 'contributor'
    CONSTRAINT users_role_check CHECK (role IN ('contributor', 'maintainer')),


    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
