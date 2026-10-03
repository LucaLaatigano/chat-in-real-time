import type { UserReturnedPayload } from "./auth.types.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserReturnedPayload
    }
  }
}