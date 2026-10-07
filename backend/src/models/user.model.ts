import type { QueryResult } from "pg";
import { pool } from "../config/db.config.js";
import type { User, UserInSearch, UUID, UserData } from "../types/user.types.js";

export class UsersModel {
  static async findByEmail({ email }: { email: string }) {
    const user: QueryResult<User> = await pool.query(`SELECT * FROM users WHERE email = $1 `, [email])
    if (user.rows.length === 0) {
      return null;
    }
    return user.rows[0]
  }

  static async findById({ user_id }: { user_id: UUID }) {
    const user = await pool.query<UserData>(`
      SELECT 
        user_id,
        name,
        last_name,
        email,
        identifier_code,
        profile_photo,
        created_at
        FROM users
        WHERE user_id = $1
      `, [user_id])

    if (user.rowCount === 0) return null

    return user.rows[0]
  }
  static async searchByCode({ code, currentId }: { code: string, currentId: UUID }) {
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
          WHERE identifier_code ILIKE $1
          AND ($2::uuid IS NULL OR user_id != $2::uuid)
      `, [code.trim(), currentId ?? null])
    if (users.rows.length === 0) return []
    return users.rows
  }

  static async searchByAnyName({ name, currentId }: { name: string, currentId: UUID }) {
    const searchTerm = `%${name.trim()}%`
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
        WHERE (
          (name || ' ' || last_name) ILIKE $1
          OR name ILIKE $1
          OR last_name ILIKE $1
        )
        AND ($2::uuid IS NULL OR user_id != $2::uuid)
        LIMIT 20
      `, [searchTerm, currentId ?? null])
    return users.rows
  }

}