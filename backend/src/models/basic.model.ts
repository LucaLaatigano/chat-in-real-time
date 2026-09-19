import { pool } from "../config/db.config.js";
const data = await pool.query(`SELECT * FROM message_attachments`)
console.log(data.rows)


