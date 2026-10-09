import { UsersModel } from "../models/user.model.js";
import type { UUID } from "../types/index.js";

export class UserService {
  static async searchByCode({ identifier_code, currentId }: { identifier_code: string, currentId: UUID }) {
    const users = await UsersModel.searchByCode({ code: identifier_code, currentId })
    return users
  }

  static async searchByName({ name = '', currentId }: { name: string, currentId: UUID }) {
    const users = await UsersModel.searchByAnyName({ name: name, currentId })
    return users
  }


}