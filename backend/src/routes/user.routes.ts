import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
export const userRouter = Router()

userRouter.get("/search", authMiddleware, UserController.search)