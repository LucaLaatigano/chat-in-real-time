import type { QueryResult } from "pg";
import { pool } from "../config/db.config.js";
import type { UserDataToInsert } from "../types/user.types.js";
export class AuthModel {
  static async createAcc({ data }: { data: UserDataToInsert }) {
    const { name, last_name, email, password, identifier_code } = data
    const result: QueryResult = await pool.query(`
      INSERT INTO users(name, last_name, email, password, identifier_code) VALUES
      ($1,$2,$3,$4,$5)
      RETURNING user_id, name, last_name, email, identifier_code, created_at
      `, [name, last_name, email, password, identifier_code])

    return result.rows[0]
  }
}