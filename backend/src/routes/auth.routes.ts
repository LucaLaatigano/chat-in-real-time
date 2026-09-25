import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";

export const authRouter = Router()

authRouter.post("/login", AuthController.login)
authRouter.post("/register", AuthController.register)
authRouter.post("/logout", AuthController.logOut)
authRouter.get("/me", AuthController.getMe)