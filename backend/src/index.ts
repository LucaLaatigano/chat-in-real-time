import express, { type Request, type Response } from "express";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor backend en TypeScript funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
