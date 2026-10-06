import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { initDatabase } from "./scripts/db-init.js";
import { authRouter } from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { apiKeyMiddleware } from "./middlewares/apiKey.middleware.js";
import cors from 'cors'
import { userRouter } from "./routes/user.routes.js";
import { createServer } from "http";
import { initSocket } from "./config/socket.config.js";
import { friendshipRouter } from "./routes/friendship.routes.js";


const app = express();
const httpServer = createServer(app)
const PORT = process.env.PORT ?? 3000;

//socket initialization

initSocket(httpServer)

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
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/friendship', friendshipRouter)
app.use(errorMiddleware)

async function startServer() {
  try {
    await initDatabase();
    httpServer.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
