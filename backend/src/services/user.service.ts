import { UsersModel } from "../models/user.model.js";

export class UserService {
  static async searchByCode({ identifier_code }: { identifier_code: string }) {
    const users = await UsersModel.searchByCode({ code: identifier_code })
    return users
  }

  static async searchByName({ name = '' }: { name: string }) {
    const users = await UsersModel.searchByAnyName({ name: name })
    return users
  }
}