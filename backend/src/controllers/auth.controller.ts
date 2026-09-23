import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";
import { userDataSchema } from "../schemas/auth.schemas.js";
import { AppError } from "../errors/app.error.js";
import type { UserToReturn } from "../types/user.types.js";
export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body
    const { token, user } = await AuthService.login({ email: email, password: password })
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        sameSite: "strict"
      })
      .json({
        success: true,
        user
      })
  }

  static async register(req: Request, res: Response) {
    const parsedSchemaUser = userDataSchema.safeParse(req.body)
    if (!parsedSchemaUser.success) throw new AppError("invalid fields", 400)
    const newUser: UserToReturn = await AuthService.register({ data: parsedSchemaUser.data })
    if (!newUser) throw new AppError("not created", 500)
    res.status(201).json({
      success: true,
      message: "account created successfully",
      user: newUser
    })
  }
}