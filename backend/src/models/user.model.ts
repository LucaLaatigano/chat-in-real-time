import type { QueryResult } from "pg";
import { pool } from "../config/db.config.js";
import type { User, UserInSearch } from "../types/user.types.js";

export class UsersModel {
  static async findByEmail({ email }: { email: string }) {
    const user: QueryResult<User> = await pool.query(`SELECT * FROM users WHERE email = $1 `, [email])
    if (user.rows.length === 0) {
      return null;
    }
    return user.rows[0]
  }

  static async searchByCode({ code }: { code: string }) {
    const users: QueryResult<UserInSearch> = await pool.query(`
      SELECT 
          user_id,
          name,
          last_name,
          email,
          identifier_code,
          profile_photo,
          created_at,
          online
        FROM users 
          WHERE identifier_code = $1
      `, [code])
    if (users.rows.length === 0) return []
    return users.rows
  }

  static async searchByAnyName({ name }: { name: string }) {
    const searchTerm = `%${name}%`
    const users = await pool.query<UserInSearch>(`
      SELECT 
          user_id,
          name,
          last_name,
          email,
          identifier_code,
          profile_photo,
          created_at,
          online
        FROM users
        WHERE name ILIKE $1

        UNION 

        SELECT 
        user_id,
            name,
            last_name,
            email,
            identifier_code,
            profile_photo,
            created_at,
            online
          FROM users
          WHERE last_name ILIKE $1

        LIMIT 20
      `, [searchTerm])
    if (users.rows.length === 0) return []
    return users.rows
  }
}