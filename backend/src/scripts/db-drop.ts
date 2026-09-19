import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

export async function dropDatabase() {
  const dbName = process.env.DB_NAME || "chat-in-real-time";

  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: "postgres",
  });

  try {
    await client.connect();

    const checkDb = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbName]
    );

    if (checkDb.rowCount === 0) {
      console.log(`ℹ️ La base de datos "${dbName}" no existe. Nada que borrar.`);
      return;
    }

    console.log(`⚠️ Cerrando conexiones activas a "${dbName}"...`);
    await client.query(
      ` SELECT pg_terminate_backend(pid)
        FROM pg_stat_activity
        WHERE datname = $1 AND pid <> pg_backend_pid();`,
      [dbName]
    );

    console.log(`🗑️ Eliminando la base de datos "${dbName}"...`);
    await client.query(`DROP DATABASE "${dbName}"`);
    console.log(`✅ Base de datos "${dbName}" eliminada correctamente.`);
  } catch (error) {
    console.error("❌ Error al eliminar la base de datos:", error);
    throw error;
  } finally {
    await client.end();
  }
}


dropDatabase();
