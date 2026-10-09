import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";
import { UserService } from "../services/user.service.js";
import type { UUID } from "../types/index.js";

export class UserController {
  static async search(req: Request, res: Response) {
    const { user_name, identifier_code } = req.query
    const hasCode = typeof identifier_code === 'string' && identifier_code.trim() !== ''
    const hasName = typeof user_name === 'string' && user_name.trim() !== ''
    if (!hasCode && !hasName) throw new AppError('Bad request, nor identifier code neither user name provided', 400)
    if (hasCode && hasName) throw new AppError('Bad request identifier code and user name sent', 400)
    if (hasCode) {
      const users = await UserService.searchByCode({ identifier_code: (identifier_code as string).trim(), currentId: req.user?.user_id as UUID })
      res.json({
        success: true,
        users
      })
    }
    if (hasName) {
      const users = await UserService.searchByName({ name: user_name, currentId: req.user?.user_id as UUID })
      res.json({
        success: true,
        users
      })
    }
  }
}