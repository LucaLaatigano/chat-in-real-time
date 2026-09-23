import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import dotenv from "dotenv"
dotenv.config()
export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const userApikey = req.headers['x-api-key']
  if (req.method === 'OPTIONS') return next() //browser verification if the header does exist
  if (!userApikey) return next(new AppError("api key required", 400))
  if (userApikey !== process.env.API_KEY) return next(new AppError("invalid api key", 400))

  next()
} 