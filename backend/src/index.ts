import express, { type Request, type Response } from "express";
import { initDatabase } from "./scripts/db-init.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor backend en TypeScript funcionando correctamente");
});

async function startServer() {
  try {
    // 1. Asegura que la BD exista y las tablas estén listas
    await initDatabase();

    // 2. Levanta el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
