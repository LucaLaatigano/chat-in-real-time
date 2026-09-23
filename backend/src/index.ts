import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { initDatabase } from "./scripts/db-init.js";
import { authRouter } from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { apiKeyMiddleware } from "./middlewares/apiKey.middleware.js";
import cors from 'cors'
const app = express();
const PORT = process.env.PORT ?? 3000;

//middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "x-api-key"]
}))
app.use(express.json());
app.use(cookieParser());
app.use(apiKeyMiddleware)

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor backend en TypeScript funcionando correctamente");
});

//Routers
app.use("/api/auth", authRouter);


app.use(errorMiddleware)

async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
