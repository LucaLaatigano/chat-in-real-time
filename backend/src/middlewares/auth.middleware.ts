import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import jwt from "jsonwebtoken";
import type { UserReturnedPayload } from "../types/auth.types.js";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.access_token
  if (!token) return next(new AppError("not authenticated", 401))

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserReturnedPayload
    req.user = decoded
    next()
  } catch (err) {
    return next(new AppError("invalid or expired token", 401))
  }
}