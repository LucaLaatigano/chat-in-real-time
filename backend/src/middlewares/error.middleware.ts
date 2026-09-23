import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      ok: false,
      status: err.statusCode,
      error: err.name,
      message: err.message
    })
    return
  }

  res.status(500).json({
    ok: false,
    status: 500,
    error: "internal error in server",
    message: "An error in the server has ocurred, check the request that you are requesting"
  })
}
