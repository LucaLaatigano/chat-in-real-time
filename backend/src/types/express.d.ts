import type { UserReturnedPayload } from "./auth/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserReturnedPayload;
    }
  }
}
