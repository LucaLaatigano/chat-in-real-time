import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import dotenv from "dotenv";
import { pool } from "../config/db.config.js";

dotenv.config();

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ensureDatabaseExists() {
  const dbName = process.env.DB_NAME || "chat-in-real-time";
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: "postgres",
  });

  await client.connect();

  const checkDb = await client.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [dbName]
  );

  if (checkDb.rowCount === 0) {
    console.log(`📦 La base "${dbName}" no existía. Creándola...`);
    await client.query(`CREATE DATABASE "${dbName}"`);
    console.log(`✅ Base de datos "${dbName}" creada con éxito.`);
  }

  await client.end();
}

async function runSqlScript() {
  try {
    await ensureDatabaseExists();

    const sqlPath = path.join(__dirname, "schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("⏳ Ejecutando estructura en la base de datos...");
    await pool.query(sql);
    console.log("✅ Tablas creadas con éxito en PostgreSQL.");
  } catch (error) {
    console.error("❌ Error ejecutando el script:", error);
  } finally {
    await pool.end();
  }
}

runSqlScript();