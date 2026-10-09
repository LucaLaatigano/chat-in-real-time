import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { AuthModel } from "../models/auth.model.js"
import { UsersModel } from "../models/user.model.js"
import { AppError } from "../errors/app.error.js"
import dotenv from "dotenv"
import type { UserDataSchema, UserToReturn, UserAuth } from "../types/index.js";
import { generateIdentifierCode } from "../utils/indetifierCodeGenerator.js"

dotenv.config()
export class AuthService {
  static async login({ email, password }: { email: string, password: string }) {
    const user = await UsersModel.findByEmail({ email: email })
    if (!user) throw new AppError("user not found", 400)
    const matches = await bcrypt.compare(password, user.password)
    if (!matches) throw new AppError("incorrect password", 401)
    const payload = {
      user_id: user.user_id,
      user_name: user.name,
      user_lastname: user.last_name,
      user_identifier_code: user.identifier_code
    }
    if (!process.env.JWT_SECRET) throw new AppError("JWT_SECRET not configured in .env", 500)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' })

    return {
      token, user: {
        user_id: user.user_id,
        user_name: user.name,
        user_lastname: user.last_name
      }
    }
  }

  static async register({ data }: { data: UserDataSchema }) {
    const identifierGeneration = generateIdentifierCode(data.name, data.last_name)
    const userExists = await UsersModel.findByEmail({ email: data.email })
    if (userExists) throw new AppError("a user alreacdy exists with that email", 409)
    if (!process.env.SALT_ROUNDS) throw new AppError("salt rounds not defined in .env", 500)
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10)
    const password_hashed = await bcrypt.hash(data.password, saltRounds)
    const dataToInsert = {
      ...data,
      password: password_hashed,
      identifier_code: identifierGeneration
    }
    const newUser: UserToReturn = await AuthModel.createAcc({ data: dataToInsert })
    if (!newUser) throw new AppError("account not created", 500)

    return newUser
  }

  static async getMe({ token }: { token: string }) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserAuth
    return decoded
  }
}
