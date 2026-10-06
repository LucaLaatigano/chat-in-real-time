import type { Socket } from "socket.io"
import jwt from "jsonwebtoken"
import type { UserReturnedPayload } from "../types/auth.types.js";

export const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const raw = socket.handshake.headers.cookie ?? ''
    const token = raw.split('; ').find((c) => c.startsWith('access_token='))?.split('=')[1]
    if (!token) return next(new Error("not authenticated"));
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserReturnedPayload;
    socket.data.user = decoded;
    next()
  } catch (err) {
    next(new Error("invalid or expired token"))
  }
}