import { pool } from "../config/db.config.js";
import { UsersModel } from "../models/user.model.js";


async function main() {
  const result = await UsersModel.searchByCode({ code: 'LL5318' });

  console.log("Resultado:");
  console.dir(result, { depth: null });
}

main()
  .catch((err) => console.error("Error:", err))
  .finally(() => pool.end()); 
