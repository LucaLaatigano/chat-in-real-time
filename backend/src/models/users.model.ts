import type { QueryResult } from "pg";
import { pool } from "../config/db.config.js";
import type { User } from "../types/user.types.js";

export class UsersModel {
  static async findByEmail({ email }: { email: string }): Promise<User | null> {
    const user: QueryResult<User> = await pool.query(`SELECT * FROM users WHERE email = $1 `, [email])
    if (user.rows.length === 0) {
      return null;
    }
    return user.rows[0]
  }
}