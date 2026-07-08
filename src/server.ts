import express from "express";
import { Pool } from "pg";
import app from "./app";
import styleConsole from "./utility/style.console";
import config from "./config/db";


app.use(express.json());

const pool = new Pool({connectionString:config.db_url});

const initDB = async () => {
  try {
    await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'contributor'
      CHECK (role IN ('contributor', 'maintainer')),
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

app.get("/", (req, res) => {
  res.send("hi");
});


app.listen(config.port, async () => {
  const dbConnected = await initDB();

  styleConsole({
    server: true,
    database: dbConnected,
    port: Number(config.port),
    title: "DevPulse Backend",
    titleColor: "red",
  });
});
