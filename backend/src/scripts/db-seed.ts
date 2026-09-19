import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedDatabase(closePoolOnFinish: boolean = false) {
  try {
    const sqlPath = path.join(__dirname, "seed.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("🌱 Insertando datos de prueba (seed)...");
    await pool.query(sql);
    console.log("✅ Datos de prueba insertados con éxito en la base de datos.");
  } catch (error) {
    console.error("❌ Error ejecutando el seed:", error);
    throw error;
  } finally {
    if (closePoolOnFinish) {
      await pool.end();
    }
  }
}

const isDirectRun = process.argv[1] && (
  path.resolve(process.argv[1]) === __filename ||
  process.argv[1].endsWith("db-seed.ts")
);

if (isDirectRun) {
  seedDatabase(true);
}
